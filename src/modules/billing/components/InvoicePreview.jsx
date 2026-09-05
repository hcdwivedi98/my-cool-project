// src/modules/billing/components/InvoicePreview.jsx

import React from "react";

import {
    Card,
    Divider,
    Space,
    Table,
    Tag,
    Typography,
    List,
} from "antd";

import {
    PAYMENT_STATUS,
} from "../models/invoice.model";

import {
    formatCurrency,
} from "../utils/billing.helper";

import "../styles/invoice-print.css";


const {
    Text,
    Title,
} = Typography;


/* =========================================================
   PAYMENT METHOD LABELS
   ========================================================= */

const PAYMENT_METHOD_LABELS = {

    CASH:
        "Cash",

    UPI:
        "UPI",

    CARD:
        "Card",

    CREDIT:
        "Credit",

};


/* =========================================================
   STATUS LABELS
   ========================================================= */

const PAYMENT_STATUS_LABELS = {

    [PAYMENT_STATUS.UNPAID]:
        "Unpaid",

    [PAYMENT_STATUS.PARTIALLY_PAID]:
        "Partially Paid",

    [PAYMENT_STATUS.PAID]:
        "Paid",

    [PAYMENT_STATUS.OVERPAID]:
        "Overpaid",

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
        new Date(
            value
        );


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
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric",
        }
    );

};


/* =========================================================
   COMPONENT
   ========================================================= */

