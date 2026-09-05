import React from "react";
import {
    Button,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    EyeOutlined,
    PrinterOutlined,
} from "@ant-design/icons";

const {
    Text,
} = Typography;

/* =========================================================
   DUMMY INVOICE DATA
   Local data only — no API/backend integration
========================================================= */

const invoiceData = [
    {
        id: "INV-2026-0001",
        invoiceNo: "INV-2026-0001",
        invoiceDate: "05 Sep 2026",
        patientName: "Rahul Sharma",
        patientId: "PT-10001",
        mobile: "9876543210",
        itemCount: 4,
        subtotal: 1250,
        discount: 50,
        tax: 120,
        totalAmount: 1320,
        paidAmount: 1320,
        dueAmount: 0,
        paymentStatus: "PAID",
        billingStatus: "COMPLETED",
    },
    {
        id: "INV-2026-0002",
        invoiceNo: "INV-2026-0002",
        invoiceDate: "05 Sep 2026",
        patientName: "Priya Verma",
        patientId: "PT-10002",
        mobile: "9876501234",
        itemCount: 2,
        subtotal: 780,
        discount: 20,
        tax: 76,
        totalAmount: 836,
        paidAmount: 836,
        dueAmount: 0,
        paymentStatus: "PAID",
        billingStatus: "COMPLETED",
    },
    {
        id: "INV-2026-0003",
        invoiceNo: "INV-2026-0003",
        invoiceDate: "04 Sep 2026",
        patientName: "Amit Kumar",
        patientId: "PT-10003",
        mobile: "9988776655",
        itemCount: 6,
        subtotal: 2100,
        discount: 100,
        tax: 200,
        totalAmount: 2200,
        paidAmount: 1500,
        dueAmount: 700,
        paymentStatus: "PARTIAL",
        billingStatus: "COMPLETED",
    },
    {
        id: "INV-2026-0004",
        invoiceNo: "INV-2026-0004",
        invoiceDate: "04 Sep 2026",
        patientName: "Neha Singh",
        patientId: "PT-10004",
        mobile: "9123456789",
        itemCount: 3,
        subtotal: 540,
        discount: 0,
        tax: 54,
        totalAmount: 594,
        paidAmount: 0,
        dueAmount: 594,
        paymentStatus: "UNPAID",
        billingStatus: "COMPLETED",
    },
    {
        id: "INV-2026-0005",
        invoiceNo: "INV-2026-0005",
        invoiceDate: "03 Sep 2026",
        patientName: "Suresh Gupta",
        patientId: "PT-10005",
        mobile: "9012345678",
        itemCount: 5,
        subtotal: 1650,
        discount: 75,
        tax: 158,
        totalAmount: 1733,
        paidAmount: 1733,
        dueAmount: 0,
        paymentStatus: "PAID",
        billingStatus: "COMPLETED",
    },
];

/* =========================================================
   HELPERS
========================================================= */

const formatCurrency = (value) => {
    return `₹${Number(
        value || 0
    ).toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )}`;
};

/* =========================================================
   PAYMENT STATUS
========================================================= */

const getPaymentStatusTag = (status) => {
    switch (status) {
        case "PAID":
            return (
                <Tag
                    color="success"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Paid
                </Tag>
            );

        case "PARTIAL":
            return (
                <Tag
                    color="warning"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Partial
                </Tag>
            );

        case "UNPAID":
            return (
                <Tag
                    color="error"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Unpaid
                </Tag>
            );

        default:
            return (
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                    }}
                >
                    {status || "Unknown"}
                </Tag>
            );
    }
};

/* =========================================================
   BILLING STATUS
========================================================= */

const getBillingStatusTag = (status) => {
    switch (status) {
        case "COMPLETED":
            return (
                <Tag
                    color="success"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Completed
                </Tag>
            );

        case "DRAFT":
            return (
                <Tag
                    color="default"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Draft
                </Tag>
            );

        case "CANCELLED":
            return (
                <Tag
                    color="error"
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                        fontWeight: 500,
                        paddingInline: 9,
                    }}
                >
                    Cancelled
                </Tag>
            );

        default:
            return (
                <Tag
                    style={{
                        marginInlineEnd: 0,
                        borderRadius: 6,
                    }}
                >
                    {status || "Unknown"}
                </Tag>
            );
    }
};

/* =========================================================
   COMPONENT
========================================================= */

