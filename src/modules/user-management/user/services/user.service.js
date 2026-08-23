/* =========================================================
   USER SERVICE
   ========================================================= */

import {
    userList,
} from "../mock/user.mock";

import {
    USER_STATUS,
    USER_USAGE,
} from "../constants/user.constants";

import {
    createUserQuery,
    normalizeUserQuery,
} from "../utils/user.query";

import {
    matchesUserSearch,
} from "../utils/user.helper";


/* =========================================================
   INTERNAL DATA STORE
   ========================================================= */

let users = [
    ...userList,
];


/* =========================================================
   CREATE ID
   ========================================================= */

const generateUserId = () => {

    const maxNumber =
        users.reduce(
            (
                max,
                user
            ) => {

                const match =
                    user.id?.match(
                        /(\d+)$/
                    );

                const number =
                    match
                        ? Number(
                            match[1]
                        )
                        : 0;

                return Math.max(
                    max,
                    number
                );

            },
            0
        );


    return (
        "USER-" +
        String(
            maxNumber + 1
        ).padStart(
            3,
            "0"
        )
    );
};


/* =========================================================
   CREATE USER CODE
   ========================================================= */

const generateUserCode = () => {

    const maxNumber =
        users.reduce(
            (
                max,
                user
            ) => {

                const match =
                    user.userCode?.match(
                        /(\d+)$/
                    );

                const number =
                    match
                        ? Number(
                            match[1]
                        )
                        : 0;

                return Math.max(
                    max,
                    number
                );

            },
            0
        );


    return (
        "USR-" +
        String(
            maxNumber + 1
        ).padStart(
            4,
            "0"
        )
    );
};


/* =========================================================
   CLONE
   ========================================================= */

const cloneUser = (
    user
) => {

    if (!user) {
        return null;
    }


    return {
        ...user,

        roleIds:
            Array.isArray(
                user.roleIds
            )
                ? [
                    ...user.roleIds,
                ]
                : [],
    };
};


/* =========================================================
   FILTER
   ========================================================= */

const applyFilters = (
    source,
    query
) => {

    let result = [
        ...source,
    ];


    /* =====================================================
       SEARCH
    ===================================================== */

    if (
        query.search
    ) {

        result =
            result.filter(
                (
                    user
                ) =>
                    matchesUserSearch(
                        user,
                        query.search
                    )
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
                    user
                ) =>
                    user.status ===
                    query.status
            );

    }


    /* =====================================================
       USER TYPE
    ===================================================== */

    if (
        query.userType
    ) {

        result =
            result.filter(
                (
                    user
                ) =>
                    user.userType ===
                    query.userType
            );

    }


    /* =====================================================
       DEPARTMENT
    ===================================================== */

    if (
        query.departmentId
    ) {

        result =
            result.filter(
                (
                    user
                ) =>
                    user.departmentId ===
                    query.departmentId
            );

    }


    /* =====================================================
       DESIGNATION
    ===================================================== */

    if (
        query.designationId
    ) {

        result =
            result.filter(
                (
                    user
                ) =>
                    user.designationId ===
                    query.designationId
            );

    }


    /* =====================================================
       ROLE
    ===================================================== */

    if (
        query.roleId
    ) {

        result =
            result.filter(
                (
                    user
                ) =>
                    Array.isArray(
                        user.roleIds
                    ) &&
                    user.roleIds.includes(
                        query.roleId
                    )
            );

    }


    /* =====================================================
       LOGIN USAGE
    ===================================================== */

    if (
        query.usage &&
        query.usage !==
            USER_USAGE.ALL
    ) {

        if (
            query.usage ===
            USER_USAGE.ACTIVE_LOGIN
        ) {

            result =
                result.filter(
                    (
                        user
                    ) =>
                        user.loginAllowed ===
                        true
                );

        }


        if (
            query.usage ===
            USER_USAGE.LOGIN_DISABLED
        ) {

            result =
                result.filter(
                    (
                        user
                    ) =>
                        user.loginAllowed ===
                        false
                );

        }

    }


    return result;
};


/* =========================================================
   SORT
   ========================================================= */

