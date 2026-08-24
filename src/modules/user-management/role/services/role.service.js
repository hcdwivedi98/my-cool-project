// src/modules/user-management/role/services/role.service.js

import {
    roleList,
    permissionList,
} from "../mock/role.mock";

import {
    ROLE_STATUS,
} from "../constants/role.constants";

import {
    createEmptyRole,
    normalizeRoleCode,
    normalizeRoleName,
} from "../utils/role.helper";


/* =========================================================
   LOCAL DATA STORE
   ========================================================= */

let roles = [
    ...roleList,
];

let permissions = [
    ...permissionList,
];


/* =========================================================
   ID GENERATOR
   ========================================================= */

const generateId = (
    prefix = "ROLE"
) => {

    return `${prefix}-${Date.now()}-${Math.floor(
        Math.random() * 10000
    )}`;

};


/* =========================================================
   DELAY
   ========================================================= */

const delay = (
    milliseconds = 300
) => {

    return new Promise(
        (
            resolve
        ) => {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

};


/* =========================================================
   PAGINATION
   ========================================================= */

const paginate = (
    items,
    page,
    pageSize
) => {

    const safePage =
        Math.max(
            Number(page) || 1,
            1
        );

    const safePageSize =
        Math.max(
            Number(pageSize) || 10,
            1
        );


    const start =
        (
            safePage -
            1
        ) *
        safePageSize;


    const end =
        start +
        safePageSize;


    return {

        items:
            items.slice(
                start,
                end
            ),

        total:
            items.length,

    };

};


/* =========================================================
   SEARCH
   ========================================================= */

const matchesSearch = (
    role,
    search
) => {

    if (
        !search
    ) {

        return true;

    }


    const keyword =
        String(
            search
        )
            .trim()
            .toLowerCase();


    if (!keyword) {

        return true;

    }


    return [

        role.roleCode,

        role.roleName,

        role.description,

        role.roleType,

        role.scope,

    ]
        .filter(
            Boolean
        )
        .some(
            (
                value
            ) =>
                String(
                    value
                )
                    .toLowerCase()
                    .includes(
                        keyword
                    )
        );

};


/* =========================================================
   FILTER
   ========================================================= */

const applyFilters = (
    source,
    query = {}
) => {

    let result = [
        ...source,
    ];


    /* =====================================================
       SEARCH
    ===================================================== */

    result =
        result.filter(
            (
                role
            ) =>
                matchesSearch(
                    role,
                    query.search
                )
        );


    /* =====================================================
       ROLE TYPE
    ===================================================== */

    if (
        query.roleType
    ) {

        result =
            result.filter(
                (
                    role
                ) =>
                    role.roleType ===
                    query.roleType
            );

    }


    /* =====================================================
       SCOPE
    ===================================================== */

    if (
        query.scope
    ) {

        result =
            result.filter(
                (
                    role
                ) =>
                    role.scope ===
                    query.scope
            );

    }


    /* =====================================================
       STATUS
    ===================================================== */

    if (
        query.status
    ) {

        result =
            result.filter(
                (
                    role
                ) =>
                    role.status ===
                    query.status
            );

    }


    return result;

};


/* =========================================================
   SORT
   ========================================================= */

const applySort = (
    source,
    sortBy,
    sortOrder
) => {

    if (
        !sortBy
    ) {

        return source;

    }


    const result = [
        ...source,
    ];


    result.sort(
        (
            first,
            second
        ) => {

            const firstValue =
                first?.[
                    sortBy
                ];

            const secondValue =
                second?.[
                    sortBy
                ];


            if (
                firstValue ==
                null
            ) {

                return 1;

            }


            if (
                secondValue ==
                null
            ) {

                return -1;

            }


            if (
                typeof firstValue ===
                "number" &&
                typeof secondValue ===
                "number"
            ) {

                return sortOrder ===
                    "desc"
                    ? secondValue -
                      firstValue
                    : firstValue -
                      secondValue;

            }


            const firstString =
                String(
                    firstValue
                ).toLowerCase();


            const secondString =
                String(
                    secondValue
                ).toLowerCase();


            const comparison =
                firstString.localeCompare(
                    secondString
                );


            return sortOrder ===
                "desc"
                ? -comparison
                : comparison;

        }
    );


    return result;

};


/* =========================================================
   GET ALL
   ========================================================= */

const getAll = async (
    query = {}
) => {

    await delay();


    let result =
        applyFilters(
            roles,
            query
        );


    result =
        applySort(
            result,
            query.sortBy,
            query.sortOrder
        );


    const paginated =
        paginate(
            result,
            query.page || 1,
            query.pageSize || 10
        );


    return {

        items:
            paginated.items,

        total:
            paginated.total,

        page:
            Number(
                query.page
            ) || 1,

        pageSize:
            Number(
                query.pageSize
            ) || 10,

    };

};


/* =========================================================
   GET BY ID
   ========================================================= */

const getById = async (
    id
) => {

    await delay();


    const role =
        roles.find(
            (
                item
            ) =>
                item.id === id
        );


    if (
        !role
    ) {

        throw new Error(
            "Role not found."
        );

    }


    return {
        ...role,
    };

};


/* =========================================================
   CREATE
   ========================================================= */

const create = async (
    payload
) => {

    await delay();


    const roleCode =
        normalizeRoleCode(
            payload.roleCode
        );


    const roleName =
        normalizeRoleName(
            payload.roleName
        );


    const duplicateCode =
        roles.some(
            (
                role
            ) =>
                normalizeRoleCode(
                    role.roleCode
                ) ===
                roleCode
        );


    if (
        duplicateCode
    ) {

        throw new Error(
            "Role code already exists."
        );

    }


    const duplicateName =
        roles.some(
            (
                role
            ) =>
                normalizeRoleName(
                    role.roleName
                )
                    .toLowerCase() ===
                roleName.toLowerCase()
        );


    if (
        duplicateName
    ) {

        throw new Error(
            "Role name already exists."
        );

    }


    const now =
        new Date().toISOString();


    const newRole = {

        ...createEmptyRole(),

        ...payload,

        id:
            generateId(
                "ROLE"
            ),

        roleCode,

        roleName,

        status:
            payload.status ||
            ROLE_STATUS.ACTIVE,

        permissionIds:
            Array.isArray(
                payload.permissionIds
            )
                ? payload.permissionIds
                : [],

        permissions:
            Array.isArray(
                payload.permissions
            )
                ? payload.permissions
                : [],

        assignedUserCount:
            0,

        isSystemRole:
            false,

        isDeleted:
            false,

        createdAt:
            now,

        createdBy:
            "Current User",

        updatedAt:
            now,

        updatedBy:
            "Current User",

        version:
            1,

    };


    roles = [
        newRole,
        ...roles,
    ];


    return {
        ...newRole,
    };

};


/* =========================================================
   UPDATE
   ========================================================= */

const update = async (
    id,
    payload
) => {

    await delay();


    const index =
        roles.findIndex(
            (
                role
            ) =>
                role.id === id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Role not found."
        );

    }


    const existing =
        roles[
            index
        ];


    const roleName =
        normalizeRoleName(
            payload.roleName
        );


    const duplicateName =
        roles.some(
            (
                role
            ) => {

                if (
                    role.id === id
                ) {

                    return false;

                }


                return normalizeRoleName(
                    role.roleName
                )
                    .toLowerCase() ===
                    roleName.toLowerCase();

            }
        );


    if (
        duplicateName
    ) {

        throw new Error(
            "Role name already exists."
        );

    }


    const now =
        new Date().toISOString();


    const updated = {

        ...existing,

        ...payload,

        /*
         * Role code remains immutable.
         */

        roleCode:
            existing.roleCode,

        roleName,

        updatedAt:
            now,

        updatedBy:
            "Current User",

        version:
            (
                Number(
                    existing.version
                ) || 1
            ) + 1,

    };


    roles[
        index
    ] =
        updated;


    return {
        ...updated,
    };

};


/* =========================================================
   ACTIVATE
   ========================================================= */

const activate = async (
    id
) => {

    await delay();


    const index =
        roles.findIndex(
            (
                role
            ) =>
                role.id === id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Role not found."
        );

    }


    const existing =
        roles[
            index
        ];


    if (
        existing.isDeleted
    ) {

        throw new Error(
            "Deleted role cannot be activated."
        );

    }


    const now =
        new Date().toISOString();


    roles[
        index
    ] = {

        ...existing,

        status:
            ROLE_STATUS.ACTIVE,

        updatedAt:
            now,

        updatedBy:
            "Current User",

        version:
            (
                Number(
                    existing.version
                ) || 1
            ) + 1,

    };


    return {
        ...roles[
            index
        ],
    };

};


