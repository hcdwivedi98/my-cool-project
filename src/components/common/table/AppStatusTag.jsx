import React, { memo } from "react";

import { Tag } from "antd";

const STATUS_CONFIG = {

    // Common

    ACTIVE: {
        color: "success",
        text: "Active",
    },

    INACTIVE: {
        color: "default",
        text: "Inactive",
    },

    // Workflow

    DRAFT: {
        color: "default",
        text: "Draft",
    },

    PENDING: {
        color: "processing",
        text: "Pending",
    },

    APPROVED: {
        color: "success",
        text: "Approved",
    },

    REJECTED: {
        color: "error",
        text: "Rejected",
    },

    CANCELLED: {
        color: "default",
        text: "Cancelled",
    },

    // Inventory

    IN_STOCK: {
        color: "success",
        text: "In Stock",
    },

    LOW_STOCK: {
        color: "warning",
        text: "Low Stock",
    },

    OUT_OF_STOCK: {
        color: "error",
        text: "Out of Stock",
    },

    // Payment

    PAID: {
        color: "success",
        text: "Paid",
    },

    UNPAID: {
        color: "error",
        text: "Unpaid",
    },

    PARTIAL: {
        color: "warning",
        text: "Partial",
    },

};

function AppStatusTag({

    value,

}) {

    //--------------------------------------------------
    // Boolean Support
    //--------------------------------------------------

    let status = value;

    if (typeof value === "boolean") {

        status = value

            ? "ACTIVE"

            : "INACTIVE";

    }

    //--------------------------------------------------

    const config =

        STATUS_CONFIG[status] || {

            color: "default",

            text: status,

        };

    //--------------------------------------------------

    return (

        <Tag color={config.color}>

            {config.text}

        </Tag>

    );

}

export default memo(AppStatusTag);