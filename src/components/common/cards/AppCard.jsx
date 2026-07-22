import React, { memo, useState } from "react";
import {
    Card,
    Button,
    Divider,
    Flex,
    Space,
    Typography,
} from "antd";
import {
    ReloadOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    DownOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { useDensity } from "../../../theme/DensityContext";

const { Title, Text } = Typography;

function Footer({ children, style }) {
    return (
        <>
            <Divider style={{ margin: "16px 0" }} />
            <Flex
                justify="flex-end"
                style={style}
            >
                <Space>
                    {children}
                </Space>
            </Flex>
        </>
    );
}

function AppCard({

    title,
    subTitle,
    extra,

    children,

    loading = false,

    bordered = false,

    hoverable = false,

    noPadding = false,

    refreshable = false,

    onRefresh,

    collapsible = false,

    defaultCollapsed = false,

    fullscreen = false,

    scrollable = false,

    stickyHeader = false,

    height,

    shadow = "small",

    variant = "default",

    status,

    className = "",

    style,

    bodyStyle,

    ...rest

}) {

    const { config } = useDensity();

    const [collapsed, setCollapsed] =
        useState(defaultCollapsed);

    const [isFullscreen, setFullscreen] =
        useState(false);

    const shadowMap = {
        none: "none",
        small: "0 2px 6px rgba(0,0,0,.08)",
        medium: "0 4px 12px rgba(0,0,0,.12)",
        large: "0 8px 24px rgba(0,0,0,.16)",
    };

    const statusColor = {
        success: "#52c41a",
        warning: "#faad14",
        danger: "#ff4d4f",
        info: "#1677ff",
    };

    const variantStyle = {
        default: "#fff",
        filled: "#fafafa",
        outlined: "#fff",
    };

    const body = React.Children.toArray(children).filter(
        child => child?.type !== Footer
    );

    const footer = React.Children.toArray(children).find(
        child => child?.type === Footer
    );

    return (

        <Card

            loading={loading}

            bordered={
                variant === "outlined"
                    ? true
                    : bordered
            }

            hoverable={hoverable}

            className={`erp-card ${className}`}

            styles={{
                body: {
                    padding:
                        noPadding
                            ? 0
                            : config.cardPadding,
                    overflow:
                        scrollable
                            ? "auto"
                            : "visible",
                    maxHeight:
                        scrollable
                            ? height
                            : undefined,
                    ...bodyStyle,
                },
            }}

            style={{
                borderRadius:
                    config.borderRadius,

                background:
                    variantStyle[variant],

                boxShadow:
                    shadowMap[shadow],

                borderLeft:
                    status
                        ? `4px solid ${statusColor[status]}`
                        : undefined,

                height:
                    isFullscreen
                        ? "100vh"
                        : height,

                position:
                    isFullscreen
                        ? "fixed"
                        : "relative",

                inset:
                    isFullscreen
                        ? 0
                        : undefined,

                zIndex:
                    isFullscreen
                        ? 9999
                        : undefined,

                ...style,
            }}

            {...rest}

        >

            {(title || extra) && (

                <Flex

                    justify="space-between"

                    align="center"

                    style={{

                        marginBottom: 16,

                        position:
                            stickyHeader
                                ? "sticky"
                                : "relative",

                        top: 0,

                        background: "#fff",

                        zIndex: 5,

                    }}

                >

                    <div>

                        {title && (

                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                }}
                            >
                                {title}
                            </Title>

                        )}

                        {subTitle && (

                            <Text
                                type="secondary"
                            >
                                {subTitle}
                            </Text>

                        )}

                    </div>

                    <Space>

                        {extra}

                        {refreshable && (

                            <Button

                                type="text"

                                icon={
                                    <ReloadOutlined />
                                }

                                onClick={onRefresh}

                            />

                        )}

                        {collapsible && (

                            <Button

                                type="text"

                                icon={
                                    collapsed
                                        ? <RightOutlined />
                                        : <DownOutlined />
                                }

                                onClick={() =>
                                    setCollapsed(
                                        !collapsed
                                    )
                                }

                            />

                        )}

                        {fullscreen && (

                            <Button

                                type="text"

                                icon={
                                    isFullscreen
                                        ? <FullscreenExitOutlined />
                                        : <FullscreenOutlined />
                                }

                                onClick={() =>
                                    setFullscreen(
                                        !isFullscreen
                                    )
                                }

                            />

                        )}

                    </Space>

                </Flex>

            )}

            {!collapsed && body}

            {!collapsed && footer}

        </Card>

    );

}

AppCard.Footer = Footer;

export default memo(AppCard);