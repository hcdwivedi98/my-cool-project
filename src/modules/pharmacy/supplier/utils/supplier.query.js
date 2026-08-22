// src/modules/pharmacy/supplier/utils/supplier.query.js

// supplier.query.js

export const DEFAULT_SUPPLIER_QUERY = {
    search: "",

    supplierType: undefined,
    supplierCategory: undefined,

    state: undefined,
    city: undefined,

    paymentTerms: undefined,

    status: undefined,
    activeOnly: true,

    page: 1,
    pageSize: 10,

    sortBy: undefined,
    sortOrder: undefined,
};

/*
 * -----------------------------------------
 * Build Query Params
 * -----------------------------------------
 */

export const buildSupplierQueryParams = (
    query = {}
) => {
    return {
        search:
            query.search?.trim() || "",

        supplierType:
            query.supplierType ||
            undefined,

        supplierCategory:
            query.supplierCategory ||
            undefined,

        state:
            query.state ||
            undefined,

        city:
            query.city ||
            undefined,

        paymentTerms:
            query.paymentTerms ||
            undefined,

        status:
            query.status ||
            undefined,

        activeOnly:
            query.activeOnly ??
            true,

        page:
            Number(query.page) || 1,

        pageSize:
            Number(query.pageSize) || 10,

        sortBy:
            query.sortBy ||
            undefined,

        sortOrder:
            query.sortOrder ||
            undefined,
    };
};

/*
 * -----------------------------------------
 * Reset Query
 * -----------------------------------------
 */

export const resetSupplierQuery = () => ({
    ...DEFAULT_SUPPLIER_QUERY,
});

/*
 * -----------------------------------------
 * Search Fields
 * -----------------------------------------
 */

export const SUPPLIER_SEARCH_FIELDS = [
    "supplierCode",
    "supplierName",
    "contactPerson",
    "mobile",
    "email",
    "gstin",
    "drugLicenseNumber",
    "city",
];

/*
 * -----------------------------------------
 * Filter Fields
 * -----------------------------------------
 */

export const SUPPLIER_FILTER_FIELDS = [
    "supplierType",
    "supplierCategory",
    "state",
    "status",
];

