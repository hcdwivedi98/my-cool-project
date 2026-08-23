/* =========================================================
   DRUG UNIT FORM
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
    DRUG_UNIT_DEFAULT_VALUES,
    DRUG_UNIT_FORM_MODES,
} from "../constants/drugUnit.constants";


import {
    normalizeDrugUnitFormValues,
    prepareDrugUnitPayload,
} from "../utils/drugUnit.helper";


import BasicSection
    from "./sections/BasicSection";


import ClassificationSection
    from "./sections/ClassificationSection";


import ValidationSection
    from "./sections/ValidationSection";


import AuditSection
    from "./sections/AuditSection";


/* =========================================================
   COMPONENT
   ========================================================= */

const DrugUnitForm = ({
    mode =
        DRUG_UNIT_FORM_MODES.CREATE,

    record = null,

    loading = false,

    onSubmit,

    onCancel,

    onDirtyChange,

    submitText,

}) => {

    /* =====================================================
       FORM INSTANCE
       ===================================================== */

    const [
        form
    ] = Form.useForm();


    /* =====================================================
       ERROR
       ===================================================== */

    const [
        submitError,
        setSubmitError,
    ] = useState(null);


    /* =====================================================
       DIRTY STATE
       ===================================================== */

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);


    /* =====================================================
       MODE FLAGS
       ===================================================== */

    const isCreateMode =
        mode ===
        DRUG_UNIT_FORM_MODES.CREATE;


    const isEditMode =
        mode ===
        DRUG_UNIT_FORM_MODES.EDIT;


    const isViewMode =
        mode ===
        DRUG_UNIT_FORM_MODES.VIEW;


    const isReadOnly =
        isViewMode;


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

                        ...DRUG_UNIT_DEFAULT_VALUES,

                        ...record,

                    };
                }


                return {
                    ...DRUG_UNIT_DEFAULT_VALUES,
                };

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

            const normalizedValues =
                normalizeDrugUnitFormValues(
                    initialValues
                );


            form.setFieldsValue(
                normalizedValues
            );


            setSubmitError(
                null
            );


            setDirtyState(
                false
            );

        },
        [
            form,
            initialValues,
        ]
    );


    /* =====================================================
       DIRTY STATE HANDLER
       ===================================================== */

    const setDirtyState = (
        value
    ) => {

        setIsDirty(
            value
        );


        onDirtyChange?.(
            value
        );
    };


    /* =====================================================
       FORM CHANGE
       ===================================================== */

    const handleValuesChange = () => {

        if (
            isViewMode
        ) {
            return;
        }


        setDirtyState(
            true
        );


        if (
            submitError
        ) {

            setSubmitError(
                null
            );
        }
    };


    /* =====================================================
       SUBMIT
       ===================================================== */

    const handleFinish = async (
        values
    ) => {

        if (
            isViewMode
        ) {
            return;
        }


        setSubmitError(
            null
        );


        try {

            const payload =
                prepareDrugUnitPayload(
                    values
                );


            const context = {

                mode,

                id:
                    record?.id ||
                    null,

            };


            const result =
                await onSubmit?.(
                    payload,
                    context
                );


            /*
             * Submit successful
             */

            if (
                result !== false
            ) {

                setDirtyState(
                    false
                );
            }


            return result;

        }
        catch (
            error
        ) {

            const message =
                error?.message ||
                "Unable to save drug unit.";


            setSubmitError(
                message
            );


            throw error;
        }
    };


    /* =====================================================
       VALIDATION FAILED
       ===================================================== */

    const handleFinishFailed = (
        errorInfo
    ) => {

        const errorCount =
            errorInfo
                ?.errorFields
                ?.length || 0;


        if (
            errorCount > 0
        ) {

            setSubmitError(
                "Please correct the highlighted fields before saving."
            );
        }
    };


    /* =====================================================
       CANCEL
       ===================================================== */

    const handleCancel = () => {

        onCancel?.(
            {
                isDirty,

                mode,

                record,
            }
        );
    };


    /* =====================================================
       SUBMIT BUTTON TEXT
       ===================================================== */

    const resolvedSubmitText =
        submitText ||
        (
            isCreateMode
                ? "Create Drug Unit"
                : "Save Changes"
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div
            className="drug-unit-form"
        >

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div
                className="drug-unit-form-header"
            >

                <div>

                    <div
                        className="drug-unit-form-title"
                    >

                        {
                            isCreateMode
                                ? "Create Drug Unit"
                                : isEditMode
                                    ? "Edit Drug Unit"
                                    : "Drug Unit Details"

                        }

                    </div>


                    <div
                        className="drug-unit-form-subtitle"
                    >

                        {
                            isCreateMode
                                ? "Create a standard unit for use across pharmacy drug masters."
                                : isEditMode
                                    ? "Update the drug unit master information."
                                    : "Review drug unit master information and audit details."
                        }

                    </div>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                submitError && (

                    <Alert
                        type="error"
                        showIcon
                        closable
                        className="drug-unit-form-error"
                        message={
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

                disabled={
                    loading ||
                    isReadOnly
                }

                onValuesChange={
                    handleValuesChange
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

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    disabled={
                        loading
                    }

                />


                {/* =================================================
                    CLASSIFICATION
                ================================================= */}

                <ClassificationSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    disabled={
                        loading
                    }

                />


                {/* =================================================
                    VALIDATION
                ================================================= */}

                <ValidationSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    record={
                        record
                    }

                    disabled={
                        loading
                    }

                />


                {/* =================================================
                    AUDIT
                ================================================= */}

                <AuditSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    record={
                        record
                    }

                />


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div
                    className="drug-unit-form-actions"
                >

                    <Space>

                        {/* =====================================
                            CANCEL
                        ====================================== */}

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


                        {/* =====================================
                            SAVE
                        ====================================== */}

                        {
                            !isViewMode && (

                                <Button

                                    type="primary"

                                    htmlType="submit"

                                    loading={
                                        loading
                                    }

                                    icon={
                                        <SaveOutlined />
                                    }

                                >

                                    {
                                        resolvedSubmitText
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


export default DrugUnitForm;