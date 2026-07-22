import React from "react";

import {
    Checkbox,
    Row,
    Col,
    Space,
    Tooltip,
    Typography,
} from "antd";

import {
    HolderOutlined,
    LockOutlined,
    PushpinOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function ColumnItem({

    column,

    checked,

    onChange,

    showDragHandle = true,

    showPin = false,

    showDescription = true,

}) {

    const {

        key,

        title,

        description,

        required = false,

        pinned = false,

    } = column;

    return (

        <Row

            align="middle"

            justify="space-between"

            gutter={8}

            style={{

                padding: "8px 10px",

                borderBottom: "1px solid #f0f0f0",

                transition: "all .2s",

            }}

        >

            <Col flex="auto">

                <Space>

                    {

                        showDragHandle && (

                            <HolderOutlined

                                style={{

                                    color: "#999",

                                    cursor: "grab",

                                }}

                            />

                        )

                    }

                    <Checkbox

                        checked={checked}

                        disabled={required}

                        onChange={() =>

                            onChange?.(

                                key

                            )

                        }

                    >

                        <Text>

                            {title}

                        </Text>

                    </Checkbox>

                    {

                        required && (

                            <Tooltip

                                title="Mandatory Column"

                            >

                                <LockOutlined

                                    style={{

                                        color: "#faad14",

                                    }}

                                />

                            </Tooltip>

                        )

                    }

                </Space>

                {

                    showDescription &&

                    description && (

                        <div

                            style={{

                                marginLeft: 28,

                            }}

                        >

                            <Text

                                type="secondary"

                                style={{

                                    fontSize: 12,

                                }}

                            >

                                {description}

                            </Text>

                        </div>

                    )

                }

            </Col>

            <Col>

                <Space>

                    {

                        pinned && (

                            <Tooltip

                                title="Pinned Column"

                            >

                                <PushpinOutlined

                                    style={{

                                        color: "#1677ff",

                                    }}

                                />

                            </Tooltip>

                        )

                    }

                    {

                        description && (

                            <Tooltip

                                title={description}

                            >

                                <InfoCircleOutlined />

                            </Tooltip>

                        )

                    }

                </Space>

            </Col>

        </Row>

    );

}

export default React.memo(ColumnItem);