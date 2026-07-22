import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd";

function AppToolbar({
    left,
    right,
    children,
    style,
}) {
    if (children) {
        return (
            <Flex
                gap={8}
                wrap="wrap"
                align="center"
                style={{
                    marginBottom: 16,
                    ...style,
                }}
            >
                {children}
            </Flex>
        );
    }

    return (
        <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap={12}
            style={{
                marginBottom: 16,
                ...style,
            }}
        >
            <Flex gap={8} wrap="wrap" align="center">
                {left}
            </Flex>

            <Flex gap={8} wrap="wrap" align="center">
                {right}
            </Flex>
        </Flex>
    );
}

AppToolbar.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    children: PropTypes.node,
    style: PropTypes.object,
};

export default React.memo(AppToolbar);