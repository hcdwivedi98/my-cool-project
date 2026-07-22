import React from "react";
import PropTypes from "prop-types";
import { Timeline } from "antd";

function AppWorkflowHistory({
    items = [],
}) {
    return (
        <Timeline
            items={items}
        />
    );
}

AppWorkflowHistory.propTypes = {
    items: PropTypes.array,
};

export default React.memo(AppWorkflowHistory);