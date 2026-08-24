// src/modules/purchase-management/purchase-order/columns/purchaseOrder.columns.jsx

import React from "react";

import {
    Button,
    Dropdown,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MoreOutlined,
    SendOutlined,
} from "@ant-design/icons";

import {
    PO_STATUS,
} from "../constants/purchaseOrder.constants";

import {
    formatCurrency,
    formatPurchaseOrderDate,
    getPOStatusColor,
    getPOStatusLabel,
    getPOTypeLabel,
} from "../utils/purchaseOrder.helper";


/* =========================================================
   PURCHASE ORDER COLUMNS
   ========================================================= */

export const getPurchaseOrderColumns = ({
    onView,
    onEdit,
    onSubmit,
    onApprove,
    onReject,
    onSend,
    onCancel,
} = {}) => {


    /* =====================================================
       ACTION MENU
       ===================================================== */

    const getActionItems = (
        record
    ) => {

        const items = [];


        /* ---------------------------------------------
           VIEW
        --------------------------------------------- */

        items.push({

            key:
                "view",

            icon:
                <EyeOutlined />,

            label:
                "View",

            onClick:
                () => {

                    if (
                        typeof onView ===
                        "function"
                    ) {

                        onView(
                            record
                        );

                    }

                },

        });


        /* ---------------------------------------------
           EDIT
        --------------------------------------------- */

        if (
            [
                PO_STATUS.DRAFT,
                PO_STATUS.REJECTED,
            ].includes(
                record.status
            )
        ) {

            items.push({

                key:
                    "edit",

                icon:
                    <EditOutlined />,

                label:
                    "Edit",

                onClick:
                    () => {

                        if (
                            typeof onEdit ===
                            "function"
                        ) {

                            onEdit(
                                record
                            );

                        }

                    },

            });

        }


        /* ---------------------------------------------
           SUBMIT
        --------------------------------------------- */

        if (
            record.status ===
            PO_STATUS.DRAFT
        ) {

            items.push({

                key:
                    "submit",

                icon:
                    <CheckCircleOutlined />,

                label:
                    "Submit for Approval",

                onClick:
                    () => {

                        if (
                            typeof onSubmit ===
                            "function"
                        ) {

                            onSubmit(
                                record
                            );

                        }

                    },

            });

        }


        /* ---------------------------------------------
           APPROVE
        --------------------------------------------- */

        if (
            record.status ===
            PO_STATUS.PENDING_APPROVAL
        ) {

            items.push({

                key:
                    "approve",

                icon:
                    <CheckCircleOutlined />,

                label:
                    "Approve",

                onClick:
                    () => {

                        if (
                            typeof onApprove ===
                            "function"
                        ) {

                            onApprove(
                                record
                            );

                        }

                    },

            });


            items.push({

                key:
                    "reject",

                icon:
                    <CloseCircleOutlined />,

                label:
                    "Reject",

                danger:
                    true,

                onClick:
                    () => {

                        if (
                            typeof onReject ===
                            "function"
                        ) {

                            onReject(
                                record
                            );

                        }

                    },

            });

        }


        /* ---------------------------------------------
           SEND
        --------------------------------------------- */

        if (
            record.status ===
            PO_STATUS.APPROVED
        ) {

            items.push({

                key:
                    "send",

                icon:
                    <SendOutlined />,

                label:
                    "Send to Supplier",

                onClick:
                    () => {

                        if (
                            typeof onSend ===
                            "function"
                        ) {

                            onSend(
                                record
                            );

                        }

                    },

            });

        }


        /* ---------------------------------------------
           CANCEL
        --------------------------------------------- */

        if (
            [
                PO_STATUS.DRAFT,
                PO_STATUS.PENDING_APPROVAL,
                PO_STATUS.APPROVED,
            ].includes(
                record.status
            )
        ) {

            items.push({

                type:
                    "divider",

            });


            items.push({

                key:
                    "cancel",

                icon:
                    <DeleteOutlined />,

                label:
                    "Cancel",

                danger:
                    true,

                onClick:
                    () => {

                        if (
                            typeof onCancel ===
                            "function"
                        ) {

                            onCancel(
                                record
                            );

                        }

                    },

            });

        }


        return items;

    };


    /* =====================================================
       COLUMNS
       ===================================================== */

    return [

        /* =================================================
           PO NUMBER
        ================================================= */

        {
            title:
                "PO Number",

            dataIndex:
                "poNumber",

            key:
                "poNumber",

            width:
                160,

            fixed:
                "left",

            sorter:
                (
                    a,
                    b
                ) =>
                    String(
                        a.poNumber ||
                        ""
                    ).localeCompare(
                        String(
                            b.poNumber ||
                            ""
                        )
                    ),

            render:
                (
                    value,
                    record
                ) => (

                    <div>

                        <div
                            style={{
                                fontWeight:
                                    600,
                            }}
                        >
                            {value || "-"}
                        </div>

                        {
                            record.purchaseRequisitionId && (

                                <div
                                    style={{
                                        marginTop:
                                            3,

                                        fontSize:
                                            12,

                                        color:
                                            "#8c8c8c",
                                    }}
                                >
                                    PR:{" "}
                                    {
                                        record
                                            .purchaseRequisitionId
                                    }
                                </div>

                            )
                        }

                    </div>

                ),
        },


        /* =================================================
           PO DATE
        ================================================= */

        {
            title:
                "PO Date",

            dataIndex:
                "poDate",

            key:
                "poDate",

            width:
                125,

            sorter:
                (
                    a,
                    b
                ) =>
                    new Date(
                        a.poDate
                    ) -
                    new Date(
                        b.poDate
                    ),

            render:
                (
                    value
                ) =>
                    formatPurchaseOrderDate(
                        value
                    ),

        },


        /* =================================================
           SUPPLIER
        ================================================= */

        {
            title:
                "Supplier",

            dataIndex:
                "supplierName",

            key:
                "supplierName",

            width:
                230,

            ellipsis:
                true,

            sorter:
                (
                    a,
                    b
                ) =>
                    String(
                        a.supplierName ||
                        ""
                    ).localeCompare(
                        String(
                            b.supplierName ||
                            ""
                        )
                    ),

            render:
                (
                    value,
                    record
                ) => (

                    <div>

                        <div
                            style={{
                                fontWeight:
                                    500,
                            }}
                        >
                            {value || "-"}
                        </div>

                        {
                            record.supplierCode && (

                                <div
                                    style={{
                                        marginTop:
                                            3,

                                        fontSize:
                                            12,

                                        color:
                                            "#8c8c8c",
                                    }}
                                >
                                    {
                                        record.supplierCode
                                    }
                                </div>

                            )
                        }

                    </div>

                ),
        },


        /* =================================================
           STORE
        ================================================= */

        {
            title:
                "Store",

            dataIndex:
                "storeName",

            key:
                "storeName",

            width:
                180,

            ellipsis:
                true,

            render:
                (
                    value
                ) =>
                    value || "-",

        },


        /* =================================================
           PO TYPE
        ================================================= */

        {
            title:
                "Type",

            dataIndex:
                "poType",

            key:
                "poType",

            width:
                130,

            render:
                (
                    value
                ) => (

                    <Tag>
                        {
                            getPOTypeLabel(
                                value
                            )
                        }
                    </Tag>

                ),

        },


        /* =================================================
           ITEMS
        ================================================= */

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

            sorter:
                (
                    a,
                    b
                ) =>
                    (
                        Number(
                            a.totalItems
                        ) || 0
                    ) -
                    (
                        Number(
                            b.totalItems
                        ) || 0
                    ),

            render:
                (
                    value,
                    record
                ) => (

                    <Tooltip
                        title={
                            `Ordered: ${record.totalQuantity || 0}`
                        }
                    >
                        <span>
                            {
                                value || 0
                            }
                        </span>
                    </Tooltip>

                ),

        },


        /* =================================================
           GRAND TOTAL
        ================================================= */

        {
            title:
                "Grand Total",

            dataIndex:
                "grandTotal",

            key:
                "grandTotal",

            width:
                150,

            align:
                "right",

            sorter:
                (
                    a,
                    b
                ) =>
                    (
                        Number(
                            a.grandTotal
                        ) || 0
                    ) -
                    (
                        Number(
                            b.grandTotal
                        ) || 0
                    ),

            render:
                (
                    value,
                    record
                ) =>
                    formatCurrency(
                        value,
                        record.currency ||
                            "INR"
                    ),

        },


        /* =================================================
           RECEIVED
        ================================================= */

        {
            title:
                "Received",

            key:
                "receivedQuantity",

            width:
                110,

            align:
                "right",

            render:
                (
                    _,
                    record
                ) => {

                    const ordered =
                        Number(
                            record.totalQuantity
                        ) || 0;

                    const received =
                        Number(
                            record.receivedQuantity
                        ) || 0;


                    const percentage =
                        ordered > 0
                            ? Math.min(
                                (
                                    received /
                                    ordered
                                ) *
                                100,
                                100
                            )
                            : 0;


                    return (

                        <Tooltip
                            title={
                                `${received} / ${ordered}`
                            }
                        >
                            <span>
                                {
                                    received
                                }

                                <span
                                    style={{
                                        marginLeft:
                                            4,

                                        fontSize:
                                            11,

                                        color:
                                            "#8c8c8c",
                                    }}
                                >
                                    (
                                    {
                                        percentage.toFixed(
                                            0
                                        )
                                    }%)
                                </span>
                            </span>
                        </Tooltip>

                    );

                },

        },


        /* =================================================
           OUTSTANDING
        ================================================= */

        {
            title:
                "Outstanding",

            key:
                "outstandingQuantity",

            width:
                120,

            align:
                "right",

            render:
                (
                    _,
                    record
                ) => {

                    const outstanding =
                        Number(
                            record.outstandingQuantity
                        ) || 0;


                    return (

                        <span
                            style={{
                                fontWeight:
                                    outstanding >
                                    0
                                        ? 600
                                        : 400,

                                color:
                                    outstanding >
                                    0
                                        ? "#d48806"
                                        : undefined,
                            }}
                        >
                            {
                                outstanding
                            }
                        </span>

                    );

                },

        },


        /* =================================================
           STATUS
        ================================================= */

        {
            title:
                "Status",

            dataIndex:
                "status",

            key:
                "status",

            width:
                180,

            render:
                (
                    value
                ) => (

                    <Tag
                        color={
                            getPOStatusColor(
                                value
                            )
                        }
                    >
                        {
                            getPOStatusLabel(
                                value
                            )
                        }
                    </Tag>

                ),

        },


        /* =================================================
           ACTIONS
        ================================================= */

        {
            title:
                "Actions",

            key:
                "actions",

            width:
                80,

            fixed:
                "right",

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Dropdown
                        trigger={[
                            "click",
                        ]}

                        menu={{
                            items:
                                getActionItems(
                                    record
                                ),
                        }}
                    >

                        <Button
                            type="text"
                            icon={
                                <MoreOutlined />
                            }
                        />

                    </Dropdown>

                ),

        },

    ];

};


/* =========================================================
   DEFAULT COLUMNS
   ========================================================= */

export default getPurchaseOrderColumns;