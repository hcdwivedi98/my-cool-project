// src/modules/pharmacy/uom/components/sections/BasicSection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Switch,
} from "antd";

import useUomLookup from "../../hooks/useUomLookup";


const BasicSection = ({
    form,
    mode = "ADD",
}) => {
    const {
        uomTypes,
        statuses,
    } = useUomLookup();

    const isViewMode =
        mode === "VIEW";


    return (
        <Card
            title="Basic Information"
            bordered={false}
            styles={{
                body: {
                    padding:
                        "20px 0 4px",
                },
            }}
        >
            <Row
                gutter={[
                    20,
                    16,
                ]}
            >
                {/* ================================= */}
                {/* UOM CODE */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="uomCode"
                        label="UOM Code"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter UOM code.",
                            },
                            {
                                max: 30,
                                message:
                                    "UOM code cannot exceed 30 characters.",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. MG"
                            maxLength={30}
                            disabled={
                                isViewMode
                            }
                            style={{
                                textTransform:
                                    "uppercase",
                            }}
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* UOM NAME */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="uomName"
                        label="UOM Name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter UOM name.",
                            },
                            {
                                max: 100,
                                message:
                                    "UOM name cannot exceed 100 characters.",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. Milligram"
                            maxLength={100}
                            disabled={
                                isViewMode
                            }
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* SHORT NAME */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="shortName"
                        label="Short Name"
                        rules={[
                            {
                                max: 20,
                                message:
                                    "Short name cannot exceed 20 characters.",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. mg"
                            maxLength={20}
                            disabled={
                                isViewMode
                            }
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* UOM TYPE */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="uomType"
                        label="UOM Type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select UOM type.",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select UOM type"
                            options={
                                uomTypes
                            }
                            disabled={
                                isViewMode
                            }
                            showSearch
                            optionFilterProp="label"
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* STATUS */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select status.",
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select status"
                            options={
                                statuses
                            }
                            disabled={
                                isViewMode
                            }
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* DECIMAL ALLOWED */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        name="decimalAllowed"
                        label="Decimal Quantity"
                        valuePropName="checked"
                        tooltip="Allow decimal quantities for this UOM."
                    >
                        <Switch
                            checkedChildren="Allowed"
                            unCheckedChildren="No"
                            disabled={
                                isViewMode
                            }
                        />
                    </Form.Item>
                </Col>


                {/* ================================= */}
                {/* DESCRIPTION */}
                {/* ================================= */}

                <Col
                    xs={24}
                >
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                max: 500,
                                message:
                                    "Description cannot exceed 500 characters.",
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter UOM description"
                            rows={3}
                            maxLength={500}
                            showCount
                            disabled={
                                isViewMode
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};


export default BasicSection;