const applySorting = (
    source,
    query
) => {

    const result = [
        ...source,
    ];


    const field =
        query.sortField ||
        "displayName";


    const direction =
        query.sortOrder ===
        "desc"
            ? -1
            : 1;


    result.sort(
        (
            first,
            second
        ) => {

            const firstValue =
                first?.[field];

            const secondValue =
                second?.[field];


            if (
                firstValue ===
                secondValue
            ) {
                return 0;
            }


            if (
                firstValue ===
                    null ||
                firstValue ===
                    undefined
            ) {
                return 1;
            }


            if (
                secondValue ===
                    null ||
                secondValue ===
                    undefined
            ) {
                return -1;
            }


            return (
                String(
                    firstValue
                )
                    .toLowerCase()
                    .localeCompare(
                        String(
                            secondValue
                        )
                            .toLowerCase()
                    ) *
                direction
            );

        }
    );


    return result;
};


/* =========================================================
   GET ALL
   ========================================================= */

const getAll = async (
    incomingQuery = {}
) => {

    const query =
        normalizeUserQuery(
            {
                ...createUserQuery(),
                ...incomingQuery,
            }
        );


    /*
     * Ignore deleted users.
     */

    let filtered =
        users.filter(
            (
                user
            ) =>
                user.isDeleted !==
                true
        );


    filtered =
        applyFilters(
            filtered,
            query
        );


    filtered =
        applySorting(
            filtered,
            query
        );


    const total =
        filtered.length;


    const start =
        (
            query.page -
            1
        ) *
        query.pageSize;


    const end =
        start +
        query.pageSize;


    const items =
        filtered
            .slice(
                start,
                end
            )
            .map(
                cloneUser
            );


    return {

        items,

        total,

        page:
            query.page,

        pageSize:
            query.pageSize,

    };
};


/* =========================================================
   GET BY ID
   ========================================================= */

const getById = async (
    id
) => {

    const user =
        users.find(
            (
                item
            ) =>
                item.id ===
                id &&
                item.isDeleted !==
                    true
        );


    if (!user) {

        throw new Error(
            "User not found."
        );

    }


    return cloneUser(
        user
    );
};


/* =========================================================
   CREATE
   ========================================================= */

const create = async (
    payload
) => {

    if (
        !payload?.username
    ) {

        throw new Error(
            "Username is required."
        );

    }


    const duplicateUsername =
        users.some(
            (
                user
            ) =>
                user.username
                    ?.toLowerCase() ===
                payload.username
                    ?.trim()
                    .toLowerCase() &&
                user.isDeleted !==
                    true
        );


    if (
        duplicateUsername
    ) {

        throw new Error(
            "Username already exists."
        );

    }


    if (
        payload.employeeId
    ) {

        const duplicateEmployee =
            users.some(
                (
                    user
                ) =>
                    user.employeeId
                        ?.toLowerCase() ===
                    payload.employeeId
                        ?.trim()
                        .toLowerCase() &&
                    user.isDeleted !==
                        true
            );


        if (
            duplicateEmployee
        ) {

            throw new Error(
                "Employee ID already exists."
            );

        }

    }


    const now =
        new Date().toISOString();


    const newUser = {

        ...payload,

        id:
            generateUserId(),

        userCode:
            payload.userCode ||
            generateUserCode(),

        displayName:
            payload.displayName ||
            [
                payload.firstName,
                payload.middleName,
                payload.lastName,
            ]
                .filter(Boolean)
                .join(" "),

        status:
            payload.status ||
            USER_STATUS.ACTIVE,

        loginAllowed:
            payload.loginAllowed !==
            false,

        roleIds:
            Array.isArray(
                payload.roleIds
            )
                ? [
                    ...payload.roleIds,
                ]
                : [],

        passwordStatus:
            payload.passwordStatus ||
            "RESET_REQUIRED",

        mustChangePassword:
            payload.mustChangePassword !==
            false,

        failedLoginCount:
            0,

        lastLoginAt:
            null,

        lastPasswordChangedAt:
            null,

        accountLockedUntil:
            null,

        createdAt:
            now,

        createdBy:
            "CURRENT_USER",

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            1,

        isDeleted:
            false,

    };


    users = [
        ...users,
        newUser,
    ];


    return cloneUser(
        newUser
    );
};


/* =========================================================
   UPDATE
   ========================================================= */

