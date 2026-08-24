// src/modules/purchase-management/purchase-order/query/purchaseOrder.query.js


/* =========================================================
   NORMALIZE
   ========================================================= */

export const normalizeQueryValue = (
    value
) => {

    if (
        value ===
        null ||
        value ===
        undefined
    ) {

        return "";

    }


    return String(
        value
    )
        .trim()
        .toLowerCase();

};


/* =========================================================
   SEARCH PURCHASE ORDERS
   ========================================================= */

export const searchPurchaseOrders = (
    orders = [],
    searchText = ""
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    const search =
        normalizeQueryValue(
            searchText
        );


    if (
        !search
    ) {

        return orders;

    }


    return orders.filter(
        (
            order
        ) => {

            const searchableValues = [

                order.poNumber,

                order.supplierName,

                order.supplierCode,

                order.storeName,

                order.companyName,

                order.centerName,

                order.purchaseRequisitionId,

                order.poType,

                order.status,

            ];


            return searchableValues.some(
                (
                    value
                ) =>
                    normalizeQueryValue(
                        value
                    ).includes(
                        search
                    )
            );

        }
    );

};


/* =========================================================
   FILTER BY STATUS
   ========================================================= */

export const filterPurchaseOrdersByStatus = (
    orders = [],
    status
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    if (
        !status
    ) {

        return orders;

    }


    return orders.filter(
        (
            order
        ) =>
            order.status ===
            status
    );

};


/* =========================================================
   FILTER BY SUPPLIER
   ========================================================= */

export const filterPurchaseOrdersBySupplier = (
    orders = [],
    supplierId
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    if (
        !supplierId
    ) {

        return orders;

    }


    return orders.filter(
        (
            order
        ) =>
            order.supplierId ===
            supplierId
    );

};


/* =========================================================
   FILTER BY STORE
   ========================================================= */

export const filterPurchaseOrdersByStore = (
    orders = [],
    storeId
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    if (
        !storeId
    ) {

        return orders;

    }


    return orders.filter(
        (
            order
        ) =>
            order.storeId ===
            storeId
    );

};


/* =========================================================
   FILTER BY PO TYPE
   ========================================================= */

export const filterPurchaseOrdersByType = (
    orders = [],
    poType
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    if (
        !poType
    ) {

        return orders;

    }


    return orders.filter(
        (
            order
        ) =>
            order.poType ===
            poType
    );

};


/* =========================================================
   FILTER BY DATE RANGE
   ========================================================= */

export const filterPurchaseOrdersByDateRange = (
    orders = [],
    startDate,
    endDate
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    if (
        !startDate &&
        !endDate
    ) {

        return orders;

    }


    const start =
        startDate
            ? new Date(
                startDate
            )
            : null;


    const end =
        endDate
            ? new Date(
                endDate
            )
            : null;


    if (
        end
    ) {

        end.setHours(
            23,
            59,
            59,
            999
        );

    }


    return orders.filter(
        (
            order
        ) => {

            if (
                !order.poDate
            ) {

                return false;

            }


            const poDate =
                new Date(
                    order.poDate
                );


            if (
                Number.isNaN(
                    poDate.getTime()
                )
            ) {

                return false;

            }


            if (
                start &&
                poDate <
                start
            ) {

                return false;

            }


            if (
                end &&
                poDate >
                end
            ) {

                return false;

            }


            return true;

        }
    );

};


/* =========================================================
   SORT PURCHASE ORDERS
   ========================================================= */

export const sortPurchaseOrders = (
    orders = [],
    sortField = "poDate",
    sortOrder = "descend"
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return [];

    }


    const result =
        [
            ...orders,
        ];


    result.sort(
        (
            a,
            b
        ) => {

            let valueA =
                a?.[
                    sortField
                ];

            let valueB =
                b?.[
                    sortField
                ];


            if (
                sortField ===
                "poDate"
            ) {

                valueA =
                    new Date(
                        valueA
                    ).getTime();

                valueB =
                    new Date(
                        valueB
                    ).getTime();

            }
            else if (
                [
                    "grandTotal",
                    "totalItems",
                    "totalQuantity",
                    "receivedQuantity",
                    "outstandingQuantity",
                ].includes(
                    sortField
                )
            ) {

                valueA =
                    Number(
                        valueA
                    ) || 0;

                valueB =
                    Number(
                        valueB
                    ) || 0;

            }
            else {

                valueA =
                    normalizeQueryValue(
                        valueA
                    );

                valueB =
                    normalizeQueryValue(
                        valueB
                    );

            }


            if (
                valueA <
                valueB
            ) {

                return sortOrder ===
                    "ascend"
                    ? -1
                    : 1;

            }


            if (
                valueA >
                valueB
            ) {

                return sortOrder ===
                    "ascend"
                    ? 1
                    : -1;

            }


            return 0;

        }
    );


    return result;

};


