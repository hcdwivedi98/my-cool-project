// src/modules/pharmacy/drug-strength/utils/drugStrength.query.js

import {
    DRUG_STRENGTH_DEFAULT_QUERY,
    DRUG_STRENGTH_SORT_ORDER,
    DRUG_STRENGTH_USAGE,
} from "../constants/drugStrength.constants";


/* =========================================================
   NORMALIZE PAGE
   ========================================================= */

const normalizePage = (
    value
) => {

    const page =
        Number(
            value
        );


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


/* =========================================================
   NORMALIZE PAGE SIZE
   ========================================================= */

const normalizePageSize = (
    value
) => {

    const pageSize =
        Number(
            value
        );


    if (
        !Number.isFinite(
            pageSize
        ) ||
        pageSize < 1
    ) {
        return 10;
    }


    return Math.floor(
        pageSize
    );
};


/* =========================================================
   NORMALIZE SEARCH
   ========================================================= */

const normalizeSearch = (
    value
) => {

    return String(
        value ||
        ""
    ).trim();
};


/* =========================================================
   NORMALIZE SORT ORDER
   ========================================================= */

const normalizeSortOrder = (
    value
) => {

    if (
        value ===
        DRUG_STRENGTH_SORT_ORDER.DESC
    ) {
        return DRUG_STRENGTH_SORT_ORDER.DESC;
    }


    return DRUG_STRENGTH_SORT_ORDER.ASC;
};


/* =========================================================
   NORMALIZE USAGE
   ========================================================= */

const normalizeUsage = (
    value
) => {

    if (
        value ===
        DRUG_STRENGTH_USAGE.USED
    ) {
        return DRUG_STRENGTH_USAGE.USED;
    }


    if (
        value ===
        DRUG_STRENGTH_USAGE.UNUSED
    ) {
        return DRUG_STRENGTH_USAGE.UNUSED;
    }


    return DRUG_STRENGTH_USAGE.ALL;
};


/* =========================================================
   CREATE QUERY
   ========================================================= */

export const createDrugStrengthQuery = (
    overrides = {}
) => {

    const mergedQuery = {

        ...DRUG_STRENGTH_DEFAULT_QUERY,

        ...overrides,

    };


    return {

        search:
            normalizeSearch(
                mergedQuery.search
            ),

        strengthType:
            mergedQuery.strengthType ||
            undefined,

        strengthUnitId:
            mergedQuery.strengthUnitId ||
            undefined,

        status:
            mergedQuery.status ||
            undefined,

        usage:
            normalizeUsage(
                mergedQuery.usage
            ),

        page:
            normalizePage(
                mergedQuery.page
            ),

        pageSize:
            normalizePageSize(
                mergedQuery.pageSize
            ),

        sortBy:
            mergedQuery.sortBy ||
            "sortOrder",

        sortOrder:
            normalizeSortOrder(
                mergedQuery.sortOrder
            ),

    };
};


/* =========================================================
   CREATE QUERY FROM TABLE
   ========================================================= */

export const createDrugStrengthQueryFromTable = ({
    pagination = {},
    filters = {},
    sorter = {},
    currentQuery = {},
} = {}) => {

    /*
     * Ant Design sorter can be:
     *
     * object
     * OR
     * array
     */

    const activeSorter =
        Array.isArray(
            sorter
        )
            ? sorter.find(
                (
                    item
                ) =>
                    item &&
                    item.order
            )
            : sorter;


    const nextPage =
        pagination.current ??
        currentQuery.page ??
        1;


    const nextPageSize =
        pagination.pageSize ??
        currentQuery.pageSize ??
        10;


    const nextSortBy =
        activeSorter?.field ||
        activeSorter?.columnKey ||
        currentQuery.sortBy ||
        "sortOrder";


    const nextSortOrder =
        activeSorter?.order ===
        "descend"
            ? DRUG_STRENGTH_SORT_ORDER.DESC
            : activeSorter?.order ===
                "ascend"
                ? DRUG_STRENGTH_SORT_ORDER.ASC
                : currentQuery.sortOrder ||
                    DRUG_STRENGTH_SORT_ORDER.ASC;


    /*
     * Ant Design filters
     */

    const strengthTypeFilter =
        filters.strengthType;


    const unitFilter =
        filters.strengthUnitId;


    const statusFilter =
        filters.status;


    const usageFilter =
        filters.usage;


    return createDrugStrengthQuery({

        ...currentQuery,

        page:
            nextPage,

        pageSize:
            nextPageSize,

        strengthType:
            Array.isArray(
                strengthTypeFilter
            )
                ? strengthTypeFilter[0]
                : strengthTypeFilter ||
                    currentQuery.strengthType,

        strengthUnitId:
            Array.isArray(
                unitFilter
            )
                ? unitFilter[0]
                : unitFilter ||
                    currentQuery.strengthUnitId,

        status:
            Array.isArray(
                statusFilter
            )
                ? statusFilter[0]
                : statusFilter ||
                    currentQuery.status,

        usage:
            Array.isArray(
                usageFilter
            )
                ? usageFilter[0]
                : usageFilter ||
                    currentQuery.usage,

        sortBy:
            nextSortBy,

        sortOrder:
            nextSortOrder,

    });
};


/* =========================================================
   UPDATE SEARCH
   ========================================================= */

export const updateDrugStrengthSearch = (
    currentQuery = {},
    search = ""
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        search,

        page:
            1,

    });
};


