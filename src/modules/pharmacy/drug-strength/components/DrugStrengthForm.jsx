// src/modules/pharmacy/drug-strength/components/DrugStrengthForm.jsx

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Form,
    Space,
} from "antd";

import {
    ArrowLeftOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import {
    DRUG_STRENGTH_FORM_MODES,
    DRUG_STRENGTH_STATUS,
} from "../constants/drugStrength.constants";

import {
    createEmptyDrugStrength,
    normalizeDrugStrengthForm,
} from "../utils/drugStrength.helper";

import useDrugStrengthLookup
    from "../hooks/useDrugStrengthLookup";

import BasicSection
    from "./sections/BasicSection";

import StrengthSection
    from "./sections/StrengthSection";

import ValidationSection
    from "./sections/ValidationSection";

import AuditSection
    from "./sections/AuditSection";


/* =========================================================
   COMPONENT
   ========================================================= */

const DrugStrengthForm = ({
    mode =
    DRUG_STRENGTH_FORM_MODES.CREATE,

    record =
    null,

    strengthList =
    [],

    loading =
    false,

    onSubmit,

    onCancel,

    onSuccess,

    onDirtyChange,
}) => {


    /* =====================================================
       FORM
    ===================================================== */

    const [
        form,
    ] = Form.useForm();


    /* =====================================================
       SUBMITTING
    ===================================================== */

    const [
        submitting,
        setSubmitting,
    ] = useState(false);


    /* =====================================================
       FORM ERROR
    ===================================================== */

    const [
        submitError,
        setSubmitError,
    ] = useState(null);


    /* =====================================================
       LOOKUP
    ===================================================== */

    const {

        unitOptions,

        strengthTypeOptions,

        getUnitById,

    } =
        useDrugStrengthLookup();


    /* =====================================================
       VIEW MODE
    ===================================================== */

    const isViewMode =
        mode ===
        DRUG_STRENGTH_FORM_MODES.VIEW;


    const isEditMode =
        mode ===
        DRUG_STRENGTH_FORM_MODES.EDIT;


    const isCreateMode =
        mode ===
        DRUG_STRENGTH_FORM_MODES.CREATE;


    /* =====================================================
       INITIAL VALUES
    ===================================================== */

    const initialValues =
        useMemo(
            () => {

                if (
                    !record
                ) {

                    return {
                        ...createEmptyDrugStrength(),

                        status:
                            DRUG_STRENGTH_STATUS.ACTIVE,
                    };
                }


                return {
                    ...createEmptyDrugStrength(),

                    ...record,

                    strengthValue:
                        record.strengthValue ??
                        null,

                    strengthUnitId:
                        record.strengthUnitId ??
                        null,

                    strengthType:
                        record.strengthType ??
                        undefined,

                    decimalPrecision:
                        record.decimalPrecision ??
                        0,

                    sortOrder:
                        record.sortOrder ??
                        0,

                    status:
                        record.status ??
                        DRUG_STRENGTH_STATUS.ACTIVE,

                    strengthDisplay:
                        record.strengthDisplay ??
                        "",

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
        ]
    );


    /* =====================================================
       FORM RESET
    ===================================================== */

    const resetForm =
        () => {

            form.resetFields();

            form.setFieldsValue(
                initialValues
            );

            setSubmitError(
                null
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


            setSubmitError(
                null
            );


            try {

                /*
                 * Resolve selected UOM.
                 */

                const selectedUnit =
                    getUnitById(
                        values.strengthUnitId
                    );


                /*
                 * Normalize complete payload.
                 */

                const payload =
                    normalizeDrugStrengthForm(
                        values,
                        selectedUnit
                    );


                /*
                 * Additional duplicate validation.
                 *
                 * ValidationSection provides visual
                 * validation, but we also block submit here.
                 */

                const duplicateCode =
                    strengthList.find(
                        (
                            item
                        ) => {

                            if (
                                record?.id &&
                                item.id ===
                                record.id
                            ) {
                                return false;
                            }


                            return (
                                String(
                                    item.strengthCode ||
                                    ""
                                )
                                    .trim()
                                    .toUpperCase() ===
                                String(
                                    payload.strengthCode ||
                                    ""
                                )
                                    .trim()
                                    .toUpperCase()
                            );

                        }
                    );


                if (
                    duplicateCode
                ) {

                    form.setFields([
                        {
                            name:
                                "strengthCode",

                            errors: [
                                "Strength code already exists.",
                            ],
                        },
                    ]);

                    return;
                }


                /*
                 * Duplicate value + unit.
                 */

                const duplicateStrength =
                    strengthList.find(
                        (
                            item
                        ) => {

                            if (
                                record?.id &&
                                item.id ===
                                record.id
                            ) {
                                return false;
                            }


                            const itemValue =
                                Number(
                                    item.strengthValue
                                );


                            const payloadValue =
                                Number(
                                    payload.strengthValue
                                );


                            const itemUnit =
                                String(
                                    item.strengthUnitCode ||
                                    ""
                                )
                                    .trim()
                                    .toUpperCase();


                            const payloadUnit =
                                String(
                                    payload.strengthUnitCode ||
                                    ""
                                )
                                    .trim()
                                    .toUpperCase();


                            return (
                                itemValue ===
                                payloadValue &&
                                itemUnit ===
                                payloadUnit
                            );

                        }
                    );


                if (
                    duplicateStrength
                ) {

                    form.setFields([
                        {
                            name:
                                "strengthUnitId",

                            errors: [
                                "This strength and unit combination already exists.",
                            ],
                        },
                    ]);

                    return;
                }


                /* =========================================
                   SUBMIT START
                ========================================== */

                setSubmitting(
                    true
                );


                let result;


                if (
                    typeof onSubmit ===
                    "function"
                ) {

                    result =
                        await onSubmit(
                            payload,
                            {
                                mode,

                                id:
                                    record?.id ??
                                    null,

                                record:
                                    record ??
                                    null,
                            }
                        );

                }


                /* =========================================
                   SUCCESS CALLBACK
                ========================================== */

                if (
                    typeof onSuccess ===
                    "function"
                ) {

                    await onSuccess(
                        result,
                        payload
                    );

                }


            }
            catch (
            caughtError
            ) {

                setSubmitError(
                    caughtError?.message ||
                    "Unable to save drug strength."
                );

            }
            finally {

                setSubmitting(
                    false
                );

            }
        };


    /* =====================================================
       FORM VALIDATION FAILED
    ===================================================== */

    const handleFinishFailed =
        ({
            errorFields,
        }) => {

            setSubmitError(
                "Please correct the highlighted fields before saving."
            );


            if (
                errorFields?.length
            ) {

                form.scrollToField(
                    errorFields[0].name,
                    {
                        behavior:
                            "smooth",

                        block:
                            "center",
                    }
                );

            }

        };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div
            className="drug-strength-form"
        >

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div
                className="drug-strength-form-header"
            >

                <div>

                    <div
                        className="drug-strength-form-title"
                    >
                        {
                            isCreateMode
                                ? "Add Drug Strength"
                                : isEditMode
                                    ? "Edit Drug Strength"
                                    : "Drug Strength Details"
                        }
                    </div>

                    <div
                        className="drug-strength-form-subtitle"
                    >
                        {
                            isCreateMode
                                ? "Create a standardized drug strength."
                                : isEditMode
                                    ? "Update the selected drug strength."
                                    : "View complete drug strength information."
                        }
                    </div>

                </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                submitError && (

                    <div
                        className="drug-strength-form-error"
                    >
                        {submitError}
                    </div>

                )
            }


            {/* =================================================
                ANT DESIGN FORM
            ================================================= */}

            <Form
                form={form}

                layout="vertical"

                initialValues={initialValues}

                onFinish={handleFinish}

                onFinishFailed={handleFinishFailed}

                onValuesChange={() => {

                    if (
                        typeof onDirtyChange ===
                        "function"
                    ) {
                        onDirtyChange(true);
                    }

                }}

                disabled={
                    loading ||
                    submitting ||
                    isViewMode
                }

                requiredMark="optional"

                scrollToFirstError
            >

                {/* =============================================
                    BASIC SECTION
                ============================================== */}

                <BasicSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                />


                {/* =============================================
                    STRENGTH SECTION
                ============================================== */}

                <StrengthSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    unitOptions={
                        unitOptions
                    }

                    strengthTypeOptions={
                        strengthTypeOptions
                    }

                    getUnitById={
                        getUnitById
                    }

                />


                {/* =============================================
                    VALIDATION SECTION
                ============================================== */}

                <ValidationSection

                    form={
                        form
                    }

                    mode={
                        mode
                    }

                    strengthList={
                        strengthList
                    }

                    record={
                        record
                    }

                />


                {/* =============================================
                    AUDIT SECTION
                ============================================== */}

                <AuditSection

                    record={
                        record
                    }

                    mode={
                        mode
                    }

                />


                {/* =============================================
                    ACTIONS
                ============================================== */}

                <div
                    className="drug-strength-form-actions"
                >

                    <Space
                        size="middle"
                    >

                        {/* =====================================
                            CANCEL
                        ====================================== */}

                        <Button
                            icon={
                                <ArrowLeftOutlined />
                            }

                            onClick={
                                onCancel
                            }

                            disabled={
                                submitting
                            }
                        >
                            {
                                isViewMode
                                    ? "Close"
                                    : "Cancel"
                            }
                        </Button>


                        {/* =====================================
                            RESET
                        ====================================== */}

                        {
                            isCreateMode &&
                            (
                                <Button
                                    onClick={
                                        resetForm
                                    }

                                    disabled={
                                        submitting
                                    }
                                >
                                    Reset
                                </Button>
                            )
                        }


                        {/* =====================================
                            SAVE
                        ====================================== */}

                        {
                            !isViewMode &&
                            (
                                <Button
                                    type="primary"

                                    htmlType="submit"

                                    icon={
                                        <SaveOutlined />
                                    }

                                    loading={
                                        submitting ||
                                        loading
                                    }
                                >
                                    {
                                        isEditMode
                                            ? "Update Drug Strength"
                                            : "Save Drug Strength"
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


export default DrugStrengthForm;