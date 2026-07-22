import React from "react";

import {
    Card,
    Row,
    Col,
    Input,
    Space,
} from "antd";

import {
    SearchOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "../buttons";

function AppMasterFilter({

    searchValue,

    onSearchChange,

    searchPlaceholder = "Search...",

    onSearch,

    onReset,

    loading = false,

    children,

    showSearch = true,

    showReset = true,

    showSearchButton = true,

}) {

    return (

        <Card
            className="erp-card"
        >

            <Row
                gutter={[16,16]}
                align="middle"
            >

                {

                    showSearch && (

                        <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={6}
                        >

                            <Input

                                allowClear

                                value={searchValue}

                                prefix={<SearchOutlined />}

                                placeholder={searchPlaceholder}

                                onChange={(e)=>

                                    onSearchChange?.(
                                        e.target.value
                                    )

                                }

                                onPressEnter={onSearch}

                            />

                        </Col>

                    )

                }

                {children}

                <Col
                    flex="auto"
                />

                <Col>

                    <Space
                        wrap
                    >

                        {

                            showReset && (

                                <AppButton

                                    onClick={onReset}

                                >

                                    Reset

                                </AppButton>

                            )

                        }

                        {

                            showSearchButton && (

                                <AppButton

                                    type="primary"

                                    loading={loading}

                                    icon={<SearchOutlined />}

                                    onClick={onSearch}

                                >

                                    Search

                                </AppButton>

                            )

                        }

                    </Space>

                </Col>

            </Row>

        </Card>

    );

}

export default AppMasterFilter;