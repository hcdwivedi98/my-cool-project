// src/modules/billing/constants/billing.constants.js


/* =========================================================
   BILL STATUS
   ========================================================= */

export const BILL_STATUS = {
    DRAFT: "DRAFT",

    CONFIRMED: "CONFIRMED",

    COMPLETED: "COMPLETED",

    CANCELLED: "CANCELLED",

    PARTIALLY_RETURNED: "PARTIALLY_RETURNED",

    RETURNED: "RETURNED",
};


/* =========================================================
   BILL STATUS LABELS
   ========================================================= */

export const BILL_STATUS_LABELS = {
    [BILL_STATUS.DRAFT]:
        "Draft",

    [BILL_STATUS.CONFIRMED]:
        "Confirmed",

    [BILL_STATUS.COMPLETED]:
        "Completed",

    [BILL_STATUS.CANCELLED]:
        "Cancelled",

    [BILL_STATUS.PARTIALLY_RETURNED]:
        "Partially Returned",

    [BILL_STATUS.RETURNED]:
        "Returned",
};


/* =========================================================
   BILL STATUS COLORS
   ========================================================= */

export const BILL_STATUS_COLORS = {
    [BILL_STATUS.DRAFT]:
        "default",

    [BILL_STATUS.CONFIRMED]:
        "processing",

    [BILL_STATUS.COMPLETED]:
        "success",

    [BILL_STATUS.CANCELLED]:
        "error",

    [BILL_STATUS.PARTIALLY_RETURNED]:
        "warning",

    [BILL_STATUS.RETURNED]:
        "purple",
};


/* =========================================================
   PAYMENT STATUS
   ========================================================= */

export const PAYMENT_STATUS = {
    PENDING: "PENDING",

    PARTIAL: "PARTIAL",

    PAID: "PAID",

    CREDIT: "CREDIT",

    REFUNDED: "REFUNDED",

    PARTIALLY_REFUNDED:
        "PARTIALLY_REFUNDED",
};


/* =========================================================
   PAYMENT STATUS LABELS
   ========================================================= */

export const PAYMENT_STATUS_LABELS = {
    [PAYMENT_STATUS.PENDING]:
        "Pending",

    [PAYMENT_STATUS.PARTIAL]:
        "Partially Paid",

    [PAYMENT_STATUS.PAID]:
        "Paid",

    [PAYMENT_STATUS.CREDIT]:
        "Credit",

    [PAYMENT_STATUS.REFUNDED]:
        "Refunded",

    [PAYMENT_STATUS.PARTIALLY_REFUNDED]:
        "Partially Refunded",
};


/* =========================================================
   PAYMENT STATUS COLORS
   ========================================================= */

export const PAYMENT_STATUS_COLORS = {
    [PAYMENT_STATUS.PENDING]:
        "warning",

    [PAYMENT_STATUS.PARTIAL]:
        "processing",

    [PAYMENT_STATUS.PAID]:
        "success",

    [PAYMENT_STATUS.CREDIT]:
        "orange",

    [PAYMENT_STATUS.REFUNDED]:
        "purple",

    [PAYMENT_STATUS.PARTIALLY_REFUNDED]:
        "warning",
};


/* =========================================================
   PAYMENT METHODS
   ========================================================= */

export const PAYMENT_METHOD = {
    CASH: "CASH",

    UPI: "UPI",

    CARD: "CARD",

    BANK_TRANSFER:
        "BANK_TRANSFER",

    CREDIT: "CREDIT",

    CHEQUE: "CHEQUE",

    OTHER: "OTHER",
};


/* =========================================================
   PAYMENT METHOD LABELS
   ========================================================= */

export const PAYMENT_METHOD_LABELS = {
    [PAYMENT_METHOD.CASH]:
        "Cash",

    [PAYMENT_METHOD.UPI]:
        "UPI",

    [PAYMENT_METHOD.CARD]:
        "Card",

    [PAYMENT_METHOD.BANK_TRANSFER]:
        "Bank Transfer",

    [PAYMENT_METHOD.CREDIT]:
        "Credit",

    [PAYMENT_METHOD.CHEQUE]:
        "Cheque",

    [PAYMENT_METHOD.OTHER]:
        "Other",
};


