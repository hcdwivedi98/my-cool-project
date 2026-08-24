// src/modules/purchase-management/purchase-order/utils/purchaseOrder.helper.js

import {
    PO_EDITABLE_STATUSES,
    PO_FINAL_STATUSES,
    PO_STATUS,
    PO_STATUS_COLORS,
    PO_VALIDATION,
} from "../constants/purchaseOrder.constants";


/* =========================================================
   NUMBER HELPER
   ========================================================= */

export const toNumber = (
    value,
    fallback = 0
) => {

    const number =
        Number(
            value
        );


    return Number.isFinite(
        number
    )
        ? number
        : fallback;

};


/* =========================================================
   ROUND MONEY
   ========================================================= */

export const roundMoney = (
    value
) => {

    return Math.round(
        (
            toNumber(
                value
            ) +
            Number.EPSILON
        ) * 100
    ) / 100;

};


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

export const formatCurrency = (
    value,
    currency = "INR"
) => {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style:
                "currency",

            currency,

            minimumFractionDigits:
                2,

            maximumFractionDigits:
                2,
        }
    ).format(
        toNumber(
            value
        )
    );

};


/* =========================================================
   STATUS LABEL
   ========================================================= */

export const getPOStatusLabel = (
    status
) => {

    const labels = {

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


    return (
        labels[
            status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   STATUS COLOR
   ========================================================= */

export const getPOStatusColor = (
    status
) => {

    return (
        PO_STATUS_COLORS[
            status
        ] ||
        "default"
    );

};


/* =========================================================
   PO TYPE LABEL
   ========================================================= */

export const getPOTypeLabel = (
    type
) => {

    const labels = {

        STANDARD:
            "Standard",

        EMERGENCY:
            "Emergency",

        DIRECT:
            "Direct",

        REPLACEMENT:
            "Replacement",

        CONTRACT:
            "Contract",

    };


    return (
        labels[
            type
        ] ||
        type ||
        "-"
    );

};


/* =========================================================
   PAYMENT TERMS LABEL
   ========================================================= */

export const getPaymentTermsLabel = (
    value
) => {

    const labels = {

        ADVANCE:
            "Advance Payment",

        COD:
            "Cash on Delivery",

        NET_15:
            "Net 15 Days",

        NET_30:
            "Net 30 Days",

        NET_45:
            "Net 45 Days",

        NET_60:
            "Net 60 Days",

    };


    return (
        labels[
            value
        ] ||
        value ||
        "-"
    );

};


/* =========================================================
   DELIVERY TERMS LABEL
   ========================================================= */

export const getDeliveryTermsLabel = (
    value
) => {

    const labels = {

        SUPPLIER_DELIVERY:
            "Supplier Delivery",

        STORE_PICKUP:
            "Store Pickup",

        EXPRESS:
            "Express Delivery",

        STANDARD:
            "Standard Delivery",

    };


    return (
        labels[
            value
        ] ||
        value ||
        "-"
    );

};


/* =========================================================
   CALCULATE LINE GROSS
   ========================================================= */

export const calculateLineGross = (
    quantity,
    rate
) => {

    const safeQuantity =
        Math.max(
            toNumber(
                quantity
            ),
            0
        );


    const safeRate =
        Math.max(
            toNumber(
                rate
            ),
            0
        );


    return roundMoney(
        safeQuantity *
        safeRate
    );

};


/* =========================================================
   CALCULATE DISCOUNT
   ========================================================= */

export const calculateDiscountAmount = (
    grossAmount,
    discountPercent
) => {

    const gross =
        Math.max(
            toNumber(
                grossAmount
            ),
            0
        );


    const discount =
        Math.min(
            Math.max(
                toNumber(
                    discountPercent
                ),
                0
            ),
            PO_VALIDATION.MAX_DISCOUNT_PERCENT
        );


    return roundMoney(
        gross *
        discount /
        100
    );

};


/* =========================================================
   CALCULATE TAXABLE
   ========================================================= */

export const calculateTaxableAmount = (
    grossAmount,
    discountAmount
) => {

    return roundMoney(
        Math.max(
            toNumber(
                grossAmount
            ) -
            toNumber(
                discountAmount
            ),
            0
        )
    );

};


/* =========================================================
   CALCULATE TAX
   ========================================================= */

export const calculateTaxAmount = (
    taxableAmount,
    taxPercent
) => {

    const taxable =
        Math.max(
            toNumber(
                taxableAmount
            ),
            0
        );


    const tax =
        Math.min(
            Math.max(
                toNumber(
                    taxPercent
                ),
                0
            ),
            PO_VALIDATION.MAX_TAX_PERCENT
        );


    return roundMoney(
        taxable *
        tax /
        100
    );

};


/* =========================================================
   CALCULATE LINE TOTAL
   ========================================================= */

export const calculateLineTotal = (
    quantity,
    rate,
    discountPercent,
    taxPercent
) => {

    const grossAmount =
        calculateLineGross(
            quantity,
            rate
        );


    const discountAmount =
        calculateDiscountAmount(
            grossAmount,
            discountPercent
        );


    const taxableAmount =
        calculateTaxableAmount(
            grossAmount,
            discountAmount
        );


    const taxAmount =
        calculateTaxAmount(
            taxableAmount,
            taxPercent
        );


    const lineTotal =
        roundMoney(
            taxableAmount +
            taxAmount
        );


    return {

        grossAmount,

        discountAmount,

        taxableAmount,

        taxAmount,

        lineTotal,

    };

};


/* =========================================================
   CALCULATE ITEM
   ========================================================= */

export const calculatePurchaseOrderItem = (
    item = {}
) => {

    const quantity =
        Math.max(
            toNumber(
                item.orderedQuantity
            ),
            0
        );


    const rate =
        Math.max(
            toNumber(
                item.unitRate
            ),
            0
        );


    const discountPercent =
        Math.min(
            Math.max(
                toNumber(
                    item.discountPercent
                ),
                0
            ),
            PO_VALIDATION.MAX_DISCOUNT_PERCENT
        );


    const taxPercent =
        Math.min(
            Math.max(
                toNumber(
                    item.taxPercent
                ),
                0
            ),
            PO_VALIDATION.MAX_TAX_PERCENT
        );


    const calculation =
        calculateLineTotal(
            quantity,
            rate,
            discountPercent,
            taxPercent
        );


    const receivedQuantity =
        Math.max(
            toNumber(
                item.receivedQuantity
            ),
            0
        );


    const outstandingQuantity =
        Math.max(
            quantity -
            receivedQuantity,
            0
        );


    let status =
        PO_STATUS.DRAFT;


    if (
        receivedQuantity >=
        quantity &&
        quantity > 0
    ) {

        status =
            "FULLY_RECEIVED";

    }
    else if (
        receivedQuantity > 0
    ) {

        status =
            "PARTIALLY_RECEIVED";

    }
    else {

        status =
            "PENDING";

    }


    return {

        ...item,

        orderedQuantity:
            quantity,

        unitRate:
            rate,

        discountPercent,

        taxPercent,

        receivedQuantity,

        outstandingQuantity,

        discountAmount:
            calculation.discountAmount,

        taxableAmount:
            calculation.taxableAmount,

        taxAmount:
            calculation.taxAmount,

        lineTotal:
            calculation.lineTotal,

        status,

    };

};


/* =========================================================
   CALCULATE PO TOTALS
   ========================================================= */

export const calculatePurchaseOrderTotals = (
    items = [],
    otherCharges = 0,
    roundOff = 0
) => {

    const safeItems =
        Array.isArray(
            items
        )
            ? items
            : [];


    const calculatedItems =
        safeItems.map(
            (
                item
            ) =>
                calculatePurchaseOrderItem(
                    item
                )
        );


    const subtotal =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    calculateLineGross(
                        item.orderedQuantity,
                        item.unitRate
                    ),
                0
            )
        );


    const discountAmount =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item.discountAmount
                    ),
                0
            )
        );


    const taxAmount =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item.taxAmount
                    ),
                0
            )
        );


    const safeOtherCharges =
        Math.max(
            toNumber(
                otherCharges
            ),
            0
        );


    const safeRoundOff =
        toNumber(
            roundOff
        );


    const grandTotal =
        roundMoney(
            subtotal -
            discountAmount +
            taxAmount +
            safeOtherCharges +
            safeRoundOff
        );


    const totalQuantity =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item.orderedQuantity
                    ),
                0
            )
        );


    const receivedQuantity =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item.receivedQuantity
                    ),
                0
            )
        );


    const outstandingQuantity =
        roundMoney(
            calculatedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item.outstandingQuantity
                    ),
                0
            )
        );


    return {

        items:
            calculatedItems,

        subtotal,

        discountAmount,

        taxAmount,

        otherCharges:
            safeOtherCharges,

        roundOff:
            safeRoundOff,

        grandTotal,

        totalItems:
            calculatedItems.length,

        totalQuantity,

        receivedQuantity,

        outstandingQuantity,

    };

};


