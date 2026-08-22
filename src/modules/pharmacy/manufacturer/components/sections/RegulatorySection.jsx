// src/modules/pharmacy/manufacturer/components/sections/RegulatorySection.jsx

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

const RegulatorySection = ({
    mode = "ADD",
    lookup = {},
}) => {
    const isView =
        mode === "VIEW";

    return (
        <Card
            size="small"
            title="Regulatory Information"
            className="manufacturer-section-card"
            styles={{
                body: {
                    padding: "16px",
                },
            }}
        >
            <Row gutter={[16, 4]}>
                {/* GSTIN */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="GSTIN"
                        name="gstin"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter GSTIN",
                            },
                            {
                                pattern:
                                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
                                message:
                                    "Enter valid GSTIN",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. 07ABCDE1234F1Z5"
                            maxLength={15}
                            disabled={isView}
                            style={{
                                textTransform:
                                    "uppercase",
                            }}
                        />
                    </Form.Item>
                </Col>

                {/* PAN */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="PAN"
                        name="pan"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter PAN",
                            },
                            {
                                pattern:
                                    /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                                message:
                                    "Enter valid PAN",
                            },
                        ]}
                    >
                        <Input
                            placeholder="e.g. ABCDE1234F"
                            maxLength={10}
                            disabled={isView}
                            style={{
                                textTransform:
                                    "uppercase",
                            }}
                        />
                    </Form.Item>
                </Col>

                {/* License Type */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="License Type"
                        name="licenseType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select license type",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            placeholder="Select license type"
                            options={
                                lookup.licenseTypes ||
                                []
                            }
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* License Number */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="License Number"
                        name="licenseNumber"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter license number",
                            },
                            {
                                max: 50,
                                message:
                                    "Maximum 50 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter license number"
                            maxLength={50}
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* License Issue Date */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="License Issue Date"
                        name="licenseIssueDate"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select issue date",
                            },
                        ]}
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                            format="DD-MM-YYYY"
                            placeholder="Select issue date"
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* License Expiry Date */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="License Expiry Date"
                        name="licenseExpiryDate"
                        dependencies={[
                            "licenseIssueDate",
                        ]}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select expiry date",
                            },
                            ({ getFieldValue }) => ({
                                validator(
                                    _,
                                    value
                                ) {
                                    const issueDate =
                                        getFieldValue(
                                            "licenseIssueDate"
                                        );

                                    if (
                                        !value ||
                                        !issueDate
                                    ) {
                                        return Promise.resolve();
                                    }

                                    if (
                                        value.isAfter(
                                            issueDate,
                                            "day"
                                        )
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "Expiry date must be after issue date"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <DatePicker
                            style={{
                                width: "100%",
                            }}
                            format="DD-MM-YYYY"
                            placeholder="Select expiry date"
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* FSSAI License */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="FSSAI License Number"
                        name="fssaiLicenseNumber"
                        rules={[
                            {
                                max: 50,
                                message:
                                    "Maximum 50 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="If applicable"
                            maxLength={50}
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default RegulatorySection;