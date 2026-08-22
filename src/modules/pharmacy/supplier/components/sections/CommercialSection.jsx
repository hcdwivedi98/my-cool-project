// src/modules/pharmacy/supplier/components/sections/CommercialSection.jsx

import React from "react";

import {
    Col,
    Form,
    Row,
} from "antd";

import {
    AppInput,
    AppNumberInput,
    AppSelect,
} from "@/components/common";

const CommercialSection = ({
    form,
    lookup = {},
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    const paymentTerms =
        Form.useWatch(
            "paymentTerms",
            form
        );

    const isCredit =
        paymentTerms === "CREDIT";

    return (
        <Row gutter={[16, 16]}>
            {/* ==============================
                Payment Terms
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Payment Terms"
                    name="paymentTerms"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select payment terms",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select payment terms"
                        options={
                            lookup.paymentTerms ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* ==============================
                Credit Days
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Credit Days"
                    name="creditDays"
                    rules={[
                        {
                            required:
                                isCredit,
                            message:
                                "Please enter credit days",
                        },
                        {
                            type: "number",
                            min: 0,
                            max: 3650,
                            message:
                                "Credit days must be between 0 and 3650",
                        },
                    ]}
                >
                    <AppNumberInput
                        placeholder="Enter credit days"
                        min={0}
                        max={3650}
                        precision={0}
                        disabled={
                            readOnly ||
                            !isCredit
                        }
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* ==============================
                Currency
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select currency",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select currency"
                        options={
                            lookup.currencies ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* ==============================
                Bank Name
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Bank Name"
                    name="bankName"
                    rules={[
                        {
                            max: 100,
                            message:
                                "Bank name cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter bank name"
                        maxLength={100}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* ==============================
                Account Number
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Account Number"
                    name="accountNumber"
                    rules={[
                        {
                            pattern:
                                /^[0-9]{6,20}$/,
                            message:
                                "Account number must contain 6 to 20 digits",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter account number"
                        maxLength={20}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* ==============================
                IFSC Code
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="IFSC Code"
                    name="ifscCode"
                    rules={[
                        {
                            pattern:
                                /^[A-Z]{4}0[A-Z0-9]{6}$/,
                            message:
                                "Please enter a valid IFSC code",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="e.g. HDFC0001234"
                        maxLength={11}
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
                                    "ifscCode",
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

            {/* ==============================
                Branch Name
            =============================== */}

            <Col xs={24} md={12}>
                <Form.Item
                    label="Branch Name"
                    name="branchName"
                    rules={[
                        {
                            max: 100,
                            message:
                                "Branch name cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter branch name"
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

export default CommercialSection;