const InvoicePreview = ({
    invoice,

    showHeader = true,

    showPayments = true,

    showNotes = true,
    
}) => {

    /* =====================================================
       EMPTY INVOICE
       ===================================================== */

    if (!invoice) {

        return null;

    }


    /* =====================================================
       SAFE DATA
       ===================================================== */

    const center =
        invoice.center ||
        {};


    const customer =
        invoice.customer ||
        {};


    const prescription =
        invoice.prescription ||
        {};


    const totals =
        invoice.totals ||
        {};


    const items =
        Array.isArray(
            invoice.items
        )
            ? invoice.items
            : [];


    const payments =
        Array.isArray(
            invoice.payments
        )
            ? invoice.payments
            : [];


    /* =====================================================
       TABLE COLUMNS
       ===================================================== */

    const columns = [

        /* -------------------------------------------------
           SERIAL NUMBER
           ------------------------------------------------- */

        {
            title:
                "#",

            key:
                "serial",

            width:
                32,

            render:
                (_, __, index) =>
                    index + 1,
        },


        /* -------------------------------------------------
           MEDICINE
           ------------------------------------------------- */

        {
            title:
                "Medicine",

            key:
                "medicine",

            width:
                175,

            render:
                (_, item) => (

                    <Space
                        direction="vertical"
                        size={0}
                    >

                        <Text strong>
                            {
                                item.productName ||
                                "-"
                            }
                        </Text>


                        {
                            item.genericName && (

                                <Text
                                    type="secondary"
                                >
                                    {
                                        item.genericName
                                    }
                                </Text>

                            )
                        }

                    </Space>

                ),
        },


        /* -------------------------------------------------
           BATCH
           ------------------------------------------------- */

        {
            title:
                "Batch",

            dataIndex:
                "batchNumber",

            key:
                "batchNumber",

            width:
                70,

            render:
                value =>
                    value ||
                    "-",
        },


        /* -------------------------------------------------
           EXPIRY
           ------------------------------------------------- */

        {
            title:
                "Expiry",

            dataIndex:
                "expiryDate",

            key:
                "expiryDate",

            width:
                62,

            render:
                value =>
                    formatDate(
                        value
                    ),
        },


        /* -------------------------------------------------
           QUANTITY
           ------------------------------------------------- */

        {
            title:
                "Qty",

            dataIndex:
                "quantity",

            key:
                "quantity",

            width:
                42,

            align:
                "right",

            render:
                value =>
                    Number(
                        value
                    ) || 0,
        },


        /* -------------------------------------------------
           MRP
           ------------------------------------------------- */

        {
            title:
                "MRP",

            dataIndex:
                "mrp",

            key:
                "mrp",

            width:
                65,

            align:
                "right",

            render:
                value =>
                    formatCurrency(
                        value
                    ),
        },


        /* -------------------------------------------------
           DISCOUNT
           ------------------------------------------------- */

        {
            title:
                "Discount",

            dataIndex:
                "discountAmount",

            key:
                "discountAmount",

            width:
                68,

            align:
                "right",

            render:
                value =>
                    formatCurrency(
                        value
                    ),
        },


        /* -------------------------------------------------
           TAX
           ------------------------------------------------- */

        {
            title:
                "Tax",

            dataIndex:
                "totalTax",

            key:
                "totalTax",

            width:
                58,

            align:
                "right",

            render:
                value =>
                    formatCurrency(
                        value
                    ),
        },


        /* -------------------------------------------------
           AMOUNT
           ------------------------------------------------- */

        {
            title:
                "Amount",

            dataIndex:
                "lineTotal",

            key:
                "lineTotal",

            width:
                82,

            align:
                "right",

            render:
                value => (

                    <Text strong>

                        {
                            formatCurrency(
                                value
                            )
                        }

                    </Text>

                ),
        },

    ];


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div
            id="billing-invoice-print-area"
            className="billing-invoice-print-area"
        >

            <Card
                className="billing-invoice-preview"
                bordered={false}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                {
                    showHeader && (

                        <>

                            <div
                                className="invoice-header invoice-section"
                            >

                                <div
                                    className="invoice-header-left"
                                >

                                    <Title
                                        level={3}
                                        style={{
                                            margin:
                                                0,
                                        }}
                                    >

                                        {
                                            center.name ||
                                            "Pharmacy"
                                        }

                                    </Title>


                                    {
                                        center.addressLine1 && (

                                            <Text>
                                                {
                                                    center.addressLine1
                                                }
                                            </Text>

                                        )
                                    }


                                    {
                                        center.addressLine2 && (

                                            <div>

                                                <Text>
                                                    {
                                                        center.addressLine2
                                                    }
                                                </Text>

                                            </div>

                                        )
                                    }


                                    <div>

                                        <Text>

                                            {
                                                [
                                                    center.city,
                                                    center.state,
                                                    center.postalCode,
                                                ]
                                                    .filter(
                                                        Boolean
                                                    )
                                                    .join(
                                                        ", "
                                                    )
                                            }

                                        </Text>

                                    </div>


                                    {
                                        center.phone && (

                                            <div>

                                                <Text>
                                                    Phone:{" "}
                                                    {
                                                        center.phone
                                                    }
                                                </Text>

                                            </div>

                                        )
                                    }


                                    {
                                        center.gstin && (

                                            <div>

                                                <Text>
                                                    GSTIN:{" "}
                                                    {
                                                        center.gstin
                                                    }
                                                </Text>

                                            </div>

                                        )
                                    }


                                    {
                                        center.drugLicenseNumber && (

                                            <div>

                                                <Text>
                                                    Drug License:{" "}
                                                    {
                                                        center.drugLicenseNumber
                                                    }
                                                </Text>

                                            </div>

                                        )
                                    }

                                </div>


                                <div
                                    className="invoice-header-right"
                                    style={{
                                        textAlign:
                                            "right",
                                    }}
                                >

                                    <Title
                                        level={4}
                                        style={{
                                            margin:
                                                0,
                                        }}
                                    >
                                        TAX INVOICE
                                    </Title>


                                    <div>

                                        <Text strong>
                                            Invoice No:{" "}
                                        </Text>

                                        <Text>
                                            {
                                                invoice.invoiceNumber ||
                                                "-"
                                            }
                                        </Text>

                                    </div>


                                    <div>

                                        <Text strong>
                                            Date:{" "}
                                        </Text>

                                        <Text>
                                            {
                                                formatDate(
                                                    invoice.invoiceDate
                                                )
                                            }
                                        </Text>

                                    </div>


                                    {
                                        invoice.dueDate && (

                                            <div>

                                                <Text strong>
                                                    Due Date:{" "}
                                                </Text>

                                                <Text>
                                                    {
                                                        formatDate(
                                                            invoice.dueDate
                                                        )
                                                    }
                                                </Text>

                                            </div>

                                        )
                                    }


                                    {
                                        invoice.paymentStatus && (

                                            <div
                                                style={{
                                                    marginTop:
                                                        8,
                                                }}
                                            >

                                                <Tag>

                                                    {
                                                        PAYMENT_STATUS_LABELS[
                                                            invoice.paymentStatus
                                                        ] ||
                                                        invoice.paymentStatus
                                                    }

                                                </Tag>

                                            </div>

                                        )
                                    }

                                </div>

                            </div>


                            <Divider />

                        </>

                    )
                }


                {/* =================================================
                    CUSTOMER
                ================================================= */}

                <div
                    className="invoice-customer-section invoice-section"
                >

                    <div>

                        <Text strong>
                            Bill To
                        </Text>


                        <div>

                            <Text>
                                {
                                    customer.name ||
                                    "-"
                                }
                            </Text>

                        </div>


                        {
                            customer.patientId && (

                                <div>

                                    <Text>
                                        Patient ID:{" "}
                                        {
                                            customer.patientId
                                        }
                                    </Text>

                                </div>

                            )
                        }


                        {
                            customer.mrn && (

                                <div>

                                    <Text>
                                        MRN:{" "}
                                        {
                                            customer.mrn
                                        }
                                    </Text>

                                </div>

                            )
                        }


                        {
                            customer.phone && (

                                <div>

                                    <Text>
                                        Phone:{" "}
                                        {
                                            customer.phone
                                        }
                                    </Text>

                                </div>

                            )
                        }


                        {
                            customer.address && (

                                <div>

                                    <Text>
                                        {
                                            customer.address
                                        }
                                    </Text>

                                </div>

                            )
                        }

                    </div>


                    <div>

                        <Text strong>
                            Prescription
                        </Text>


                        {
                            prescription.prescriptionNumber
                                ? (

                                    <div>

                                        <Text>
                                            No:{" "}
                                            {
                                                prescription.prescriptionNumber
                                            }
                                        </Text>

                                    </div>

                                )
                                : (

                                    <div>

                                        <Text>
                                            -
                                        </Text>

                                    </div>

                                )
                        }


                        {
                            prescription.doctorName && (

                                <div>

                                    <Text>
                                        Doctor:{" "}
                                        {
                                            prescription.doctorName
                                        }
                                    </Text>

                                </div>

                            )
                        }


                        {
                            prescription.doctorRegistrationNumber && (

                                <div>

                                    <Text>
                                        Reg. No:{" "}
                                        {
                                            prescription.doctorRegistrationNumber
                                        }
                                    </Text>

                                </div>

                            )
                        }

                    </div>

                </div>


                <Divider />


                {/* =================================================
                    ITEMS
                ================================================= */}

                <Table
                    className="invoice-items-table"
                    columns={
                        columns
                    }
                    dataSource={
                        items
                    }
                    rowKey={
                        item =>
                            item.id ||
                            `${item.productId}-${item.batchNumber}`
                    }
                    pagination={
                        false
                    }
                    size="small"
                />


                {/* =================================================
                    TOTALS
                ================================================= */}

                <div
                    className="invoice-totals"
                    style={{
                        marginTop:
                            20,

                        marginLeft:
                            "auto",

                        width:
                            350,
                    }}
                >

                    <div
                        className="billing-summary-row"
                    >

                        <Text>
                            Subtotal
                        </Text>

                        <Text>
                            {
                                formatCurrency(
                                    totals.subtotal
                                )
                            }
                        </Text>

                    </div>


                    <div
                        className="billing-summary-row"
                    >

                        <Text>
                            Discount
                        </Text>

                        <Text>
                            {
                                formatCurrency(
                                    totals.discountAmount
                                )
                            }
                        </Text>

                    </div>


                    <div
                        className="billing-summary-row"
                    >

                        <Text>
                            Taxable Amount
                        </Text>

                        <Text>
                            {
                                formatCurrency(
                                    totals.taxableAmount
                                )
                            }
                        </Text>

                    </div>


                    {
                        Number(
                            totals.cgstAmount
                        ) > 0 && (

                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    CGST
                                </Text>

                                <Text>
                                    {
                                        formatCurrency(
                                            totals.cgstAmount
                                        )
                                    }
                                </Text>

                            </div>

                        )
                    }


                    {
                        Number(
                            totals.sgstAmount
                        ) > 0 && (

                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    SGST
                                </Text>

                                <Text>
                                    {
                                        formatCurrency(
                                            totals.sgstAmount
                                        )
                                    }
                                </Text>

                            </div>

                        )
                    }


                    {
                        Number(
                            totals.igstAmount
                        ) > 0 && (

                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    IGST
                                </Text>

                                <Text>
                                    {
                                        formatCurrency(
                                            totals.igstAmount
                                        )
                                    }
                                </Text>

                            </div>

                        )
                    }


                    <div
                        className="billing-summary-row"
                    >

                        <Text>
                            Round Off
                        </Text>

                        <Text>
                            {
                                formatCurrency(
                                    totals.roundOff
                                )
                            }
                        </Text>

                    </div>


                    <Divider
                        style={{
                            margin:
                                "8px 0",
                        }}
                    />


                    <div
                        className="billing-summary-row"
                    >

                        <Text strong>
                            Grand Total
                        </Text>

                        <Text
                            strong
                            style={{
                                fontSize:
                                    18,
                            }}
                        >

                            {
                                formatCurrency(
                                    totals.grandTotal
                                )
                            }

                        </Text>

                    </div>

                </div>


                {/* =================================================
                    PAYMENTS
                ================================================= */}

                {
                    showPayments &&
                    payments.length > 0 && (

                        <div
                            className="invoice-payment-section"
                        >

                            <Divider />

                            <Typography.Title
                                level={5}
                            >
                                Payments
                            </Typography.Title>


                            <List
                                size="small"
                                dataSource={
                                    payments
                                }
                                renderItem={
                                    payment => (

                                        <List.Item>

                                            <Space
                                                style={{
                                                    width:
                                                        "100%",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >

                                                <Space>

                                                    <Tag>
                                                        {
                                                            PAYMENT_METHOD_LABELS[
                                                                payment.method
                                                            ] ||
                                                            payment.method ||
                                                            "-"
                                                        }
                                                    </Tag>


                                                    {
                                                        payment.referenceNumber && (

                                                            <Text type="secondary">

                                                                Ref:{" "}
                                                                {
                                                                    payment.referenceNumber
                                                                }

                                                            </Text>

                                                        )
                                                    }

                                                </Space>


                                                <Space>

                                                    <Text strong>

                                                        {
                                                            formatCurrency(
                                                                payment.amount
                                                            )
                                                        }

                                                    </Text>


                                                    {
                                                        payment.status && (

                                                            <Tag>

                                                                {
                                                                    PAYMENT_STATUS_LABELS[
                                                                        payment.status
                                                                    ] ||
                                                                    payment.status
                                                                }

                                                            </Tag>

                                                        )
                                                    }

                                                </Space>

                                            </Space>

                                        </List.Item>

                                    )
                                }
                            />


                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    Paid
                                </Text>

                                <Text strong>
                                    {
                                        formatCurrency(
                                            totals.paidAmount
                                        )
                                    }
                                </Text>

                            </div>


                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    Due
                                </Text>

                                <Text strong>
                                    {
                                        formatCurrency(
                                            totals.dueAmount
                                        )
                                    }
                                </Text>

                            </div>


                            <div
                                className="billing-summary-row"
                            >

                                <Text>
                                    Change
                                </Text>

                                <Text strong>
                                    {
                                        formatCurrency(
                                            totals.changeAmount
                                        )
                                    }
                                </Text>

                            </div>

                        </div>

                    )
                }


                {/* =================================================
                    NOTES
                ================================================= */}

                {
                    showNotes &&
                    (
                        invoice.notes ||
                        invoice.termsAndConditions
                    ) && (

                        <div
                            className="invoice-notes-section"
                        >

                            <Divider />


                            {
                                invoice.notes && (

                                    <div>

                                        <Text strong>
                                            Notes
                                        </Text>


                                        <div>

                                            <Text>
                                                {
                                                    invoice.notes
                                                }
                                            </Text>

                                        </div>

                                    </div>

                                )
                            }


                            {
                                invoice.termsAndConditions && (

                                    <div
                                        style={{
                                            marginTop:
                                                12,
                                        }}
                                    >

                                        <Text strong>
                                            Terms & Conditions
                                        </Text>


                                        <div>

                                            <Text
                                                type="secondary"
                                            >

                                                {
                                                    invoice.termsAndConditions
                                                }

                                            </Text>

                                        </div>

                                    </div>

                                )
                            }

                        </div>

                    )
                }


                {/* =================================================
                    FOOTER
                ================================================= */}

                <Divider />


                <div
                    className="invoice-footer"
                    style={{
                        textAlign:
                            "center",
                    }}
                >

                    <Text
                        type="secondary"
                    >
                        Thank you for your business.
                    </Text>

                </div>

            </Card>

        </div>

    );

};


export default InvoicePreview;