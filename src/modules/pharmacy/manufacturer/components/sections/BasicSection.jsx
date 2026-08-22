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

const BasicSection = ({
    mode = "ADD",
    lookup = {},
}) => {
    const isView =
        mode === "VIEW";

    return (
        <Card
            size="small"
            title="Basic Information"
            className="manufacturer-section-card"
            styles={{
                body: {
                    padding:
                        "16px",
                },
            }}
        >
            <Row
                gutter={[
                    16,
                    4,
                ]}
            >
                {/* Manufacturer Code */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Manufacturer Code"
                        name="manufacturerCode"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter manufacturer code",
                            },
                            {
                                max: 30,
                                message:
                                    "Maximum 30 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. MFG-001"
                            maxLength={30}
                            disabled={
                                isView
                            }
                            style={{
                                textTransform:
                                    "uppercase",
                            }}
                        />
                    </Form.Item>
                </Col>

                {/* Manufacturer Name */}
                <Col
                    xs={24}
                    sm={12}
                    lg={10}
                >
                    <Form.Item
                        label="Manufacturer Name"
                        name="manufacturerName"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter manufacturer name",
                            },
                            {
                                min: 2,
                                message:
                                    "Minimum 2 characters required",
                            },
                            {
                                max: 150,
                                message:
                                    "Maximum 150 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter manufacturer name"
                            maxLength={150}
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Short Name */}
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Form.Item
                        label="Short Name"
                        name="shortName"
                        rules={[
                            {
                                max: 50,
                                message:
                                    "Maximum 50 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. ABC Pharma"
                            maxLength={50}
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Manufacturer Type */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Manufacturer Type"
                        name="manufacturerType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select manufacturer type",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            placeholder="Select manufacturer type"
                            options={
                                lookup.manufacturerTypes ||
                                []
                            }
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Manufacturer Category */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Manufacturer Category"
                        name="manufacturerCategory"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select manufacturer category",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            placeholder="Select category"
                            options={
                                lookup.manufacturerCategories ||
                                []
                            }
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Status */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Status"
                        name="status"
                        valuePropName="checked"
                        getValueProps={(
                            value
                        ) => ({
                            checked:
                                value ===
                                "Active",
                        })}
                        getValueFromEvent={(
                            checked
                        ) =>
                            checked
                                ? "Active"
                                : "Inactive"
                        }
                    >
                        <Switch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default BasicSection;