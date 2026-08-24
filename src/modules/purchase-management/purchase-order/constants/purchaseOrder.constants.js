// src/modules/purchase-management/purchase-order/constants/purchaseOrder.constants.js


/* =========================================================
   PURCHASE ORDER STATUS
   ========================================================= */

export const PO_STATUS = {

    DRAFT:
        "DRAFT",

    PENDING_APPROVAL:
        "PENDING_APPROVAL",

    REJECTED:
        "REJECTED",

    APPROVED:
        "APPROVED",

    SENT_TO_SUPPLIER:
        "SENT_TO_SUPPLIER",

    PARTIALLY_RECEIVED:
        "PARTIALLY_RECEIVED",

    FULLY_RECEIVED:
        "FULLY_RECEIVED",

    CLOSED:
        "CLOSED",

    CANCELLED:
        "CANCELLED",

};


/* =========================================================
   STATUS LABELS
   ========================================================= */

export const PO_STATUS_LABELS = {

    [PO_STATUS.DRAFT]:
        "Draft",

    [PO_STATUS.PENDING_APPROVAL]:
        "Pending Approval",

    [PO_STATUS.REJECTED]:
        "Rejected",

    [PO_STATUS.APPROVED]:
        "Approved",

    [PO_STATUS.SENT_TO_SUPPLIER]:
        "Sent to Supplier",

    [PO_STATUS.PARTIALLY_RECEIVED]:
        "Partially Received",

    [PO_STATUS.FULLY_RECEIVED]:
        "Fully Received",

    [PO_STATUS.CLOSED]:
        "Closed",

    [PO_STATUS.CANCELLED]:
        "Cancelled",

};


/* =========================================================
   STATUS COLORS
   ========================================================= */

export const PO_STATUS_COLORS = {

    [PO_STATUS.DRAFT]:
        "default",

    [PO_STATUS.PENDING_APPROVAL]:
        "processing",

    [PO_STATUS.REJECTED]:
        "error",

    [PO_STATUS.APPROVED]:
        "success",

    [PO_STATUS.SENT_TO_SUPPLIER]:
        "blue",

    [PO_STATUS.PARTIALLY_RECEIVED]:
        "warning",

    [PO_STATUS.FULLY_RECEIVED]:
        "success",

    [PO_STATUS.CLOSED]:
        "default",

    [PO_STATUS.CANCELLED]:
        "error",

};


/* =========================================================
   STATUS OPTIONS
   ========================================================= */

export const PO_STATUS_OPTIONS = [

    {
        value:
            PO_STATUS.DRAFT,
        label:
            "Draft",
    },

    {
        value:
            PO_STATUS.PENDING_APPROVAL,
        label:
            "Pending Approval",
    },

    {
        value:
            PO_STATUS.REJECTED,
        label:
            "Rejected",
    },

    {
        value:
            PO_STATUS.APPROVED,
        label:
            "Approved",
    },

    {
        value:
            PO_STATUS.SENT_TO_SUPPLIER,
        label:
            "Sent to Supplier",
    },

    {
        value:
            PO_STATUS.PARTIALLY_RECEIVED,
        label:
            "Partially Received",
    },

    {
        value:
            PO_STATUS.FULLY_RECEIVED,
        label:
            "Fully Received",
    },

    {
        value:
            PO_STATUS.CLOSED,
        label:
            "Closed",
    },

    {
        value:
            PO_STATUS.CANCELLED,
        label:
            "Cancelled",
    },

];


/* =========================================================
   PURCHASE ORDER TYPE
   ========================================================= */

export const PO_TYPE = {

    STANDARD:
        "STANDARD",

    EMERGENCY:
        "EMERGENCY",

    DIRECT:
        "DIRECT",

    REPLACEMENT:
        "REPLACEMENT",

    CONTRACT:
        "CONTRACT",

};


/* =========================================================
   PO TYPE LABELS
   ========================================================= */

export const PO_TYPE_LABELS = {

    [PO_TYPE.STANDARD]:
        "Standard",

    [PO_TYPE.EMERGENCY]:
        "Emergency",

    [PO_TYPE.DIRECT]:
        "Direct",

    [PO_TYPE.REPLACEMENT]:
        "Replacement",

    [PO_TYPE.CONTRACT]:
        "Contract",

};


/* =========================================================
   PO TYPE OPTIONS
   ========================================================= */

export const PO_TYPE_OPTIONS = [

    {
        value:
            PO_TYPE.STANDARD,
        label:
            "Standard",
    },

    {
        value:
            PO_TYPE.EMERGENCY,
        label:
            "Emergency",
    },

    {
        value:
            PO_TYPE.DIRECT,
        label:
            "Direct",
    },

    {
        value:
            PO_TYPE.REPLACEMENT,
        label:
            "Replacement",
    },

    {
        value:
            PO_TYPE.CONTRACT,
        label:
            "Contract",
    },

];


/* =========================================================
   PAYMENT TERMS
   ========================================================= */

