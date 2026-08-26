// src/modules/purchase-management/grn/hooks/useGRNLookup.js

import {
    useCallback,
    useMemo,
} from "react";

import {
    GRN_STATUS,
    GRN_STATUS_LABELS,
    GRN_STATUS_OPTIONS,

    GRN_TYPE,
    GRN_TYPE_LABELS,
    GRN_TYPE_OPTIONS,

    GRN_QUALITY_STATUS,
    GRN_QUALITY_STATUS_LABELS,
    GRN_QUALITY_STATUS_OPTIONS,

    GRN_INSPECTION_STATUS,
    GRN_INSPECTION_STATUS_LABELS,
    GRN_INSPECTION_STATUS_OPTIONS,

    GRN_RECEIVING_MODE,
    GRN_RECEIVING_MODE_LABELS,
    GRN_RECEIVING_MODE_OPTIONS,

    GRN_STOCK_POSTING_STATUS,
    GRN_STOCK_POSTING_STATUS_LABELS,

} from "../constants/grn.constants";

import {
    grnList,
    grnPurchaseOrderList,
    grnSupplierList,
    grnStoreList,
    grnUserList,

    grnStatusLookup,
    grnTypeLookup,
    grnQualityStatusLookup,
    grnInspectionStatusLookup,
    grnReceivingModeLookup,
    grnStockPostingStatusLookup,

} from "../mock/grn.mock";


/* =========================================================
   SAFE ARRAY
   ========================================================= */

const safeArray = (
    value
) => {

    return Array.isArray(value)
        ? value
        : [];

};


/* =========================================================
   NORMALIZE SEARCH
   ========================================================= */

const normalizeSearch = (
    value
) => {

    return String(
        value ?? ""
    )
        .trim()
        .toLowerCase();

};


/* =========================================================
   USE GRN LOOKUP
   ========================================================= */

