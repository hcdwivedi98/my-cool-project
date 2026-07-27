import React from "react";
import { Tag, Progress, Space } from "antd";
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { AppButton } from "@/components/common";
import {
    getShelfOccupancyColor,
    getShelfOccupancyText,
} from "../utils/shelf.helper";

export const getShelfColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    {
        title: "Shelf Code",
        dataIndex: "shelfCode",
        key: "shelfCode",
        width: 130,
        sorter: (a, b) =>
            a.shelfCode.localeCompare(b.shelfCode),
    },

    {
        title: "Shelf Name",
        dataIndex: "shelfName",
        key: "shelfName",
        width: 220,
    },

    {
        title: "Rack",
        dataIndex: "rackName",
        key: "rackName",
        width: 220,
    },

    {
        title: "Sub Store",
        dataIndex: "subStoreName",
        key: "subStoreName",
        width: 180,
    },

    {
        title: "Store",
        dataIndex: "storeName",
        key: "storeName",
        width: 180,
    },

    {
        title: "Shelf Type",
        dataIndex: "shelfType",
        key: "shelfType",
        width: 170,
        render: (value) => (
            <Tag color="blue">
                {value.replaceAll("_", " ")}
            </Tag>
        ),
    },

    {
        title: "Storage",
        dataIndex: "storageCondition",
        key: "storageCondition",
        width: 180,
        render: (value) => (
            <Tag color="cyan">
                {value.replaceAll("_", " ")}
            </Tag>
        ),
    },

    {
        title: "Inventory Method",
        dataIndex: "inventoryMethod",
        key: "inventoryMethod",
        width: 150,
        render: (value) => (
            <Tag color="purple">{value}</Tag>
        ),
    },

    {
        title: "Max Bins",
        dataIndex: "maxBins",
        key: "maxBins",
        width: 120,
        align: "center",
    },

    {
        title: "Occupancy",
        dataIndex: "occupancyPercentage",
        key: "occupancyPercentage",
        width: 220,
        render: (value) => (
            <div>
                <Progress
                    percent={value}
                    size="small"
                    status="active"
                    strokeColor={getShelfOccupancyColor(value)}
                />

                <Tag color={getShelfOccupancyColor(value)}>
                    {getShelfOccupancyText(value)}
                </Tag>
            </div>
        ),
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
                {value}
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
        width: 170,
        fixed: "right",

        render: (_, record) => (
            <Space>
                <AppButton
                    icon={<EyeOutlined />}
                    type="text"
                    onClick={() => onView(record)}
                />

                <AppButton
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => onEdit(record)}
                />

                <AppButton
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete(record)}
                />
            </Space>
        ),
    },
];

export default getShelfColumns;