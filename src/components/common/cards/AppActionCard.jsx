import React from "react";

import {
    Card,
    Space,
    Typography,
} from "antd";

const {

    Title,

    Text,

} = Typography;

function AppActionCard({

    title,

    description,

    icon,

    extra,

    onClick,

    disabled = false,

    hoverable = true,

    loading = false,

    className = "",

    style,

}) {

    return (

        <AppCard

            hoverable={

                hoverable &&

                !disabled

            }

            loading={loading}

            className={className}

            onClick={

                disabled

                    ? undefined

                    : onClick

            }

            style={{

                cursor:

                    disabled

                        ? "not-allowed"

                        : "pointer",

                opacity:

                    disabled

                        ? 0.6

                        : 1,

                textAlign: "center",

                ...style,

            }}

        >

            <Space

                direction="vertical"

                size={12}

                style={{

                    width: "100%",

                }}

            >

                {icon}

                <Title

                    level={5}

                    style={{

                        margin: 0,

                    }}

                >

                    {title}

                </Title>

                {

                    description && (

                        <Text

                            type="secondary"

                        >

                            {description}

                        </Text>

                    )

                }

                {extra}

            </Space>

        </AppCard>

    );

}

export default React.memo(AppActionCard);