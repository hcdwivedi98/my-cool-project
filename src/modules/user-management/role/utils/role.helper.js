// src/modules/user-management/role/utils/role.helper.js

import {
    ROLE_STATUS,
    ROLE_TYPES,
    ROLE_SCOPES,
} from "../constants/role.constants";


/* =========================================================
   NORMALIZE
   ========================================================= */

export const normalizeRoleCode = (
    value
) => {

    return String(
        value || ""
    )
        .trim()
        .toUpperCase();

};


export const normalizeRoleName = (
    value
) => {

    return String(
        value || ""
    )
        .trim();

};


/* =========================================================
   ACTIVE ROLES
   ========================================================= */

export const getActiveRoles = (
    roles = []
) => {

    return roles.filter(
        (
            role
        ) =>
            role.status ===
                ROLE_STATUS.ACTIVE &&
            role.isDeleted !== true
    );

};


/* =========================================================
   INACTIVE ROLES
   ========================================================= */

export const getInactiveRoles = (
    roles = []
) => {

    return roles.filter(
        (
            role
        ) =>
            role.status ===
                ROLE_STATUS.INACTIVE ||
            role.isDeleted === true
    );

};


/* =========================================================
   ACTIVE PERMISSIONS
   ========================================================= */

export const getActivePermissions = (
    permissions = []
) => {

    return permissions.filter(
        (
            permission
        ) =>
            permission.status ===
            ROLE_STATUS.ACTIVE
    );

};


/* =========================================================
   FIND ROLE BY ID
   ========================================================= */

export const getRoleById = (
    roles = [],
    id
) => {

    if (!id) {

        return undefined;

    }

    return roles.find(
        (
            role
        ) =>
            role.id === id
    );

};


/* =========================================================
   FIND ROLE BY CODE
   ========================================================= */

export const getRoleByCode = (
    roles = [],
    code
) => {

    const normalizedCode =
        normalizeRoleCode(
            code
        );


    if (!normalizedCode) {

        return undefined;

    }


    return roles.find(
        (
            role
        ) =>
            normalizeRoleCode(
                role.roleCode
            ) ===
            normalizedCode
    );

};


/* =========================================================
   FIND PERMISSION BY ID
   ========================================================= */

export const getPermissionById = (
    permissions = [],
    id
) => {

    if (!id) {

        return undefined;

    }

    return permissions.find(
        (
            permission
        ) =>
            permission.id === id
    );

};


/* =========================================================
   FIND PERMISSION BY CODE
   ========================================================= */

export const getPermissionByCode = (
    permissions = [],
    code
) => {

    const normalizedCode =
        String(
            code || ""
        )
            .trim()
            .toUpperCase();


    if (!normalizedCode) {

        return undefined;

    }


    return permissions.find(
        (
            permission
        ) =>
            String(
                permission.permissionCode ||
                ""
            )
                .trim()
                .toUpperCase() ===
            normalizedCode
    );

};


/* =========================================================
   PERMISSIONS BY MODULE
   ========================================================= */

export const getPermissionsByModule = (
    permissions = [],
    moduleCode
) => {

    if (!moduleCode) {

        return [];

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
   PERMISSIONS BY RESOURCE
   ========================================================= */

export const getPermissionsByResource = (
    permissions = [],
    resourceCode
) => {

    if (!resourceCode) {

        return [];

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
   GROUP PERMISSIONS BY MODULE
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
                !groups[moduleCode]
            ) {

                groups[moduleCode] = [];

            }


            groups[moduleCode].push(
                permission
            );


            return groups;

        },
        {}
    );

};


/* =========================================================
   GROUP PERMISSIONS AS ARRAY
   ========================================================= */

export const getPermissionModuleGroups = (
    permissions = []
) => {

    const grouped =
        groupPermissionsByModule(
            permissions
        );


    return Object.entries(
        grouped
    ).map(
        (
            [
                moduleCode,
                items,
            ]
        ) => ({

            moduleCode,

            permissions:
                items,

        })
    );

};


/* =========================================================
   ROLE PERMISSION COUNT
   ========================================================= */

export const getRolePermissionCount = (
    role
) => {

    if (
        !role
    ) {

        return 0;

    }


    if (
        Array.isArray(
            role.permissionIds
        )
    ) {

        return role.permissionIds.length;

    }


    if (
        Array.isArray(
            role.permissions
        )
    ) {

        return role.permissions.length;

    }


    return 0;

};


/* =========================================================
   ASSIGNED USER COUNT
   ========================================================= */

export const getAssignedUserCount = (
    role
) => {

    if (
        !role
    ) {

        return 0;

    }


    return Number(
        role.assignedUserCount
    ) || 0;

};


/* =========================================================
   ROLE LABEL
   ========================================================= */

