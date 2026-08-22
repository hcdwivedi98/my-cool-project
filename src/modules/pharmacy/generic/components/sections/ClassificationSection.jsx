// src/modules/pharmacy/generic/components/sections/ClassificationSection.jsx

import React from "react";

import {
    Col,
    Form,
    Row,
    Select,
} from "antd";

import useGenericLookup from "../../hooks/useGenericLookup";

const ClassificationSection = ({
    disabled = false,
}) => {
    const lookup =
        useGenericLookup();

    return (
        <Row gutter={[16, 0]}>
            {/* Generic Type */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Generic Type"
                    name="genericType"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select generic type.",
                        },
                    ]}
                >
                    <Select
                        placeholder="Select generic type"
                        options={
                            lookup.genericTypes
                        }
                        disabled={
                            disabled
                        }
                        allowClear
                    />
                </Form.Item>
            </Col>

            {/* Therapeutic Class */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Therapeutic Class"
                    name="therapeuticClass"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select therapeutic class.",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        allowClear
                        placeholder="Select therapeutic class"
                        options={
                            lookup.therapeuticClasses
                        }
                        optionFilterProp="label"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>

            {/* Pharmacological Class */}
            <Col
                xs={24}
                sm={12}
                md={8}
            >
                <Form.Item
                    label="Pharmacological Class"
                    name="pharmacologicalClass"
                >
                    <Select
                        showSearch
                        allowClear
                        placeholder="Select pharmacological class"
                        options={
                            lookup.pharmacologicalClasses
                        }
                        optionFilterProp="label"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default ClassificationSection;