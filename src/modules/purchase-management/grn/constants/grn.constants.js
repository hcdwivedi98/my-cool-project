// src/modules/purchase-management/grn/constants/grn.constants.js


/* =========================================================
   GRN STATUS
   ========================================================= */

export const GRN_STATUS = {

    DRAFT:
        "DRAFT",

    PENDING_APPROVAL:
        "PENDING_APPROVAL",

    APPROVED:
        "APPROVED",

    REJECTED:
        "REJECTED",

    CANCELLED:
        "CANCELLED",

    POSTED:
        "POSTED",

    COMPLETED:
        "COMPLETED",

};


/* =========================================================
   GRN STATUS LABELS
   ========================================================= */

export const GRN_STATUS_LABELS = {

    [GRN_STATUS.DRAFT]:
        "Draft",

    [GRN_STATUS.PENDING_APPROVAL]:
        "Pending Approval",

    [GRN_STATUS.APPROVED]:
        "Approved",

    [GRN_STATUS.REJECTED]:
        "Rejected",

    [GRN_STATUS.CANCELLED]:
        "Cancelled",

    [GRN_STATUS.POSTED]:
        "Posted",

    [GRN_STATUS.COMPLETED]:
        "Completed",

};


/* =========================================================
   GRN STATUS OPTIONS
   ========================================================= */

export const GRN_STATUS_OPTIONS = [

    {
        value:
            GRN_STATUS.DRAFT,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.DRAFT
            ],
    },

    {
        value:
            GRN_STATUS.PENDING_APPROVAL,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.PENDING_APPROVAL
            ],
    },

    {
        value:
            GRN_STATUS.APPROVED,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.APPROVED
            ],
    },

    {
        value:
            GRN_STATUS.REJECTED,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.REJECTED
            ],
    },

    {
        value:
            GRN_STATUS.CANCELLED,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.CANCELLED
            ],
    },

    {
        value:
            GRN_STATUS.POSTED,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.POSTED
            ],
    },

    {
        value:
            GRN_STATUS.COMPLETED,

        label:
            GRN_STATUS_LABELS[
                GRN_STATUS.COMPLETED
            ],
    },

];


/* =========================================================
   GRN TYPE
   ========================================================= */

export const GRN_TYPE = {

    AGAINST_PO:
        "AGAINST_PO",

    DIRECT:
        "DIRECT",

    RETURN:
        "RETURN",

    REPLACEMENT:
        "REPLACEMENT",

};


/* =========================================================
   GRN TYPE LABELS
   ========================================================= */

export const GRN_TYPE_LABELS = {

    [GRN_TYPE.AGAINST_PO]:
        "Against Purchase Order",

    [GRN_TYPE.DIRECT]:
        "Direct Receipt",

    [GRN_TYPE.RETURN]:
        "Return Receipt",

    [GRN_TYPE.REPLACEMENT]:
        "Replacement Receipt",

};


/* =========================================================
   GRN TYPE OPTIONS
   ========================================================= */

export const GRN_TYPE_OPTIONS = [

    {
        value:
            GRN_TYPE.AGAINST_PO,

        label:
            GRN_TYPE_LABELS[
                GRN_TYPE.AGAINST_PO
            ],
    },

    {
        value:
            GRN_TYPE.DIRECT,

        label:
            GRN_TYPE_LABELS[
                GRN_TYPE.DIRECT
            ],
    },

    {
        value:
            GRN_TYPE.RETURN,

        label:
            GRN_TYPE_LABELS[
                GRN_TYPE.RETURN
            ],
    },

    {
        value:
            GRN_TYPE.REPLACEMENT,

        label:
            GRN_TYPE_LABELS[
                GRN_TYPE.REPLACEMENT
            ],
    },

];

/* =========================================================
   GRN ITEM STATUS
   ========================================================= */

export const GRN_ITEM_STATUS = {

    PENDING:
        "PENDING",

    RECEIVING:
        "RECEIVING",

    ACCEPTED:
        "ACCEPTED",

    PARTIALLY_ACCEPTED:
        "PARTIALLY_ACCEPTED",

    REJECTED:
        "REJECTED",

    PARTIALLY_REJECTED:
        "PARTIALLY_REJECTED",

    COMPLETED:
        "COMPLETED",

    CANCELLED:
        "CANCELLED",

};


/* =========================================================
   GRN ITEM STATUS LABELS
   ========================================================= */

