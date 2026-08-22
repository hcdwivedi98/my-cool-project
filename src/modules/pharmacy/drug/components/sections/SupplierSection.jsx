import React from "react";
import { Button, Col, Form, Row } from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import {
    AppInput,
    AppNumberInput,
    AppSelect,
    AppSwitch,
} from "@/components/common";

const SupplierSection = ({
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Form.List name="suppliers">
            {(fields, { add, remove }) => (
                <>
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <div>
                            <strong>
                                Drug Supplier Mapping
                            </strong>

                            <div
                                style={{
                                    color: "#666",
                                    marginTop: 4,
                                }}
                            >
                                Map one or more approved
                                suppliers to this drug.
                            </div>
                        </div>

                        {!disabled && (
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    add({
                                        supplierId:
                                            undefined,

                                        supplierDrugCode:
                                            "",

                                        leadTimeDays:
                                            undefined,

                                        preferred: false,

                                        active: true,
                                    });

                                    onDirtyChange(true);
                                }}
                            >
                                Add Supplier
                            </Button>
                        )}
                    </div>

                    {/* Empty State */}
                    {fields.length === 0 && (
                        <div
                            style={{
                                padding: 24,
                                textAlign: "center",
                                border:
                                    "1px dashed #d9d9d9",
                                borderRadius: 8,
                                color: "#888",
                            }}
                        >
                            No suppliers mapped to this
                            drug.
                        </div>
                    )}

                    {/* Supplier Mappings */}
                    {fields.map(
                        ({
                            key,
                            name,
                            ...restField
                        }) => (
                            <div
                                key={key}
                                style={{
                                    marginBottom: 16,
                                    padding: 16,
                                    border:
                                        "1px solid #f0f0f0",
                                    borderRadius: 8,
                                }}
                            >
                                <Row
                                    gutter={16}
                                    align="bottom"
                                >
                                    {/* Supplier */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Supplier"
                                            name={[
                                                name,
                                                "supplierId",
                                            ]}
                                            rules={[
                                                {
                                                    required:
                                                        true,
                                                    message:
                                                        "Please select supplier",
                                                },
                                            ]}
                                        >
                                            <AppSelect
                                                options={
                                                    lookups.suppliers ||
                                                    []
                                                }
                                                disabled={
                                                    disabled
                                                }
                                                onChange={() =>
                                                    onDirtyChange(
                                                        true
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    {/* Supplier Drug Code */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Supplier Drug Code"
                                            name={[
                                                name,
                                                "supplierDrugCode",
                                            ]}
                                        >
                                            <AppInput
                                                maxLength={
                                                    50
                                                }
                                                placeholder="Supplier's product code"
                                                disabled={
                                                    disabled
                                                }
                                                onChange={() =>
                                                    onDirtyChange(
                                                        true
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    {/* Lead Time */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Lead Time (Days)"
                                            name={[
                                                name,
                                                "leadTimeDays",
                                            ]}
                                            rules={[
                                                {
                                                    type: "number",
                                                    min: 0,
                                                    message:
                                                        "Lead time cannot be negative",
                                                },
                                            ]}
                                        >
                                            <AppNumberInput
                                                min={0}
                                                precision={
                                                    0
                                                }
                                                disabled={
                                                    disabled
                                                }
                                                onChange={() =>
                                                    onDirtyChange(
                                                        true
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    {/* Preferred */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Preferred Supplier"
                                            name={[
                                                name,
                                                "preferred",
                                            ]}
                                            valuePropName="checked"
                                        >
                                            <AppSwitch
                                                disabled={
                                                    disabled
                                                }
                                                onChange={() =>
                                                    onDirtyChange(
                                                        true
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    {/* Active */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            {...restField}
                                            label="Active"
                                            name={[
                                                name,
                                                "active",
                                            ]}
                                            valuePropName="checked"
                                        >
                                            <AppSwitch
                                                disabled={
                                                    disabled
                                                }
                                                onChange={() =>
                                                    onDirtyChange(
                                                        true
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    {/* Remove */}
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Button
                                            danger
                                            block
                                            icon={
                                                <DeleteOutlined />
                                            }
                                            disabled={
                                                disabled
                                            }
                                            onClick={() => {
                                                remove(
                                                    name
                                                );

                                                onDirtyChange(
                                                    true
                                                );
                                            }}
                                        >
                                            Remove Supplier
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        )
                    )}
                </>
            )}
        </Form.List>
    );
};

export default SupplierSection;