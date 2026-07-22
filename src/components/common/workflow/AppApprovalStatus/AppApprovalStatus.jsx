import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

const COLORS = {
    Draft: "default",
    Pending: "orange",
    Approved: "green",
    Rejected: "red",
    Cancelled: "volcano",
};

function AppApprovalStatus({ status }) {
    return (
        <Tag color={COLORS[status] || "blue"}>
            {status}
        </Tag>
    );
}

AppApprovalStatus.propTypes = {
    status: PropTypes.string,
};

export default React.memo(AppApprovalStatus);