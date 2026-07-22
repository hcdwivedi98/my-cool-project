import React from "react";

import {
    Button,
    Tooltip,
} from "antd";

function AppIconButton({

    icon,

    tooltip,

    type = "text",

    size = "middle",

    shape = "circle",

    danger = false,

    loading = false,

    disabled = false,

    ghost = false,

    visible = true,

    permission,

    className = "",

    style = {},

    onClick,

    ...rest

}) {

    // Future
    // Permission Check

    if (!visible) {

        return null;

    }

    const button = (

        <Button

            icon={icon}

            type={type}

            size={size}

            shape={shape}

            danger={danger}

            loading={loading}

            disabled={disabled}

            ghost={ghost}

            className={`erp-icon-button ${className}`}

            style={style}

            onClick={onClick}

            {...rest}

        />

    );

    if (tooltip) {

        return (

            <Tooltip title={tooltip}>

                {button}

            </Tooltip>

        );

    }

    return button;

}

export default AppIconButton;