/* =========================================================
   BILL TYPE
   ========================================================= */

export const BILL_TYPE = {
    RETAIL: "RETAIL",

    OPD: "OPD",

    IPD: "IPD",

    EMERGENCY: "EMERGENCY",

    CORPORATE: "CORPORATE",

    INSURANCE: "INSURANCE",

    CREDIT: "CREDIT",
};


/* =========================================================
   CUSTOMER TYPE
   ========================================================= */

export const CUSTOMER_TYPE = {
    PATIENT: "PATIENT",

    CUSTOMER: "CUSTOMER",

    CORPORATE:
        "CORPORATE",

    INSURANCE:
        "INSURANCE",
};


/* =========================================================
   DISCOUNT TYPE
   ========================================================= */

export const DISCOUNT_TYPE = {
    PERCENTAGE: "PERCENTAGE",

    FIXED: "FIXED",
};


/* =========================================================
   TAX TYPE
   ========================================================= */

export const TAX_TYPE = {
    PERCENTAGE: "PERCENTAGE",

    FIXED: "FIXED",

    NONE: "NONE",
};


/* =========================================================
   RETURN STATUS
   ========================================================= */

export const RETURN_STATUS = {
    DRAFT: "DRAFT",

    REQUESTED: "REQUESTED",

    APPROVED: "APPROVED",

    COMPLETED: "COMPLETED",

    REJECTED: "REJECTED",

    CANCELLED: "CANCELLED",
};


/* =========================================================
   RETURN STATUS LABELS
   ========================================================= */

export const RETURN_STATUS_LABELS = {
    [RETURN_STATUS.DRAFT]:
        "Draft",

    [RETURN_STATUS.REQUESTED]:
        "Requested",

    [RETURN_STATUS.APPROVED]:
        "Approved",

    [RETURN_STATUS.COMPLETED]:
        "Completed",

    [RETURN_STATUS.REJECTED]:
        "Rejected",

    [RETURN_STATUS.CANCELLED]:
        "Cancelled",
};


/* =========================================================
   REFUND STATUS
   ========================================================= */

export const REFUND_STATUS = {
    PENDING: "PENDING",

    PROCESSING: "PROCESSING",

    COMPLETED: "COMPLETED",

    FAILED: "FAILED",

    CANCELLED: "CANCELLED",
};


/* =========================================================
   REFUND METHOD
   ========================================================= */

export const REFUND_METHOD = {
    CASH: "CASH",

    UPI: "UPI",

    CARD: "CARD",

    BANK_TRANSFER:
        "BANK_TRANSFER",

    ORIGINAL_METHOD:
        "ORIGINAL_METHOD",
};


/* =========================================================
   BILL ITEM STATUS
   ========================================================= */

export const BILL_ITEM_STATUS = {
    ACTIVE: "ACTIVE",

    CANCELLED: "CANCELLED",

    RETURNED: "RETURNED",

    PARTIALLY_RETURNED:
        "PARTIALLY_RETURNED",
};


/* =========================================================
   CREDIT STATUS
   ========================================================= */

export const CREDIT_STATUS = {
    OPEN: "OPEN",

    PARTIAL: "PARTIAL",

    SETTLED: "SETTLED",

    OVERDUE: "OVERDUE",

    CANCELLED: "CANCELLED",
};


/* =========================================================
   BILL ACTIONS
   ========================================================= */

export const BILL_ACTION = {
    SAVE_DRAFT:
        "SAVE_DRAFT",

    CONFIRM:
        "CONFIRM",

    COMPLETE:
        "COMPLETE",

    CANCEL:
        "CANCEL",

    HOLD:
        "HOLD",

    RESUME:
        "RESUME",

    RETURN:
        "RETURN",

    REFUND:
        "REFUND",

    REPRINT:
        "REPRINT",
};


