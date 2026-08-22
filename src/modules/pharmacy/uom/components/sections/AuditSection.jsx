// src/modules/pharmacy/uom/components/sections/AuditSection.jsx

import React from "react";

import {
    Card,
    Col,
    Descriptions,
    Row,
    Tag,
    Typography,
} from "antd";

import {
    ClockCircleOutlined,
    EditOutlined,
    UserOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


const AuditSection = ({
    data = {},
    mode = "ADD",
}) => {
    const isAddMode =
        mode === "ADD";


    const createdBy =
        data?.createdBy ||
        "-";

    const createdOn =
        data?.createdOn ||
        "-";

    const modifiedBy =
        data?.modifiedBy ||
        "-";

    const modifiedOn =
        data?.modifiedOn ||
        "-";


    return (
        <Card
            title="Audit Information"
            bordered={false}
            styles={{
                body: {
                    padding:
                        "20px 0 4px",
                },
            }}
        >
            <Row
                gutter={[
                    20,
                    16,
                ]}
            >
                {/* ================================= */}
                {/* CREATED BY */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                            background:
                                "#fafafa",
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    6,
                                fontSize:
                                    12,
                            }}
                        >
                            <UserOutlined
                                style={{
                                    marginRight:
                                        6,
                                }}
                            />
                            Created By
                        </Text>

                        <Text strong>
                            {createdBy}
                        </Text>
                    </div>
                </Col>


                {/* ================================= */}
                {/* CREATED ON */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                            background:
                                "#fafafa",
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    6,
                                fontSize:
                                    12,
                            }}
                        >
                            <ClockCircleOutlined
                                style={{
                                    marginRight:
                                        6,
                                }}
                            />
                            Created On
                        </Text>

                        <Text strong>
                            {createdOn}
                        </Text>
                    </div>
                </Col>


                {/* ================================= */}
                {/* MODIFIED BY */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                            background:
                                "#fafafa",
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    6,
                                fontSize:
                                    12,
                            }}
                        >
                            <EditOutlined
                                style={{
                                    marginRight:
                                        6,
                                }}
                            />
                            Modified By
                        </Text>

                        <Text strong>
                            {modifiedBy}
                        </Text>
                    </div>
                </Col>


                {/* ================================= */}
                {/* MODIFIED ON */}
                {/* ================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <div
                        style={{
                            padding:
                                "12px 14px",
                            border:
                                "1px solid #f0f0f0",
                            borderRadius:
                                8,
                            background:
                                "#fafafa",
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    6,
                                fontSize:
                                    12,
                            }}
                        >
                            <ClockCircleOutlined
                                style={{
                                    marginRight:
                                        6,
                                }}
                            />
                            Modified On
                        </Text>

                        <Text strong>
                            {modifiedOn}
                        </Text>
                    </div>
                </Col>


                {/* ================================= */}
                {/* RECORD MODE */}
                {/* ================================= */}

                <Col
                    xs={24}
                >
                    <Descriptions
                        size="small"
                        bordered
                        column={{
                            xs: 1,
                            sm: 2,
                            md: 4,
                        }}
                    >
                        <Descriptions.Item
                            label="Record Mode"
                        >
                            <Tag
                                color={
                                    isAddMode
                                        ? "blue"
                                        : "default"
                                }
                            >
                                {mode}
                            </Tag>
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Audit"
                        >
                            <Tag
                                color="green"
                            >
                                System Managed
                            </Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Card>
    );
};


export default AuditSection;