export const GRN_ITEM_STATUS_LABELS = {

    [GRN_ITEM_STATUS.PENDING]:
        "Pending",

    [GRN_ITEM_STATUS.RECEIVING]:
        "Receiving",

    [GRN_ITEM_STATUS.ACCEPTED]:
        "Accepted",

    [GRN_ITEM_STATUS.PARTIALLY_ACCEPTED]:
        "Partially Accepted",

    [GRN_ITEM_STATUS.REJECTED]:
        "Rejected",

    [GRN_ITEM_STATUS.PARTIALLY_REJECTED]:
        "Partially Rejected",

    [GRN_ITEM_STATUS.COMPLETED]:
        "Completed",

    [GRN_ITEM_STATUS.CANCELLED]:
        "Cancelled",

};


/* =========================================================
   GRN ITEM STATUS OPTIONS
   ========================================================= */

export const GRN_ITEM_STATUS_OPTIONS = [

    {
        value:
            GRN_ITEM_STATUS.PENDING,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.PENDING
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.RECEIVING,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.RECEIVING
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.ACCEPTED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.ACCEPTED
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.PARTIALLY_ACCEPTED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.PARTIALLY_ACCEPTED
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.REJECTED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.REJECTED
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.PARTIALLY_REJECTED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.PARTIALLY_REJECTED
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.COMPLETED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.COMPLETED
            ],
    },

    {
        value:
            GRN_ITEM_STATUS.CANCELLED,

        label:
            GRN_ITEM_STATUS_LABELS[
                GRN_ITEM_STATUS.CANCELLED
            ],
    },

];


/* =========================================================
   GRN QUALITY STATUS
   ========================================================= */

export const GRN_QUALITY_STATUS = {

    PENDING:
        "PENDING",

    PASSED:
        "PASSED",

    FAILED:
        "FAILED",

    PARTIALLY_PASSED:
        "PARTIALLY_PASSED",

    NOT_REQUIRED:
        "NOT_REQUIRED",

};


/* =========================================================
   GRN QUALITY STATUS LABELS
   ========================================================= */

export const GRN_QUALITY_STATUS_LABELS = {

    [GRN_QUALITY_STATUS.PENDING]:
        "Pending Inspection",

    [GRN_QUALITY_STATUS.PASSED]:
        "Passed",

    [GRN_QUALITY_STATUS.FAILED]:
        "Failed",

    [GRN_QUALITY_STATUS.PARTIALLY_PASSED]:
        "Partially Passed",

    [GRN_QUALITY_STATUS.NOT_REQUIRED]:
        "Not Required",

};


/* =========================================================
   QUALITY OPTIONS
   ========================================================= */

export const GRN_QUALITY_STATUS_OPTIONS = [

    {
        value:
            GRN_QUALITY_STATUS.PENDING,

        label:
            GRN_QUALITY_STATUS_LABELS[
                GRN_QUALITY_STATUS.PENDING
            ],
    },

    {
        value:
            GRN_QUALITY_STATUS.PASSED,

        label:
            GRN_QUALITY_STATUS_LABELS[
                GRN_QUALITY_STATUS.PASSED
            ],
    },

    {
        value:
            GRN_QUALITY_STATUS.FAILED,

        label:
            GRN_QUALITY_STATUS_LABELS[
                GRN_QUALITY_STATUS.FAILED
            ],
    },

    {
        value:
            GRN_QUALITY_STATUS.PARTIALLY_PASSED,

        label:
            GRN_QUALITY_STATUS_LABELS[
                GRN_QUALITY_STATUS.PARTIALLY_PASSED
            ],
    },

    {
        value:
            GRN_QUALITY_STATUS.NOT_REQUIRED,

        label:
            GRN_QUALITY_STATUS_LABELS[
                GRN_QUALITY_STATUS.NOT_REQUIRED
            ],
    },

];


/* =========================================================
   INSPECTION STATUS
   ========================================================= */

export const GRN_INSPECTION_STATUS = {

    NOT_STARTED:
        "NOT_STARTED",

    IN_PROGRESS:
        "IN_PROGRESS",

    PASSED:
        "PASSED",

    FAILED:
        "FAILED",

    PARTIALLY_PASSED:
        "PARTIALLY_PASSED",

};


/* =========================================================
   INSPECTION STATUS LABELS
   ========================================================= */

export const GRN_INSPECTION_STATUS_LABELS = {

    [GRN_INSPECTION_STATUS.NOT_STARTED]:
        "Not Started",

    [GRN_INSPECTION_STATUS.IN_PROGRESS]:
        "In Progress",

    [GRN_INSPECTION_STATUS.PASSED]:
        "Passed",

    [GRN_INSPECTION_STATUS.FAILED]:
        "Failed",

    [GRN_INSPECTION_STATUS.PARTIALLY_PASSED]:
        "Partially Passed",

};


/* =========================================================
   INSPECTION OPTIONS
   ========================================================= */

