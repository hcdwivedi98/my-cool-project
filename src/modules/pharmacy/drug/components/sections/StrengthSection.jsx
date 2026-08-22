import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppInput,
    AppNumberInput,
    AppSelect,
} from "@/components/common";

const StrengthSection = ({
    form,
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            {/* Dosage Form */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Dosage Form"
                    name="dosageForm"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select dosage form",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.dosageForms ||
                            []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Strength */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Strength"
                    name="strength"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter strength",
                        },
                        {
                            type: "number",
                            min: 0.0001,
                            message:
                                "Strength must be greater than 0",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={0.0001}
                        precision={4}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Strength Unit */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Strength Unit"
                    name="strengthUnit"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select strength unit",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.strengthUnits ||
                            []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Route */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Route of Administration"
                    name="route"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select route",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.routes || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Dosage Instruction */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Dosage Instruction"
                    name="dosageInstruction"
                >
                    <AppInput
                        maxLength={250}
                        placeholder="e.g. As directed by physician"
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Frequency */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Frequency"
                    name="frequency"
                >
                    <AppInput
                        maxLength={100}
                        placeholder="e.g. Once daily / Twice daily"
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Duration */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Typical Duration"
                    name="duration"
                >
                    <AppInput
                        maxLength={100}
                        placeholder="e.g. 5 days"
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default StrengthSection;