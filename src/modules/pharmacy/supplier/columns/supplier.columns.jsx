import React from "react";

import {
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "@/components/common";

import {
    getCreditTermsLabel,
} from "../utils/supplier.helper";

const getStatusTag = (
    status
) => {
    if (status === "Active") {
        return (
            <Tag color="success">
                Active
            </Tag>
        );
    }

    if (status === "Inactive") {
        return (
            <Tag color="default">
                Inactive
            </Tag>
        );
    }

    return (
        <Tag>
            {status || "-"}
        </Tag>
    );
};

const getSupplierTypeLabel = (
    type
) => {
    const labels = {
        MANUFACTURER:
            "Manufacturer",

        DISTRIBUTOR:
            "Distributor",

        WHOLESALER:
            "Wholesaler",

        IMPORTER:
            "Importer",

        CF_AGENT:
            "C&F Agent",

        OTHER:
            "Other",
    };

    return (
        labels[type] ||
        type ||
        "-"
    );
};

const getSupplierCategoryLabel = (
    category
) => {
    const labels = {
        PHARMACEUTICAL:
            "Pharmaceutical",

        MEDICAL_DEVICE:
            "Medical Devices",

        CONSUMABLE:
            "Consumables",

        SURGICAL:
            "Surgical",

        GENERAL:
            "General",
    };

    return (
        labels[category] ||
        category ||
        "-"
    );
};

export const getSupplierColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    {
        title: "Supplier Code",
        dataIndex:
            "supplierCode",
        key: "supplierCode",
        width: 150,

        sorter: true,

        render: (value) => (
            <strong>
                {value || "-"}
            </strong>
        ),
    },

    {
        title: "Supplier Name",
        dataIndex:
            "supplierName",
        key: "supplierName",
        width: 240,

        sorter: true,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "Type",
        dataIndex:
            "supplierType",
        key: "supplierType",
        width: 150,

        render: (value) =>
            getSupplierTypeLabel(
                value
            ),
    },

    {
        title: "Category",
        dataIndex:
            "supplierCategory",
        key: "supplierCategory",
        width: 170,

        render: (value) =>
            getSupplierCategoryLabel(
                value
            ),
    },

    {
        title: "Contact Person",
        dataIndex:
            "contactPerson",
        key: "contactPerson",
        width: 170,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
        width: 140,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "City",
        dataIndex: "city",
        key: "city",
        width: 130,

        sorter: true,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "GSTIN",
        dataIndex: "gstin",
        key: "gstin",
        width: 180,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "Drug License",
        dataIndex:
            "drugLicenseNumber",
        key: "drugLicenseNumber",
        width: 180,

        render: (value) => (
            <span>
                {value || "-"}
            </span>
        ),
    },

    {
        title: "Payment Terms",
        key: "paymentTerms",
        width: 160,

        render: (_, record) =>
            getCreditTermsLabel(
                record
            ),
    },

    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 110,

        render: (value) =>
            getStatusTag(
                value
            ),
    },

    {
        title: "Created On",
        dataIndex:
            "createdOn",
        key: "createdOn",
        width: 130,

        sorter: true,

        render: (value) =>
            value || "-",
    },

    {
        title: "Actions",
        key: "actions",
        fixed: "right",
        width: 130,

        render: (_, record) => (
            <Space
                orientation="horizontal"
                size="small"
            >
                <Tooltip title="View">
                    <AppButton
                        type="text"
                        icon={
                            <EyeOutlined />
                        }
                        onClick={() =>
                            onView?.(
                                record
                            )
                        }
                    />
                </Tooltip>

                <Tooltip title="Edit">
                    <AppButton
                        type="text"
                        icon={
                            <EditOutlined />
                        }
                        onClick={() =>
                            onEdit?.(
                                record
                            )
                        }
                    />
                </Tooltip>

                {record.status ===
                    "Active" && (
                    <Tooltip title="Deactivate">
                        <AppButton
                            type="text"
                            danger
                            icon={
                                <DeleteOutlined />
                            }
                            onClick={() =>
                                onDelete?.(
                                    record
                                )
                            }
                        />
                    </Tooltip>
                )}
            </Space>
        ),
    },
];

export default getSupplierColumns;