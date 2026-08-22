// src/modules/pharmacy/generic/components/sections/AuditSection.jsx

import React from "react";

import {
    Col,
    DatePicker,
    Form,
    Input,
    Row,
} from "antd";

const AuditSection = ({
    disabled = true,
}) => {
    return (
        <Row gutter={[16, 0]}>
            {/* Created By */}
            <Col
                xs={24}
                sm={12}
                md={6}
            >
                <Form.Item
                    label="Created By"
                    name="createdBy"
                >
                    <Input
                        placeholder="Created by"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>

            {/* Created On */}
            <Col
                xs={24}
                sm={12}
                md={6}
            >
                <Form.Item
                    label="Created On"
                    name="createdOn"
                >
                    <DatePicker
                        style={{
                            width: "100%",
                        }}
                        format="DD-MM-YYYY"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>

            {/* Modified By */}
            <Col
                xs={24}
                sm={12}
                md={6}
            >
                <Form.Item
                    label="Modified By"
                    name="modifiedBy"
                >
                    <Input
                        placeholder="Modified by"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>

            {/* Modified On */}
            <Col
                xs={24}
                sm={12}
                md={6}
            >
                <Form.Item
                    label="Modified On"
                    name="modifiedOn"
                >
                    <DatePicker
                        style={{
                            width: "100%",
                        }}
                        format="DD-MM-YYYY"
                        disabled={
                            disabled
                        }
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default AuditSection;