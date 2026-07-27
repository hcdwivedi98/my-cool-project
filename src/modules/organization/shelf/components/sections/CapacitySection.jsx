import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppNumberInput,
} from "@/components/common";

const CapacitySection = ({
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Bins"
                    name="maxBins"
                    rules={[
                        {
                            required: true,
                            message: "Please enter maximum bins",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={1}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Weight (Kg)"
                    name="maxWeight"
                >
                    <AppNumberInput
                        min={0}
                        precision={2}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Volume (L)"
                    name="maxVolume"
                >
                    <AppNumberInput
                        min={0}
                        precision={2}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

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

            <Col xs={24} md={8}>
                <Form.Item
                    label="Current Bins"
                    name="currentBins"
                >
                    <AppNumberInput
                        min={0}
                        disabled
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item
                    label="Available Bins"
                    name="availableBins"
                >
                    <AppNumberInput
                        min={0}
                        disabled
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default CapacitySection;