/* =========================================================
   CHECK IF EDITABLE
   ========================================================= */

export const isPurchaseOrderEditable = (
    status
) => {

    return PO_EDITABLE_STATUSES.includes(
        status
    );

};


/* =========================================================
   CHECK IF FINAL
   ========================================================= */

export const isPurchaseOrderFinal = (
    status
) => {

    return PO_FINAL_STATUSES.includes(
        status
    );

};


/* =========================================================
   CHECK IF RECEIVING ALLOWED
   ========================================================= */

export const canReceiveAgainstPurchaseOrder = (
    status
) => {

    return [

        PO_STATUS.SENT_TO_SUPPLIER,

        PO_STATUS.PARTIALLY_RECEIVED,

    ].includes(
        status
    );

};


/* =========================================================
   CHECK IF CANCELLABLE
   ========================================================= */

export const canCancelPurchaseOrder = (
    status
) => {

    return [

        PO_STATUS.DRAFT,

        PO_STATUS.PENDING_APPROVAL,

        PO_STATUS.APPROVED,

    ].includes(
        status
    );

};


/* =========================================================
   CHECK IF APPROVABLE
   ========================================================= */

export const canApprovePurchaseOrder = (
    status
) => {

    return (
        status ===
        PO_STATUS.PENDING_APPROVAL
    );

};