export const useGRNLookup = () => {


    /* =====================================================
       SAFE DATA
    ===================================================== */

    const safeGRNs =
        useMemo(
            () =>
                safeArray(
                    grnList
                ),
            []
        );


    const safePurchaseOrders =
        useMemo(
            () =>
                safeArray(
                    grnPurchaseOrderList
                ),
            []
        );


    const safeSuppliers =
        useMemo(
            () =>
                safeArray(
                    grnSupplierList
                ),
            []
        );


    const safeStores =
        useMemo(
            () =>
                safeArray(
                    grnStoreList
                ),
            []
        );


    const safeUsers =
        useMemo(
            () =>
                safeArray(
                    grnUserList
                ),
            []
        );


    /* =====================================================
       STATUS OPTIONS
    ===================================================== */

    const statusOptions =
        useMemo(
            () =>
                safeArray(
                    GRN_STATUS_OPTIONS
                ),
            []
        );


    const typeOptions =
        useMemo(
            () =>
                safeArray(
                    GRN_TYPE_OPTIONS
                ),
            []
        );


    const qualityStatusOptions =
        useMemo(
            () =>
                safeArray(
                    GRN_QUALITY_STATUS_OPTIONS
                ),
            []
        );


    const inspectionStatusOptions =
        useMemo(
            () =>
                safeArray(
                    GRN_INSPECTION_STATUS_OPTIONS
                ),
            []
        );


    const receivingModeOptions =
        useMemo(
            () =>
                safeArray(
                    GRN_RECEIVING_MODE_OPTIONS
                ),
            []
        );


    /* =====================================================
       LOOKUPS
    ===================================================== */

    const statusLookup =
        useMemo(
            () =>
                safeArray(
                    grnStatusLookup
                ),
            []
        );


    const typeLookup =
        useMemo(
            () =>
                safeArray(
                    grnTypeLookup
                ),
            []
        );


    const qualityStatusLookup =
        useMemo(
            () =>
                safeArray(
                    grnQualityStatusLookup
                ),
            []
        );


    const inspectionStatusLookup =
        useMemo(
            () =>
                safeArray(
                    grnInspectionStatusLookup
                ),
            []
        );


    const receivingModeLookup =
        useMemo(
            () =>
                safeArray(
                    grnReceivingModeLookup
                ),
            []
        );


    const stockPostingStatusLookup =
        useMemo(
            () =>
                safeArray(
                    grnStockPostingStatusLookup
                ),
            []
        );


    /* =====================================================
       GET GRN BY ID
    ===================================================== */

    const getGRNById =
        useCallback(
            (
                id
            ) => {

                if (
                    id ===
                    undefined ||
                    id ===
                    null
                ) {

                    return null;

                }


                return (
                    safeGRNs.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(id)
                    ) ||
                    null
                );

            },
            [
                safeGRNs,
            ]
        );


    /* =====================================================
       GET GRN BY NUMBER
    ===================================================== */

    const getGRNByNumber =
        useCallback(
            (
                grnNumber
            ) => {

                const searchValue =
                    normalizeSearch(
                        grnNumber
                    );


                if (
                    !searchValue
                ) {

                    return null;

                }


                return (
                    safeGRNs.find(
                        item =>
                            normalizeSearch(
                                item?.grnNumber
                            ) ===
                            searchValue
                    ) ||
                    null
                );

            },
            [
                safeGRNs,
            ]
        );


    /* =====================================================
       GET PURCHASE ORDER
    ===================================================== */

    const getPurchaseOrderById =
        useCallback(
            (
                id
            ) => {

                if (
                    id ===
                    undefined ||
                    id ===
                    null
                ) {

                    return null;

                }


                return (
                    safePurchaseOrders.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(id)
                    ) ||
                    null
                );

            },
            [
                safePurchaseOrders,
            ]
        );


    /* =====================================================
       GET PURCHASE ORDER BY NUMBER
    ===================================================== */

    const getPurchaseOrderByNumber =
        useCallback(
            (
                poNumber
            ) => {

                const searchValue =
                    normalizeSearch(
                        poNumber
                    );


                if (
                    !searchValue
                ) {

                    return null;

                }


                return (
                    safePurchaseOrders.find(
                        item =>
                            normalizeSearch(
                                item?.poNumber
                            ) ===
                            searchValue
                    ) ||
                    null
                );

            },
            [
                safePurchaseOrders,
            ]
        );


    /* =====================================================
       APPROVED PURCHASE ORDERS
    ===================================================== */

    const approvedPurchaseOrders =
        useMemo(
            () =>
                safePurchaseOrders.filter(
                    item =>
                        String(
                            item?.status
                        ).toUpperCase() ===
                        "APPROVED"
                ),
            [
                safePurchaseOrders,
            ]
        );


    /* =====================================================
       GET SUPPLIER
    ===================================================== */

    const getSupplierById =
        useCallback(
            (
                id
            ) => {

                if (
                    id ===
                    undefined ||
                    id ===
                    null
                ) {

                    return null;

                }


                return (
                    safeSuppliers.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(id)
                    ) ||
                    null
                );

            },
            [
                safeSuppliers,
            ]
        );


    /* =====================================================
       GET SUPPLIER BY CODE
    ===================================================== */

    const getSupplierByCode =
        useCallback(
            (
                code
            ) => {

                const searchValue =
                    normalizeSearch(
                        code
                    );


                if (
                    !searchValue
                ) {

                    return null;

                }


                return (
                    safeSuppliers.find(
                        item =>
                            normalizeSearch(
                                item?.supplierCode
                            ) ===
                            searchValue
                    ) ||
                    null
                );

            },
            [
                safeSuppliers,
            ]
        );


    /* =====================================================
       SEARCH SUPPLIERS
    ===================================================== */

    const searchSuppliers =
        useCallback(
            (
                searchValue
            ) => {

                const query =
                    normalizeSearch(
                        searchValue
                    );


                if (
                    !query
                ) {

                    return safeSuppliers;

                }


                return safeSuppliers.filter(
                    supplier => {

                        const code =
                            normalizeSearch(
                                supplier?.supplierCode
                            );

                        const name =
                            normalizeSearch(
                                supplier?.supplierName
                            );

                        const phone =
                            normalizeSearch(
                                supplier?.phone
                            );


                        return (
                            code.includes(query) ||
                            name.includes(query) ||
                            phone.includes(query)
                        );

                    }
                );

            },
            [
                safeSuppliers,
            ]
        );


    /* =====================================================
       GET STORE
    ===================================================== */

    const getStoreById =
        useCallback(
            (
                id
            ) => {

                if (
                    id ===
                    undefined ||
                    id ===
                    null
                ) {

                    return null;

                }


                return (
                    safeStores.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(id)
                    ) ||
                    null
                );

            },
            [
                safeStores,
            ]
        );


    /* =====================================================
       SEARCH STORES
    ===================================================== */

    const searchStores =
        useCallback(
            (
                searchValue
            ) => {

                const query =
                    normalizeSearch(
                        searchValue
                    );


                if (
                    !query
                ) {

                    return safeStores;

                }


                return safeStores.filter(
                    store => {

                        const code =
                            normalizeSearch(
                                store?.storeCode
                            );

                        const name =
                            normalizeSearch(
                                store?.storeName
                            );

                        const location =
                            normalizeSearch(
                                store?.location
                            );


                        return (
                            code.includes(query) ||
                            name.includes(query) ||
                            location.includes(query)
                        );

                    }
                );

            },
            [
                safeStores,
            ]
        );


    /* =====================================================
       GET USER
    ===================================================== */

    const getUserById =
        useCallback(
            (
                id
            ) => {

                if (
                    id ===
                    undefined ||
                    id ===
                    null
                ) {

                    return null;

                }


                return (
                    safeUsers.find(
                        item =>
                            String(
                                item?.id
                            ) ===
                            String(id)
                    ) ||
                    null
                );

            },
            [
                safeUsers,
            ]
        );


    /* =====================================================
       GET PO ITEM PENDING QUANTITY
    ===================================================== */

    const getPendingQuantity =
        useCallback(
            (
                item = {}
            ) => {

                const ordered =
                    Number(
                        item?.orderedQuantity
                    ) || 0;


                const previous =
                    Number(
                        item?.previouslyReceivedQuantity
                    ) || 0;


                const explicitPending =
                    Number(
                        item?.pendingQuantity
                    );


                if (
                    Number.isFinite(
                        explicitPending
                    ) &&
                    explicitPending >= 0
                ) {

                    return explicitPending;

                }


                return Math.max(
                    0,
                    ordered - previous
                );

            },
            []
        );


    /* =====================================================
       GET PO RECEIVABLE ITEMS
    ===================================================== */

    const getReceivableItems =
        useCallback(
            (
                purchaseOrder
            ) => {

                const items =
                    safeArray(
                        purchaseOrder?.items
                    );


                return items
                    .map(
                        item => ({

                            ...item,

                            pendingQuantity:
                                getPendingQuantity(
                                    item
                                ),

                        })
                    )
                    .filter(
                        item =>
                            Number(
                                item?.pendingQuantity
                            ) > 0
                    );

            },
            [
                getPendingQuantity,
            ]
        );


    /* =====================================================
       GET PO DETAILS FOR GRN
    ===================================================== */

    const getPurchaseOrderForGRN =
        useCallback(
            (
                purchaseOrderId
            ) => {

                const purchaseOrder =
                    getPurchaseOrderById(
                        purchaseOrderId
                    );


                if (
                    !purchaseOrder
                ) {

                    return null;

                }


                const supplier =
                    getSupplierById(
                        purchaseOrder?.supplierId
                    );


                const store =
                    getStoreById(
                        purchaseOrder?.storeId
                    );


                return {

                    ...purchaseOrder,

                    supplier:
                        supplier ||
                        null,

                    store:
                        store ||
                        null,

                    items:
                        getReceivableItems(
                            purchaseOrder
                        ),

                };

            },
            [
                getPurchaseOrderById,
                getSupplierById,
                getStoreById,
                getReceivableItems,
            ]
        );


    /* =====================================================
       SEARCH PURCHASE ORDERS
    ===================================================== */

    const searchPurchaseOrders =
        useCallback(
            (
                searchValue
            ) => {

                const query =
                    normalizeSearch(
                        searchValue
                    );


                const source =
                    approvedPurchaseOrders;


                if (
                    !query
                ) {

                    return source;

                }


                return source.filter(
                    purchaseOrder => {

                        const number =
                            normalizeSearch(
                                purchaseOrder?.poNumber
                            );

                        const supplier =
                            normalizeSearch(
                                purchaseOrder?.supplierName
                            );


                        return (
                            number.includes(query) ||
                            supplier.includes(query)
                        );

                    }
                );

            },
            [
                approvedPurchaseOrders,
            ]
        );


    /* =====================================================
       STATUS LABEL
    ===================================================== */

    const getStatusLabel =
        useCallback(
            (
                status
            ) => {

                return (
                    GRN_STATUS_LABELS?.[
                        status
                    ] ||
                    status ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       TYPE LABEL
    ===================================================== */

    const getTypeLabel =
        useCallback(
            (
                type
            ) => {

                return (
                    GRN_TYPE_LABELS?.[
                        type
                    ] ||
                    type ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       QUALITY STATUS LABEL
    ===================================================== */

    const getQualityStatusLabel =
        useCallback(
            (
                status
            ) => {

                return (
                    GRN_QUALITY_STATUS_LABELS?.[
                        status
                    ] ||
                    status ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       INSPECTION STATUS LABEL
    ===================================================== */

    const getInspectionStatusLabel =
        useCallback(
            (
                status
            ) => {

                return (
                    GRN_INSPECTION_STATUS_LABELS?.[
                        status
                    ] ||
                    status ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       RECEIVING MODE LABEL
    ===================================================== */

    const getReceivingModeLabel =
        useCallback(
            (
                mode
            ) => {

                return (
                    GRN_RECEIVING_MODE_LABELS?.[
                        mode
                    ] ||
                    mode ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       STOCK POSTING LABEL
    ===================================================== */

    const getStockPostingStatusLabel =
        useCallback(
            (
                status
            ) => {

                return (
                    GRN_STOCK_POSTING_STATUS_LABELS?.[
                        status
                    ] ||
                    status ||
                    "-"
                );

            },
            []
        );


    /* =====================================================
       RETURN API
    ===================================================== */

    return {

        /* Data */

        grnList:
            safeGRNs,

        purchaseOrderList:
            safePurchaseOrders,

        approvedPurchaseOrders,

        supplierList:
            safeSuppliers,

        storeList:
            safeStores,

        userList:
            safeUsers,


        /* Options */

        statusOptions,

        typeOptions,

        qualityStatusOptions,

        inspectionStatusOptions,

        receivingModeOptions,


        /* Lookups */

        statusLookup,

        typeLookup,

        qualityStatusLookup,

        inspectionStatusLookup,

        receivingModeLookup,

        stockPostingStatusLookup,


        /* GRN */

        getGRNById,

        getGRNByNumber,


        /* PO */

        getPurchaseOrderById,

        getPurchaseOrderByNumber,

        getPurchaseOrderForGRN,

        searchPurchaseOrders,

        getReceivableItems,

        getPendingQuantity,


        /* Supplier */

        getSupplierById,

        getSupplierByCode,

        searchSuppliers,


        /* Store */

        getStoreById,

        searchStores,


        /* User */

        getUserById,


        /* Labels */

        getStatusLabel,

        getTypeLabel,

        getQualityStatusLabel,

        getInspectionStatusLabel,

        getReceivingModeLabel,

        getStockPostingStatusLabel,


        /* Constants */

        GRN_STATUS,

        GRN_TYPE,

        GRN_QUALITY_STATUS,

        GRN_INSPECTION_STATUS,

        GRN_RECEIVING_MODE,

        GRN_STOCK_POSTING_STATUS,

    };

};


export default useGRNLookup;