// src/modules/purchase-management/grn/components/SupplierSection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Row,
    Select,
} from "antd";

import {
    ShopOutlined,
} from "@ant-design/icons";


const SupplierSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    return (

        <Card
            className="grn-section"
            bordered={false}
            title={

                <div
                    className="grn-section-title-wrapper"
                >

                    <ShopOutlined />

                    <span>
                        Supplier & Receiving
                    </span>

                </div>

            }
        >

            <Row gutter={[20, 0]}>

                {/* =================================================
                    SUPPLIER
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="supplierId"
                        label="Supplier"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select supplier",
                            },
                        ]}
                    >

                        <Select
                            showSearch

                            placeholder="Select supplier"

                            optionFilterProp="label"

                            disabled={
                                disabled
                            }

                            options={[]}

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    STORE / WAREHOUSE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="storeId"
                        label="Store / Warehouse"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select store / warehouse",
                            },
                        ]}
                    >

                        <Select

                            placeholder="Select store / warehouse"

                            disabled={
                                disabled
                            }

                            options={[]}

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    CURRENCY
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >

                    <Form.Item
                        name="currency"
                        label="Currency"
                    >

                        <Select
                            disabled
                            options={[
                                {
                                    value:
                                        "INR",

                                    label:
                                        "INR",
                                },
                            ]}
                        />

                    </Form.Item>

                </Col>

            </Row>

        </Card>

    );

};


export default SupplierSection;