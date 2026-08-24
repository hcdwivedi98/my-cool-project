// src/modules/purchase-management/purchase-order/services/purchaseOrder.service.js

import {
    purchaseOrderList,
} from "../mock/purchaseOrder.mock";


/* =========================================================
   SAFE DATA
   ========================================================= */

const getSafeList = () => {

    return Array.isArray(
        purchaseOrderList
    )
        ? [
            ...purchaseOrderList,
        ]
        : [];

};


/* =========================================================
   DELAY
   ========================================================= */

const delay = (
    milliseconds = 300
) =>
    new Promise(
        (
            resolve
        ) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


/* =========================================================
   GET PURCHASE ORDERS
   ========================================================= */

export const getPurchaseOrders = async ({
    page = 1,
    pageSize = 10,
    search = "",
    status,
    supplierId,
    storeId,
    poType,
} = {}) => {

    await delay();


    let data =
        getSafeList();


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchValue =
        String(
            search ||
            ""
        )
            .trim()
            .toLowerCase();


    if (
        searchValue
    ) {

        data =
            data.filter(
                (
                    item
                ) => {

                    const searchableText = [

                        item.poNumber,

                        item.supplierName,

                        item.supplierCode,

                        item.storeName,

                        item.poType,

                        item.status,

                    ]
                        .filter(
                            Boolean
                        )
                        .join(" ")
                        .toLowerCase();


                    return searchableText.includes(
                        searchValue
                    );

                }
            );

    }


    /* =====================================================
       STATUS
    ===================================================== */

    if (
        status
    ) {

        data =
            data.filter(
                (
                    item
                ) =>
                    item.status ===
                    status
            );

    }


    /* =====================================================
       SUPPLIER
    ===================================================== */

    if (
        supplierId
    ) {

        data =
            data.filter(
                (
                    item
                ) =>
                    String(
                        item.supplierId
                    ) ===
                    String(
                        supplierId
                    )
            );

    }


    /* =====================================================
       STORE
    ===================================================== */

    if (
        storeId
    ) {

        data =
            data.filter(
                (
                    item
                ) =>
                    String(
                        item.storeId
                    ) ===
                    String(
                        storeId
                    )
            );

    }


    /* =====================================================
       PO TYPE
    ===================================================== */

    if (
        poType
    ) {

        data =
            data.filter(
                (
                    item
                ) =>
                    item.poType ===
                    poType
            );

    }


    /* =====================================================
       SORT
    ===================================================== */

    data.sort(
        (
            a,
            b
        ) => {

            const dateA =
                new Date(
                    a.createdAt ||
                    a.poDate ||
                    0
                ).getTime();


            const dateB =
                new Date(
                    b.createdAt ||
                    b.poDate ||
                    0
                ).getTime();


            return dateB -
                dateA;

        }
    );


    /* =====================================================
       PAGINATION
    ===================================================== */

    const total =
        data.length;


    const safePage =
        Math.max(
            1,
            Number(
                page
            ) || 1
        );


    const safePageSize =
        Math.max(
            1,
            Number(
                pageSize
            ) || 10
        );


    const start =
        (
            safePage -
            1
        ) *
        safePageSize;


    const end =
        start +
        safePageSize;


    const records =
        data.slice(
            start,
            end
        );


    return {

        success:
            true,

        data:
            records,

        pagination: {

            current:
                safePage,

            pageSize:
                safePageSize,

            total,

        },

    };

};


/* =========================================================
   GET SINGLE PURCHASE ORDER
   ========================================================= */

export const getPurchaseOrderById = async (
    id
) => {

    await delay();


    const data =
        getSafeList();


    const record =
        data.find(
            (
                item
            ) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (
        !record
    ) {

        throw new Error(
            "Purchase order not found."
        );

    }


    return {

        success:
            true,

        data:
            {
                ...record,

                items:
                    Array.isArray(
                        record.items
                    )
                        ? [
                            ...record.items,
                        ]
                        : [],

                auditTrail:
                    Array.isArray(
                        record.auditTrail
                    )
                        ? [
                            ...record.auditTrail,
                        ]
                        : [],

            },

    };

};


/* =========================================================
   CREATE
   ========================================================= */

export const createPurchaseOrder = async (
    payload
) => {

    await delay();


    if (
        !payload
    ) {

        throw new Error(
            "Purchase order payload is required."
        );

    }


    console.log(
        "CREATE PURCHASE ORDER:",
        payload
    );


    return {

        success:
            true,

        message:
            "Purchase order created successfully.",

        data: {

            ...payload,

            id:
                `PO-${Date.now()}`,

            status:
                "DRAFT",

        },

    };

};


/* =========================================================
   UPDATE
   ========================================================= */

export const updatePurchaseOrder = async (
    id,
    payload
) => {

    await delay();


    if (
        !id
    ) {

        throw new Error(
            "Purchase order ID is required."
        );

    }


    console.log(
        "UPDATE PURCHASE ORDER:",
        id,
        payload
    );


    return {

        success:
            true,

        message:
            "Purchase order updated successfully.",

        data: {

            ...payload,

            id,

        },

    };

};


/* =========================================================
   SAVE DRAFT
   ========================================================= */

export const savePurchaseOrderDraft = async (
    payload
) => {

    await delay();


    console.log(
        "SAVE PURCHASE ORDER DRAFT:",
        payload
    );


    return {

        success:
            true,

        message:
            "Purchase order draft saved successfully.",

        data: {

            ...payload,

            status:
                "DRAFT",

        },

    };

};


/* =========================================================
   SUBMIT
   ========================================================= */

export const submitPurchaseOrder = async (
    id,
    payload
) => {

    await delay();


    console.log(
        "SUBMIT PURCHASE ORDER:",
        id,
        payload
    );


    return {

        success:
            true,

        message:
            "Purchase order submitted successfully.",

        data: {

            ...payload,

            id,

            status:
                "PENDING_APPROVAL",

        },

    };

};


/* =========================================================
   DELETE
   ========================================================= */

export const deletePurchaseOrder = async (
    id
) => {

    await delay();


    if (
        !id
    ) {

        throw new Error(
            "Purchase order ID is required."
        );

    }


    console.log(
        "DELETE PURCHASE ORDER:",
        id
    );


    return {

        success:
            true,

        message:
            "Purchase order deleted successfully.",

    };

};


/* =========================================================
   APPROVE
   ========================================================= */

export const approvePurchaseOrder = async (
    id,
    remarks = ""
) => {

    await delay();


    return {

        success:
            true,

        message:
            "Purchase order approved successfully.",

        data: {

            id,

            status:
                "APPROVED",

            remarks,

        },

    };

};


/* =========================================================
   REJECT
   ========================================================= */

export const rejectPurchaseOrder = async (
    id,
    remarks = ""
) => {

    await delay();


    return {

        success:
            true,

        message:
            "Purchase order rejected successfully.",

        data: {

            id,

            status:
                "REJECTED",

            remarks,

        },

    };

};