import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

function AppSelect({
    options = [],
    allowClear = true,
    showSearch = true,
    optionFilterProp = "label",
    ...props
}) {
    return (
        <Select
            {...props}
            allowClear={allowClear}
            showSearch={showSearch}
            optionFilterProp={optionFilterProp}
            options={options}
        />
    );
}

AppSelect.Option = Select.Option;

AppSelect.propTypes = {
    options: PropTypes.array,
    allowClear: PropTypes.bool,
    showSearch: PropTypes.bool,
    optionFilterProp: PropTypes.string,
};

export default React.memo(AppSelect);