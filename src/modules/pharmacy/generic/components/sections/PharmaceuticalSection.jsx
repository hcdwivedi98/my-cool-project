// src/modules/pharmacy/generic/components/sections/PharmaceuticalSection.jsx

import React from "react";

import {
    Col,
    Form,
    Row,
    Select,
} from "antd";

import useGenericLookup from "../../hooks/useGenericLookup";

const PharmaceuticalSection = ({
    disabled = false,
}) => {
    const lookup =
        useGenericLookup();

    return (
        <Row gutter={[16, 0]}>
            {/* Dosage Forms */}
            <Col
                xs={24}
                md={12}
            >
                <Form.Item
                    label="Dosage Forms"
                    name="dosageForms"
                    rules={[
                        {
                            required: true,
                            type: "array",
                            min: 1,
                            message:
                                "Please select at least one dosage form.",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        optionFilterProp="label"
                        placeholder="Select dosage forms"
                        options={
                            lookup.dosageForms
                        }
                        disabled={
                            disabled
                        }
                        maxTagCount="responsive"
                    />
                </Form.Item>
            </Col>

            {/* Routes */}
            <Col
                xs={24}
                md={12}
            >
                <Form.Item
                    label="Routes"
                    name="routes"
                    rules={[
                        {
                            required: true,
                            type: "array",
                            min: 1,
                            message:
                                "Please select at least one route.",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        optionFilterProp="label"
                        placeholder="Select administration routes"
                        options={
                            lookup.routes
                        }
                        disabled={
                            disabled
                        }
                        maxTagCount="responsive"
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default PharmaceuticalSection;