// src/modules/pharmacy/drug-route/utils/drugRoute.query.js

import {
    DEFAULT_DRUG_ROUTE_QUERY,
} from "../constants/drugRoute.constants";


/*
 * =========================================================
 * CREATE DEFAULT QUERY
 * =========================================================
 */

export const createDrugRouteQuery = (
    overrides = {}
) => {

    return {

        ...DEFAULT_DRUG_ROUTE_QUERY,

        ...overrides,
    };
};


/*
 * =========================================================
 * NORMALIZE PAGE
 * =========================================================
 */

export const normalizeDrugRoutePage = (
    value
) => {

    const page =
        Number(value);


    if (
        !Number.isFinite(
            page
        ) ||
        page < 1
    ) {

        return 1;
    }


    return Math.floor(
        page
    );
};


/*
 * =========================================================
 * NORMALIZE PAGE SIZE
 * =========================================================
 */

export const normalizeDrugRoutePageSize = (
    value
) => {

    const pageSize =
        Number(value);


    if (
        !Number.isFinite(
            pageSize
        ) ||
        pageSize <= 0
    ) {

        return 10;
    }


    return Math.floor(
        pageSize
    );
};


/*
 * =========================================================
 * NORMALIZE SEARCH
 * =========================================================
 */

export const normalizeDrugRouteSearch = (
    value
) => {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return String(
        value
    ).trim();
};


/*
 * =========================================================
 * NORMALIZE SORT ORDER
 * =========================================================
 */

export const normalizeDrugRouteSortOrder = (
    value
) => {

    return value ===
        "desc"
        ? "desc"
        : "asc";
};


/*
 * =========================================================
 * NORMALIZE SORT FIELD
 * =========================================================
 */

export const normalizeDrugRouteSortBy = (
    value
) => {

    const allowedFields = [

        "routeCode",

        "routeName",

        "routeType",

        "drugCount",

        "sortOrder",

        "status",

        "createdOn",

        "modifiedOn",

    ];


    return allowedFields.includes(
        value
    )
        ? value
        : "sortOrder";
};


/*
 * =========================================================
 * NORMALIZE FILTER VALUE
 * =========================================================
 */

export const normalizeDrugRouteFilter = (
    value
) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return undefined;
    }


    /*
     * Ant Design filters may return
     * arrays.
     */

    if (
        Array.isArray(
            value
        )
    ) {

        return (
            value.length
                ? value[0]
                : undefined
        );
    }


    return value;
};


/*
 * =========================================================
 * NORMALIZE USAGE
 * =========================================================
 */

export const normalizeDrugRouteUsage = (
    value
) => {

    const normalized =
        normalizeDrugRouteFilter(
            value
        );


    if (
        normalized ===
        "USED"
    ) {

        return "USED";
    }


    if (
        normalized ===
        "UNUSED"
    ) {

        return "UNUSED";
    }


    return "ALL";
};


/*
 * =========================================================
 * BUILD QUERY
 * =========================================================
 *
 * Converts UI query into a clean service/API query.
 */

export const buildDrugRouteQuery = (
    query = {}
) => {

    return {

        search:
            normalizeDrugRouteSearch(
                query.search
            ),

        routeType:
            normalizeDrugRouteFilter(
                query.routeType
            ),

        status:
            normalizeDrugRouteFilter(
                query.status
            ),

        usage:
            normalizeDrugRouteUsage(
                query.usage
            ),

        page:
            normalizeDrugRoutePage(
                query.page
            ),

        pageSize:
            normalizeDrugRoutePageSize(
                query.pageSize
            ),

        sortBy:
            normalizeDrugRouteSortBy(
                query.sortBy
            ),

        sortOrder:
            normalizeDrugRouteSortOrder(
                query.sortOrder
            ),
    };
};


/*
 * =========================================================
 * BUILD API QUERY PARAMS
 * =========================================================
 *
 * Useful later when ASP.NET Core API is connected.
 *
 * Example:
 *
 * ?search=IV
 * &routeType=SYSTEMIC
 * &status=Active
 * &page=1
 * &pageSize=10
 * &sortBy=routeName
 * &sortOrder=asc
 */

export const buildDrugRouteQueryParams = (
    query = {}
) => {

    const normalized =
        buildDrugRouteQuery(
            query
        );


    const params =
        new URLSearchParams();


    if (
        normalized.search
    ) {

        params.set(
            "search",
            normalized.search
        );
    }


    if (
        normalized.routeType
    ) {

        params.set(
            "routeType",
            normalized.routeType
        );
    }


    if (
        normalized.status
    ) {

        params.set(
            "status",
            normalized.status
        );
    }


    if (
        normalized.usage &&
        normalized.usage !==
            "ALL"
    ) {

        params.set(
            "usage",
            normalized.usage
        );
    }


    params.set(
        "page",
        String(
            normalized.page
        )
    );


    params.set(
        "pageSize",
        String(
            normalized.pageSize
        )
    );


    params.set(
        "sortBy",
        normalized.sortBy
    );


    params.set(
        "sortOrder",
        normalized.sortOrder
    );


    return params;
};


