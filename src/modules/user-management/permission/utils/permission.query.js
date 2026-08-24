// src/modules/user-management/permission/utils/permission.query.js

import {
    PERMISSION_STATUS,
    PERMISSION_TYPES,
} from "../constants/permission.constants";

import {
    normalizePermissionCode,
    normalizePermissionName,
} from "./permission.helper";


/* =========================================================
   CREATE DEFAULT QUERY
   ========================================================= */

export const createPermissionQuery = (
    overrides = {}
) => {

    return {

        search:
            "",

        moduleCode:
            null,

        resourceCode:
            null,

        status:
            null,

        permissionType:
            null,

        scope:
            null,

        action:
            null,

        isSystemPermission:
            null,

        page:
            1,

        pageSize:
            10,

        sortBy:
            "sortOrder",

        sortOrder:
            "asc",

        ...overrides,

    };

};


/* =========================================================
   NORMALIZE QUERY
   ========================================================= */

export const normalizePermissionQuery = (
    query = {}
) => {

    return {

        ...createPermissionQuery(),

        ...query,

        search:
            String(
                query.search || ""
            ).trim(),

        page:
            Math.max(
                Number(
                    query.page
                ) || 1,
                1
            ),

        pageSize:
            Math.max(
                Number(
                    query.pageSize
                ) || 10,
                1
            ),

    };

};


/* =========================================================
   SEARCH MATCH
   ========================================================= */

export const matchesPermissionSearch = (
    permission,
    search
) => {

    const normalizedSearch =
        String(
            search || ""
        )
            .trim()
            .toLowerCase();


    if (
        !normalizedSearch
    ) {

        return true;

    }


    const searchableText = [

        permission.permissionCode,

        permission.permissionName,

        permission.moduleCode,

        permission.resourceCode,

        permission.description,

        permission.scope,

        permission.permissionType,

        ...(Array.isArray(
            permission.actions
        )
            ? permission.actions
            : []),

    ]
        .filter(
            Boolean
        )
        .join(" ")
        .toLowerCase();


    return searchableText.includes(
        normalizedSearch
    );

};


/* =========================================================
   FILTER PERMISSION
   ========================================================= */

export const matchesPermissionQuery = (
    permission,
    query = {}
) => {

    const normalizedQuery =
        normalizePermissionQuery(
            query
        );


    /* =====================================================
       SEARCH
    ===================================================== */

    if (
        !matchesPermissionSearch(
            permission,
            normalizedQuery.search
        )
    ) {

        return false;

    }


    /* =====================================================
       MODULE
    ===================================================== */

    if (
        normalizedQuery.moduleCode &&
        permission.moduleCode !==
            normalizedQuery.moduleCode
    ) {

        return false;

    }


    /* =====================================================
       RESOURCE
    ===================================================== */

    if (
        normalizedQuery.resourceCode &&
        permission.resourceCode !==
            normalizedQuery.resourceCode
    ) {

        return false;

    }


    /* =====================================================
       STATUS
    ===================================================== */

    if (
        normalizedQuery.status &&
        permission.status !==
            normalizedQuery.status
    ) {

        return false;

    }


    /* =====================================================
       TYPE
    ===================================================== */

    if (
        normalizedQuery.permissionType &&
        permission.permissionType !==
            normalizedQuery.permissionType
    ) {

        return false;

    }


    /* =====================================================
       SCOPE
    ===================================================== */

    if (
        normalizedQuery.scope &&
        permission.scope !==
            normalizedQuery.scope
    ) {

        return false;

    }


    /* =====================================================
       ACTION
    ===================================================== */

    if (
        normalizedQuery.action &&
        !(
            Array.isArray(
                permission.actions
            ) &&
            permission.actions.includes(
                normalizedQuery.action
            )
        )
    ) {

        return false;

    }


    /* =====================================================
       SYSTEM PERMISSION
    ===================================================== */

    if (
        normalizedQuery.isSystemPermission !==
        null &&
        normalizedQuery.isSystemPermission !==
        undefined
    ) {

        if (
            permission.isSystemPermission !==
            normalizedQuery.isSystemPermission
        ) {

            return false;

        }

    }


    return true;

};


/* =========================================================
   FILTER PERMISSIONS
   ========================================================= */

export const filterPermissions = (
    permissions = [],
    query = {}
) => {

    if (
        !Array.isArray(
            permissions
        )
    ) {

        return [];

    }


    return permissions.filter(
        (
            permission
        ) =>
            matchesPermissionQuery(
                permission,
                query
            )
    );

};


/* =========================================================
   SORT PERMISSIONS
   ========================================================= */

export const sortPermissions = (
    permissions = [],
    sortBy = "sortOrder",
    sortOrder = "asc"
) => {

    const list =
        [
            ...permissions,
        ];


    list.sort(
        (
            first,
            second
        ) => {

            let firstValue =
                first?.[
                    sortBy
                ];

            let secondValue =
                second?.[
                    sortBy
                ];


            /* ---------------------------------------------
               NUMBER
            --------------------------------------------- */

            if (
                sortBy ===
                    "sortOrder"
            ) {

                firstValue =
                    Number(
                        firstValue
                    ) || 0;

                secondValue =
                    Number(
                        secondValue
                    ) || 0;

            }

            /* ---------------------------------------------
               STRING
            --------------------------------------------- */

            else {

                firstValue =
                    String(
                        firstValue ??
                        ""
                    ).toLowerCase();

                secondValue =
                    String(
                        secondValue ??
                        ""
                    ).toLowerCase();

            }


            if (
                firstValue <
                secondValue
            ) {

                return sortOrder ===
                    "desc"
                    ? 1
                    : -1;

            }


            if (
                firstValue >
                secondValue
            ) {

                return sortOrder ===
                    "desc"
                    ? -1
                    : 1;

            }


            return 0;

        }
    );


    return list;

};


