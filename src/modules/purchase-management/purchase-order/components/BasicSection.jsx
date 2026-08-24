// src/modules/purchase-management/purchase-order/components/BasicSection.jsx

import React from "react";

import {
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import {
    PO_STATUS_OPTIONS,
    PO_TYPE_OPTIONS,
} from "../constants/purchaseOrder.constants";

import usePurchaseOrderLookup
    from "../hooks/usePurchaseOrderLookup";


/* =========================================================
   BASIC SECTION
   ========================================================= */

const BasicSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    const {
        statusOptions = [],
        typeOptions = [],
        purchaseRequisitionOptions = [],
    } =
        usePurchaseOrderLookup() || {};


    const safeStatusOptions =
        Array.isArray(
            statusOptions
        ) &&
        statusOptions.length > 0
            ? statusOptions
            : (
                Array.isArray(
                    PO_STATUS_OPTIONS
                )
                    ? PO_STATUS_OPTIONS
                    : []
            );


    const safeTypeOptions =
        Array.isArray(
            typeOptions
        ) &&
        typeOptions.length > 0
            ? typeOptions
            : (
                Array.isArray(
                    PO_TYPE_OPTIONS
                )
                    ? PO_TYPE_OPTIONS
                    : []
            );


    const safeRequisitionOptions =
        Array.isArray(
            purchaseRequisitionOptions
        )
            ? purchaseRequisitionOptions
            : [];


    /* =====================================================
       PO NUMBER
       ===================================================== */

    const poNumberRules = [

        {
            required:
                true,

            message:
                "PO number is required.",
        },

    ];


    /* =====================================================
       PO DATE
       ===================================================== */

    const poDateRules = [

        {
            required:
                true,

            message:
                "PO date is required.",
        },

    ];


    /* =====================================================
       PO TYPE
       ===================================================== */

    const poTypeRules = [

        {
            required:
                true,

            message:
                "Please select PO type.",
        },

    ];


    /* =====================================================
       REQUISITION
       ===================================================== */

    const handleRequisitionChange = (
        requisitionId
    ) => {

        if (
            !requisitionId
        ) {

            return;

        }


        const selected =
            safeRequisitionOptions.find(
                (
                    option
                ) =>
                    option.value ===
                    requisitionId
            );


        const requisition =
            selected?.requisition;


        if (
            !requisition
        ) {

            return;

        }


        /*
         * Supplier can be auto-populated
         * when the PO is created from
         * an approved requisition.
         */

        if (
            requisition.supplierId
        ) {

            form.setFieldValue(
                "supplierId",
                requisition.supplierId
            );

        }


        if (
            requisition.storeId
        ) {

            form.setFieldValue(
                "storeId",
                requisition.storeId
            );

        }

    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-basic-section"
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
                    Basic Information
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Define the purchase order number, date,
                    type and originating requisition.
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
                    PO NUMBER
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="poNumber"
                        label="PO Number"
                        rules={
                            poNumberRules
                        }
                    >

                        <Input
                            placeholder="Enter PO number"
                            disabled={
                                isViewMode ||
                                mode === "EDIT"
                            }

                            maxLength={
                                50
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PO DATE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="poDate"
                        label="PO Date"
                        rules={
                            poDateRules
                        }
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

                            placeholder="Select PO date"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PO TYPE
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="poType"
                        label="PO Type"
                        rules={
                            poTypeRules
                        }
                    >

                        <Select
                            placeholder="Select PO type"

                            options={
                                safeTypeOptions
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
                    PURCHASE REQUISITION
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={12}
                >

                    <Form.Item
                        name="purchaseRequisitionId"
                        label="Purchase Requisition"
                    >

                        <Select
                            placeholder="Select approved requisition"

                            options={
                                safeRequisitionOptions
                            }

                            disabled={
                                isViewMode
                            }

                            allowClear

                            showSearch

                            optionFilterProp="label"

                            onChange={
                                handleRequisitionChange
                            }

                            notFoundContent={
                                safeRequisitionOptions.length ===
                                0
                                    ? "No approved requisitions"
                                    : null
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    STATUS
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={12}
                >

                    <Form.Item
                        name="status"
                        label="Status"
                    >

                        <Select
                            placeholder="Select status"

                            options={
                                safeStatusOptions
                            }

                            disabled
                        />

                    </Form.Item>

                </Col>


            </Row>

        </section>

    );

};


export default BasicSection;