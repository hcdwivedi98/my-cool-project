// src/modules/purchase-management/purchase-order/components/ValidationSection.jsx

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
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";


/* =========================================================
   VALIDATION SECTION
   ========================================================= */

const ValidationSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       WATCH FORM VALUES
       ===================================================== */

    const values =
        Form.useWatch(
            [],
            form
        ) || {};


    const {

        poNumber,

        poDate,

        poType,

        purchaseRequisitionId,

        supplierId,

        storeId,

        items,

        paymentTerms,

        deliveryTerms,

        currency,

        expectedDeliveryDate,

        deliveryLocation,

        billingAddress,

        shippingAddress,

        grandTotal,

    } =
        values;


    /* =====================================================
       SAFE VALUES
       ===================================================== */

    const safeItems =
        Array.isArray(
            items
        )
            ? items
            : [];


    /* =====================================================
       VALIDATION
       ===================================================== */

    const validation =
        useMemo(
            () => {

                const errors = [];

                const warnings = [];

                const success = [];


                /* -----------------------------------------
                   PO NUMBER
                ----------------------------------------- */

                if (
                    !poNumber
                ) {

                    errors.push(
                        "PO number is required."
                    );

                }
                else {

                    success.push(
                        "PO number is available."
                    );

                }


                /* -----------------------------------------
                   PO DATE
                ----------------------------------------- */

                if (
                    !poDate
                ) {

                    errors.push(
                        "PO date is required."
                    );

                }
                else {

                    success.push(
                        "PO date is valid."
                    );

                }


                /* -----------------------------------------
                   PO TYPE
                ----------------------------------------- */

                if (
                    !poType
                ) {

                    errors.push(
                        "PO type must be selected."
                    );

                }
                else {

                    success.push(
                        "PO type is selected."
                    );

                }


                /* -----------------------------------------
                   SUPPLIER
                ----------------------------------------- */

                if (
                    !supplierId
                ) {

                    errors.push(
                        "Supplier must be selected."
                    );

                }
                else {

                    success.push(
                        "Supplier is selected."
                    );

                }


                /* -----------------------------------------
                   STORE
                ----------------------------------------- */

                if (
                    !storeId
                ) {

                    warnings.push(
                        "Store is not selected."
                    );

                }
                else {

                    success.push(
                        "Store is selected."
                    );

                }


                /* -----------------------------------------
                   PURCHASE REQUISITION
                ----------------------------------------- */

                if (
                    !purchaseRequisitionId
                ) {

                    warnings.push(
                        "Purchase requisition reference is not linked."
                    );

                }


                /* -----------------------------------------
                   ITEMS
                ----------------------------------------- */

                if (
                    safeItems.length ===
                    0
                ) {

                    errors.push(
                        "At least one purchase order item is required."
                    );

                }
                else {

                    success.push(
                        `${safeItems.length} item(s) added to the purchase order.`
                    );

                }


                /* -----------------------------------------
                   ITEM LEVEL VALIDATION
                ----------------------------------------- */

                safeItems.forEach(
                    (
                        item,
                        index
                    ) => {

                        const itemNumber =
                            index + 1;


                        const quantity =
                            Number(
                                item?.orderedQuantity
                            ) || 0;


                        const rate =
                            Number(
                                item?.unitRate
                            ) || 0;


                        if (
                            !item?.drugId
                        ) {

                            errors.push(
                                `Item ${itemNumber}: drug/item is not selected.`
                            );

                        }


                        if (
                            quantity <=
                            0
                        ) {

                            errors.push(
                                `Item ${itemNumber}: ordered quantity must be greater than zero.`
                            );

                        }


                        if (
                            rate < 0
                        ) {

                            errors.push(
                                `Item ${itemNumber}: unit rate cannot be negative.`
                            );

                        }


                        if (
                            Number(
                                item?.discountPercent
                            ) > 100
                        ) {

                            errors.push(
                                `Item ${itemNumber}: discount cannot exceed 100%.`
                            );

                        }


                        if (
                            Number(
                                item?.taxPercent
                            ) < 0
                        ) {

                            errors.push(
                                `Item ${itemNumber}: tax percentage cannot be negative.`
                            );

                        }

                    }
                );


                /* -----------------------------------------
                   PAYMENT TERMS
                ----------------------------------------- */

                if (
                    !paymentTerms
                ) {

                    warnings.push(
                        "Payment terms are not configured."
                    );

                }
                else {

                    success.push(
                        "Payment terms are configured."
                    );

                }


                /* -----------------------------------------
                   DELIVERY TERMS
                ----------------------------------------- */

                if (
                    !deliveryTerms
                ) {

                    warnings.push(
                        "Delivery terms are not configured."
                    );

                }
                else {

                    success.push(
                        "Delivery terms are configured."
                    );

                }


                /* -----------------------------------------
                   CURRENCY
                ----------------------------------------- */

                if (
                    !currency
                ) {

                    errors.push(
                        "Currency must be selected."
                    );

                }
                else {

                    success.push(
                        "Currency is selected."
                    );

                }


                /* -----------------------------------------
                   DELIVERY DATE
                ----------------------------------------- */

                if (
                    expectedDeliveryDate &&
                    poDate &&
                    expectedDeliveryDate.isBefore(
                        poDate,
                        "day"
                    )
                ) {

                    errors.push(
                        "Expected delivery date cannot be before PO date."
                    );

                }


                /* -----------------------------------------
                   DELIVERY LOCATION
                ----------------------------------------- */

                if (
                    !deliveryLocation
                ) {

                    warnings.push(
                        "Delivery location is not specified."
                    );

                }


                /* -----------------------------------------
                   BILLING ADDRESS
                ----------------------------------------- */

                if (
                    !billingAddress
                ) {

                    warnings.push(
                        "Billing address is not specified."
                    );

                }


                /* -----------------------------------------
                   SHIPPING ADDRESS
                ----------------------------------------- */

                if (
                    !shippingAddress
                ) {

                    warnings.push(
                        "Shipping address is not specified."
                    );

                }


                /* -----------------------------------------
                   GRAND TOTAL
                ----------------------------------------- */

                const total =
                    Number(
                        grandTotal
                    ) || 0;


                if (
                    total <=
                    0
                ) {

                    errors.push(
                        "Grand total must be greater than zero."
                    );

                }
                else {

                    success.push(
                        "Grand total is valid."
                    );

                }


                /* -----------------------------------------
                   OVERALL
                ----------------------------------------- */

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

                    success,

                };

            },
            [
                poNumber,
                poDate,
                poType,
                purchaseRequisitionId,
                supplierId,
                storeId,
                safeItems,
                paymentTerms,
                deliveryTerms,
                currency,
                expectedDeliveryDate,
                deliveryLocation,
                billingAddress,
                shippingAddress,
                grandTotal,
            ]
        );


    /* =====================================================
       STATUS
       ===================================================== */

    const isValid =
        validation.status ===
        "VALID";


    const hasErrors =
        validation.errors.length >
        0;


    const hasWarnings =
        validation.warnings.length >
        0;


    /* =====================================================
       STATUS CONFIG
       ===================================================== */

    const statusConfig = {

        VALID: {

            color:
                "success",

            tagColor:
                "green",

            icon:
                <CheckCircleOutlined />,

            label:
                "Ready",

        },

        WARNING: {

            color:
                "warning",

            tagColor:
                "gold",

            icon:
                <ExclamationCircleOutlined />,

            label:
                "Ready with Warnings",

        },

        ERROR: {

            color:
                "error",

            tagColor:
                "red",

            icon:
                <CloseCircleOutlined />,

            label:
                "Validation Failed",

        },

    };


    const currentStatus =
        statusConfig[
            validation.status
        ];


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-validation-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="purchase-order-section-header"
            >

                <div
                    className="purchase-order-section-title"
                >
                    Validation
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Review purchase order completeness and
                    business validation before submission.
                </div>

            </div>


            {/* =================================================
                OVERALL STATUS
            ================================================= */}

            <div
                className="purchase-order-validation-card"
            >

                <div
                    className="purchase-order-validation-label"
                >
                    Overall Status
                </div>


                <div
                    className="purchase-order-validation-overall"
                >

                    <div>

                        <span
                            style={{
                                marginRight:
                                    8,
                            }}
                        >
                            {
                                currentStatus.icon
                            }
                        </span>

                        <span>
                            {
                                currentStatus.label
                            }
                        </span>

                    </div>


                    <Tag
                        color={
                            currentStatus.tagColor
                        }
                    >
                        {
                            validation.errors.length
                        } Errors
                    </Tag>

                </div>

            </div>


            {/* =================================================
                ERRORS
            ================================================= */}

            {
                hasErrors && (

                    <div
                        className="purchase-order-validation-list-card purchase-order-validation-error-card"
                    >

                        <div
                            className="purchase-order-validation-list-title"
                        >
                            Validation Errors
                        </div>


                        {
                            validation.errors.map(
                                (
                                    message,
                                    index
                                ) => (

                                    <Alert
                                        key={
                                            `error-${index}`
                                        }

                                        type="error"

                                        showIcon

                                        message={
                                            message
                                        }

                                        style={{
                                            marginTop:
                                                index ===
                                                0
                                                    ? 0
                                                    : 8,
                                        }}
                                    />

                                )
                            )
                        }

                    </div>

                )
            }


            {/* =================================================
                WARNINGS
            ================================================= */}

            {
                hasWarnings && (

                    <div
                        className="purchase-order-validation-list-card purchase-order-validation-warning-card"
                    >

                        <div
                            className="purchase-order-validation-list-title"
                        >
                            Warnings
                        </div>


                        {
                            validation.warnings.map(
                                (
                                    message,
                                    index
                                ) => (

                                    <Alert
                                        key={
                                            `warning-${index}`
                                        }

                                        type="warning"

                                        showIcon

                                        message={
                                            message
                                        }

                                        style={{
                                            marginTop:
                                                index ===
                                                0
                                                    ? 0
                                                    : 8,
                                        }}
                                    />

                                )
                            )
                        }

                    </div>

                )
            }


            {/* =================================================
                SUCCESS
            ================================================= */}

            {
                validation.success.length >
                0 && (

                    <div
                        className="purchase-order-validation-list-card purchase-order-validation-success-card"
                    >

                        <div
                            className="purchase-order-validation-list-title"
                        >
                            Passed Checks
                        </div>


                        <Row
                            gutter={[
                                12,
                                12,
                            ]}
                        >

                            {
                                validation.success.map(
                                    (
                                        message,
                                        index
                                    ) => (

                                        <Col
                                            xs={24}
                                            md={12}
                                            key={
                                                `success-${index}`
                                            }
                                        >

                                            <div
                                                className="purchase-order-validation-success-item"
                                            >

                                                <CheckCircleOutlined />

                                                <span>
                                                    {
                                                        message
                                                    }
                                                </span>

                                            </div>

                                        </Col>

                                    )
                                )
                            }

                        </Row>

                    </div>

                )
            }


            {/* =================================================
                VIEW MODE NOTE
            ================================================= */}

            {
                isViewMode && (

                    <div
                        className="purchase-order-validation-note"
                    >
                        Validation is shown for review only.
                        Editing is disabled in view mode.
                    </div>

                )
            }


            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <Form.Item
                name="validationStatus"
                hidden
            >
                <input
                    type="hidden"
                    value={
                        validation.status
                    }
                    readOnly
                />
            </Form.Item>


            <Form.Item
                name="validationErrors"
                hidden
            >
                <input
                    type="hidden"
                    value={
                        validation.errors.join(
                            "|"
                        )
                    }
                    readOnly
                />
            </Form.Item>

        </section>

    );

};


export default ValidationSection;