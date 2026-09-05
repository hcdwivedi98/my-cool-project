
// src/modules/billing/models/invoice.model.js

/* =========================================================
   INVOICE STATUS
   ========================================================= */

export const INVOICE_STATUS = {
    DRAFT: "DRAFT",
    ISSUED: "ISSUED",
    PAID: "PAID",
    PARTIALLY_PAID: "PARTIALLY_PAID",
    CANCELLED: "CANCELLED",
    REFUNDED: "REFUNDED",
};


/* =========================================================
   INVOICE TYPE
   ========================================================= */

export const INVOICE_TYPE = {
    PHARMACY_SALE: "PHARMACY_SALE",
    RETURN: "RETURN",
    CREDIT: "CREDIT",
};


/* =========================================================
   CUSTOMER TYPE
   ========================================================= */

export const CUSTOMER_TYPE = {
    WALK_IN: "WALK_IN",
    PATIENT: "PATIENT",
    CUSTOMER: "CUSTOMER",
    CORPORATE: "CORPORATE",
};


/* =========================================================
   PAYMENT STATUS
   ========================================================= */

export const PAYMENT_STATUS = {
    UNPAID: "UNPAID",
    PARTIALLY_PAID: "PARTIALLY_PAID",
    PAID: "PAID",
    OVERPAID: "OVERPAID",
};


/* =========================================================
   CREATE EMPTY INVOICE
   ========================================================= */

export const createEmptyInvoice = () => ({
    id: null,

    invoiceNumber: "",

    invoiceType:
        INVOICE_TYPE.PHARMACY_SALE,

    status:
        INVOICE_STATUS.DRAFT,

    paymentStatus:
        PAYMENT_STATUS.UNPAID,

    invoiceDate:
        null,

    dueDate:
        null,


    /* =====================================================
       CENTER / PHARMACY
       ===================================================== */

    center: {
        id: null,

        code: "",

        name: "",

        addressLine1: "",

        addressLine2: "",

        city: "",

        state: "",

        postalCode: "",

        country: "India",

        phone: "",

        email: "",

        gstin: "",

        drugLicenseNumber: "",
    },


    /* =====================================================
       CUSTOMER / PATIENT
       ===================================================== */

    customer: {
        type:
            CUSTOMER_TYPE.WALK_IN,

        id: null,

        patientId: "",

        mrn: "",

        name: "Walk-in Customer",

        phone: "",

        email: "",

        address: "",

        gstin: "",
    },


    /* =====================================================
       PRESCRIPTION
       ===================================================== */

    prescription: {
        id: null,

        prescriptionNumber: "",

        doctorName: "",

        doctorRegistrationNumber: "",

        prescriptionDate: null,
    },


    /* =====================================================
       ITEMS
       ===================================================== */

    items: [],


    /* =====================================================
       AMOUNTS
       ===================================================== */

    totals: {
        subtotal: 0,

        discountAmount: 0,

        taxableAmount: 0,

        cgstAmount: 0,

        sgstAmount: 0,

        igstAmount: 0,

        taxAmount: 0,

        roundOff: 0,

        grandTotal: 0,

        paidAmount: 0,

        dueAmount: 0,

        changeAmount: 0,
    },


    /* =====================================================
       PAYMENTS
       ===================================================== */

    payments: [],


    /* =====================================================
       NOTES
       ===================================================== */

    notes: "",

    termsAndConditions: "",


    /* =====================================================
       AUDIT
       ===================================================== */

    createdBy: null,

    createdAt: null,

    updatedBy: null,

    updatedAt: null,
});


/* =========================================================
   CREATE INVOICE ITEM
   ========================================================= */

export const createInvoiceItem = (item = {}) => ({

    id:
        item.id ??
        null,

    productId:
        item.productId ??
        null,

    productCode:
        item.productCode ??
        "",

    productName:
        item.productName ??
        "",

    genericName:
        item.genericName ??
        "",

    batchNumber:
        item.batchNumber ??
        "",

    expiryDate:
        item.expiryDate ??
        null,

    hsnCode:
        item.hsnCode ??
        "",

    quantity:
        Number(
            item.quantity
        ) || 0,

    freeQuantity:
        Number(
            item.freeQuantity
        ) || 0,

    unit:
        item.unit ??
        "UNIT",

    unitPrice:
        Number(
            item.unitPrice
        ) || 0,

    mrp:
        Number(
            item.mrp
        ) || 0,

    discountPercent:
        Number(
            item.discountPercent
        ) || 0,

    discountAmount:
        Number(
            item.discountAmount
        ) || 0,

    taxableAmount:
        Number(
            item.taxableAmount
        ) || 0,

    cgstPercent:
        Number(
            item.cgstPercent
        ) || 0,

    cgstAmount:
        Number(
            item.cgstAmount
        ) || 0,

    sgstPercent:
        Number(
            item.sgstPercent
        ) || 0,

    sgstAmount:
        Number(
            item.sgstAmount
        ) || 0,

    igstPercent:
        Number(
            item.igstPercent
        ) || 0,

    igstAmount:
        Number(
            item.igstAmount
        ) || 0,

    totalTax:
        Number(
            item.totalTax
        ) || 0,

    lineTotal:
        Number(
            item.lineTotal
        ) || 0,

});


/* =========================================================
   CREATE INVOICE PAYMENT
   ========================================================= */

export const createInvoicePayment = (
    payment = {}
) => ({

    id:
        payment.id ??
        null,

    method:
        payment.method ??
        null,

    amount:
        Number(
            payment.amount
        ) || 0,

    reference:
        payment.reference ??
        "",

    remarks:
        payment.remarks ??
        "",

    paidAt:
        payment.paidAt ??
        null,

});

