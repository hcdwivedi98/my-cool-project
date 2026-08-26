// src/modules/purchase-management/grn/components/TermsSection.jsx

import React from "react";

import {
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
} from "antd";

import {
    FileProtectOutlined,
} from "@ant-design/icons";


/* =========================================================
   LOCAL OPTIONS
   ========================================================= */

const PAYMENT_TERMS_OPTIONS = [

    {
        value: "ADVANCE",
        label: "Advance",
    },

    {
        value: "COD",
        label: "Cash on Delivery",
    },

    {
        value: "NET_15",
        label: "Net 15 Days",
    },

    {
        value: "NET_30",
        label: "Net 30 Days",
    },

    {
        value: "NET_45",
        label: "Net 45 Days",
    },

    {
        value: "NET_60",
        label: "Net 60 Days",
    },

];


const DELIVERY_TERMS_OPTIONS = [

    {
        value: "EX_WORKS",
        label: "Ex Works",
    },

    {
        value: "DOOR_DELIVERY",
        label: "Door Delivery",
    },

    {
        value: "FOB",
        label: "FOB",
    },

    {
        value: "CIF",
        label: "CIF",
    },

];


const COMMUNICATION_METHOD_OPTIONS = [

    {
        value: "EMAIL",
        label: "Email",
    },

    {
        value: "PORTAL",
        label: "Portal",
    },

    {
        value: "PHONE",
        label: "Phone",
    },

    {
        value: "WHATSAPP",
        label: "WhatsApp",
    },

    {
        value: "COURIER",
        label: "Courier",
    },

    {
        value: "OTHER",
        label: "Other",
    },

];


/* =========================================================
   COMPONENT
   ========================================================= */

const TermsSection = ({
    mode = "CREATE",

    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <FileProtectOutlined />

                    <span>
                        Terms & Commercial Details
                    </span>

                </Space>

            }

            style={{
                marginBottom: 20,
            }}

        >

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
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="paymentTerms"
                        label="Payment Terms"
                    >

                        <Select

                            allowClear

                            showSearch

                            placeholder="Select payment terms"

                            options={
                                PAYMENT_TERMS_OPTIONS
                            }

                            optionFilterProp="label"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    PAYMENT DAYS
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="paymentDays"
                        label="Payment Days"
                    >

                        <InputNumber

                            min={0}

                            max={3650}

                            precision={0}

                            style={{
                                width:
                                    "100%",
                            }}

                            placeholder="Days"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DELIVERY TERMS
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="deliveryTerms"
                        label="Delivery Terms"
                    >

                        <Select

                            allowClear

                            placeholder="Select delivery terms"

                            options={
                                DELIVERY_TERMS_OPTIONS
                            }

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    COMMUNICATION METHOD
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="communicationMethod"
                        label="Communication Method"
                    >

                        <Select

                            allowClear

                            placeholder="Select method"

                            options={
                                COMMUNICATION_METHOD_OPTIONS
                            }

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    EXPECTED DELIVERY DATE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="expectedDeliveryDate"
                        label="Expected Delivery Date"
                    >

                        <DatePicker

                            style={{
                                width:
                                    "100%",
                            }}

                            format="DD-MMM-YYYY"

                            placeholder="Select date"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ACTUAL DELIVERY DATE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="actualDeliveryDate"
                        label="Actual Delivery Date"
                    >

                        <DatePicker

                            style={{
                                width:
                                    "100%",
                            }}

                            format="DD-MMM-YYYY"

                            placeholder="Select date"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    FREIGHT CHARGES
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="freightCharges"
                        label="Freight Charges"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            placeholder="0.00"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    TRANSPORT CHARGES
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="transportCharges"
                        label="Transport Charges"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            placeholder="0.00"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INSURANCE CHARGES
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="insuranceCharges"
                        label="Insurance Charges"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            placeholder="0.00"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    OTHER TERMS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="commercialTerms"
                        label="Commercial Terms"
                    >

                        <Input.TextArea

                            rows={4}

                            maxLength={2000}

                            showCount

                            placeholder="Enter commercial terms and conditions"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DELIVERY INSTRUCTIONS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="deliveryInstructions"
                        label="Delivery Instructions"
                    >

                        <Input.TextArea

                            rows={4}

                            maxLength={2000}

                            showCount

                            placeholder="Enter delivery instructions"

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


export default TermsSection;