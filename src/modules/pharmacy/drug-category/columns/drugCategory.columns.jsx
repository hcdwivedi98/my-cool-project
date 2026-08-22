// src/modules/pharmacy/drug-category/columns/drugCategory.columns.jsx

import React from "react";

import {
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";

import {
    DRUG_CATEGORY_TYPE_LABELS,
    DRUG_CATEGORY_TYPE_COLORS,
    DRUG_CATEGORY_STATUS_COLORS,
} from "../constants/drugCategory.constants";

import {
    categoryHasDrugs,
} from "../utils/drugCategory.helper";


const {
    Text,
} = Typography;


/*
 * =========================================================
 * COLUMN FACTORY
 * =========================================================
 *
 * We use a function instead of a static array so that
 * permission / action handlers can be injected from
 * DrugCategoryPage.jsx.
 */

export const getDrugCategoryColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
    hasViewPermission = true,
    hasEditPermission = true,
    hasActivatePermission = true,
    hasDeactivatePermission = true,
} = {}) => {

    return [

        /*
         * =================================================
         * S.NO
         * =================================================
         */

        {
            title: "S.No.",
            key: "serialNumber",
            width: 70,
            align: "center",

            render: (
                _,
                __,
                index
            ) => index + 1,
        },


        /*
         * =================================================
         * CATEGORY CODE
         * =================================================
         */

        {
            title: "Category Code",
            dataIndex: "categoryCode",
            key: "categoryCode",

            width: 170,

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
         * =================================================
         * CATEGORY NAME
         * =================================================
         */

        {
            title: "Category Name",
            dataIndex: "categoryName",
            key: "categoryName",

            width: 220,

            sorter: true,

            render: (
                value,
                record
            ) => (
                <Space
                    size={6}
                >
                    {record.parentCategoryId && (
                        <Text
                            type="secondary"
                        >
                            ↳
                        </Text>
                    )}

                    <Text>
                        {value || "-"}
                    </Text>
                </Space>
            ),
        },


        /*
         * =================================================
         * CATEGORY TYPE
         * =================================================
         */

        {
            title: "Type",
            dataIndex: "categoryType",
            key: "categoryType",

            width: 150,

            filters: [
                {
                    text: "Therapeutic",
                    value: "THERAPEUTIC",
                },
                {
                    text: "Pharmacological",
                    value: "PHARMACOLOGICAL",
                },
                {
                    text: "Clinical",
                    value: "CLINICAL",
                },
                {
                    text: "Other",
                    value: "OTHER",
                },
            ],

            render: (
                value
            ) => (
                <Tag
                    color={
                        DRUG_CATEGORY_TYPE_COLORS[
                            value
                        ] ||
                        "default"
                    }
                >
                    {
                        DRUG_CATEGORY_TYPE_LABELS[
                            value
                        ] ||
                        value ||
                        "-"
                    }
                </Tag>
            ),
        },


        /*
         * =================================================
         * PARENT CATEGORY
         * =================================================
         */

        {
            title: "Parent Category",
            dataIndex:
                "parentCategoryName",

            key:
                "parentCategoryName",

            width: 180,

            render: (
                value
            ) => (
                <Text
                    type={
                        value &&
                        value !== "-"
                            ? undefined
                            : "secondary"
                    }
                >
                    {value || "-"}
                </Text>
            ),
        },


        /*
         * =================================================
         * DRUG COUNT
         * =================================================
         */

        {
            title: "Drugs",
            dataIndex: "drugCount",
            key: "drugCount",

            width: 100,

            align: "center",

            sorter: true,

            render: (
                value,
                record
            ) => {
                const count =
                    Number(
                        value
                    ) || 0;

                return (
                    <Tag
                        color={
                            categoryHasDrugs(
                                record
                            )
                                ? "blue"
                                : "default"
                        }
                    >
                        {count}
                    </Tag>
                );
            },
        },


        /*
         * =================================================
         * STATUS
         * =================================================
         */

        {
            title: "Status",
            dataIndex: "status",
            key: "status",

            width: 110,

            filters: [
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text: "Inactive",
                    value: "Inactive",
                },
            ],

            render: (
                value
            ) => (
                <Tag
                    color={
                        DRUG_CATEGORY_STATUS_COLORS[
                            value
                        ] ||
                        "default"
                    }
                >
                    {value || "-"}
                </Tag>
            ),
        },


        /*
         * =================================================
         * SORT ORDER
         * =================================================
         */

        {
            title: "Order",
            dataIndex: "sortOrder",
            key: "sortOrder",

            width: 90,

            align: "center",

            sorter: true,

            render: (
                value
            ) =>
                value ??
                "-",
        },


        /*
         * =================================================
         * MODIFIED
         * =================================================
         */

        {
            title: "Last Modified",
            key: "modified",

            width: 180,

            render: (
                _,
                record
            ) => (
                <div>
                    <Text
                        style={{
                            display:
                                "block",
                            fontSize: 12,
                        }}
                    >
                        {record.modifiedBy ||
                            "-"}
                    </Text>

                    <Text
                        type="secondary"
                        style={{
                            fontSize: 11,
                        }}
                    >
                        {record.modifiedOn ||
                            "-"}
                    </Text>
                </div>
            ),
        },


        /*
         * =================================================
         * ACTIONS
         * =================================================
         */

        {
            title: "Action",
            key: "action",

            fixed: "right",

            width: 145,

            align: "center",

            render: (
                _,
                record
            ) => (
                <Space
                    size={4}
                >

                    {/* VIEW */}

                    {hasViewPermission && (
                        <Tooltip
                            title="View"
                        >
                            <button
                                type="button"
                                className="table-action-button"
                                onClick={() =>
                                    onView?.(
                                        record
                                    )
                                }
                            >
                                <EyeOutlined />
                            </button>
                        </Tooltip>
                    )}


                    {/* EDIT */}

                    {hasEditPermission && (
                        <Tooltip
                            title="Edit"
                        >
                            <button
                                type="button"
                                className="table-action-button"
                                onClick={() =>
                                    onEdit?.(
                                        record
                                    )
                                }
                            >
                                <EditOutlined />
                            </button>
                        </Tooltip>
                    )}


                    {/* ACTIVATE */}

                    {record.status ===
                        "Inactive" &&
                        hasActivatePermission && (
                            <Tooltip
                                title="Activate"
                            >
                                <button
                                    type="button"
                                    className="table-action-button"
                                    onClick={() =>
                                        onActivate?.(
                                            record
                                        )
                                    }
                                >
                                    <CheckCircleOutlined />
                                </button>
                            </Tooltip>
                        )}


                    {/* DEACTIVATE */}

                    {record.status ===
                        "Active" &&
                        hasDeactivatePermission && (
                            <Tooltip
                                title="Deactivate"
                            >
                                <button
                                    type="button"
                                    className="table-action-button danger"
                                    onClick={() =>
                                        onDeactivate?.(
                                            record
                                        )
                                    }
                                >
                                    <StopOutlined />
                                </button>
                            </Tooltip>
                        )}

                </Space>
            ),
        },
    ];
};


/*
 * =========================================================
 * DEFAULT COLUMNS
 * =========================================================
 */

export default getDrugCategoryColumns;