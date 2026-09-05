// src/modules/billing/utils/billing.calculation.js

import {
    DISCOUNT_TYPE,
    PAYMENT_STATUS,
} from "../constants/billing.constants";

import {
    toNumber,
    roundAmount,
    getPaymentTotal,
    safeArray,
} from "./billing.helper";


/* =========================================================
   ITEM GROSS
   ========================================================= */

export const calculateItemGrossAmount = (
    item = {}
) => {

    const quantity =
        toNumber(
            item.quantity
        );

    const unitRate =
        toNumber(
            item.unitRate
        );

    return roundAmount(
        quantity *
        unitRate
    );

};


/* =========================================================
   ITEM DISCOUNT
   ========================================================= */

export const calculateItemDiscount = (
    item = {}
) => {

    const grossAmount =
        calculateItemGrossAmount(
            item
        );

    const discountType =
        item.discountType ||
        DISCOUNT_TYPE.PERCENTAGE;

    const discountValue =
        Math.max(
            0,
            toNumber(
                item.discountValue
            )
        );


    if (
        discountType ===
        DISCOUNT_TYPE.FIXED
    ) {

        return roundAmount(
            Math.min(
                grossAmount,
                discountValue
            )
        );

    }


    return roundAmount(
        (
            grossAmount *
            Math.min(
                100,
                discountValue
            )
        ) /
        100
    );

};


/* =========================================================
   TAXABLE AMOUNT
   ========================================================= */

export const calculateItemTaxableAmount = (
    item = {}
) => {

    const grossAmount =
        calculateItemGrossAmount(
            item
        );

    const discountAmount =
        calculateItemDiscount(
            item
        );

    return roundAmount(
        Math.max(
            0,
            grossAmount -
            discountAmount
        )
    );

};


/* =========================================================
   ITEM TAX
   ========================================================= */

export const calculateItemTax = (
    item = {}
) => {

    const taxableAmount =
        calculateItemTaxableAmount(
            item
        );

    const taxPercent =
        Math.max(
            0,
            toNumber(
                item.taxPercent
            )
        );

    return roundAmount(
        (
            taxableAmount *
            taxPercent
        ) /
        100
    );

};


/* =========================================================
   ITEM TOTAL
   ========================================================= */

export const calculateItemTotal = (
    item = {}
) => {

    const taxableAmount =
        calculateItemTaxableAmount(
            item
        );

    const taxAmount =
        calculateItemTax(
            item
        );

    return roundAmount(
        taxableAmount +
        taxAmount
    );

};


/* =========================================================
   NORMALIZE CALCULATED ITEM
   ========================================================= */

export const calculateBillingItem = (
    item = {}
) => {

    const grossAmount =
        calculateItemGrossAmount(
            item
        );

    const discountAmount =
        calculateItemDiscount(
            item
        );

    const taxableAmount =
        calculateItemTaxableAmount(
            item
        );

    const taxAmount =
        calculateItemTax(
            item
        );

    const lineTotal =
        calculateItemTotal(
            item
        );


    return {

        ...item,

        grossAmount,

        discountAmount,

        taxableAmount,

        taxAmount,

        lineTotal,

    };

};


/* =========================================================
   BILL SUBTOTAL
   ========================================================= */

export const calculateSubtotal = (
    items
) => {

    return roundAmount(
        safeArray(
            items
        ).reduce(
            (
                total,
                item
            ) =>
                total +
                calculateItemGrossAmount(
                    item
                ),
            0
        )
    );

};


/* =========================================================
   BILL DISCOUNT
   ========================================================= */

export const calculateTotalDiscount = (
    items
) => {

    return roundAmount(
        safeArray(
            items
        ).reduce(
            (
                total,
                item
            ) =>
                total +
                calculateItemDiscount(
                    item
                ),
            0
        )
    );

};


/* =========================================================
   BILL TAX
   ========================================================= */

export const calculateTotalTax = (
    items
) => {

    return roundAmount(
        safeArray(
            items
        ).reduce(
            (
                total,
                item
            ) =>
                total +
                calculateItemTax(
                    item
                ),
            0
        )
    );

};


/* =========================================================
   TOTAL BEFORE ROUNDING
   ========================================================= */

