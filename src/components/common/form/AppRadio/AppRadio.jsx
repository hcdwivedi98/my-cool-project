import React from "react";
import PropTypes from "prop-types";
import { Radio } from "antd";

function AppRadio(props) {
    return <Radio {...props} />;
}

AppRadio.Group = Radio.Group;

AppRadio.propTypes = {
    children: PropTypes.node,
};

export default React.memo(AppRadio);