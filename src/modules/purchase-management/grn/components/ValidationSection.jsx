// src/modules/purchase-management/grn/components/ValidationSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Alert,
    Card,
    Col,
    Form,
    Row,
    Space,
    Statistic,
    Tag,
    Typography,
} from "antd";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SafetyCertificateOutlined,
    WarningOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


/* =========================================================
   COMPONENT
   ========================================================= */

const ValidationSection = ({
    mode = "CREATE",

    disabled = false,

    onValidationChange,
}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       WATCH FORM VALUES
    ===================================================== */

    const items =
        Form.useWatch(
            "items",
            form
        ) || [];


    const batches =
        Form.useWatch(
            "batches",
            form
        ) || [];


    const qualityStatus =
        Form.useWatch(
            "qualityStatus",
            form
        );


    const inspectionStatus =
        Form.useWatch(
            "inspectionStatus",
            form
        );


    const supplierId =
        Form.useWatch(
            "supplierId",
            form
        );


    const storeId =
        Form.useWatch(
            "storeId",
            form
        );


    const purchaseOrderId =
        Form.useWatch(
            "purchaseOrderId",
            form
        );


    /* =====================================================
       SAFE ARRAYS
    ===================================================== */

    const safeItems =
        Array.isArray(items)
            ? items
            : [];


    const safeBatches =
        Array.isArray(batches)
            ? batches
            : [];


    /* =====================================================
       VALIDATION
    ===================================================== */

    const validation = useMemo(
        () => {

            const errors = [];

            const warnings = [];

            /* -------------------------------------------------
               SUPPLIER
            ------------------------------------------------- */

            if (!supplierId) {

                errors.push(
                    "Supplier is required."
                );

            }


            /* -------------------------------------------------
               RECEIVING STORE
            ------------------------------------------------- */

            if (!storeId) {

                errors.push(
                    "Receiving store is required."
                );

            }


            /* -------------------------------------------------
               PURCHASE ORDER
            ------------------------------------------------- */

            if (!purchaseOrderId) {

                warnings.push(
                    "Purchase Order is not selected. Verify that this is a direct receipt."
                );

            }


            /* -------------------------------------------------
               ITEMS
            ------------------------------------------------- */

            if (
                safeItems.length === 0
            ) {

                errors.push(
                    "At least one GRN item is required."
                );

            }


            let totalReceived =
                0;

            let totalAccepted =
                0;

            let totalRejected =
                0;


            safeItems.forEach(
                (
                    item,
                    index
                ) => {

                    const row =
                        index + 1;


                    const received =
                        Number(
                            item?.receivedQuantity
                        ) || 0;


                    const accepted =
                        Number(
                            item?.acceptedQuantity
                        ) || 0;


                    const rejected =
                        Number(
                            item?.rejectedQuantity
                        ) || 0;


                    const pending =
                        Number(
                            item?.pendingQuantity
                        ) || 0;


                    totalReceived +=
                        received;


                    totalAccepted +=
                        accepted;


                    totalRejected +=
                        rejected;


                    /* -----------------------------------------
                       RECEIVED QTY
                    ----------------------------------------- */

                    if (
                        received <= 0
                    ) {

                        warnings.push(
                            `Item ${row}: received quantity is zero.`
                        );

                    }


                    /* -----------------------------------------
                       PENDING QTY
                    ----------------------------------------- */

                    if (
                        pending >= 0 &&
                        received >
                        pending
                    ) {

                        errors.push(
                            `Item ${row}: received quantity cannot exceed pending quantity.`
                        );

                    }


                    /* -----------------------------------------
                       ACCEPTED + REJECTED
                    ----------------------------------------- */

                    if (
                        accepted +
                        rejected !==
                        received
                    ) {

                        errors.push(
                            `Item ${row}: accepted quantity plus rejected quantity must equal received quantity.`
                        );

                    }


                    /* -----------------------------------------
                       BATCH
                    ----------------------------------------- */

                    if (
                        received > 0 &&
                        !item?.batchNumber
                    ) {

                        warnings.push(
                            `Item ${row}: batch number is missing.`
                        );

                    }


                    /* -----------------------------------------
                       EXPIRY
                    ----------------------------------------- */

                    if (
                        received > 0 &&
                        !item?.expiryDate
                    ) {

                        warnings.push(
                            `Item ${row}: expiry date is missing.`
                        );

                    }

                }
            );


            /* -------------------------------------------------
               BATCH VALIDATION
            ------------------------------------------------- */

            safeBatches.forEach(
                (
                    batch,
                    index
                ) => {

                    const row =
                        index + 1;


                    const quantity =
                        Number(
                            batch?.quantity
                        ) || 0;


                    const accepted =
                        Number(
                            batch?.acceptedQuantity
                        ) || 0;


                    const rejected =
                        Number(
                            batch?.rejectedQuantity
                        ) || 0;


                    if (
                        !batch?.batchNumber
                    ) {

                        errors.push(
                            `Batch ${row}: batch number is required.`
                        );

                    }


                    if (
                        quantity >
                        0 &&
                        !batch?.expiryDate
                    ) {

                        errors.push(
                            `Batch ${row}: expiry date is required.`
                        );

                    }


                    if (
                        accepted +
                        rejected >
                        quantity
                    ) {

                        errors.push(
                            `Batch ${row}: accepted and rejected quantity cannot exceed batch quantity.`
                        );

                    }

                }
            );


            /* -------------------------------------------------
               QUALITY
            ------------------------------------------------- */

            if (
                !qualityStatus
            ) {

                warnings.push(
                    "Quality status has not been selected."
                );

            }


            /* -------------------------------------------------
               INSPECTION
            ------------------------------------------------- */

            if (
                !inspectionStatus
            ) {

                warnings.push(
                    "Inspection status has not been selected."
                );

            }


            /* -------------------------------------------------
               FINAL RESULT
            ------------------------------------------------- */

            let status =
                "VALID";


            if (
                errors.length >
                0
            ) {

                status =
                    "ERROR";

            }
            else if (
                warnings.length >
                0
            ) {

                status =
                    "WARNING";

            }


            return {

                status,

                errors,

                warnings,

                totalReceived,

                totalAccepted,

                totalRejected,

            };

        },
        [
            safeItems,
            safeBatches,
            supplierId,
            storeId,
            purchaseOrderId,
            qualityStatus,
            inspectionStatus,
        ]
    );


    /* =====================================================
       SYNC VALIDATION STATUS
    ===================================================== */

    useEffect(
        () => {

            form.setFieldsValue({

                validationStatus:
                    validation.status,

                validationErrors:
                    validation.errors.join(
                        "\n"
                    ),

            });


            if (
                typeof onValidationChange ===
                "function"
            ) {

                onValidationChange(
                    validation
                );

            }

        },
        [
            form,
            validation,
            onValidationChange,
        ]
    );


    /* =====================================================
       STATUS DISPLAY
    ===================================================== */

    const isValid =
        validation.status ===
        "VALID";


    const hasErrors =
        validation.status ===
        "ERROR";


    const hasWarnings =
        validation.status ===
        "WARNING";


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <SafetyCertificateOutlined />

                    <span>
                        GRN Validation
                    </span>

                    {
                        isValid && (

                            <Tag
                                icon={
                                    <CheckCircleOutlined />
                                }
                                color="success"
                            >
                                Valid
                            </Tag>

                        )
                    }


                    {
                        hasWarnings && (

                            <Tag
                                icon={
                                    <WarningOutlined />
                                }
                                color="warning"
                            >
                                Warning
                            </Tag>

                        )
                    }


                    {
                        hasErrors && (

                            <Tag
                                icon={
                                    <CloseCircleOutlined />
                                }
                                color="error"
                            >
                                Error
                            </Tag>

                        )
                    }

                </Space>

            }

            style={{
                marginBottom:
                    20,
            }}

        >

            {/* =================================================
                SUMMARY
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
            >

                <Col
                    xs={12}
                    sm={6}
                >

                    <Card
                        size="small"
                    >

                        <Statistic
                            title="Items"
                            value={
                                safeItems.length
                            }
                        />

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                >

                    <Card
                        size="small"
                    >

                        <Statistic
                            title="Received"
                            value={
                                validation.totalReceived
                            }
                        />

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                >

                    <Card
                        size="small"
                    >

                        <Statistic
                            title="Accepted"
                            value={
                                validation.totalAccepted
                            }
                        />

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                >

                    <Card
                        size="small"
                    >

                        <Statistic
                            title="Rejected"
                            value={
                                validation.totalRejected
                            }
                        />

                    </Card>

                </Col>

            </Row>


            {/* =================================================
                ERRORS
            ================================================= */}

            {
                validation.errors.length >
                0 && (

                    <Alert

                        style={{
                            marginTop:
                                16,
                        }}

                        type="error"

                        showIcon

                        icon={
                            <CloseCircleOutlined />
                        }

                        message={
                            `Validation Errors (${validation.errors.length})`
                        }

                        description={

                            <ul
                                style={{
                                    margin:
                                        "8px 0 0 18px",
                                    padding:
                                        0,
                                }}
                            >

                                {
                                    validation.errors.map(
                                        (
                                            error,
                                            index
                                        ) => (

                                            <li
                                                key={
                                                    `grn-validation-error-${index}`
                                                }
                                            >
                                                {
                                                    error
                                                }
                                            </li>

                                        )
                                    )
                                }

                            </ul>

                        }

                    />

                )
            }


            {/* =================================================
                WARNINGS
            ================================================= */}

            {
                validation.warnings.length >
                0 && (

                    <Alert

                        style={{
                            marginTop:
                                16,
                        }}

                        type="warning"

                        showIcon

                        icon={
                            <WarningOutlined />
                        }

                        message={
                            `Validation Warnings (${validation.warnings.length})`
                        }

                        description={

                            <ul
                                style={{
                                    margin:
                                        "8px 0 0 18px",
                                    padding:
                                        0,
                                }}
                            >

                                {
                                    validation.warnings.map(
                                        (
                                            warning,
                                            index
                                        ) => (

                                            <li
                                                key={
                                                    `grn-validation-warning-${index}`
                                                }
                                            >
                                                {
                                                    warning
                                                }
                                            </li>

                                        )
                                    )
                                }

                            </ul>

                        }

                    />

                )
            }


            {/* =================================================
                SUCCESS
            ================================================= */}

            {
                isValid && (

                    <Alert

                        style={{
                            marginTop:
                                16,
                        }}

                        type="success"

                        showIcon

                        message="GRN validation passed"

                        description={
                            "All mandatory GRN checks are currently satisfied."
                        }

                    />

                )
            }


            {/* =================================================
                HIDDEN FIELDS
            ================================================= */}

            <Form.Item
                name="validationStatus"
                hidden
            >
                <input />
            </Form.Item>


            <Form.Item
                name="validationErrors"
                hidden
            >
                <input />
            </Form.Item>

        </Card>

    );

};


export default ValidationSection;