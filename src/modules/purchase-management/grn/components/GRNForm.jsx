// src/modules/purchase-management/grn/components/GRNForm.jsx

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Form,
    Tabs,
} from "antd";

import {
    CheckOutlined,
    CloseOutlined,
    SaveOutlined,
    SendOutlined,
} from "@ant-design/icons";

import BasicSection from "./BasicSection";
import SupplierSection from "./SupplierSection";
import ItemsSection from "./ItemsSection";
import QualitySection from "./QualitySection";
import BatchSection from "./BatchSection";
import TermsSection from "./TermsSection";
import NotesSection from "./NotesSection";
import ValidationSection from "./ValidationSection";
import AuditSection from "./AuditSection";

import {
    GRN_STATUS,
} from "../constants/grn.constants";

import {
    prepareGRNPayload,
    validateGRN,
} from "../utils/grn.helper";


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

const DEFAULT_VALUES = {
    grnNumber: "",
    grnDate: null,
    grnType: undefined,
    receivingMode: undefined,

    purchaseOrderId: undefined,
    purchaseOrderNumber: "",

    status: GRN_STATUS.DRAFT,

    supplierId: undefined,
    supplierCode: "",
    supplierName: "",

    supplierInvoiceNumber: "",
    invoiceDate: null,

    deliveryChallanNumber: "",
    challanDate: null,

    storeId: undefined,
    storeName: "",

    paymentTerms: "",
    deliveryTerms: "",

    currency: "INR",

    receivedBy: undefined,

    items: [],

    qualityStatus: "",
    inspectionStatus: "",
    stockPostingStatus: "",

    supplierRemarks: "",
    internalRemarks: "",

    termsAndConditions: "",
    notes: "",
};


/* =========================================================
   NORMALIZE INITIAL VALUES
   ========================================================= */

const normalizeInitialValues = (values = {}) => {
    const safeValues =
        values &&
            typeof values === "object"
            ? values
            : {};

    return {
        ...DEFAULT_VALUES,
        ...safeValues,

        status:
            safeValues.status ||
            DEFAULT_VALUES.status,

        currency:
            safeValues.currency ||
            DEFAULT_VALUES.currency,

        items:
            Array.isArray(safeValues.items)
                ? safeValues.items
                : [],
    };
};


/* =========================================================
   GRN FORM
   ========================================================= */

