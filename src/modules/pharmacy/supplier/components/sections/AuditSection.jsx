// src/modules/pharmacy/supplier/components/sections/AuditSection.jsx

import React from "react";

import {
    Card,
    Col,
    Descriptions,
    Row,
    Tag,
    Typography,
} from "antd";

const { Text } = Typography;

const AuditSection = ({
    record = {},
}) => {
    const status =
        record?.status;

    return (
        <div>
            <Card
                title="Audit Information"
                size="small"
                style={{
                    borderRadius: 8,
                }}
            >
                <Descriptions
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                    }}
                    bordered
                    size="small"
                >
                    <Descriptions.Item
                        label="Created By"
                    >
                        {record?.createdBy ||
                            "-"}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Created On"
                    >
                        {record?.createdOn ||
                            "-"}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Modified By"
                    >
                        {record?.modifiedBy ||
                            "-"}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Modified On"
                    >
                        {record?.modifiedOn ||
                            "-"}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Supplier ID"
                    >
                        {record?.id ||
                            "-"}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Status"
                    >
                        {status ===
                        "Active" ? (
                            <Tag color="success">
                                Active
                            </Tag>
                        ) : status ===
                          "Inactive" ? (
                            <Tag>
                                Inactive
                            </Tag>
                        ) : (
                            <Tag>
                                {status ||
                                    "-"}
                            </Tag>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card
                title="System Information"
                size="small"
                style={{
                    marginTop: 16,
                    borderRadius: 8,
                }}
            >
                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                >
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Text type="secondary">
                            Record Type
                        </Text>

                        <div
                            style={{
                                marginTop: 4,
                            }}
                        >
                            Supplier
                        </div>
                    </Col>

                    <Col
                        xs={24}
                        md={12}
                    >
                        <Text type="secondary">
                            Record ID
                        </Text>

                        <div
                            style={{
                                marginTop: 4,
                            }}
                        >
                            {record?.id ||
                                "-"}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AuditSection;