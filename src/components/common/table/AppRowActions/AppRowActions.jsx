import React from "react";
import PropTypes from "prop-types";
import { Space } from "antd";

function AppRowActions({ children }) {
    return (
        <Space size={4}>
            {children}
        </Space>
    );
}

AppRowActions.propTypes = {
    children: PropTypes.node,
};

export default React.memo(AppRowActions);