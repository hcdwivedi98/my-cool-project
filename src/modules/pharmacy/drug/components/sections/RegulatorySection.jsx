import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppInput,
    AppSwitch,
} from "@/components/common";

const RegulatorySection = ({
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug License Category"
                    name="drugLicenseCategory"
                >
                    <AppInput
                        maxLength={100}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="License Number"
                    name="licenseNumber"
                >
                    <AppInput
                        maxLength={100}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
                <Form.Item
                    label="Prescription Required"
                    name="prescriptionRequired"
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

            <Col xs={24} sm={12} lg={6}>
                <Form.Item
                    label="Controlled Drug"
                    name="controlledDrug"
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

            <Col xs={24} sm={12} lg={6}>
                <Form.Item
                    label="Narcotic"
                    name="narcotic"
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

            <Col xs={24} sm={12} lg={6}>
                <Form.Item
                    label="Restricted Drug"
                    name="restrictedDrug"
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

            <Col span={24}>
                <Form.Item
                    label="Regulatory Remarks"
                    name="regulatoryRemarks"
                >
                    <AppInput
                        maxLength={500}
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

export default RegulatorySection;