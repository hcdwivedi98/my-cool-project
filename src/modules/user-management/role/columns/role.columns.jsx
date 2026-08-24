// src/modules/user-management/role/columns/role.columns.jsx

import React from "react";

import {
    Button,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";

import {
    ROLE_STATUS,
    ROLE_TYPES,
} from "../constants/role.constants";

import {
    getRoleTypeLabel,
    getRoleScopeLabel,
    getRolePermissionCount,
    getAssignedUserCount,
} from "../utils/role.helper";


/* =========================================================
   ROLE COLUMNS
   ========================================================= */

const getRoleColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
} = {}) => {

    return [

        /* =====================================================
           ROLE CODE
        ===================================================== */

        {
            title:
                "Role Code",

            dataIndex:
                "roleCode",

            key:
                "roleCode",

            width:
                180,

            fixed:
                "left",

            sorter:
                true,

            render:
                (
                    value
                ) => (

                    <span
                        style={{
                            fontWeight:
                                600,
                        }}
                    >
                        {
                            value ||
                            "-"
                        }
                    </span>

                ),
        },


        /* =====================================================
           ROLE NAME
        ===================================================== */

        {
            title:
                "Role Name",

            dataIndex:
                "roleName",

            key:
                "roleName",

            width:
                220,

            sorter:
                true,

            render:
                (
                    value
                ) => (

                    <span>
                        {
                            value ||
                            "-"
                        }
                    </span>

                ),
        },


        /* =====================================================
           ROLE TYPE
        ===================================================== */

        {
            title:
                "Role Type",

            dataIndex:
                "roleType",

            key:
                "roleType",

            width:
                150,

            filters: [

                {
                    text:
                        "System",

                    value:
                        ROLE_TYPES.SYSTEM,
                },

                {
                    text:
                        "Application",

                    value:
                        ROLE_TYPES.APPLICATION,
                },

                {
                    text:
                        "Custom",

                    value:
                        ROLE_TYPES.CUSTOM,
                },

            ],

            render:
                (
                    value
                ) => {

                    let color;

                    switch (
                        value
                    ) {

                        case ROLE_TYPES.SYSTEM:

                            color =
                                "purple";

                            break;


                        case ROLE_TYPES.APPLICATION:

                            color =
                                "blue";

                            break;


                        case ROLE_TYPES.CUSTOM:

                            color =
                                "cyan";

                            break;


                        default:

                            color =
                                "default";

                    }


                    return (

                        <Tag
                            color={
                                color
                            }
                        >
                            {
                                getRoleTypeLabel(
                                    value
                                )
                            }
                        </Tag>

                    );

                },
        },


        /* =====================================================
           SCOPE
        ===================================================== */

        {
            title:
                "Scope",

            dataIndex:
                "scope",

            key:
                "scope",

            width:
                150,

            sorter:
                true,

            render:
                (
                    value
                ) => (

                    <Tag>
                        {
                            getRoleScopeLabel(
                                value
                            )
                        }
                    </Tag>

                ),
        },


        /* =====================================================
           PERMISSIONS
        ===================================================== */

        {
            title:
                "Permissions",

            key:
                "permissions",

            width:
                120,

            align:
                "center",

            sorter:
                (
                    a,
                    b
                ) =>
                    getRolePermissionCount(
                        a
                    ) -
                    getRolePermissionCount(
                        b
                    ),

            render:
                (
                    _,
                    record
                ) => (

                    <Tag
                        color="blue"
                    >
                        {
                            getRolePermissionCount(
                                record
                            )
                        }
                    </Tag>

                ),
        },


        /* =====================================================
           ASSIGNED USERS
        ===================================================== */

        {
            title:
                "Users",

            key:
                "assignedUsers",

            width:
                100,

            align:
                "center",

            sorter:
                (
                    a,
                    b
                ) =>
                    getAssignedUserCount(
                        a
                    ) -
                    getAssignedUserCount(
                        b
                    ),

            render:
                (
                    _,
                    record
                ) => (

                    <Tag
                        color={
                            getAssignedUserCount(
                                record
                            ) > 0
                                ? "green"
                                : "default"
                        }
                    >
                        {
                            getAssignedUserCount(
                                record
                            )
                        }
                    </Tag>

                ),
        },


        /* =====================================================
           STATUS
        ===================================================== */

        {
            title:
                "Status",

            dataIndex:
                "status",

            key:
                "status",

            width:
                120,

            filters: [

                {
                    text:
                        "Active",

                    value:
                        ROLE_STATUS.ACTIVE,
                },

                {
                    text:
                        "Inactive",

                    value:
                        ROLE_STATUS.INACTIVE,
                },

            ],

            render:
                (
                    value
                ) => (

                    <Tag
                        color={
                            value ===
                            ROLE_STATUS.ACTIVE
                                ? "success"
                                : "default"
                        }
                    >
                        {
                            value ===
                            ROLE_STATUS.ACTIVE
                                ? "Active"
                                : "Inactive"
                        }
                    </Tag>

                ),
        },


        /* =====================================================
           UPDATED AT
        ===================================================== */

        {
            title:
                "Updated At",

            dataIndex:
                "updatedAt",

            key:
                "updatedAt",

            width:
                180,

            sorter:
                true,

            render:
                (
                    value
                ) => {

                    if (!value) {

                        return "-";

                    }


                    const date =
                        new Date(
                            value
                        );


                    if (
                        Number.isNaN(
                            date.getTime()
                        )
                    ) {

                        return value;

                    }


                    return date.toLocaleString(
                        "en-IN",
                        {
                            dateStyle:
                                "medium",

                            timeStyle:
                                "short",
                        }
                    );

                },
        },


        /* =====================================================
           ACTIONS
        ===================================================== */

        {
            title:
                "Actions",

            key:
                "actions",

            width:
                170,

            fixed:
                "right",

            render:
                (
                    _,
                    record
                ) => (

                    <Space
                        size="small"
                    >

                        {/* VIEW */}

                        <Tooltip
                            title="View"
                        >

                            <Button
                                type="text"

                                icon={
                                    <EyeOutlined />
                                }

                                onClick={() =>
                                    onView?.(
                                        record
                                    )
                                }
                            />

                        </Tooltip>


                        {/* EDIT */}

                        <Tooltip
                            title="Edit"
                        >

                            <Button
                                type="text"

                                icon={
                                    <EditOutlined />
                                }

                                onClick={() =>
                                    onEdit?.(
                                        record
                                    )
                                }
                            />

                        </Tooltip>


                        {/* ACTIVATE */}

                        {
                            record.status ===
                            ROLE_STATUS.INACTIVE && (

                                <Tooltip
                                    title="Activate"
                                >

                                    <Button
                                        type="text"

                                        icon={
                                            <CheckCircleOutlined />
                                        }

                                        onClick={() =>
                                            onActivate?.(
                                                record
                                            )
                                        }
                                    />

                                </Tooltip>

                            )
                        }


                        {/* DEACTIVATE */}

                        {
                            record.status ===
                                ROLE_STATUS.ACTIVE &&
                            !record.isSystemRole && (

                                <Tooltip
                                    title="Deactivate"
                                >

                                    <Button
                                        type="text"

                                        danger

                                        icon={
                                            <StopOutlined />
                                        }

                                        onClick={() =>
                                            onDeactivate?.(
                                                record
                                            )
                                        }
                                    />

                                </Tooltip>

                            )
                        }

                    </Space>

                ),
        },

    ];

};


export default getRoleColumns;