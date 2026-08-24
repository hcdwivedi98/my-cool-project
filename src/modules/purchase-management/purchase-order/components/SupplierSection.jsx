// src/modules/purchase-management/purchase-order/components/SupplierSection.jsx

import React, {
    useEffect,
} from "react";

import {
    Col,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import usePurchaseOrderLookup
    from "../hooks/usePurchaseOrderLookup";


/* =========================================================
   SUPPLIER SECTION
   ========================================================= */

const SupplierSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    const {
        suppliers = [],
        supplierOptions = [],
        getSupplierById,
    } =
        usePurchaseOrderLookup() || {};


    const safeSuppliers =
        Array.isArray(
            suppliers
        )
            ? suppliers
            : [];


    const safeSupplierOptions =
        Array.isArray(
            supplierOptions
        )
            ? supplierOptions
            : [];


    /* =====================================================
       WATCH SUPPLIER
       ===================================================== */

    const supplierId =
        Form.useWatch(
            "supplierId",
            form
        );


    /* =====================================================
       SELECTED SUPPLIER
       ===================================================== */

    const selectedSupplier =
        typeof getSupplierById ===
        "function"

            ? getSupplierById(
                supplierId
            )

            : safeSuppliers.find(
                (
                    supplier
                ) =>
                    supplier.id ===
                    supplierId
            ) || null;


    /* =====================================================
       SUPPLIER CHANGE
       ===================================================== */

    const handleSupplierChange = (
        value
    ) => {

        const supplier =
            typeof getSupplierById ===
            "function"

                ? getSupplierById(
                    value
                )

                : safeSuppliers.find(
                    (
                        item
                    ) =>
                        item.id ===
                        value
                ) || null;


        if (
            !supplier
        ) {

            return;

        }


        /*
         * Payment terms come from supplier
         * unless the PO already has a manually
         * selected value.
         */

        const currentPaymentTerms =
            form.getFieldValue(
                "paymentTerms"
            );


        if (
            !currentPaymentTerms &&
            supplier.paymentTerms
        ) {

            form.setFieldValue(
                "paymentTerms",
                supplier.paymentTerms
            );

        }


        /*
         * Auto-populate billing/shipping
         * address from supplier.
         */

        if (
            supplier.billingAddress
        ) {

            form.setFieldValue(
                "billingAddress",
                supplier.billingAddress
            );

        }


        if (
            supplier.shippingAddress
        ) {

            form.setFieldValue(
                "shippingAddress",
                supplier.shippingAddress
            );

        }

    };


    /* =====================================================
       INITIAL SUPPLIER DATA
       ===================================================== */

    useEffect(
        () => {

            if (
                !supplierId ||
                !selectedSupplier
            ) {

                return;

            }


            /*
             * Only populate empty fields.
             * This prevents overwriting values
             * while editing an existing PO.
             */

            const billingAddress =
                form.getFieldValue(
                    "billingAddress"
                );


            const shippingAddress =
                form.getFieldValue(
                    "shippingAddress"
                );


            if (
                !billingAddress &&
                selectedSupplier.billingAddress
            ) {

                form.setFieldValue(
                    "billingAddress",
                    selectedSupplier.billingAddress
                );

            }


            if (
                !shippingAddress &&
                selectedSupplier.shippingAddress
            ) {

                form.setFieldValue(
                    "shippingAddress",
                    selectedSupplier.shippingAddress
                );

            }

        },
        [
            supplierId,
            selectedSupplier,
            form,
        ]
    );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-supplier-section"
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
                    Supplier Information
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Select the supplier and maintain the
                    billing and delivery information.
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
                    SUPPLIER
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="supplierId"
                        label="Supplier"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Please select supplier.",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select supplier"

                            options={
                                safeSupplierOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"

                            onChange={
                                handleSupplierChange
                            }

                            notFoundContent={
                                safeSupplierOptions.length ===
                                0
                                    ? "No suppliers available"
                                    : null
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SUPPLIER CODE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={6}
                >

                    <Form.Item
                        label="Supplier Code"
                    >

                        <Input
                            value={
                                selectedSupplier
                                    ?.supplierCode ||
                                ""
                            }

                            placeholder="-"

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    CONTACT PERSON
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={6}
                >

                    <Form.Item
                        label="Contact Person"
                    >

                        <Input
                            value={
                                selectedSupplier
                                    ?.contactPerson ||
                                ""
                            }

                            placeholder="-"

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PHONE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={6}
                >

                    <Form.Item
                        label="Phone"
                    >

                        <Input
                            value={
                                selectedSupplier
                                    ?.phone ||
                                ""
                            }

                            placeholder="-"

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    EMAIL
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={6}
                >

                    <Form.Item
                        label="Email"
                    >

                        <Input
                            value={
                                selectedSupplier
                                    ?.email ||
                                ""
                            }

                            placeholder="-"

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PAYMENT TERMS
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={6}
                >

                    <Form.Item
                        name="paymentTerms"
                        label="Payment Terms"
                    >

                        <Input
                            value={
                                selectedSupplier
                                    ?.paymentTerms ||
                                ""
                            }

                            placeholder="Set in Terms section"

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    BILLING ADDRESS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="billingAddress"
                        label="Billing Address"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Billing address is required.",
                            },
                        ]}
                    >

                        <Input.TextArea
                            rows={
                                3
                            }

                            placeholder="Enter billing address"

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


                {/* =================================================
                    SHIPPING ADDRESS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="shippingAddress"
                        label="Shipping Address"
                        rules={[
                            {
                                required:
                                    true,

                                message:
                                    "Shipping address is required.",
                            },
                        ]}
                    >

                        <Input.TextArea
                            rows={
                                3
                            }

                            placeholder="Enter shipping address"

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


export default SupplierSection;