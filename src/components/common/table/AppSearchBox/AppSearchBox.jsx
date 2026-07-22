import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function AppSearchBox({
    placeholder = "Search...",
    allowClear = true,
    onSearch,
    onChange,
    style,
    ...props
}) {
    return (
        <Input.Search
            {...props}
            allowClear={allowClear}
            placeholder={placeholder}
            enterButton={<SearchOutlined />}
            onSearch={onSearch}
            onChange={onChange}
            style={{
                width: 320,
                ...style,
            }}
        />
    );
}

AppSearchBox.propTypes = {
    placeholder: PropTypes.string,
    allowClear: PropTypes.bool,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.object,
};

export default React.memo(AppSearchBox);