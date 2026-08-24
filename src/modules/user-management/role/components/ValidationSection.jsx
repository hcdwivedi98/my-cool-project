// src/modules/user-management/role/components/ValidationSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Alert,
    Badge,
    Space,
    Tag,
    Typography,
} from "antd";

import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
    ROLE_SCOPES,
} from "../constants/role.constants";

import {
    isDuplicateRoleCode,
    isDuplicateRoleName,
    validateRoleScope,
} from "../utils/role.helper";

const {
    Text,
} = Typography;


/* =========================================================
   VALIDATION SECTION
   ========================================================= */

const ValidationSection = ({
    values = {},
    roles = [],
    mode = "CREATE",
}) => {

    /* =====================================================
       ROLE CODE VALIDATION
    ===================================================== */

    const roleCodeDuplicate =
        useMemo(
            () =>
                isDuplicateRoleCode(
                    roles,
                    values.roleCode,
                    mode === "EDIT"
                        ? values.id
                        : null
                ),
            [
                roles,
                values.roleCode,
                values.id,
                mode,
            ]
        );


    /* =====================================================
       ROLE NAME VALIDATION
    ===================================================== */

    const roleNameDuplicate =
        useMemo(
            () =>
                isDuplicateRoleName(
                    roles,
                    values.roleName,
                    mode === "EDIT"
                        ? values.id
                        : null
                ),
            [
                roles,
                values.roleName,
                values.id,
                mode,
            ]
        );


    /* =====================================================
       SCOPE VALIDATION
    ===================================================== */

    const scopeValidation =
        useMemo(
            () =>
                validateRoleScope(
                    values
                ),
            [
                values,
            ]
        );


    /* =====================================================
       PERMISSION VALIDATION
    ===================================================== */

    const permissionCount =
        useMemo(
            () => {

                if (
                    Array.isArray(
                        values.permissions
                    )
                ) {

                    return values.permissions.filter(
                        (
                            permission
                        ) =>
                            permission.canView ||
                            permission.canCreate ||
                            permission.canEdit ||
                            permission.canDelete ||
                            permission.canApprove ||
                            permission.canExport
                    ).length;

                }


                if (
                    Array.isArray(
                        values.permissionIds
                    )
                ) {

                    return values.permissionIds.length;

                }


                return 0;

            },
            [
                values.permissions,
                values.permissionIds,
            ]
        );


    /* =====================================================
       OVERALL VALIDATION
    ===================================================== */

    const validationItems =
        useMemo(
            () => [

                {
                    key:
                        "roleCode",

                    label:
                        "Role Code",

                    valid:
                        Boolean(
                            values.roleCode
                        ) &&
                        !roleCodeDuplicate,

                    message:
                        !values.roleCode
                            ? "Role code is required."
                            : roleCodeDuplicate
                                ? "Role code already exists."
                                : "Role code is available.",
                },

                {
                    key:
                        "roleName",

                    label:
                        "Role Name",

                    valid:
                        Boolean(
                            values.roleName
                        ) &&
                        !roleNameDuplicate,

                    message:
                        !values.roleName
                            ? "Role name is required."
                            : roleNameDuplicate
                                ? "Role name already exists."
                                : "Role name is available.",
                },

                {
                    key:
                        "scope",

                    label:
                        "Role Scope",

                    valid:
                        scopeValidation.valid,

                    message:
                        scopeValidation.valid
                            ? "Scope configuration is valid."
                            : scopeValidation.message,
                },

                {
                    key:
                        "permissions",

                    label:
                        "Permissions",

                    valid:
                        permissionCount > 0,

                    message:
                        permissionCount > 0
                            ? `${permissionCount} permission(s) assigned.`
                            : "At least one permission is required.",
                },

            ],
            [
                values.roleCode,
                values.roleName,
                roleCodeDuplicate,
                roleNameDuplicate,
                scopeValidation,
                permissionCount,
            ]
        );


    const hasErrors =
        validationItems.some(
            (
                item
            ) =>
                !item.valid
        );


    const allValid =
        !hasErrors &&
        validationItems.length > 0;


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="role-form-section role-validation-section"
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
                    Validation
                </div>

                <div
                    className="role-section-description"
                >
                    Review the role configuration before saving.
                </div>

            </div>


            {/* =================================================
                OVERALL STATUS
            ================================================= */}

            <div
                className="role-validation-overall"
            >

                <Space
                    size={12}
                >

                    {
                        allValid ? (

                            <CheckCircleOutlined
                                style={{
                                    color:
                                        "#52c41a",

                                    fontSize:
                                        20,
                                }}
                            />

                        ) : (

                            <ExclamationCircleOutlined
                                style={{
                                    color:
                                        "#faad14",

                                    fontSize:
                                        20,
                                }}
                            />

                        )
                    }


                    <div>

                        <Text
                            strong
                        >
                            {
                                allValid
                                    ? "Role configuration is valid"
                                    : "Role configuration needs attention"
                            }
                        </Text>

                        <div>

                            <Text
                                type="secondary"
                            >
                                {
                                    allValid
                                        ? "The role is ready to be saved."
                                        : "Please resolve the validation issues below."
                                }
                            </Text>

                        </div>

                    </div>

                </Space>


                <Tag
                    color={
                        allValid
                            ? "success"
                            : "warning"
                    }
                >
                    {
                        allValid
                            ? "VALID"
                            : "REVIEW"
                    }
                </Tag>

            </div>


            {/* =================================================
                VALIDATION ITEMS
            ================================================= */}

            <div
                className="role-validation-list"
            >

                {
                    validationItems.map(
                        (
                            item
                        ) => (

                            <div
                                key={
                                    item.key
                                }

                                className="role-validation-card"
                            >

                                <div
                                    className="role-validation-card-header"
                                >

                                    <Text
                                        strong
                                    >
                                        {
                                            item.label
                                        }
                                    </Text>


                                    <Badge
                                        status={
                                            item.valid
                                                ? "success"
                                                : "error"
                                        }

                                        text={
                                            item.valid
                                                ? "Valid"
                                                : "Invalid"
                                        }
                                    />

                                </div>


                                <div
                                    className={
                                        item.valid
                                            ? "role-validation-message role-validation-success"
                                            : "role-validation-message role-validation-error"
                                    }
                                >
                                    {
                                        item.message
                                    }
                                </div>

                            </div>

                        )
                    )
                }

            </div>


            {/* =================================================
                WARNING
            ================================================= */}

            {
                hasErrors && (

                    <Alert
                        className="role-validation-alert"

                        type="warning"

                        showIcon

                        message="Please resolve validation issues before submitting the role."

                    />

                )
            }

        </section>

    );

};


export default ValidationSection;