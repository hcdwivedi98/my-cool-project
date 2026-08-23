/* =========================================================
   DRUG UNIT - BASIC SECTION
   ========================================================= */

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";

import {
    DRUG_UNIT_FIELD_LIMITS,
    DRUG_UNIT_LABELS,
    DRUG_UNIT_VALIDATION,
} from "../../constants/drugUnit.constants";

import {
    normalizeDrugUnitCode,
} from "../../utils/drugUnit.helper";


/* =========================================================
   COMPONENT
   ========================================================= */

const BasicSection = ({
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
       UNIT CODE NORMALIZATION
       ===================================================== */

    const handleUnitCodeBlur = () => {

        const value =
            form?.getFieldValue(
                "unitCode"
            );


        if (
            value ===
            undefined ||
            value ===
            null
        ) {
            return;
        }


        form?.setFieldsValue({

            unitCode:
                normalizeDrugUnitCode(
                    value
                ),

        });
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
                    Basic Information
                </div>

                <div
                    className="drug-unit-section-description"
                >
                    Define the standard identity and display
                    information for this drug unit.
                </div>

            </div>


            {/* =============================================
                FORM FIELDS
            ============================================== */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =========================================
                    UNIT CODE
                ========================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <Form.Item
                        name="unitCode"
                        label={
                            DRUG_UNIT_LABELS.UNIT_CODE
                        }
                        rules={[
                            {
                                required: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .UNIT_CODE_REQUIRED,
                            },

                            {
                                max:
                                    DRUG_UNIT_FIELD_LIMITS
                                        .UNIT_CODE_MAX_LENGTH,

                                message:
                                    `Unit code cannot exceed ${DRUG_UNIT_FIELD_LIMITS.UNIT_CODE_MAX_LENGTH} characters.`,
                            },

                            {
                                validator: (
                                    _,
                                    value
                                ) => {

                                    if (
                                        !value
                                    ) {
                                        return Promise.resolve();
                                    }


                                    const normalized =
                                        normalizeDrugUnitCode(
                                            value
                                        );


                                    if (
                                        !normalized
                                    ) {

                                        return Promise.reject(
                                            new Error(
                                                DRUG_UNIT_VALIDATION
                                                    .UNIT_CODE_REQUIRED
                                            )
                                        );
                                    }


                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. MG"
                            maxLength={
                                DRUG_UNIT_FIELD_LIMITS
                                    .UNIT_CODE_MAX_LENGTH
                            }
                            disabled={
                                isDisabled
                            }
                            onBlur={
                                handleUnitCodeBlur
                            }
                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =========================================
                    UNIT NAME
                ========================================== */}

                <Col
                    xs={24}
                    md={10}
                >

                    <Form.Item
                        name="unitName"
                        label={
                            DRUG_UNIT_LABELS.UNIT_NAME
                        }
                        rules={[
                            {
                                required: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .UNIT_NAME_REQUIRED,
                            },

                            {
                                max:
                                    DRUG_UNIT_FIELD_LIMITS
                                        .UNIT_NAME_MAX_LENGTH,

                                message:
                                    `Unit name cannot exceed ${DRUG_UNIT_FIELD_LIMITS.UNIT_NAME_MAX_LENGTH} characters.`,
                            },

                            {
                                whitespace: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .UNIT_NAME_REQUIRED,
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. Milligram"
                            maxLength={
                                DRUG_UNIT_FIELD_LIMITS
                                    .UNIT_NAME_MAX_LENGTH
                            }
                            disabled={
                                isDisabled
                            }
                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =========================================
                    SYMBOL
                ========================================== */}

                <Col
                    xs={24}
                    md={6}
                >

                    <Form.Item
                        name="symbol"
                        label={
                            DRUG_UNIT_LABELS.SYMBOL
                        }
                        rules={[
                            {
                                required: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .SYMBOL_REQUIRED,
                            },

                            {
                                max:
                                    DRUG_UNIT_FIELD_LIMITS
                                        .SYMBOL_MAX_LENGTH,

                                message:
                                    `Symbol cannot exceed ${DRUG_UNIT_FIELD_LIMITS.SYMBOL_MAX_LENGTH} characters.`,
                            },

                            {
                                whitespace: true,

                                message:
                                    DRUG_UNIT_VALIDATION
                                        .SYMBOL_REQUIRED,
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. mg"
                            maxLength={
                                DRUG_UNIT_FIELD_LIMITS
                                    .SYMBOL_MAX_LENGTH
                            }
                            disabled={
                                isDisabled
                            }
                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =========================================
                    DESCRIPTION
                ========================================== */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="description"
                        label={
                            DRUG_UNIT_LABELS.DESCRIPTION
                        }
                        rules={[
                            {
                                max:
                                    DRUG_UNIT_FIELD_LIMITS
                                        .DESCRIPTION_MAX_LENGTH,

                                message:
                                    `Description cannot exceed ${DRUG_UNIT_FIELD_LIMITS.DESCRIPTION_MAX_LENGTH} characters.`,
                            },
                        ]}
                    >

                        <Input.TextArea
                            placeholder={
                                "Enter a description for this unit..."
                            }
                            maxLength={
                                DRUG_UNIT_FIELD_LIMITS
                                    .DESCRIPTION_MAX_LENGTH
                            }
                            rows={3}
                            showCount
                            disabled={
                                isDisabled
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>
    );
};


export default BasicSection;