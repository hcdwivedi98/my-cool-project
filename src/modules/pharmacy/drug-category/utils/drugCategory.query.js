// src/modules/pharmacy/drug-category/utils/drugCategory.query.js

import {
    DEFAULT_DRUG_CATEGORY_QUERY,
} from "../constants/drugCategory.constants";


/*
 * =========================================================
 * CREATE DEFAULT QUERY
 * =========================================================
 */

export const createDrugCategoryQuery = (
    overrides = {}
) => {
    return {
        ...DEFAULT_DRUG_CATEGORY_QUERY,
        ...overrides,
    };
};


/*
 * =========================================================
 * NORMALIZE QUERY
 * =========================================================
 */

export const normalizeDrugCategoryQuery = (
    query = {}
) => {

    return {
        search:
            typeof query.search ===
                "string"
                ? query.search.trim()
                : "",

        categoryType:
            query.categoryType ||
            undefined,

        parentCategoryId:
            query.parentCategoryId ===
                "" ||
            query.parentCategoryId ===
                null ||
            query.parentCategoryId ===
                undefined
                ? undefined
                : Number(
                    query.parentCategoryId
                ),

        status:
            query.status ||
            undefined,

        usage:
            query.usage ||
            "ALL",

        page:
            Math.max(
                1,
                Number(
                    query.page
                ) || 1
            ),

        pageSize:
            Math.max(
                1,
                Number(
                    query.pageSize
                ) || 10
            ),

        sortBy:
            query.sortBy ||
            "sortOrder",

        sortOrder:
            query.sortOrder ||
            "asc",
    };
};


/*
 * =========================================================
 * BUILD API QUERY PARAMS
 * =========================================================
 *
 * Converts frontend query state into API-friendly
 * query parameters.
 */

export const buildDrugCategoryQueryParams = (
    query = {}
) => {

    const normalized =
        normalizeDrugCategoryQuery(
            query
        );

    const params = {};


    /*
     * Search
     */

    if (
        normalized.search
    ) {
        params.search =
            normalized.search;
    }


    /*
     * Category Type
     */

    if (
        normalized.categoryType
    ) {
        params.categoryType =
            normalized.categoryType;
    }


    /*
     * Parent Category
     */

    if (
        normalized.parentCategoryId !==
        undefined
    ) {
        params.parentCategoryId =
            normalized.parentCategoryId;
    }


    /*
     * Status
     */

    if (
        normalized.status
    ) {
        params.status =
            normalized.status;
    }


    /*
     * Usage
     */

    if (
        normalized.usage &&
        normalized.usage !==
            "ALL"
    ) {
        params.usage =
            normalized.usage;
    }


    /*
     * Pagination
     */

    params.page =
        normalized.page;

    params.pageSize =
        normalized.pageSize;


    /*
     * Sorting
     */

    if (
        normalized.sortBy
    ) {
        params.sortBy =
            normalized.sortBy;
    }

    if (
        normalized.sortOrder
    ) {
        params.sortOrder =
            normalized.sortOrder;
    }


    return params;
};


/*
 * =========================================================
 * RESET QUERY
 * =========================================================
 */

export const resetDrugCategoryQuery =
    () => {
        return {
            ...DEFAULT_DRUG_CATEGORY_QUERY,
        };
    };


/*
 * =========================================================
 * UPDATE SEARCH
 * =========================================================
 */

export const updateDrugCategorySearch = (
    query,
    search
) => {
    return {
        ...normalizeDrugCategoryQuery(
            query
        ),

        search:
            search?.trim() ||
            "",

        page: 1,
    };
};


/*
 * =========================================================
 * UPDATE FILTER
 * =========================================================
 */

export const updateDrugCategoryFilter = (
    query,
    field,
    value
) => {

    return {
        ...normalizeDrugCategoryQuery(
            query
        ),

        [field]:
            value ===
                "" ||
            value ===
                null
                ? undefined
                : value,

        page: 1,
    };
};


/*
 * =========================================================
 * UPDATE PAGINATION
 * =========================================================
 */

export const updateDrugCategoryPagination = (
    query,
    page,
    pageSize
) => {

    return {
        ...normalizeDrugCategoryQuery(
            query
        ),

        page:
            Math.max(
                1,
                Number(
                    page
                ) || 1
            ),

        pageSize:
            Math.max(
                1,
                Number(
                    pageSize
                ) || 10
            ),
    };
};


/*
 * =========================================================
 * UPDATE SORT
 * =========================================================
 */

export const updateDrugCategorySort = (
    query,
    sortBy,
    sortOrder
) => {

    return {
        ...normalizeDrugCategoryQuery(
            query
        ),

        sortBy:
            sortBy ||
            "sortOrder",

        sortOrder:
            sortOrder ||
            "asc",

        page: 1,
    };
};


/*
 * =========================================================
 * HANDLE ANT DESIGN TABLE CHANGE
 * =========================================================
 *
 * This can be directly connected with:
 *
 * <Table onChange={handleTableChange} />
 */