export const getRoleLabel = (
    role
) => {

    if (!role) {

        return "";

    }


    if (
        role.roleName
    ) {

        return role.roleName;

    }


    return role.roleCode || "";

};


/* =========================================================
   ROLE DISPLAY LABEL
   ========================================================= */

export const getRoleDisplayLabel = (
    role
) => {

    if (!role) {

        return "";

    }


    const code =
        role.roleCode ||
        "";

    const name =
        role.roleName ||
        "";


    if (
        code &&
        name
    ) {

        return `${name} (${code})`;

    }


    return name || code;

};


/* =========================================================
   ROLE TYPE LABEL
   ========================================================= */

export const getRoleTypeLabel = (
    type
) => {

    switch (
        type
    ) {

        case ROLE_TYPES.SYSTEM:

            return "System";


        case ROLE_TYPES.APPLICATION:

            return "Application";


        case ROLE_TYPES.CUSTOM:

            return "Custom";


        default:

            return type || "-";

    }

};


/* =========================================================
   ROLE SCOPE LABEL
   ========================================================= */

export const getRoleScopeLabel = (
    scope
) => {

    switch (
        scope
    ) {

        case ROLE_SCOPES.GLOBAL:

            return "Global";


        case ROLE_SCOPES.COMPANY:

            return "Company";


        case ROLE_SCOPES.CENTER:

            return "Center";


        case ROLE_SCOPES.DEPARTMENT:

            return "Department";


        case ROLE_SCOPES.STORE:

            return "Store";


        case ROLE_SCOPES.SUB_STORE:

            return "Sub Store";


        default:

            return scope || "-";

    }

};


/* =========================================================
   ROLE STATUS LABEL
   ========================================================= */

export const getRoleStatusLabel = (
    status
) => {

    switch (
        status
    ) {

        case ROLE_STATUS.ACTIVE:

            return "Active";


        case ROLE_STATUS.INACTIVE:

            return "Inactive";


        default:

            return status || "-";

    }

};


/* =========================================================
   ROLE CODE VALIDATION
   ========================================================= */

export const isValidRoleCode = (
    code
) => {

    const normalizedCode =
        normalizeRoleCode(
            code
        );


    if (
        normalizedCode.length < 3 ||
        normalizedCode.length > 50
    ) {

        return false;

    }


    return /^[A-Z0-9_]+$/.test(
        normalizedCode
    );

};


/* =========================================================
   ROLE CODE DUPLICATE CHECK
   ========================================================= */

export const isDuplicateRoleCode = (
    roles = [],
    code,
    excludeId = null
) => {

    const normalizedCode =
        normalizeRoleCode(
            code
        );


    if (!normalizedCode) {

        return false;

    }


    return roles.some(
        (
            role
        ) => {

            if (
                excludeId &&
                role.id === excludeId
            ) {

                return false;

            }


            return (
                normalizeRoleCode(
                    role.roleCode
                ) ===
                normalizedCode
            );

        }
    );

};


/* =========================================================
   ROLE NAME DUPLICATE CHECK
   ========================================================= */

export const isDuplicateRoleName = (
    roles = [],
    name,
    excludeId = null
) => {

    const normalizedName =
        normalizeRoleName(
            name
        ).toLowerCase();


    if (!normalizedName) {

        return false;

    }


    return roles.some(
        (
            role
        ) => {

            if (
                excludeId &&
                role.id === excludeId
            ) {

                return false;

            }


            return normalizeRoleName(
                role.roleName
            )
                .toLowerCase() ===
                normalizedName;

        }
    );

};


/* =========================================================
   ROLE SCOPE REQUIREMENTS
   ========================================================= */

export const getRequiredScopeField = (
    scope
) => {

    switch (
        scope
    ) {

        case ROLE_SCOPES.COMPANY:

            return "companyId";


        case ROLE_SCOPES.CENTER:

            return "centerId";


        case ROLE_SCOPES.DEPARTMENT:

            return "departmentId";


        case ROLE_SCOPES.STORE:

            return "storeId";


        case ROLE_SCOPES.SUB_STORE:

            return "subStoreId";


        default:

            return null;

    }

};


/* =========================================================
   SCOPE VALIDATION
   ========================================================= */

export const validateRoleScope = (
    role
) => {

    if (!role) {

        return {
            valid: false,
            message:
                "Role information is required.",
        };

    }


    const requiredField =
        getRequiredScopeField(
            role.scope
        );


    if (!requiredField) {

        return {
            valid: true,
            message: "",
        };

    }


    if (
        !role[
            requiredField
        ]
    ) {

        return {
            valid: false,

            message:
                `${requiredField} is required for ${getRoleScopeLabel(role.scope)} scope.`,

        };

    }


    return {
        valid: true,
        message: "",
    };

};