const InvoiceHistoryTable = ({
    data = invoiceData,
    loading = false,
    onView,
    onPrint,
}) => {

    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns = [

        /* ---------------------------------------------
           INVOICE NUMBER
        --------------------------------------------- */

        {
            title: "Invoice No",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
            width: 165,
            fixed: "left",

            render: (invoiceNo) => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Text
                        strong
                        style={{
                            fontSize: 13,
                            color: "#1677ff",
                            lineHeight: 1.4,
                        }}
                    >
                        {invoiceNo}
                    </Text>

                    <Text
                        type="secondary"
                        style={{
                            fontSize: 11,
                        }}
                    >
                        Pharmacy Invoice
                    </Text>
                </div>
            ),
        },

        /* ---------------------------------------------
           DATE
        --------------------------------------------- */

        {
            title: "Date",
            dataIndex: "invoiceDate",
            key: "invoiceDate",
            width: 125,

            render: (date) => (
                <Text
                    style={{
                        fontSize: 13,
                        whiteSpace: "nowrap",
                    }}
                >
                    {date || "—"}
                </Text>
            ),
        },

        /* ---------------------------------------------
           PATIENT
        --------------------------------------------- */

        {
            title: "Patient",
            dataIndex: "patientName",
            key: "patientName",
            width: 210,

            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: 0,
                    }}
                >
                    <Text
                        strong
                        ellipsis={{
                            tooltip:
                                record.patientName,
                        }}
                        style={{
                            fontSize: 13,
                            lineHeight: 1.4,
                        }}
                    >
                        {record.patientName ||
                            "Walk-in Customer"}
                    </Text>

                    <Text
                        type="secondary"
                        style={{
                            fontSize: 11,
                            lineHeight: 1.4,
                        }}
                    >
                        ID:{" "}
                        {record.patientId || "—"}
                    </Text>
                </div>
            ),
        },

        /* ---------------------------------------------
           MOBILE
        --------------------------------------------- */

        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: 135,

            render: (mobile) => (
                <Text
                    style={{
                        fontSize: 13,
                        whiteSpace: "nowrap",
                    }}
                >
                    {mobile || "—"}
                </Text>
            ),
        },

        /* ---------------------------------------------
           ITEMS
        --------------------------------------------- */

        {
            title: "Items",
            dataIndex: "itemCount",
            key: "itemCount",
            width: 95,
            align: "center",

            render: (count) => (
                <Text
                    type="secondary"
                    style={{
                        fontSize: 13,
                    }}
                >
                    {count || 0}{" "}
                    {(count || 0) === 1
                        ? "item"
                        : "items"}
                </Text>
            ),
        },

        /* ---------------------------------------------
           TOTAL AMOUNT
        --------------------------------------------- */

        {
            title: "Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
            width: 135,
            align: "right",

            render: (amount) => (
                <Text
                    strong
                    style={{
                        fontSize: 13,
                        whiteSpace: "nowrap",
                    }}
                >
                    {formatCurrency(amount)}
                </Text>
            ),
        },

        /* ---------------------------------------------
           PAID
        --------------------------------------------- */

        {
            title: "Paid",
            dataIndex: "paidAmount",
            key: "paidAmount",
            width: 125,
            align: "right",

            render: (amount) => (
                <Text
                    style={{
                        fontSize: 13,
                        whiteSpace: "nowrap",
                    }}
                >
                    {formatCurrency(amount)}
                </Text>
            ),
        },

        /* ---------------------------------------------
           DUE
        --------------------------------------------- */

        {
            title: "Due",
            dataIndex: "dueAmount",
            key: "dueAmount",
            width: 125,
            align: "right",

            render: (amount) => {
                const due =
                    Number(amount || 0);

                return (
                    <Text
                        type={
                            due > 0
                                ? "danger"
                                : "secondary"
                        }
                        strong={due > 0}
                        style={{
                            fontSize: 13,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {formatCurrency(due)}
                    </Text>
                );
            },
        },

        /* ---------------------------------------------
           PAYMENT STATUS
        --------------------------------------------- */

        {
            title: "Payment",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            width: 115,
            align: "center",

            render: (status) =>
                getPaymentStatusTag(status),
        },

        /* ---------------------------------------------
           BILLING STATUS
        --------------------------------------------- */

        {
            title: "Billing",
            dataIndex: "billingStatus",
            key: "billingStatus",
            width: 125,
            align: "center",

            render: (status) =>
                getBillingStatusTag(status),
        },

        /* ---------------------------------------------
           ACTIONS
        --------------------------------------------- */

        {
            title: "Actions",
            key: "actions",
            width: 125,
            fixed: "right",
            align: "center",

            render: (_, record) => (
                <Space size={2}>

                    <Button
                        type="text"
                        size="small"
                        icon={
                            <EyeOutlined />
                        }
                        title="View Invoice"
                        aria-label="View Invoice"
                        onClick={() =>
                            onView?.(record)
                        }
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: 6,
                        }}
                    />

                    <Button
                        type="text"
                        size="small"
                        icon={
                            <PrinterOutlined />
                        }
                        title="Print Invoice"
                        aria-label="Print Invoice"
                        onClick={() =>
                            onPrint?.(record)
                        }
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: 6,
                        }}
                    />

                </Space>
            ),
        },
    ];

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data}
            loading={loading}

            /* ---------------------------------------------
               IMPORTANT:
               Pagination is controlled by
               BillingHistoryPage.jsx.
               --------------------------------------------- */

            pagination={false}

            scroll={{
                x: 1400,
            }}

            size="middle"

            rowClassName={() =>
                "billing-history-table-row"
            }

            style={{
                width: "100%",
            }}
        />
    );
};

/* =========================================================
   EXPORTS
========================================================= */

export {
    invoiceData,
};

export default InvoiceHistoryTable;