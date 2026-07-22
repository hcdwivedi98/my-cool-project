import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

const { Search, Password, TextArea } = Input;

const transformValue = (
    value,
    {
        trim,
        uppercase,
        lowercase,
    }
) => {
    if (typeof value !== "string") return value;

    let result = value;

    if (trim) result = result.trimStart();
    if (uppercase) result = result.toUpperCase();
    if (lowercase) result = result.toLowerCase();

    return result;
};

function AppInput({
    trim = false,
    uppercase = false,
    lowercase = false,
    onChange,
    ...props
}) {
    const handleChange = (e) => {
        const value = transformValue(
            e.target.value,
            {
                trim,
                uppercase,
                lowercase,
            }
        );

        e.target.value = value;

        onChange?.(e);
    };

    return (
        <Input
            allowClear
            {...props}
            onChange={handleChange}
        />
    );
}

AppInput.Search = Search;
AppInput.Password = Password;
AppInput.TextArea = TextArea;

AppInput.propTypes = {
    trim: PropTypes.bool,
    uppercase: PropTypes.bool,
    lowercase: PropTypes.bool,
    onChange: PropTypes.func,
};

export default AppInput;