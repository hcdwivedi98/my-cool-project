import React from "react";
import PropTypes from "prop-types";
import { Popconfirm } from "antd";

import AppButton from "../../buttons/AppButton";

function AppConfirmButton({
    title = "Are you sure?",
    onConfirm,
    children,
    ...props
}) {
    return (
        <Popconfirm
            title={title}
            onConfirm={onConfirm}
        >
            <AppButton {...props}>
                {children}
            </AppButton>
        </Popconfirm>
    );
}

AppConfirmButton.propTypes = {
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
};

export default React.memo(AppConfirmButton);