// src/modules/pharmacy/generic/components/sections/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";

const BasicSection = ({
    disabled = false,
}) => {
    return (
        <Row gutter={[16, 0]}>
            {/* Generic Code */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Generic Code"
                    name="genericCode"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter generic code.",
                        },
                        {
                            max: 30,
                            message:
                                "Generic code cannot exceed 30 characters.",
                        },
                        {
                            pattern:
                                /^[A-Za-z0-9_-]+$/,
                            message:
                                "Only letters, numbers, hyphen and underscore are allowed.",
                        },
                    ]}
                >
                    <Input
                        placeholder="e.g. GEN-PCM"
                        maxLength={30}
                        disabled={
                            disabled
                        }
                        showCount
                    />
                </Form.Item>
            </Col>

            {/* Generic Name */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Generic Name"
                    name="genericName"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter generic name.",
                        },
                        {
                            min: 2,
                            message:
                                "Generic name must contain at least 2 characters.",
                        },
                        {
                            max: 150,
                            message:
                                "Generic name cannot exceed 150 characters.",
                        },
                    ]}
                >
                    <Input
                        placeholder="e.g. Paracetamol"
                        maxLength={150}
                        disabled={
                            disabled
                        }
                        showCount
                    />
                </Form.Item>
            </Col>

            {/* Short Name */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Short Name"
                    name="shortName"
                    rules={[
                        {
                            max: 30,
                            message:
                                "Short name cannot exceed 30 characters.",
                        },
                    ]}
                >
                    <Input
                        placeholder="e.g. PCM"
                        maxLength={30}
                        disabled={
                            disabled
                        }
                        showCount
                    />
                </Form.Item>
            </Col>

            {/* Description */}
            <Col span={24}>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            max: 500,
                            message:
                                "Description cannot exceed 500 characters.",
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter generic description"
                        maxLength={500}
                        showCount
                        rows={3}
                        disabled={
                            disabled
                        }
                        autoSize={{
                            minRows: 3,
                            maxRows: 5,
                        }}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default BasicSection;