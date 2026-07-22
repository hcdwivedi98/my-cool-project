import React from "react";
import PropTypes from "prop-types";
import { Card, Flex } from "antd";

function AppTableToolbar({
    left,
    right,
    style,
}) {
    return (
        <Card
            size="small"
            style={style}
        >
            <Flex
                justify="space-between"
                align="center"
                gap={12}
            >
                <Flex gap={8}>
                    {left}
                </Flex>

                <Flex gap={8}>
                    {right}
                </Flex>
            </Flex>
        </Card>
    );
}

AppTableToolbar.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    style: PropTypes.object,
};

export default React.memo(AppTableToolbar);