/* =========================================================
   DRUG UNIT - CLASSIFICATION SECTION
   ========================================================= */

import React, {
    useEffect,
} from "react";

import {
    Col,
    Form,
    InputNumber,
    Row,
    Select,
} from "antd";

import {
    DRUG_UNIT_DEFAULT_VALUES,
    DRUG_UNIT_LABELS,
    DRUG_UNIT_PRECISION,
    DRUG_UNIT_PRECISION_OPTIONS,
    DRUG_UNIT_TYPE_OPTIONS,
    DRUG_UNIT_TYPES,
    DRUG_UNIT_VALIDATION,
} from "../../constants/drugUnit.constants";

import {
    isCountUnitPrecisionValid,
    isValidDrugUnitPrecision,
} from "../../utils/drugUnit.helper";


/* =========================================================
   COMPONENT
   ========================================================= */

const ClassificationSection = ({
    form,
    mode,
    disabled = false,
}) => {

    const isViewMode =
        mode === "VIEW";


    const isDisabled =
        disabled ||
        isViewMode;


    /* =====================================================
       UNIT TYPE
       ===================================================== */

    const unitType =
        Form.useWatch(
            "unitType",
            form
        );


    /* =====================================================
       PRECISION
       ===================================================== */

    const decimalPrecision =
        Form.useWatch(
            "decimalPrecision",
            form
        );


    /* =====================================================
       COUNT UNIT RULE
       ===================================================== */

    useEffect(
        () => {

            if (
                unitType ===
                DRUG_UNIT_TYPES.COUNT
            ) {

                const currentPrecision =
                    form?.getFieldValue(
                        "decimalPrecision"
                    );


                if (
                    currentPrecision !==
                    0
                ) {

                    form?.setFieldsValue({

                        decimalPrecision:
                            DRUG_UNIT_DEFAULT_VALUES
                                .decimalPrecision,

                    });
                }
            }

        },
        [
            unitType,
            form,
        ]
    );


    /* =====================================================
       PRECISION VALIDATOR
       ===================================================== */

    const validatePrecision = (
        _
        ,
        value
    ) => {

        if (
            value ===
            undefined ||
            value ===
            null ||
            value === ""
        ) {

            return Promise.reject(
                new Error(
                    DRUG_UNIT_VALIDATION
                        .DECIMAL_PRECISION_REQUIRED
                )
            );
        }


        if (
            !isValidDrugUnitPrecision(
                value
            )
        ) {

            return Promise.reject(
                new Error(
                    DRUG_UNIT_VALIDATION
                        .INVALID_PRECISION
                )
            );
        }


        if (
            !isCountUnitPrecisionValid(
                unitType,
                value
            )
        ) {

            return Promise.reject(
                new Error(
                    "Count units must use decimal precision 0."
                )
            );
        }


        return Promise.resolve();
    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="drug-unit-form-section"
        >

            {/* =============================================
                SECTION HEADER
            ============================================== */}

            <div
                className="drug-unit-section-header"
            >

                <div
                    className="drug-unit-section-title"
                >
                    Classification
                </div>

                <div
                    className="drug-unit-section-description"
                >
                    Classify the unit and define the number
                    of decimal places allowed for quantities.
                </div>

            </div>


            {/* =============================================
                FIELDS
            ============================================== */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =========================================
                    UNIT TYPE
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="unitType"
                        label={
                            DRUG_UNIT_LABELS.UNIT_TYPE
                        }
                        rules={[
                            {
                                required: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .UNIT_TYPE_REQUIRED,
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select unit type"
                            options={
                                DRUG_UNIT_TYPE_OPTIONS
                            }
                            disabled={
                                isDisabled
                            }
                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =========================================
                    DECIMAL PRECISION
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        name="decimalPrecision"
                        label={
                            DRUG_UNIT_LABELS
                                .DECIMAL_PRECISION
                        }
                        rules={[
                            {
                                required: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .DECIMAL_PRECISION_REQUIRED,
                            },

                            {
                                validator:
                                    validatePrecision,
                            },
                        ]}
                        extra={
                            unitType ===
                            DRUG_UNIT_TYPES.COUNT
                                ? "Count units use whole numbers only."
                                : "Allowed range: 0 to 6 decimal places."
                        }
                    >

                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            min={
                                DRUG_UNIT_PRECISION.MIN
                            }
                            max={
                                DRUG_UNIT_PRECISION.MAX
                            }
                            precision={0}
                            step={1}
                            controls
                            disabled={
                                isDisabled ||
                                unitType ===
                                    DRUG_UNIT_TYPES.COUNT
                            }
                            placeholder="Select precision"
                        />

                    </Form.Item>

                </Col>

            </Row>


            {/* =============================================
                PRECISION PREVIEW
            ============================================== */}

            <div
                className="drug-unit-classification-preview"
            >

                <div>
                    <div
                        className="drug-unit-classification-preview-label"
                    >
                        Selected Unit Type
                    </div>

                    <div
                        className="drug-unit-classification-preview-value"
                    >
                        {
                            DRUG_UNIT_TYPE_OPTIONS.find(
                                (option) =>
                                    option.value ===
                                    unitType
                            )?.label ||
                            "-"
                        }
                    </div>
                </div>


                <div>
                    <div
                        className="drug-unit-classification-preview-label"
                    >
                        Decimal Precision
                    </div>

                    <div
                        className="drug-unit-classification-preview-value"
                    >
                        {
                            decimalPrecision ??
                            "-"
                        }
                    </div>
                </div>

            </div>

        </section>
    );
};


export default ClassificationSection;