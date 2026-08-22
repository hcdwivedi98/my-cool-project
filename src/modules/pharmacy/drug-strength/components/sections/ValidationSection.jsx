// src/modules/pharmacy/drug-strength/components/sections/ValidationSection.jsx

import React from "react";

import {
    Alert,
    Col,
    Form,
    Row,
    Tag,
} from "antd";

import {
    DRUG_STRENGTH_STATUS,
} from "../../constants/drugStrength.constants";

import {
    findDuplicateDrugStrength,
    findDuplicateStrengthCode,
    validateStrengthValue,
} from "../../utils/drugStrength.helper";


const ValidationSection = ({
    form,
    mode = "create",
    strengthList = [],
    record = null,
}) => {

    const isViewMode =
        mode === "view";


    /* =====================================================
       WATCH FORM VALUES
    ===================================================== */

    const strengthCode =
        Form.useWatch(
            "strengthCode",
            form
        );


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


    const strengthUnitCode =
        Form.useWatch(
            "strengthUnitCode",
            form
        );


    const decimalPrecision =
        Form.useWatch(
            "decimalPrecision",
            form
        );


    const status =
        Form.useWatch(
            "status",
            form
        );


    /* =====================================================
       CURRENT RECORD ID
    ===================================================== */

    const currentRecordId =
        record?.id ?? null;


    /* =====================================================
       DUPLICATE CODE
    ===================================================== */

    const duplicateCodeRecord =
        findDuplicateStrengthCode(
            strengthList,
            strengthCode,
            currentRecordId
        );


    /* =====================================================
       DUPLICATE VALUE + UNIT
    ===================================================== */

    const duplicateStrengthRecord =
        findDuplicateDrugStrength(
            strengthList,
            {
                strengthValue,

                strengthUnitCode,

                decimalPrecision,
            },
            currentRecordId
        );


    /* =====================================================
       VALUE VALIDATION
    ===================================================== */

    const strengthValueError =
        validateStrengthValue(
            strengthValue,
            decimalPrecision
        );


    /* =====================================================
       VALIDATION STATES
    ===================================================== */

    const hasDuplicateCode =
        Boolean(
            duplicateCodeRecord
        );


    const hasDuplicateStrength =
        Boolean(
            duplicateStrengthRecord
        );


    const hasValueError =
        Boolean(
            strengthValueError
        );


    const isValid =
        !hasDuplicateCode &&
        !hasDuplicateStrength &&
        !hasValueError &&
        Boolean(
            strengthUnitId
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
                    Validation
                </div>

                <div
                    className="drug-strength-section-description"
                >
                    Review uniqueness, numeric validation and
                    current usage status before saving.
                </div>

            </div>


            {/* =================================================
                VALIDATION SUMMARY
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
            >

                {/* =============================================
                    CODE VALIDATION
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <div
                        className="drug-strength-validation-card"
                    >

                        <div
                            className="drug-strength-validation-label"
                        >
                            Strength Code
                        </div>

                        <div
                            className="drug-strength-validation-value"
                        >

                            {
                                hasDuplicateCode ? (

                                    <Tag
                                        color="error"
                                    >
                                        Duplicate
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="success"
                                    >
                                        Available
                                    </Tag>

                                )
                            }

                        </div>

                        {
                            hasDuplicateCode && (

                                <div
                                    className="drug-strength-validation-message"
                                >
                                    Code already exists.
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =============================================
                    VALUE + UNIT VALIDATION
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <div
                        className="drug-strength-validation-card"
                    >

                        <div
                            className="drug-strength-validation-label"
                        >
                            Strength Combination
                        </div>

                        <div
                            className="drug-strength-validation-value"
                        >

                            {
                                hasDuplicateStrength ? (

                                    <Tag
                                        color="error"
                                    >
                                        Duplicate
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="success"
                                    >
                                        Available
                                    </Tag>

                                )
                            }

                        </div>

                        {
                            hasDuplicateStrength && (

                                <div
                                    className="drug-strength-validation-message"
                                >
                                    Same strength and unit
                                    already exist.
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =============================================
                    NUMERIC VALIDATION
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <div
                        className="drug-strength-validation-card"
                    >

                        <div
                            className="drug-strength-validation-label"
                        >
                            Numeric Validation
                        </div>

                        <div
                            className="drug-strength-validation-value"
                        >

                            {
                                hasValueError ? (

                                    <Tag
                                        color="error"
                                    >
                                        Invalid
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="success"
                                    >
                                        Valid
                                    </Tag>

                                )
                            }

                        </div>

                        {
                            hasValueError && (

                                <div
                                    className="drug-strength-validation-message"
                                >
                                    {
                                        strengthValueError
                                    }
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =============================================
                    RECORD STATUS
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <div
                        className="drug-strength-validation-card"
                    >

                        <div
                            className="drug-strength-validation-label"
                        >
                            Record Status
                        </div>

                        <div
                            className="drug-strength-validation-value"
                        >

                            <Tag
                                color={
                                    status ===
                                    DRUG_STRENGTH_STATUS.INACTIVE
                                        ? "default"
                                        : "success"
                                }
                            >
                                {
                                    status ||
                                    DRUG_STRENGTH_STATUS.ACTIVE
                                }
                            </Tag>

                        </div>

                    </div>

                </Col>


                {/* =============================================
                    OVERALL VALIDATION
                ============================================== */}

                <Col
                    xs={24}
                    md={16}
                >

                    <div
                        className="drug-strength-validation-card drug-strength-validation-overall"
                    >

                        <div
                            className="drug-strength-validation-label"
                        >
                            Overall Validation
                        </div>

                        <div
                            className="drug-strength-validation-value"
                        >

                            {
                                isValid ? (

                                    <Tag
                                        color="success"
                                    >
                                        Ready to Save
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="error"
                                    >
                                        Validation Required
                                    </Tag>

                                )
                            }

                        </div>

                    </div>

                </Col>

            </Row>


            {/* =================================================
                VIEW MODE INFORMATION
            ================================================= */}

            {
                isViewMode &&
                (
                    <Alert
                        className="drug-strength-validation-alert"

                        type="info"

                        showIcon

                        message="Read-only mode"

                        description="Validation information is displayed for reference only."
                    />
                )
            }

        </section>
    );
};


export default ValidationSection;