import React from "react";

import {
    Flex,
    Space,
    Statistic,
    Tag,
    Typography,
} from "antd";

import AppCard from "./AppCard";

const { Text } = Typography;

function AppKpiCard({

    title,

    value,

    icon,

    prefix,

    suffix,

    trend,

    trendColor = "#52c41a",

    status,

    statusColor = "success",

    footer,

    loading,

    onClick,

}) {

    return (

        <AppCard

            loading={loading}

            hoverable={!!onClick}

            footer={footer}

            style={{

                cursor: onClick

                    ? "pointer"

                    : "default",

            }}

            onClick={onClick}

        >

            <Flex

                justify="space-between"

                align="center"

            >

                <Space

                    direction="vertical"

                    size={4}

                >

                    <Text

                        type="secondary"

                    >

                        {title}

                    </Text>

                    <Statistic

                        value={value}

                        prefix={prefix}

                        suffix={suffix}

                    />

                    {trend && (

                        <Text

                            style={{

                                color: trendColor,

                                fontWeight: 500,

                            }}

                        >

                            {trend}

                        </Text>

                    )}

                </Space>

                {icon}

            </Flex>

            {status && (

                <div

                    style={{

                        marginTop: 12,

                    }}

                >

                    <Tag

                        color={statusColor}

                    >

                        {status}

                    </Tag>

                </div>

            )}

        </AppCard>

    );

}

export default React.memo(AppKpiCard);