// src/modules/user-management/role/components/PermissionSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Checkbox,
    Empty,
    Form,
    Input,
    Table,
    Tag,
} from "antd";

import {
    permissionList,
} from "../mock/role.mock";

import {
    PERMISSION_ACTIONS,
} from "../constants/role.constants";

import {
    getRoleTypeLabel,
} from "../utils/role.helper";


/* =========================================================
   PERMISSION SECTION
   ========================================================= */

const PermissionSection = ({
    mode = "CREATE",
    disabled = false,
    permissions = permissionList,
}) => {

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       FORM
    ===================================================== */

    const form =
        Form.useFormInstance();


    /* =====================================================
       PERMISSION GROUPS
    ===================================================== */

    const groupedPermissions =
        useMemo(
            () => {

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

            },
            [
                permissions,
            ]
        );


    /* =====================================================
       MODULE LABEL
    ===================================================== */

    const getModuleLabel = (
        moduleCode
    ) => {

        return String(
            moduleCode ||
            ""
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


    /* =====================================================
       RESOURCE LABEL
    ===================================================== */

    const getResourceLabel = (
        resourceCode
    ) => {

        return String(
            resourceCode ||
            ""
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


    /* =====================================================
       PERMISSION DATA
    ===================================================== */

    const tableData =
        useMemo(
            () => {

                return Object.entries(
                    groupedPermissions
                ).flatMap(
                    (
                        [
                            moduleCode,
                            modulePermissions,
                        ]
                    ) =>
                        modulePermissions.map(
                            (
                                permission
                            ) => ({

                                ...permission,

                                key:
                                    permission.id,

                                moduleCode,

                            })
                        )
                );

            },
            [
                groupedPermissions,
            ]
        );


    /* =====================================================
       CHECKBOX CHANGE
    ===================================================== */

    const handlePermissionChange = (
        permission,
        action,
        checked
    ) => {

        const currentPermissions =
            form.getFieldValue(
                "permissions"
            ) || [];


        const existingIndex =
            currentPermissions.findIndex(
                (
                    item
                ) =>
                    item.permissionId ===
                    permission.id
            );


        const nextPermissions =
            [
                ...currentPermissions,
            ];


        if (
            existingIndex ===
            -1
        ) {

            nextPermissions.push({

                permissionId:
                    permission.id,

                canView:
                    action ===
                    PERMISSION_ACTIONS.VIEW
                        ? checked
                        : false,

                canCreate:
                    action ===
                    PERMISSION_ACTIONS.CREATE
                        ? checked
                        : false,

                canEdit:
                    action ===
                    PERMISSION_ACTIONS.EDIT
                        ? checked
                        : false,

                canDelete:
                    action ===
                    PERMISSION_ACTIONS.DELETE
                        ? checked
                        : false,

                canApprove:
                    action ===
                    PERMISSION_ACTIONS.APPROVE
                        ? checked
                        : false,

                canExport:
                    action ===
                    PERMISSION_ACTIONS.EXPORT
                        ? checked
                        : false,

            });

        }
        else {

            nextPermissions[
                existingIndex
            ] = {

                ...nextPermissions[
                    existingIndex
                ],

                canView:
                    action ===
                    PERMISSION_ACTIONS.VIEW
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canView === true,

                canCreate:
                    action ===
                    PERMISSION_ACTIONS.CREATE
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canCreate === true,

                canEdit:
                    action ===
                    PERMISSION_ACTIONS.EDIT
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canEdit === true,

                canDelete:
                    action ===
                    PERMISSION_ACTIONS.DELETE
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canDelete === true,

                canApprove:
                    action ===
                    PERMISSION_ACTIONS.APPROVE
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canApprove === true,

                canExport:
                    action ===
                    PERMISSION_ACTIONS.EXPORT
                        ? checked
                        : nextPermissions[
                            existingIndex
                        ].canExport === true,

            };

        }


        /*
         * Remove permission completely
         * if every action is false.
         */

        const cleanedPermissions =
            nextPermissions.filter(
                (
                    item
                ) =>
                    item.canView ||
                    item.canCreate ||
                    item.canEdit ||
                    item.canDelete ||
                    item.canApprove ||
                    item.canExport
            );


        form.setFieldValue(
            "permissions",
            cleanedPermissions
        );

    };


    /* =====================================================
       CHECKBOX VALUE
    ===================================================== */

    const getPermissionValue = (
        permissionId,
        action
    ) => {

        const currentPermissions =
            form.getFieldValue(
                "permissions"
            ) || [];


        const assigned =
            currentPermissions.find(
                (
                    item
                ) =>
                    item.permissionId ===
                    permissionId
            );


        if (!assigned) {

            return false;

        }


        switch (
            action
        ) {

            case PERMISSION_ACTIONS.VIEW:

                return assigned.canView === true;


            case PERMISSION_ACTIONS.CREATE:

                return assigned.canCreate === true;


            case PERMISSION_ACTIONS.EDIT:

                return assigned.canEdit === true;


            case PERMISSION_ACTIONS.DELETE:

                return assigned.canDelete === true;


            case PERMISSION_ACTIONS.APPROVE:

                return assigned.canApprove === true;


            case PERMISSION_ACTIONS.EXPORT:

                return assigned.canExport === true;


            default:

                return false;

        }

    };


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns = [

        /* =================================================
           MODULE
        ================================================= */

        {
            title:
                "Module",

            dataIndex:
                "moduleCode",

            key:
                "moduleCode",

            width:
                170,

            render:
                (
                    value
                ) => (

                    <Tag
                        color="blue"
                    >
                        {
                            getModuleLabel(
                                value
                            )
                        }
                    </Tag>

                ),
        },


        /* =================================================
           RESOURCE
        ================================================= */

        {
            title:
                "Resource",

            dataIndex:
                "resourceCode",

            key:
                "resourceCode",

            width:
                190,

            render:
                (
                    value
                ) => (

                    <span
                        style={{
                            fontWeight:
                                500,
                        }}
                    >
                        {
                            getResourceLabel(
                                value
                            )
                        }
                    </span>

                ),
        },


        /* =================================================
           PERMISSION
        ================================================= */

        {
            title:
                "Permission",

            dataIndex:
                "permissionName",

            key:
                "permissionName",

            width:
                230,

            render:
                (
                    value,
                    record
                ) => (

                    <div>

                        <div
                            style={{
                                fontWeight:
                                    500,
                            }}
                        >
                            {
                                value
                            }
                        </div>

                        <div
                            style={{
                                marginTop:
                                    2,

                                fontSize:
                                    12,

                                color:
                                    "#8c8c8c",
                            }}
                        >
                            {
                                record.permissionCode
                            }
                        </div>

                    </div>

                ),
        },


        /* =================================================
           VIEW
        ================================================= */

        {
            title:
                "View",

            key:
                "view",

            width:
                75,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.VIEW
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.VIEW,
                                event.target.checked
                            )
                        }
                    />

                ),
        },


        /* =================================================
           CREATE
        ================================================= */

        {
            title:
                "Create",

            key:
                "create",

            width:
                80,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.CREATE
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.CREATE,
                                event.target.checked
                            )
                        }
                    />

                ),
        },


        /* =================================================
           EDIT
        ================================================= */

        {
            title:
                "Edit",

            key:
                "edit",

            width:
                70,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.EDIT
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.EDIT,
                                event.target.checked
                            )
                        }
                    />

                ),
        },


        /* =================================================
           DELETE
        ================================================= */

        {
            title:
                "Delete",

            key:
                "delete",

            width:
                80,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.DELETE
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.DELETE,
                                event.target.checked
                            )
                        }
                    />

                ),
        },


        /* =================================================
           APPROVE
        ================================================= */

        {
            title:
                "Approve",

            key:
                "approve",

            width:
                85,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.APPROVE
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.APPROVE,
                                event.target.checked
                            )
                        }
                    />

                ),
        },


        /* =================================================
           EXPORT
        ================================================= */

        {
            title:
                "Export",

            key:
                "export",

            width:
                80,

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <Checkbox
                        checked={
                            getPermissionValue(
                                record.id,
                                PERMISSION_ACTIONS.EXPORT
                            )
                        }

                        disabled={
                            isViewMode
                        }

                        onChange={(
                            event
                        ) =>
                            handlePermissionChange(
                                record,
                                PERMISSION_ACTIONS.EXPORT,
                                event.target.checked
                            )
                        }
                    />

                ),
        },

    ];


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="role-form-section role-permission-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="role-section-header"
            >

                <div
                    className="role-section-title"
                >
                    Permissions
                </div>

                <div
                    className="role-section-description"
                >
                    Configure the actions this role can
                    perform across the application.
                </div>

            </div>


            {/* =================================================
                FORM FIELD
            ================================================= */}

            <Form.Item
                name="permissions"
                hidden
            >
                <Input />
            </Form.Item>


            {/* =================================================
                PERMISSION MATRIX
            ================================================= */}

            <div
                className="role-permission-table"
            >

                <Table

                    rowKey="id"

                    columns={
                        columns
                    }

                    dataSource={
                        tableData
                    }

                    pagination={
                        false
                    }

                    size="small"

                    bordered

                    scroll={{
                        x:
                            1100,
                    }}

                    locale={{
                        emptyText: (

                            <Empty
                                description={
                                    "No permissions available"
                                }
                            />

                        ),
                    }}

                />

            </div>

        </section>

    );

};


export default PermissionSection;