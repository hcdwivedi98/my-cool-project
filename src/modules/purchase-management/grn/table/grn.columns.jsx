// src/modules/purchase-management/grn/table/grn.columns.jsx

import React from "react";

import {
    Button,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import {
    GRN_STATUS,
    GRN_STATUS_LABELS,
} from "../constants/grn.constants";

import {
    getGRNStatusColor,
    getGRNReceivingModeColor,
    getGRNReceivingModeLabel,
    getGRNQualityStatusColor,
    getGRNQualityStatusLabel,
    getGRNInspectionStatusColor,
    getGRNInspectionStatusLabel,
    getGRNStockPostingStatusColor,
    getGRNStockPostingStatusLabel,
} from "../utils/grn.helper";


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

const formatNumber = (
    value
) => {

    const number =
        Number(value) || 0;

    return number.toLocaleString(
        "en-IN"
    );

};


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

const formatCurrency = (
    value,
    currency = "INR"
) => {

    const number =
        Number(value) || 0;

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }
    ).format(number);

};


/* =========================================================
   FORMAT DATE
   ========================================================= */

const formatDate = (
    value
) => {

    if (!value) {
        return "-";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return value;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

};


/* =========================================================
   STATUS COLUMN
   ========================================================= */

const statusColumn = {

    title:
        "Status",

    dataIndex:
        "status",

    key:
        "status",

    width:
        150,

    fixed:
        "left",

    render: (
        status
    ) => (

        <Tag
            color={
                getGRNStatusColor(
                    status
                )
            }
        >
            {
                GRN_STATUS_LABELS?.[
                    status
                ] ||
                status ||
                "-"
            }
        </Tag>

    ),

};


/* =========================================================
   ACTION COLUMN
   ========================================================= */

export const createGRNActionsColumn = ({
    onView,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
}) => ({

    title:
        "Action",

    key:
        "action",

    width:
        130,

    fixed:
        "right",

    render: (
        _,
        record
    ) => {

        const status =
            record?.status;


        const editable =
            canEdit &&
            (
                status ===
                GRN_STATUS.DRAFT ||
                status ===
                GRN_STATUS.REJECTED
            );


        const deletable =
            canDelete &&
            (
                status ===
                GRN_STATUS.DRAFT ||
                status ===
                GRN_STATUS.REJECTED
            );


        return (

            <Space
                size="small"
            >

                {
                    typeof onView ===
                    "function" && (

                        <Tooltip
                            title="View"
                        >

                            <Button
                                type="text"
                                size="small"
                                icon={
                                    <EyeOutlined />
                                }
                                onClick={() =>
                                    onView(
                                        record
                                    )
                                }
                            />

                        </Tooltip>

                    )
                }


                {
                    editable &&
                    typeof onEdit ===
                    "function" && (

                        <Tooltip
                            title="Edit"
                        >

                            <Button
                                type="text"
                                size="small"
                                icon={
                                    <EditOutlined />
                                }
                                onClick={() =>
                                    onEdit(
                                        record
                                    )
                                }
                            />

                        </Tooltip>

                    )
                }


                {
                    deletable &&
                    typeof onDelete ===
                    "function" && (

                        <Tooltip
                            title="Delete"
                        >

                            <Button
                                danger
                                type="text"
                                size="small"
                                icon={
                                    <DeleteOutlined />
                                }
                                onClick={() =>
                                    onDelete(
                                        record
                                    )
                                }
                            />

                        </Tooltip>

                    )
                }

            </Space>

        );

    },

});


/* =========================================================
   MAIN GRN COLUMNS
   ========================================================= */

export const getGRNColumns = ({
    onView,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
}) => [

    {
        title:
            "GRN No.",

        dataIndex:
            "grnNumber",

        key:
            "grnNumber",

        width:
            150,

        fixed:
            "left",

        render: (
            value,
            record
        ) => (

            <Button
                type="link"
                style={{
                    padding: 0,
                    fontWeight: 600,
                }}
                onClick={() =>
                    typeof onView ===
                    "function" &&
                    onView(
                        record
                    )
                }
            >
                {
                    value ||
                    "-"
                }
            </Button>

        ),

    },


    {
        title:
            "GRN Date",

        dataIndex:
            "grnDate",

        key:
            "grnDate",

        width:
            125,

        render:
            formatDate,

    },


    {
        title:
            "Purchase Order",

        dataIndex:
            "purchaseOrderNumber",

        key:
            "purchaseOrderNumber",

        width:
            160,

        render:
            value =>
                value ||
                "-",

    },


    {
        title:
            "Supplier",

        dataIndex:
            "supplierName",

        key:
            "supplierName",

        width:
            220,

        ellipsis:
            true,

        render:
            value =>
                value ||
                "-",

    },


    {
        title:
            "Store",

        dataIndex:
            "storeName",

        key:
            "storeName",

        width:
            190,

        ellipsis:
            true,

        render:
            value =>
                value ||
                "-",

    },


    {
        title:
            "Type",

        dataIndex:
            "grnType",

        key:
            "grnType",

        width:
            170,

        render:
            value => {

                const labels = {

                    AGAINST_PO:
                        "Against Purchase Order",

                    DIRECT_RECEIPT:
                        "Direct Receipt",

                    RETURN_RECEIPT:
                        "Return Receipt",

                };

                return (
                    labels?.[
                        value
                    ] ||
                    value ||
                    "-"
                );

            },

    },


    {
        title:
            "Items",

        dataIndex:
            "totalItems",

        key:
            "totalItems",

        width:
            90,

        align:
            "center",

        render:
            formatNumber,

    },


    {
        title:
            "Received Qty",

        dataIndex:
            "totalReceivedQuantity",

        key:
            "totalReceivedQuantity",

        width:
            130,

        align:
            "right",

        render:
            formatNumber,

    },


    {
        title:
            "Accepted Qty",

        dataIndex:
            "totalAcceptedQuantity",

        key:
            "totalAcceptedQuantity",

        width:
            130,

        align:
            "right",

        render:
            formatNumber,

    },


    {
        title:
            "Rejected Qty",

        dataIndex:
            "totalRejectedQuantity",

        key:
            "totalRejectedQuantity",

        width:
            125,

        align:
            "right",

        render:
            value => {

                const number =
                    Number(value) || 0;

                return (

                    <span
                        style={{
                            color:
                                number > 0
                                    ? "#cf1322"
                                    : undefined,
                        }}
                    >
                        {
                            formatNumber(
                                number
                            )
                        }
                    </span>

                );

            },

    },


    {
        title:
            "Grand Total",

        dataIndex:
            "grandTotal",

        key:
            "grandTotal",

        width:
            145,

        align:
            "right",

        render: (
            value,
            record
        ) =>
            formatCurrency(
                value,
                record?.currency ||
                "INR"
            ),

    },


    statusColumn,


    {
        title:
            "Inspection",

        dataIndex:
            "inspectionStatus",

        key:
            "inspectionStatus",

        width:
            145,

        render:
            status => (

                <Tag
                    color={
                        getGRNInspectionStatusColor(
                            status
                        )
                    }
                >
                    {
                        getGRNInspectionStatusLabel(
                            status
                        )
                    }
                </Tag>

            ),

    },


    {
        title:
            "Stock",

        dataIndex:
            "stockPostingStatus",

        key:
            "stockPostingStatus",

        width:
            130,

        render:
            status => (

                <Tag
                    color={
                        getGRNStockPostingStatusColor(
                            status
                        )
                    }
                >
                    {
                        getGRNStockPostingStatusLabel(
                            status
                        )
                    }
                </Tag>

            ),

    },


    {
        title:
            "Receiving",

        dataIndex:
            "receivingMode",

        key:
            "receivingMode",

        width:
            130,

        render:
            mode => (

                <Tag
                    color={
                        getGRNReceivingModeColor(
                            mode
                        )
                    }
                >
                    {
                        getGRNReceivingModeLabel(
                            mode
                        )
                    }
                </Tag>

            ),

    },


    {
        title:
            "Received By",

        dataIndex:
            "receiverName",

        key:
            "receiverName",

        width:
            150,

        render:
            value =>
                value ||
                "-",

    },


    createGRNActionsColumn({
        onView,
        onEdit,
        onDelete,
        canEdit,
        canDelete,
    }),

];


/* =========================================================
   COMPACT COLUMNS
   ========================================================= */

export const getGRNCompactColumns = ({
    onView,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
}) => [

    {
        title:
            "GRN No.",

        dataIndex:
            "grnNumber",

        key:
            "grnNumber",

        width:
            150,

        render: (
            value,
            record
        ) => (

            <Button
                type="link"
                style={{
                    padding: 0,
                }}
                onClick={() =>
                    typeof onView ===
                    "function" &&
                    onView(
                        record
                    )
                }
            >
                {
                    value ||
                    "-"
                }
            </Button>

        ),

    },


    {
        title:
            "Date",

        dataIndex:
            "grnDate",

        key:
            "grnDate",

        width:
            120,

        render:
            formatDate,

    },


    {
        title:
            "PO",

        dataIndex:
            "purchaseOrderNumber",

        key:
            "purchaseOrderNumber",

        width:
            145,

    },


    {
        title:
            "Supplier",

        dataIndex:
            "supplierName",

        key:
            "supplierName",

        width:
            200,

        ellipsis:
            true,

    },


    {
        title:
            "Qty",

        dataIndex:
            "totalReceivedQuantity",

        key:
            "totalReceivedQuantity",

        width:
            100,

        align:
            "right",

        render:
            formatNumber,

    },


    {
        title:
            "Total",

        dataIndex:
            "grandTotal",

        key:
            "grandTotal",

        width:
            135,

        align:
            "right",

        render: (
            value,
            record
        ) =>
            formatCurrency(
                value,
                record?.currency ||
                "INR"
            ),

    },


    statusColumn,


    createGRNActionsColumn({
        onView,
        onEdit,
        onDelete,
        canEdit,
        canDelete,
    }),

];


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default getGRNColumns;