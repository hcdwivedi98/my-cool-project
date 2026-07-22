import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

function AppButton({
    children,
    ...props
}) {
    return (
        <Button {...props}>
            {children}
        </Button>
    );
}

AppButton.propTypes = {
    children: PropTypes.node,
};

export default React.memo(AppButton);