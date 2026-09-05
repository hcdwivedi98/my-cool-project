// src/modules/billing/utils/billing.workflow.js

import {
    BILL_STATUS,
} from "../constants/billing.constants";


/* =========================================================
   ALLOWED TRANSITIONS
   ========================================================= */

export const BILL_STATUS_TRANSITIONS = {

    [BILL_STATUS.DRAFT]: [

        BILL_STATUS.CONFIRMED,

        BILL_STATUS.CANCELLED,

    ],


    [BILL_STATUS.CONFIRMED]: [

        BILL_STATUS.COMPLETED,

        BILL_STATUS.CANCELLED,

    ],


    [BILL_STATUS.COMPLETED]: [

        BILL_STATUS.PARTIALLY_RETURNED,

        BILL_STATUS.RETURNED,

    ],


    [BILL_STATUS.PARTIALLY_RETURNED]: [

        BILL_STATUS.RETURNED,

    ],


    [BILL_STATUS.CANCELLED]: [],


    [BILL_STATUS.RETURNED]: [],

};


/* =========================================================
   CHECK TRANSITION
   ========================================================= */

export const canTransitionBillStatus = (
    currentStatus,
    nextStatus
) => {

    const allowed =
        BILL_STATUS_TRANSITIONS[
            currentStatus
        ] || [];


    return allowed.includes(
        nextStatus
    );

};


/* =========================================================
   GET NEXT STATUSES
   ========================================================= */

export const getAllowedNextBillStatuses = (
    currentStatus
) => {

    return [
        ...(
            BILL_STATUS_TRANSITIONS[
                currentStatus
            ] || []
        ),
    ];

};


/* =========================================================
   ASSERT TRANSITION
   ========================================================= */

export const assertBillStatusTransition = (
    currentStatus,
    nextStatus
) => {

    if (
        !canTransitionBillStatus(
            currentStatus,
            nextStatus
        )
    ) {

        throw new Error(
            `Invalid bill status transition: ${currentStatus} → ${nextStatus}`
        );

    }


    return true;

};


/* =========================================================
   WORKFLOW ACTIONS
   ========================================================= */

export const getBillWorkflowActions = (
    status
) => {

    switch (
        status
    ) {

        case BILL_STATUS.DRAFT:

            return [

                "EDIT",

                "CONFIRM",

                "CANCEL",

            ];


        case BILL_STATUS.CONFIRMED:

            return [

                "COMPLETE",

                "CANCEL",

            ];


        case BILL_STATUS.COMPLETED:

            return [

                "VIEW",

                "REPRINT",

                "RETURN",

            ];


        case BILL_STATUS.PARTIALLY_RETURNED:

            return [

                "VIEW",

                "REPRINT",

                "RETURN",

            ];


        case BILL_STATUS.RETURNED:

            return [

                "VIEW",

                "REPRINT",

            ];


        case BILL_STATUS.CANCELLED:

            return [

                "VIEW",

                "REPRINT",

            ];


        default:

            return [];

    }

};


/* =========================================================
   WORKFLOW STATUS HELPERS
   ========================================================= */

export const isDraftBill = (
    status
) => {

    return status ===
        BILL_STATUS.DRAFT;

};


export const isConfirmedBill = (
    status
) => {

    return status ===
        BILL_STATUS.CONFIRMED;

};


export const isCompletedBill = (
    status
) => {

    return status ===
        BILL_STATUS.COMPLETED;

};


export const isCancelledBill = (
    status
) => {

    return status ===
        BILL_STATUS.CANCELLED;

};


export const canEditBill = (
    status
) => {

    return (
        status ===
        BILL_STATUS.DRAFT
    );

};


export const canCancelBill = (
    status
) => {

    return (
        status ===
            BILL_STATUS.DRAFT ||
        status ===
            BILL_STATUS.CONFIRMED
    );

};


export const canReturnBill = (
    status
) => {

    return (
        status ===
            BILL_STATUS.COMPLETED ||
        status ===
            BILL_STATUS.PARTIALLY_RETURNED
    );

};