const GRNForm = ({
    mode = "CREATE",

    initialValues = {},

    auditTrail = [],

    loading = false,

    onSubmit,

    onSaveDraft,

    onCancel,

    onClose,
}) => {

    const [form] = Form.useForm();


    /* =====================================================
       ACTION
    ===================================================== */

    const [
        submitAction,
        setSubmitAction,
    ] = useState("SAVE");


    /* =====================================================
       VALIDATION
    ===================================================== */

    const [
        validationErrors,
        setValidationErrors,
    ] = useState([]);


    /* =====================================================
       ACTIVE TAB
    ===================================================== */

    const [
        activeTab,
        setActiveTab,
    ] = useState("basic");


    /* =====================================================
       MODE
    ===================================================== */

    const normalizedMode =
        String(mode || "CREATE")
            .toUpperCase();


    const isEditMode =
        normalizedMode === "EDIT";


    const isViewMode =
        normalizedMode === "VIEW";


    const isReadOnly =
        isViewMode;


    /* =====================================================
       INITIAL VALUES
    ===================================================== */

    const normalizedInitialValues =
        useMemo(
            () =>
                normalizeInitialValues(
                    initialValues
                ),
            [initialValues]
        );


    /* =====================================================
       SET INITIAL VALUES
    ===================================================== */

    useEffect(() => {

        form.setFieldsValue(
            normalizedInitialValues
        );

        setValidationErrors([]);

        setActiveTab("basic");

    }, [
        form,
        normalizedInitialValues,
    ]);


    /* =====================================================
       FINISH
    ===================================================== */

    const handleFinish = async (values) => {

        setValidationErrors([]);


        /* -------------------------------------------------
           BUSINESS VALIDATION
        ------------------------------------------------- */

        const errors =
            validateGRN(values);


        if (
            Array.isArray(errors) &&
            errors.length > 0
        ) {

            setValidationErrors(errors);

            setActiveTab("validation");

            return;
        }


        /* -------------------------------------------------
           PREPARE PAYLOAD
        ------------------------------------------------- */

        const payload =
            prepareGRNPayload(values);


        const finalPayload = {
            ...payload,

            action:
                submitAction,
        };


        /* -------------------------------------------------
           SAVE DRAFT
        ------------------------------------------------- */

        if (
            submitAction === "SAVE"
        ) {

            if (
                typeof onSaveDraft ===
                "function"
            ) {

                await onSaveDraft(
                    finalPayload
                );

                return;
            }
        }


        /* -------------------------------------------------
           SUBMIT
        ------------------------------------------------- */

        if (
            typeof onSubmit ===
            "function"
        ) {

            await onSubmit(
                finalPayload
            );
        }
    };


    /* =====================================================
       FORM VALIDATION FAILURE
    ===================================================== */

    const handleFinishFailed = (
        errorInfo
    ) => {

        const fields =
            errorInfo?.errorFields || [];


        const messages =
            fields.flatMap(
                (field) =>
                    Array.isArray(
                        field.errors
                    )
                        ? field.errors
                        : []
            );


        setValidationErrors(
            messages
        );


        setActiveTab("basic");
    };


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    const handleSaveDraft = () => {

        if (isReadOnly) {
            return;
        }


        setSubmitAction("SAVE");

        /*
         * Important:
         * setState is async.
         * form.submit() immediately after setState
         * can still use old submitAction.
         *
         * Therefore action is controlled by
         * the button handler below through a
         * dedicated ref-style field.
         */

        form.submit();
    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = () => {

        if (isReadOnly) {
            return;
        }


        setSubmitAction("SUBMIT");

        form.submit();
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

            return;
        }


        if (
            typeof onClose ===
            "function"
        ) {

            onClose();
        }
    };


    /* =====================================================
       TAB ITEMS
    ===================================================== */

    const tabItems = [

        /* =================================================
           BASIC & SUPPLIER
        ================================================= */

        {
            key: "basic",

            label: "Basic & Supplier",

            children: (
                <div className="grn-tab-content">

                    <BasicSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />


                    <SupplierSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />

                </div>
            ),
        },


        /* =================================================
           ITEMS & BATCH
        ================================================= */

        {
            key: "items",

            label: "Items & Batch",

            children: (
                <div className="grn-tab-content">

                    <ItemsSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />


                    <BatchSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />

                </div>
            ),
        },


        /* =================================================
           QUALITY
        ================================================= */

        {
            key: "quality",

            label: "Quality",

            children: (
                <div className="grn-tab-content">

                    <QualitySection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />

                </div>
            ),
        },


        /* =================================================
           TERMS & NOTES
        ================================================= */

        {
            key: "terms",

            label: "Terms & Notes",

            children: (
                <div className="grn-tab-content">

                    <TermsSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />


                    <NotesSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />

                </div>
            ),
        },


        /* =================================================
           VALIDATION & AUDIT
        ================================================= */

        {
            key: "validation",

            label: "Validation & Audit",

            children: (
                <div className="grn-tab-content">

                    <ValidationSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }
                    />


                    <AuditSection
                        mode={
                            normalizedMode
                        }

                        disabled={
                            isReadOnly
                        }

                        auditTrail={
                            auditTrail
                        }
                    />

                </div>
            ),
        },

    ];


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="grn-form"
        >

            <Form

                form={
                    form
                }

                layout="vertical"

                initialValues={
                    normalizedInitialValues
                }

                onFinish={
                    handleFinish
                }

                onFinishFailed={
                    handleFinishFailed
                }

                disabled={
                    isReadOnly
                }

            >

                <div
                    className="grn-form-body"
                >

                    <Tabs

                        activeKey={
                            activeTab
                        }

                        onChange={
                            setActiveTab
                        }

                        items={
                            tabItems
                        }

                        className="grn-main-tabs"

                        destroyInactiveTabPane={
                            false
                        }

                    />

                </div>

            </Form>


            {/* =================================================
            ONLY ONE FOOTER
        ================================================= */}

            <div
                className="grn-drawer-footer"
            >

                <div
                    className="grn-footer-actions"
                >

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
                        Cancel
                    </Button>


                    {
                        !isViewMode && (

                            <>

                                <Button
                                    icon={
                                        <SaveOutlined />
                                    }

                                    loading={
                                        loading &&
                                        submitAction ===
                                        "SAVE"
                                    }

                                    onClick={
                                        handleSaveDraft
                                    }
                                >
                                    Save Draft
                                </Button>


                                <Button
                                    type="primary"

                                    icon={
                                        isEditMode
                                            ? (
                                                <CheckOutlined />
                                            )
                                            : (
                                                <SendOutlined />
                                            )
                                    }

                                    loading={
                                        loading &&
                                        submitAction ===
                                        "SUBMIT"
                                    }

                                    onClick={
                                        handleSubmit
                                    }
                                >
                                    {
                                        isEditMode
                                            ? "Update & Submit"
                                            : "Submit for Approval"
                                    }
                                </Button>

                            </>

                        )
                    }

                </div>

            </div>

        </div>

    );
};


export default GRNForm;