export const resolveDrugCategoryTableChange =
    (
        query,
        pagination,
        filters,
        sorter
    ) => {

        const nextQuery =
            normalizeDrugCategoryQuery(
                query
            );


        /*
         * -----------------------------------------
         * PAGINATION
         * -----------------------------------------
         */

        if (
            pagination
        ) {
            nextQuery.page =
                pagination.current ||
                1;

            nextQuery.pageSize =
                pagination.pageSize ||
                10;
        }


        /*
         * -----------------------------------------
         * CATEGORY TYPE FILTER
         * -----------------------------------------
         */

        if (
            filters &&
            Object.prototype.hasOwnProperty.call(
                filters,
                "categoryType"
            )
        ) {
            nextQuery.categoryType =
                filters.categoryType?.[0] ||
                undefined;
        }


        /*
         * -----------------------------------------
         * STATUS FILTER
         * -----------------------------------------
         */

        if (
            filters &&
            Object.prototype.hasOwnProperty.call(
                filters,
                "status"
            )
        ) {
            nextQuery.status =
                filters.status?.[0] ||
                undefined;
        }


        /*
         * -----------------------------------------
         * SORTER
         * -----------------------------------------
         */

        if (
            sorter &&
            sorter.field
        ) {
            nextQuery.sortBy =
                sorter.field;

            nextQuery.sortOrder =
                sorter.order ===
                "descend"
                    ? "desc"
                    : "asc";
        }


        return nextQuery;
    };


/*
 * =========================================================
 * CHECK IF FILTERED
 * =========================================================
 */

export const hasActiveDrugCategoryFilters = (
    query = {}
) => {

    const normalized =
        normalizeDrugCategoryQuery(
            query
        );


    return Boolean(
        normalized.search ||
        normalized.categoryType ||
        normalized.parentCategoryId !==
            undefined ||
        normalized.status ||
        (
            normalized.usage &&
            normalized.usage !==
                "ALL"
        )
    );
};


/*
 * =========================================================
 * GET QUERY FILTER COUNT
 * =========================================================
 */

export const getDrugCategoryFilterCount = (
    query = {}
) => {

    const normalized =
        normalizeDrugCategoryQuery(
            query
        );

    let count = 0;


    if (
        normalized.search
    ) {
        count++;
    }

    if (
        normalized.categoryType
    ) {
        count++;
    }

    if (
        normalized.parentCategoryId !==
        undefined
    ) {
        count++;
    }

    if (
        normalized.status
    ) {
        count++;
    }

    if (
        normalized.usage &&
        normalized.usage !==
            "ALL"
    ) {
        count++;
    }


    return count;
};


/*
 * =========================================================
 * QUERY → URL PARAMS
 * =========================================================
 *
 * Useful later if list state needs to survive
 * browser refresh/navigation.
 */

export const drugCategoryQueryToSearchParams =
    (
        query = {}
    ) => {

        const params =
            buildDrugCategoryQueryParams(
                query
            );


        const searchParams =
            new URLSearchParams();


        Object.entries(
            params
        ).forEach(
            (
                [
                    key,
                    value,
                ]
            ) => {

                if (
                    value !==
                        undefined &&
                    value !==
                        null &&
                    value !==
                        ""
                ) {
                    searchParams.set(
                        key,
                        String(
                            value
                        )
                    );
                }
            }
        );


        return searchParams;
    };


/*
 * =========================================================
 * SEARCH PARAMS → QUERY
 * ========================================================= */

export const searchParamsToDrugCategoryQuery =
    (
        searchParams
    ) => {

        if (
            !searchParams
        ) {
            return createDrugCategoryQuery();
        }


        const params =
            searchParams instanceof
            URLSearchParams
                ? searchParams
                : new URLSearchParams(
                    searchParams
                );


        return normalizeDrugCategoryQuery(
            {
                search:
                    params.get(
                        "search"
                    ) || "",

                categoryType:
                    params.get(
                        "categoryType"
                    ) || undefined,

                parentCategoryId:
                    params.get(
                        "parentCategoryId"
                    ) || undefined,

                status:
                    params.get(
                        "status"
                    ) || undefined,

                usage:
                    params.get(
                        "usage"
                    ) || "ALL",

                page:
                    params.get(
                        "page"
                    ) || 1,

                pageSize:
                    params.get(
                        "pageSize"
                    ) || 10,

                sortBy:
                    params.get(
                        "sortBy"
                    ) ||
                    "sortOrder",

                sortOrder:
                    params.get(
                        "sortOrder"
                    ) ||
                    "asc",
            }
        );
    };


/*
 * =========================================================
 * EXPORT DEFAULT QUERY UTILITIES
 * ========================================================= */

export default {
    createDrugCategoryQuery,

    normalizeDrugCategoryQuery,

    buildDrugCategoryQueryParams,

    resetDrugCategoryQuery,

    updateDrugCategorySearch,

    updateDrugCategoryFilter,

    updateDrugCategoryPagination,

    updateDrugCategorySort,

    resolveDrugCategoryTableChange,

    hasActiveDrugCategoryFilters,

    getDrugCategoryFilterCount,

    drugCategoryQueryToSearchParams,

    searchParamsToDrugCategoryQuery,
};