import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppNumberInput,
    AppSwitch,
} from "@/components/common";

const InventorySection = ({
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            {/* Batch Required */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Batch Required"
                    name="batchRequired"
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

            {/* Expiry Required */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Expiry Required"
                    name="expiryRequired"
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

            {/* Barcode Required */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Barcode Required"
                    name="barcodeRequired"
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

            {/* Serial Number Required */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Serial Number Required"
                    name="serialNumberRequired"
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

            {/* FEFO */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="FEFO Required"
                    name="fefoRequired"
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

            {/* FIFO */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="FIFO Required"
                    name="fifoRequired"
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

            {/* Negative Stock */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Allow Negative Stock"
                    name="negativeStockAllowed"
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

            {/* Minimum Stock */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Minimum Stock"
                    name="minStock"
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            message:
                                "Minimum stock cannot be negative",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={0}
                        precision={0}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Reorder Level */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Reorder Level"
                    name="reorderLevel"
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            message:
                                "Reorder level cannot be negative",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={0}
                        precision={0}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Maximum Stock */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Maximum Stock"
                    name="maxStock"
                    dependencies={["minStock"]}
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            message:
                                "Maximum stock cannot be negative",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const minStock =
                                    getFieldValue(
                                        "minStock"
                                    );

                                if (
                                    value ===
                                        undefined ||
                                    value === null ||
                                    value === ""
                                ) {
                                    return Promise.resolve();
                                }

                                if (
                                    minStock !==
                                        undefined &&
                                    value < minStock
                                ) {
                                    return Promise.reject(
                                        new Error(
                                            "Maximum stock must be greater than or equal to minimum stock"
                                        )
                                    );
                                }

                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <AppNumberInput
                        min={0}
                        precision={0}
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

export default InventorySection;