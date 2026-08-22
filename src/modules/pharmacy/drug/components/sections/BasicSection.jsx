import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppInput,
    AppSelect,
} from "@/components/common";

const BasicSection = ({
    form,
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            {/* Drug Code */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Drug Code"
                    name="drugCode"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter drug code",
                        },
                        {
                            whitespace: true,
                            message:
                                "Drug code cannot be empty",
                        },
                    ]}
                >
                    <AppInput
                        maxLength={30}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Drug Name */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Drug Name"
                    name="drugName"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter drug name",
                        },
                        {
                            whitespace: true,
                            message:
                                "Drug name cannot be empty",
                        },
                    ]}
                >
                    <AppInput
                        maxLength={150}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Short Name */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Short Name"
                    name="shortName"
                >
                    <AppInput
                        maxLength={50}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Generic Name */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Generic Name"
                    name="genericName"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter generic name",
                        },
                    ]}
                >
                    <AppInput
                        maxLength={200}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Brand Name */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Brand Name"
                    name="brandName"
                >
                    <AppInput
                        maxLength={150}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Drug Type */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug Type"
                    name="drugType"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select drug type",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.drugTypes || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select status",
                        },
                    ]}
                >
                    <AppSelect
                        options={[
                            {
                                label: "Active",
                                value: "Active",
                            },
                            {
                                label: "Inactive",
                                value: "Inactive",
                            },
                        ]}
                        disabled={disabled}
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