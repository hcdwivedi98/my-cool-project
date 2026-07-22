import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";

import AppDrawerFooter from "./AppDrawerFooter";

const drawerFooter = React.isValidElement(footer)
    ? footer
    : footer
        ? (
            <AppDrawerFooter
                loading={loading}
                onCancel={onClose}
                onSave={onSave}
                saveText={saveText}
                cancelText={cancelText}
            />
        )
        : null;

function AppDrawer({
    title,
    open,
    loading = false,
    width = 900,
    children,

    onClose,
    onSave,

    footer = true,

    saveText = "Save",
    cancelText = "Cancel",

    destroyOnClose = true,
    maskClosable = false,

    ...props
}) {
    return (
        <Drawer
            {...props}
            title={title}
            open={open}
            width={width}
            destroyOnClose={destroyOnClose}
            maskClosable={maskClosable}
            onClose={onClose}
            footer={drawerFooter}
        >
            {children}
        </Drawer>
    );
}

AppDrawer.propTypes = {
    title: PropTypes.node,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    children: PropTypes.node,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    footer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node,
    ]),
    saveText: PropTypes.string,
    cancelText: PropTypes.string,
};

export default React.memo(AppDrawer);