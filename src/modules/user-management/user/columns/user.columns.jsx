/* =========================================================
   USER TABLE COLUMNS
   ========================================================= */

import React from "react";

import {
    Button,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EditOutlined,
    EyeOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";

import {
    getDepartmentName,
    getDesignationName,
    getPrimaryRoleName,
    getUserInitials,
    getUserStatusColor,
    getUserStatusLabel,
    getUserTypeLabel,
    getPasswordStatusColor,
    getPasswordStatusLabel,
    getLoginAccessColor,
    getLoginAccessLabel,
    getRoleDisplayText,
} from "../utils/user.helper";


/* =========================================================
   COLUMN FACTORY
   ========================================================= */

const getUserColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
    onUnlock,
}) => [

    /* =====================================================
       USER
    ===================================================== */

    {
        title: "User",

        key: "user",

        dataIndex: "displayName",

        width: 220,

        fixed: "left",

        render: (
            _,
            record
        ) => (

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 0,
                }}
            >

                <div
                    style={{
                        width: 36,
                        height: 36,
                        minWidth: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f0f5ff",
                        color: "#1677ff",
                        fontWeight: 600,
                    }}
                >
                    {
                        getUserInitials(
                            record
                        )
                    }
                </div>


                <div
                    style={{
                        minWidth: 0,
                    }}
                >

                    <div
                        style={{
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {
                            record.displayName ||
                            "-"
                        }
                    </div>


                    <div
                        style={{
                            fontSize: 12,
                            color: "#8c8c8c",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        @
                        {
                            record.username ||
                            "-"
                        }
                    </div>

                </div>

            </div>

        ),
    },


    /* =====================================================
       USER CODE
    ===================================================== */

    {
        title: "User Code",

        dataIndex: "userCode",

        key: "userCode",

        width: 120,

        render: (
            value
        ) => (
            <span
                style={{
                    fontWeight: 500,
                }}
            >
                {
                    value || "-"
                }
            </span>
        ),
    },


    /* =====================================================
       EMPLOYEE ID
    ===================================================== */

    {
        title: "Employee ID",

        dataIndex: "employeeId",

        key: "employeeId",

        width: 130,

        render: (
            value
        ) =>
            value || "-",
    },


    /* =====================================================
       DEPARTMENT
    ===================================================== */

    {
        title: "Department",

        dataIndex: "departmentId",

        key: "departmentId",

        width: 170,

        render: (
            value
        ) =>
            getDepartmentName(
                value
            ),
    },


    /* =====================================================
       DESIGNATION
    ===================================================== */

    {
        title: "Designation",

        dataIndex: "designationId",

        key: "designationId",

        width: 170,

        render: (
            value
        ) =>
            getDesignationName(
                value
            ),
    },


    /* =====================================================
       USER TYPE
    ===================================================== */

    {
        title: "User Type",

        dataIndex: "userType",

        key: "userType",

        width: 160,

        render: (
            value
        ) =>
            getUserTypeLabel(
                value
            ),
    },


    /* =====================================================
       PRIMARY ROLE
    ===================================================== */

    {
        title: "Primary Role",

        dataIndex: "primaryRoleId",

        key: "primaryRoleId",

        width: 170,

        render: (
            value
        ) =>
            getPrimaryRoleName({
                primaryRoleId:
                    value,
            }),
    },


    /* =====================================================
       ROLES
    ===================================================== */

    {
        title: "Roles",

        dataIndex: "roleIds",

        key: "roleIds",

        width: 220,

        render: (
            roleIds = []
        ) => {

            if (
                !roleIds.length
            ) {
                return (
                    <Tag>
                        No Role
                    </Tag>
                );
            }


            return (

                <Space
                    size={[
                        4,
                        4,
                    ]}
                    wrap
                >

                    {
                        roleIds
                            .slice(
                                0,
                                2
                            )
                            .map(
                                (
                                    roleId
                                ) => (

                                    <Tag
                                        key={
                                            roleId
                                        }
                                    >
                                        {
                                            getRoleDisplayText(
                                                [
                                                    roleId,
                                                ]
                                            )
                                        }
                                    </Tag>

                                )
                            )
                    }


                    {
                        roleIds.length > 2 && (

                            <Tooltip
                                title={
                                    getRoleDisplayText(
                                        roleIds
                                    )
                                }
                            >
                                <Tag>
                                    +
                                    {
                                        roleIds.length -
                                        2
                                    }
                                </Tag>
                            </Tooltip>

                        )
                    }

                </Space>

            );
        },
    },


    /* =====================================================
       LOGIN ACCESS
    ===================================================== */

    {
        title: "Login",

        dataIndex: "loginAllowed",

        key: "loginAllowed",

        width: 130,

        render: (
            value
        ) => (

            <Tag
                color={
                    getLoginAccessColor(
                        value
                    )
                }
            >
                {
                    getLoginAccessLabel(
                        value
                    )
                }
            </Tag>

        ),
    },


    /* =====================================================
       PASSWORD STATUS
    ===================================================== */

    {
        title: "Password",

        dataIndex: "passwordStatus",

        key: "passwordStatus",

        width: 150,

        render: (
            value
        ) => (

            <Tag
                color={
                    getPasswordStatusColor(
                        value
                    )
                }
            >
                {
                    getPasswordStatusLabel(
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
        title: "Status",

        dataIndex: "status",

        key: "status",

        width: 120,

        render: (
            value
        ) => (

            <Tag
                color={
                    getUserStatusColor(
                        value
                    )
                }
            >
                {
                    getUserStatusLabel(
                        value
                    )
                }
            </Tag>

        ),
    },


    /* =====================================================
       LAST LOGIN
    ===================================================== */

    {
        title: "Last Login",

        dataIndex: "lastLoginAt",

        key: "lastLoginAt",

        width: 170,

        render: (
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
                return "-";
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
        title: "Actions",

        key: "actions",

        width: 180,

        fixed: "right",

        render: (
            _,
            record
        ) => (

            <Space
                size="small"
            >

                {
                    onView && (

                        <Tooltip
                            title="View"
                        >
                            <Button
                                type="text"
                                icon={
                                    <EyeOutlined />
                                }
                                onClick={() =>
                                    onView(
                                        record
                                    )
                                }
                            />
                        </Tooltip>

                    )
                }


                {
                    onEdit && (

                        <Tooltip
                            title="Edit"
                        >
                            <Button
                                type="text"
                                icon={
                                    <EditOutlined />
                                }
                                onClick={() =>
                                    onEdit(
                                        record
                                    )
                                }
                            />
                        </Tooltip>

                    )
                }


                {
                    record.status ===
                    "ACTIVE"
                        ? (

                            onDeactivate && (

                                <Tooltip
                                    title="Deactivate"
                                >
                                    <Button
                                        type="text"
                                        danger
                                        icon={
                                            <LockOutlined />
                                        }
                                        onClick={() =>
                                            onDeactivate(
                                                record
                                            )
                                        }
                                    />
                                </Tooltip>

                            )

                        )
                        : (

                            onActivate && (

                                <Tooltip
                                    title="Activate"
                                >
                                    <Button
                                        type="text"
                                        icon={
                                            <UnlockOutlined />
                                        }
                                        onClick={() =>
                                            onActivate(
                                                record
                                            )
                                        }
                                    />
                                </Tooltip>

                            )

                        )
                }


                {
                    record.passwordStatus ===
                        "LOCKED" &&
                    onUnlock && (

                        <Tooltip
                            title="Unlock Account"
                        >
                            <Button
                                type="text"
                                icon={
                                    <UnlockOutlined />
                                }
                                onClick={() =>
                                    onUnlock(
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


export default getUserColumns;