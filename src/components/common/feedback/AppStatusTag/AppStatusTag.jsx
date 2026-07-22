import React from "react";
import { Tag } from "antd";

const COLORS = {
    Active: "green",
    Inactive: "red",
    Pending: "orange",
    Draft: "default",
    Approved: "blue",
    Rejected: "red"
};

function AppStatusTag({
    value
}) {
    return (
        <Tag color={COLORS[value] || "default"}>
            {value}
        </Tag>
    );
}

export default React.memo(AppStatusTag);