export const GRN_INSPECTION_STATUS_OPTIONS = [

    {
        value:
            GRN_INSPECTION_STATUS.NOT_STARTED,

        label:
            GRN_INSPECTION_STATUS_LABELS[
                GRN_INSPECTION_STATUS.NOT_STARTED
            ],
    },

    {
        value:
            GRN_INSPECTION_STATUS.IN_PROGRESS,

        label:
            GRN_INSPECTION_STATUS_LABELS[
                GRN_INSPECTION_STATUS.IN_PROGRESS
            ],
    },

    {
        value:
            GRN_INSPECTION_STATUS.PASSED,

        label:
            GRN_INSPECTION_STATUS_LABELS[
                GRN_INSPECTION_STATUS.PASSED
            ],
    },

    {
        value:
            GRN_INSPECTION_STATUS.FAILED,

        label:
            GRN_INSPECTION_STATUS_LABELS[
                GRN_INSPECTION_STATUS.FAILED
            ],
    },

    {
        value:
            GRN_INSPECTION_STATUS.PARTIALLY_PASSED,

        label:
            GRN_INSPECTION_STATUS_LABELS[
                GRN_INSPECTION_STATUS.PARTIALLY_PASSED
            ],
    },

];


/* =========================================================
   RECEIVING MODE
   ========================================================= */

export const GRN_RECEIVING_MODE = {

    FULL:
        "FULL",

    PARTIAL:
        "PARTIAL",

    SHORT:
        "SHORT",

    EXCESS:
        "EXCESS",

};


/* =========================================================
   RECEIVING MODE LABELS
   ========================================================= */

export const GRN_RECEIVING_MODE_LABELS = {

    [GRN_RECEIVING_MODE.FULL]:
        "Full Receipt",

    [GRN_RECEIVING_MODE.PARTIAL]:
        "Partial Receipt",

    [GRN_RECEIVING_MODE.SHORT]:
        "Short Receipt",

    [GRN_RECEIVING_MODE.EXCESS]:
        "Excess Receipt",

};


/* =========================================================
   RECEIVING MODE OPTIONS
   ========================================================= */

export const GRN_RECEIVING_MODE_OPTIONS = [

    {
        value:
            GRN_RECEIVING_MODE.FULL,

        label:
            GRN_RECEIVING_MODE_LABELS[
                GRN_RECEIVING_MODE.FULL
            ],
    },

    {
        value:
            GRN_RECEIVING_MODE.PARTIAL,

        label:
            GRN_RECEIVING_MODE_LABELS[
                GRN_RECEIVING_MODE.PARTIAL
            ],
    },

    {
        value:
            GRN_RECEIVING_MODE.SHORT,

        label:
            GRN_RECEIVING_MODE_LABELS[
                GRN_RECEIVING_MODE.SHORT
            ],
    },

    {
        value:
            GRN_RECEIVING_MODE.EXCESS,

        label:
            GRN_RECEIVING_MODE_LABELS[
                GRN_RECEIVING_MODE.EXCESS
            ],
    },

];


/* =========================================================
   STOCK POSTING STATUS
   ========================================================= */

export const GRN_STOCK_POSTING_STATUS = {

    NOT_POSTED:
        "NOT_POSTED",

    PENDING:
        "PENDING",

    POSTED:
        "POSTED",

    FAILED:
        "FAILED",

};


/* =========================================================
   STOCK POSTING STATUS LABELS
   ========================================================= */

export const GRN_STOCK_POSTING_STATUS_LABELS = {

    [GRN_STOCK_POSTING_STATUS.NOT_POSTED]:
        "Not Posted",

    [GRN_STOCK_POSTING_STATUS.PENDING]:
        "Pending",

    [GRN_STOCK_POSTING_STATUS.POSTED]:
        "Posted",

    [GRN_STOCK_POSTING_STATUS.FAILED]:
        "Failed",

};


/* =========================================================
   STOCK POSTING OPTIONS
   ========================================================= */

export const GRN_STOCK_POSTING_STATUS_OPTIONS = [

    {
        value:
            GRN_STOCK_POSTING_STATUS.NOT_POSTED,

        label:
            GRN_STOCK_POSTING_STATUS_LABELS[
                GRN_STOCK_POSTING_STATUS.NOT_POSTED
            ],
    },

    {
        value:
            GRN_STOCK_POSTING_STATUS.PENDING,

        label:
            GRN_STOCK_POSTING_STATUS_LABELS[
                GRN_STOCK_POSTING_STATUS.PENDING
            ],
    },

    {
        value:
            GRN_STOCK_POSTING_STATUS.POSTED,

        label:
            GRN_STOCK_POSTING_STATUS_LABELS[
                GRN_STOCK_POSTING_STATUS.POSTED
            ],
    },

    {
        value:
            GRN_STOCK_POSTING_STATUS.FAILED,

        label:
            GRN_STOCK_POSTING_STATUS_LABELS[
                GRN_STOCK_POSTING_STATUS.FAILED
            ],
    },

];


