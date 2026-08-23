/* =========================================================
   DRUG UNIT QUERY
   ========================================================= */

import {
    DRUG_UNIT_PAGINATION,
    DRUG_UNIT_SORT_FIELDS,
    DRUG_UNIT_USAGE,
} from "../constants/drugUnit.constants";


/* =========================================================
   DEFAULT QUERY
   ========================================================= */

export const createDrugUnitQuery = (
    overrides = {}
) => {

    return {

        page:
            DRUG_UNIT_PAGINATION.DEFAULT_PAGE,

        pageSize:
            DRUG_UNIT_PAGINATION.DEFAULT_PAGE_SIZE,

        search:
            "",

        unitType:
            undefined,

        status:
            undefined,

        usage:
            DRUG_UNIT_USAGE.ALL,

        sortField:
            DRUG_UNIT_SORT_FIELDS.UNIT_NAME,

        sortOrder:
            "ascend",

        ...overrides,

    };
};


/* =========================================================
   NORMALIZE PAGE
   ========================================================= */

export const normalizeDrugUnitPage = (
    value
) => {

    const page =
        Number(value);


    if (
        !Number.isInteger(
            page
        ) ||
        page < 1
    ) {

        return 1;
    }


    return page;
};


/* =========================================================
   NORMALIZE PAGE SIZE
   ========================================================= */

export const normalizeDrugUnitPageSize = (
    value
) => {

    const pageSize =
        Number(value);


    if (
        !Number.isInteger(
            pageSize
        ) ||
        pageSize <= 0
    ) {

        return (
            DRUG_UNIT_PAGINATION
                .DEFAULT_PAGE_SIZE
        );
    }


    return pageSize;
};


/* =========================================================
   NORMALIZE SEARCH
   ========================================================= */

export const normalizeDrugUnitSearch = (
    value
) => {

    if (
        value ===
        null ||
        value ===
        undefined
    ) {

        return "";
    }


    return String(
        value
    ).trim();
};


/* =========================================================
   NORMALIZE SORT ORDER
   ========================================================= */

export const normalizeDrugUnitSortOrder = (
    value
) => {

    return (
        value === "descend"
            ? "descend"
            : "ascend"
    );
};


/* =========================================================
   NORMALIZE SORT FIELD
   ========================================================= */

export const normalizeDrugUnitSortField = (
    value
) => {

    const allowedFields =
        Object.values(
            DRUG_UNIT_SORT_FIELDS
        );


    return allowedFields.includes(
        value
    )
        ? value
        : DRUG_UNIT_SORT_FIELDS.UNIT_NAME;
};


/* =========================================================
   NORMALIZE QUERY
   ========================================================= */

export const normalizeDrugUnitQuery = (
    query = {}
) => {

    return {

        page:
            normalizeDrugUnitPage(
                query.page
            ),

        pageSize:
            normalizeDrugUnitPageSize(
                query.pageSize
            ),

        search:
            normalizeDrugUnitSearch(
                query.search
            ),

        unitType:
            query.unitType ||
            undefined,

        status:
            query.status ||
            undefined,

        usage:
            query.usage ||
            DRUG_UNIT_USAGE.ALL,

        sortField:
            normalizeDrugUnitSortField(
                query.sortField
            ),

        sortOrder:
            normalizeDrugUnitSortOrder(
                query.sortOrder
            ),

    };
};


/* =========================================================
   TABLE SORTER
   ========================================================= */

export const getDrugUnitSorterQuery = (
    sorter
) => {

    if (
        !sorter
    ) {

        return {

            sortField:
                DRUG_UNIT_SORT_FIELDS
                    .UNIT_NAME,

            sortOrder:
                "ascend",

        };
    }


    /*
     * Ant Design can return an array
     * for multiple sorter configuration.
     */

    const activeSorter =
        Array.isArray(
            sorter
        )
            ? sorter.find(
                (item) =>
                    item?.order
            )
            : sorter;


    if (
        !activeSorter?.order
    ) {

        return {

            sortField:
                DRUG_UNIT_SORT_FIELDS
                    .UNIT_NAME,

            sortOrder:
                "ascend",

        };
    }


    return {

        sortField:
            normalizeDrugUnitSortField(
                activeSorter.field ||
                activeSorter.columnKey
            ),

        sortOrder:
            normalizeDrugUnitSortOrder(
                activeSorter.order
            ),

    };
};


/* =========================================================
   TABLE FILTERS
   ========================================================= */

