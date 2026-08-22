// src/modules/pharmacy/generic/columns/generic.columns.jsx

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
    DOSAGE_FORMS,
    ROUTES,
    THERAPEUTIC_CLASSES,
    PHARMACOLOGICAL_CLASSES,
} from "../constants/generic.constants";

import {
    AppButton,
} from "@/components/common";

const {
    Text,
} = Typography;

/*
 * ============================================
 * Convert Value → Label
 * ============================================
 */

const getLabel = (
    options = [],
    value
) => {
    const option =
        options.find(
            (item) =>
                item.value ===
                value
        );

    return (
        option?.label ||
        value ||
        "-"
    );
};

/*
 * ============================================
 * Status Renderer
 * ============================================
 */

const renderStatus = (
    status
) => {
    if (
        status === "Active"
    ) {
        return (
            <Tag color="success">
                Active
            </Tag>
        );
    }

    if (
        status === "Inactive"
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
 * Boolean Flag Renderer
 * ============================================
 */

const renderYesNo = (
    value
) => {
    return value ? (
        <Tag color="warning">
            Yes
        </Tag>
    ) : (
        <Text type="secondary">
            No
        </Text>
    );
};

/*
 * ============================================
 * Array Renderer
 * ============================================
 */

const renderArrayLabels = (
    values = [],
    options = [],
    maxVisible = 2
) => {
    if (
        !Array.isArray(values) ||
        values.length === 0
    ) {
        return (
            <Text type="secondary">
                -
            </Text>
        );
    }

    const labels =
        values.map(
            (value) =>
                getLabel(
                    options,
                    value
                )
        );

    const visible =
        labels.slice(
            0,
            maxVisible
        );

    const remaining =
        labels.length -
        visible.length;

    return (
        <Space
            size={[
                2,
                2,
            ]}
            wrap
        >
            {visible.map(
                (
                    label,
                    index
                ) => (
                    <Tag
                        key={`${label}-${index}`}
                    >
                        {label}
                    </Tag>
                )
            )}

            {remaining > 0 && (
                <Tooltip
                    title={labels.join(
                        ", "
                    )}
                >
                    <Tag>
                        +{remaining}
                    </Tag>
                </Tooltip>
            )}
        </Space>
    );
};

/*
 * ============================================
 * Columns
 * ============================================
 */

export const getGenericColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [
    /*
     * Generic Code
     */

    {
        title: "Code",

        dataIndex:
            "genericCode",

        key:
            "genericCode",

        width: 120,

        fixed: "left",

        sorter: true,

        render: (
            value
        ) => (
            <Text strong>
                {value || "-"}
            </Text>
        ),
    },

    /*
     * Generic Name
     */

    {
        title:
            "Generic Name",

        dataIndex:
            "genericName",

        key:
            "genericName",

        width: 220,

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
     * Generic Type
     */

    {
        title: "Type",

        dataIndex:
            "genericType",

        key:
            "genericType",

        width: 135,

        sorter: true,

        render: (
            value
        ) => {
            const label =
                value ===
                "COMBINATION"
                    ? "Combination"
                    : "Single Ingredient";

            return (
                <Tag>
                    {label}
                </Tag>
            );
        },
    },

    /*
     * Therapeutic Class
     */

    {
        title:
            "Therapeutic Class",

        dataIndex:
            "therapeuticClass",

        key:
            "therapeuticClass",

        width: 180,

        sorter: true,

        render: (
            value
        ) =>
            getLabel(
                THERAPEUTIC_CLASSES,
                value
            ),
    },

    /*
     * Pharmacological Class
     */

    {
        title:
            "Pharmacological Class",

        dataIndex:
            "pharmacologicalClass",

        key:
            "pharmacologicalClass",

        width: 210,

        sorter: true,

        render: (
            value
        ) =>
            getLabel(
                PHARMACOLOGICAL_CLASSES,
                value
            ),
    },

    /*
     * Dosage Forms
     */

    {
        title:
            "Dosage Forms",

        dataIndex:
            "dosageForms",

        key:
            "dosageForms",

        width: 210,

        render: (
            values
        ) =>
            renderArrayLabels(
                values,
                DOSAGE_FORMS
            ),
    },

    /*
     * Routes
     */

    {
        title: "Routes",

        dataIndex:
            "routes",

        key: "routes",

        width: 180,

        render: (
            values
        ) =>
            renderArrayLabels(
                values,
                ROUTES
            ),
    },

    /*
     * Prescription
     */

    {
        title:
            "Rx Required",

        dataIndex:
            "prescriptionRequired",

        key:
            "prescriptionRequired",

        width: 110,

        align: "center",

        render:
            renderYesNo,
    },

    /*
     * High Alert
     */

    {
        title:
            "High Alert",

        dataIndex:
            "highAlert",

        key:
            "highAlert",

        width: 110,

        align: "center",

        render: (
            value
        ) =>
            value ? (
                <Tag color="red">
                    High Alert
                </Tag>
            ) : (
                <Text type="secondary">
                    No
                </Text>
            ),
    },

    /*
     * Mapped Drugs
     */

    {
        title:
            "Mapped Drugs",

        dataIndex:
            "drugsCount",

        key:
            "drugsCount",

        width: 120,

        align: "right",

        sorter: true,

        render: (
            value
        ) => (
            <Text strong>
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

export default getGenericColumns;