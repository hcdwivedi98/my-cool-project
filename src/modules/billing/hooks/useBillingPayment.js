// src/modules/billing/hooks/useBillingPayment.js

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    PAYMENT_METHOD,
} from "../constants/billing.constants";

import {
    calculateBillTotals,
} from "../utils/billing.calculation";

import {
    safeArray,
    toNumber,
} from "../utils/billing.helper";


/* =========================================================
   CREATE PAYMENT ID
   ========================================================= */

const createPaymentId = () => {

    return (
        `PAY-${Date.now()}-` +
        Math.random()
            .toString(36)
            .slice(2, 8)
    );

};


/* =========================================================
   NORMALIZE PAYMENT
   ========================================================= */

const normalizePayment = (
    payment = {},
    activeMethod = PAYMENT_METHOD.CASH
) => {

    return {

        id:
            payment.id ||
            createPaymentId(),

        method:
            payment.method ||
            activeMethod,

        amount:
            Math.max(
                0,
                toNumber(
                    payment.amount
                )
            ),

        reference:
            payment.reference ||
            "",

        remarks:
            payment.remarks ||
            "",

    };

};


/* =========================================================
   HOOK
   ========================================================= */

const useBillingPayment = (
    grandTotal = 0,
    initialPayments = []
) => {

    const [
        payments,
        setPayments,
    ] = useState(
        () =>
            safeArray(
                initialPayments
            ).map(
                payment =>
                    normalizePayment(
                        payment
                    )
            )
    );


    const [
        activeMethod,
        setActiveMethod,
    ] = useState(
        PAYMENT_METHOD.CASH
    );


    /* =====================================================
       REMAINING AMOUNT
    ===================================================== */

    const paidAmount =
        useMemo(
            () => {

                return safeArray(
                    payments
                ).reduce(
                    (
                        total,
                        payment
                    ) =>
                        total +
                        toNumber(
                            payment.amount
                        ),
                    0
                );

            },
            [
                payments,
            ]
        );


    const remainingAmount =
        useMemo(
            () => {

                return Math.max(
                    0,
                    toNumber(
                        grandTotal
                    ) -
                    paidAmount
                );

            },
            [
                grandTotal,
                paidAmount,
            ]
        );


    /* =====================================================
       ADD PAYMENT
    ===================================================== */

    const addPayment = useCallback(
        (
            payment = {}
        ) => {

            const method =
                payment.method ||
                activeMethod;


            const amount =
                toNumber(
                    payment.amount
                );


            if (
                amount <= 0
            ) {

                return {

                    success:
                        false,

                    error:
                        "Payment amount must be greater than zero.",

                };

            }


            const currentPaid =
                safeArray(
                    payments
                ).reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        toNumber(
                            item.amount
                        ),
                    0
                );


            const currentRemaining =
                Math.max(
                    0,
                    toNumber(
                        grandTotal
                    ) -
                    currentPaid
                );


            /* =============================================
               NON-CASH OVERPAYMENT
            ============================================= */

            if (
                method !==
                    PAYMENT_METHOD.CASH &&
                amount >
                    currentRemaining
            ) {

                return {

                    success:
                        false,

                    error:
                        "Non-cash payment cannot exceed the remaining amount.",

                };

            }


            const nextPayment =
                normalizePayment(
                    payment,
                    activeMethod
                );


            setPayments(
                currentPayments => [

                    ...currentPayments,

                    nextPayment,

                ]
            );


            return {

                success:
                    true,

                payment:
                    nextPayment,

            };

        },
        [
            activeMethod,
            grandTotal,
            payments,
        ]
    );


    /* =====================================================
       UPDATE PAYMENT
    ===================================================== */

    const updatePayment = useCallback(
        (
            paymentId,
            patch = {}
        ) => {

            setPayments(
                currentPayments => {

                    return currentPayments.map(
                        payment => {

                            if (
                                payment.id !==
                                paymentId
                            ) {

                                return payment;

                            }


                            return {

                                ...payment,

                                ...patch,

                                amount:
                                    Math.max(
                                        0,
                                        toNumber(
                                            patch.amount ??
                                            payment.amount
                                        )
                                    ),

                            };

                        }
                    );

                }
            );

        },
        []
    );


    /* =====================================================
       REMOVE PAYMENT
    ===================================================== */

    const removePayment = useCallback(
        (
            paymentId
        ) => {

            setPayments(
                currentPayments =>
                    currentPayments.filter(
                        payment =>
                            payment.id !==
                            paymentId
                    )
            );

        },
        []
    );


    /* =====================================================
       CLEAR PAYMENTS
    ===================================================== */

    const clearPayments = useCallback(
        () => {

            setPayments([]);

        },
        []
    );


    /* =====================================================
       SET PAYMENT LIST
    ===================================================== */

    const setPaymentList = useCallback(
        (
            nextPayments = []
        ) => {

            setPayments(
                safeArray(
                    nextPayments
                ).map(
                    payment =>
                        normalizePayment(
                            payment
                        )
                )
            );

        },
        []
    );


    /* =====================================================
       PAYMENT TOTALS
    ===================================================== */

    const totals =
        useMemo(
            () =>
                calculateBillTotals(
                    [],
                    payments,
                    grandTotal
                ),
            [
                payments,
                grandTotal,
            ]
        );


    /* =====================================================
       PAYMENT SUMMARY
    ===================================================== */

    const paymentSummary =
        useMemo(
            () => ({

                grandTotal:
                    toNumber(
                        grandTotal
                    ),

                paidAmount:
                    totals.paidAmount,

                dueAmount:
                    Math.max(
                        0,
                        toNumber(
                            grandTotal
                        ) -
                        totals.paidAmount
                    ),

                changeAmount:
                    Math.max(
                        0,
                        totals.paidAmount -
                        toNumber(
                            grandTotal
                        )
                    ),

                remainingAmount:
                    Math.max(
                        0,
                        toNumber(
                            grandTotal
                        ) -
                        totals.paidAmount
                    ),

                paymentStatus:
                    totals.paymentStatus,

                isFullyPaid:
                    totals.paidAmount >=
                    toNumber(
                        grandTotal
                    ),

                isPartiallyPaid:
                    totals.paidAmount > 0 &&
                    totals.paidAmount <
                    toNumber(
                        grandTotal
                    ),

                isOverpaid:
                    totals.paidAmount >
                    toNumber(
                        grandTotal
                    ),

            }),
            [
                grandTotal,
                totals,
            ]
        );


    /* =====================================================
       RETURN
    ===================================================== */

    return {

        payments,

        activeMethod,

        setActiveMethod,

        addPayment,

        updatePayment,

        removePayment,

        clearPayments,

        setPaymentList,

        paidAmount,

        remainingAmount,

        ...paymentSummary,

    };

};


export default useBillingPayment;