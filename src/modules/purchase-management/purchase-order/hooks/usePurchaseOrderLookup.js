// src/modules/purchase-management/purchase-order/hooks/usePurchaseOrderLookup.js

import {
    useCallback,
    useMemo,
} from "react";

import {
    purchaseOrderDrugList,
    purchaseOrderRequisitionList,
    purchaseOrderSupplierList,
} from "../mock/purchaseOrder.mock";

import {
    DELIVERY_TERMS_OPTIONS,
    PAYMENT_TERMS_OPTIONS,
    PO_CURRENCY_OPTIONS,
    PO_STATUS_OPTIONS,
    PO_TYPE_OPTIONS,
} from "../constants/purchaseOrder.constants";


/* =========================================================
   PURCHASE ORDER LOOKUP
   ========================================================= */

const usePurchaseOrderLookup = () => {

    /* =====================================================
       SUPPLIERS
       ===================================================== */

    const suppliers = useMemo(
        () => {

            return Array.isArray(
                purchaseOrderSupplierList
            )
                ? purchaseOrderSupplierList
                : [];

        },
        []
    );


    /* =====================================================
       DRUGS / ITEMS
       ===================================================== */

    const drugs = useMemo(
        () => {

            return Array.isArray(
                purchaseOrderDrugList
            )
                ? purchaseOrderDrugList
                : [];

        },
        []
    );


    /* =====================================================
       PURCHASE REQUISITIONS
       ===================================================== */

    const purchaseRequisitions =
        useMemo(
            () => {

                return Array.isArray(
                    purchaseOrderRequisitionList
                )
                    ? purchaseOrderRequisitionList
                    : [];

            },
            []
        );


    /* =====================================================
       SUPPLIER OPTIONS
       ===================================================== */

    const supplierOptions =
        useMemo(
            () => {

                return suppliers.map(
                    (
                        supplier
                    ) => ({

                        value:
                            supplier.id,

                        label:
                            `${supplier.supplierCode} - ${supplier.supplierName}`,

                        supplier,

                    })
                );

            },
            [
                suppliers,
            ]
        );


    /* =====================================================
       DRUG OPTIONS
       ===================================================== */

    const drugOptions =
        useMemo(
            () => {

                return drugs.map(
                    (
                        drug
                    ) => ({

                        value:
                            drug.id,

                        label:
                            `${drug.drugCode} - ${drug.drugName}`,

                        drug,

                    })
                );

            },
            [
                drugs,
            ]
        );


    /* =====================================================
       REQUISITION OPTIONS
       ===================================================== */

    const purchaseRequisitionOptions =
        useMemo(
            () => {

                return purchaseRequisitions
                    .filter(
                        (
                            requisition
                        ) =>
                            requisition.status ===
                            "APPROVED"
                    )
                    .map(
                        (
                            requisition
                        ) => ({

                            value:
                                requisition.id,

                            label:
                                `${requisition.requisitionNumber} - ${requisition.departmentName}`,

                            requisition,

                        })
                    );

            },
            [
                purchaseRequisitions,
            ]
        );


    /* =====================================================
       STATUS OPTIONS
       ===================================================== */

    const statusOptions =
        useMemo(
            () => {

                return Array.isArray(
                    PO_STATUS_OPTIONS
                )
                    ? PO_STATUS_OPTIONS
                    : [];

            },
            []
        );


    /* =====================================================
       TYPE OPTIONS
       ===================================================== */

    const typeOptions =
        useMemo(
            () => {

                return Array.isArray(
                    PO_TYPE_OPTIONS
                )
                    ? PO_TYPE_OPTIONS
                    : [];

            },
            []
        );


    /* =====================================================
       PAYMENT TERMS OPTIONS
       ===================================================== */

    const paymentTermsOptions =
        useMemo(
            () => {

                return Array.isArray(
                    PAYMENT_TERMS_OPTIONS
                )
                    ? PAYMENT_TERMS_OPTIONS
                    : [];

            },
            []
        );


    /* =====================================================
       DELIVERY TERMS OPTIONS
       ===================================================== */

    const deliveryTermsOptions =
        useMemo(
            () => {

                return Array.isArray(
                    DELIVERY_TERMS_OPTIONS
                )
                    ? DELIVERY_TERMS_OPTIONS
                    : [];

            },
            []
        );


    /* =====================================================
       CURRENCY OPTIONS
       ===================================================== */

    const currencyOptions =
        useMemo(
            () => {

                return Array.isArray(
                    PO_CURRENCY_OPTIONS
                )
                    ? PO_CURRENCY_OPTIONS
                    : [];

            },
            []
        );


    /* =====================================================
       GET SUPPLIER BY ID
       ===================================================== */

    const getSupplierById =
        useCallback(
            (
                supplierId
            ) => {

                return suppliers.find(
                    (
                        supplier
                    ) =>
                        supplier.id ===
                        supplierId
                ) || null;

            },
            [
                suppliers,
            ]
        );


    /* =====================================================
       GET DRUG BY ID
       ===================================================== */

    const getDrugById =
        useCallback(
            (
                drugId
            ) => {

                return drugs.find(
                    (
                        drug
                    ) =>
                        drug.id ===
                        drugId
                ) || null;

            },
            [
                drugs,
            ]
        );


    /* =====================================================
       GET REQUISITION BY ID
       ===================================================== */

    const getPurchaseRequisitionById =
        useCallback(
            (
                requisitionId
            ) => {

                return purchaseRequisitions.find(
                    (
                        requisition
                    ) =>
                        requisition.id ===
                        requisitionId
                ) || null;

            },
            [
                purchaseRequisitions,
            ]
        );


    /* =====================================================
       GET DRUGS BY SEARCH
       ===================================================== */

    const searchDrugs =
        useCallback(
            (
                searchText = ""
            ) => {

                const normalizedSearch =
                    String(
                        searchText
                    )
                        .trim()
                        .toLowerCase();


                if (
                    !normalizedSearch
                ) {

                    return drugs;

                }


                return drugs.filter(
                    (
                        drug
                    ) => {

                        return (

                            String(
                                drug.drugCode ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )

                            ||

                            String(
                                drug.drugName ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )

                        );

                    }
                );

            },
            [
                drugs,
            ]
        );


    /* =====================================================
       GET SUPPLIERS BY SEARCH
       ===================================================== */

    const searchSuppliers =
        useCallback(
            (
                searchText = ""
            ) => {

                const normalizedSearch =
                    String(
                        searchText
                    )
                        .trim()
                        .toLowerCase();


                if (
                    !normalizedSearch
                ) {

                    return suppliers;

                }


                return suppliers.filter(
                    (
                        supplier
                    ) => {

                        return (

                            String(
                                supplier.supplierCode ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )

                            ||

                            String(
                                supplier.supplierName ||
                                ""
                            )
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )

                        );

                    }
                );

            },
            [
                suppliers,
            ]
        );


    /* =====================================================
       RETURN
       ===================================================== */

    return {

        suppliers,

        drugs,

        purchaseRequisitions,

        supplierOptions,

        drugOptions,

        purchaseRequisitionOptions,

        statusOptions,

        typeOptions,

        paymentTermsOptions,

        deliveryTermsOptions,

        currencyOptions,

        getSupplierById,

        getDrugById,

        getPurchaseRequisitionById,

        searchDrugs,

        searchSuppliers,

    };

};


export default usePurchaseOrderLookup;


/* =========================================================
   NAMED EXPORT
   ========================================================= */

export {
    usePurchaseOrderLookup,
};