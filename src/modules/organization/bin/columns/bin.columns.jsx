import React from "react";
import { Progress, Space, Tag } from "antd";

import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { AppButton } from "@/components/common";

import {
    getBinOccupancyColor,
    getBinOccupancyText,
} from "../utils/bin.helper";

const formatLabel = (value) => {
    if (!value) {
        return "-";
    }

    return String(value)
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
};

export const getBinColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    {
        title: "Bin Code",
        dataIndex: "binCode",
        key: "binCode",
        width: 150,
        sorter: (a, b) =>
            (a.binCode || "").localeCompare(
                b.binCode || ""
            ),
    },

    {
        title: "Bin Name",
        dataIndex: "binName",
        key: "binName",
        width: 200,
    },

    {
        title: "Shelf",
        dataIndex: "shelfName",
        key: "shelfName",
        width: 180,
    },

    {
        title: "Rack",
        dataIndex: "rackName",
        key: "rackName",
        width: 160,
    },

    {
        title: "Sub Store",
        dataIndex: "subStoreName",
        key: "subStoreName",
        width: 190,
    },

    {
        title: "Store",
        dataIndex: "storeName",
        key: "storeName",
        width: 190,
    },

    {
        title: "Bin Type",
        dataIndex: "binType",
        key: "binType",
        width: 170,

        render: (value) => (
            <Tag color="blue">
                {formatLabel(value)}
            </Tag>
        ),
    },

    {
        title: "Storage",
        dataIndex: "storageCondition",
        key: "storageCondition",
        width: 150,

        render: (value) => (
            <Tag color="cyan">
                {formatLabel(value)}
            </Tag>
        ),
    },

    {
        title: "Capacity",
        key: "capacity",
        width: 150,

        render: (_, record) => (
            <div>
                <strong>
                    {record.currentQuantity ?? 0}
                </strong>

                {" / "}

                {record.maxQuantity ?? 0}
            </div>
        ),
    },

    {
        title: "Occupancy",
        dataIndex: "occupancyPercentage",
        key: "occupancyPercentage",
        width: 220,

        render: (value = 0) => {
            const color =
                getBinOccupancyColor(value);

            return (
                <div>
                    <Progress
                        percent={value}
                        size="small"
                        strokeColor={color}
                    />

                    <Tag color={color}>
                        {getBinOccupancyText(value)}
                    </Tag>
                </div>
            );
        },
    },

    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 120,

        render: (value) => (
            <Tag
                color={
                    value === "Active"
                        ? "success"
                        : "error"
                }
            >
                {value || "-"}
            </Tag>
        ),
    },

    {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
        width: 150,
    },

    {
        title: "Created On",
        dataIndex: "createdOn",
        key: "createdOn",
        width: 150,
    },

    {
        title: "Actions",
        key: "actions",
        width: 150,
        fixed: "right",

        render: (_, record) => (
            <Space>
                <AppButton
                    type="text"
                    icon={<EyeOutlined />}
                    onClick={() =>
                        onView?.(record)
                    }
                />

                <AppButton
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() =>
                        onEdit?.(record)
                    }
                />

                <AppButton
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                        onDelete?.(record)
                    }
                />
            </Space>
        ),
    },
];

export default getBinColumns;