export const getDrugUnitFiltersQuery = (
    filters = {}
) => {

    const unitType =
        filters?.unitType;

    const status =
        filters?.status;

    const usage =
        filters?.usage;


    return {

        unitType:
            Array.isArray(
                unitType
            )
                ? unitType[0]
                : unitType,

        status:
            Array.isArray(
                status
            )
                ? status[0]
                : status,

        usage:
            Array.isArray(
                usage
            )
                ? usage[0]
                : usage,

    };
};


/* =========================================================
   CREATE QUERY FROM TABLE
   ========================================================= */

export const createDrugUnitQueryFromTable = (
    {
        pagination,
        filters,
        sorter,
        currentQuery = {},
    } = {}
) => {

    const filterQuery =
        getDrugUnitFiltersQuery(
            filters
        );


    const sorterQuery =
        getDrugUnitSorterQuery(
            sorter
        );


    return normalizeDrugUnitQuery({

        ...currentQuery,

        page:
            normalizeDrugUnitPage(
                pagination?.current
            ),

        pageSize:
            normalizeDrugUnitPageSize(
                pagination?.pageSize
            ),

        unitType:
            filterQuery.unitType,

        status:
            filterQuery.status,

        usage:
            filterQuery.usage ||
            DRUG_UNIT_USAGE.ALL,

        sortField:
            sorterQuery.sortField,

        sortOrder:
            sorterQuery.sortOrder,

    });
};


/* =========================================================
   QUERY PARAMS
   ========================================================= */

export const buildDrugUnitQueryParams = (
    query = {}
) => {

    const normalized =
        normalizeDrugUnitQuery(
            query
        );


    const params = {

        page:
            normalized.page,

        pageSize:
            normalized.pageSize,

    };


    /* =============================================
       SEARCH
    ============================================== */

    if (
        normalized.search
    ) {

        params.search =
            normalized.search;
    }


    /* =============================================
       UNIT TYPE
    ============================================== */

    if (
        normalized.unitType
    ) {

        params.unitType =
            normalized.unitType;
    }


    /* =============================================
       STATUS
    ============================================== */

    if (
        normalized.status
    ) {

        params.status =
            normalized.status;
    }


    /* =============================================
       USAGE
    ============================================== */

    if (
        normalized.usage &&
        normalized.usage !==
            DRUG_UNIT_USAGE.ALL
    ) {

        params.usage =
            normalized.usage;
    }


    /* =============================================
       SORT
    ============================================== */

    if (
        normalized.sortField
    ) {

        params.sortField =
            normalized.sortField;
    }


    if (
        normalized.sortOrder
    ) {

        params.sortOrder =
            normalized.sortOrder;
    }


    return params;
};


/* =========================================================
   RESET QUERY
   ========================================================= */

export const resetDrugUnitQuery = () => {

    return createDrugUnitQuery();
};


/* =========================================================
   QUERY HAS FILTERS
   ========================================================= */

export const hasDrugUnitFilters = (
    query = {}
) => {

    return Boolean(

        normalizeDrugUnitSearch(
            query.search
        )

        ||

        query.unitType

        ||

        query.status

        ||

        (
            query.usage &&
            query.usage !==
                DRUG_UNIT_USAGE.ALL
        )

    );
};


/* =========================================================
   QUERY SUMMARY
   ========================================================= */

export const getDrugUnitQuerySummary = (
    query = {}
) => {

    const normalized =
        normalizeDrugUnitQuery(
            query
        );


    return {

        page:
            normalized.page,

        pageSize:
            normalized.pageSize,

        search:
            normalized.search,

        unitType:
            normalized.unitType,

        status:
            normalized.status,

        usage:
            normalized.usage,

        sortField:
            normalized.sortField,

        sortOrder:
            normalized.sortOrder,

    };
};


/* =========================================================
   EXPORT DEFAULT
   ========================================================= */

const drugUnitQuery = {

    createDrugUnitQuery,

    normalizeDrugUnitPage,

    normalizeDrugUnitPageSize,

    normalizeDrugUnitSearch,

    normalizeDrugUnitSortOrder,

    normalizeDrugUnitSortField,

    normalizeDrugUnitQuery,

    getDrugUnitSorterQuery,

    getDrugUnitFiltersQuery,

    createDrugUnitQueryFromTable,

    buildDrugUnitQueryParams,

    resetDrugUnitQuery,

    hasDrugUnitFilters,

    getDrugUnitQuerySummary,

};


export default drugUnitQuery;