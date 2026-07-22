import React from "react";
import PropTypes from "prop-types";

function AppPageContent({
    children,
    style,
}) {
    return (
        <div
            style={{
                width: "100%",
                ...style,
            }}
        >
            {children}
        </div>
    );
}

AppPageContent.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
};

export default React.memo(AppPageContent);