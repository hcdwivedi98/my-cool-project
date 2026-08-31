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

    /*
     * Step-32
     *
     * These errors come from GRNForm -> validateGRN().
     *
     * They may be:
     *
     * {
     *     field: ["items", 0],
     *     index: 0,
     *     itemId: "...",
     *     itemName: "...",
     *     message: "..."
     * }
     */

    validationErrors = [],

    /*
     * Backward compatibility:
     *
     * Step-31 may pass:
     *
     * errors={validationErrors}
     *
     * Therefore both props are supported.
     */

    errors: externalErrors,

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
        Array.isArray(
            items
        )
            ? items
            : [];


    const safeBatches =
        Array.isArray(
            batches
        )
            ? batches
            : [];


    /* =====================================================
       EXTERNAL VALIDATION ERRORS
    ===================================================== */

    const normalizedExternalErrors =
        useMemo(
            () => {

                const source =
                    Array.isArray(
                        externalErrors
                    )
                        ? externalErrors
                        : Array.isArray(
                            validationErrors
                        )
                            ? validationErrors
                            : [];


                return source
                    .map(
                        (
                            error
                        ) => {

                            /* ---------------------------------
                               STRING ERROR
                            --------------------------------- */

                            if (
                                typeof error ===
                                "string"
                            ) {

                                return {

                                    field:
                                        null,

                                    index:
                                        -1,

                                    itemId:
                                        null,

                                    itemName:
                                        "",

                                    message:
                                        error,

                                };

                            }


                            /* ---------------------------------
                               OBJECT ERROR
                            --------------------------------- */

                            return {

                                field:
                                    error?.field ??
                                    null,

                                index:
                                    Number.isInteger(
                                        error?.index
                                    )
                                        ? error.index
                                        : -1,

                                itemId:
                                    error?.itemId ??
                                    null,

                                itemName:
                                    error?.itemName ||
                                    "",

                                message:
                                    error?.message ||
                                    "",

                            };

                        }
                    )
                    .filter(
                        error =>
                            Boolean(
                                error.message
                            )
                    );

            },
            [
                externalErrors,
                validationErrors,
            ]
        );


    /* =====================================================
       LIVE VALIDATION
       ===================================================== */

    const validation =
        useMemo(
            () => {

                const localErrors = [];

                const warnings = [];


                /* -----------------------------------------
                   SUPPLIER
                ----------------------------------------- */

                if (
                    !supplierId
                ) {

                    localErrors.push(
                        "Supplier is required."
                    );

                }


                /* -----------------------------------------
                   RECEIVING STORE
                ----------------------------------------- */

                if (
                    !storeId
                ) {

                    localErrors.push(
                        "Receiving store is required."
                    );

                }


                /* -----------------------------------------
                   PURCHASE ORDER
                ----------------------------------------- */

                if (
                    !purchaseOrderId
                ) {

                    warnings.push(
                        "Purchase Order is not selected. Verify that this is a direct receipt."
                    );

                }


                /* -----------------------------------------
                   ITEMS
                ----------------------------------------- */

                if (
                    safeItems.length ===
                    0
                ) {

                    localErrors.push(
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


                        /* ---------------------------------
                           RECEIVED QTY
                        --------------------------------- */

                        if (
                            received <=
                            0
                        ) {

                            warnings.push(
                                `Item ${row}: received quantity is zero.`
                            );

                        }


                        /* ---------------------------------
                           PENDING QTY
                        --------------------------------- */

                        if (
                            pending >=
                                0 &&
                            received >
                                pending
                        ) {

                            localErrors.push(
                                `Item ${row}: received quantity cannot exceed pending quantity.`
                            );

                        }


                        /* ---------------------------------
                           ACCEPTED + REJECTED
                        --------------------------------- */

                        if (
                            accepted +
                                rejected !==
                            received
                        ) {

                            localErrors.push(
                                `Item ${row}: accepted quantity plus rejected quantity must equal received quantity.`
                            );

                        }


                        /* ---------------------------------
                           BATCH
                        --------------------------------- */

                        if (
                            received >
                                0 &&
                            !item?.batchNumber
                        ) {

                            warnings.push(
                                `Item ${row}: batch number is missing.`
                            );

                        }


                        /* ---------------------------------
                           EXPIRY
                        --------------------------------- */

                        if (
                            received >
                                0 &&
                            !item?.expiryDate
                        ) {

                            warnings.push(
                                `Item ${row}: expiry date is missing.`
                            );

                        }

                    }
                );


                /* -----------------------------------------
                   BATCH VALIDATION
                ----------------------------------------- */

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

                            localErrors.push(
                                `Batch ${row}: batch number is required.`
                            );

                        }


                        if (
                            quantity >
                                0 &&
                            !batch?.expiryDate
                        ) {

                            localErrors.push(
                                `Batch ${row}: expiry date is required.`
                            );

                        }


                        if (
                            accepted +
                                rejected >
                            quantity
                        ) {

                            localErrors.push(
                                `Batch ${row}: accepted and rejected quantity cannot exceed batch quantity.`
                            );

                        }

                    }
                );


                /* -----------------------------------------
                   QUALITY
                ----------------------------------------- */

                if (
                    !qualityStatus
                ) {

                    warnings.push(
                        "Quality status has not been selected."
                    );

                }


                /* -----------------------------------------
                   INSPECTION
                ----------------------------------------- */

                if (
                    !inspectionStatus
                ) {

                    warnings.push(
                        "Inspection status has not been selected."
                    );

                }


                /* -----------------------------------------
                   STATUS
                ----------------------------------------- */

                let status =
                    "VALID";


                if (
                    localErrors.length >
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

                    errors:
                        localErrors,

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
       FINAL DISPLAY ERRORS
       ===================================================== */

    const displayErrors =
        normalizedExternalErrors.length >
        0
            ? normalizedExternalErrors
            : validation.errors.map(
                (
                    message
                ) => ({

                    field:
                        null,

                    index:
                        -1,

                    itemId:
                        null,

                    itemName:
                        "",

                    message,

                })
            );


    /* =====================================================
       HAS EXTERNAL ERRORS
    ===================================================== */

    const hasExternalErrors =
        normalizedExternalErrors.length >
        0;


    /* =====================================================
       FINAL STATUS
       ===================================================== */

    const finalHasErrors =
        hasExternalErrors ||
        validation.status ===
        "ERROR";


    const finalHasWarnings =
        !finalHasErrors &&
        validation.status ===
        "WARNING";


    const finalIsValid =
        !finalHasErrors &&
        !finalHasWarnings;


    /* =====================================================
       SYNC VALIDATION STATUS
    ===================================================== */

    useEffect(
        () => {

            /*
             * Keep existing form fields.
             */

            form.setFieldsValue({

                validationStatus:
                    finalHasErrors
                        ? "ERROR"
                        : finalHasWarnings
                            ? "WARNING"
                            : "VALID",

                validationErrors:
                    displayErrors
                        .map(
                            error =>
                                error.message
                        )
                        .join(
                            "\n"
                        ),

            });


            if (
                typeof onValidationChange ===
                "function"
            ) {

                onValidationChange({

                    status:
                        finalHasErrors
                            ? "ERROR"
                            : finalHasWarnings
                                ? "WARNING"
                                : "VALID",

                    errors:
                        displayErrors,

                    warnings:
                        validation.warnings,

                    totalReceived:
                        validation.totalReceived,

                    totalAccepted:
                        validation.totalAccepted,

                    totalRejected:
                        validation.totalRejected,

                });

            }

        },
        [
            form,
            finalHasErrors,
            finalHasWarnings,
            displayErrors,
            validation.warnings,
            validation.totalReceived,
            validation.totalAccepted,
            validation.totalRejected,
            onValidationChange,
        ]
    );


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
                        finalIsValid && (

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
                        finalHasWarnings && (

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
                        finalHasErrors && (

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
                STRUCTURED VALIDATION ERRORS
            ================================================= */}

            {
                displayErrors.length >
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
                            `Validation Errors (${displayErrors.length})`
                        }

                        description={

                            <div
                                style={{
                                    marginTop:
                                        8,
                                }}
                            >

                                {
                                    displayErrors.map(
                                        (
                                            error,
                                            index
                                        ) => {

                                            const hasItemIndex =
                                                Number.isInteger(
                                                    error?.index
                                                ) &&
                                                error.index >=
                                                0;


                                            const itemLabel =
                                                hasItemIndex
                                                    ? (
                                                        error?.itemName
                                                            ? `Item ${error.index + 1} — ${error.itemName}`
                                                            : `Item ${error.index + 1}`
                                                    )
                                                    : null;


                                            return (

                                                <div

                                                    key={
                                                        `grn-validation-error-${index}`
                                                    }

                                                    style={{
                                                        marginBottom:
                                                            index ===
                                                            displayErrors.length - 1
                                                                ? 0
                                                                : 8,

                                                        paddingBottom:
                                                            index ===
                                                            displayErrors.length - 1
                                                                ? 0
                                                                : 8,

                                                        borderBottom:
                                                            index ===
                                                            displayErrors.length - 1
                                                                ? "none"
                                                                : "1px solid #f0f0f0",
                                                    }}

                                                >

                                                    {
                                                        itemLabel && (

                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        600,

                                                                    marginBottom:
                                                                        2,
                                                                }}
                                                            >
                                                                {
                                                                    itemLabel
                                                                }
                                                            </div>

                                                        )
                                                    }


                                                    {
                                                        error?.field &&
                                                        Array.isArray(
                                                            error.field
                                                        ) &&
                                                        error.field.length >
                                                        0 && (

                                                            <Text
                                                                type="secondary"
                                                                style={{
                                                                    display:
                                                                        "block",

                                                                    fontSize:
                                                                        12,

                                                                    marginBottom:
                                                                        2,
                                                                }}
                                                            >
                                                                Field:{" "}
                                                                {
                                                                    error.field
                                                                        .filter(
                                                                            value =>
                                                                                typeof value !==
                                                                                "number"
                                                                        )
                                                                        .join(
                                                                            "."
                                                                        ) ||
                                                                    "General"
                                                                }
                                                            </Text>

                                                        )
                                                    }


                                                    <Text
                                                        type="danger"
                                                    >
                                                        {
                                                            error.message
                                                        }
                                                    </Text>

                                                </div>

                                            );

                                        }
                                    )
                                }

                            </div>

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
                finalIsValid && (

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