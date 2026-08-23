/* =========================================================
   DRUG UNIT - VALIDATION SECTION
   ========================================================= */

import React, {
    useMemo,
} from "react";

import {
    Alert,
    Col,
    Form,
    Row,
    Tag,
} from "antd";

import {
    DRUG_UNIT_STATUS,
    DRUG_UNIT_TYPES,
} from "../../constants/drugUnit.constants";

import {
    drugUnitList,
} from "../../mock/drugUnit.mock";

import {
    hasDuplicateDrugUnitCode,
    hasDuplicateDrugUnitSymbol,
    hasDuplicateDrugUnitNameAndType,
    isCountUnitPrecisionValid,
    isValidDrugUnitPrecision,
} from "../../utils/drugUnit.helper";


/* =========================================================
   COMPONENT
   ========================================================= */

const ValidationSection = ({
    form,
    mode,
    record = null,
    disabled = false,
}) => {

    const isViewMode =
        mode === "VIEW";


    const unitCode =
        Form.useWatch(
            "unitCode",
            form
        );


    const unitName =
        Form.useWatch(
            "unitName",
            form
        );


    const symbol =
        Form.useWatch(
            "symbol",
            form
        );


    const unitType =
        Form.useWatch(
            "unitType",
            form
        );


    const decimalPrecision =
        Form.useWatch(
            "decimalPrecision",
            form
        );


    const isActive =
        Form.useWatch(
            "isActive",
            form
        );


    /* =====================================================
       CURRENT RECORD ID
       ===================================================== */

    const currentId =
        record?.id || null;


    /* =====================================================
       VALIDATION RESULT
       ===================================================== */

    const validation = useMemo(
        () => {

            const codeDuplicate =
                hasDuplicateDrugUnitCode(
                    drugUnitList,
                    unitCode,
                    currentId
                );


            const symbolDuplicate =
                hasDuplicateDrugUnitSymbol(
                    drugUnitList,
                    symbol,
                    currentId
                );


            const nameTypeDuplicate =
                hasDuplicateDrugUnitNameAndType(
                    drugUnitList,
                    unitName,
                    unitType,
                    currentId
                );


            const precisionValid =
                isValidDrugUnitPrecision(
                    decimalPrecision
                );


            const countPrecisionValid =
                isCountUnitPrecisionValid(
                    unitType,
                    decimalPrecision
                );


            const codeValid =
                Boolean(
                    String(
                        unitCode || ""
                    ).trim()
                ) &&
                !codeDuplicate;


            const symbolValid =
                Boolean(
                    String(
                        symbol || ""
                    ).trim()
                ) &&
                !symbolDuplicate;


            const nameValid =
                Boolean(
                    String(
                        unitName || ""
                    ).trim()
                ) &&
                !nameTypeDuplicate;


            return {

                codeValid,

                symbolValid,

                nameValid,

                precisionValid,

                countPrecisionValid,

                codeDuplicate,

                symbolDuplicate,

                nameTypeDuplicate,

                overallValid:
                    codeValid &&
                    symbolValid &&
                    nameValid &&
                    precisionValid &&
                    countPrecisionValid,

            };

        },
        [
            unitCode,
            unitName,
            symbol,
            unitType,
            decimalPrecision,
            currentId,
        ]
    );


    /* =====================================================
       VALIDATION STATUS
       ===================================================== */

    const renderStatus = (
        valid
    ) => {

        if (valid) {

            return (
                <Tag
                    color="success"
                >
                    Valid
                </Tag>
            );
        }


        return (
            <Tag
                color="error"
            >
                Invalid
            </Tag>
        );
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
                    Validation
                </div>

                <div
                    className="drug-unit-section-description"
                >
                    Verify uniqueness and business rules
                    before saving the drug unit.
                </div>

            </div>


            {/* =============================================
                VALIDATION GRID
            ============================================== */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
            >

                {/* =========================================
                    UNIT CODE
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <div
                        className="drug-unit-validation-card"
                    >

                        <div
                            className="drug-unit-validation-label"
                        >
                            Unit Code
                        </div>

                        <div
                            className="drug-unit-validation-overall"
                        >

                            <span>
                                {
                                    unitCode ||
                                    "-"
                                }
                            </span>

                            {
                                renderStatus(
                                    validation.codeValid
                                )
                            }

                        </div>


                        {
                            validation.codeDuplicate && (

                                <div
                                    className="drug-unit-validation-message"
                                >
                                    Unit code already exists.
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =========================================
                    SYMBOL
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <div
                        className="drug-unit-validation-card"
                    >

                        <div
                            className="drug-unit-validation-label"
                        >
                            Symbol
                        </div>

                        <div
                            className="drug-unit-validation-overall"
                        >

                            <span>
                                {
                                    symbol ||
                                    "-"
                                }
                            </span>

                            {
                                renderStatus(
                                    validation.symbolValid
                                )
                            }

                        </div>


                        {
                            validation.symbolDuplicate && (

                                <div
                                    className="drug-unit-validation-message"
                                >
                                    Symbol already exists.
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =========================================
                    NAME + TYPE
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <div
                        className="drug-unit-validation-card"
                    >

                        <div
                            className="drug-unit-validation-label"
                        >
                            Unit Name + Type
                        </div>

                        <div
                            className="drug-unit-validation-overall"
                        >

                            <span>
                                {
                                    unitName ||
                                    "-"
                                }

                                {" / "}

                                {
                                    unitType ||
                                    "-"
                                }
                            </span>

                            {
                                renderStatus(
                                    validation.nameValid
                                )
                            }

                        </div>


                        {
                            validation.nameTypeDuplicate && (

                                <div
                                    className="drug-unit-validation-message"
                                >
                                    This unit name already exists
                                    for the selected unit type.
                                </div>

                            )
                        }

                    </div>

                </Col>


                {/* =========================================
                    DECIMAL PRECISION
                ========================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <div
                        className="drug-unit-validation-card"
                    >

                        <div
                            className="drug-unit-validation-label"
                        >
                            Decimal Precision
                        </div>

                        <div
                            className="drug-unit-validation-overall"
                        >

                            <span>
                                {
                                    decimalPrecision ??
                                    "-"
                                }
                            </span>

                            {
                                renderStatus(
                                    validation.precisionValid &&
                                    validation.countPrecisionValid
                                )
                            }

                        </div>


                        {
                            !validation.precisionValid && (

                                <div
                                    className="drug-unit-validation-message"
                                >
                                    Precision must be between
                                    0 and 6.
                                </div>

                            )
                        }


                        {
                            !validation.countPrecisionValid && (

                                <div
                                    className="drug-unit-validation-message"
                                >
                                    Count units must use
                                    precision 0.
                                </div>

                            )
                        }

                    </div>

                </Col>

            </Row>


            {/* =============================================
                OVERALL VALIDATION
            ============================================== */}

            <div
                className="drug-unit-validation-overall-card"
            >

                {
                    validation.overallValid ? (

                        <Alert
                            type="success"
                            showIcon
                            message="Validation passed"
                            description="This drug unit satisfies the current uniqueness and business validation rules."
                        />

                    ) : (

                        <Alert
                            type="warning"
                            showIcon
                            message="Validation required"
                            description="Please resolve the validation issues before saving this drug unit."
                        />

                    )
                }

            </div>

        </section>
    );
};


export default ValidationSection;