export const PAYMENT_TERMS = {

    ADVANCE:
        "ADVANCE",

    COD:
        "COD",

    NET_15:
        "NET_15",

    NET_30:
        "NET_30",

    NET_45:
        "NET_45",

    NET_60:
        "NET_60",

};


/* =========================================================
   PAYMENT TERMS OPTIONS
   ========================================================= */

export const PAYMENT_TERMS_OPTIONS = [

    {
        value:
            PAYMENT_TERMS.ADVANCE,
        label:
            "Advance Payment",
    },

    {
        value:
            PAYMENT_TERMS.COD,
        label:
            "Cash on Delivery",
    },

    {
        value:
            PAYMENT_TERMS.NET_15,
        label:
            "Net 15 Days",
    },

    {
        value:
            PAYMENT_TERMS.NET_30,
        label:
            "Net 30 Days",
    },

    {
        value:
            PAYMENT_TERMS.NET_45,
        label:
            "Net 45 Days",
    },

    {
        value:
            PAYMENT_TERMS.NET_60,
        label:
            "Net 60 Days",
    },

];


/* =========================================================
   DELIVERY TERMS
   ========================================================= */

export const DELIVERY_TERMS = {

    SUPPLIER_DELIVERY:
        "SUPPLIER_DELIVERY",

    STORE_PICKUP:
        "STORE_PICKUP",

    EXPRESS:
        "EXPRESS",

    STANDARD:
        "STANDARD",

};


/* =========================================================
   DELIVERY TERMS OPTIONS
   ========================================================= */

export const DELIVERY_TERMS_OPTIONS = [

    {
        value:
            DELIVERY_TERMS.SUPPLIER_DELIVERY,
        label:
            "Supplier Delivery",
    },

    {
        value:
            DELIVERY_TERMS.STORE_PICKUP,
        label:
            "Store Pickup",
    },

    {
        value:
            DELIVERY_TERMS.EXPRESS,
        label:
            "Express Delivery",
    },

    {
        value:
            DELIVERY_TERMS.STANDARD,
        label:
            "Standard Delivery",
    },

];


/* =========================================================
   PURCHASE ORDER CURRENCY
   ========================================================= */

export const PO_CURRENCY = {

    INR:
        "INR",

    USD:
        "USD",

    EUR:
        "EUR",

};


/* =========================================================
   CURRENCY OPTIONS
   ========================================================= */

export const PO_CURRENCY_OPTIONS = [

    {
        value:
            PO_CURRENCY.INR,
        label:
            "Indian Rupee (INR)",
    },

    {
        value:
            PO_CURRENCY.USD,
        label:
            "US Dollar (USD)",
    },

    {
        value:
            PO_CURRENCY.EUR,
        label:
            "Euro (EUR)",
    },

];


/* =========================================================
   COMMUNICATION METHOD
   ========================================================= */

export const PO_COMMUNICATION_METHOD = {

    EMAIL:
        "EMAIL",

    PORTAL:
        "PORTAL",

    PHONE:
        "PHONE",

    WHATSAPP:
        "WHATSAPP",

    COURIER:
        "COURIER",

    OTHER:
        "OTHER",

};


/* =========================================================
   PURCHASE ORDER ITEM STATUS
   ========================================================= */

export const PO_ITEM_STATUS = {

    ACTIVE:
        "ACTIVE",

    PARTIALLY_RECEIVED:
        "PARTIALLY_RECEIVED",

    FULLY_RECEIVED:
        "FULLY_RECEIVED",

    CANCELLED:
        "CANCELLED",

    CLOSED:
        "CLOSED",

};


/* =========================================================
   ITEM STATUS LABELS
   ========================================================= */

export const PO_ITEM_STATUS_LABELS = {

    [PO_ITEM_STATUS.ACTIVE]:
        "Active",

    [PO_ITEM_STATUS.PARTIALLY_RECEIVED]:
        "Partially Received",

    [PO_ITEM_STATUS.FULLY_RECEIVED]:
        "Fully Received",

    [PO_ITEM_STATUS.CANCELLED]:
        "Cancelled",

    [PO_ITEM_STATUS.CLOSED]:
        "Closed",

};


/* =========================================================
   EDITABLE STATUSES
   ========================================================= */

export const PO_EDITABLE_STATUSES = [

    PO_STATUS.DRAFT,

    PO_STATUS.REJECTED,

];


/* =========================================================
   FINAL STATUSES
   ========================================================= */

export const PO_FINAL_STATUSES = [

    PO_STATUS.FULLY_RECEIVED,

    PO_STATUS.CLOSED,

    PO_STATUS.CANCELLED,

];


/* =========================================================
   VALIDATION
   ========================================================= */

export const PO_VALIDATION = {

    MIN_ITEMS:
        1,

    MAX_ITEMS:
        100,

    MAX_DISCOUNT_PERCENT:
        100,

    MAX_TAX_PERCENT:
        100,

};


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

export const DEFAULT_PO_STATUS =
    PO_STATUS.DRAFT;


export const DEFAULT_PO_TYPE =
    PO_TYPE.STANDARD;


export const DEFAULT_PO_CURRENCY =
    PO_CURRENCY.INR;