export const calculateTotalBeforeRoundOff = (
    items
) => {

    const subtotal =
        calculateSubtotal(
            items
        );

    const discount =
        calculateTotalDiscount(
            items
        );

    const tax =
        calculateTotalTax(
            items
        );


    return roundAmount(
        subtotal -
        discount +
        tax
    );

};


/* =========================================================
   ROUND OFF
   ========================================================= */

export const calculateRoundOff = (
    amount
) => {

    const total =
        roundAmount(
            amount
        );

    const rounded =
        Math.round(
            total
        );


    return roundAmount(
        rounded -
        total
    );

};


/* =========================================================
   GRAND TOTAL
   ========================================================= */

export const calculateGrandTotal = (
    items,
    roundOff = null
) => {

    const totalBeforeRoundOff =
        calculateTotalBeforeRoundOff(
            items
        );


    const actualRoundOff =
        roundOff === null
            ? calculateRoundOff(
                totalBeforeRoundOff
            )
            : roundAmount(
                roundOff
            );


    return roundAmount(
        totalBeforeRoundOff +
        actualRoundOff
    );

};


/* =========================================================
   PAID AMOUNT
   ========================================================= */

export const calculatePaidAmount = (
    payments
) => {

    return roundAmount(
        getPaymentTotal(
            payments
        )
    );

};


/* =========================================================
   DUE AMOUNT
   ========================================================= */

export const calculateDueAmount = (
    grandTotal,
    paidAmount
) => {

    return roundAmount(
        Math.max(
            0,
            toNumber(
                grandTotal
            ) -
            toNumber(
                paidAmount
            )
        )
    );

};


/* =========================================================
   CHANGE AMOUNT
   ========================================================= */

export const calculateChangeAmount = (
    grandTotal,
    paidAmount
) => {

    return roundAmount(
        Math.max(
            0,
            toNumber(
                paidAmount
            ) -
            toNumber(
                grandTotal
            )
        )
    );

};


/* =========================================================
   PAYMENT STATUS
   ========================================================= */

export const calculatePaymentStatus = (
    grandTotal,
    paidAmount
) => {

    const total =
        toNumber(
            grandTotal
        );

    const paid =
        toNumber(
            paidAmount
        );


    if (
        paid <= 0
    ) {

        return PAYMENT_STATUS.PENDING;

    }


    if (
        paid < total
    ) {

        return PAYMENT_STATUS.PARTIAL;

    }


    return PAYMENT_STATUS.PAID;

};


/* =========================================================
   COMPLETE BILL CALCULATION
   ========================================================= */

export const calculateBillTotals = (
    items = [],
    payments = [],
    roundOff = null
) => {

    const subtotal =
        calculateSubtotal(
            items
        );

    const discountAmount =
        calculateTotalDiscount(
            items
        );

    const taxAmount =
        calculateTotalTax(
            items
        );

    const totalBeforeRoundOff =
        roundAmount(
            subtotal -
            discountAmount +
            taxAmount
        );

    const calculatedRoundOff =
        roundOff === null
            ? calculateRoundOff(
                totalBeforeRoundOff
            )
            : roundAmount(
                roundOff
            );

    const grandTotal =
        roundAmount(
            totalBeforeRoundOff +
            calculatedRoundOff
        );

    const paidAmount =
        calculatePaidAmount(
            payments
        );

    const dueAmount =
        calculateDueAmount(
            grandTotal,
            paidAmount
        );

    const changeAmount =
        calculateChangeAmount(
            grandTotal,
            paidAmount
        );

    const paymentStatus =
        calculatePaymentStatus(
            grandTotal,
            paidAmount
        );


    return {

        subtotal,

        discountAmount,

        taxAmount,

        roundOff:
            calculatedRoundOff,

        grandTotal,

        paidAmount,

        dueAmount,

        changeAmount,

        paymentStatus,

    };

};


/* =========================================================
   COMPLETE BILL CALCULATION
   ========================================================= */

export const calculateBill = (
    bill = {}
) => {

    const items =
        safeArray(
            bill.items
        ).map(
            calculateBillingItem
        );

    const payments =
        safeArray(
            bill.payments
        );


    const totals =
        calculateBillTotals(
            items,
            payments,
            bill.roundOff
        );


    return {

        ...bill,

        items,

        ...totals,

    };

};