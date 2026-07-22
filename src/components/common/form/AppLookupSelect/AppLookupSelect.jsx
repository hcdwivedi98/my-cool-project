import React from "react";
import PropTypes from "prop-types";
import AppSelect from "../AppSelect";

function AppLookupSelect({
    options = [],
    valueField = "value",
    labelField = "label",
    ...props
}) {
    const data = options.map(item => ({
        value: item[valueField],
        label: item[labelField],
        ...item,
    }));

    return (
        <AppSelect
            {...props}
            options={data}
        />
    );
}

AppLookupSelect.propTypes = {
    data: PropTypes.array,
    valueField: PropTypes.string,
    labelField: PropTypes.string,
};

export default React.memo(AppLookupSelect);