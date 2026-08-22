import React from "react";
import { Progress, Space, Tag } from "antd";

import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "@/components/common";

import {
    getDrugStatusColor,
} from "../utils/drug.helper";

const formatText = (value) => {
    if (!value) {
        return "-";
    }

    return String(value)
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
};

const formatStrength = (
    strength,
    strengthUnit
) => {
    if (
        strength === undefined ||
        strength === null ||
        strength === ""
    ) {
        return "-";
    }

    return `${strength} ${formatText(
        strengthUnit
    )}`;
};

export const getDrugColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    {
        title: "Drug Code",
        dataIndex: "drugCode",
        key: "drugCode",
        width: 150,
        fixed: "left",

        sorter: (a, b) =>
            String(a.drugCode || "").localeCompare(
                String(b.drugCode || "")
            ),
    },

    {
        title: "Drug Name",
        dataIndex: "drugName",
        key: "drugName",
        width: 260,

        sorter: (a, b) =>
            String(a.drugName || "").localeCompare(
                String(b.drugName || "")
            ),
    },

    {
        title: "Generic Name",
        dataIndex: "genericName",
        key: "genericName",
        width: 220,
    },

    {
        title: "Brand Name",
        dataIndex: "brandName",
        key: "brandName",
        width: 180,
    },

    {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 180,

        render: (value) => (
            <Tag color="blue">
                {formatText(value)}
            </Tag>
        ),
    },

    {
        title: "Dosage Form",
        dataIndex: "dosageForm",
        key: "dosageForm",
        width: 150,

        render: (value) => (
            <Tag color="cyan">
                {formatText(value)}
            </Tag>
        ),
    },

    {
        title: "Strength",
        key: "strength",
        width: 130,

        render: (_, record) =>
            formatStrength(
                record.strength,
                record.strengthUnit
            ),
    },

    {
        title: "Route",
        dataIndex: "route",
        key: "route",
        width: 150,

        render: (value) =>
            formatText(value),
    },

    {
        title: "Pack Size",
        key: "packSize",
        width: 130,

        align: "center",

        render: (_, record) => {
            if (
                !record.packSize &&
                !record.unitsPerPack
            ) {
                return "-";
            }

            return `${record.packSize || 0} / ${
                record.unitsPerPack || 0
            }`;
        },
    },

    {
        title: "Storage",
        dataIndex: "storageCondition",
        key: "storageCondition",
        width: 160,

        render: (value) => (
            <Tag color="geekblue">
                {formatText(value)}
            </Tag>
        ),
    },

    {
        title: "MRP",
        dataIndex: "mrp",
        key: "mrp",
        width: 110,

        align: "right",

        render: (value) =>
            value !== undefined &&
            value !== null
                ? `₹${Number(value).toFixed(2)}`
                : "-",
    },

    {
        title: "GST",
        dataIndex: "gstPercentage",
        key: "gstPercentage",
        width: 90,

        align: "center",

        render: (value) =>
            value !== undefined &&
            value !== null
                ? `${value}%`
                : "-",
    },

    {
        title: "Prescription",
        dataIndex: "prescriptionRequired",
        key: "prescriptionRequired",
        width: 130,

        align: "center",

        render: (value) => (
            <Tag
                color={
                    value
                        ? "orange"
                        : "default"
                }
            >
                {value ? "Required" : "Not Required"}
            </Tag>
        ),
    },

    {
        title: "High Alert",
        dataIndex: "highAlert",
        key: "highAlert",
        width: 110,

        align: "center",

        render: (value) => (
            <Tag
                color={
                    value
                        ? "red"
                        : "default"
                }
            >
                {value ? "Yes" : "No"}
            </Tag>
        ),
    },

    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 110,

        render: (value) => (
            <Tag color={getDrugStatusColor(value)}>
                {value}
            </Tag>
        ),
    },

    {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
        width: 140,
    },

    {
        title: "Created On",
        dataIndex: "createdOn",
        key: "createdOn",
        width: 130,
    },

    {
        title: "Actions",
        key: "actions",
        width: 150,

        fixed: "right",

        render: (_, record) => (
            <Space
                orientation="horizontal"
            >
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

export default getDrugColumns;