// src/modules/billing/hooks/useBillingCart.js

import {
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    calculateBillTotals,
    calculateBillingItem,
} from "../utils/billing.calculation";

import {
    normalizeBillItem,
    toNumber,
} from "../utils/billing.helper";


/* =========================================================
   HOOK
   ========================================================= */

const useBillingCart = (
    initialItems = []
) => {

    const [
        items,
        setItems,
    ] = useState(
        Array.isArray(initialItems)
            ? initialItems
            : []
    );


    /* =====================================================
       NORMALIZE ITEM
       ===================================================== */

    const normalizeItem = useCallback(
        (
            item = {}
        ) => {

            const normalized =
                normalizeBillItem(
                    item
                );


            return calculateBillingItem(
                normalized
            );

        },
        []
    );


    /* =====================================================
       ADD ITEM
       ===================================================== */

    const addItem = useCallback(
        (
            incomingItem
        ) => {

            if (
                !incomingItem
            ) {

                return;

            }


            const newItem =
                normalizeItem(
                    incomingItem
                );


            setItems(
                currentItems => {

                    const existingIndex =
                        currentItems.findIndex(
                            currentItem =>

                                currentItem?.medicineId ===
                                newItem?.medicineId &&

                                (
                                    currentItem?.batchId ||
                                    null
                                ) ===
                                (
                                    newItem?.batchId ||
                                    null
                                )
                        );


                    /* =====================================
                       NEW MEDICINE / BATCH
                    ===================================== */

                    if (
                        existingIndex ===
                        -1
                    ) {

                        return [
                            ...currentItems,
                            newItem,
                        ];

                    }


                    /* =====================================
                       SAME MEDICINE + SAME BATCH

                       Increase quantity instead of
                       creating duplicate row.
                    ===================================== */

                    const existingItem =
                        currentItems[
                        existingIndex
                        ];


                    const existingQuantity =
                        toNumber(
                            existingItem?.quantity
                        );


                    const incomingQuantity =
                        toNumber(
                            newItem?.quantity
                        ) ||
                        1;


                    const availableQuantity =
                        toNumber(
                            existingItem
                                ?.availableQuantity ??
                            newItem
                                ?.availableQuantity
                        );


                    let nextQuantity =
                        existingQuantity +
                        incomingQuantity;


                    if (
                        availableQuantity > 0
                    ) {

                        nextQuantity =
                            Math.min(
                                nextQuantity,
                                availableQuantity
                            );

                    }


                    const updatedItem =
                        calculateBillingItem({

                            ...existingItem,

                            quantity:
                                nextQuantity,

                        });


                    const updatedItems =
                        [
                            ...currentItems,
                        ];


                    updatedItems[
                        existingIndex
                    ] =
                        updatedItem;


                    return updatedItems;

                }
            );

        },
        [
            normalizeItem,
        ]
    );


    /* =====================================================
       UPDATE ITEM
       ===================================================== */

    const updateItem = useCallback(
        (
            itemId,
            patch = {}
        ) => {

            setItems(
                currentItems =>

                    currentItems.map(
                        item => {

                            if (
                                item?.id !==
                                itemId
                            ) {

                                return item;

                            }


                            return calculateBillingItem({

                                ...item,

                                ...patch,

                            });

                        }
                    )
            );

        },
        []
    );


    /* =====================================================
       UPDATE QUANTITY
       ===================================================== */

    const updateQuantity =
        useCallback(
            (
                itemId,
                quantity
            ) => {

                setItems(
                    currentItems =>

                        currentItems.map(
                            item => {

                                if (
                                    item?.id !==
                                    itemId
                                ) {

                                    return item;

                                }


                                const requestedQuantity =
                                    Math.max(
                                        0,
                                        toNumber(
                                            quantity
                                        )
                                    );


                                const availableQuantity =
                                    toNumber(
                                        item?.availableQuantity
                                    );


                                const finalQuantity =
                                    availableQuantity > 0
                                        ? Math.min(
                                            requestedQuantity,
                                            availableQuantity
                                        )
                                        : requestedQuantity;


                                return calculateBillingItem({

                                    ...item,

                                    quantity:
                                        finalQuantity,

                                });

                            }
                        )
                );

            },
            []
        );


    /* =====================================================
       REMOVE ITEM
       ===================================================== */

    const removeItem =
        useCallback(
            (
                itemId
            ) => {

                setItems(
                    currentItems =>
                        currentItems.filter(
                            item =>
                                item?.id !==
                                itemId
                        )
                );

            },
            []
        );


    /* =====================================================
       CLEAR CART
       ===================================================== */

    const clearCart =
        useCallback(
            () => {

                setItems([]);

            },
            []
        );


    /* =====================================================
       REPLACE CART
       ===================================================== */

    const setCartItems =
        useCallback(
            (
                nextItems = []
            ) => {

                const safeItems =
                    Array.isArray(
                        nextItems
                    )
                        ? nextItems
                        : [];


                setItems(
                    safeItems.map(
                        item =>
                            normalizeItem(
                                item
                            )
                    )
                );

            },
            [
                normalizeItem,
            ]
        );



    /* =====================================================
   TOTALS
===================================================== */

    const totals =
        useMemo(
            () =>
                calculateBillTotals(
                    items,
                    [],
                    null
                ),
            [
                items,
            ]
        );


    /* =====================================================
       SUMMARY
       ===================================================== */

    const summary =
        useMemo(
            () => {

                const totalQuantity =
                    items.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            toNumber(
                                item?.quantity
                            ),
                        0
                    );


                return {

                    itemCount:
                        items.length,

                    totalQuantity,

                    subtotal:
                        totals.subtotal,

                    discountAmount:
                        totals.discountAmount,

                    taxAmount:
                        totals.taxAmount,

                    roundOff:
                        totals.roundOff,

                    grandTotal:
                        totals.grandTotal,

                };

            },
            [
                items,
                totals,
            ]
        );


    /* =====================================================
       RETURN
       ===================================================== */

    return {

        /* Items */

        items,

        setItems:
            setCartItems,

        setCartItems,


        /* CRUD */

        addItem,

        updateItem,

        updateQuantity,

        removeItem,

        clearCart,


        /* Calculations */

        subtotal:
            totals.subtotal,

        discountAmount:
            totals.discountAmount,

        taxAmount:
            totals.taxAmount,

        roundOff:
            totals.roundOff,

        grandTotal:
            totals.grandTotal,


        /* Summary */

        summary,

        totals,

    };

};


export default useBillingCart;