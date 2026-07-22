import React from "react";
import PropTypes from "prop-types";
import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

function AppMasterHeader({
    title,
    onAdd,
    addText = "Add",
    extra,
}) {
    return (
        <Flex
            justify="space-between"
            align="center"
        >
            <Title
                level={4}
                style={{ margin: 0 }}
            >
                {title}
            </Title>

            <Flex gap={8}>
                {extra}

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                >
                    {addText}
                </Button>
            </Flex>
        </Flex>
    );
}

AppMasterHeader.propTypes = {
    title: PropTypes.node,
    onAdd: PropTypes.func,
    addText: PropTypes.string,
    extra: PropTypes.node,
};

export default React.memo(AppMasterHeader);