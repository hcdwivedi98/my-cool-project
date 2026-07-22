import React from "react";
import PropTypes from "prop-types";
import { Flex } from "antd";

function AppMasterToolbar({
    left,
    right,
}) {
    return (
        <Flex
            justify="space-between"
            align="center"
            gap={16}
        >
            <Flex gap={8}>
                {left}
            </Flex>

            <Flex gap={8}>
                {right}
            </Flex>
        </Flex>
    );
}

AppMasterToolbar.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
};

export default React.memo(AppMasterToolbar);