// src/modules/pharmacy/uom/utils/uom.query.js

import {
    DEFAULT_UOM_QUERY,
} from "../constants/uom.constants";


/*
 * ============================================
 * NORMALIZE SEARCH
 * ============================================
 */

export const normalizeSearch = (
    value
) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim();
};


/*
 * ============================================
 * NORMALIZE SORT ORDER
 * ============================================
 */

export const normalizeSortOrder = (
    value
) => {
    if (
        value === "descend" ||
        value === "desc"
    ) {
        return "desc";
    }

    return "asc";
};


/*
 * ============================================
 * NORMALIZE PAGE
 * ============================================
 */

export const normalizePage = (
    value
) => {
    const page =
        Number(value);

    if (
        !Number.isFinite(page) ||
        page < 1
    ) {
        return 1;
    }

    return Math.floor(page);
};


/*
 * ============================================
 * NORMALIZE PAGE SIZE
 * ============================================
 */

export const normalizePageSize = (
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
 * ============================================
 * BUILD UOM QUERY
 * ============================================
 */

export const buildUomQuery = (
    params = {}
) => {
    const query = {
        ...DEFAULT_UOM_QUERY,
        ...params,
    };


    return {
        search:
            normalizeSearch(
                query.search
            ),

        uomType:
            query.uomType ||
            undefined,

        status:
            query.status ||
            undefined,

        decimalAllowed:
            query.decimalAllowed ===
                undefined
                ? undefined
                : Boolean(
                    query.decimalAllowed
                ),

        page:
            normalizePage(
                query.page
            ),

        pageSize:
            normalizePageSize(
                query.pageSize
            ),

        sortBy:
            query.sortBy ||
            "uomName",

        sortOrder:
            normalizeSortOrder(
                query.sortOrder
            ),
    };
};


/*
 * ============================================
 * BUILD SEARCH QUERY
 * ============================================
 */

export const buildUomSearchQuery = (
    search
) => {
    return buildUomQuery({
        search,
        page: 1,
    });
};


/*
 * ============================================
 * BUILD FILTER QUERY
 * ============================================
 */

export const buildUomFilterQuery = ({
    uomType,
    status,
    decimalAllowed,
} = {}) => {
    return buildUomQuery({
        uomType,
        status,
        decimalAllowed,
        page: 1,
    });
};


/*
 * ============================================
 * BUILD PAGINATION QUERY
 * ============================================
 */

export const buildUomPaginationQuery = ({
    page,
    pageSize,
} = {}) => {
    return buildUomQuery({
        page,
        pageSize,
    });
};


/*
 * ============================================
 * BUILD SORT QUERY
 * ============================================
 */

export const buildUomSortQuery = ({
    sortBy,
    sortOrder,
} = {}) => {
    return buildUomQuery({
        sortBy,
        sortOrder,
    });
};


/*
 * ============================================
 * HANDLE ANT DESIGN TABLE CHANGE
 * ============================================
 *
 * Useful with:
 *
 * <Table
 *   onChange={handleTableChange}
 * />
 */

export const parseUomTableChange = (
    pagination = {},
    filters = {},
    sorter = {}
) => {
    let sortBy =
        sorter?.field ||
        "uomName";

    let sortOrder =
        sorter?.order ||
        "asc";


    /*
     * Ant Design:
     *
     * ascend
     * descend
     */

    if (
        sortOrder ===
        "ascend"
    ) {
        sortOrder =
            "asc";
    }

    if (
        sortOrder ===
        "descend"
    ) {
        sortOrder =
            "desc";
    }


    /*
     * Filters can return arrays.
     */

    const uomType =
        Array.isArray(
            filters?.uomType
        )
            ? filters.uomType[0]
            : filters?.uomType;


    const status =
        Array.isArray(
            filters?.status
        )
            ? filters.status[0]
            : filters?.status;


    const decimalAllowed =
        Array.isArray(
            filters?.decimalAllowed
        )
            ? filters.decimalAllowed[0]
            : filters?.decimalAllowed;


    return buildUomQuery({
        uomType,
        status,
        decimalAllowed,

        page:
            pagination?.current ||
            1,

        pageSize:
            pagination?.pageSize ||
            10,

        sortBy,

        sortOrder,
    });
};


/*
 * ============================================
 * BUILD API QUERY PARAMS
 * ============================================
 *
 * Converts internal query object into
 * URLSearchParams-friendly object.
 */

export const buildUomApiParams = (
    query = {}
) => {
    const normalized =
        buildUomQuery(
            query
        );


    const params = {
        page:
            normalized.page,

        pageSize:
            normalized.pageSize,

        sortBy:
            normalized.sortBy,

        sortOrder:
            normalized.sortOrder,
    };


    if (
        normalized.search
    ) {
        params.search =
            normalized.search;
    }


    if (
        normalized.uomType
    ) {
        params.uomType =
            normalized.uomType;
    }


    if (
        normalized.status
    ) {
        params.status =
            normalized.status;
    }


    if (
        normalized.decimalAllowed !==
        undefined
    ) {
        params.decimalAllowed =
            normalized.decimalAllowed;
    }


    return params;
};


/*
 * ============================================
 * RESET QUERY
 * ============================================
 */

export const resetUomQuery = () => {
    return {
        ...DEFAULT_UOM_QUERY,
    };
};


/*
 * ============================================
 * CHECK DEFAULT QUERY
 * ============================================
 */

export const isDefaultUomQuery = (
    query = {}
) => {
    const normalized =
        buildUomQuery(
            query
        );

    const defaultQuery =
        buildUomQuery(
            DEFAULT_UOM_QUERY
        );


    return (
        normalized.search ===
            defaultQuery.search &&

        normalized.uomType ===
            defaultQuery.uomType &&

        normalized.status ===
            defaultQuery.status &&

        normalized.decimalAllowed ===
            defaultQuery.decimalAllowed &&

        normalized.page ===
            defaultQuery.page &&

        normalized.pageSize ===
            defaultQuery.pageSize &&

        normalized.sortBy ===
            defaultQuery.sortBy &&

        normalized.sortOrder ===
            defaultQuery.sortOrder
    );
};