/* =========================================================
   PAGINATE PURCHASE ORDERS
   ========================================================= */

export const paginatePurchaseOrders = (
    orders = [],
    page = 1,
    pageSize = 10
) => {

    if (
        !Array.isArray(
            orders
        )
    ) {

        return {

            data:
                [],

            total:
                0,

            current:
                page,

            pageSize,

            totalPages:
                0,

        };

    }


    const safePage =
        Math.max(
            Number(
                page
            ) || 1,
            1
        );


    const safePageSize =
        Math.max(
            Number(
                pageSize
            ) || 10,
            1
        );


    const startIndex =
        (
            safePage -
            1
        ) *
        safePageSize;


    const endIndex =
        startIndex +
        safePageSize;


    const data =
        orders.slice(
            startIndex,
            endIndex
        );


    return {

        data,

        total:
            orders.length,

        current:
            safePage,

        pageSize:
            safePageSize,

        totalPages:
            Math.ceil(
                orders.length /
                safePageSize
            ),

    };

};


/* =========================================================
   APPLY QUERY
   ========================================================= */

export const applyPurchaseOrderQuery = (
    orders = [],
    query = {}
) => {

    let result =
        Array.isArray(
            orders
        )
            ? [
                ...orders,
            ]
            : [];


    /* =====================================================
       SEARCH
       ===================================================== */

    result =
        searchPurchaseOrders(
            result,
            query.search
        );


    /* =====================================================
       STATUS
       ===================================================== */

    result =
        filterPurchaseOrdersByStatus(
            result,
            query.status
        );


    /* =====================================================
       SUPPLIER
       ===================================================== */

    result =
        filterPurchaseOrdersBySupplier(
            result,
            query.supplierId
        );


    /* =====================================================
       STORE
       ===================================================== */

    result =
        filterPurchaseOrdersByStore(
            result,
            query.storeId
        );


    /* =====================================================
       TYPE
       ===================================================== */

    result =
        filterPurchaseOrdersByType(
            result,
            query.poType
        );


    /* =====================================================
       DATE RANGE
       ===================================================== */

    result =
        filterPurchaseOrdersByDateRange(
            result,
            query.startDate,
            query.endDate
        );


    /* =====================================================
       SORT
       ===================================================== */

    result =
        sortPurchaseOrders(
            result,
            query.sortField ||
                "poDate",

            query.sortOrder ||
                "descend"
        );


    /* =====================================================
       PAGINATION
       ===================================================== */

    return paginatePurchaseOrders(
        result,
        query.page ||
            1,

        query.pageSize ||
            10
    );

};


/* =========================================================
   DEFAULT QUERY
   ========================================================= */

export const DEFAULT_PURCHASE_ORDER_QUERY = {

    search:
        "",

    status:
        undefined,

    supplierId:
        undefined,

    storeId:
        undefined,

    poType:
        undefined,

    startDate:
        undefined,

    endDate:
        undefined,

    sortField:
        "poDate",

    sortOrder:
        "descend",

    page:
        1,

    pageSize:
        10,

};


/* =========================================================
   QUERY RESET
   ========================================================= */

export const resetPurchaseOrderQuery = () => {

    return {

        ...DEFAULT_PURCHASE_ORDER_QUERY,

    };

};


/* =========================================================
   QUERY PARAM BUILDER
   ========================================================= */

export const buildPurchaseOrderQueryParams = (
    query = {}
) => {

    const params = {};


    if (
        query.search
    ) {

        params.search =
            query.search;

    }


    if (
        query.status
    ) {

        params.status =
            query.status;

    }


    if (
        query.supplierId
    ) {

        params.supplierId =
            query.supplierId;

    }


    if (
        query.storeId
    ) {

        params.storeId =
            query.storeId;

    }


    if (
        query.poType
    ) {

        params.poType =
            query.poType;

    }


    if (
        query.startDate
    ) {

        params.startDate =
            query.startDate;

    }


    if (
        query.endDate
    ) {

        params.endDate =
            query.endDate;

    }


    if (
        query.sortField
    ) {

        params.sortField =
            query.sortField;

    }


    if (
        query.sortOrder
    ) {

        params.sortOrder =
            query.sortOrder;

    }


    params.page =
        query.page ||
        1;


    params.pageSize =
        query.pageSize ||
        10;


    return params;

};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

const purchaseOrderQuery = {

    normalizeQueryValue,

    searchPurchaseOrders,

    filterPurchaseOrdersByStatus,

    filterPurchaseOrdersBySupplier,

    filterPurchaseOrdersByStore,

    filterPurchaseOrdersByType,

    filterPurchaseOrdersByDateRange,

    sortPurchaseOrders,

    paginatePurchaseOrders,

    applyPurchaseOrderQuery,

    resetPurchaseOrderQuery,

    buildPurchaseOrderQueryParams,

};


export default purchaseOrderQuery;