const update = async (
    id,
    payload
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id &&
                user.isDeleted !==
                    true
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const currentUser =
        users[index];


    const duplicateUsername =
        users.some(
            (
                user
            ) =>
                user.id !==
                    id &&
                user.username
                    ?.toLowerCase() ===
                    payload.username
                        ?.trim()
                        .toLowerCase() &&
                user.isDeleted !==
                    true
        );


    if (
        duplicateUsername
    ) {

        throw new Error(
            "Username already exists."
        );

    }


    if (
        payload.employeeId
    ) {

        const duplicateEmployee =
            users.some(
                (
                    user
                ) =>
                    user.id !==
                        id &&
                    user.employeeId
                        ?.toLowerCase() ===
                        payload.employeeId
                            ?.trim()
                            .toLowerCase() &&
                    user.isDeleted !==
                        true
            );


        if (
            duplicateEmployee
        ) {

            throw new Error(
                "Employee ID already exists."
            );

        }

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...currentUser,

        ...payload,

        id:
            currentUser.id,

        userCode:
            currentUser.userCode,

        displayName:
            payload.displayName ||
            [
                payload.firstName,
                payload.middleName,
                payload.lastName,
            ]
                .filter(Boolean)
                .join(" "),

        roleIds:
            Array.isArray(
                payload.roleIds
            )
                ? [
                    ...payload.roleIds,
                ]
                : [],

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    currentUser.version
                ) || 0
            ) + 1,

        isDeleted:
            false,

    };


    users = [
        ...users.slice(
            0,
            index
        ),

        updatedUser,

        ...users.slice(
            index + 1
        ),
    ];


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   ACTIVATE
   ========================================================= */

const activate = async (
    id
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id &&
                user.isDeleted !==
                    true
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...users[index],

        status:
            USER_STATUS.ACTIVE,

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    users[index].version
                ) || 0
            ) + 1,

    };


    users[index] =
        updatedUser;


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   DEACTIVATE
   ========================================================= */

const deactivate = async (
    id
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id &&
                user.isDeleted !==
                    true
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...users[index],

        status:
            USER_STATUS.INACTIVE,

        loginAllowed:
            false,

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    users[index].version
                ) || 0
            ) + 1,

    };


    users[index] =
        updatedUser;


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   SUSPEND
   ========================================================= */

const suspend = async (
    id
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id &&
                user.isDeleted !==
                    true
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...users[index],

        status:
            USER_STATUS.SUSPENDED,

        loginAllowed:
            false,

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    users[index].version
                ) || 0
            ) + 1,

    };


    users[index] =
        updatedUser;


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   UNLOCK
   ========================================================= */

const unlock = async (
    id
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id &&
                user.isDeleted !==
                    true
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...users[index],

        passwordStatus:
            "RESET_REQUIRED",

        mustChangePassword:
            true,

        failedLoginCount:
            0,

        accountLockedUntil:
            null,

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    users[index].version
                ) || 0
            ) + 1,

    };


    users[index] =
        updatedUser;


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   DELETE / SOFT DELETE
   ========================================================= */

const remove = async (
    id
) => {

    const index =
        users.findIndex(
            (
                user
            ) =>
                user.id ===
                id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "User not found."
        );

    }


    const now =
        new Date().toISOString();


    const updatedUser = {

        ...users[index],

        isDeleted:
            true,

        loginAllowed:
            false,

        status:
            USER_STATUS.INACTIVE,

        updatedAt:
            now,

        updatedBy:
            "CURRENT_USER",

        version:
            (
                Number(
                    users[index].version
                ) || 0
            ) + 1,

    };


    users[index] =
        updatedUser;


    return cloneUser(
        updatedUser
    );
};


/* =========================================================
   SUMMARY
   ========================================================= */

const getSummary = async () => {

    const activeUsers =
        users.filter(
            (
                user
            ) =>
                user.isDeleted !==
                    true &&
                user.status ===
                    USER_STATUS.ACTIVE
        );


    const loginEnabledUsers =
        users.filter(
            (
                user
            ) =>
                user.isDeleted !==
                    true &&
                user.loginAllowed ===
                    true
        );


    const lockedUsers =
        users.filter(
            (
                user
            ) =>
                user.isDeleted !==
                    true &&
                user.passwordStatus ===
                    "LOCKED"
        );


    return {

        total:
            users.filter(
                (
                    user
                ) =>
                    user.isDeleted !==
                    true
            ).length,

        active:
            activeUsers.length,

        loginEnabled:
            loginEnabledUsers.length,

        locked:
            lockedUsers.length,

    };
};


/* =========================================================
   EXPORT
   ========================================================= */

const userService = {

    getAll,

    getById,

    getSummary,

    create,

    update,

    activate,

    deactivate,

    suspend,

    unlock,

    remove,

};


export default userService;