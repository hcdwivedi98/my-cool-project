import React from "react";
import PropTypes from "prop-types";
import { Segmented } from "antd";

const options = [
    {
        label: "Compact",
        value: "small",
    },
    {
        label: "Default",
        value: "middle",
    },
    {
        label: "Large",
        value: "large",
    },
];

function AppDensitySwitcher({
    value = "small",
    onChange,
}) {
    return (
        <Segmented
            options={options}
            value={value}
            onChange={onChange}
        />
    );
}

AppDensitySwitcher.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default React.memo(AppDensitySwitcher);