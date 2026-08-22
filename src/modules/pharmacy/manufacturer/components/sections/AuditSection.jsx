// src/modules/pharmacy/manufacturer/components/sections/AuditSection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    Row,
} from "antd";

const AuditSection = ({
    mode = "ADD",
}) => {
    const isNew =
        mode === "ADD";

    return (
        <Card
            size="small"
            title="Audit Information"
            className="manufacturer-section-card"
            styles={{
                body: {
                    padding: "16px",
                },
            }}
        >
            <Row gutter={[16, 4]}>
                {/* Created By */}
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Form.Item
                        label="Created By"
                        name="createdBy"
                    >
                        <Input
                            placeholder={
                                isNew
                                    ? "System generated"
                                    : "-"
                            }
                            disabled
                        />
                    </Form.Item>
                </Col>

                {/* Created On */}
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Form.Item
                        label="Created On"
                        name="createdOn"
                    >
                        <Input
                            placeholder={
                                isNew
                                    ? "System generated"
                                    : "-"
                            }
                            disabled
                        />
                    </Form.Item>
                </Col>

                {/* Modified By */}
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Form.Item
                        label="Modified By"
                        name="modifiedBy"
                    >
                        <Input
                            placeholder={
                                isNew
                                    ? "System generated"
                                    : "-"
                            }
                            disabled
                        />
                    </Form.Item>
                </Col>

                {/* Modified On */}
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Form.Item
                        label="Modified On"
                        name="modifiedOn"
                    >
                        <Input
                            placeholder={
                                isNew
                                    ? "System generated"
                                    : "-"
                            }
                            disabled
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default AuditSection;