/* =========================================================
   QUANTITY RULES
   ========================================================= */

export const GRN_QUANTITY_RULES = {

    MIN_QUANTITY:
        0,

    MAX_DECIMAL_PLACES:
        3,

    ALLOW_ZERO_RECEIVED:
        false,

    ALLOW_EXCESS_RECEIPT:
        false,

    ACCEPTED_CANNOT_EXCEED_RECEIVED:
        true,

    REJECTED_CANNOT_EXCEED_RECEIVED:
        true,

    ACCEPTED_PLUS_REJECTED_MUST_EQUAL_RECEIVED:
        true,

    RECEIVED_CANNOT_EXCEED_PENDING:
        true,

};


/* =========================================================
   BATCH RULES
   ========================================================= */

export const GRN_BATCH_RULES = {

    BATCH_NUMBER_REQUIRED:
        true,

    MAX_BATCH_NUMBER_LENGTH:
        50,

    EXPIRY_DATE_REQUIRED:
        true,

    MANUFACTURING_DATE_REQUIRED:
        false,

    EXPIRY_MUST_BE_AFTER_MANUFACTURING:
        true,

    ALLOW_EXPIRED_BATCH:
        false,

    ALLOW_DUPLICATE_BATCH:
        false,

    BARCODE_REQUIRED:
        false,

    MAX_BARCODE_LENGTH:
        100,

};


/* =========================================================
   EDITABLE STATUSES
   ========================================================= */

export const GRN_EDITABLE_STATUSES = [

    GRN_STATUS.DRAFT,

    GRN_STATUS.REJECTED,

];


/* =========================================================
   SUBMITTABLE STATUSES
   ========================================================= */

export const GRN_SUBMITTABLE_STATUSES = [

    GRN_STATUS.DRAFT,

    GRN_STATUS.REJECTED,

];


/* =========================================================
   APPROVAL STATUSES
   ========================================================= */

export const GRN_APPROVAL_STATUSES = [

    GRN_STATUS.PENDING_APPROVAL,

    GRN_STATUS.APPROVED,

    GRN_STATUS.REJECTED,

];


/* =========================================================
   FINAL STATUSES
   ========================================================= */

export const GRN_FINAL_STATUSES = [

    GRN_STATUS.POSTED,

    GRN_STATUS.COMPLETED,

    GRN_STATUS.CANCELLED,

];


/* =========================================================
   READ ONLY STATUSES
   ========================================================= */

export const GRN_READ_ONLY_STATUSES = [

    GRN_STATUS.PENDING_APPROVAL,

    GRN_STATUS.APPROVED,

    GRN_STATUS.POSTED,

    GRN_STATUS.COMPLETED,

    GRN_STATUS.CANCELLED,

];


/* =========================================================
   NON EDITABLE STATUSES
   ========================================================= */

export const GRN_NON_EDITABLE_STATUSES = [

    GRN_STATUS.PENDING_APPROVAL,

    GRN_STATUS.APPROVED,

    GRN_STATUS.POSTED,

    GRN_STATUS.COMPLETED,

    GRN_STATUS.CANCELLED,

];


/* =========================================================
   CURRENCY
   ========================================================= */

export const GRN_CURRENCY = {

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

export const GRN_CURRENCY_OPTIONS = [

    {
        value:
            GRN_CURRENCY.INR,

        label:
            "Indian Rupee (INR)",
    },

    {
        value:
            GRN_CURRENCY.USD,

        label:
            "US Dollar (USD)",
    },

    {
        value:
            GRN_CURRENCY.EUR,

        label:
            "Euro (EUR)",
    },

];


/* =========================================================
   DEFAULTS
   ========================================================= */

export const DEFAULT_GRN_STATUS =
    GRN_STATUS.DRAFT;


export const DEFAULT_GRN_TYPE =
    GRN_TYPE.AGAINST_PO;


export const DEFAULT_GRN_QUALITY_STATUS =
    GRN_QUALITY_STATUS.PENDING;


export const DEFAULT_GRN_INSPECTION_STATUS =
    GRN_INSPECTION_STATUS.NOT_STARTED;


export const DEFAULT_GRN_RECEIVING_MODE =
    GRN_RECEIVING_MODE.FULL;


export const DEFAULT_GRN_STOCK_POSTING_STATUS =
    GRN_STOCK_POSTING_STATUS.NOT_POSTED;


export const DEFAULT_GRN_CURRENCY =
    GRN_CURRENCY.INR;