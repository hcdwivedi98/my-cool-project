// src/modules/pharmacy/generic/components/sections/SafetySection.jsx

import React from "react";

import {
    Col,
    Form,
    Row,
    Switch,
    Typography,
} from "antd";

const {
    Text,
} = Typography;

const SafetyField = ({
    name,
    label,
    description,
    disabled = false,
}) => {
    return (
        <Col
            xs={24}
            sm={12}
            lg={8}
        >
            <div
                style={{
                    minHeight: 72,
                    padding:
                        "10px 12px",
                    border:
                        "1px solid #f0f0f0",
                    borderRadius: 8,
                    background:
                        "#fafafa",
                }}
            >
                <Form.Item
                    name={name}
                    valuePropName="checked"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <div
                        style={{
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "space-between",
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                minWidth: 0,
                            }}
                        >
                            <Text strong>
                                {label}
                            </Text>

                            {description && (
                                <div
                                    style={{
                                        marginTop:
                                            2,
                                    }}
                                >
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize:
                                                12,
                                        }}
                                    >
                                        {
                                            description
                                        }
                                    </Text>
                                </div>
                            )}
                        </div>

                        <Switch
                            size="small"
                            disabled={
                                disabled
                            }
                        />
                    </div>
                </Form.Item>
            </div>
        </Col>
    );
};

const SafetySection = ({
    disabled = false,
}) => {
    return (
        <Row gutter={[12, 12]}>
            <SafetyField
                name="prescriptionRequired"
                label="Prescription Required"
                description="Requires valid prescription"
                disabled={
                    disabled
                }
            />

            <SafetyField
                name="controlledDrug"
                label="Controlled Drug"
                description="Subject to controlled-drug regulations"
                disabled={
                    disabled
                }
            />

            <SafetyField
                name="narcotic"
                label="Narcotic"
                description="Narcotic / opioid classification"
                disabled={
                    disabled
                }
            />

            <SafetyField
                name="highAlert"
                label="High Alert"
                description="Requires additional medication-safety controls"
                disabled={
                    disabled
                }
            />

            <SafetyField
                name="lasa"
                label="LASA"
                description="Look-Alike / Sound-Alike medication"
                disabled={
                    disabled
                }
            />
        </Row>
    );
};

export default SafetySection;