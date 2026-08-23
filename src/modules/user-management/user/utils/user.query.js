/* =========================================================
   USER QUERY BUILDER
   ========================================================= */

import {
    USER_DEFAULT_PAGE,
    USER_DEFAULT_PAGE_SIZE,
    USER_SORT_ORDERS,
    USER_USAGE,
} from "../constants/user.constants";


/* =========================================================
   CREATE DEFAULT QUERY
   ========================================================= */

export const createUserQuery = (
    overrides = {}
) => ({

    page:
        USER_DEFAULT_PAGE,

    pageSize:
        USER_DEFAULT_PAGE_SIZE,

    search:
        "",

    status:
        undefined,

    userType:
        undefined,

    departmentId:
        undefined,

    designationId:
        undefined,

    roleId:
        undefined,

    usage:
        USER_USAGE.ALL,

    sortField:
        "displayName",

    sortOrder:
        USER_SORT_ORDERS.ASCEND,

    ...overrides,

});


/* =========================================================
   NORMALIZE SORT ORDER
   ========================================================= */

export const normalizeUserSortOrder = (
    order
) => {

    if (
        order ===
        USER_SORT_ORDERS.DESCEND
    ) {
        return "desc";
    }


    return "asc";
};


/* =========================================================
   NORMALIZE QUERY
   ========================================================= */

export const normalizeUserQuery = (
    query = {}
) => {

    return {

        page:
            Number(
                query.page
            ) || USER_DEFAULT_PAGE,

        pageSize:
            Number(
                query.pageSize
            ) || USER_DEFAULT_PAGE_SIZE,

        search:
            query.search?.trim() ||
            "",

        status:
            query.status ||
            undefined,

        userType:
            query.userType ||
            undefined,

        departmentId:
            query.departmentId ||
            undefined,

        designationId:
            query.designationId ||
            undefined,

        roleId:
            query.roleId ||
            undefined,

        usage:
            query.usage ||
            USER_USAGE.ALL,

        sortField:
            query.sortField ||
            "displayName",

        sortOrder:
            normalizeUserSortOrder(
                query.sortOrder
            ),

    };
};


/* =========================================================
   TABLE → QUERY
   ========================================================= */

export const createUserQueryFromTable = ({
    pagination = {},
    filters = {},
    sorter = {},
    currentQuery = {},
} = {}) => {

    const normalizedSorter =
        Array.isArray(
            sorter
        )
            ? sorter[0]
            : sorter;


    const nextQuery =
        createUserQuery(
            currentQuery
        );


    /* =============================================
       PAGINATION
    ============================================== */

    nextQuery.page =
        pagination.current ||
        USER_DEFAULT_PAGE;


    nextQuery.pageSize =
        pagination.pageSize ||
        USER_DEFAULT_PAGE_SIZE;


    /* =============================================
       STATUS FILTER
    ============================================== */

    if (
        filters.status
    ) {

        nextQuery.status =
            Array.isArray(
                filters.status
            )
                ? filters.status[0]
                : filters.status;

    }


    /* =============================================
       USER TYPE FILTER
    ============================================== */

    if (
        filters.userType
    ) {

        nextQuery.userType =
            Array.isArray(
                filters.userType
            )
                ? filters.userType[0]
                : filters.userType;

    }


    /* =============================================
       DEPARTMENT FILTER
    ============================================== */

    if (
        filters.departmentId
    ) {

        nextQuery.departmentId =
            Array.isArray(
                filters.departmentId
            )
                ? filters.departmentId[0]
                : filters.departmentId;

    }


    /* =============================================
       DESIGNATION FILTER
    ============================================== */

    if (
        filters.designationId
    ) {

        nextQuery.designationId =
            Array.isArray(
                filters.designationId
            )
                ? filters.designationId[0]
                : filters.designationId;

    }


    /* =============================================
       ROLE FILTER
    ============================================== */

    if (
        filters.roleId
    ) {

        nextQuery.roleId =
            Array.isArray(
                filters.roleId
            )
                ? filters.roleId[0]
                : filters.roleId;

    }


    /* =============================================
       LOGIN USAGE FILTER
    ============================================== */

    if (
        filters.usage
    ) {

        nextQuery.usage =
            Array.isArray(
                filters.usage
            )
                ? filters.usage[0]
                : filters.usage;

    }


    /* =============================================
       SORTING
    ============================================== */

    if (
        normalizedSorter?.field
    ) {

        nextQuery.sortField =
            normalizedSorter.field;

        nextQuery.sortOrder =
            normalizedSorter.order ||
            USER_SORT_ORDERS.ASCEND;

    }


    return nextQuery;
};


/* =========================================================
   CREATE QUERY STRING
   ========================================================= */

export const createUserQueryString = (
    query = {}
) => {

    const normalizedQuery =
        normalizeUserQuery(
            query
        );


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(
            normalizedQuery.page
        )
    );


    params.set(
        "pageSize",
        String(
            normalizedQuery.pageSize
        )
    );


    if (
        normalizedQuery.search
    ) {

        params.set(
            "search",
            normalizedQuery.search
        );

    }


    if (
        normalizedQuery.status
    ) {

        params.set(
            "status",
            normalizedQuery.status
        );

    }


    if (
        normalizedQuery.userType
    ) {

        params.set(
            "userType",
            normalizedQuery.userType
        );

    }


    if (
        normalizedQuery.departmentId
    ) {

        params.set(
            "departmentId",
            normalizedQuery.departmentId
        );

    }


    if (
        normalizedQuery.designationId
    ) {

        params.set(
            "designationId",
            normalizedQuery.designationId
        );

    }


    if (
        normalizedQuery.roleId
    ) {

        params.set(
            "roleId",
            normalizedQuery.roleId
        );

    }


    if (
        normalizedQuery.usage &&
        normalizedQuery.usage !==
            USER_USAGE.ALL
    ) {

        params.set(
            "usage",
            normalizedQuery.usage
        );

    }


    if (
        normalizedQuery.sortField
    ) {

        params.set(
            "sortField",
            normalizedQuery.sortField
        );

    }


    if (
        normalizedQuery.sortOrder
    ) {

        params.set(
            "sortOrder",
            normalizedQuery.sortOrder
        );

    }


    return params.toString();
};


/* =========================================================
   RESET QUERY
   ========================================================= */

export const resetUserQuery = () =>
    createUserQuery();


/* =========================================================
   EXPORT
   ========================================================= */

export default {

    createUserQuery,

    normalizeUserQuery,

    normalizeUserSortOrder,

    createUserQueryFromTable,

    createUserQueryString,

    resetUserQuery,

};