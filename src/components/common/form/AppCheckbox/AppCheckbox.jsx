import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

function AppCheckbox(props) {
    return <Checkbox {...props} />;
}

AppCheckbox.Group = Checkbox.Group;

AppCheckbox.propTypes = {
    children: PropTypes.node,
};

export default React.memo(AppCheckbox);