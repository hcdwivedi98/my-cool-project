import React from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

function AppNumberInput({
    min,
    max,
    precision,
    controls = false,
    style,
    ...props
}) {
    return (
        <InputNumber
            {...props}
            min={min}
            max={max}
            precision={precision}
            controls={controls}
            style={{
                width: "100%",
                ...style,
            }}
        />
    );
}

AppNumberInput.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    precision: PropTypes.number,
    controls: PropTypes.bool,
    style: PropTypes.object,
};

export default React.memo(AppNumberInput);