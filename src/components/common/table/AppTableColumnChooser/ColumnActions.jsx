import React from "react";

import {
    Row,
    Col,
    Space,
    Typography,
} from "antd";

import {
    CheckSquareOutlined,
    BorderOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "../../buttons";

const { Text } = Typography;

function ColumnActions({

    totalColumns = 0,

    selectedColumns = 0,

    onSelectAll,

    onClearAll,

    onReset,

}) {

    return (

        <Row
            justify="space-between"
            align="middle"
            gutter={[8, 8]}
        >

            <Col>

                <Text type="secondary">

                    Selected

                    <strong>

                        {" "}

                        {selectedColumns}

                    </strong>

                    {" / "}

                    {totalColumns}

                </Text>

            </Col>

            <Col>

                <Space wrap>

                    <AppButton

                        icon={<CheckSquareOutlined />}

                        onClick={onSelectAll}

                    >

                        Select All

                    </AppButton>

                    <AppButton

                        icon={<BorderOutlined />}

                        onClick={onClearAll}

                    >

                        Clear

                    </AppButton>

                    <AppButton

                        icon={<ReloadOutlined />}

                        onClick={onReset}

                    >

                        Reset

                    </AppButton>

                </Space>

            </Col>

        </Row>

    );

}

export default React.memo(ColumnActions);