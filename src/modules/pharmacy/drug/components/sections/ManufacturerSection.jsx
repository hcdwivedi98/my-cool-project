import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppInput,
    AppSelect,
} from "@/components/common";

const ManufacturerSection = ({
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Manufacturer"
                    name="manufacturerId"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select manufacturer",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.manufacturers || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Manufacturer Code"
                    name="manufacturerCode"
                >
                    <AppInput
                        maxLength={50}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    label="Manufacturing Location"
                    name="manufacturingLocation"
                >
                    <AppInput
                        maxLength={200}
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

export default ManufacturerSection;