/* =========================================================
   DEACTIVATE
   ========================================================= */

const deactivate = async (
    id
) => {

    await delay();


    const index =
        roles.findIndex(
            (
                role
            ) =>
                role.id === id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Role not found."
        );

    }


    const existing =
        roles[
            index
        ];


    if (
        existing.isSystemRole
    ) {

        throw new Error(
            "System role cannot be deactivated."
        );

    }


    const now =
        new Date().toISOString();


    roles[
        index
    ] = {

        ...existing,

        status:
            ROLE_STATUS.INACTIVE,

        updatedAt:
            now,

        updatedBy:
            "Current User",

        version:
            (
                Number(
                    existing.version
                ) || 1
            ) + 1,

    };


    return {
        ...roles[
            index
        ],
    };

};


/* =========================================================
   DELETE
   ========================================================= */

const remove = async (
    id
) => {

    await delay();


    const index =
        roles.findIndex(
            (
                role
            ) =>
                role.id === id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Role not found."
        );

    }


    const existing =
        roles[
            index
        ];


    if (
        existing.isSystemRole
    ) {

        throw new Error(
            "System role cannot be deleted."
        );

    }


    if (
        Number(
            existing.assignedUserCount
        ) > 0
    ) {

        throw new Error(
            "Role cannot be deleted while users are assigned to it."
        );

    }


    const now =
        new Date().toISOString();


    roles[
        index
    ] = {

        ...existing,

        status:
            ROLE_STATUS.INACTIVE,

        isDeleted:
            true,

        updatedAt:
            now,

        updatedBy:
            "Current User",

        version:
            (
                Number(
                    existing.version
                ) || 1
            ) + 1,

    };


    return {
        ...roles[
            index
        ],
    };

};


