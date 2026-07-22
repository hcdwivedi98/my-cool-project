import React, { useState } from "react";

import {

    Button,

    Card,

    Collapse,

    Flex,

    Space,

} from "antd";

import {

    FilterOutlined,

    ReloadOutlined,

} from "@ant-design/icons";

function AppFilterPanel({

    children,

    defaultOpen = true,

    title = "Filters",

    onReset,

    extra,

}) {

    const [

        activeKey,

        setActiveKey,

    ] = useState(

        defaultOpen

            ? ["1"]

            : []

    );

    return (

        <Card

            size="small"

            style={{

                marginBottom: 16,

            }}

        >

            <Collapse

                ghost

                activeKey={activeKey}

                onChange={setActiveKey}

                items={[

                    {

                        key: "1",

                        label: (

                            <Flex

                                justify="space-between"

                                style={{

                                    width: "100%",

                                }}

                            >

                                <Space>

                                    <FilterOutlined />

                                    {title}

                                </Space>

                                <Space>

                                    {extra}

                                    <Button

                                        size="small"

                                        icon={

                                            <ReloadOutlined />

                                        }

                                        onClick={

                                            onReset

                                        }

                                    >

                                        Reset

                                    </Button>

                                </Space>

                            </Flex>

                        ),

                        children,

                    },

                ]}

            />

        </Card>

    );

}

export default React.memo(AppFilterPanel);