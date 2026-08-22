// src/modules/pharmacy/supplier/components/sections/AddressSection.jsx

import React from "react";
import {
    Col,
    Form,
    Row,
} from "antd";

import {
    AppInput,
    AppSelect,
} from "@/components/common";

const AddressSection = ({
    lookup = {},
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={[16, 16]}>
            {/* Address Line 1 */}
            <Col span={24}>
                <Form.Item
                    label="Address Line 1"
                    name="addressLine1"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter address",
                        },
                        {
                            max: 200,
                            message:
                                "Address cannot exceed 200 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter address"
                        maxLength={200}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Address Line 2 */}
            <Col span={24}>
                <Form.Item
                    label="Address Line 2"
                    name="addressLine2"
                    rules={[
                        {
                            max: 200,
                            message:
                                "Address cannot exceed 200 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Apartment, building, landmark, etc."
                        maxLength={200}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* City */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="City"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter city",
                        },
                        {
                            max: 100,
                            message:
                                "City cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter city"
                        maxLength={100}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* State */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="State"
                    name="state"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter state",
                        },
                        {
                            max: 100,
                            message:
                                "State cannot exceed 100 characters",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter state"
                        maxLength={100}
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Country */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select country",
                        },
                    ]}
                >
                    <AppSelect
                        placeholder="Select country"
                        options={
                            lookup.countries ||
                            []
                        }
                        disabled={readOnly}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* PIN Code */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="PIN Code"
                    name="pinCode"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter PIN code",
                        },
                        {
                            pattern:
                                /^\d{6}$/,
                            message:
                                "PIN code must be 6 digits",
                        },
                    ]}
                >
                    <AppInput
                        placeholder="Enter 6-digit PIN"
                        maxLength={6}
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

export default AddressSection;