// src/modules/pharmacy/generic/utils/generic.query.js

/*
 * ============================================
 * Default Query
 * ============================================
 */

export const DEFAULT_GENERIC_QUERY = {
    search: "",

    genericType:
        undefined,

    therapeuticClass:
        undefined,

    pharmacologicalClass:
        undefined,

    dosageForm:
        undefined,

    route:
        undefined,

    status:
        undefined,

    prescriptionRequired:
        undefined,

    highAlert:
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

export const GENERIC_SEARCH_FIELDS = [
    "genericCode",
    "genericName",
    "shortName",
    "description",
    "therapeuticClass",
    "pharmacologicalClass",
];

/*
 * ============================================
 * Filter Fields
 * ============================================
 */

export const GENERIC_FILTER_FIELDS = [
    "genericType",
    "therapeuticClass",
    "pharmacologicalClass",
    "dosageForm",
    "route",
    "status",
    "prescriptionRequired",
    "highAlert",
];

/*
 * ============================================
 * Build Query Params
 * ============================================
 */

export const buildGenericQueryParams = (
    query = {}
) => {
    return {
        search:
            query.search?.trim() || "",

        genericType:
            query.genericType ||
            undefined,

        therapeuticClass:
            query.therapeuticClass ||
            undefined,

        pharmacologicalClass:
            query.pharmacologicalClass ||
            undefined,

        dosageForm:
            query.dosageForm ||
            undefined,

        route:
            query.route ||
            undefined,

        status:
            query.status ||
            undefined,

        prescriptionRequired:
            query.prescriptionRequired ??
            undefined,

        highAlert:
            query.highAlert ??
            undefined,

        activeOnly:
            query.activeOnly ??
            true,

        page:
            Number(query.page) ||
            1,

        pageSize:
            Number(query.pageSize) ||
            10,

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

export const resetGenericQuery =
    () => ({
        ...DEFAULT_GENERIC_QUERY,
    });

/*
 * ============================================
 * Query String Builder
 * ============================================
 *
 * Future API integration ke liye useful.
 * Undefined/null fields automatically remove
 * ho jayenge.
 */

export const buildGenericSearchParams =
    (query = {}) => {
        const params =
            buildGenericQueryParams(
                query
            );

        return Object.fromEntries(
            Object.entries(
                params
            ).filter(
                ([
                    _key,
                    value,
                ]) =>
                    value !==
                        undefined &&
                    value !== null &&
                    value !== ""
            )
        );
    };