/* =========================================================
   PAGINATE PERMISSIONS
   ========================================================= */

export const paginatePermissions = (
    permissions = [],
    page = 1,
    pageSize = 10
) => {

    const normalizedPage =
        Math.max(
            Number(
                page
            ) || 1,
            1
        );


    const normalizedPageSize =
        Math.max(
            Number(
                pageSize
            ) || 10,
            1
        );


    const startIndex =
        (
            normalizedPage -
            1
        ) *
        normalizedPageSize;


    const endIndex =
        startIndex +
        normalizedPageSize;


    return permissions.slice(
        startIndex,
        endIndex
    );

};


/* =========================================================
   EXECUTE QUERY
   ========================================================= */

export const executePermissionQuery = (
    permissions = [],
    query = {}
) => {

    const normalizedQuery =
        normalizePermissionQuery(
            query
        );


    const filtered =
        filterPermissions(
            permissions,
            normalizedQuery
        );


    const sorted =
        sortPermissions(
            filtered,
            normalizedQuery.sortBy,
            normalizedQuery.sortOrder
        );


    const total =
        sorted.length;


    const data =
        paginatePermissions(
            sorted,
            normalizedQuery.page,
            normalizedQuery.pageSize
        );


    return {

        data,

        total,

        page:
            normalizedQuery.page,

        pageSize:
            normalizedQuery.pageSize,

        totalPages:
            Math.ceil(
                total /
                normalizedQuery.pageSize
            ),

    };

};


/* =========================================================
   QUERY ACTIVE
   ========================================================= */

export const queryActivePermissions = (
    permissions = [],
    query = {}
) => {

    return executePermissionQuery(
        permissions,
        {

            ...query,

            status:
                PERMISSION_STATUS.ACTIVE,

        }
    );

};


/* =========================================================
   QUERY SYSTEM
   ========================================================= */

export const querySystemPermissions = (
    permissions = [],
    query = {}
) => {

    return executePermissionQuery(
        permissions,
        {

            ...query,

            permissionType:
                PERMISSION_TYPES.SYSTEM,

            isSystemPermission:
                true,

        }
    );

};


/* =========================================================
   QUERY CUSTOM
   ========================================================= */

export const queryCustomPermissions = (
    permissions = [],
    query = {}
) => {

    return executePermissionQuery(
        permissions,
        {

            ...query,

            permissionType:
                PERMISSION_TYPES.CUSTOM,

            isSystemPermission:
                false,

        }
    );

};


/* =========================================================
   SEARCH ONLY
   ========================================================= */

export const searchPermissions = (
    permissions = [],
    search = ""
) => {

    return filterPermissions(
        permissions,
        {
            search,
        }
    );

};


/* =========================================================
   MODULE FILTER
   ========================================================= */

export const filterPermissionsByModule = (
    permissions = [],
    moduleCode
) => {

    if (
        !moduleCode
    ) {

        return permissions;

    }


    return permissions.filter(
        (
            permission
        ) =>
            permission.moduleCode ===
            moduleCode
    );

};


/* =========================================================
   RESOURCE FILTER
   ========================================================= */

export const filterPermissionsByResource = (
    permissions = [],
    resourceCode
) => {

    if (
        !resourceCode
    ) {

        return permissions;

    }


    return permissions.filter(
        (
            permission
        ) =>
            permission.resourceCode ===
            resourceCode
    );

};


/* =========================================================
   ACTION FILTER
   ========================================================= */

export const filterPermissionsByAction = (
    permissions = [],
    action
) => {

    if (
        !action
    ) {

        return permissions;

    }


    return permissions.filter(
        (
            permission
        ) =>
            Array.isArray(
                permission.actions
            ) &&
            permission.actions.includes(
                action
            )
    );

};


/* =========================================================
   DUPLICATE CODE QUERY
   ========================================================= */

export const findPermissionByCode = (
    permissions = [],
    code
) => {

    const normalizedCode =
        normalizePermissionCode(
            code
        );


    return (
        permissions.find(
            (
                permission
            ) =>
                normalizePermissionCode(
                    permission.permissionCode
                ) ===
                normalizedCode
        ) ||
        null
    );

};


/* =========================================================
   DUPLICATE NAME QUERY
   ========================================================= */

export const findPermissionByName = (
    permissions = [],
    name
) => {

    const normalizedName =
        normalizePermissionName(
            name
        ).toLowerCase();


    return (
        permissions.find(
            (
                permission
            ) =>
                normalizePermissionName(
                    permission.permissionName
                )
                    .toLowerCase() ===
                normalizedName
        ) ||
        null
    );

};


/* =========================================================
   SUMMARY
   ========================================================= */

export const getPermissionQuerySummary = (
    permissions = []
) => {

    const total =
        permissions.length;


    const active =
        permissions.filter(
            (
                permission
            ) =>
                permission.status ===
                PERMISSION_STATUS.ACTIVE
        ).length;


    const inactive =
        permissions.filter(
            (
                permission
            ) =>
                permission.status ===
                PERMISSION_STATUS.INACTIVE
        ).length;


    const system =
        permissions.filter(
            (
                permission
            ) =>
                permission.isSystemPermission ===
                true
        ).length;


    const custom =
        permissions.filter(
            (
                permission
            ) =>
                permission.permissionType ===
                PERMISSION_TYPES.CUSTOM
        ).length;


    return {

        total,

        active,

        inactive,

        system,

        custom,

    };

};