/* =========================================================
   USER LOOKUP HOOK
   ========================================================= */

import {
    useCallback,
    useMemo,
} from "react";

import {
    userDepartmentList,
    userDesignationList,
    userRoleList,
    userList,
} from "../mock/user.mock";


const useUserLookup = () => {

    /* =====================================================
       DEPARTMENT OPTIONS
    ===================================================== */

    const departmentOptions =
        useMemo(
            () =>
                userDepartmentList
                    .filter(
                        (item) =>
                            item.isActive
                    )
                    .map(
                        (item) => ({
                            label:
                                item.name,

                            value:
                                item.id,
                        })
                    ),
            []
        );


    /* =====================================================
       DESIGNATION OPTIONS
    ===================================================== */

    const designationOptions =
        useMemo(
            () =>
                userDesignationList
                    .filter(
                        (item) =>
                            item.isActive
                    )
                    .map(
                        (item) => ({
                            label:
                                item.name,

                            value:
                                item.id,

                            departmentId:
                                item.departmentId,
                        })
                    ),
            []
        );


    /* =====================================================
       ROLE OPTIONS
    ===================================================== */

    const roleOptions =
        useMemo(
            () =>
                userRoleList
                    .filter(
                        (item) =>
                            item.isActive
                    )
                    .map(
                        (item) => ({
                            label:
                                item.name,

                            value:
                                item.id,
                        })
                    ),
            []
        );


    /* =====================================================
       USER OPTIONS
    ===================================================== */

    const userOptions =
        useMemo(
            () =>
                userList
                    .filter(
                        (item) =>
                            !item.isDeleted
                    )
                    .map(
                        (item) => ({
                            label:
                                item.displayName,

                            value:
                                item.id,

                            username:
                                item.username,

                            employeeId:
                                item.employeeId,
                        })
                    ),
            []
        );


    /* =====================================================
       GET DEPARTMENT
    ===================================================== */

    const getDepartmentById =
        useCallback(
            (
                departmentId
            ) =>
                userDepartmentList.find(
                    (
                        item
                    ) =>
                        item.id ===
                        departmentId
                ) || null,
            []
        );


    /* =====================================================
       GET DESIGNATION
    ===================================================== */

    const getDesignationById =
        useCallback(
            (
                designationId
            ) =>
                userDesignationList.find(
                    (
                        item
                    ) =>
                        item.id ===
                        designationId
                ) || null,
            []
        );


    /* =====================================================
       GET ROLE
    ===================================================== */

    const getRoleById =
        useCallback(
            (
                roleId
            ) =>
                userRoleList.find(
                    (
                        item
                    ) =>
                        item.id ===
                        roleId
                ) || null,
            []
        );


    /* =====================================================
       GET USER
    ===================================================== */

    const getUserById =
        useCallback(
            (
                userId
            ) =>
                userList.find(
                    (
                        item
                    ) =>
                        item.id ===
                        userId
                ) || null,
            []
        );


    /* =====================================================
       GET DESIGNATIONS BY DEPARTMENT
    ===================================================== */

    const getDesignationsByDepartment =
        useCallback(
            (
                departmentId
            ) =>
                userDesignationList
                    .filter(
                        (
                            item
                        ) =>
                            item.isActive &&
                            item.departmentId ===
                                departmentId
                    )
                    .map(
                        (
                            item
                        ) => ({
                            label:
                                item.name,

                            value:
                                item.id,
                        })
                    ),
            []
        );


    /* =====================================================
       GET USER ROLES
    ===================================================== */

    const getUserRoles =
        useCallback(
            (
                user
            ) => {

                if (
                    !user ||
                    !Array.isArray(
                        user.roleIds
                    )
                ) {
                    return [];
                }


                return userRoleList.filter(
                    (
                        role
                    ) =>
                        user.roleIds.includes(
                            role.id
                        )
                );

            },
            []
        );


    /* =====================================================
       RETURN
    ===================================================== */

    return {

        departmentOptions,

        designationOptions,

        roleOptions,

        userOptions,

        getDepartmentById,

        getDesignationById,

        getRoleById,

        getUserById,

        getDesignationsByDepartment,

        getUserRoles,

    };

};


export default useUserLookup;