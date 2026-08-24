// src/modules/user-management/permission/components/PermissionForm.jsx

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

import BasicSection from "./BasicSection";
import AccessSection from "./AccessSection";
import ValidationSection from "./ValidationSection";
import AuditSection from "./AuditSection";

import {
    permissionList,
} from "../mock/permission.mock";

import {
    createEmptyPermission,
    preparePermissionFormValues,
    preparePermissionPayload,
} from "../utils/permission.helper";


/* =========================================================
   PERMISSION FORM
   ========================================================= */

const PermissionForm = ({
    mode = "CREATE",
    initialValues = null,
    disabled = false,
    loading = false,
    error = null,
    onSubmit,
    onCancel,
}) => {

    const [form] =
        Form.useForm();


    /* =====================================================
       MODE
    ===================================================== */

    const isCreateMode =
        mode === "CREATE";


    const isEditMode =
        mode === "EDIT";


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       LOCAL VALIDATION STATE
    ===================================================== */

    const [
        submitAttempted,
        setSubmitAttempted,
    ] =
        useState(false);


    /* =====================================================
       FORM INITIAL VALUES
    ===================================================== */

    const formValues =
        useMemo(
            () => {

                if (
                    initialValues
                ) {

                    return preparePermissionFormValues(
                        initialValues
                    );

                }


                return createEmptyPermission();

            },
            [
                initialValues,
            ]
        );


    /* =====================================================
       SET FORM VALUES
    ===================================================== */

    useEffect(
        () => {

            form.setFieldsValue(
                formValues
            );

            setSubmitAttempted(
                false
            );

        },
        [
            form,
            formValues,
        ]
    );


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleFinish = async (
        values
    ) => {

        setSubmitAttempted(
            true
        );


        const payload =
            preparePermissionPayload(
                values
            );


        if (
            typeof onSubmit ===
            "function"
        ) {

            await onSubmit(
                payload
            );

        }

    };


    /* =====================================================
       FAILED SUBMIT
    ===================================================== */

    const handleFinishFailed = () => {

        setSubmitAttempted(
            true
        );

    };


    /* =====================================================
       CANCEL
    ===================================================== */

    const handleCancel = () => {

        if (
            typeof onCancel ===
            "function"
        ) {

            onCancel();

        }

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="permission-form"
        >

            {/* =================================================
                FORM ERROR
            ================================================= */}

            {
                error && (

                    <Alert
                        className="permission-form-error"
                        type="error"
                        showIcon
                        message={
                            error
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
                    formValues
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

                scrollToFirstError={{
                    behavior:
                        "smooth",

                    block:
                        "center",
                }}

            >

                {/* =================================================
                    BASIC
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
                    ACCESS
                ================================================= */}

                <AccessSection
                    mode={
                        mode
                    }
                    disabled={
                        isViewMode
                    }
                />


                {/* =================================================
                    VALIDATION
                ================================================= */}

                {
                    (
                        isCreateMode ||
                        isEditMode ||
                        isViewMode
                    ) && (

                        <ValidationSection
                            mode={
                                mode
                            }
                            disabled={
                                isViewMode
                            }
                            existingPermissions={
                                permissionList
                            }
                        />

                    )
                }


                {/* =================================================
                    AUDIT
                ================================================= */}

                <AuditSection
                    mode={
                        mode
                    }
                    disabled={
                        isViewMode
                    }
                    permission={
                        initialValues
                    }
                />


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="permission-form-actions"
                >

                    <Space>

                        {/* =========================================
                            CANCEL
                        ========================================= */}

                        <Button
                            icon={
                                <CloseOutlined />
                            }
                            onClick={
                                handleCancel
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
                            SAVE
                        ========================================= */}

                        {
                            !isViewMode && (

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={
                                        <SaveOutlined />
                                    }
                                    loading={
                                        loading
                                    }
                                >
                                    {
                                        isEditMode
                                            ? "Update Permission"
                                            : "Create Permission"
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


export default PermissionForm;