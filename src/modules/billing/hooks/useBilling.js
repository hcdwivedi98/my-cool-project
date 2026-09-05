// src/modules/billing/hooks/useBilling.js

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    BILL_STATUS,
} from "../constants/billing.constants";

import billingService from "../services/billing.service";

import {
    calculateBill,
} from "../utils/billing.calculation";

import {
    normalizeBill,
    safeArray,
} from "../utils/billing.helper";

import {
    validateBill,
} from "../utils/billing.validation";

import {
    canTransitionBillStatus,
} from "../utils/billing.workflow";


/* =========================================================
   HOOK
   ========================================================= */

const useBilling = (
    initialBill = {}
) => {

    const [
        bill,
        setBill,
    ] = useState(
        () =>
            normalizeBill(
                initialBill
            )
    );


    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState(null);


    const [
        validationErrors,
        setValidationErrors,
    ] = useState([]);


    /* =====================================================
       UPDATE BILL
       ===================================================== */

    const updateBill = useCallback(
        (
            patch = {}
        ) => {

            setBill(
                currentBill =>
                    normalizeBill(
                        {
                            ...currentBill,
                            ...patch,
                        }
                    )
            );

        },
        []
    );


    /* =====================================================
       SET BILL
       ===================================================== */

    const setBillingData = useCallback(
        (
            data = {}
        ) => {

            setBill(
                normalizeBill(
                    data
                )
            );

        },
        []
    );


    /* =====================================================
       SET ITEMS
       ===================================================== */

    const setItems = useCallback(
        (
            items = []
        ) => {

            const nextItems =
                safeArray(
                    items
                );


            setBill(
                currentBill => {

                    const currentItems =
                        safeArray(
                            currentBill.items
                        );


                    if (
                        JSON.stringify(
                            currentItems
                        ) ===
                        JSON.stringify(
                            nextItems
                        )
                    ) {

                        return currentBill;

                    }


                    return calculateBill(
                        {
                            ...currentBill,

                            items:
                                nextItems,
                        }
                    );

                }
            );

        },
        []
    );


    /* =====================================================
       ADD ITEM
       ===================================================== */

    const addItem = useCallback(
        (
            item
        ) => {

            if (!item) {
                return;
            }


            setBill(
                currentBill =>
                    calculateBill(
                        {
                            ...currentBill,

                            items: [

                                ...safeArray(
                                    currentBill.items
                                ),

                                item,

                            ],
                        }
                    )
            );

        },
        []
    );


    /* =====================================================
       REMOVE ITEM
       ===================================================== */

    const removeItem = useCallback(
        (
            itemId
        ) => {

            setBill(
                currentBill =>
                    calculateBill(
                        {
                            ...currentBill,

                            items:
                                safeArray(
                                    currentBill.items
                                ).filter(
                                    item =>
                                        item.id !==
                                        itemId
                                ),
                        }
                    )
            );

        },
        []
    );


    /* =====================================================
       SET PAYMENTS
       ===================================================== */

    const setPayments = useCallback(
        (
            payments = []
        ) => {

            const nextPayments =
                safeArray(
                    payments
                );


            setBill(
                currentBill => {

                    const currentPayments =
                        safeArray(
                            currentBill.payments
                        );


                    if (
                        JSON.stringify(
                            currentPayments
                        ) ===
                        JSON.stringify(
                            nextPayments
                        )
                    ) {

                        return currentBill;

                    }


                    return calculateBill(
                        {
                            ...currentBill,

                            payments:
                                nextPayments,
                        }
                    );

                }
            );

        },
        []
    );


    /* =====================================================
       VALIDATE
       ===================================================== */

    const validate = useCallback(
        (
            options = {}
        ) => {

            const currentBill =
                calculateBill(
                    bill
                );


            const errors =
                validateBill(
                    currentBill,
                    options
                );


            setValidationErrors(
                errors
            );


            return errors;

        },
        [
            bill,
        ]
    );


    /* =====================================================
       CLEAR ERRORS
       ===================================================== */

    const clearErrors = useCallback(
        () => {

            setError(null);

            setValidationErrors([]);

        },
        []
    );


    /* =====================================================
       CREATE DRAFT
       ===================================================== */

    const saveDraft = useCallback(
        async (
            payload = null
        ) => {

            setLoading(true);

            setError(null);


            try {

                const currentBill =
                    calculateBill(
                        bill
                    );


                const errors =
                    validateBill(
                        currentBill,
                        {
                            validatePayment:
                                false,
                        }
                    );


                setValidationErrors(
                    errors
                );


                if (
                    errors.length >
                    0
                ) {

                    return {

                        success:
                            false,

                        errors,

                    };

                }


                const result =
                    await billingService
                        .createBillDraft(
                            payload ||
                            currentBill
                        );


                if (
                    result
                ) {

                    setBill(
                        normalizeBill(
                            result?.data ||
                            result
                        )
                    );

                }


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        [
            bill,
        ]
    );


    /* =====================================================
       UPDATE DRAFT
       ===================================================== */

    const updateDraft = useCallback(
        async (
            id,
            payload = null
        ) => {

            setLoading(true);

            setError(null);


            try {

                const currentBill =
                    calculateBill(
                        bill
                    );


                const result =
                    await billingService
                        .updateBillDraft(
                            id,
                            payload ||
                            currentBill
                        );


                if (
                    result
                ) {

                    setBill(
                        normalizeBill(
                            result?.data ||
                            result
                        )
                    );

                }


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        [
            bill,
        ]
    );


    /* =====================================================
       CONFIRM BILL
       ===================================================== */

    const confirm = useCallback(
        async (
            id,
            payload = {}
        ) => {

            setLoading(true);

            setError(null);


            try {

                const currentBill =
                    calculateBill(
                        bill
                    );


                const errors =
                    validateBill(
                        currentBill
                    );


                setValidationErrors(
                    errors
                );


                if (
                    errors.length >
                    0
                ) {

                    return {

                        success:
                            false,

                        errors,

                    };

                }


                if (
                    id &&
                    !canTransitionBillStatus(
                        currentBill.status,
                        BILL_STATUS.CONFIRMED
                    )
                ) {

                    throw new Error(
                        `Bill cannot be confirmed from status ${currentBill.status}.`
                    );

                }


                const result =
                    await billingService
                        .confirmBill(
                            id ||
                            currentBill.id,
                            payload
                        );


                if (
                    result
                ) {

                    setBill(
                        normalizeBill(
                            result?.data ||
                            result
                        )
                    );

                }


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        [
            bill,
        ]
    );


    /* =====================================================
       COMPLETE BILL
       ===================================================== */

    const complete = useCallback(
        async (
            id,
            payload = {}
        ) => {

            setLoading(true);

            setError(null);


            try {

                const currentBill =
                    calculateBill(
                        bill
                    );


                const errors =
                    validateBill(
                        currentBill
                    );


                setValidationErrors(
                    errors
                );


                if (
                    errors.length >
                    0
                ) {

                    return {

                        success:
                            false,

                        errors,

                    };

                }


                const result =
                    await billingService
                        .completeBill(
                            id ||
                            currentBill.id,
                            payload
                        );


                if (
                    result
                ) {

                    setBill(
                        normalizeBill(
                            result?.data ||
                            result
                        )
                    );

                }


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        [
            bill,
        ]
    );


    /* =====================================================
       CANCEL
       ===================================================== */

    const cancel = useCallback(
        async (
            id,
            payload = {}
        ) => {

            setLoading(true);

            setError(null);


            try {

                const result =
                    await billingService
                        .cancelBill(
                            id ||
                            bill.id,
                            payload
                        );


                if (
                    result
                ) {

                    setBill(
                        normalizeBill(
                            result?.data ||
                            result
                        )
                    );

                }


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        [
            bill.id,
        ]
    );


    /* =====================================================
       LOAD BILL
       ===================================================== */

    const loadBill = useCallback(
        async (
            id
        ) => {

            if (!id) {

                return {

                    success:
                        false,

                    error:
                        new Error(
                            "Bill ID is required."
                        ),

                };

            }


            setLoading(true);

            setError(null);


            try {

                const result =
                    await billingService
                        .getBillById(
                            id
                        );


                setBill(
                    normalizeBill(
                        result?.data ||
                        result
                    )
                );


                return {

                    success:
                        true,

                    data:
                        result,

                };

            } catch (
            requestError
            ) {

                setError(
                    requestError
                );


                return {

                    success:
                        false,

                    error:
                        requestError,

                };

            } finally {

                setLoading(false);

            }

        },
        []
    );


    /* =====================================================
       TOTALS
       ===================================================== */

    const calculatedBill =
        useMemo(
            () =>
                calculateBill(
                    bill
                ),
            [
                bill,
            ]
        );


    /* =====================================================
       RETURN
       ===================================================== */

    return {

        bill:
            calculatedBill,

        loading,

        error,

        validationErrors,

        updateBill,

        setBillingData,

        setItems,

        addItem,

        removeItem,

        setPayments,

        validate,

        clearErrors,

        loadBill,

        saveDraft,

        updateDraft,

        confirm,

        complete,

        cancel,

        totals: {

            subtotal:
                calculatedBill.subtotal,

            discountAmount:
                calculatedBill.discountAmount,

            taxAmount:
                calculatedBill.taxAmount,

            roundOff:
                calculatedBill.roundOff,

            grandTotal:
                calculatedBill.grandTotal,

            paidAmount:
                calculatedBill.paidAmount,

            dueAmount:
                calculatedBill.dueAmount,

        },

    };

};


export default useBilling;