/* =========================================================
   CHECK IF SENDABLE
   ========================================================= */

export const canSendPurchaseOrder = (
    status
) => {

    return (
        status ===
        PO_STATUS.APPROVED
    );

};


/* =========================================================
   CHECK IF CLOSEABLE
   ========================================================= */

export const canClosePurchaseOrder = (
    status
) => {

    return (
        status ===
        PO_STATUS.FULLY_RECEIVED
    );

};


/* =========================================================
   VALIDATE ITEM
   ========================================================= */

export const validatePurchaseOrderItem = (
    item = {}
) => {

    const errors = [];


    if (
        !item.drugId
    ) {

        errors.push(
            "Item is required."
        );

    }


    if (
        toNumber(
            item.orderedQuantity
        ) <= 0
    ) {

        errors.push(
            "Quantity must be greater than zero."
        );

    }


    if (
        toNumber(
            item.unitRate
        ) < 0
    ) {

        errors.push(
            "Rate cannot be negative."
        );

    }


    if (
        toNumber(
            item.discountPercent
        ) <
            0 ||
        toNumber(
            item.discountPercent
        ) >
            PO_VALIDATION.MAX_DISCOUNT_PERCENT
    ) {

        errors.push(
            "Discount percentage is invalid."
        );

    }


    if (
        toNumber(
            item.taxPercent
        ) <
            0 ||
        toNumber(
            item.taxPercent
        ) >
            PO_VALIDATION.MAX_TAX_PERCENT
    ) {

        errors.push(
            "Tax percentage is invalid."
        );

    }


    if (
        toNumber(
            item.receivedQuantity
        ) >
        toNumber(
            item.orderedQuantity
        )
    ) {

        errors.push(
            "Received quantity cannot exceed ordered quantity."
        );

    }


    return errors;

};


/* =========================================================
   VALIDATE PURCHASE ORDER
   ========================================================= */

export const validatePurchaseOrder = (
    values = {}
) => {

    const errors = [];


    if (
        !values.poDate
    ) {

        errors.push(
            "PO date is required."
        );

    }


    if (
        !values.supplierId
    ) {

        errors.push(
            "Supplier is required."
        );

    }


    if (
        !values.storeId
    ) {

        errors.push(
            "Store is required."
        );

    }


    if (
        !values.poType
    ) {

        errors.push(
            "PO type is required."
        );

    }


    const items =
        Array.isArray(
            values.items
        )
            ? values.items
            : [];


    if (
        items.length <
        PO_VALIDATION.MIN_ITEMS
    ) {

        errors.push(
            "At least one item is required."
        );

    }


    items.forEach(
        (
            item,
            index
        ) => {

            const itemErrors =
                validatePurchaseOrderItem(
                    item
                );


            itemErrors.forEach(
                (
                    error
                ) => {

                    errors.push(
                        `Item ${index + 1}: ${error}`
                    );

                }
            );

        }
    );


    return errors;

};