/* =========================================================
   APPROVAL TYPE
   ========================================================= */

export const APPROVAL_TYPE = {
    DISCOUNT:
        "DISCOUNT",

    CANCELLATION:
        "CANCELLATION",

    REFUND:
        "REFUND",

    CREDIT:
        "CREDIT",

    PRICE_OVERRIDE:
        "PRICE_OVERRIDE",

    BATCH_OVERRIDE:
        "BATCH_OVERRIDE",
};


/* =========================================================
   BILLING PERMISSIONS
   ========================================================= */

export const BILLING_PERMISSION = {
    CREATE_BILL:
        "BILLING_CREATE",

    EDIT_BILL:
        "BILLING_EDIT",

    COMPLETE_BILL:
        "BILLING_COMPLETE",

    CANCEL_BILL:
        "BILLING_CANCEL",

    APPLY_DISCOUNT:
        "BILLING_DISCOUNT",

    APPROVE_DISCOUNT:
        "BILLING_DISCOUNT_APPROVE",

    CHANGE_BATCH:
        "BILLING_BATCH_CHANGE",

    SALES_RETURN:
        "BILLING_RETURN",

    REFUND:
        "BILLING_REFUND",

    APPROVE_REFUND:
        "BILLING_REFUND_APPROVE",

    CREDIT_BILL:
        "BILLING_CREDIT",

    APPROVE_CREDIT:
        "BILLING_CREDIT_APPROVE",

    VIEW_HISTORY:
        "BILLING_HISTORY_VIEW",

    REPRINT_INVOICE:
        "BILLING_INVOICE_REPRINT",

    VIEW_REPORTS:
        "BILLING_REPORT_VIEW",
};


/* =========================================================
   DEFAULT BILLING VALUES
   ========================================================= */

export const BILLING_DEFAULTS = {
    CURRENCY:
        "INR",

    QUANTITY:
        1,

    DISCOUNT:
        0,

    TAX:
        0,

    ROUND_OFF:
        0,

    PAYMENT_METHOD:
        PAYMENT_METHOD.CASH,
};


/* =========================================================
   BILLING LIMITS
   ========================================================= */

export const BILLING_LIMITS = {
    MAX_DISCOUNT_PERCENT:
        100,

    MIN_QUANTITY:
        1,

    MIN_PAYMENT_AMOUNT:
        0,

    MAX_PAYMENT_METHODS:
        5,
};


/* =========================================================
   BILLING VALIDATION TYPES
   ========================================================= */

export const BILLING_VALIDATION_TYPE = {
    PATIENT_REQUIRED:
        "PATIENT_REQUIRED",

    ITEM_REQUIRED:
        "ITEM_REQUIRED",

    BATCH_REQUIRED:
        "BATCH_REQUIRED",

    QUANTITY_REQUIRED:
        "QUANTITY_REQUIRED",

    STOCK_INSUFFICIENT:
        "STOCK_INSUFFICIENT",

    BATCH_EXPIRED:
        "BATCH_EXPIRED",

    DISCOUNT_INVALID:
        "DISCOUNT_INVALID",

    PAYMENT_REQUIRED:
        "PAYMENT_REQUIRED",

    PAYMENT_INCOMPLETE:
        "PAYMENT_INCOMPLETE",

    CREDIT_LIMIT_EXCEEDED:
        "CREDIT_LIMIT_EXCEEDED",
};


/* =========================================================
   INVOICE FORMAT
   ========================================================= */

export const INVOICE_FORMAT = {
    A4: "A4",

    THERMAL_58:
        "THERMAL_58",

    THERMAL_80:
        "THERMAL_80",
};


/* =========================================================
   BILLING SCREEN MODES
   ========================================================= */

export const BILLING_MODE = {
    CREATE: "CREATE",

    EDIT: "EDIT",

    VIEW: "VIEW",

    RETURN: "RETURN",
};