import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

function AppRefreshButton({
    loading,
    onClick,
}) {
    return (
        <Button
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={onClick}
        >
            Refresh
        </Button>
    );
}

AppRefreshButton.propTypes = {
    loading: PropTypes.bool,
    onClick: PropTypes.func,
};

export default React.memo(AppRefreshButton);