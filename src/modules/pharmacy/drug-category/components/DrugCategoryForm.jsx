// src/modules/pharmacy/drug-category/components/DrugCategoryForm.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Button,
    Form,
    Space,
} from "antd";

import {
    CloseOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import BasicSection from "./sections/BasicSection";
import ClassificationSection from "./sections/ClassificationSection";
import ValidationSection from "./sections/ValidationSection";
import AuditSection from "./sections/AuditSection";

import {
    DEFAULT_DRUG_CATEGORY_VALUES,
} from "../constants/drugCategory.constants";

import {
    drugCategoryList,
} from "../mock/drugCategory.mock";

import {
    prepareDrugCategoryFormValues,
    prepareDrugCategoryPayload,
    validateDrugCategory,
} from "../utils/drugCategory.helper";

import "../styles/drugCategory.css";


/*
 * =========================================================
 * FORM MODES
 * =========================================================
 */

export const DRUG_CATEGORY_FORM_MODES = {
    CREATE: "create",
    EDIT: "edit",
    VIEW: "view",
};


/*
 * =========================================================
 * DRUG CATEGORY FORM
 * =========================================================
 */

const DrugCategoryForm = ({
    mode = DRUG_CATEGORY_FORM_MODES.CREATE,

    record = null,

    onSubmit,

    onCancel,

    loading = false,
}) => {

    const [form] = Form.useForm();

    const [isDirty, setIsDirty] =
        useState(false);

    const [submitError, setSubmitError] =
        useState("");


    /*
     * =====================================================
     * MODE FLAGS
     * =====================================================
     */

    const isCreateMode =
        mode === DRUG_CATEGORY_FORM_MODES.CREATE;

    const isEditMode =
        mode === DRUG_CATEGORY_FORM_MODES.EDIT;

    const isViewMode =
        mode === DRUG_CATEGORY_FORM_MODES.VIEW;


    /*
     * =====================================================
     * INITIAL VALUES
     * =====================================================
     */

    const getInitialValues = () => {

        if (isCreateMode) {
            return {
                ...DEFAULT_DRUG_CATEGORY_VALUES,
            };
        }

        return prepareDrugCategoryFormValues(
            record
        );
    };


    /*
     * =====================================================
     * LOAD FORM DATA
     * =====================================================
     */

    useEffect(() => {

        form.resetFields();

        form.setFieldsValue(
            getInitialValues()
        );

        setIsDirty(false);

        setSubmitError("");

    }, [
        form,
        mode,
        record,
    ]);


    /*
     * =====================================================
     * FORM CHANGE
     * =====================================================
     */

    const handleValuesChange = () => {

        if (!isViewMode) {
            setIsDirty(true);
        }

        if (submitError) {
            setSubmitError("");
        }
    };


    /*
     * =====================================================
     * SUBMIT
     * =====================================================
     */

    const handleFinish = async (
        values
    ) => {

        if (isViewMode) {
            return;
        }

        setSubmitError("");


        /*
         * -----------------------------------------------
         * BUSINESS VALIDATION
         * -----------------------------------------------
         */

        const validationErrors =
            validateDrugCategory(
                values,
                drugCategoryList,
                isEditMode
                    ? record?.id
                    : null
            );


        /*
         * -----------------------------------------------
         * APPLY VALIDATION ERRORS
         * -----------------------------------------------
         */

        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {

            const fields =
                Object.entries(
                    validationErrors
                ).map(
                    (
                        [
                            fieldName,
                            message,
                        ]
                    ) => ({
                        name: fieldName,
                        errors: [
                            message,
                        ],
                    })
                );


            form.setFields(
                fields
            );


            setSubmitError(
                "Please correct the highlighted fields before saving."
            );

            return;
        }


        /*
         * -----------------------------------------------
         * PREPARE PAYLOAD
         * -----------------------------------------------
         */

        const payload =
            prepareDrugCategoryPayload(
                values
            );


        /*
         * -----------------------------------------------
         * SEND TO PARENT
         * -----------------------------------------------
         */

        try {

            await onSubmit?.(
                payload,
                {
                    mode,
                    record,
                }
            );

            setIsDirty(false);

        } catch (error) {

            setSubmitError(
                error?.message ||
                "Unable to save drug category. Please try again."
            );
        }
    };


    /*
     * =====================================================
     * CANCEL / CLOSE
     * =====================================================
     */

    const handleCancel = () => {

        onCancel?.({
            isDirty,
            mode,
            record,
        });
    };


    /*
     * =====================================================
     * CURRENT STATUS
     * =====================================================
     */

    const currentStatus =
        Form.useWatch(
            "status",
            form
        ) ||
        record?.status ||
        "Active";


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
        <Form
            form={form}
            layout="vertical"

            initialValues={
                getInitialValues()
            }

            onFinish={
                handleFinish
            }

            onValuesChange={
                handleValuesChange
            }

            requiredMark="optional"

            scrollToFirstError={{
                behavior: "smooth",
                block: "center",
            }}
        >

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {submitError && (
                <Alert
                    type="error"
                    showIcon
                    closable

                    message={
                        submitError
                    }

                    onClose={() =>
                        setSubmitError("")
                    }

                    style={{
                        marginBottom: 16,
                    }}
                />
            )}


            {/* =================================================
                1. BASIC INFORMATION
            ================================================= */}

            <BasicSection
                disabled={
                    isViewMode
                }
            />


            {/* =================================================
                2. CLASSIFICATION
            ================================================= */}

            <ClassificationSection
                disabled={
                    isViewMode
                }
            />


            {/* =================================================
                3. VALIDATION & USAGE
            ================================================= */}

            {!isCreateMode && (
                <ValidationSection
                    disabled={
                        isViewMode
                    }

                    drugCount={
                        drugCount
                    }

                    status={
                        currentStatus
                    }
                />
            )}


            {/* =================================================
                4. AUDIT INFORMATION
            ================================================= */}

            {!isCreateMode && (
                <AuditSection
                    data={
                        record || {}
                    }
                />
            )}


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="drug-category-form-footer">

                <Space>

                    {/* CANCEL / CLOSE */}

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
                        {isViewMode
                            ? "Close"
                            : "Cancel"}
                    </Button>


                    {/* SAVE / UPDATE */}

                    {!isViewMode && (
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
                            {isEditMode
                                ? "Update Category"
                                : "Save Category"}
                        </Button>
                    )}

                </Space>

            </div>

        </Form>
    );
};


export default DrugCategoryForm;