/* =========================================================
   GET PERMISSIONS
   ========================================================= */

const getPermissions = async () => {

    await delay(
        150
    );


    return [
        ...permissions,
    ];

};


/* =========================================================
   GET ACTIVE PERMISSIONS
   ========================================================= */

const getActivePermissions =
    async () => {

        const result =
            await getPermissions();


        return result.filter(
            (
                permission
            ) =>
                permission.status ===
                ROLE_STATUS.ACTIVE
        );

    };


/* =========================================================
   GET ROLE STATISTICS
   ========================================================= */

const getStatistics = async () => {

    await delay(
        150
    );


    const total =
        roles.filter(
            (
                role
            ) =>
                !role.isDeleted
        ).length;


    const active =
        roles.filter(
            (
                role
            ) =>
                role.status ===
                    ROLE_STATUS.ACTIVE &&
                !role.isDeleted
        ).length;


    const inactive =
        roles.filter(
            (
                role
            ) =>
                role.status ===
                    ROLE_STATUS.INACTIVE &&
                !role.isDeleted
        ).length;


    const system =
        roles.filter(
            (
                role
            ) =>
                role.isSystemRole ===
                true
        ).length;


    const custom =
        roles.filter(
            (
                role
            ) =>
                role.roleType ===
                "CUSTOM"
        ).length;


    const assignedUsers =
        roles.reduce(
            (
                totalCount,
                role
            ) =>
                totalCount +
                (
                    Number(
                        role.assignedUserCount
                    ) || 0
                ),
            0
        );


    return {

        total,

        active,

        inactive,

        system,

        custom,

        assignedUsers,

    };

};


/* =========================================================
   RESET MOCK DATA
   ========================================================= */

const resetMockData = () => {

    roles = [
        ...roleList,
    ];

    permissions = [
        ...permissionList,
    ];

};


/* =========================================================
   SERVICE
   ========================================================= */

const roleService = {

    getAll,

    getById,

    create,

    update,

    activate,

    deactivate,

    remove,

    getPermissions,

    getActivePermissions,

    getStatistics,

    resetMockData,

};


export default roleService;