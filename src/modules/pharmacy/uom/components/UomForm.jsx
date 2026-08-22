// src/modules/pharmacy/uom/components/UomForm.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Button,
    Divider,
    Form,
    Space,
} from "antd";

import {
    SaveOutlined,
    CloseOutlined,
    EditOutlined,
} from "@ant-design/icons";

import BasicSection from "./sections/BasicSection";
import ConversionSection from "./sections/ConversionSection";
import ValidationSection from "./sections/ValidationSection";
import AuditSection from "./sections/AuditSection";

import {
    DEFAULT_UOM_VALUES,
} from "../constants/uom.constants";

import {
    prepareUomFormValues,
    prepareUomPayload,
    validateUom,
} from "../utils/uom.helper";


const UomForm = ({
    mode = "ADD",

    initialValues = null,

    loading = false,

    onSubmit,

    onCancel,

    onEdit,

    form: externalForm,
}) => {
    /*
     * ============================================
     * FORM INSTANCE
     * ============================================
     */

    const [internalForm] =
        Form.useForm();

    const form =
        externalForm ||
        internalForm;


    /*
     * ============================================
     * MODE FLAGS
     * ============================================
     */

    const isAddMode =
        mode === "ADD";

    const isEditMode =
        mode === "EDIT";

    const isViewMode =
        mode === "VIEW";


    /*
     * ============================================
     * PREPARE INITIAL VALUES
     * ============================================
     */

    const formInitialValues =
        useMemo(() => {
            if (
                initialValues
            ) {
                return prepareUomFormValues(
                    initialValues
                );
            }

            return {
                ...DEFAULT_UOM_VALUES,
            };
        }, [
            initialValues,
        ]);


    /*
     * ============================================
     * LOAD FORM DATA
     * ============================================
     */

    useEffect(() => {
        form.setFieldsValue(
            formInitialValues
        );
    }, [
        form,
        formInitialValues,
    ]);


    /*
     * ============================================
     * RESET FORM FOR ADD MODE
     * ============================================
     */

    useEffect(() => {
        if (
            isAddMode &&
            !initialValues
        ) {
            form.resetFields();

            form.setFieldsValue({
                ...DEFAULT_UOM_VALUES,
            });
        }
    }, [
        form,
        isAddMode,
        initialValues,
    ]);


    /*
     * ============================================
     * SUBMIT
     * ============================================
     */

    const handleFinish = async (
        values
    ) => {
        /*
         * ----------------------------------------
         * BUSINESS VALIDATION
         * ----------------------------------------
         */

        const validationErrors =
            validateUom(
                values
            );

        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {
            form.setFields(
                Object.entries(
                    validationErrors
                ).map(
                    ([
                        name,
                        errors,
                    ]) => ({
                        name,
                        errors: [
                            errors,
                        ],
                    })
                )
            );

            return;
        }


        /*
         * ----------------------------------------
         * PREPARE API PAYLOAD
         * ----------------------------------------
         */

        const payload =
            prepareUomPayload(
                values
            );


        /*
         * ----------------------------------------
         * SUBMIT TO PARENT
         * ----------------------------------------
         */

        if (
            onSubmit
        ) {
            await onSubmit(
                payload,
                {
                    mode,
                    id:
                        initialValues?.id ??
                        null,
                    originalData:
                        initialValues,
                }
            );
        }
    };


    /*
     * ============================================
     * VALIDATION FAILED
     * ============================================
     */

    const handleFinishFailed = ({
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
                behavior: "smooth",
                block: "center",
            }
        );
    };


    /*
     * ============================================
     * CANCEL
     * ============================================
     */

    const handleCancel = () => {
        if (
            onCancel
        ) {
            onCancel();
        }
    };


    /*
     * ============================================
     * EDIT
     * ============================================
     */

    const handleEdit = () => {
        if (
            onEdit &&
            initialValues
        ) {
            onEdit(
                initialValues
            );
        }
    };


    /*
     * ============================================
     * RENDER
     * ============================================
     */

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={
                formInitialValues
            }
            onFinish={
                handleFinish
            }
            onFinishFailed={
                handleFinishFailed
            }
            autoComplete="off"
            scrollToFirstError
        >
            {/* ================================= */}
            {/* BASIC */}
            {/* ================================= */}

            <BasicSection
                form={form}
                mode={mode}
            />


            <Divider
                style={{
                    margin:
                        "8px 0 20px",
                }}
            />


            {/* ================================= */}
            {/* CONVERSION */}
            {/* ================================= */}

            <ConversionSection
                form={form}
                mode={mode}
            />


            <Divider
                style={{
                    margin:
                        "8px 0 20px",
                }}
            />


            {/* ================================= */}
            {/* VALIDATION */}
            {/* ================================= */}

            <ValidationSection
                form={form}
                mode={mode}
            />


            {/* ================================= */}
            {/* AUDIT */}
            {/* ================================= */}

            {!isAddMode && (
                <>
                    <Divider
                        style={{
                            margin:
                                "8px 0 20px",
                        }}
                    />

                    <AuditSection
                        data={
                            initialValues
                        }
                        mode={mode}
                    />
                </>
            )}


            {/* ================================= */}
            {/* ACTION BAR */}
            {/* ================================= */}

            <Divider
                style={{
                    margin:
                        "24px 0 16px",
                }}
            />

            <div
                style={{
                    display:
                        "flex",
                    justifyContent:
                        "flex-end",
                    alignItems:
                        "center",
                    gap: 8,
                }}
            >
                {/* ============================= */}
                {/* CANCEL */}
                {/* ============================= */}

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
                    Close
                </Button>


                {/* ============================= */}
                {/* VIEW → EDIT */}
                {/* ============================= */}

                {isViewMode && (
                    <Button
                        type="primary"
                        icon={
                            <EditOutlined />
                        }
                        onClick={
                            handleEdit
                        }
                    >
                        Edit
                    </Button>
                )}


                {/* ============================= */}
                {/* ADD / EDIT SAVE */}
                {/* ============================= */}

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
                            ? "Update UOM"
                            : "Save UOM"}
                    </Button>
                )}
            </div>
        </Form>
    );
};


export default UomForm;