import React, {
    useMemo,
    useState,
    useCallback,
    useEffect,
} from "react";

import { useNavigate } from "react-router-dom";
import {
    Card,
    Col,
    DatePicker,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Statistic,
    Typography,
    Button,
    Empty,
    Pagination,
    Spin,
} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    FileTextOutlined,
    SearchOutlined,
    PrinterOutlined,
    PlusOutlined
} from "@ant-design/icons";

import InvoiceHistoryTable, {
    invoiceData,
} from "../components/InvoiceHistoryTable";

import InvoicePreview from "../components/InvoicePreview";

const {
    Title,
    Text,
} = Typography;

const {
    RangePicker,
} = DatePicker;


/* =========================================================
   COMPONENT
========================================================= */

const BillingHistoryPage = () => {

    const navigate = useNavigate();
    /* =====================================================
       FILTER STATES
    ===================================================== */

    const [
        searchText,
        setSearchText,
    ] = useState("");

    const [
        paymentStatus,
        setPaymentStatus,
    ] = useState("ALL");

    const [
        billingStatus,
        setBillingStatus,
    ] = useState("ALL");

    const [
        dateRange,
        setDateRange,
    ] = useState(null);

    /* =====================================================
   PAGINATION STATES
===================================================== */

    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const [
        pageSize,
        setPageSize,
    ] = useState(10);


    /* =====================================================
       LOADING STATE
    ===================================================== */

    const [
        loading,
        setLoading,
    ] = useState(false);

    /* =====================================================
       VIEW INVOICE STATES
    ===================================================== */

    const [
        selectedInvoice,
        setSelectedInvoice,
    ] = useState(null);

    const [
        viewInvoiceOpen,
        setViewInvoiceOpen,
    ] = useState(false);


    /* =====================================================
       FILTER INVOICE DATA
    ===================================================== */

    const filteredInvoices = useMemo(() => {

        let result = [
            ...invoiceData,
        ];


        /* ---------------------------------------------
           SEARCH
        --------------------------------------------- */

        const search =
            searchText
                .trim()
                .toLowerCase();

        if (search) {

            result =
                result.filter(
                    (invoice) => {

                        return (
                            invoice.invoiceNo
                                ?.toLowerCase()
                                .includes(search)

                            ||

                            invoice.patientName
                                ?.toLowerCase()
                                .includes(search)

                            ||

                            invoice.patientId
                                ?.toLowerCase()
                                .includes(search)

                            ||

                            invoice.mobile
                                ?.toLowerCase()
                                .includes(search)
                        );
                    }
                );
        }


        /* ---------------------------------------------
           PAYMENT STATUS
        --------------------------------------------- */

        if (
            paymentStatus !==
            "ALL"
        ) {

            result =
                result.filter(
                    (invoice) =>
                        invoice.paymentStatus ===
                        paymentStatus
                );
        }


        /* ---------------------------------------------
           BILLING STATUS
        --------------------------------------------- */

        if (
            billingStatus !==
            "ALL"
        ) {

            result =
                result.filter(
                    (invoice) =>
                        invoice.billingStatus ===
                        billingStatus
                );
        }


        /* ---------------------------------------------
           DATE RANGE
        --------------------------------------------- */

        if (
            dateRange?.length === 2
        ) {

            const [
                startDate,
                endDate,
            ] = dateRange;

            result =
                result.filter(
                    (invoice) => {

                        if (
                            !invoice.invoiceDate
                        ) {
                            return false;
                        }

                        const invoiceDate =
                            new Date(
                                invoice.invoiceDate
                            );

                        if (
                            Number.isNaN(
                                invoiceDate.getTime()
                            )
                        ) {
                            return false;
                        }

                        return (
                            invoiceDate >=
                            startDate
                                .startOf("day")
                                .toDate()

                            &&

                            invoiceDate <=
                            endDate
                                .endOf("day")
                                .toDate()
                        );
                    }
                );
        }


        return result;

    }, [
        searchText,
        paymentStatus,
        billingStatus,
        dateRange,
    ]);


    /* =====================================================
       RESET PAGINATION WHEN FILTERS CHANGE
    ===================================================== */

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchText,
        paymentStatus,
        billingStatus,
        dateRange,
    ]);


    /* =====================================================
       LOCAL LOADING SIMULATION
       DEVELOPMENT ONLY
    ===================================================== */

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [
        searchText,
        paymentStatus,
        billingStatus,
        dateRange,
    ]);


    /* =====================================================
       PAGINATED INVOICES
    ===================================================== */

    const paginatedInvoices = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return filteredInvoices.slice(
            startIndex,
            endIndex
        );
    }, [
        filteredInvoices,
        currentPage,
        pageSize,
    ]);


    /* =====================================================
       PAGINATION HANDLER
    ===================================================== */

    const handlePaginationChange = (
        page,
        size
    ) => {
        setCurrentPage(page);

        if (size !== pageSize) {
            setPageSize(size);
            setCurrentPage(1);
        }
    };


    /* =====================================================
       SUMMARY VALUES
    ===================================================== */

    const totalInvoices =
        filteredInvoices.length;


    const completedInvoices =
        filteredInvoices.filter(
            (invoice) =>
                invoice.billingStatus ===
                "COMPLETED"
        ).length;


    const pendingInvoices =
        filteredInvoices.filter(
            (invoice) =>
                invoice.paymentStatus !==
                "PAID"
        ).length;


    const totalAmount =
        filteredInvoices.reduce(
            (
                sum,
                invoice
            ) =>
                sum +
                Number(
                    invoice.totalAmount ||
                    0
                ),
            0
        );


    /* =====================================================
       HISTORY → PREVIEW MODEL
    ===================================================== */

    const mapHistoryInvoiceToPreview = (
        invoice
    ) => {

        const subtotal =
            Number(
                invoice.subtotal ||
                0
            );


        const discountAmount =
            Number(
                invoice.discount ||
                0
            );


        const taxAmount =
            Number(
                invoice.tax ||
                0
            );


        const grandTotal =
            Number(
                invoice.totalAmount ||
                0
            );


        const paidAmount =
            Number(
                invoice.paidAmount ||
                0
            );


        const dueAmount =
            Number(
                invoice.dueAmount ||
                0
            );


        return {

            /* -----------------------------------------
               BASIC INVOICE INFORMATION
            ----------------------------------------- */

            id:
                invoice.id,

            invoiceNumber:
                invoice.invoiceNo,

            billNumber:
                invoice.invoiceNo,

            invoiceDate:
                invoice.invoiceDate,

            paymentStatus:
                invoice.paymentStatus,


            /* -----------------------------------------
               CENTER / PHARMACY
            ----------------------------------------- */

            center: {

                name:
                    "Hospital Pharmacy",

                addressLine1:
                    "Hospital Pharmacy",

                addressLine2:
                    "",

                city:
                    "",

                state:
                    "",

                postalCode:
                    "",

                phone:
                    "",

                gstin:
                    "",

                drugLicenseNumber:
                    "",
            },


            /* -----------------------------------------
               CUSTOMER
            ----------------------------------------- */

            customer: {

                name:
                    invoice.patientName ||
                    "Walk-in Customer",

                patientId:
                    invoice.patientId ||
                    "",

                mrn:
                    invoice.patientId ||
                    "",

                phone:
                    invoice.mobile ||
                    "",

                address:
                    "",
            },


            /* -----------------------------------------
               PRESCRIPTION
            ----------------------------------------- */

            prescription: {

                prescriptionNumber:
                    "",

                doctorName:
                    "",

                doctorRegistrationNumber:
                    "",
            },


            /* -----------------------------------------
               ITEMS

               History table currently contains only
               itemCount, not actual medicine details.

               Therefore create safe placeholder rows
               for invoice preview.
            ----------------------------------------- */

            items: Array.from(
                {
                    length:
                        Number(
                            invoice.itemCount ||
                            0
                        ),
                },
                (_, index) => ({

                    id:
                        `${invoice.id}-ITEM-${index + 1}`,

                    productName:
                        `Medicine ${index + 1}`,

                    genericName:
                        "",

                    batchNumber:
                        "",

                    expiryDate:
                        null,

                    quantity:
                        1,

                    mrp:
                        index === 0
                            ? subtotal
                            : 0,

                    discountAmount:
                        index === 0
                            ? discountAmount
                            : 0,

                    totalTax:
                        index === 0
                            ? taxAmount
                            : 0,

                    lineTotal:
                        index === 0
                            ? grandTotal
                            : 0,
                })
            ),


            /* -----------------------------------------
               TOTALS
            ----------------------------------------- */

            totals: {

                subtotal:
                    subtotal,

                discountAmount:
                    discountAmount,

                taxableAmount:
                    subtotal -
                    discountAmount,

                cgstAmount:
                    0,

                sgstAmount:
                    0,

                igstAmount:
                    0,

                taxAmount:
                    taxAmount,

                roundOff:
                    0,

                grandTotal:
                    grandTotal,

                paidAmount:
                    paidAmount,

                dueAmount:
                    dueAmount,

                changeAmount:
                    0,
            },


            /* -----------------------------------------
               PAYMENTS
            ----------------------------------------- */

            payments:
                paidAmount > 0
                    ? [
                        {
                            id:
                                `${invoice.id}-PAYMENT-1`,

                            method:
                                "CASH",

                            amount:
                                paidAmount,
                        },
                    ]
                    : [],
        };
    };


    /* =====================================================
       VIEW INVOICE
    ===================================================== */

    const handleViewInvoice = (
        invoice
    ) => {

        const previewInvoice =
            mapHistoryInvoiceToPreview(
                invoice
            );

        setSelectedInvoice(
            previewInvoice
        );

        setViewInvoiceOpen(
            true
        );
    };


    /* =====================================================
       CLOSE INVOICE
    ===================================================== */

    const handleCloseInvoice = () => {

        setViewInvoiceOpen(
            false
        );

        setSelectedInvoice(
            null
        );
    };


    /* =====================================================
       PRINT INVOICE
    ===================================================== */

    const handlePrintInvoice =
        useCallback(() => {

            if (!selectedInvoice) {
                return;
            }


            /* ---------------------------------------------
               GET PRINT AREA
            --------------------------------------------- */

            const printArea =
                document.getElementById(
                    "billing-invoice-print-area"
                );


            if (!printArea) {

                console.error(
                    "Invoice print area not found."
                );

                return;
            }


            /* ---------------------------------------------
               CREATE PRINT WINDOW
            --------------------------------------------- */

            const printWindow =
                window.open(
                    "",
                    "_blank",
                    "width=900,height=1200"
                );


            if (!printWindow) {

                window.alert(
                    "Please allow pop-ups to print the invoice."
                );

                return;
            }


            /* ---------------------------------------------
               COPY EXISTING STYLES
            --------------------------------------------- */

            const styles =
                Array.from(
                    document.querySelectorAll(
                        'link[rel="stylesheet"], style'
                    )
                )
                    .map(
                        (element) =>
                            element.outerHTML
                    )
                    .join("\n");


            /* ---------------------------------------------
               CREATE PRINT DOCUMENT
            --------------------------------------------- */

            printWindow.document.open();

            printWindow.document.write(`
                <!DOCTYPE html>

                <html>

                <head>

                    <meta charset="UTF-8" />

                    <title>
                        Invoice ${selectedInvoice.invoiceNumber ||
                ""
                }
                    </title>

                    ${styles}

                    <style>

                        @page {
                            size: A4 portrait;
                            margin: 12mm;
                        }

                        html,
                        body {
                            margin: 0;
                            padding: 0;
                            background: #ffffff;
                        }

                        body {
                            font-family:
                                Arial,
                                Helvetica,
                                sans-serif;

                            color: #000000;
                        }

                        #billing-invoice-print-area {
                            width: 100%;
                            max-width: none;
                            margin: 0;
                            padding: 0;
                            background: #ffffff;
                            box-shadow: none;
                            border: none;
                        }

                        .invoice-preview-card {
                            width: 100%;
                            max-width: none;
                            margin: 0;
                            padding: 0;
                            border: none;
                            box-shadow: none;
                        }

                        .invoice-section {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .invoice-payment-section {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .invoice-notes-section {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .invoice-footer {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        .invoice-items-table {
                            width: 100%;
                        }

                        .invoice-items-table thead {
                            display: table-header-group;
                        }

                        .invoice-items-table tr {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }

                        button,
                        .ant-btn {
                            display: none !important;
                        }

                        .ant-card {
                            border: none !important;
                            box-shadow: none !important;
                        }

                        .ant-typography {
                            color: #000000;
                        }

                        .ant-tag {
                            color: #000000 !important;
                            background: transparent !important;
                            border: 1px solid #000000 !important;
                        }

                    </style>

                </head>

                <body>

                    ${printArea.outerHTML}

                </body>

                </html>
            `);

            printWindow.document.close();


            /* ---------------------------------------------
               PRINT

               Small timeout is intentionally used instead
               of relying only on window.onload because the
               document is dynamically written.
            --------------------------------------------- */

            setTimeout(() => {

                try {

                    printWindow.focus();

                    printWindow.print();

                } finally {

                    setTimeout(() => {

                        printWindow.close();

                    }, 500);
                }

            }, 500);

        }, [
            selectedInvoice,
        ]);


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <>
            <div
                className="billing-history-page"
            >

                {/* =========================================
                    PAGE HEADER
                ========================================= */}

                <div
                    className="billing-history-header"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        marginBottom: 4,
                    }}
                >
                    <div>
                        <Title
                            level={3}
                            style={{
                                margin: 0,
                                fontSize: 24,
                                fontWeight: 600,
                                lineHeight: 1.3,
                            }}
                        >
                            Billing History
                        </Title>

                        <Text
                            type="secondary"
                            style={{
                                display: "block",
                                marginTop: 4,
                                fontSize: 14,
                            }}
                        >
                            View and manage previous pharmacy invoices
                        </Text>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <Text
                                type="secondary"
                                style={{
                                    fontSize: 12,
                                }}
                            >
                                Total Records
                            </Text>

                            <div
                                style={{
                                    marginTop: 2,
                                    fontSize: 20,
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                }}
                            >
                                {totalInvoices}
                            </div>
                        </div>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => {
                                navigate("/billing");
                            }}
                        >
                            New Billing
                        </Button>
                    </div>
                </div>


                {/* =========================================
                    SUMMARY CARDS
                ========================================= */}

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                    style={{
                        marginTop: 20,
                    }}
                    align="stretch"
                >

                    {/* TOTAL INVOICES */}

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card
                            style={{
                                height: "100%",
                                borderRadius: 10,
                            }}
                            styles={{
                                body: {
                                    padding: 20,
                                },
                            }}
                        >
                            <Statistic
                                title={
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >
                                        Total Invoices
                                    </Text>
                                }
                                value={totalInvoices}
                                prefix={
                                    <FileTextOutlined
                                        style={{
                                            fontSize: 20,
                                        }}
                                    />
                                }
                                valueStyle={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                }}
                            />
                        </Card>

                    </Col>


                    {/* COMPLETED */}

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card
                            style={{
                                height: "100%",
                                borderRadius: 10,
                            }}
                            styles={{
                                body: {
                                    padding: 20,
                                },
                            }}
                        >
                            <Statistic
                                title={
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >
                                        Completed
                                    </Text>
                                }
                                value={completedInvoices}
                                prefix={
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: 20,
                                        }}
                                    />
                                }
                                valueStyle={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                }}
                            />
                        </Card>

                    </Col>


                    {/* PENDING */}

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card
                            style={{
                                height: "100%",
                                borderRadius: 10,
                            }}
                            styles={{
                                body: {
                                    padding: 20,
                                },
                            }}
                        >
                            <Statistic
                                title={
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >
                                        Pending
                                    </Text>
                                }
                                value={pendingInvoices}
                                prefix={
                                    <ClockCircleOutlined
                                        style={{
                                            fontSize: 20,
                                        }}
                                    />
                                }
                                valueStyle={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                }}
                            />
                        </Card>

                    </Col>


                    {/* TOTAL AMOUNT */}

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card
                            style={{
                                height: "100%",
                                borderRadius: 10,
                            }}
                            styles={{
                                body: {
                                    padding: 20,
                                },
                            }}
                        >
                            <Statistic
                                title={
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >
                                        Total Amount
                                    </Text>
                                }
                                value={totalAmount}
                                prefix={
                                    <DollarOutlined
                                        style={{
                                            fontSize: 20,
                                        }}
                                    />
                                }
                                precision={2}
                                valueStyle={{
                                    fontSize: 26,
                                    fontWeight: 600,
                                }}
                                formatter={(value) =>
                                    `₹${Number(
                                        value || 0
                                    ).toLocaleString(
                                        "en-IN",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }
                                    )}`
                                }
                            />
                        </Card>

                    </Col>

                </Row>


                {/* =========================================
                    SEARCH & FILTERS
                ========================================= */}

                <Card
                    title={
                        <div>
                            <Text
                                strong
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Search & Filters
                            </Text>

                            <Text
                                type="secondary"
                                style={{
                                    display: "block",
                                    marginTop: 2,
                                    fontSize: 12,
                                    fontWeight: 400,
                                }}
                            >
                                Find invoices using patient, payment,
                                billing status or date
                            </Text>
                        </div>
                    }
                    style={{
                        marginTop: 20,
                        borderRadius: 10,
                    }}
                    styles={{
                        body: {
                            padding: 20,
                        },
                    }}
                >

                    <Row
                        gutter={[
                            16,
                            16,
                        ]}
                        align="middle"
                    >

                        {/* SEARCH */}

                        <Col
                            xs={24}
                            sm={24}
                            md={10}
                            lg={8}
                            xl={8}
                        >

                            <Input
                                allowClear
                                size="large"
                                placeholder="Search invoice, patient, ID or mobile"
                                prefix={
                                    <SearchOutlined
                                        style={{
                                            color: "#8c8c8c",
                                        }}
                                    />
                                }
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(
                                        event.target.value
                                    )
                                }
                                style={{
                                    borderRadius: 8,
                                }}
                            />

                        </Col>


                        {/* PAYMENT STATUS */}

                        <Col
                            xs={24}
                            sm={12}
                            md={5}
                            lg={4}
                            xl={4}
                        >

                            <Select
                                size="large"
                                style={{
                                    width: "100%",
                                    borderRadius: 8,
                                }}
                                value={paymentStatus}
                                onChange={setPaymentStatus}
                                options={[
                                    {
                                        label: "All Payments",
                                        value: "ALL",
                                    },
                                    {
                                        label: "Paid",
                                        value: "PAID",
                                    },
                                    {
                                        label: "Partial",
                                        value: "PARTIAL",
                                    },
                                    {
                                        label: "Unpaid",
                                        value: "UNPAID",
                                    },
                                ]}
                            />

                        </Col>


                        {/* BILLING STATUS */}

                        <Col
                            xs={24}
                            sm={12}
                            md={5}
                            lg={4}
                            xl={4}
                        >

                            <Select
                                size="large"
                                style={{
                                    width: "100%",
                                    borderRadius: 8,
                                }}
                                value={billingStatus}
                                onChange={setBillingStatus}
                                options={[
                                    {
                                        label: "All Billing",
                                        value: "ALL",
                                    },
                                    {
                                        label: "Completed",
                                        value: "COMPLETED",
                                    },
                                    {
                                        label: "Draft",
                                        value: "DRAFT",
                                    },
                                    {
                                        label: "Cancelled",
                                        value: "CANCELLED",
                                    },
                                ]}
                            />

                        </Col>


                        {/* DATE RANGE */}

                        <Col
                            xs={24}
                            sm={24}
                            md={4}
                            lg={8}
                            xl={8}
                        >

                            <RangePicker
                                size="large"
                                style={{
                                    width: "100%",
                                    borderRadius: 8,
                                }}
                                value={dateRange}
                                onChange={setDateRange}
                                format="DD MMM YYYY"
                                placeholder={[
                                    "Start date",
                                    "End date",
                                ]}
                            />

                        </Col>

                    </Row>

                </Card>





                {/* =========================================
    INVOICE HISTORY
========================================= */}



                <Card
                    title={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 16,
                                width: "100%",
                            }}
                        >
                            <div>
                                <Text
                                    strong
                                    style={{
                                        display: "block",
                                        fontSize: 16,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    Invoice History
                                </Text>

                                <Text
                                    type="secondary"
                                    style={{
                                        display: "block",
                                        marginTop: 2,
                                        fontSize: 12,
                                        fontWeight: 400,
                                    }}
                                >
                                    {filteredInvoices.length === 0
                                        ? "No invoices available"
                                        : `Showing ${filteredInvoices.length} ${filteredInvoices.length === 1
                                            ? "invoice"
                                            : "invoices"
                                        }`}
                                </Text>
                            </div>

                            <div
                                style={{
                                    flexShrink: 0,
                                    textAlign: "right",
                                }}
                            >
                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: 12,
                                    }}
                                >
                                    Total
                                </Text>

                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {filteredInvoices.length}
                                </div>
                            </div>
                        </div>
                    }
                    style={{
                        marginTop: 20,
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                    styles={{
                        body: {
                            padding: 0,
                        },
                    }}
                >
                    {loading ? (
                        <div
                            style={{
                                minHeight: 280,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 32,
                            }}
                        >
                            <Space
                                direction="vertical"
                                align="center"
                                size={10}
                            >
                                <Spin size="large" />

                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: 13,
                                    }}
                                >
                                    Loading invoices...
                                </Text>
                            </Space>
                        </div>
                    ) : filteredInvoices.length === 0 ? (
                        <div
                            style={{
                                minHeight: 280,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 32,
                            }}
                        >
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 70,
                                }}
                                description={
                                    <Space
                                        direction="vertical"
                                        size={4}
                                        align="center"
                                    >
                                        <Text
                                            strong
                                            style={{
                                                fontSize: 14,
                                            }}
                                        >
                                            No invoices found
                                        </Text>

                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: 13,
                                            }}
                                        >
                                            Try changing your search or filter criteria.
                                        </Text>
                                    </Space>
                                }
                            />
                        </div>
                    ) : (
                        <>
                            <InvoiceHistoryTable
                                data={paginatedInvoices}
                                loading={false}
                                onView={handleViewInvoice}
                            />

                            <div
                                style={{
                                    padding: "16px 20px",
                                    borderTop: "1px solid #f0f0f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    background: "#ffffff",
                                }}
                            >
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={filteredInvoices.length}
                                    showSizeChanger
                                    showQuickJumper
                                    pageSizeOptions={[
                                        "10",
                                        "20",
                                        "50",
                                    ]}
                                    onChange={handlePaginationChange}
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} of ${total} invoices`
                                    }
                                />
                            </div>
                        </>
                    )}
                </Card>


                {/* =============================================
                VIEW INVOICE MODAL
            ============================================= */}

                <Modal
                    open={
                        viewInvoiceOpen
                    }
                    onCancel={
                        handleCloseInvoice
                    }
                    footer={
                        selectedInvoice
                            ? (
                                <Space>
                                    <Button
                                        onClick={
                                            handleCloseInvoice
                                        }
                                    >
                                        Close
                                    </Button>

                                    <Button
                                        type="primary"
                                        icon={
                                            <PrinterOutlined />
                                        }
                                        onClick={
                                            handlePrintInvoice
                                        }
                                    >
                                        Print Invoice
                                    </Button>
                                </Space>
                            )
                            : null
                    }
                    width={950}
                    centered
                    destroyOnClose
                    title={
                        selectedInvoice
                            ? `Invoice ${selectedInvoice.invoiceNumber}`
                            : "Invoice Preview"
                    }
                    styles={{
                        body: {
                            padding: 16,
                            maxHeight:
                                "75vh",
                            overflowY:
                                "auto",
                        },
                    }}
                >

                    {
                        selectedInvoice && (

                            /*
                             * IMPORTANT:
                             * This ID is used by handlePrintInvoice().
                             *
                             * Print button is intentionally NOT inside
                             * this wrapper, so it will never appear
                             * on the printed invoice.
                             */

                            <div
                                id="billing-invoice-print-area"
                            >
                                <InvoicePreview
                                    invoice={selectedInvoice}
                                    showHeader
                                    showPayments
                                    showNotes
                                />
                            </div>

                        )
                    }

                </Modal>

            </div>
        </>
    );
};


export default BillingHistoryPage;