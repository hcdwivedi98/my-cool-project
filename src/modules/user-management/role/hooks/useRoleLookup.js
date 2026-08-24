// src/modules/user-management/role/hooks/useRoleLookup.js

import {
    useCallback,
    useMemo,
} from "react";

import {
    roleList,
    permissionList,
} from "../mock/role.mock";

import {
    ROLE_STATUS,
    ROLE_TYPES,
    ROLE_SCOPES,
    ROLE_MODULES,
} from "../constants/role.constants";

import {
    getActiveRoles,
    getActivePermissions,
    getRoleById,
    getRoleByCode,
    getPermissionById,
    getPermissionByCode,
    getPermissionsByModule,
    getPermissionsByResource,
    getRolePermissionCount,
    getAssignedUserCount,
    getRoleLabel,
    getRoleTypeLabel,
    getRoleScopeLabel,
    groupPermissionsByModule,
} from "../utils/role.helper";


const useRoleLookup = (
    options = {}
) => {

    const {
        roles =
            roleList,

        permissions =
            permissionList,
    } = options;


    /* =====================================================
       ACTIVE ROLES
    ===================================================== */

    const activeRoles =
        useMemo(
            () =>
                getActiveRoles(
                    roles
                ),
            [
                roles,
            ]
        );


    /* =====================================================
       INACTIVE ROLES
    ===================================================== */

    const inactiveRoles =
        useMemo(
            () =>
                roles.filter(
                    (
                        role
                    ) =>
                        role.status ===
                        ROLE_STATUS.INACTIVE
                ),
            [
                roles,
            ]
        );


    /* =====================================================
       ACTIVE PERMISSIONS
    ===================================================== */

    const activePermissions =
        useMemo(
            () =>
                getActivePermissions(
                    permissions
                ),
            [
                permissions,
            ]
        );


    /* =====================================================
       ROLE OPTIONS
    ===================================================== */

    const roleOptions =
        useMemo(
            () =>
                activeRoles.map(
                    (
                        role
                    ) => ({

                        label:
                            getRoleLabel(
                                role
                            ),

                        value:
                            role.id,

                    })
                ),
            [
                activeRoles,
            ]
        );


    /* =====================================================
       ROLE CODE OPTIONS
    ===================================================== */

    const roleCodeOptions =
        useMemo(
            () =>
                activeRoles.map(
                    (
                        role
                    ) => ({

                        label:
                            role.roleCode,

                        value:
                            role.roleCode,

                    })
                ),
            [
                activeRoles,
            ]
        );


    /* =====================================================
       PERMISSION OPTIONS
    ===================================================== */

    const permissionOptions =
        useMemo(
            () =>
                activePermissions.map(
                    (
                        permission
                    ) => ({

                        label:
                            permission.permissionName,

                        value:
                            permission.id,

                    })
                ),
            [
                activePermissions,
            ]
        );


    /* =====================================================
       PERMISSION GROUPS
    ===================================================== */

    const permissionGroups =
        useMemo(
            () =>
                groupPermissionsByModule(
                    activePermissions
                ),
            [
                activePermissions,
            ]
        );


    /* =====================================================
       ROLE TYPE OPTIONS
    ===================================================== */

    const roleTypeOptions =
        useMemo(
            () => [

                {
                    label:
                        "System",

                    value:
                        ROLE_TYPES.SYSTEM,
                },

                {
                    label:
                        "Application",

                    value:
                        ROLE_TYPES.APPLICATION,
                },

                {
                    label:
                        "Custom",

                    value:
                        ROLE_TYPES.CUSTOM,
                },

            ],
            []
        );


    /* =====================================================
       ROLE SCOPE OPTIONS
    ===================================================== */

    const roleScopeOptions =
        useMemo(
            () => [

                {
                    label:
                        "Global",

                    value:
                        ROLE_SCOPES.GLOBAL,
                },

                {
                    label:
                        "Company",

                    value:
                        ROLE_SCOPES.COMPANY,
                },

                {
                    label:
                        "Center",

                    value:
                        ROLE_SCOPES.CENTER,
                },

                {
                    label:
                        "Department",

                    value:
                        ROLE_SCOPES.DEPARTMENT,
                },

                {
                    label:
                        "Store",

                    value:
                        ROLE_SCOPES.STORE,
                },

                {
                    label:
                        "Sub Store",

                    value:
                        ROLE_SCOPES.SUB_STORE,
                },

            ],
            []
        );


    /* =====================================================
       GET ROLE BY ID
    ===================================================== */

    const findRoleById =
        useCallback(
            (
                id
            ) =>
                getRoleById(
                    roles,
                    id
                ),
            [
                roles,
            ]
        );


    /* =====================================================
       GET ROLE BY CODE
    ===================================================== */

    const findRoleByCode =
        useCallback(
            (
                code
            ) =>
                getRoleByCode(
                    roles,
                    code
                ),
            [
                roles,
            ]
        );


    /* =====================================================
       GET PERMISSION BY ID
    ===================================================== */

    const findPermissionById =
        useCallback(
            (
                id
            ) =>
                getPermissionById(
                    permissions,
                    id
                ),
            [
                permissions,
            ]
        );


    /* =====================================================
       GET PERMISSION BY CODE
    ===================================================== */

    const findPermissionByCode =
        useCallback(
            (
                code
            ) =>
                getPermissionByCode(
                    permissions,
                    code
                ),
            [
                permissions,
            ]
        );


    /* =====================================================
       GET PERMISSIONS BY MODULE
    ===================================================== */

    const findPermissionsByModule =
        useCallback(
            (
                moduleCode
            ) =>
                getPermissionsByModule(
                    permissions,
                    moduleCode
                ),
            [
                permissions,
            ]
        );


    /* =====================================================
       GET PERMISSIONS BY RESOURCE
    ===================================================== */

    const findPermissionsByResource =
        useCallback(
            (
                resourceCode
            ) =>
                getPermissionsByResource(
                    permissions,
                    resourceCode
                ),
            [
                permissions,
            ]
        );


    /* =====================================================
       ROLE PERMISSION COUNT
    ===================================================== */

    const getPermissionCount =
        useCallback(
            (
                role
            ) =>
                getRolePermissionCount(
                    role
                ),
            []
        );


    /* =====================================================
       ASSIGNED USER COUNT
    ===================================================== */

    const getUsersCount =
        useCallback(
            (
                role
            ) =>
                getAssignedUserCount(
                    role
                ),
            []
        );


    /* =====================================================
       ROLE LABEL
    ===================================================== */

    const getLabel =
        useCallback(
            (
                role
            ) =>
                getRoleLabel(
                    role
                ),
            []
        );


    /* =====================================================
       ROLE TYPE LABEL
    ===================================================== */

    const getTypeLabel =
        useCallback(
            (
                type
            ) =>
                getRoleTypeLabel(
                    type
                ),
            []
        );


    /* =====================================================
       ROLE SCOPE LABEL
    ===================================================== */

    const getScopeLabel =
        useCallback(
            (
                scope
            ) =>
                getRoleScopeLabel(
                    scope
                ),
            []
        );


    /* =====================================================
       RETURN
    ===================================================== */

    return {

        roles,

        activeRoles,

        inactiveRoles,

        permissions,

        activePermissions,

        roleOptions,

        roleCodeOptions,

        permissionOptions,

        permissionGroups,

        roleTypeOptions,

        roleScopeOptions,

        findRoleById,

        findRoleByCode,

        findPermissionById,

        findPermissionByCode,

        findPermissionsByModule,

        findPermissionsByResource,

        getPermissionCount,

        getUsersCount,

        getLabel,

        getTypeLabel,

        getScopeLabel,

    };

};


export default useRoleLookup;