// src/modules/user-management/permission/hooks/usePermissionLookup.js

import {
    useMemo,
} from "react";

import {
    permissionList,
} from "../mock/permission.mock";


/* =========================================================
   PERMISSION LOOKUP
   ========================================================= */

export const usePermissionLookup = () => {

    const permissions = useMemo(
        () => permissionList,
        []
    );


    const modules = useMemo(
        () => {

            return [
                ...new Set(
                    permissions
                        .map(
                            (
                                item
                            ) =>
                                item.moduleCode
                        )
                        .filter(Boolean)
                ),
            ];

        },
        [
            permissions,
        ]
    );


    const resources = useMemo(
        () => {

            return [
                ...new Set(
                    permissions
                        .map(
                            (
                                item
                            ) =>
                                item.resourceCode
                        )
                        .filter(Boolean)
                ),
            ];

        },
        [
            permissions,
        ]
    );


    const getPermissionsByModule = (
        moduleCode
    ) => {

        if (
            !moduleCode
        ) {

            return permissions;

        }


        return permissions.filter(
            (
                item
            ) =>
                item.moduleCode ===
                moduleCode
        );

    };


    const getPermissionsByResource = (
        resourceCode
    ) => {

        if (
            !resourceCode
        ) {

            return permissions;

        }


        return permissions.filter(
            (
                item
            ) =>
                item.resourceCode ===
                resourceCode
        );

    };


    return {

        permissions,

        modules,

        resources,

        getPermissionsByModule,

        getPermissionsByResource,

    };

};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default usePermissionLookup;