/* =========================================================
   UPDATE STRENGTH TYPE
   ========================================================= */

export const updateDrugStrengthType = (
    currentQuery = {},
    strengthType
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        strengthType,

        page:
            1,

    });
};


/* =========================================================
   UPDATE UNIT
   ========================================================= */

export const updateDrugStrengthUnit = (
    currentQuery = {},
    strengthUnitId
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        strengthUnitId,

        page:
            1,

    });
};


/* =========================================================
   UPDATE STATUS
   ========================================================= */

export const updateDrugStrengthStatus = (
    currentQuery = {},
    status
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        status,

        page:
            1,

    });
};


/* =========================================================
   UPDATE USAGE
   ========================================================= */

export const updateDrugStrengthUsage = (
    currentQuery = {},
    usage
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        usage,

        page:
            1,

    });
};


/* =========================================================
   RESET QUERY
   ========================================================= */

export const resetDrugStrengthQuery = () => {

    return createDrugStrengthQuery();
};


/* =========================================================
   UPDATE PAGE
   ========================================================= */

export const updateDrugStrengthPage = (
    currentQuery = {},
    page
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        page,

    });
};


/* =========================================================
   UPDATE PAGE SIZE
   ========================================================= */

export const updateDrugStrengthPageSize = (
    currentQuery = {},
    pageSize
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        page:
            1,

        pageSize,

    });
};


/* =========================================================
   UPDATE SORT
   ========================================================= */

export const updateDrugStrengthSort = (
    currentQuery = {},
    sortBy,
    sortOrder
) => {

    return createDrugStrengthQuery({

        ...currentQuery,

        sortBy,

        sortOrder,

    });
};


/* =========================================================
   QUERY TO API PARAMS
   ========================================================= */

export const drugStrengthQueryToApiParams = (
    query = {}
) => {

    const normalizedQuery =
        createDrugStrengthQuery(
            query
        );


    const params = {

        page:
            normalizedQuery.page,

        pageSize:
            normalizedQuery.pageSize,

        sortBy:
            normalizedQuery.sortBy,

        sortOrder:
            normalizedQuery.sortOrder,

    };


    if (
        normalizedQuery.search
    ) {

        params.search =
            normalizedQuery.search;
    }


    if (
        normalizedQuery.strengthType
    ) {

        params.strengthType =
            normalizedQuery.strengthType;
    }


    if (
        normalizedQuery.strengthUnitId
    ) {

        params.strengthUnitId =
            normalizedQuery.strengthUnitId;
    }


    if (
        normalizedQuery.status
    ) {

        params.status =
            normalizedQuery.status;
    }


    if (
        normalizedQuery.usage &&
        normalizedQuery.usage !==
            DRUG_STRENGTH_USAGE.ALL
    ) {

        params.usage =
            normalizedQuery.usage;
    }


    return params;
};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default {

    createDrugStrengthQuery,

    createDrugStrengthQueryFromTable,

    updateDrugStrengthSearch,

    updateDrugStrengthType,

    updateDrugStrengthUnit,

    updateDrugStrengthStatus,

    updateDrugStrengthUsage,

    resetDrugStrengthQuery,

    updateDrugStrengthPage,

    updateDrugStrengthPageSize,

    updateDrugStrengthSort,

    drugStrengthQueryToApiParams,

};