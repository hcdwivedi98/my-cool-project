// src/modules/pharmacy/supplier/services/supplier.service.js

import {
    supplierList,
} from "../mock/supplier.mock";

import {
    buildSupplierQueryParams,
} from "../utils/supplier.query";

const delay = (
    ms = 300
) =>
    new Promise((resolve) =>
        setTimeout(
            resolve,
            ms
        )
    );

let suppliers = [
    ...supplierList,
];

/*
 * -----------------------------------------
 * Normalize
 * -----------------------------------------
 */

const normalize = (
    value
) =>
    String(value ?? "")
        .toLowerCase()
        .trim();

/*
 * -----------------------------------------
 * Search
 * -----------------------------------------
 */

const applySearch = (
    data,
    search
) => {
    if (!search?.trim()) {
        return data;
    }

    const keyword =
        normalize(search);

    return data.filter(
        (supplier) =>
            [
                supplier.supplierCode,
                supplier.supplierName,
                supplier.contactPerson,
                supplier.mobile,
                supplier.email,
                supplier.gstin,
                supplier.drugLicenseNumber,
                supplier.city,
            ].some((value) =>
                normalize(
                    value
                ).includes(
                    keyword
                )
            )
    );
};

/*
 * -----------------------------------------
 * Filters
 * -----------------------------------------
 */

const applyFilters = (
    data,
    query
) => {
    return data.filter(
        (supplier) => {
            if (
                query.supplierType &&
                supplier.supplierType !==
                query.supplierType
            ) {
                return false;
            }

            if (
                query.supplierCategory &&
                supplier.supplierCategory !==
                query.supplierCategory
            ) {
                return false;
            }

            if (
                query.state &&
                normalize(
                    supplier.state
                ) !==
                normalize(
                    query.state
                )
            ) {
                return false;
            }

            if (
                query.paymentTerms &&
                supplier.paymentTerms !==
                query.paymentTerms
            ) {
                return false;
            }

            if (
                query.status &&
                supplier.status !==
                query.status
            ) {
                return false;
            }

            return true;
        }
    );
};

/*
 * -----------------------------------------
 * Sorting
 * -----------------------------------------
 */

const applySorting = (
    data,
    sortBy,
    sortOrder
) => {
    if (!sortBy) {
        return data;
    }

    const sorted = [
        ...data,
    ];

    sorted.sort(
        (a, b) => {
            const first =
                a?.[sortBy];

            const second =
                b?.[sortBy];

            if (
                first ===
                undefined ||
                first === null
            ) {
                return 1;
            }

            if (
                second ===
                undefined ||
                second === null
            ) {
                return -1;
            }

            const result =
                String(
                    first
                ).localeCompare(
                    String(
                        second
                    ),
                    undefined,
                    {
                        numeric:
                            true,
                        sensitivity:
                            "base",
                    }
                );

            return sortOrder ===
                "desc"
                ? -result
                : result;
        }
    );

    return sorted;
};

/*
 * -----------------------------------------
 * Get Suppliers
 * -----------------------------------------
 */

export const getSuppliers =
    async (
        query = {}
    ) => {
        await delay();

        const params =
            buildSupplierQueryParams(
                query
            );

        let result = [
            ...suppliers,
        ];

        result =
            applySearch(
                result,
                params.search
            );

        result =
            applyFilters(
                result,
                params
            );

        result =
            applySorting(
                result,
                params.sortBy,
                params.sortOrder
            );

        const total =
            result.length;

        const page =
            Number(
                params.page || 1
            );

        const pageSize =
            Number(
                params.pageSize ||
                10
            );

        const start =
            (page - 1) *
            pageSize;

        const data =
            result.slice(
                start,
                start +
                pageSize
            );

        return {
            data,
            total,
            page,
            pageSize,
        };
    };

/*
 * -----------------------------------------
 * Get Supplier By ID
 * -----------------------------------------
 */

export const getSupplierById =
    async (id) => {
        await delay();

        return (
            suppliers.find(
                (supplier) =>
                    String(
                        supplier.id
                    ) ===
                    String(id)
            ) || null
        );
    };

/*
 * -----------------------------------------
 * Create Supplier
 * -----------------------------------------
 */

export const createSupplier =
    async (
        payload
    ) => {
        await delay();

        const nextId =
            suppliers.length
                ? Math.max(
                    ...suppliers.map(
                        (
                            supplier
                        ) =>
                            Number(
                                supplier.id
                            ) || 0
                    )
                ) + 1
                : 1;

        const now =
            new Date().toISOString();

        const newSupplier = {
            ...payload,

            id: nextId,

            createdBy:
                "Current User",

            createdOn: now,

            modifiedBy: null,

            modifiedOn: null,
        };

        suppliers = [
            newSupplier,
            ...suppliers,
        ];

        return newSupplier;
    };

/*
 * -----------------------------------------
 * Update Supplier
 * -----------------------------------------
 */

export const updateSupplier =
    async (
        id,
        payload
    ) => {
        await delay();

        const index =
            suppliers.findIndex(
                (supplier) =>
                    String(
                        supplier.id
                    ) ===
                    String(id)
            );

        if (index === -1) {
            throw new Error(
                "Supplier not found"
            );
        }

        const existing =
            suppliers[index];

        const updatedSupplier = {
            ...existing,

            ...payload,

            id: existing.id,

            createdBy:
                existing.createdBy,

            createdOn:
                existing.createdOn,

            modifiedBy:
                "Current User",

            modifiedOn:
                new Date().toISOString(),
        };

        suppliers[index] =
            updatedSupplier;

        return updatedSupplier;
    };

/*
 * -----------------------------------------
 * Deactivate Supplier
 * -----------------------------------------
 */

export const deactivateSupplier =
    async (id) => {
        await delay();

        const index =
            suppliers.findIndex(
                (supplier) =>
                    String(
                        supplier.id
                    ) ===
                    String(id)
            );

        if (index === -1) {
            throw new Error(
                "Supplier not found"
            );
        }

        suppliers[index] = {
            ...suppliers[index],

            status: "Inactive",

            modifiedBy:
                "Current User",

            modifiedOn:
                new Date().toISOString(),
        };

        return suppliers[index];
    };

/*
 * -----------------------------------------
 * Activate Supplier
 * -----------------------------------------
 */

export const activateSupplier =
    async (id) => {
        await delay();

        const index =
            suppliers.findIndex(
                (supplier) =>
                    String(
                        supplier.id
                    ) ===
                    String(id)
            );

        if (index === -1) {
            throw new Error(
                "Supplier not found"
            );
        }

        suppliers[index] = {
            ...suppliers[index],

            status: "Active",

            modifiedBy:
                "Current User",

            modifiedOn:
                new Date().toISOString(),
        };

        return suppliers[index];
    };

/*
 * -----------------------------------------
 * Statistics
 * -----------------------------------------
 */

export const getSupplierStatistics =
    async () => {
        await delay();

        return {
            total:
                suppliers.length,

            active:
                suppliers.filter(
                    (item) =>
                        item.status ===
                        "Active"
                ).length,

            inactive:
                suppliers.filter(
                    (item) =>
                        item.status ===
                        "Inactive"
                ).length,

            manufacturers:
                suppliers.filter(
                    (item) =>
                        item.supplierType ===
                        "MANUFACTURER"
                ).length,

            distributors:
                suppliers.filter(
                    (item) =>
                        item.supplierType ===
                        "DISTRIBUTOR"
                ).length,
        };
    };