// src/modules/billing/utils/billing.validation.js

import {
    BILL_STATUS,
    BILLING_LIMITS,
    BILLING_VALIDATION_TYPE,
    PAYMENT_METHOD,
} from "../constants/billing.constants";

import {
    toNumber,
    safeArray,
} from "./billing.helper";

import {
    calculateGrandTotal,
    calculatePaidAmount,
} from "./billing.calculation";


/* =========================================================
   ERROR CREATOR
   ========================================================= */

const createError = (
    field,
    message,
    code,
    index = null
) => {

    return {

        field,

        message,

        code,

        index,

    };

};


/* =========================================================
   ITEM VALIDATION
   ========================================================= */

export const validateBillItem = (
    item = {},
    index = 0
) => {

    const errors = [];


    if (
        !item.medicineId &&
        !item.drugId
    ) {

        errors.push(
            createError(
                [
                    "items",
                    index,
                    "medicineId",
                ],
                "Medicine is required.",
                BILLING_VALIDATION_TYPE.ITEM_REQUIRED,
                index
            )
        );

    }


    if (
        !item.batchId &&
        !item.batchNumber
    ) {

        errors.push(
            createError(
                [
                    "items",
                    index,
                    "batchId",
                ],
                "Batch is required.",
                BILLING_VALIDATION_TYPE.BATCH_REQUIRED,
                index
            )
        );

    }


    const quantity =
        toNumber(
            item.quantity
        );


    if (
        quantity <
        BILLING_LIMITS.MIN_QUANTITY
    ) {

        errors.push(
            createError(
                [
                    "items",
                    index,
                    "quantity",
                ],
                "Quantity must be greater than zero.",
                BILLING_VALIDATION_TYPE.QUANTITY_REQUIRED,
                index
            )
        );

    }


    const availableQuantity =
        toNumber(
            item.availableQuantity
        );


    if (
        quantity >
        availableQuantity
    ) {

        errors.push(
            createError(
                [
                    "items",
                    index,
                    "quantity",
                ],
                "Requested quantity exceeds available stock.",
                BILLING_VALIDATION_TYPE.STOCK_INSUFFICIENT,
                index
            )
        );

    }


    const expiryDate =
        item.expiryDate;


    if (
        expiryDate
    ) {

        const expiry =
            new Date(
                expiryDate
            );


        if (
            !Number.isNaN(
                expiry.getTime()
            ) &&
            expiry <
                new Date()
        ) {

            errors.push(
                createError(
                    [
                        "items",
                        index,
                        "expiryDate",
                    ],
                    "Selected batch is expired.",
                    BILLING_VALIDATION_TYPE.BATCH_EXPIRED,
                    index
                )
            );

        }

    }


    const discountValue =
        toNumber(
            item.discountValue
        );


    if (
        discountValue <
        0
    ) {

        errors.push(
            createError(
                [
                    "items",
                    index,
                    "discountValue",
                ],
                "Discount cannot be negative.",
                BILLING_VALIDATION_TYPE.DISCOUNT_INVALID,
                index
            )
        );

    }


    return errors;

};


/* =========================================================
   ITEMS VALIDATION
   ========================================================= */

export const validateBillItems = (
    items
) => {

    const safeItems =
        safeArray(
            items
        );

    const errors = [];


    if (
        safeItems.length ===
        0
    ) {

        errors.push(
            createError(
                [
                    "items",
                ],
                "At least one medicine is required.",
                BILLING_VALIDATION_TYPE.ITEM_REQUIRED
            )
        );


        return errors;

    }


    safeItems.forEach(
        (
            item,
            index
        ) => {

            errors.push(
                ...validateBillItem(
                    item,
                    index
                )
            );

        }
    );


    return errors;

};


/* =========================================================
   PAYMENT VALIDATION
   ========================================================= */

export const validateBillPayment = (
    bill = {}
) => {

    const errors = [];

    const grandTotal =
        calculateGrandTotal(
            bill.items
        );

    const payments =
        safeArray(
            bill.payments
        );

    const paidAmount =
        calculatePaidAmount(
            payments
        );


    if (
        grandTotal <= 0
    ) {

        return errors;

    }


    if (
        payments.length ===
        0
    ) {

        errors.push(
            createError(
                [
                    "payments",
                ],
                "Payment is required.",
                BILLING_VALIDATION_TYPE.PAYMENT_REQUIRED
            )
        );


        return errors;

    }


    if (
        paidAmount <
        grandTotal
    ) {

        const hasCredit =
            payments.some(
                payment =>
                    payment?.method ===
                    PAYMENT_METHOD.CREDIT
            );


        if (
            !hasCredit
        ) {

            errors.push(
                createError(
                    [
                        "payments",
                    ],
                    "Payment amount is incomplete.",
                    BILLING_VALIDATION_TYPE.PAYMENT_INCOMPLETE
                )
            );

        }

    }


    return errors;

};


/* =========================================================
   BILL VALIDATION
   ========================================================= */

export const validateBill = (
    bill = {},
    options = {}
) => {

    const errors = [];


    if (
        !bill.patientId &&
        !options.allowWalkIn
    ) {

        errors.push(
            createError(
                [
                    "patientId",
                ],
                "Patient is required.",
                BILLING_VALIDATION_TYPE.PATIENT_REQUIRED
            )
        );

    }


    errors.push(
        ...validateBillItems(
            bill.items
        )
    );


    if (
        options.validatePayment !==
        false
    ) {

        errors.push(
            ...validateBillPayment(
                bill
            )
        );

    }


    return errors;

};


/* =========================================================
   VALIDATION BOOLEAN
   ========================================================= */

export const isBillValid = (
    bill,
    options = {}
) => {

    return (
        validateBill(
            bill,
            options
        ).length === 0
    );

};


/* =========================================================
   VALIDATION SUMMARY
   ========================================================= */

export const getBillingValidationSummary = (
    errors
) => {

    const safeErrors =
        safeArray(
            errors
        );


    return {

        hasErrors:
            safeErrors.length >
            0,

        count:
            safeErrors.length,

        messages:
            safeErrors.map(
                error =>
                    error?.message ||
                    ""
            ).filter(
                Boolean
            ),

    };

};