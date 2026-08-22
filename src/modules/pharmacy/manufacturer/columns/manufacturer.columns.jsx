// src/modules/pharmacy/manufacturer/columns/manufacturer.columns.jsx

import React from "react";

import {
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "@/components/common";

const {
    Text,
} = Typography;

/*
 * ============================================
 * Status Renderer
 * ============================================
 */

const renderStatus = (
    status
) => {
    if (
        status ===
        "Active"
    ) {
        return (
            <Tag color="success">
                Active
            </Tag>
        );
    }

    if (
        status ===
        "Inactive"
    ) {
        return (
            <Tag>
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

/*
 * ============================================
 * Manufacturer Type Renderer
 * ============================================
 */

const renderManufacturerType =
    (
        value
    ) => {
        const labels = {
            PHARMACEUTICAL:
                "Pharmaceutical",

            BIOLOGICAL:
                "Biological",

            VACCINE:
                "Vaccine",

            SURGICAL:
                "Surgical",

            MEDICAL_DEVICE:
                "Medical Device",

            NUTRACEUTICAL:
                "Nutraceutical",

            OTHER:
                "Other",
        };

        return (
            labels[value] ||
            value ||
            "-"
        );
    };

/*
 * ============================================
 * Manufacturer Category Renderer
 * ============================================
 */

const renderManufacturerCategory =
    (
        value
    ) => {
        const labels = {
            DOMESTIC:
                "Domestic",

            MULTINATIONAL:
                "Multinational",

            GOVERNMENT:
                "Government",

            IMPORTER:
                "Importer",

            CONTRACT_MANUFACTURER:
                "Contract Manufacturer",
        };

        return (
            labels[value] ||
            value ||
            "-"
        );
    };

/*
 * ============================================
 * Columns
 * ============================================
 */

export const getManufacturerColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    /*
     * Code
     */

    {
        title: "Code",

        dataIndex:
            "manufacturerCode",

        key:
            "manufacturerCode",

        width: 120,

        fixed: "left",

        sorter: true,

        render: (
            value
        ) => (
            <Text
                strong
                style={{
                    fontSize: 13,
                }}
            >
                {value || "-"}
            </Text>
        ),
    },

    /*
     * Manufacturer Name
     */

    {
        title:
            "Manufacturer Name",

        dataIndex:
            "manufacturerName",

        key:
            "manufacturerName",

        width: 230,

        sorter: true,

        render: (
            value,
            record
        ) => (
            <div>
                <Text
                    strong
                    ellipsis={{
                        tooltip:
                            value,
                    }}
                >
                    {value || "-"}
                </Text>

                {record?.shortName && (
                    <div>
                        <Text
                            type="secondary"
                            style={{
                                fontSize: 12,
                            }}
                        >
                            {
                                record.shortName
                            }
                        </Text>
                    </div>
                )}
            </div>
        ),
    },

    /*
     * Type
     */

    {
        title: "Type",

        dataIndex:
            "manufacturerType",

        key:
            "manufacturerType",

        width: 155,

        sorter: true,

        render:
            renderManufacturerType,
    },

    /*
     * Category
     */

    {
        title:
            "Category",

        dataIndex:
            "manufacturerCategory",

        key:
            "manufacturerCategory",

        width: 155,

        sorter: true,

        render:
            renderManufacturerCategory,
    },

    /*
     * Contact Person
     */

    {
        title:
            "Contact Person",

        dataIndex:
            "contactPerson",

        key:
            "contactPerson",

        width: 165,

        render: (
            value
        ) => (
            <Text>
                {value || "-"}
            </Text>
        ),
    },

    /*
     * Mobile
     */

    {
        title: "Mobile",

        dataIndex:
            "mobile",

        key: "mobile",

        width: 130,
    },

    /*
     * GSTIN
     */

    {
        title: "GSTIN",

        dataIndex:
            "gstin",

        key: "gstin",

        width: 165,

        render: (
            value
        ) => (
            <Text
                style={{
                    fontSize: 12,
                    fontFamily:
                        "monospace",
                }}
            >
                {value || "-"}
            </Text>
        ),
    },

    /*
     * Products
     */

    {
        title:
            "Products",

        dataIndex:
            "productsCount",

        key:
            "productsCount",

        width: 100,

        align: "right",

        sorter: true,

        render: (
            value
        ) => (
            <Text>
                {Number(
                    value
                ) || 0}
            </Text>
        ),
    },

    /*
     * Status
     */

    {
        title:
            "Status",

        dataIndex:
            "status",

        key: "status",

        width: 100,

        fixed: "right",

        render:
            renderStatus,
    },

    /*
     * Actions
     */

    {
        title:
            "Actions",

        key: "actions",

        width: 120,

        fixed: "right",

        align: "center",

        render: (
            _,
            record
        ) => (
            <Space
                size={2}
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

                {record?.status ===
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

export default getManufacturerColumns;