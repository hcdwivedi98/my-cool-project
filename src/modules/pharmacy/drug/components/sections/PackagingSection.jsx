import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppInput,
    AppNumberInput,
    AppSelect,
} from "@/components/common";

const PackagingSection = ({
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            {/* Base Unit */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Base Unit"
                    name="baseUnit"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select base unit",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.units || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Purchase Unit */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Purchase Unit"
                    name="purchaseUnit"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select purchase unit",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.units || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Dispensing Unit */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Dispensing Unit"
                    name="dispensingUnit"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select dispensing unit",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.units || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Pack Size */}
            <Col xs={24} md={6}>
                <Form.Item
                    label="Pack Size"
                    name="packSize"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter pack size",
                        },
                        {
                            type: "number",
                            min: 1,
                            message:
                                "Pack size must be at least 1",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={1}
                        precision={0}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Units Per Pack */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Units Per Pack"
                    name="unitsPerPack"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please enter units per pack",
                        },
                        {
                            type: "number",
                            min: 1,
                            message:
                                "Units per pack must be at least 1",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={1}
                        precision={0}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Conversion Factor */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Conversion Factor"
                    name="conversionFactor"
                    rules={[
                        {
                            type: "number",
                            min: 1,
                            message:
                                "Conversion factor must be at least 1",
                        },
                    ]}
                >
                    <AppNumberInput
                        min={1}
                        precision={4}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Barcode */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Barcode"
                    name="barcode"
                >
                    <AppInput
                        maxLength={100}
                        placeholder="Enter barcode"
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

export default PackagingSection;