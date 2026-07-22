import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

import { STATUS_MAP } from "../constants/statusMap";

function AppStatusTag({

    value,

    size = "middle",

    showIcon = false,

    colorMap,

    style,

}) {

    let status = value;

    if (typeof value === "boolean") {

        status = value
            ? "ACTIVE"
            : "INACTIVE";

    }

    status = String(status || "")
        .trim()
        .toUpperCase();

    const config = colorMap?.[status]
        || STATUS_MAP[status]
        || {
            color: "default",
            label: status || "-"
        };

    return (

        <Tag

            color={config.color}

            style={{

                fontSize:
                    size === "small"
                        ? 11
                        : 12,

                ...style

            }}

        >

            {showIcon && config.icon}

            {config.label}

        </Tag>

    );

}

AppStatusTag.propTypes = {

    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),

    size: PropTypes.oneOf([
        "small",
        "middle"
    ]),

    showIcon: PropTypes.bool,

    colorMap: PropTypes.object,

    style: PropTypes.object,

};

export default AppStatusTag;