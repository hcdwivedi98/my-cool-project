// src/modules/pharmacy/supplier/components/sections/ContactSection.jsx

import React from "react";
import {
    Col,
    Form,
    Row,
} from "antd";

import {
    AppInput,
} from "@/components/common";

const ContactSection = ({
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={[16, 16]}>
            {/* Contact Person */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Contact Person"
                    name="contactPerson"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter contact person",
                        },
                        {
                            max: 100,
                            message:
                                "Contact person cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter contact person name"
                        maxLength={100}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Mobile */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter mobile number",
                        },
                        {
                            pattern:
                                /^[6-9]\d{9}$/,
                            message:
                                "Please enter a valid 10-digit mobile number",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Alternate Mobile */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Alternate Mobile"
                    name="alternateMobile"
                    rules={[
                        {
                            pattern:
                                /^[6-9]\d{9}$/,
                            message:
                                "Please enter a valid 10-digit mobile number",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter alternate mobile number"
                        maxLength={10}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Email */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message:
                                "Please enter a valid email address",
                        },
                        {
                            max: 150,
                            message:
                                "Email cannot exceed 150 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="supplier@example.com"
                        maxLength={150}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Website */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Website"
                    name="website"
                    rules={[
                        {
                            type: "url",
                            message:
                                "Please enter a valid website URL",
                        },
                        {
                            max: 200,
                            message:
                                "Website cannot exceed 200 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="https://www.example.com"
                        maxLength={200}
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

export default ContactSection;