/* =========================================================
   SYSTEM ROLE CHECK
   ========================================================= */

export const isSystemRole = (
    role
) => {

    return (
        role?.isSystemRole === true ||
        role?.roleType ===
        ROLE_TYPES.SYSTEM
    );

};


/* =========================================================
   ROLE EDITABLE CHECK
   ========================================================= */

export const isRoleEditable = (
    role
) => {

    if (!role) {

        return false;

    }


    if (
        role.isDeleted === true
    ) {

        return false;

    }


    return true;

};


/* =========================================================
   ROLE DELETABLE CHECK
   ========================================================= */

export const isRoleDeletable = (
    role
) => {

    if (!role) {

        return false;

    }


    if (
        isSystemRole(
            role
        )
    ) {

        return false;

    }


    if (
        getAssignedUserCount(
            role
        ) > 0
    ) {

        return false;

    }


    return true;

};


/* =========================================================
   ROLE DEACTIVATION CHECK
   ========================================================= */

export const canDeactivateRole = (
    role
) => {

    if (!role) {

        return false;

    }


    if (
        isSystemRole(
            role
        )
    ) {

        return false;

    }


    return (
        role.status ===
        ROLE_STATUS.ACTIVE
    );

};


/* =========================================================
   ROLE ACTIVATION CHECK
   ========================================================= */

export const canActivateRole = (
    role
) => {

    if (!role) {

        return false;

    }


    if (
        role.isDeleted === true
    ) {

        return false;

    }


    return (
        role.status ===
        ROLE_STATUS.INACTIVE
    );

};


/* =========================================================
   PERMISSION FLAG CHECK
   ========================================================= */

export const hasPermissionAction = (
    role,
    permissionId,
    action
) => {

    if (
        !role ||
        !permissionId ||
        !action
    ) {

        return false;

    }


    const permission =
        role.permissions?.find(
            (
                item
            ) =>
                item.permissionId ===
                permissionId
        );


    if (!permission) {

        return false;

    }


    const flagMap = {

        VIEW:
            "canView",

        CREATE:
            "canCreate",

        EDIT:
            "canEdit",

        DELETE:
            "canDelete",

        APPROVE:
            "canApprove",

        EXPORT:
            "canExport",

    };


    const flag =
        flagMap[
            action
        ];


    return (
        flag
            ? permission[
                flag
            ] === true
            : false
    );

};


/* =========================================================
   ROLE PERMISSION MATRIX
   ========================================================= */

export const buildRolePermissionMatrix = (
    role,
    permissions = []
) => {

    return permissions.map(
        (
            permission
        ) => {

            const assigned =
                role?.permissions?.find(
                    (
                        item
                    ) =>
                        item.permissionId ===
                        permission.id
                );


            return {

                permissionId:
                    permission.id,

                permissionCode:
                    permission.permissionCode,

                permissionName:
                    permission.permissionName,

                moduleCode:
                    permission.moduleCode,

                resourceCode:
                    permission.resourceCode,

                canView:
                    assigned?.canView === true,

                canCreate:
                    assigned?.canCreate === true,

                canEdit:
                    assigned?.canEdit === true,

                canDelete:
                    assigned?.canDelete === true,

                canApprove:
                    assigned?.canApprove === true,

                canExport:
                    assigned?.canExport === true,

            };

        }
    );

};


/* =========================================================
   CREATE EMPTY ROLE
   ========================================================= */

export const createEmptyRole = () => {

    return {

        id:
            null,

        roleCode:
            "",

        roleName:
            "",

        description:
            "",

        roleType:
            ROLE_TYPES.CUSTOM,

        scope:
            ROLE_SCOPES.GLOBAL,

        companyId:
            null,

        centerId:
            null,

        departmentId:
            null,

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds:
            [],

        permissions:
            [],

        assignedUserCount:
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

    };

};


/* =========================================================
   PREPARE ROLE PAYLOAD
   ========================================================= */

export const prepareRolePayload = (
    values = {}
) => {

    return {

        roleCode:
            normalizeRoleCode(
                values.roleCode
            ),

        roleName:
            normalizeRoleName(
                values.roleName
            ),

        description:
            String(
                values.description ||
                ""
            ).trim(),

        roleType:
            values.roleType ||
            ROLE_TYPES.CUSTOM,

        scope:
            values.scope ||
            ROLE_SCOPES.GLOBAL,

        companyId:
            values.companyId ||
            null,

        centerId:
            values.centerId ||
            null,

        departmentId:
            values.departmentId ||
            null,

        storeId:
            values.storeId ||
            null,

        subStoreId:
            values.subStoreId ||
            null,

        status:
            values.status ||
            ROLE_STATUS.ACTIVE,

        permissionIds:
            Array.isArray(
                values.permissionIds
            )
                ? values.permissionIds
                : [],

    };

};