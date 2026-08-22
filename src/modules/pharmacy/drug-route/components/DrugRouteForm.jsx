// src/modules/pharmacy/drug-route/components/DrugRouteForm.jsx

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
    DEFAULT_DRUG_ROUTE_FORM_VALUES,
    DRUG_ROUTE_FORM_MODES,
} from "../constants/drugRoute.constants";

import {
    drugRouteList,
} from "../mock/drugRoute.mock";

import {
    prepareDrugRouteFormValues,
    prepareDrugRoutePayload,
    validateDrugRoute,
} from "../utils/drugRoute.helper";


const DrugRouteForm = ({
    mode =
        DRUG_ROUTE_FORM_MODES.CREATE,

    record = null,

    loading = false,

    routeList =
        drugRouteList,

    onSubmit,

    onCancel,

    onSuccess,

    showValidation =
        true,

    showAudit =
        true,
}) => {

    /*
     * =====================================================
     * FORM INSTANCE
     * =====================================================
     */

    const [
        form,
    ] = Form.useForm();


    /*
     * =====================================================
     * LOCAL STATE
     * =====================================================
     */

    const [
        submitError,
        setSubmitError,
    ] = useState(null);


    const [
        submitting,
        setSubmitting,
    ] = useState(false);


    /*
     * =====================================================
     * MODE FLAGS
     * =====================================================
     */

    const isCreateMode =
        mode ===
        DRUG_ROUTE_FORM_MODES.CREATE;


    const isEditMode =
        mode ===
        DRUG_ROUTE_FORM_MODES.EDIT;


    const isViewMode =
        mode ===
        DRUG_ROUTE_FORM_MODES.VIEW;


    const isReadOnly =
        isViewMode;


    /*
     * =====================================================
     * INITIAL VALUES
     * =====================================================
     */

    const initialValues =
        useMemo(
            () =>
                prepareDrugRouteFormValues(
                    record
                ),
            [
                record,
            ]
        );


    /*
     * =====================================================
     * SET FORM VALUES
     * =====================================================
     */

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


    /*
     * =====================================================
     * RESET CREATE FORM
     * =====================================================
     */

    useEffect(
        () => {

            if (
                isCreateMode &&
                !record
            ) {

                form.resetFields();

                form.setFieldsValue(
                    DEFAULT_DRUG_ROUTE_FORM_VALUES
                );
            }

        },
        [
            form,
            isCreateMode,
            record,
        ]
    );


    /*
     * =====================================================
     * SUBMIT
     * =====================================================
     */

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


        /*
         * -----------------------------------------------
         * BUSINESS VALIDATION
         * -----------------------------------------------
         */

        const businessErrors =
            validateDrugRoute(
                values,

                routeList,

                isEditMode
                    ? record?.id
                    : null
            );


        if (
            Object.keys(
                businessErrors
            ).length > 0
        ) {

            const fieldErrors =
                Object.entries(
                    businessErrors
                ).map(
                    (
                        [
                            name,
                            errors,
                        ]
                    ) => ({

                        name,

                        errors: [
                            errors,
                        ],

                    })
                );


            form.setFields(
                fieldErrors
            );


            return;
        }


        /*
         * -----------------------------------------------
         * PREPARE API PAYLOAD
         * -----------------------------------------------
         */

        const payload =
            prepareDrugRoutePayload(
                values
            );


        /*
         * -----------------------------------------------
         * SUBMIT
         * -----------------------------------------------
         */

        try {

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

                            record,

                            id:
                                record?.id,
                        }
                    );
            }


            /*
             * -------------------------------------------
             * SUCCESS
             * -------------------------------------------
             */

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
            error
        ) {

            /*
             * -------------------------------------------
             * API / SERVICE ERROR
             * -------------------------------------------
             */

            const message =
                error?.response?.data
                    ?.message ||
                error?.message ||
                "Unable to save drug route.";


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


    /*
     * =====================================================
     * CANCEL
     * =====================================================
     */

    const handleCancel = () => {

        if (
            submitting
        ) {
            return;
        }


        if (
            typeof onCancel ===
            "function"
        ) {

            onCancel();
        }
    };


    /*
     * =====================================================
     * FORM TITLE
     * =====================================================
     */

    const formTitle =

        isCreateMode
            ? "Create Drug Route"

            : isEditMode
                ? "Edit Drug Route"

                : "Drug Route Details";


    /*
     * =====================================================
     * RENDER
     * =====================================================
 */

    return (
        <div
            className="drug-route-form"
        >

            {/* =================================================
                FORM HEADER
            ================================================= */}

            <div
                className="drug-route-form-header"
            >

                <div>

                    <div
                        className="drug-route-form-title"
                    >
                        {
                            formTitle
                        }
                    </div>

                    <div
                        className="drug-route-form-subtitle"
                    >
                        {
                            isCreateMode
                                ? "Create a standardized drug administration route."
                                : isEditMode
                                    ? "Update the drug administration route configuration."
                                    : "View complete drug administration route information."
                        }
                    </div>

                </div>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {
                submitError && (

                    <Alert
                        type="error"

                        showIcon

                        closable

                        message={
                            submitError
                        }

                        onClose={() =>
                            setSubmitError(
                                null
                            )
                        }

                        style={{
                            marginBottom:
                                20,
                        }}
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
                    DEFAULT_DRUG_ROUTE_FORM_VALUES
                }

                onFinish={
                    handleFinish
                }

                disabled={
                    isReadOnly
                }

                scrollToFirstError
            >

                {/* =============================================
                    BASIC
                ============================================== */}

                <BasicSection
                    disabled={
                        isReadOnly
                    }

                    loading={
                        loading ||
                        submitting
                    }
                />


                {/* =============================================
                    CLASSIFICATION
                ============================================== */}

                <ClassificationSection
                    disabled={
                        isReadOnly
                    }

                    loading={
                        loading ||
                        submitting
                    }
                />


                {/* =============================================
                    VALIDATION
                ============================================== */}

                {
                    showValidation &&
                    !isCreateMode && (

                        <ValidationSection
                            disabled={
                                true
                            }

                            loading={
                                loading ||
                                submitting
                            }

                            record={
                                record
                            }
                        />

                    )
                }


                {/* =============================================
                    AUDIT
                ============================================== */}

                {
                    showAudit &&
                    !isCreateMode && (

                        <AuditSection
                            disabled={
                                true
                            }

                            loading={
                                loading ||
                                submitting
                            }

                            record={
                                record
                            }
                        />

                    )
                }


                {/* =============================================
                    ACTION BAR
                ============================================== */}

                <div
                    className="drug-route-form-actions"
                >

                    <Space>

                        <Button
                            icon={
                                <CloseOutlined />
                            }

                            onClick={
                                handleCancel
                            }

                            disabled={
                                submitting
                            }
                        >
                            Close
                        </Button>


                        {
                            !isViewMode && (

                                <Button
                                    type="primary"

                                    htmlType="submit"

                                    icon={
                                        <SaveOutlined />
                                    }

                                    loading={
                                        loading ||
                                        submitting
                                    }
                                >
                                    {
                                        isCreateMode
                                            ? "Create Drug Route"
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


export default DrugRouteForm;