import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppNumberInput,
} from "@/components/common";

const CapacitySection = ({
    disabled = false,
    onDirtyChange = () => { },
}) => {
    return (
        <Row gutter={16}>

            {/* Maximum Quantity */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Quantity"
                    name="maxQuantity"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter maximum quantity",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={1}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Maximum Weight */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Weight (Kg)"
                    name="maxWeight"
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            message: "Weight cannot be negative",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={0}
                        precision={2}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Maximum Volume */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Volume (L)"
                    name="maxVolume"
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            message: "Volume cannot be negative",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={0}
                        precision={2}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Current Quantity */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Current Quantity"
                    name="currentQuantity"
                >
                    <AppNumberInput
                        min={0}
                        disabled
                    />
                </Form.Item>
            </Col>

            {/* Available Quantity */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Available Quantity"
                    name="availableQuantity"
                >
                    <AppNumberInput
                        min={0}
                        disabled
                    />
                </Form.Item>
            </Col>

            {/* Occupancy */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Occupancy (%)"
                    name="occupancyPercentage"
                >
                    <AppNumberInput
                        min={0}
                        max={100}
                        disabled
                    />
                </Form.Item>
            </Col>

        </Row>
    );
};

export default CapacitySection;