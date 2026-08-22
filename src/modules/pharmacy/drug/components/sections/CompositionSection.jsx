import React from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Space,
    Tooltip,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import {
    AppInput,
    AppNumberInput,
    AppSelect,
} from "@/components/common";

const { Text } = Typography;

const STRENGTH_UNITS = [
    {
        label: "mg",
        value: "MG",
    },
    {
        label: "g",
        value: "G",
    },
    {
        label: "mcg",
        value: "MCG",
    },
    {
        label: "IU",
        value: "IU",
    },
    {
        label: "mL",
        value: "ML",
    },
    {
        label: "%",
        value: "PERCENT",
    },
];

const CompositionSection = ({
    form,
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <div>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 20,
                }}
            >
                <div>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Active Ingredients
                    </Text>

                    <div
                        style={{
                            marginTop: 4,
                            color: "#8c8c8c",
                            fontSize: 13,
                        }}
                    >
                        Add all active ingredients
                        present in this drug.
                    </div>
                </div>

                {!disabled && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            const current =
                                form.getFieldValue(
                                    "composition"
                                ) || [];

                            form.setFieldValue(
                                "composition",
                                [
                                    ...current,
                                    {
                                        ingredientName:
                                            undefined,
                                        strength:
                                            undefined,
                                        strengthUnit:
                                            "MG",
                                    },
                                ]
                            );

                            onDirtyChange(true);
                        }}
                    >
                        Add Ingredient
                    </Button>
                )}
            </div>

            <Form.List name="composition">
                {(fields, { add, remove }) => (
                    <>
                        {/* Ingredient Rows */}
                        {fields.map(
                            ({
                                key,
                                name,
                                ...restField
                            }) => (
                                <Card
                                    key={key}
                                    size="small"
                                    style={{
                                        marginBottom: 12,
                                        borderRadius: 8,
                                        background:
                                            "#fafafa",
                                    }}
                                    styles={{
                                        body: {
                                            padding: 16,
                                        },
                                    }}
                                >
                                    <Row
                                        gutter={[
                                            16,
                                            8,
                                        ]}
                                        align="bottom"
                                    >
                                        {/* Ingredient */}
                                        <Col
                                            xs={24}
                                            md={10}
                                        >
                                            <Form.Item
                                                {...restField}
                                                label="Ingredient"
                                                name={[
                                                    name,
                                                    "ingredientName",
                                                ]}
                                                rules={[
                                                    {
                                                        required:
                                                            true,
                                                        message:
                                                            "Please enter ingredient name",
                                                    },
                                                ]}
                                            >
                                                <AppInput
                                                    placeholder="e.g. Paracetamol"
                                                    maxLength={
                                                        150
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

                                        {/* Strength */}
                                        <Col
                                            xs={24}
                                            sm={12}
                                            md={5}
                                        >
                                            <Form.Item
                                                {...restField}
                                                label="Strength"
                                                name={[
                                                    name,
                                                    "strength",
                                                ]}
                                                rules={[
                                                    {
                                                        required:
                                                            true,
                                                        message:
                                                            "Please enter strength",
                                                    },
                                                    {
                                                        type: "number",
                                                        min: 0,
                                                        message:
                                                            "Strength must be greater than or equal to 0",
                                                    },
                                                ]}
                                            >
                                                <AppNumberInput
                                                    placeholder="e.g. 500"
                                                    min={0}
                                                    precision={
                                                        2
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

                                        {/* Unit */}
                                        <Col
                                            xs={24}
                                            sm={10}
                                            md={5}
                                        >
                                            <Form.Item
                                                {...restField}
                                                label="Strength Unit"
                                                name={[
                                                    name,
                                                    "strengthUnit",
                                                ]}
                                                rules={[
                                                    {
                                                        required:
                                                            true,
                                                        message:
                                                            "Please select unit",
                                                    },
                                                ]}
                                            >
                                                <AppSelect
                                                    options={
                                                        STRENGTH_UNITS
                                                    }
                                                    placeholder="Select unit"
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

                                        {/* Delete */}
                                        <Col
                                            xs={24}
                                            sm={2}
                                            md={4}
                                        >
                                            <Form.Item
                                                label=" "
                                            >
                                                <Tooltip title="Remove Ingredient">
                                                    <Button
                                                        danger
                                                        type="text"
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
                                                        style={{
                                                            width:
                                                                40,
                                                            height:
                                                                40,
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            )
                        )}

                        {/* Empty State */}
                        {fields.length === 0 && (
                            <Card
                                style={{
                                    textAlign:
                                        "center",
                                    borderStyle:
                                        "dashed",
                                    borderRadius: 8,
                                    marginBottom: 16,
                                }}
                            >
                                <Text type="secondary">
                                    No active
                                    ingredients
                                    added.
                                </Text>
                            </Card>
                        )}

                        {/* Count */}
                        <div
                            style={{
                                marginTop: 8,
                                color: "#595959",
                            }}
                        >
                            Ingredients:{" "}
                            <strong>
                                {fields.length}
                            </strong>
                        </div>
                    </>
                )}
            </Form.List>
        </div>
    );
};

export default CompositionSection;