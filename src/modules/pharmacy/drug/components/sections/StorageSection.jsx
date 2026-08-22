import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppNumberInput,
    AppSelect,
    AppSwitch,
} from "@/components/common";

const StorageSection = ({
    form,
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    const storageCondition = Form.useWatch(
        "storageCondition",
        form
    );

    const isTemperatureControlled =
        [
            "REFRIGERATED",
            "FROZEN",
            "CONTROLLED",
        ].includes(storageCondition);

    return (
        <Row gutter={16}>
            {/* Storage Condition */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Storage Condition"
                    name="storageCondition"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select storage condition",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.storageConditions ||
                            []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Temperature From */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Temperature From (°C)"
                    name="temperatureFrom"
                    rules={
                        isTemperatureControlled
                            ? [
                                  {
                                      required: true,
                                      message:
                                          "Please enter minimum temperature",
                                  },
                              ]
                            : []
                    }
                >
                    <AppNumberInput
                        min={-100}
                        max={100}
                        precision={1}
                        disabled={
                            disabled ||
                            !isTemperatureControlled
                        }
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Temperature To */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Temperature To (°C)"
                    name="temperatureTo"
                    rules={
                        isTemperatureControlled
                            ? [
                                  {
                                      required: true,
                                      message:
                                          "Please enter maximum temperature",
                                  },
                              ]
                            : []
                    }
                >
                    <AppNumberInput
                        min={-100}
                        max={100}
                        precision={1}
                        disabled={
                            disabled ||
                            !isTemperatureControlled
                        }
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Humidity */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Humidity Monitoring"
                    name="humidityRequired"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Light Sensitive */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Light Sensitive"
                    name="lightSensitive"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Refrigerated */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Refrigerated"
                    name="refrigerated"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Freezer */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Freezer Required"
                    name="freezerRequired"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Hazardous */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Hazardous Drug"
                    name="hazardous"
                    valuePropName="checked"
                >
                    <AppSwitch
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

export default StorageSection;