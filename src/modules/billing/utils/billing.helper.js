// src/modules/billing/utils/billing.helper.js

import {
    BILL_STATUS,
    BILL_STATUS_LABELS,
    BILL_STATUS_COLORS,
    PAYMENT_STATUS,
    PAYMENT_STATUS_LABELS,
    PAYMENT_STATUS_COLORS,
    PAYMENT_METHOD,
    PAYMENT_METHOD_LABELS,
    BILLING_DEFAULTS,
} from "../constants/billing.constants";


/* =========================================================
   NUMBER HELPERS
   ========================================================= */

export const toNumber = (
    value,
    fallback = 0
) => {

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
};


export const roundAmount = (
    value,
    decimals = 2
) => {

    const number =
        toNumber(value);

    const factor =
        10 ** decimals;

    return (
        Math.round(
            (number + Number.EPSILON) *
            factor
        ) /
        factor
    );

};


/* =========================================================
   CURRENCY
   ========================================================= */

export const formatCurrency = (
    value,
    currency =
        BILLING_DEFAULTS.CURRENCY
) => {

    const amount =
        roundAmount(value);

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    ).format(amount);

};


/* =========================================================
   DATE
   ========================================================= */

export const formatBillingDate = (
    value
) => {

    if (!value) {
        return "";
    }


    const date =
        value instanceof Date
            ? value
            : new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }
    ).format(date);

};


/* =========================================================
   STATUS HELPERS
   ========================================================= */

export const getBillStatusLabel = (
    status
) => {

    return (
        BILL_STATUS_LABELS?.[status] ||
        status ||
        "-"
    );

};


export const getBillStatusColor = (
    status
) => {

    return (
        BILL_STATUS_COLORS?.[status] ||
        "default"
    );

};


export const getPaymentStatusLabel = (
    status
) => {

    return (
        PAYMENT_STATUS_LABELS?.[status] ||
        status ||
        "-"
    );

};


export const getPaymentStatusColor = (
    status
) => {

    return (
        PAYMENT_STATUS_COLORS?.[status] ||
        "default"
    );

};


export const getPaymentMethodLabel = (
    method
) => {

    return (
        PAYMENT_METHOD_LABELS?.[method] ||
        method ||
        "-"
    );

};


/* =========================================================
   BILL NUMBER
   ========================================================= */

export const formatInvoiceNumber = (
    invoiceNumber
) => {

    if (
        invoiceNumber === null ||
        invoiceNumber === undefined
    ) {

        return "";

    }


    return String(
        invoiceNumber
    ).trim();

};


/* =========================================================
   ARRAY HELPERS
   ========================================================= */

export const safeArray = (
    value
) => {

    return Array.isArray(value)
        ? value
        : [];

};


/* =========================================================
   BILL ITEM NORMALIZATION
   ========================================================= */

export const normalizeBillItem = (
    item = {}
) => {

    const safeItem =
        item &&
        typeof item === "object"
            ? item
            : {};


    return {

        id:
            safeItem.id ||
            null,

        medicineId:
            safeItem.medicineId ||
            safeItem.drugId ||
            null,

        itemCode:
            safeItem.itemCode ||
            safeItem.sku ||
            "",

        itemName:
            safeItem.itemName ||
            safeItem.medicineName ||
            safeItem.drugName ||
            "",

        batchId:
            safeItem.batchId ||
            null,

        batchNumber:
            safeItem.batchNumber ||
            "",

        expiryDate:
            safeItem.expiryDate ||
            null,

        availableQuantity:
            toNumber(
                safeItem.availableQuantity
            ),

        quantity:
            toNumber(
                safeItem.quantity
            ),

        freeQuantity:
            toNumber(
                safeItem.freeQuantity
            ),

        mrp:
            toNumber(
                safeItem.mrp
            ),

        unitRate:
            toNumber(
                safeItem.unitRate
            ),

        discountType:
            safeItem.discountType ||
            "PERCENTAGE",

        discountValue:
            toNumber(
                safeItem.discountValue
            ),

        taxPercent:
            toNumber(
                safeItem.taxPercent
            ),

        taxAmount:
            toNumber(
                safeItem.taxAmount
            ),

        discountAmount:
            toNumber(
                safeItem.discountAmount
            ),

        taxableAmount:
            toNumber(
                safeItem.taxableAmount
            ),

        lineTotal:
            toNumber(
                safeItem.lineTotal
            ),

        remarks:
            safeItem.remarks ||
            "",

    };

};


/* =========================================================
   BILL NORMALIZATION
   ========================================================= */

export const normalizeBill = (
    bill = {}
) => {

    const safeBill =
        bill &&
        typeof bill === "object"
            ? bill
            : {};


    return {

        ...safeBill,

        id:
            safeBill.id ||
            null,

        billNumber:
            safeBill.billNumber ||
            "",

        invoiceNumber:
            safeBill.invoiceNumber ||
            "",

        status:
            safeBill.status ||
            BILL_STATUS.DRAFT,

        paymentStatus:
            safeBill.paymentStatus ||
            PAYMENT_STATUS.PENDING,

        billType:
            safeBill.billType ||
            "RETAIL",

        currency:
            safeBill.currency ||
            BILLING_DEFAULTS.CURRENCY,

        patientId:
            safeBill.patientId ||
            null,

        patientName:
            safeBill.patientName ||
            "",

        patientUHID:
            safeBill.patientUHID ||
            "",

        doctorId:
            safeBill.doctorId ||
            null,

        doctorName:
            safeBill.doctorName ||
            "",

        items:
            safeArray(
                safeBill.items
            ).map(
                normalizeBillItem
            ),

        payments:
            safeArray(
                safeBill.payments
            ),

        subtotal:
            toNumber(
                safeBill.subtotal
            ),

        discountAmount:
            toNumber(
                safeBill.discountAmount
            ),

        taxAmount:
            toNumber(
                safeBill.taxAmount
            ),

        roundOff:
            toNumber(
                safeBill.roundOff
            ),

        grandTotal:
            toNumber(
                safeBill.grandTotal
            ),

        paidAmount:
            toNumber(
                safeBill.paidAmount
            ),

        dueAmount:
            toNumber(
                safeBill.dueAmount
            ),

    };

};


/* =========================================================
   PAYMENT TOTAL
   ========================================================= */

export const getPaymentTotal = (
    payments
) => {

    return safeArray(
        payments
    ).reduce(
        (
            total,
            payment
        ) =>
            total +
            toNumber(
                payment?.amount
            ),
        0
    );

};


/* =========================================================
   PAYMENT METHOD CHECK
   ========================================================= */

export const isCashPayment = (
    method
) => {

    return method ===
        PAYMENT_METHOD.CASH;

};


export const isCreditPayment = (
    method
) => {

    return method ===
        PAYMENT_METHOD.CREDIT;

};


/* =========================================================
   EMPTY BILL
   ========================================================= */

export const createEmptyBill = () => {

    return {

        billNumber:
            "",

        invoiceNumber:
            "",

        status:
            BILL_STATUS.DRAFT,

        paymentStatus:
            PAYMENT_STATUS.PENDING,

        billType:
            "RETAIL",

        currency:
            BILLING_DEFAULTS.CURRENCY,

        patientId:
            null,

        patientName:
            "",

        patientUHID:
            "",

        doctorId:
            null,

        doctorName:
            "",

        items:
            [],

        payments:
            [],

        subtotal:
            0,

        discountAmount:
            0,

        taxAmount:
            0,

        roundOff:
            0,

        grandTotal:
            0,

        paidAmount:
            0,

        dueAmount:
            0,

    };

};