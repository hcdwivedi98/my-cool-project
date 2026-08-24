// src/modules/user-management/role/utils/role.query.js

import {
    ROLE_STATUS,
} from "../constants/role.constants";


/* =========================================================
   DEFAULT QUERY
   ========================================================= */

export const createRoleQuery = () => {

    return {

        page:
            1,

        pageSize:
            10,

        search:
            "",

        roleType:
            undefined,

        scope:
            undefined,

        status:
            undefined,

        sortBy:
            "updatedAt",

        sortOrder:
            "desc",

    };

};


/* =========================================================
   NORMALIZE SORT ORDER
   ========================================================= */

const normalizeSortOrder = (
    order
) => {

    if (
        order ===
        "ascend"
    ) {

        return "asc";

    }


    if (
        order ===
        "descend"
    ) {

        return "desc";

    }


    return undefined;

};


/* =========================================================
   GET SORT FIELD
   ========================================================= */

const getSortField = (
    sorter
) => {

    if (
        !sorter
    ) {

        return undefined;

    }


    if (
        Array.isArray(
            sorter
        )
    ) {

        const activeSorter =
            sorter.find(
                (
                    item
                ) =>
                    item.order
            );


        return (
            activeSorter?.field ||
            activeSorter?.columnKey
        );

    }


    return (
        sorter.field ||
        sorter.columnKey
    );

};


/* =========================================================
   GET SORT ORDER
   ========================================================= */

const getSortOrder = (
    sorter
) => {

    if (
        !sorter
    ) {

        return undefined;

    }


    if (
        Array.isArray(
            sorter
        )
    ) {

        const activeSorter =
            sorter.find(
                (
                    item
                ) =>
                    item.order
            );


        return normalizeSortOrder(
            activeSorter?.order
        );

    }


    return normalizeSortOrder(
        sorter.order
    );

};


/* =========================================================
   TABLE → QUERY
   ========================================================= */

export const createRoleQueryFromTable = ({
    pagination,
    filters,
    sorter,
    currentQuery = createRoleQuery(),
} = {}) => {

    const nextQuery = {

        ...currentQuery,

    };


    /* =====================================================
       PAGINATION
    ===================================================== */

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


    /* =====================================================
       ROLE TYPE
    ===================================================== */

    if (
        filters &&
        Object.prototype.hasOwnProperty.call(
            filters,
            "roleType"
        )
    ) {

        nextQuery.roleType =
            filters.roleType?.[0] ||
            undefined;

    }


    /* =====================================================
       SCOPE
    ===================================================== */

    if (
        filters &&
        Object.prototype.hasOwnProperty.call(
            filters,
            "scope"
        )
    ) {

        nextQuery.scope =
            filters.scope?.[0] ||
            undefined;

    }


    /* =====================================================
       STATUS
    ===================================================== */

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


    /* =====================================================
       SORT
    ===================================================== */

    const sortBy =
        getSortField(
            sorter
        );


    const sortOrder =
        getSortOrder(
            sorter
        );


    if (
        sortBy
    ) {

        nextQuery.sortBy =
            sortBy;

        nextQuery.sortOrder =
            sortOrder ||
            "asc";

    }
    else {

        nextQuery.sortBy =
            undefined;

        nextQuery.sortOrder =
            undefined;

    }


    return nextQuery;

};


/* =========================================================
   QUERY → API PARAMETERS
   ========================================================= */

export const buildRoleQueryParams = (
    query = createRoleQuery()
) => {

    return {

        page:
            query.page,

        pageSize:
            query.pageSize,

        search:
            query.search ||
            undefined,

        roleType:
            query.roleType ||
            undefined,

        scope:
            query.scope ||
            undefined,

        status:
            query.status ||
            undefined,

        sortBy:
            query.sortBy ||
            undefined,

        sortOrder:
            query.sortOrder ||
            undefined,

    };

};


/* =========================================================
   RESET QUERY
   ========================================================= */

export const resetRoleQuery = () => {

    return createRoleQuery();

};


/* =========================================================
   SEARCH QUERY
   ========================================================= */

export const applyRoleSearch = (
    query,
    search
) => {

    return {

        ...query,

        search:
            String(
                search || ""
            ).trim(),

        page:
            1,

    };

};


/* =========================================================
   STATUS QUERY
   ========================================================= */

export const applyRoleStatusFilter = (
    query,
    status
) => {

    return {

        ...query,

        status:
            status ||
            undefined,

        page:
            1,

    };

};


/* =========================================================
   ROLE TYPE QUERY
   ========================================================= */

export const applyRoleTypeFilter = (
    query,
    roleType
) => {

    return {

        ...query,

        roleType:
            roleType ||
            undefined,

        page:
            1,

    };

};


/* =========================================================
   SCOPE QUERY
   ========================================================= */

export const applyRoleScopeFilter = (
    query,
    scope
) => {

    return {

        ...query,

        scope:
            scope ||
            undefined,

        page:
            1,

    };

};


/* =========================================================
   VALIDATE QUERY
   ========================================================= */

export const normalizeRoleQuery = (
    query = {}
) => {

    const defaults =
        createRoleQuery();


    const page =
        Number(
            query.page
        );


    const pageSize =
        Number(
            query.pageSize
        );


    const validStatus =
        [
            ROLE_STATUS.ACTIVE,
            ROLE_STATUS.INACTIVE,
        ].includes(
            query.status
        );


    return {

        ...defaults,

        ...query,

        page:
            Number.isFinite(
                page
            ) &&
            page > 0
                ? page
                : defaults.page,

        pageSize:
            Number.isFinite(
                pageSize
            ) &&
            pageSize > 0
                ? pageSize
                : defaults.pageSize,

        search:
            String(
                query.search ||
                ""
            ).trim(),

        status:
            validStatus
                ? query.status
                : undefined,

    };

};


/* =========================================================
   QUERY KEY
   ========================================================= */

export const createRoleQueryKey = (
    query = createRoleQuery()
) => {

    const normalized =
        normalizeRoleQuery(
            query
        );


    return JSON.stringify(
        normalized
    );

};


/* =========================================================
   EXPORT DEFAULT
   ========================================================= */

export default {

    createRoleQuery,

    createRoleQueryFromTable,

    buildRoleQueryParams,

    resetRoleQuery,

    applyRoleSearch,

    applyRoleStatusFilter,

    applyRoleTypeFilter,

    applyRoleScopeFilter,

    normalizeRoleQuery,

    createRoleQueryKey,

};