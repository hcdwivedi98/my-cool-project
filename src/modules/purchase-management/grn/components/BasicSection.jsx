// src/modules/purchase-management/grn/components/BasicSection.jsx

import React from "react";

import {
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
} from "antd";

import {
    FileTextOutlined,
} from "@ant-design/icons";

import {
    GRN_TYPE_OPTIONS,
    GRN_RECEIVING_MODE_OPTIONS,
} from "../constants/grn.constants";


const BasicSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const isViewMode =
        String(mode)
            .toUpperCase() === "VIEW";


    return (

        <Card
            className="grn-section"
            bordered={false}
            title={

                <div
                    className="grn-section-title-wrapper"
                >

                    <FileTextOutlined />

                    <span>
                        Basic Information
                    </span>

                </div>

            }
        >

            <Row gutter={[20, 0]}>

                {/* =================================================
                    GRN NUMBER
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="grnNumber"
                        label="GRN Number"
                    >

                        <Input
                            placeholder="Auto generated"
                            disabled
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    GRN DATE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="grnDate"
                        label="GRN Date"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select GRN date",
                            },
                        ]}
                    >

                        <DatePicker
                            style={{
                                width: "100%",
                            }}

                            placeholder="Select GRN date"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    GRN TYPE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="grnType"
                        label="GRN Type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select GRN type",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select GRN type"

                            options={
                                GRN_TYPE_OPTIONS
                            }

                            disabled={
                                disabled
                            }

                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    RECEIVING MODE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="receivingMode"
                        label="Receiving Mode"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select receiving mode",
                            },
                        ]}
                    >

                        <Select
                            placeholder="Select receiving mode"

                            options={
                                GRN_RECEIVING_MODE_OPTIONS
                            }

                            disabled={
                                disabled
                            }

                            allowClear
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PURCHASE ORDER
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="purchaseOrderId"
                        label="Purchase Order"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select purchase order",
                            },
                        ]}
                    >

                        <Select
                            showSearch

                            placeholder="Select Purchase Order"

                            optionFilterProp="label"

                            disabled={
                                disabled
                            }

                            options={[]}

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SUPPLIER INVOICE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="supplierInvoiceNumber"
                        label="Supplier Invoice No."
                    >

                        <Input
                            placeholder="Enter invoice number"

                            maxLength={50}

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INVOICE DATE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="invoiceDate"
                        label="Invoice Date"
                    >

                        <DatePicker
                            style={{
                                width: "100%",
                            }}

                            placeholder="Select invoice date"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DELIVERY CHALLAN
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="deliveryChallanNumber"
                        label="Delivery Challan No."
                    >

                        <Input
                            placeholder="Enter challan number"

                            maxLength={50}

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    CHALLAN DATE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="challanDate"
                        label="Challan Date"
                    >

                        <DatePicker
                            style={{
                                width: "100%",
                            }}

                            placeholder="Select challan date"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>

            </Row>

        </Card>

    );

};


export default BasicSection;