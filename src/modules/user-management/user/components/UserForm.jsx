/* =========================================================
   USER FORM
   ========================================================= */

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Alert,
    Button,
    Form,
    Space,
} from "antd";

import {
    SaveOutlined,
    CloseOutlined,
} from "@ant-design/icons";

import {
    USER_DEFAULTS,
    USER_FORM_MODES,
    USER_STATUS,
} from "../constants/user.constants";

import {
    generateUserCode,
    normalizeUserPayload,
} from "../utils/user.helper";

import {
    userList,
} from "../mock/user.mock";

import BasicSection
    from "./sections/BasicSection";

import EmploymentSection
    from "./sections/EmploymentSection";

import AccessSection
    from "./sections/AccessSection";

import SecuritySection
    from "./sections/SecuritySection";

import ValidationSection
    from "./sections/ValidationSection";

import AuditSection
    from "./sections/AuditSection";


/* =========================================================
   COMPONENT
   ========================================================= */

const UserForm = ({
    mode = USER_FORM_MODES.CREATE,

    record = null,

    loading = false,

    error = null,

    onSubmit,

    onClose,

    onSuccess,
}) => {

    const [
        form
    ] = Form.useForm();


    const [
        submitError,
        setSubmitError,
    ] = useState(
        null
    );


    const [
        submitting,
        setSubmitting,
    ] = useState(
        false
    );


    /* =====================================================
       MODE FLAGS
    ===================================================== */

    const isCreateMode =
        mode ===
        USER_FORM_MODES.CREATE;


    const isEditMode =
        mode ===
        USER_FORM_MODES.EDIT;


    const isViewMode =
        mode ===
        USER_FORM_MODES.VIEW;


    const isSubmitting =
        loading ||
        submitting;


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

                        ...record,

                        roleIds:
                            Array.isArray(
                                record.roleIds
                            )
                                ? record.roleIds
                                : [],

                        status:
                            record.status ||
                            USER_STATUS.ACTIVE,

                        loginAllowed:
                            record.loginAllowed !==
                            false,

                        mustChangePassword:
                            record.mustChangePassword ===
                            true,

                    };

                }


                return {

                    ...USER_DEFAULTS,

                    userCode:
                        generateUserCode(
                            userList
                        ),

                    username:
                        "",

                    employeeId:
                        "",

                    firstName:
                        "",

                    middleName:
                        "",

                    lastName:
                        "",

                    displayName:
                        "",

                    email:
                        "",

                    mobileNumber:
                        "",

                    alternateMobileNumber:
                        "",

                    userType:
                        USER_DEFAULTS.userType,

                    departmentId:
                        undefined,

                    designationId:
                        undefined,

                    roleIds:
                        [],

                    primaryRoleId:
                        undefined,

                    status:
                        USER_DEFAULTS.status,

                    loginAllowed:
                        USER_DEFAULTS.loginAllowed,

                    passwordStatus:
                        USER_DEFAULTS.passwordStatus,

                    mustChangePassword:
                        USER_DEFAULTS.mustChangePassword,

                    failedLoginCount:
                        USER_DEFAULTS.failedLoginCount,

                    lastLoginAt:
                        null,

                    lastPasswordChangedAt:
                        null,

                    accountLockedUntil:
                        null,

                };

            },
            [
                record,
            ]
        );


    /* =====================================================
       RESET FORM WHEN RECORD / MODE CHANGES
    ===================================================== */

    useEffect(
        () => {

            form.resetFields();

            form.setFieldsValue(
                initialValues
            );

            setSubmitError(
                null
            );

        },
        [
            form,
            initialValues,
            mode,
        ]
    );


    /* =====================================================
       DISPLAY NAME
    ===================================================== */

    const handleNameChange =
        () => {

            const values =
                form.getFieldsValue([
                    "firstName",
                    "middleName",
                    "lastName",
                ]);


            const displayName =
                [
                    values.firstName,
                    values.middleName,
                    values.lastName,
                ]
                    .filter(
                        Boolean
                    )
                    .join(" ");


            form.setFieldValue(
                "displayName",
                displayName
            );

        };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleFinish =
        async (
            values
        ) => {

            if (
                isViewMode
            ) {
                return;
            }


            try {

                setSubmitting(
                    true
                );

                setSubmitError(
                    null
                );


                /*
                 * Normalize frontend form
                 * values before sending.
                 */

                const payload =
                    normalizeUserPayload(
                        values
                    );


                /*
                 * Make sure display name
                 * is always available.
                 */

                if (
                    !payload.displayName
                ) {

                    payload.displayName =
                        [
                            payload.firstName,
                            payload.middleName,
                            payload.lastName,
                        ]
                            .filter(
                                Boolean
                            )
                            .join(" ");

                }


                /*
                 * CREATE
                 */

                if (
                    isCreateMode
                ) {

                    const result =
                        await onSubmit?.(
                            payload,
                            {
                                mode:
                                    USER_FORM_MODES.CREATE,

                                id:
                                    null,

                                record:
                                    null,
                            }
                        );


                    await onSuccess?.(
                        result
                    );


                    return;
                }


                /*
                 * EDIT
                 */

                if (
                    isEditMode
                ) {

                    const result =
                        await onSubmit?.(
                            payload,
                            {
                                mode:
                                    USER_FORM_MODES.EDIT,

                                id:
                                    record?.id,

                                record,
                            }
                        );


                    await onSuccess?.(
                        result
                    );


                    return;
                }

            }
            catch (
                caughtError
            ) {

                const message =
                    caughtError?.message ||
                    "Unable to save user.";


                setSubmitError(
                    message
                );

            }
            finally {

                setSubmitting(
                    false
                );

            }

        };


    /* =====================================================
       VALIDATION FAILED
    ===================================================== */

    const handleFinishFailed =
        ({
            errorFields,
        }) => {

            if (
                errorFields?.length
            ) {

                setSubmitError(
                    "Please correct the highlighted fields before saving."
                );

            }

        };


    /* =====================================================
       CLOSE
    ===================================================== */

    const handleClose =
        () => {

            if (
                isSubmitting
            ) {
                return;
            }


            onClose?.();

        };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="user-form"
        >

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div
                className="user-form-header"
            >

                <div>

                    <div
                        className="user-form-title"
                    >
                        {
                            isCreateMode
                                ? "Create User"
                                : isEditMode
                                    ? "Edit User"
                                    : "View User"
                        }
                    </div>


                    <div
                        className="user-form-subtitle"
                    >
                        {
                            isCreateMode
                                ? "Create a new hospital system user."
                                : isEditMode
                                    ? "Update user profile, employment and access information."
                                    : "View user profile, employment, access and security information."
                        }
                    </div>

                </div>

            </div>


            {/* =================================================
                GENERAL ERROR
            ================================================= */}

            {
                (
                    error ||
                    submitError
                ) && (

                    <Alert
                        className="user-form-error"

                        type="error"

                        showIcon

                        closable

                        message={
                            error ||
                            submitError
                        }

                        onClose={() =>
                            setSubmitError(
                                null
                            )
                        }

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

                onFinish={
                    handleFinish
                }

                onFinishFailed={
                    handleFinishFailed
                }

                disabled={
                    isViewMode ||
                    isSubmitting
                }

                requiredMark="optional"

                scrollToFirstError

                onValuesChange={(
                    changedValues
                ) => {

                    if (
                        changedValues.firstName !==
                            undefined ||
                        changedValues.middleName !==
                            undefined ||
                        changedValues.lastName !==
                            undefined
                    ) {

                        handleNameChange();

                    }

                }}

            >

                {/* =================================================
                    BASIC
                ================================================= */}

                <BasicSection
                    mode={
                        mode
                    }
                />


                {/* =================================================
                    EMPLOYMENT
                ================================================= */}

                <EmploymentSection
                    mode={
                        mode
                    }
                />


                {/* =================================================
                    ACCESS
                ================================================= */}

                <AccessSection
                    mode={
                        mode
                    }
                />


                {/* =================================================
                    SECURITY
                ================================================= */}

                <SecuritySection
                    mode={
                        mode
                    }

                    record={
                        record
                    }
                />


                {/* =================================================
                    VALIDATION
                ================================================= */}

                <ValidationSection
                    mode={
                        mode
                    }

                    record={
                        record
                    }
                />


                {/* =================================================
                    AUDIT
                ================================================= */}

                <AuditSection
                    mode={
                        mode
                    }

                    record={
                        record
                    }
                />


                {/* =================================================
                    FORM ACTIONS
                ================================================= */}

                <div
                    className="user-form-actions"
                >

                    <Space>

                        {/* =========================================
                            CANCEL / CLOSE
                        ========================================== */}

                        <Button
                            icon={
                                <CloseOutlined />
                            }

                            onClick={
                                handleClose
                            }

                            disabled={
                                isSubmitting
                            }
                        >
                            {
                                isViewMode
                                    ? "Close"
                                    : "Cancel"
                            }
                        </Button>


                        {/* =========================================
                            SAVE
                        ========================================== */}

                        {
                            !isViewMode && (

                                <Button
                                    type="primary"

                                    htmlType="submit"

                                    icon={
                                        <SaveOutlined />
                                    }

                                    loading={
                                        isSubmitting
                                    }
                                >
                                    {
                                        isCreateMode
                                            ? "Create User"
                                            : "Save Changes"
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


export default UserForm;