// src/modules/user-management/permission/utils/permission.helper.js

import {
    PERMISSION_ACTIONS,
    PERMISSION_MODULES,
    PERMISSION_SCOPES,
    PERMISSION_STATUS,
    PERMISSION_TYPES,
} from "../constants/permission.constants";


/* =========================================================
   EMPTY PERMISSION
   ========================================================= */

export const createEmptyPermission = () => {

    return {

        id:
            null,

        permissionCode:
            "",

        permissionName:
            "",

        moduleCode:
            "",

        resourceCode:
            "",

        description:
            "",

        actions:
            [
                PERMISSION_ACTIONS.VIEW,
            ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.CUSTOM,

        isSystemPermission:
            false,

        sortOrder:
            0,

        createdAt:
            null,

        createdBy:
            null,

        updatedAt:
            null,

        updatedBy:
            null,

        version:
            1,

        isDeleted:
            false,

    };

};


/* =========================================================
   NORMALIZE CODE
   ========================================================= */

export const normalizePermissionCode = (
    value
) => {

    return String(
        value || ""
    )
        .trim()
        .toUpperCase()
        .replace(
            /\s+/g,
            "_"
        );

};


/* =========================================================
   NORMALIZE NAME
   ========================================================= */

export const normalizePermissionName = (
    value
) => {

    return String(
        value || ""
    )
        .trim()
        .replace(
            /\s+/g,
            " "
        );

};


/* =========================================================
   NORMALIZE DESCRIPTION
   ========================================================= */

export const normalizePermissionDescription = (
    value
) => {

    return String(
        value || ""
    )
        .trim()
        .replace(
            /\s+/g,
            " "
        );

};


/* =========================================================
   NORMALIZE ACTIONS
   ========================================================= */

export const normalizePermissionActions = (
    actions
) => {

    if (
        !Array.isArray(
            actions
        )
    ) {

        return [];

    }


    const validActions =
        Object.values(
            PERMISSION_ACTIONS
        );


    return [
        ...new Set(
            actions.filter(
                (
                    action
                ) =>
                    validActions.includes(
                        action
                    )
            )
        ),
    ];

};


/* =========================================================
   HAS ACTION
   ========================================================= */

export const hasPermissionAction = (
    permission,
    action
) => {

    if (
        !permission ||
        !action
    ) {

        return false;

    }


    return (
        Array.isArray(
            permission.actions
        ) &&
        permission.actions.includes(
            action
        )
    );

};


/* =========================================================
   ADD ACTION
   ========================================================= */

export const addPermissionAction = (
    actions,
    action
) => {

    const normalized =
        normalizePermissionActions(
            actions
        );


    if (
        !Object.values(
            PERMISSION_ACTIONS
        ).includes(
            action
        )
    ) {

        return normalized;

    }


    if (
        normalized.includes(
            action
        )
    ) {

        return normalized;

    }


    return [
        ...normalized,
        action,
    ];

};


/* =========================================================
   REMOVE ACTION
   ========================================================= */

export const removePermissionAction = (
    actions,
    action
) => {

    return normalizePermissionActions(
        actions
    ).filter(
        (
            currentAction
        ) =>
            currentAction !==
            action
    );

};


/* =========================================================
   TOGGLE ACTION
   ========================================================= */

export const togglePermissionAction = (
    actions,
    action,
    checked
) => {

    if (
        checked
    ) {

        return addPermissionAction(
            actions,
            action
        );

    }


    return removePermissionAction(
        actions,
        action
    );

};


/* =========================================================
   GET ACTION LABEL
   ========================================================= */

export const getPermissionActionLabel = (
    action
) => {

    const labels = {

        [PERMISSION_ACTIONS.VIEW]:
            "View",

        [PERMISSION_ACTIONS.CREATE]:
            "Create",

        [PERMISSION_ACTIONS.EDIT]:
            "Edit",

        [PERMISSION_ACTIONS.DELETE]:
            "Delete",

        [PERMISSION_ACTIONS.APPROVE]:
            "Approve",

        [PERMISSION_ACTIONS.EXPORT]:
            "Export",

    };


    return (
        labels[
            action
        ] ||
        action ||
        "-"
    );

};


/* =========================================================
   GET ACTION LABELS
   ========================================================= */

export const getPermissionActionLabels = (
    actions
) => {

    return normalizePermissionActions(
        actions
    ).map(
        (
            action
        ) =>
            getPermissionActionLabel(
                action
            )
    );

};


/* =========================================================
   FORMAT ACTIONS
   ========================================================= */

export const formatPermissionActions = (
    actions
) => {

    const labels =
        getPermissionActionLabels(
            actions
        );


    if (
        !labels.length
    ) {

        return "No actions";

    }


    return labels.join(
        ", "
    );

};


/* =========================================================
   MODULE LABEL
   ========================================================= */

export const getPermissionModuleLabel = (
    moduleCode
) => {

    return String(
        moduleCode || ""
    )
        .replace(
            /_/g,
            " "
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            (
                character
            ) =>
                character.toUpperCase()
        );

};


/* =========================================================
   RESOURCE LABEL
   ========================================================= */

export const getPermissionResourceLabel = (
    resourceCode
) => {

    return String(
        resourceCode || ""
    )
        .replace(
            /_/g,
            " "
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            (
                character
            ) =>
                character.toUpperCase()
        );

};


/* =========================================================
   STATUS LABEL
   ========================================================= */

export const getPermissionStatusLabel = (
    status
) => {

    const labels = {

        [PERMISSION_STATUS.ACTIVE]:
            "Active",

        [PERMISSION_STATUS.INACTIVE]:
            "Inactive",

    };


    return (
        labels[
            status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   STATUS COLOR
   ========================================================= */

export const getPermissionStatusColor = (
    status
) => {

    switch (
        status
    ) {

        case PERMISSION_STATUS.ACTIVE:

            return "success";


        case PERMISSION_STATUS.INACTIVE:

            return "default";


        default:

            return "default";

    }

};


/* =========================================================
   TYPE LABEL
   ========================================================= */

export const getPermissionTypeLabel = (
    type
) => {

    const labels = {

        [PERMISSION_TYPES.SYSTEM]:
            "System",

        [PERMISSION_TYPES.CUSTOM]:
            "Custom",

    };


    return (
        labels[
            type
        ] ||
        type ||
        "-"
    );

};


/* =========================================================
   TYPE COLOR
   ========================================================= */

export const getPermissionTypeColor = (
    type
) => {

    switch (
        type
    ) {

        case PERMISSION_TYPES.SYSTEM:

            return "blue";


        case PERMISSION_TYPES.CUSTOM:

            return "purple";


        default:

            return "default";

    }

};


/* =========================================================
   SCOPE LABEL
   ========================================================= */

export const getPermissionScopeLabel = (
    scope
) => {

    const labels = {

        [PERMISSION_SCOPES.GLOBAL]:
            "Global",

        [PERMISSION_SCOPES.COMPANY]:
            "Company",

        [PERMISSION_SCOPES.CENTER]:
            "Center",

        [PERMISSION_SCOPES.DEPARTMENT]:
            "Department",

        [PERMISSION_SCOPES.STORE]:
            "Store",

    };


    return (
        labels[
            scope
        ] ||
        scope ||
        "-"
    );

};


/* =========================================================
   MODULE VALIDATION
   ========================================================= */

export const isValidPermissionModule = (
    moduleCode
) => {

    return Object.values(
        PERMISSION_MODULES
    ).includes(
        moduleCode
    );

};


/* =========================================================
   ACTION VALIDATION
   ========================================================= */

export const isValidPermissionAction = (
    action
) => {

    return Object.values(
        PERMISSION_ACTIONS
    ).includes(
        action
    );

};


/* =========================================================
   PERMISSION CODE VALIDATION
   ========================================================= */

export const isValidPermissionCode = (
    code
) => {

    const normalized =
        normalizePermissionCode(
            code
        );


    return /^[A-Z][A-Z0-9_]*(\.[A-Z][A-Z0-9_]*)?$/
        .test(
            normalized
        );

};


/* =========================================================
   SYSTEM PERMISSION CHECK
   ========================================================= */

export const isSystemPermission = (
    permission
) => {

    return (
        permission?.isSystemPermission ===
        true ||
        permission?.permissionType ===
        PERMISSION_TYPES.SYSTEM
    );

};


/* =========================================================
   DELETED CHECK
   ========================================================= */

export const isDeletedPermission = (
    permission
) => {

    return (
        permission?.isDeleted ===
        true
    );

};


/* =========================================================
   ACTIVE CHECK
   ========================================================= */

export const isActivePermission = (
    permission
) => {

    return (
        permission?.status ===
            PERMISSION_STATUS.ACTIVE &&
        permission?.isDeleted !== true
    );

};


/* =========================================================
   NORMALIZE PERMISSION
   ========================================================= */

export const normalizePermission = (
    permission = {}
) => {

    const base =
        createEmptyPermission();


    return {

        ...base,

        ...permission,

        permissionCode:
            normalizePermissionCode(
                permission.permissionCode
            ),

        permissionName:
            normalizePermissionName(
                permission.permissionName
            ),

        description:
            normalizePermissionDescription(
                permission.description
            ),

        actions:
            normalizePermissionActions(
                permission.actions
            ),

    };

};


/* =========================================================
   PREPARE FORM VALUES
   ========================================================= */

export const preparePermissionFormValues = (
    permission
) => {

    if (
        !permission
    ) {

        return createEmptyPermission();

    }


    return normalizePermission(
        permission
    );

};


/* =========================================================
   PREPARE PAYLOAD
   ========================================================= */

export const preparePermissionPayload = (
    values
) => {

    const normalized =
        normalizePermission(
            values
        );


    return {

        permissionCode:
            normalized.permissionCode,

        permissionName:
            normalized.permissionName,

        moduleCode:
            normalized.moduleCode,

        resourceCode:
            normalized.resourceCode,

        description:
            normalized.description,

        actions:
            normalized.actions,

        scope:
            normalized.scope,

        status:
            normalized.status,

        permissionType:
            normalized.permissionType,

        isSystemPermission:
            normalized.isSystemPermission,

        sortOrder:
            Number(
                normalized.sortOrder
            ) || 0,

    };

};


/* =========================================================
   DISPLAY VALUE
   ========================================================= */

export const getPermissionDisplayValue = (
    permission
) => {

    if (
        !permission
    ) {

        return "-";

    }


    const name =
        permission.permissionName ||
        "-";


    const code =
        permission.permissionCode ||
        "";


    if (
        !code
    ) {

        return name;

    }


    return `${name} (${code})`;

};


/* =========================================================
   FIND PERMISSION BY ID
   ========================================================= */

export const findPermissionById = (
    permissions,
    id
) => {

    if (
        !Array.isArray(
            permissions
        )
    ) {

        return null;

    }


    return (
        permissions.find(
            (
                permission
            ) =>
                permission.id ===
                id
        ) ||
        null
    );

};


/* =========================================================
   FIND BY CODE
   ========================================================= */

export const findPermissionByCode = (
    permissions,
    code
) => {

    if (
        !Array.isArray(
            permissions
        )
    ) {

        return null;

    }


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
   UNIQUE MODULES
   ========================================================= */

export const getUniquePermissionModules = (
    permissions = []
) => {

    return [
        ...new Set(
            permissions
                .map(
                    (
                        permission
                    ) =>
                        permission.moduleCode
                )
                .filter(
                    Boolean
                )
        ),
    ];

};


/* =========================================================
   UNIQUE RESOURCES
   ========================================================= */

export const getUniquePermissionResources = (
    permissions = [],
    moduleCode = null
) => {

    const filtered =
        moduleCode
            ? permissions.filter(
                (
                    permission
                ) =>
                    permission.moduleCode ===
                    moduleCode
            )
            : permissions;


    return [
        ...new Set(
            filtered
                .map(
                    (
                        permission
                    ) =>
                        permission.resourceCode
                )
                .filter(
                    Boolean
                )
        ),
    ];

};


/* =========================================================
   SORT BY ORDER
   ========================================================= */

export const sortPermissionsByOrder = (
    permissions = []
) => {

    return [
        ...permissions,
    ].sort(
        (
            first,
            second
        ) =>
            (
                Number(
                    first.sortOrder
                ) || 0
            ) -
            (
                Number(
                    second.sortOrder
                ) || 0
            )
    );

};


/* =========================================================
   GROUP BY MODULE
   ========================================================= */

export const groupPermissionsByModule = (
    permissions = []
) => {

    return permissions.reduce(
        (
            groups,
            permission
        ) => {

            const moduleCode =
                permission.moduleCode ||
                "OTHER";


            if (
                !groups[
                    moduleCode
                ]
            ) {

                groups[
                    moduleCode
                ] = [];

            }


            groups[
                moduleCode
            ].push(
                permission
            );


            return groups;

        },
        {}
    );

};


/* =========================================================
   GROUP BY RESOURCE
   ========================================================= */

export const groupPermissionsByResource = (
    permissions = []
) => {

    return permissions.reduce(
        (
            groups,
            permission
        ) => {

            const resourceCode =
                permission.resourceCode ||
                "OTHER";


            if (
                !groups[
                    resourceCode
                ]
            ) {

                groups[
                    resourceCode
                ] = [];

            }


            groups[
                resourceCode
            ].push(
                permission
            );


            return groups;

        },
        {}
    );

};


/* =========================================================
   DUPLICATE CODE CHECK
   ========================================================= */

export const isDuplicatePermissionCode = (
    permissions,
    code,
    excludeId = null
) => {

    const normalizedCode =
        normalizePermissionCode(
            code
        );


    return permissions.some(
        (
            permission
        ) => {

            if (
                excludeId &&
                permission.id ===
                excludeId
            ) {

                return false;

            }


            return (
                normalizePermissionCode(
                    permission.permissionCode
                ) ===
                normalizedCode
            );

        }
    );

};


/* =========================================================
   DUPLICATE NAME CHECK
   ========================================================= */

export const isDuplicatePermissionName = (
    permissions,
    name,
    excludeId = null
) => {

    const normalizedName =
        normalizePermissionName(
            name
        ).toLowerCase();


    return permissions.some(
        (
            permission
        ) => {

            if (
                excludeId &&
                permission.id ===
                excludeId
            ) {

                return false;

            }


            return (
                normalizePermissionName(
                    permission.permissionName
                )
                    .toLowerCase() ===
                normalizedName
            );

        }
    );

};