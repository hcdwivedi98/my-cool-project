// src/modules/user-management/role/components/RoleForm.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Alert,
    Button,
    Form,
    Space,
} from "antd";

import BasicSection
    from "./BasicSection";

import PermissionSection
    from "./PermissionSection";

import ValidationSection
    from "./ValidationSection";

import AuditSection
    from "./AuditSection";

import {
    ROLE_STATUS,
    ROLE_TYPES,
    ROLE_SCOPES,
} from "../constants/role.constants";

import {
    createEmptyRole,
    prepareRolePayload,
} from "../utils/role.helper";


/* =========================================================
   ROLE FORM
   ========================================================= */

const RoleForm = ({
    mode = "CREATE",

    record = null,

    roles = [],

    permissions = [],

    loading = false,

    error = null,

    onSubmit,

    onCancel,

}) => {

    const [
        form,
    ] = Form.useForm();


    /* =====================================================
       MODE
    ===================================================== */

    const isViewMode =
        mode === "VIEW";


    const isEditMode =
        mode === "EDIT";


    const isCreateMode =
        mode === "CREATE";


    /* =====================================================
       INITIAL VALUES
    ===================================================== */

    const initialValues =
        useMemo(
            () => {

                if (
                    record
                ) {

                    return {

                        ...createEmptyRole(),

                        ...record,

                        permissions:
                            Array.isArray(
                                record.permissions
                            )
                                ? record.permissions
                                : [],

                        permissionIds:
                            Array.isArray(
                                record.permissionIds
                            )
                                ? record.permissionIds
                                : [],

                    };

                }


                return createEmptyRole();

            },
            [
                record,
            ]
        );


    /* =====================================================
       SET FORM VALUES
    ===================================================== */

    useEffect(
        () => {

            form.setFieldsValue(
                initialValues
            );

        },
        [
            form,
            initialValues,
        ]
    );


    /* =====================================================
       WATCH FORM VALUES
    ===================================================== */

    const values =
        Form.useWatch(
            [],
            form
        ) || {};


    /* =====================================================
       FORM TITLE
    ===================================================== */

    const formTitle =
        isCreateMode
            ? "Create Role"
            : isEditMode
                ? "Edit Role"
                : "View Role";


    const formSubtitle =
        isCreateMode
            ? "Create a new application role and assign permissions."
            : isEditMode
                ? "Update role information and permissions."
                : "View role configuration and audit information.";


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleFinish =
        async (
            formValues
        ) => {

            if (
                isViewMode
            ) {

                return;

            }


            const payload =
                prepareRolePayload(
                    formValues
                );


            if (
                typeof onSubmit !==
                "function"
            ) {

                return;

            }


            await onSubmit(
                payload,
                {
                    mode,

                    id:
                        record?.id ||
                        null,
                }
            );

        };


    /* =====================================================
       VALIDATION FAILED
    ===================================================== */

    const handleFinishFailed =
        ({
            errorFields,
        }) => {

            if (
                !errorFields?.length
            ) {

                return;

            }


            form.scrollToField(
                errorFields[0].name,
                {
                    behavior:
                        "smooth",

                    block:
                        "center",
                }
            );

        };


    /* =====================================================
       RESET
    ===================================================== */

    const handleReset =
        () => {

            if (
                isCreateMode
            ) {

                form.resetFields();

                form.setFieldsValue(
                    createEmptyRole()
                );

                return;

            }


            form.setFieldsValue(
                initialValues
            );

        };


    /* =====================================================
       VALIDATION STATUS
    ===================================================== */

    const permissionCount =
        Array.isArray(
            values.permissions
        )
            ? values.permissions.filter(
                (
                    permission
                ) =>
                    permission.canView ||
                    permission.canCreate ||
                    permission.canEdit ||
                    permission.canDelete ||
                    permission.canApprove ||
                    permission.canExport
            ).length
            : Array.isArray(
                values.permissionIds
            )
                ? values.permissionIds.length
                : 0;


    const hasPermission =
        permissionCount > 0;


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="role-form"
        >

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div
                className="role-form-header"
            >

                <div>

                    <div
                        className="role-form-title"
                    >
                        {
                            formTitle
                        }
                    </div>


                    <div
                        className="role-form-subtitle"
                    >
                        {
                            formSubtitle
                        }
                    </div>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                error && (

                    <Alert
                        className="role-form-error"

                        type="error"

                        showIcon

                        message={
                            error
                        }

                        closable
                    />

                )
            }


            {/* =================================================
                FORM
            ================================================= */}

            <Form

                form={
                    form
                }

                layout="vertical"

                initialValues={
                    initialValues
                }

                disabled={
                    isViewMode
                }

                onFinish={
                    handleFinish
                }

                onFinishFailed={
                    handleFinishFailed
                }

                requiredMark={
                    !isViewMode
                }

                scrollToFirstError

            >

                {/* =================================================
                    BASIC SECTION
                ================================================= */}

                <BasicSection

                    mode={
                        mode
                    }

                    disabled={
                        isViewMode
                    }

                />


                {/* =================================================
                    PERMISSION SECTION
                ================================================= */}

                <PermissionSection

                    mode={
                        mode
                    }

                    disabled={
                        isViewMode
                    }

                    permissions={
                        permissions
                    }

                />


                {/* =================================================
                    VALIDATION SECTION
                ================================================= */}

                <ValidationSection

                    values={
                        values
                    }

                    roles={
                        roles
                    }

                    mode={
                        mode
                    }

                />


                {/* =================================================
                    AUDIT SECTION
                ================================================= */}

                {
                    !isCreateMode && (

                        <AuditSection

                            record={
                                record
                            }

                            mode={
                                mode
                            }

                        />

                    )
                }


                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div
                    className="role-form-actions"
                >

                    <Space
                        size="middle"
                    >

                        {/* =========================================
                            CANCEL
                        ========================================== */}

                        <Button
                            onClick={
                                onCancel
                            }

                            disabled={
                                loading
                            }
                        >
                            {
                                isViewMode
                                    ? "Close"
                                    : "Cancel"
                            }
                        </Button>


                        {/* =========================================
                            RESET
                        ========================================== */}

                        {
                            !isViewMode && (

                                <Button
                                    onClick={
                                        handleReset
                                    }

                                    disabled={
                                        loading
                                    }
                                >
                                    Reset
                                </Button>

                            )
                        }


                        {/* =========================================
                            SAVE
                        ========================================== */}

                        {
                            !isViewMode && (

                                <Button
                                    type="primary"

                                    htmlType="submit"

                                    loading={
                                        loading
                                    }

                                    disabled={
                                        loading ||
                                        !hasPermission
                                    }
                                >
                                    {
                                        isEditMode
                                            ? "Update Role"
                                            : "Create Role"
                                    }
                                </Button>

                            )
                        }

                    </Space>

                </div>

            </Form>

        </div>

    );

};


export default RoleForm;