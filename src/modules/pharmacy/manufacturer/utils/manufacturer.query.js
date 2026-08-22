// src/modules/pharmacy/manufacturer/utils/manufacturer.query.js

/*
 * ============================================
 * Default Query
 * ============================================
 */

export const DEFAULT_MANUFACTURER_QUERY = {
    search: "",

    manufacturerType:
        undefined,

    manufacturerCategory:
        undefined,

    country:
        undefined,

    state:
        undefined,

    city:
        undefined,

    status:
        undefined,

    activeOnly:
        true,

    page: 1,

    pageSize: 10,

    sortBy:
        undefined,

    sortOrder:
        undefined,
};

/*
 * ============================================
 * Search Fields
 * ============================================
 */

export const MANUFACTURER_SEARCH_FIELDS = [
    "manufacturerCode",
    "manufacturerName",
    "shortName",
    "contactPerson",
    "mobile",
    "email",
    "gstin",
    "pan",
    "licenseNumber",
    "city",
    "state",
];

/*
 * ============================================
 * Filter Fields
 * ============================================
 */

export const MANUFACTURER_FILTER_FIELDS = [
    "manufacturerType",
    "manufacturerCategory",
    "country",
    "state",
    "city",
    "status",
];

/*
 * ============================================
 * Build Query Params
 * ============================================
 */

export const buildManufacturerQueryParams = (
    query = {}
) => {
    return {
        search:
            query.search?.trim() || "",

        manufacturerType:
            query.manufacturerType ||
            undefined,

        manufacturerCategory:
            query.manufacturerCategory ||
            undefined,

        country:
            query.country ||
            undefined,

        state:
            query.state ||
            undefined,

        city:
            query.city ||
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
 * ============================================
 * Reset Query
 * ============================================
 */

export const resetManufacturerQuery =
    () => ({
        ...DEFAULT_MANUFACTURER_QUERY,
    });