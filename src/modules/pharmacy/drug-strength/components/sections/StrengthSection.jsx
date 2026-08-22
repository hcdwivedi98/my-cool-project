// src/modules/pharmacy/drug-strength/components/sections/StrengthSection.jsx

import React, {
    useEffect,
} from "react";

import {
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from "antd";

import {
    DRUG_STRENGTH_DECIMAL_PRECISION_OPTIONS,
    DRUG_STRENGTH_LIMITS,
} from "../../constants/drugStrength.constants";

import {
    formatStrengthDisplay,
} from "../../utils/drugStrength.helper";


const StrengthSection = ({
    form,

    mode = "create",

    unitOptions = [],

    strengthTypeOptions = [],

    getUnitById,
}) => {

    const isViewMode =
        mode === "view";


    /* =====================================================
       WATCH VALUES
    ===================================================== */

    const strengthValue =
        Form.useWatch(
            "strengthValue",
            form
        );


    const strengthUnitId =
        Form.useWatch(
            "strengthUnitId",
            form
        );


    const decimalPrecision =
        Form.useWatch(
            "decimalPrecision",
            form
        );


    /* =====================================================
       SELECTED UNIT
    ===================================================== */

    const selectedUnit =
        typeof getUnitById === "function"
            ? getUnitById(
                strengthUnitId
            )
            : unitOptions.find(
                (
                    option
                ) =>
                    option.value ===
                    strengthUnitId
            )?.unit;


    /* =====================================================
       DISPLAY VALUE
    ===================================================== */

    const generatedDisplay =
        formatStrengthDisplay({

            value:
                strengthValue,

            unitName:
                selectedUnit?.name ||
                selectedUnit?.displayName ||
                "",

            unitCode:
                selectedUnit?.code ||
                "",

            precision:
                decimalPrecision ??
                0,

        });


    /* =====================================================
       UPDATE DISPLAY
    ===================================================== */

    useEffect(
        () => {

            if (
                !form
            ) {
                return;
            }


            form.setFieldValue(
                "strengthDisplay",
                generatedDisplay
            );

        },
        [
            form,
            generatedDisplay,
        ]
    );


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <section
            className="drug-strength-form-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="drug-strength-section-header"
            >

                <div
                    className="drug-strength-section-title"
                >
                    Strength Configuration
                </div>

                <div
                    className="drug-strength-section-description"
                >
                    Configure the numeric strength, unit,
                    classification and display format.
                </div>

            </div>


            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    STRENGTH VALUE
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Strength Value"
                        name="strengthValue"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please enter strength value.",
                            },

                            {
                                validator:
                                    async (
                                        _,
                                        value
                                    ) => {

                                        if (
                                            value ===
                                            null ||
                                            value ===
                                            undefined ||
                                            value ===
                                            ""
                                        ) {
                                            return;
                                        }


                                        if (
                                            Number(
                                                value
                                            ) <= 0
                                        ) {
                                            throw new Error(
                                                "Strength value must be greater than 0."
                                            );
                                        }


                                        if (
                                            Number(
                                                value
                                            ) >
                                            DRUG_STRENGTH_LIMITS.VALUE_MAX
                                        ) {
                                            throw new Error(
                                                `Strength value cannot exceed ${DRUG_STRENGTH_LIMITS.VALUE_MAX}.`
                                            );
                                        }

                                    },
                            },
                        ]}
                    >

                        <InputNumber
                            style={{
                                width:
                                    "100%",
                            }}

                            min={
                                DRUG_STRENGTH_LIMITS.VALUE_MIN
                            }

                            max={
                                DRUG_STRENGTH_LIMITS.VALUE_MAX
                            }

                            step={
                                decimalPrecision > 0
                                    ? 0.1
                                    : 1
                            }

                            precision={
                                decimalPrecision ??
                                0
                            }

                            placeholder="Enter strength value"

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    STRENGTH UNIT
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Strength Unit"
                        name="strengthUnitId"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select strength unit.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select unit"

                            showSearch

                            optionFilterProp="label"

                            allowClear

                            disabled={
                                isViewMode
                            }

                            options={
                                unitOptions
                            }

                            onChange={(
                                value
                            ) => {

                                /*
                                 * Unit selection itself
                                 * triggers Form.useWatch
                                 * and automatically
                                 * regenerates display.
                                 */

                                form?.setFieldValue(
                                    "strengthUnitId",
                                    value
                                );

                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    STRENGTH TYPE
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Strength Type"
                        name="strengthType"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select strength type.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select strength type"

                            disabled={
                                isViewMode
                            }

                            options={
                                strengthTypeOptions
                            }

                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DECIMAL PRECISION
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Decimal Precision"
                        name="decimalPrecision"

                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select decimal precision.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select precision"

                            disabled={
                                isViewMode
                            }

                            options={
                                DRUG_STRENGTH_DECIMAL_PRECISION_OPTIONS
                            }

                            onChange={(
                                value
                            ) => {

                                form?.setFieldValue(
                                    "decimalPrecision",
                                    value
                                );

                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    STRENGTH DISPLAY
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Strength Display"
                        name="strengthDisplay"
                    >
                        <Input
                            value={generatedDisplay}
                            readOnly
                            placeholder="Generated automatically"
                            className="drug-strength-display-input"
                        />
                    </Form.Item>

                </Col>


                {/* =============================================
                    SORT ORDER
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        label="Sort Order"
                        name="sortOrder"

                        rules={[
                            {
                                type:
                                    "number",

                                min:
                                    DRUG_STRENGTH_LIMITS.SORT_ORDER_MIN,

                                max:
                                    DRUG_STRENGTH_LIMITS.SORT_ORDER_MAX,

                                message:
                                    `Sort order must be between ${DRUG_STRENGTH_LIMITS.SORT_ORDER_MIN} and ${DRUG_STRENGTH_LIMITS.SORT_ORDER_MAX}.`,
                            },
                        ]}
                    >

                        <InputNumber
                            style={{
                                width:
                                    "100%",
                            }}

                            min={
                                DRUG_STRENGTH_LIMITS.SORT_ORDER_MIN
                            }

                            max={
                                DRUG_STRENGTH_LIMITS.SORT_ORDER_MAX
                            }

                            precision={0}

                            placeholder="Enter sort order"

                            disabled={
                                isViewMode
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    PREVIEW
                ============================================== */}

                <Col
                    xs={24}
                >

                    <div
                        className="drug-strength-preview-card"
                    >

                        <div
                            className="drug-strength-preview-label"
                        >
                            Strength Preview
                        </div>

                        <div
                            className="drug-strength-preview-value"
                        >
                            {
                                generatedDisplay ||
                                "—"
                            }
                        </div>

                    </div>

                </Col>

            </Row>

        </section>
    );
};


export default StrengthSection;