/*
 * =========================================================
 * QUERY OBJECT FROM ANT DESIGN TABLE
 * =========================================================
 *
 * Used from:
 *
 * Table onChange(
 *   pagination,
 *   filters,
 *   sorter
 * )
 */

export const createDrugRouteQueryFromTable = ({
    pagination = {},
    filters = {},
    sorter = {},
    currentQuery = {},
} = {}) => {

    const nextQuery = {

        ...createDrugRouteQuery(
            currentQuery
        ),

        page:
            normalizeDrugRoutePage(
                pagination.current
            ),

        pageSize:
            normalizeDrugRoutePageSize(
                pagination.pageSize
            ),
    };


    /*
     * -----------------------------------------------
     * ROUTE TYPE
     * -----------------------------------------------
     */

    nextQuery.routeType =
        normalizeDrugRouteFilter(
            filters.routeType
        );


    /*
     * -----------------------------------------------
     * STATUS
     * -----------------------------------------------
     */

    nextQuery.status =
        normalizeDrugRouteFilter(
            filters.status
        );


    /*
     * -----------------------------------------------
     * USAGE
     * -----------------------------------------------
     */

    nextQuery.usage =
        normalizeDrugRouteUsage(
            filters.usage
        );


    /*
     * -----------------------------------------------
     * SORT
     * -----------------------------------------------
     */

    const sortField =
        sorter?.field ||
        sorter?.columnKey;


    if (
        sortField
    ) {

        nextQuery.sortBy =
            normalizeDrugRouteSortBy(
                sortField
            );


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
 * RESET QUERY
 * =========================================================
 */

export const resetDrugRouteQuery = () => {

    return {
        ...DEFAULT_DRUG_ROUTE_QUERY,
    };
};


/*
 * =========================================================
 * CHECK DEFAULT QUERY
 * =========================================================
 */

export const isDefaultDrugRouteQuery = (
    query = {}
) => {

    const normalized =
        buildDrugRouteQuery(
            query
        );


    return (

        normalized.search ===
            DEFAULT_DRUG_ROUTE_QUERY.search &&

        normalized.routeType ===
            DEFAULT_DRUG_ROUTE_QUERY.routeType &&

        normalized.status ===
            DEFAULT_DRUG_ROUTE_QUERY.status &&

        normalized.usage ===
            DEFAULT_DRUG_ROUTE_QUERY.usage &&

        normalized.page ===
            DEFAULT_DRUG_ROUTE_QUERY.page &&

        normalized.pageSize ===
            DEFAULT_DRUG_ROUTE_QUERY.pageSize &&

        normalized.sortBy ===
            DEFAULT_DRUG_ROUTE_QUERY.sortBy &&

        normalized.sortOrder ===
            DEFAULT_DRUG_ROUTE_QUERY.sortOrder

    );
};


/*
 * =========================================================
 * SERIALIZE QUERY
 * =========================================================
 *
 * Useful for URL query strings / caching.
 */

export const serializeDrugRouteQuery = (
    query = {}
) => {

    const params =
        buildDrugRouteQueryParams(
            query
        );


    return params.toString();
};


/*
 * =========================================================
 * PARSE QUERY PARAMS
 * =========================================================
 *
 * Useful later if filters are stored in URL.
 */

export const parseDrugRouteQueryParams = (
    searchParams
) => {

    const params =
        searchParams instanceof
        URLSearchParams
            ? searchParams
            : new URLSearchParams(
                searchParams
            );


    return buildDrugRouteQuery({

        search:
            params.get(
                "search"
            ) || "",

        routeType:
            params.get(
                "routeType"
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
            ) || "sortOrder",

        sortOrder:
            params.get(
                "sortOrder"
            ) || "asc",

    });
};


/*
 * =========================================================
 * DEFAULT EXPORT
 * =========================================================
 */

const drugRouteQuery = {

    createDrugRouteQuery,

    buildDrugRouteQuery,

    buildDrugRouteQueryParams,

    createDrugRouteQueryFromTable,

    resetDrugRouteQuery,

    isDefaultDrugRouteQuery,

    serializeDrugRouteQuery,

    parseDrugRouteQueryParams,

};


export default drugRouteQuery;