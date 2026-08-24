// src/modules/purchase-management/purchase-order/components/TermsSection.jsx

import React from "react";

import {
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import usePurchaseOrderLookup
    from "../hooks/usePurchaseOrderLookup";


/* =========================================================
   TERMS SECTION
   ========================================================= */

const TermsSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       LOOKUP
       ===================================================== */

    const {
        paymentTermsOptions = [],
        deliveryTermsOptions = [],
        currencyOptions = [],
    } =
        usePurchaseOrderLookup() || {};


    const safePaymentTermsOptions =
        Array.isArray(
            paymentTermsOptions
        )
            ? paymentTermsOptions
            : [];


    const safeDeliveryTermsOptions =
        Array.isArray(
            deliveryTermsOptions
        )
            ? deliveryTermsOptions
            : [];


    const safeCurrencyOptions =
        Array.isArray(
            currencyOptions
        )
            ? currencyOptions
            : [];


    /* =====================================================
       SUPPLIER PAYMENT TERMS
       ===================================================== */

    const supplierPaymentTerms =
        Form.useWatch(
            "paymentTerms",
            form
        );


    /* =====================================================
       DELIVERY TERMS
       ===================================================== */

    const deliveryTermsRules = [

        {
            required:
                true,

            message:
                "Please select delivery terms.",
        },

    ];


    /* =====================================================
       PAYMENT TERMS
       ===================================================== */

    const paymentTermsRules = [

        {
            required:
                true,

            message:
                "Please select payment terms.",
        },

    ];


    /* =====================================================
       CURRENCY
       ===================================================== */

    const currencyRules = [

        {
            required:
                true,

            message:
                "Please select currency.",
        },

    ];


    /* =====================================================
       DELIVERY DATE VALIDATION
       ===================================================== */

    const validateDeliveryDate = (
        _,
        value
    ) => {

        if (
            !value
        ) {

            return Promise.resolve();

        }


        /*
         * Delivery date cannot be before PO date.
         */

        const poDate =
            form.getFieldValue(
                "poDate"
            );


        if (
            poDate &&
            value.isBefore(
                poDate,
                "day"
            )
        ) {

            return Promise.reject(
                new Error(
                    "Expected delivery date cannot be before PO date."
                )
            );

        }


        return Promise.resolve();

    };


    /* =====================================================
       DELIVERY DATE CHANGE
       ===================================================== */

    const handleDeliveryDateChange = (
        value
    ) => {

        if (
            !value
        ) {

            return;

        }


        form.setFieldValue(
            "expectedDeliveryDate",
            value
        );

    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-terms-section"
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
                    Commercial & Delivery Terms
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Define payment, delivery, currency and
                    fulfilment conditions for this purchase order.
                </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =================================================
                    PAYMENT TERMS
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="paymentTerms"
                        label="Payment Terms"
                        rules={
                            paymentTermsRules
                        }
                    >

                        <Select
                            placeholder="Select payment terms"

                            options={
                                safePaymentTermsOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DELIVERY TERMS
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="deliveryTerms"
                        label="Delivery Terms"
                        rules={
                            deliveryTermsRules
                        }
                    >

                        <Select
                            placeholder="Select delivery terms"

                            options={
                                safeDeliveryTermsOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    CURRENCY
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="currency"
                        label="Currency"
                        rules={
                            currencyRules
                        }
                    >

                        <Select
                            placeholder="Select currency"

                            options={
                                safeCurrencyOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    EXPECTED DELIVERY DATE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="expectedDeliveryDate"
                        label="Expected Delivery Date"
                        rules={[
                            {
                                validator:
                                    validateDeliveryDate,
                            },
                        ]}
                    >

                        <DatePicker
                            style={{
                                width:
                                    "100%",
                            }}

                            format="DD-MMM-YYYY"

                            disabled={
                                isViewMode
                            }

                            placeholder="Select delivery date"

                            onChange={
                                handleDeliveryDateChange
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DELIVERY LOCATION
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="deliveryLocation"
                        label="Delivery Location"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Delivery location is required.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter delivery location"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                200
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SHIPPING METHOD
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="shippingMethod"
                        label="Shipping Method"
                    >

                        <Input
                            placeholder="Enter shipping method"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                100
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SUPPLIER REFERENCE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="supplierReference"
                        label="Supplier Reference"
                    >

                        <Input
                            placeholder="Supplier quotation / reference no."

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                100
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    QUOTATION NUMBER
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="quotationNumber"
                        label="Quotation Number"
                    >

                        <Input
                            placeholder="Enter quotation number"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                100
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    QUOTATION DATE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="quotationDate"
                        label="Quotation Date"
                    >

                        <DatePicker
                            style={{
                                width:
                                    "100%",
                            }}

                            format="DD-MMM-YYYY"

                            disabled={
                                isViewMode
                            }

                            placeholder="Select quotation date"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INTERNAL REFERENCE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="internalReference"
                        label="Internal Reference"
                    >

                        <Input
                            placeholder="Enter internal reference"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                100
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PAYMENT TERMS NOTE
                ================================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="paymentTermsNote"
                        label="Payment Terms Note"
                    >

                        <Input.TextArea
                            rows={
                                3
                            }

                            placeholder={
                                supplierPaymentTerms
                                    ? "Add any additional payment conditions"
                                    : "Enter additional payment conditions"
                            }

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                500
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>

    );

};


export default TermsSection;