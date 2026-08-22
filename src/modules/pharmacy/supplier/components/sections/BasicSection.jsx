// src/modules/pharmacy/supplier/components/sections/BasicSection.jsx

import React from "react";
import {
    Col,
    Form,
    Row,
} from "antd";

import {
    AppInput,
    AppSelect,
    AppSwitch,
} from "@/components/common";

const BasicSection = ({
    lookup = {},
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={[16, 16]}>
            {/* Supplier Code */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Supplier Code"
                    name="supplierCode"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter supplier code",
                        },
                        {
                            max: 30,
                            message:
                                "Supplier code cannot exceed 30 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter supplier code"
                        maxLength={30}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Supplier Name */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Supplier Name"
                    name="supplierName"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter supplier name",
                        },
                        {
                            max: 150,
                            message:
                                "Supplier name cannot exceed 150 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter supplier name"
                        maxLength={150}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Supplier Type */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Supplier Type"
                    name="supplierType"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select supplier type",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select supplier type"
                        options={
                            lookup.supplierTypes ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Supplier Category */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Supplier Category"
                    name="supplierCategory"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select supplier category",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select supplier category"
                        options={
                            lookup.supplierCategories ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Active"
                    name="status"
                    valuePropName="checked"
                    getValueProps={(value) => ({
                        checked:
                            value === "Active",
                    })}
                    getValueFromEvent={(
                        checked
                    ) =>
                        checked
                            ? "Active"
                            : "Inactive"
                    }
                >
                    <AppSwitch
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default BasicSection;