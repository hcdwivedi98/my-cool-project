import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    Row,
} from "antd";

import {
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
} from "@ant-design/icons";

const ContactSection = ({
    mode = "ADD",
}) => {
    const isView =
        mode === "VIEW";

    return (
        <Card
            size="small"
            title="Contact Information"
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
                {/* Contact Person */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
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
                                    "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter contact person"
                            maxLength={100}
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Designation */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Designation"
                        name="designation"
                        rules={[
                            {
                                max: 100,
                                message:
                                    "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. Sales Manager"
                            maxLength={100}
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Mobile */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
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
                                    "Enter valid 10-digit mobile number",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <PhoneOutlined />
                            }
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            inputMode="numeric"
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Alternate Mobile */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Alternate Mobile"
                        name="alternateMobile"
                        rules={[
                            {
                                pattern:
                                    /^[6-9]\d{9}$/,
                                message:
                                    "Enter valid 10-digit mobile number",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <PhoneOutlined />
                            }
                            placeholder="Alternate mobile number"
                            maxLength={10}
                            inputMode="numeric"
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Email */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter email",
                            },
                            {
                                type: "email",
                                message:
                                    "Enter a valid email address",
                            },
                            {
                                max: 150,
                                message:
                                    "Maximum 150 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <MailOutlined />
                            }
                            placeholder="supplier@example.com"
                            maxLength={150}
                            disabled={
                                isView
                            }
                        />
                    </Form.Item>
                </Col>

                {/* Website */}
                <Col
                    xs={24}
                    sm={12}
                    lg={8}
                >
                    <Form.Item
                        label="Website"
                        name="website"
                        rules={[
                            {
                                type: "url",
                                message:
                                    "Enter a valid website URL",
                            },
                            {
                                max: 200,
                                message:
                                    "Maximum 200 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <GlobalOutlined />
                            }
                            placeholder="https://www.example.com"
                            maxLength={200}
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

export default ContactSection;