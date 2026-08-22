// src/modules/pharmacy/dosage-form/components/DosageFormForm.jsx

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Alert,
    Button,
    Divider,
    Form,
    Space,
} from "antd";

import {
    CloseOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import BasicSection
    from "./sections/BasicSection";

import ClassificationSection
    from "./sections/ClassificationSection";

import ValidationSection
    from "./sections/ValidationSection";

import AuditSection
    from "./sections/AuditSection";

import {
    DOSAGE_FORM_FORM_MODES,
} from "../constants/dosageForm.constants";

import {
    dosageFormList,
} from "../mock/dosageForm.mock";

import {
    prepareDosageFormFormValues,
    prepareDosageFormPayload,
    validateDosageForm,
} from "../utils/dosageForm.helper";


/*
 * =========================================================
 * FORM
 * =========================================================
 */

const DosageFormForm = forwardRef(
    (
        {
            mode =
                DOSAGE_FORM_FORM_MODES.CREATE,

            record = null,

            loading = false,

            onSubmit,

            onCancel,

        },
        ref
    ) => {

        /*
         * =====================================================
         * ANT DESIGN FORM
         * =====================================================
         */

        const [
            form,
        ] =
            Form.useForm();


        /*
         * =====================================================
         * DIRTY STATE
         * =====================================================
         */

        const [
            isDirty,
            setIsDirty,
        ] = useState(false);


        /*
         * =====================================================
         * INITIAL VALUES
         * =====================================================
         */

        const initialValuesRef =
            useRef(null);


        /*
         * =====================================================
         * VIEW MODE
         * =====================================================
         */

        const isViewMode =
            mode ===
            DOSAGE_FORM_FORM_MODES.VIEW;


        /*
         * =====================================================
         * EDIT MODE
         * =====================================================
         */

        const isEditMode =
            mode ===
            DOSAGE_FORM_FORM_MODES.EDIT;


        /*
         * =====================================================
         * CREATE MODE
         * =====================================================
         */

        const isCreateMode =
            mode ===
            DOSAGE_FORM_FORM_MODES.CREATE;


        /*
         * =====================================================
         * FORM VALUES
         * =====================================================
         */

        const initialValues =
            useMemo(
                () =>
                    prepareDosageFormFormValues(
                        record
                    ),
                [
                    record,
                ]
            );


        /*
         * =====================================================
         * LOAD FORM DATA
         * =====================================================
         */

        useEffect(
            () => {

                form.resetFields();

                form.setFieldsValue(
                    initialValues
                );

                initialValuesRef.current =
                    JSON.stringify(
                        initialValues
                    );

                setIsDirty(
                    false
                );

            },
            [
                form,
                initialValues,
                mode,
            ]
        );


        /*
         * =====================================================
         * DIRTY STATE CHECK
         * =====================================================
         */

        const handleValuesChange = (
            _changedValues,
            allValues
        ) => {

            if (
                isViewMode
            ) {
                return;
            }


            const currentValues =
                JSON.stringify(
                    allValues
                );


            const originalValues =
                initialValuesRef.current;


            setIsDirty(
                currentValues !==
                originalValues
            );
        };


        /*
         * =====================================================
         * VALIDATE FORM
         * =====================================================
         */

        const validateBusinessRules =
            async () => {

                const values =
                    await form.validateFields();


                const errors =
                    validateDosageForm(
                        values,

                        dosageFormList,

                        isEditMode
                            ? record?.id
                            : null
                    );


                if (
                    Object.keys(
                        errors
                    ).length
                ) {

                    const fieldErrors =
                        Object.entries(
                            errors
                        ).map(
                            ([
                                name,
                                errorsList,
                            ]) => ({
                                name,

                                errors: [
                                    errorsList,
                                ],
                            })
                        );


                    form.setFields(
                        fieldErrors
                    );


                    throw new Error(
                        "Please correct the highlighted fields."
                    );
                }


                return values;
            };


        /*
         * =====================================================
         * SUBMIT
         * ===================================================== */

        const handleSubmit =
            async () => {

                if (
                    isViewMode
                ) {
                    return;
                }


                try {

                    const values =
                        await validateBusinessRules();


                    const payload =
                        prepareDosageFormPayload(
                            values
                        );


                    if (
                        typeof onSubmit ===
                        "function"
                    ) {

                        await onSubmit(
                            payload,

                            {
                                mode,

                                record,

                                values,
                            }
                        );
                    }


                    /*
                     * Submission successful.
                     */

                    setIsDirty(
                        false
                    );

                }
                catch (
                    error
                ) {

                    /*
                     * If parent/service throws an error,
                     * keep the form open and allow correction.
                     */

                    throw error;
                }
            };


        /*
         * =====================================================
         * EXPOSE FORM METHODS TO PARENT
         * =====================================================
         */

        useImperativeHandle(
            ref,
            () => ({

                submit:
                    handleSubmit,

                validate:
                    validateBusinessRules,

                reset: () => {

                    form.resetFields();

                    form.setFieldsValue(
                        initialValues
                    );

                    setIsDirty(
                        false
                    );
                },

                isDirty: () =>
                    isDirty,

                getValues: () =>
                    form.getFieldsValue(
                        true
                    ),

            }),
            [
                form,
                initialValues,
                isDirty,
                mode,
                record,
            ]
        );


        /*
         * =====================================================
         * CANCEL
         * ===================================================== */

        const handleCancel = () => {

            if (
                typeof onCancel ===
                "function"
            ) {

                onCancel({
                    isDirty,
                    mode,
                    record,
                });
            }
        };


        /*
         * =====================================================
         * DRUG COUNT
         * =====================================================
         */

        const drugCount =
            Number(
                record?.drugCount
            ) || 0;


        /*
         * =====================================================
         * RENDER
         * =====================================================
         */

        return (
            <div className="dosage-form-form">

                {/* =================================================
                    VIEW MODE NOTICE
                ================================================= */}

                {isViewMode && (

                    <Alert
                        type="info"
                        showIcon
                        message="View Mode"
                        description="This dosage form is displayed in read-only mode."
                        style={{
                            marginBottom:
                                16,
                        }}
                    />

                )}


                {/* =================================================
                    EDIT MODE NOTICE
                ================================================= */}

                {isEditMode &&
                    drugCount > 0 && (

                    <Alert
                        type="warning"
                        showIcon
                        message="Dosage form is currently in use"
                        description={
                            `This dosage form is mapped to ${drugCount} drug${drugCount === 1 ? "" : "s"}. Changes should not invalidate existing drug mappings.`
                        }
                        style={{
                            marginBottom:
                                16,
                        }}
                    />

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <Form
                    form={
                        form
                    }

                    layout="vertical"

                    requiredMark={
                        "optional"
                    }

                    onValuesChange={
                        handleValuesChange
                    }

                    onFinish={
                        handleSubmit
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
                        disabled={
                            isViewMode
                        }
                    />


                    {/* =================================================
                        CLASSIFICATION
                    ================================================= */}

                    <ClassificationSection
                        disabled={
                            isViewMode
                        }
                    />


                    {/* =================================================
                        VALIDATION
                    ================================================= */}

                    <ValidationSection
                        disabled={
                            isViewMode
                        }

                        drugCount={
                            drugCount
                        }
                    />


                    {/* =================================================
                        AUDIT
                    ================================================= */}

                    <AuditSection
                        record={
                            record
                        }
                    />


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <Divider
                        style={{
                            margin:
                                "8px 0 16px",
                        }}
                    />


                    <div className="dosage-form-form-footer">

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

                            {!isViewMode && (

                                <Button
                                    type="primary"

                                    icon={
                                        <SaveOutlined />
                                    }

                                    loading={
                                        loading
                                    }

                                    htmlType="submit"
                                >
                                    {
                                        isEditMode
                                            ? "Update Dosage Form"
                                            : "Save Dosage Form"
                                    }
                                </Button>

                            )}

                        </Space>

                    </div>

                </Form>

            </div>
        );
    }
);


DosageFormForm.displayName =
    "DosageFormForm";


export default DosageFormForm;