/* =========================================================
   PREPARE PO PAYLOAD
   ========================================================= */

export const preparePurchaseOrderPayload = (
    values = {}
) => {

    const items =
        Array.isArray(
            values.items
        )
            ? values.items
            : [];


    const totals =
        calculatePurchaseOrderTotals(
            items,
            values.otherCharges,
            values.roundOff
        );


    return {

        ...values,

        items:
            totals.items,

        subtotal:
            totals.subtotal,

        discountAmount:
            totals.discountAmount,

        taxAmount:
            totals.taxAmount,

        otherCharges:
            totals.otherCharges,

        roundOff:
            totals.roundOff,

        grandTotal:
            totals.grandTotal,

        totalItems:
            totals.totalItems,

        totalQuantity:
            totals.totalQuantity,

        receivedQuantity:
            totals.receivedQuantity,

        outstandingQuantity:
            totals.outstandingQuantity,

    };

};


/* =========================================================
   GENERATE PO NUMBER
   ========================================================= */

export const generatePurchaseOrderNumber = (
    existingOrders = []
) => {

    const year =
        new Date()
            .getFullYear();


    const orders =
        Array.isArray(
            existingOrders
        )
            ? existingOrders
            : [];


    const prefix =
        `PO-${year}-`;


    const numbers =
        orders
            .map(
                (
                    order
                ) =>
                    String(
                        order.poNumber ||
                        ""
                    )
            )
            .filter(
                (
                    number
                ) =>
                    number.startsWith(
                        prefix
                    )
            )
            .map(
                (
                    number
                ) =>
                    Number(
                        number.replace(
                            prefix,
                            ""
                        )
                    )
            )
            .filter(
                Number.isFinite
            );


    const nextNumber =
        numbers.length > 0
            ? Math.max(
                ...numbers
            ) + 1
            : 1;


    return (
        prefix +
        String(
            nextNumber
        ).padStart(
            4,
            "0"
        )
    );

};


/* =========================================================
   GET SUPPLIER DISPLAY NAME
   ========================================================= */

export const getSupplierDisplayName = (
    supplier
) => {

    if (
        !supplier
    ) {

        return "-";

    }


    return (
        supplier.supplierName ||
        supplier.name ||
        supplier.supplierCode ||
        "-"
    );

};


/* =========================================================
   GET ITEM DISPLAY NAME
   ========================================================= */

export const getItemDisplayName = (
    item
) => {

    if (
        !item
    ) {

        return "-";

    }


    return (
        item.itemName ||
        item.drugName ||
        item.name ||
        item.itemCode ||
        "-"
    );

};


/* =========================================================
   DATE FORMAT
   ========================================================= */

export const formatPurchaseOrderDate = (
    value
) => {

    if (
        !value
    ) {

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

        return String(
            value
        );

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",
        }
    ).format(
        date
    );

};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

const purchaseOrderHelper = {

    toNumber,

    roundMoney,

    formatCurrency,

    getPOStatusLabel,

    getPOStatusColor,

    getPOTypeLabel,

    getPaymentTermsLabel,

    getDeliveryTermsLabel,

    calculateLineGross,

    calculateDiscountAmount,

    calculateTaxableAmount,

    calculateTaxAmount,

    calculateLineTotal,

    calculatePurchaseOrderItem,

    calculatePurchaseOrderTotals,

    isPurchaseOrderEditable,

    isPurchaseOrderFinal,

    canReceiveAgainstPurchaseOrder,

    canCancelPurchaseOrder,

    canApprovePurchaseOrder,

    canSendPurchaseOrder,

    canClosePurchaseOrder,

    validatePurchaseOrderItem,

    validatePurchaseOrder,

    preparePurchaseOrderPayload,

    generatePurchaseOrderNumber,

    getSupplierDisplayName,

    getItemDisplayName,

    formatPurchaseOrderDate,

};


export default purchaseOrderHelper;