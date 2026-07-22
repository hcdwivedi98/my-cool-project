import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DEFAULT_FORMAT = "DD-MMM-YYYY";

function AppDatePicker({
    format = DEFAULT_FORMAT,
    value,
    onChange,
    ...props
}) {
    const handleChange = (date) => {
        onChange?.(date);
    };

    return (
        <DatePicker
            {...props}
            value={
                value
                    ? dayjs(value)
                    : null
            }
            format={format}
            style={{ width: "100%" }}
            onChange={handleChange}
        />
    );
}

AppDatePicker.propTypes = {
    format: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
};

export default React.memo(AppDatePicker);