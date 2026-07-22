import React from "react";

import {
    Row,
    Col,
    Typography,
    Space,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    DownloadOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "../../../../components/common/buttons";

const { Title, Text } = Typography;

function CenterHeader({

    onAdd,

    onRefresh,

    onExport,

}) {

    return (

        <Row
            justify="space-between"
            align="middle"
            style={{
                marginBottom: 16,
            }}
        >

            <Col>

                <Title
                    level={4}
                    style={{
                        margin: 0,
                    }}
                >
                    Center Master
                </Title>

                <Text type="secondary">

                    Manage hospital centers and branches

                </Text>

            </Col>

            <Col>

                <Space>

                    <AppButton

                        icon={<ReloadOutlined />}

                        onClick={onRefresh}

                    >

                        Refresh

                    </AppButton>

                    <AppButton

                        icon={<DownloadOutlined />}

                        onClick={onExport}

                    >

                        Export

                    </AppButton>

                    <AppButton

                        type="primary"

                        icon={<PlusOutlined />}

                        onClick={onAdd}

                    >

                        Add Center

                    </AppButton>

                </Space>

            </Col>

        </Row>

    );

}

export default React.memo(CenterHeader);