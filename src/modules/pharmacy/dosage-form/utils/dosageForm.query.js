// src/modules/pharmacy/dosage-form/utils/dosageForm.query.js

import {
    DEFAULT_DOSAGE_FORM_QUERY,
} from "../constants/dosageForm.constants";


/*
 * =========================================================
 * CREATE DEFAULT QUERY
 * =========================================================
 */

export const createDosageFormQuery = (
    overrides = {}
) => {

    return {
        ...DEFAULT_DOSAGE_FORM_QUERY,

        ...overrides,
    };
};


/*
 * =========================================================
 * NORMALIZE QUERY
 * =========================================================
 */

export const normalizeDosageFormQuery = (
    query = {}
) => {

    const page =
        Number(
            query.page
        ) > 0
            ? Number(
                query.page
            )
            : 1;


    const pageSize =
        Number(
            query.pageSize
        ) > 0
            ? Number(
                query.pageSize
            )
            : 10;


    return {

        search:
            String(
                query.search ??
                ""
            ).trim(),


        formType:
            query.formType ||
            undefined,


        routeOfAdministrationId:
            query.routeOfAdministrationId ||
            undefined,


        uomId:
            query.uomId ||
            undefined,


        status:
            query.status ||
            undefined,


        usage:
            query.usage ||
            "ALL",


        page,

        pageSize,


        sortBy:
            query.sortBy ||
            "sortOrder",


        sortOrder:
            query.sortOrder ===
            "desc"
                ? "desc"
                : "asc",
    };
};


/*
 * =========================================================
 * SEARCH UPDATE
 * =========================================================
 */

export const updateDosageFormSearch = (
    query,
    search
) => {

    return normalizeDosageFormQuery({

        ...query,

        search:
            search ?? "",

        page:
            1,
    });
};


/*
 * =========================================================
 * FILTER UPDATE
 * =========================================================
 */

export const updateDosageFormFilter = (
    query,
    field,
    value
) => {

    return normalizeDosageFormQuery({

        ...query,

        [field]:
            value ||
            undefined,

        page:
            1,
    });
};


/*
 * =========================================================
 * CLEAR FILTER
 * =========================================================
 */

export const clearDosageFormFilters = (
    query
) => {

    return normalizeDosageFormQuery({

        ...query,

        formType:
            undefined,

        routeOfAdministrationId:
            undefined,

        uomId:
            undefined,

        status:
            undefined,

        usage:
            "ALL",

        page:
            1,
    });
};


/*
 * =========================================================
 * PAGINATION
 * =========================================================
 */

export const updateDosageFormPagination = (
    query,
    page,
    pageSize
) => {

    return normalizeDosageFormQuery({

        ...query,

        page:
            Number(
                page
            ) || 1,

        pageSize:
            Number(
                pageSize
            ) || 10,
    });
};


/*
 * =========================================================
 * SORT
 * =========================================================
 */

export const updateDosageFormSort = (
    query,
    sortBy,
    sortOrder
) => {

    return normalizeDosageFormQuery({

        ...query,

        sortBy:
            sortBy ||
            "sortOrder",

        sortOrder:
            sortOrder ===
            "desc"
                ? "desc"
                : "asc",

        page:
            1,
    });
};


/*
 * =========================================================
 * TABLE CHANGE
 * =========================================================
 *
 * Compatible with Ant Design Table onChange:
 *
 * onChange(
 *   pagination,
 *   filters,
 *   sorter
 * )
 */

export const resolveDosageFormTableChange = (
    query,
    pagination = {},
    filters = {},
    sorter = {}
) => {

    let nextQuery = {
        ...query,
    };


    /*
     * -----------------------------------------------
     * PAGINATION
     * -----------------------------------------------
     */

    nextQuery =
        updateDosageFormPagination(
            nextQuery,

            pagination.current,

            pagination.pageSize
        );


    /*
     * -----------------------------------------------
     * FORM TYPE
     * -----------------------------------------------
     */

    const formType =
        filters.formType;


    nextQuery.formType =
        Array.isArray(
            formType
        )
            ? formType[0]
            : formType;


    /*
     * -----------------------------------------------
     * ROUTE
     * -----------------------------------------------
     */

    const route =
        filters.routeOfAdministrationId;


    nextQuery.routeOfAdministrationId =
        Array.isArray(
            route
        )
            ? route[0]
            : route;


    /*
     * -----------------------------------------------
     * STATUS
     * -----------------------------------------------
     */

    const status =
        filters.status;


    nextQuery.status =
        Array.isArray(
            status
        )
            ? status[0]
            : status;


    /*
     * -----------------------------------------------
     * SORTER
     * -----------------------------------------------
     */

    const sorterField =
        sorter?.field ||
        sorter?.columnKey;


    if (
        sorterField
    ) {

        nextQuery.sortBy =
            sorterField;


        nextQuery.sortOrder =
            sorter.order ===
            "descend"
                ? "desc"
                : "asc";
    }


    return normalizeDosageFormQuery(
        nextQuery
    );
};


/*
 * =========================================================
 * BUILD API QUERY PARAMS
 * =========================================================
 *
 * This is useful later when mock service is replaced
 * by ASP.NET Core API.
 */

export const buildDosageFormQueryParams = (
    query
) => {

    const normalized =
        normalizeDosageFormQuery(
            query
        );


    const params = {};


    if (
        normalized.search
    ) {
        params.search =
            normalized.search;
    }


    if (
        normalized.formType
    ) {
        params.formType =
            normalized.formType;
    }


    if (
        normalized.routeOfAdministrationId
    ) {
        params.routeOfAdministrationId =
            normalized.routeOfAdministrationId;
    }


    if (
        normalized.uomId
    ) {
        params.uomId =
            normalized.uomId;
    }


    if (
        normalized.status
    ) {
        params.status =
            normalized.status;
    }


    if (
        normalized.usage &&
        normalized.usage !==
            "ALL"
    ) {
        params.usage =
            normalized.usage;
    }


    params.page =
        normalized.page;


    params.pageSize =
        normalized.pageSize;


    params.sortBy =
        normalized.sortBy;


    params.sortOrder =
        normalized.sortOrder;


    return params;
};


/*
 * =========================================================
 * QUERY STRING
 * =========================================================
 */

export const buildDosageFormQueryString = (
    query
) => {

    const params =
        buildDosageFormQueryParams(
            query
        );


    const searchParams =
        new URLSearchParams();


    Object.entries(
        params
    ).forEach(
        ([
            key,
            value,
        ]) => {

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


    return searchParams.toString();
};