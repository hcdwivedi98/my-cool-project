// src/modules/user-management/permission/services/permission.service.js

import {
    permissionList,
} from "../mock/permission.mock";

import {
    executePermissionQuery,
} from "../utils/permission.query";

import {
    preparePermissionPayload,
} from "../utils/permission.helper";


/* =========================================================
   LOCAL DATA STORE
   ========================================================= */

let permissions = [
    ...permissionList,
];


/* =========================================================
   SMALL DELAY
   ========================================================= */

const delay = (
    milliseconds = 250
) =>
    new Promise(
        (
            resolve
        ) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


/* =========================================================
   GET PERMISSIONS
   ========================================================= */

export const getPermissions = async (
    query = {}
) => {

    await delay();


    return executePermissionQuery(
        permissions,
        query
    );

};


/* =========================================================
   GET ALL
   ========================================================= */

export const getAllPermissions = async () => {

    await delay();


    return [
        ...permissions,
    ];

};


/* =========================================================
   GET BY ID
   ========================================================= */

export const getPermissionById = async (
    id
) => {

    await delay();


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
   CREATE
   ========================================================= */

export const createPermission = async (
    values
) => {

    await delay();


    const payload =
        preparePermissionPayload(
            values
        );


    const now =
        new Date().toISOString();


    const newPermission = {

        ...payload,

        id:
            `PERM-${Date.now()}`,

        createdAt:
            now,

        createdBy:
            "current-user",

        updatedAt:
            now,

        updatedBy:
            "current-user",

        version:
            1,

        isDeleted:
            false,

    };


    permissions = [

        newPermission,

        ...permissions,

    ];


    return {
        ...newPermission,
    };

};


/* =========================================================
   UPDATE
   ========================================================= */

export const updatePermission = async (
    id,
    values
) => {

    await delay();


    const index =
        permissions.findIndex(
            (
                permission
            ) =>
                permission.id ===
                id
        );


    if (
        index ===
        -1
    ) {

        throw new Error(
            "Permission not found."
        );

    }


    const payload =
        preparePermissionPayload(
            values
        );


    const existing =
        permissions[
            index
        ];


    const now =
        new Date().toISOString();


    const updatedPermission = {

        ...existing,

        ...payload,

        id:
            existing.id,

        createdAt:
            existing.createdAt,

        createdBy:
            existing.createdBy,

        updatedAt:
            now,

        updatedBy:
            "current-user",

        version:
            (
                Number(
                    existing.version
                ) || 1
            ) + 1,

    };


    permissions[
        index
    ] =
        updatedPermission;


    return {
        ...updatedPermission,
    };

};


/* =========================================================
   DELETE
   ========================================================= */

export const deletePermission = async (
    id
) => {

    await delay();


    const index =
        permissions.findIndex(
            (
                permission
            ) =>
                permission.id ===
                id
        );


    if (
        index ===
        -1
    ) {

        throw new Error(
            "Permission not found."
        );

    }


    const permission =
        permissions[
            index
        ];


    if (
        permission.isSystemPermission ===
        true
    ) {

        throw new Error(
            "System permissions cannot be deleted."
        );

    }


    permissions =
        permissions.filter(
            (
                item
            ) =>
                item.id !==
                id
        );


    return true;

};


/* =========================================================
   RESTORE
   ========================================================= */

export const restorePermissions = (
    data = permissionList
) => {

    permissions = [
        ...data,
    ];


    return [
        ...permissions,
    ];

};


/* =========================================================
   DEFAULT SERVICE
   ========================================================= */

const permissionService = {

    getPermissions,

    getAllPermissions,

    getPermissionById,

    createPermission,

    updatePermission,

    deletePermission,

    restorePermissions,

};


export default permissionService;