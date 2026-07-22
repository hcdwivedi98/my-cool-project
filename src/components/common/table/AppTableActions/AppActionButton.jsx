import React from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";

function AppActionButton({
    title,
    icon,
    type = "text",
    danger = false,
    disabled = false,
    onClick,
}) {
    return (
        <Tooltip title={title}>
            <Button
                type={type}
                danger={danger}
                size="small"
                icon={icon}
                disabled={disabled}
                onClick={onClick}
            />
        </Tooltip>
    );
}

AppActionButton.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    type: PropTypes.string,
    danger: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default React.memo(AppActionButton);