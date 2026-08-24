// src/modules/user-management/permission/columns/permission.columns.jsx

import React from "react";

import {
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    CheckCircleOutlined,
    DownloadOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import {
    PERMISSION_ACTIONS,
    PERMISSION_STATUS,
    PERMISSION_TYPES,
} from "../constants/permission.constants";

import {
    getPermissionActionLabel,
    getPermissionModuleLabel,
    getPermissionResourceLabel,
    getPermissionScopeLabel,
    getPermissionStatusColor,
    getPermissionStatusLabel,
    getPermissionTypeColor,
    getPermissionTypeLabel,
} from "../utils/permission.helper";


/* =========================================================
   ACTION ICON
   ========================================================= */

const getActionIcon = (
    action
) => {

    switch (
        action
    ) {

        case PERMISSION_ACTIONS.VIEW:

            return (
                <EyeOutlined />
            );


        case PERMISSION_ACTIONS.CREATE:

            return (
                <PlusOutlined />
            );


        case PERMISSION_ACTIONS.EDIT:

            return (
                <EditOutlined />
            );


        case PERMISSION_ACTIONS.DELETE:

            return (
                <DeleteOutlined />
            );


        case PERMISSION_ACTIONS.APPROVE:

            return (
                <CheckCircleOutlined />
            );


        case PERMISSION_ACTIONS.EXPORT:

            return (
                <DownloadOutlined />
            );


        default:

            return (
                <SettingOutlined />
            );

    }

};


/* =========================================================
   ACTION TAG
   ========================================================= */

const renderActionTag = (
    action
) => {

    return (

        <Tooltip
            title={
                getPermissionActionLabel(
                    action
                )
            }
        >

            <Tag
                icon={
                    getActionIcon(
                        action
                    )
                }
            >
                {
                    getPermissionActionLabel(
                        action
                    )
                }
            </Tag>

        </Tooltip>

    );

};


/* =========================================================
   PERMISSION COLUMNS
   ========================================================= */

export const permissionColumns = ({
    onView,
    onEdit,
    onDelete,
}) => [

    /* =====================================================
       CODE
    ===================================================== */

    {
        title:
            "Permission Code",

        dataIndex:
            "permissionCode",

        key:
            "permissionCode",

        width:
            210,

        fixed:
            "left",

        render:
            (
                value
            ) => (

                <span
                    style={{
                        fontWeight:
                            600,

                        color:
                            "#1677ff",
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
       NAME
    ===================================================== */

    {
        title:
            "Permission Name",

        dataIndex:
            "permissionName",

        key:
            "permissionName",

        width:
            220,

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
                            value ||
                            "-"
                        }
                    </div>


                    {
                        record.description && (

                            <div
                                style={{
                                    marginTop:
                                        2,

                                    fontSize:
                                        12,

                                    color:
                                        "#8c8c8c",

                                    overflow:
                                        "hidden",

                                    textOverflow:
                                        "ellipsis",

                                    whiteSpace:
                                        "nowrap",

                                    maxWidth:
                                        200,
                                }}
                            >
                                {
                                    record.description
                                }
                            </div>

                        )
                    }

                </div>

            ),

    },


    /* =====================================================
       MODULE
    ===================================================== */

    {
        title:
            "Module",

        dataIndex:
            "moduleCode",

        key:
            "moduleCode",

        width:
            160,

        render:
            (
                value
            ) => (

                <Tag
                    color="blue"
                >
                    {
                        getPermissionModuleLabel(
                            value
                        )
                    }
                </Tag>

            ),

    },


    /* =====================================================
       RESOURCE
    ===================================================== */

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
                        getPermissionResourceLabel(
                            value
                        )
                    }
                </span>

            ),

    },


    /* =====================================================
       ACTIONS
    ===================================================== */

    {
        title:
            "Actions",

        dataIndex:
            "actions",

        key:
            "actions",

        width:
            360,

        render:
            (
                actions
            ) => (

                <Space
                    size={[
                        4,
                        4,
                    ]}
                    wrap
                >

                    {
                        Array.isArray(
                            actions
                        ) &&
                        actions.map(
                            (
                                action
                            ) => (

                                <React.Fragment
                                    key={
                                        action
                                    }
                                >
                                    {
                                        renderActionTag(
                                            action
                                        )
                                    }
                                </React.Fragment>

                            )
                        )
                    }

                </Space>

            ),

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
            120,

        render:
            (
                value
            ) => (

                <Tag>
                    {
                        getPermissionScopeLabel(
                            value
                        )
                    }
                </Tag>

            ),

    },


    /* =====================================================
       TYPE
    ===================================================== */

    {
        title:
            "Type",

        dataIndex:
            "permissionType",

        key:
            "permissionType",

        width:
            120,

        render:
            (
                value
            ) => (

                <Tag
                    color={
                        getPermissionTypeColor(
                            value
                        )
                    }
                >
                    {
                        getPermissionTypeLabel(
                            value
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
            110,

        render:
            (
                value
            ) => (

                <Tag
                    color={
                        getPermissionStatusColor(
                            value
                        )
                    }
                >
                    {
                        getPermissionStatusLabel(
                            value
                        )
                    }
                </Tag>

            ),

    },


    /* =====================================================
       SYSTEM
    ===================================================== */

    {
        title:
            "System",

        dataIndex:
            "isSystemPermission",

        key:
            "isSystemPermission",

        width:
            100,

        align:
            "center",

        render:
            (
                value
            ) => (

                value === true
                    ? (
                        <Tag
                            color="blue"
                        >
                            System
                        </Tag>
                    )
                    : (
                        <Tag>
                            Custom
                        </Tag>
                    )

            ),

    },


    /* =====================================================
       SORT ORDER
    ===================================================== */

    {
        title:
            "Order",

        dataIndex:
            "sortOrder",

        key:
            "sortOrder",

        width:
            80,

        align:
            "center",

        sorter:
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
                ),

    },


    /* =====================================================
       ACTION
    ===================================================== */

    {
        title:
            "Action",

        key:
            "action",

        width:
            150,

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

                    <Tooltip
                        title="View"
                    >

                        <a
                            onClick={() =>
                                onView?.(
                                    record
                                )
                            }
                        >
                            View
                        </a>

                    </Tooltip>


                    {
                        record.permissionType !==
                            PERMISSION_TYPES.SYSTEM &&
                        (

                            <Tooltip
                                title="Edit"
                            >

                                <a
                                    onClick={() =>
                                        onEdit?.(
                                            record
                                        )
                                    }
                                >
                                    Edit
                                </a>

                            </Tooltip>

                        )
                    }


                    {
                        record.permissionType !==
                            PERMISSION_TYPES.SYSTEM &&
                        (

                            <Tooltip
                                title="Delete"
                            >

                                <a
                                    style={{
                                        color:
                                            "#ff4d4f",
                                    }}
                                    onClick={() =>
                                        onDelete?.(
                                            record
                                        )
                                    }
                                >
                                    Delete
                                </a>

                            </Tooltip>

                        )
                    }

                </Space>

            ),

    },

];


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default permissionColumns;