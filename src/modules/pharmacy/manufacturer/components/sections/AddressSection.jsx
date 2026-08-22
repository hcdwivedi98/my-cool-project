// src/modules/pharmacy/manufacturer/components/sections/AddressSection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
} from "antd";

const AddressSection = ({
    mode = "ADD",
    lookup = {},
}) => {
    const isView =
        mode === "VIEW";

    return (
        <Card
            size="small"
            title="Address Information"
            className="manufacturer-section-card"
            styles={{
                body: {
                    padding: "16px",
                },
            }}
        >
            <Row gutter={[16, 4]}>
                {/* Address Line 1 */}
                <Col xs={24} lg={12}>
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
                                    "Maximum 200 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter address"
                            maxLength={200}
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* Address Line 2 */}
                <Col xs={24} lg={12}>
                    <Form.Item
                        label="Address Line 2"
                        name="addressLine2"
                        rules={[
                            {
                                max: 200,
                                message:
                                    "Maximum 200 characters allowed",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Area, landmark, industrial area..."
                            maxLength={200}
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* Country */}
                <Col xs={24} sm={12} lg={6}>
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
                        <Select
                            showSearch
                            optionFilterProp="label"
                            placeholder="Select country"
                            options={
                                lookup.countries ||
                                []
                            }
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* State */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select state",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            allowClear
                            optionFilterProp="label"
                            placeholder="Select state"
                            options={
                                lookup.states ||
                                []
                            }
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* City */}
                <Col xs={24} sm={12} lg={6}>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select city",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            allowClear
                            optionFilterProp="label"
                            placeholder="Select city"
                            options={
                                lookup.cities ||
                                []
                            }
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>

                {/* PIN Code */}
                <Col xs={24} sm={12} lg={6}>
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
                                    /^[1-9][0-9]{5}$/,
                                message:
                                    "Enter valid 6-digit PIN code",
                            },
                        ]}
                    >
                        <Input
                            placeholder="6-digit PIN"
                            maxLength={6}
                            inputMode="numeric"
                            disabled={isView}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default AddressSection;