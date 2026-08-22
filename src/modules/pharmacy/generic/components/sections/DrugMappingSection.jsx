// src/modules/pharmacy/generic/components/sections/DrugMappingSection.jsx

import React from "react";

import {
    Card,
    Col,
    Empty,
    Row,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    MedicineBoxOutlined,
} from "@ant-design/icons";

const {
    Text,
} = Typography;

const DrugMappingSection = ({
    record = null,
    disabled = true,
}) => {
    const drugs =
        Array.isArray(
            record?.drugs
        )
            ? record.drugs
            : [];

    const drugsCount =
        Number(
            record?.drugsCount
        ) ||
        drugs.length;

    const activeDrugs =
        drugs.filter(
            (drug) =>
                drug?.status ===
                "Active"
        ).length;

    const columns = [
        {
            title: "Drug Code",

            dataIndex:
                "drugCode",

            key: "drugCode",

            width: 140,

            render: (
                value
            ) => (
                <Text strong>
                    {value || "-"}
                </Text>
            ),
        },

        {
            title: "Drug Name",

            dataIndex:
                "drugName",

            key: "drugName",

            width: 240,

            render: (
                value
            ) => (
                <Text
                    ellipsis={{
                        tooltip:
                            value,
                    }}
                >
                    {value || "-"}
                </Text>
            ),
        },

        {
            title: "Brand",

            dataIndex:
                "brandName",

            key: "brandName",

            width: 160,

            render: (
                value
            ) =>
                value || (
                    <Text type="secondary">
                        -
                    </Text>
                ),
        },

        {
            title: "Dosage Form",

            dataIndex:
                "dosageForm",

            key: "dosageForm",

            width: 140,

            render: (
                value
            ) =>
                value ? (
                    <Tag>
                        {value}
                    </Tag>
                ) : (
                    "-"
                ),
        },

        {
            title: "Strength",

            dataIndex:
                "strength",

            key: "strength",

            width: 120,

            render: (
                value,
                drug
            ) => {
                if (
                    value ===
                        null ||
                    value ===
                        undefined ||
                    value ===
                        ""
                ) {
                    return (
                        <Text type="secondary">
                            -
                        </Text>
                    );
                }

                return (
                    <Text>
                        {value}{" "}
                        {
                            drug?.strengthUnit ||
                            ""
                        }
                    </Text>
                );
            },
        },

        {
            title: "Manufacturer",

            dataIndex:
                "manufacturerName",

            key:
                "manufacturerName",

            width: 220,

            render: (
                value
            ) =>
                value || (
                    <Text type="secondary">
                        -
                    </Text>
                ),
        },

        {
            title: "Status",

            dataIndex:
                "status",

            key: "status",

            width: 100,

            render: (
                value
            ) => {
                if (
                    value ===
                    "Active"
                ) {
                    return (
                        <Tag color="success">
                            Active
                        </Tag>
                    );
                }

                return (
                    <Tag>
                        {value ||
                            "Inactive"}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div
            style={{
                pointerEvents:
                    disabled
                        ? "auto"
                        : "auto",
            }}
        >
            {/* Summary */}
            <Row
                gutter={[
                    12,
                    12,
                ]}
                style={{
                    marginBottom: 16,
                }}
            >
                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >
                    <Card
                        size="small"
                    >
                        <Statistic
                            title="Mapped Drugs"
                            value={
                                drugsCount
                            }
                            prefix={
                                <MedicineBoxOutlined />
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >
                    <Card
                        size="small"
                    >
                        <Statistic
                            title="Active Drugs"
                            value={
                                activeDrugs
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >
                    <Card
                        size="small"
                    >
                        <Statistic
                            title="Mapping Status"
                            value={
                                drugsCount >
                                0
                                    ? "Mapped"
                                    : "Not Mapped"
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* Drug List */}
            <Card
                size="small"
                title={
                    <Space>
                        <MedicineBoxOutlined />

                        <span>
                            Mapped Drugs
                        </span>
                    </Space>
                }
            >
                {drugs.length ===
                0 ? (
                    <Empty
                        image={
                            Empty.PRESENTED_IMAGE_SIMPLE
                        }
                        description="No drugs mapped to this generic"
                    />
                ) : (
                    <Table
                        rowKey="id"
                        size="small"
                        columns={
                            columns
                        }
                        dataSource={
                            drugs
                        }
                        pagination={{
                            pageSize: 5,
                            showSizeChanger: false,
                            showTotal: (
                                total
                            ) =>
                                `${total} drug${total !== 1 ? "s" : ""}`,
                        }}
                        scroll={{
                            x: 1100,
                        }}
                    />
                )}
            </Card>
        </div>
    );
};

export default DrugMappingSection;