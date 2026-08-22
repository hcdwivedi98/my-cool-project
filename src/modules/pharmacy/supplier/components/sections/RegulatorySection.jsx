// src/modules/pharmacy/supplier/components/sections/RegulatorySection.jsx

import React from "react";
import {
    Col,
    Form,
    Row,
} from "antd";

import {
    AppDatePicker,
    AppInput,
    AppSelect,
} from "@/components/common";

const DRUG_LICENSE_TYPES = [
    "MANUFACTURER",
    "DISTRIBUTOR",
    "WHOLESALER",
    "IMPORTER",
];

const RegulatorySection = ({
    form,
    lookup = {},
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    const supplierType =
        Form.useWatch(
            "supplierType",
            form
        );

    const licenseRequired =
        DRUG_LICENSE_TYPES.includes(
            supplierType
        );

    return (
        <Row gutter={[16, 16]}>
            {/* GSTIN */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="GSTIN"
                    name="gstin"
                    rules={[
                        {
                            pattern:
                                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/,
                            message:
                                "Please enter a valid GSTIN",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter GSTIN"
                        maxLength={15}
                        disabled={readOnly}
                        onChange={(
                            event
                        ) => {
                            const value =
                                event?.target
                                    ?.value;

                            if (
                                value !==
                                undefined
                            ) {
                                form.setFieldValue(
                                    "gstin",
                                    value.toUpperCase()
                                );
                            }

                            onDirtyChange(
                                true
                            );
                        }}
                    />
                </Form.Item>
            </Col>

            {/* PAN */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="PAN"
                    name="pan"
                    rules={[
                        {
                            pattern:
                                /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                            message:
                                "Please enter a valid PAN",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter PAN"
                        maxLength={10}
                        disabled={readOnly}
                        onChange={(
                            event
                        ) => {
                            const value =
                                event?.target
                                    ?.value;

                            if (
                                value !==
                                undefined
                            ) {
                                form.setFieldValue(
                                    "pan",
                                    value.toUpperCase()
                                );
                            }

                            onDirtyChange(
                                true
                            );
                        }}
                    />
                </Form.Item>
            </Col>

            {/* License Type */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="License Type"
                    name="licenseType"
                    rules={[
                        {
                            required:
                                licenseRequired,
                            message:
                                "Please select license type",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select license type"
                        options={
                            lookup.licenseTypes ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Drug License Number */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug License Number"
                    name="drugLicenseNumber"
                    rules={[
                        {
                            required:
                                licenseRequired,
                            message:
                                "Please enter drug license number",
                        },
                        {
                            max: 50,
                            message:
                                "License number cannot exceed 50 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter drug license number"
                        maxLength={50}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* License Expiry */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug License Expiry"
                    name="drugLicenseExpiry"
                    rules={[
                        {
                            required:
                                licenseRequired,
                            message:
                                "Please select license expiry date",
                        },
                    ]}
                >
                    <AppDatePicker
                        style={{
                            width: "100%",
                        }}
                        placeholder="Select expiry date"
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* FSSAI */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="FSSAI License"
                    name="fssaiLicense"
                >
                    <AppInput
                        placeholder="Enter FSSAI license number"
                        maxLength={50}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Other Registration */}
            <Col span={24}>
                <Form.Item
                    label="Other Registration"
                    name="otherRegistration"
                    rules={[
                        {
                            max: 100,
                            message:
                                "Registration details cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter other registration details"
                        maxLength={100}
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

export default RegulatorySection;