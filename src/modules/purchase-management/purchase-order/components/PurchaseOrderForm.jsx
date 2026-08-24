// src/modules/purchase-management/purchase-order/components/PurchaseOrderForm.jsx

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Divider,
    Form,
} from "antd";

import {
    ArrowLeftOutlined,
} from "@ant-design/icons";

import BasicSection
    from "./BasicSection";

import SupplierSection
    from "./SupplierSection";

import ItemsSection
    from "./ItemsSection";

import PricingSection
    from "./PricingSection";

import TermsSection
    from "./TermsSection";

import NotesSection
    from "./NotesSection";

import ValidationSection
    from "./ValidationSection";

import AuditSection
    from "./AuditSection";

import {
    PO_STATUS,
} from "../constants/purchaseOrder.constants";

import {
    preparePurchaseOrderPayload,
    validatePurchaseOrder,
} from "../utils/purchaseOrder.helper";


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

const DEFAULT_VALUES = {

    poNumber:
        "",

    poDate:
        null,

    poType:
        undefined,

    purchaseRequisitionId:
        undefined,

    status:
        PO_STATUS.DRAFT,

    supplierId:
        undefined,

    supplierCode:
        "",

    supplierName:
        "",

    storeId:
        undefined,

    storeName:
        "",

    billingAddress:
        "",

    shippingAddress:
        "",

    paymentTerms:
        undefined,

    deliveryTerms:
        undefined,

    currency:
        "INR",

    expectedDeliveryDate:
        null,

    deliveryLocation:
        "",

    shippingMethod:
        "",

    supplierReference:
        "",

    quotationNumber:
        "",

    quotationDate:
        null,

    internalReference:
        "",

    paymentTermsNote:
        "",

    items:
        [],

    subtotal:
        0,

    discountAmount:
        0,

    taxAmount:
        0,

    otherCharges:
        0,

    roundOff:
        0,

    grandTotal:
        0,

    totalItems:
        0,

    totalQuantity:
        0,

    receivedQuantity:
        0,

    outstandingQuantity:
        0,

    supplierInstructions:
        "",

    internalRemarks:
        "",

    specialInstructions:
        "",

    termsAndConditions:
        "",

    approvalRemarks:
        "",

    validationStatus:
        "",

    validationErrors:
        "",

};


/* =========================================================
   NORMALIZE DATE
   ========================================================= */

const normalizeDateValue = (
    value
) => {

    if (
        !value
    ) {

        return null;

    }


    /*
     * Ant Design DatePicker uses Day.js.
     *
     * If value is already a Day.js object,
     * keep it unchanged.
     */

    if (
        typeof value ===
        "object" &&
        typeof value.isValid ===
        "function"
    ) {

        return value;

    }


    return value;

};


/* =========================================================
   NORMALIZE ITEM
   ========================================================= */

const normalizeItem = (
    item = {}
) => {

    return {

        id:
            item.id ||
            `TEMP-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        drugId:
            item.drugId ??
            null,

        itemCode:
            item.itemCode ||
            "",

        itemName:
            item.itemName ||
            item.drugName ||
            "",

        drugName:
            item.drugName ||
            item.itemName ||
            "",

        uomId:
            item.uomId ??
            null,

        uomCode:
            item.uomCode ||
            "",

        uomName:
            item.uomName ||
            "",

        orderedQuantity:
            Number(
                item.orderedQuantity
            ) || 0,

        freeQuantity:
            Number(
                item.freeQuantity
            ) || 0,

        receivedQuantity:
            Number(
                item.receivedQuantity
            ) || 0,

        outstandingQuantity:
            Number(
                item.outstandingQuantity
            ) || 0,

        unitRate:
            Number(
                item.unitRate
            ) || 0,

        discountPercent:
            Number(
                item.discountPercent
            ) || 0,

        discountAmount:
            Number(
                item.discountAmount
            ) || 0,

        taxableAmount:
            Number(
                item.taxableAmount
            ) || 0,

        taxPercent:
            Number(
                item.taxPercent
            ) || 0,

        taxAmount:
            Number(
                item.taxAmount
            ) || 0,

        lineTotal:
            Number(
                item.lineTotal
            ) || 0,

        expectedDeliveryDate:
            normalizeDateValue(
                item.expectedDeliveryDate
            ),

        remarks:
            item.remarks ||
            "",

    };

};


/* =========================================================
   NORMALIZE FORM VALUES
   ========================================================= */

const normalizeInitialValues = (
    values = {}
) => {

    const safeValues =
        values &&
        typeof values ===
        "object"
            ? values
            : {};


    const sourceItems =
        Array.isArray(
            safeValues.items
        )
            ? safeValues.items
            : [];


    return {

        ...DEFAULT_VALUES,

        ...safeValues,

        poDate:
            normalizeDateValue(
                safeValues.poDate
            ),

        expectedDeliveryDate:
            normalizeDateValue(
                safeValues.expectedDeliveryDate
            ),

        quotationDate:
            normalizeDateValue(
                safeValues.quotationDate
            ),

        items:
            sourceItems.map(
                normalizeItem
            ),

        status:
            safeValues.status ||
            PO_STATUS.DRAFT,

        currency:
            safeValues.currency ||
            "INR",

        otherCharges:
            Number(
                safeValues.otherCharges
            ) || 0,

        roundOff:
            Number(
                safeValues.roundOff
            ) || 0,

    };

};


/* =========================================================
   PURCHASE ORDER FORM
   ========================================================= */

const PurchaseOrderForm = ({
    mode = "CREATE",

    initialValues = {},

    auditTrail = [],

    loading = false,

    onSubmit,

    onSaveDraft,

    onCancel,

    onClose,

    onChange,
}) => {

    /* =====================================================
       FORM INSTANCE
       ===================================================== */

    const [
        form
    ] =
        Form.useForm();


    /* =====================================================
       STATE
       ===================================================== */

    const [
        submitAction,
        setSubmitAction,
    ] =
        useState(
            "SAVE"
        );


    const [
        validationErrors,
        setValidationErrors,
    ] =
        useState(
            []
        );


    /* =====================================================
       MODE
       ===================================================== */

    const normalizedMode =
        String(
            mode ||
            "CREATE"
        )
            .toUpperCase();


    const isCreateMode =
        normalizedMode ===
        "CREATE";


    const isEditMode =
        normalizedMode ===
        "EDIT";


    const isViewMode =
        normalizedMode ===
        "VIEW";


    const isReadOnly =
        isViewMode;


    /* =====================================================
       INITIAL FORM VALUES
       ===================================================== */

    const normalizedInitialValues =
        useMemo(
            () =>
                normalizeInitialValues(
                    initialValues
                ),
            [
                initialValues,
            ]
        );


    /* =====================================================
       SET INITIAL VALUES
       ===================================================== */

    useEffect(
        () => {

            form.setFieldsValue(
                normalizedInitialValues
            );

            setValidationErrors(
                []
            );

        },
        [
            form,
            normalizedInitialValues,
        ]
    );


    /* =====================================================
       FORM VALUES WATCH
       ===================================================== */

    const watchedItems =
        Form.useWatch(
            "items",
            form
        ) || [];


    const safeItems =
        Array.isArray(
            watchedItems
        )
            ? watchedItems
            : [];


    /*
     * Keep this variable intentionally available
     * for sections / future calculations.
     */

    void safeItems;


    /* =====================================================
       TITLE
       ===================================================== */

    const title =
        isCreateMode
            ? "Create Purchase Order"
            : isEditMode
                ? "Edit Purchase Order"
                : "Purchase Order Details";


    const description =
        isCreateMode
            ? "Create a new purchase order for pharmacy procurement."
            : isEditMode
                ? "Update the purchase order details."
                : "Review purchase order details and audit history.";


    /* =====================================================
       SUBMIT HANDLER
       ===================================================== */

    const handleFinish = async (
        values
    ) => {

        setValidationErrors(
            []
        );


        /* =================================================
           BUSINESS VALIDATION
        ================================================= */

        const errors =
            validatePurchaseOrder(
                values
            );


        if (
            Array.isArray(
                errors
            ) &&
            errors.length > 0
        ) {

            setValidationErrors(
                errors
            );

            return;

        }


        /* =================================================
           PREPARE PAYLOAD
        ================================================= */

        const payload =
            preparePurchaseOrderPayload(
                values
            );


        /*
         * SAVE
         * ----
         * Save as draft.
         *
         * SUBMIT
         * ------
         * Submit for approval.
         */

        const finalPayload = {

            ...payload,

            action:
                submitAction,

        };


        /* =================================================
           SAVE DRAFT
        ================================================= */

        if (
            submitAction ===
            "SAVE"
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


        /* =================================================
           SUBMIT
        ================================================= */

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
       FORM ERROR
       ===================================================== */

    const handleFinishFailed = (
        errorInfo
    ) => {

        const fields =
            errorInfo?.errorFields ||
            [];


        const messages =
            fields.flatMap(
                (
                    field
                ) =>
                    Array.isArray(
                        field.errors
                    )
                        ? field.errors
                        : []
            );


        setValidationErrors(
            messages
        );

    };


    /* =====================================================
       SAVE DRAFT
       ===================================================== */

    const handleSaveDraft = () => {

        if (
            isReadOnly
        ) {

            return;

        }


        setSubmitAction(
            "SAVE"
        );


        /*
         * form.submit() will invoke
         * handleFinish().
         */

        form.submit();

    };


    /* =====================================================
       SUBMIT FOR APPROVAL
       ===================================================== */

    const handleSubmitForApproval = () => {

        if (
            isReadOnly
        ) {

            return;

        }


        setSubmitAction(
            "SUBMIT"
        );


        /*
         * form.submit() will invoke
         * handleFinish().
         */

        form.submit();

    };


    /* =====================================================
       CANCEL / CLOSE
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
       FORM CHANGE
       ===================================================== */

    const handleValuesChange = (
        changedValues,
        allValues
    ) => {

        if (
            typeof onChange ===
            "function"
        ) {

            onChange(
                changedValues,
                allValues
            );

        }

    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div
            className="purchase-order-form"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="purchase-order-form-header"
            >

                <div>

                    <div
                        className="purchase-order-form-title"
                    >
                        {
                            title
                        }
                    </div>


                    <div
                        className="purchase-order-form-description"
                    >
                        {
                            description
                        }
                    </div>

                </div>


                {/* =================================================
                    VIEW MODE BACK BUTTON
                ================================================= */}

                {
                    isViewMode && (

                        <Button
                            icon={
                                <ArrowLeftOutlined />
                            }

                            onClick={
                                handleCancel
                            }
                        >
                            Back
                        </Button>

                    )
                }

            </div>


            {/* =================================================
                HEADER DIVIDER
            ================================================= */}

            <Divider
                style={{
                    margin:
                        "16px 0 24px",
                }}
            />


            {/* =================================================
                BUSINESS VALIDATION ERRORS
            ================================================= */}

            {
                validationErrors.length >
                0 && (

                    <div
                        className="purchase-order-submit-error"
                    >

                        <div
                            className="purchase-order-submit-error-title"
                        >
                            Please correct the following:
                        </div>


                        <ul>

                            {
                                validationErrors.map(
                                    (
                                        errorMessage,
                                        index
                                    ) => (

                                        <li
                                            key={
                                                `form-error-${index}`
                                            }
                                        >
                                            {
                                                errorMessage
                                            }
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )
            }


            {/* =================================================
                MAIN FORM
            ================================================= */}

            <Form

                id="purchase-order-main-form"

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

                onValuesChange={
                    handleValuesChange
                }

                disabled={
                    isReadOnly
                }

                scrollToFirstError={{
                    behavior:
                        "smooth",

                    block:
                        "center",
                }}

                className="purchase-order-main-form"
            >

                {/* =================================================
                    BASIC SECTION
                ================================================= */}

                <BasicSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    SUPPLIER SECTION
                ================================================= */}

                <SupplierSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    ITEMS SECTION
                ================================================= */}

                <ItemsSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    PRICING SECTION
                ================================================= */}

                <PricingSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    TERMS SECTION
                ================================================= */}

                <TermsSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    NOTES SECTION
                ================================================= */}

                <NotesSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    VALIDATION SECTION
                ================================================= */}

                <ValidationSection
                    mode={
                        normalizedMode
                    }

                    disabled={
                        isReadOnly
                    }
                />


                {/* =================================================
                    AUDIT SECTION
                ================================================= */}

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


                {/* =================================================
                    HIDDEN SAVE DRAFT TRIGGER
                    =================================================
                    
                    Drawer footer button triggers this.
                    
                    It is NOT visible.
                    
                    There must NOT be another visible footer
                    inside this component.
                ================================================= */}

                {
                    !isViewMode && (

                        <button
                            id="purchase-order-save-draft"
                            type="button"
                            style={{
                                display:
                                    "none",
                            }}
                            aria-hidden="true"
                            tabIndex={-1}
                            onClick={
                                handleSaveDraft
                            }
                        />

                    )
                }


                {/* =================================================
                    HIDDEN SUBMIT TRIGGER
                    =================================================
                    
                    Drawer footer button triggers this.
                ================================================= */}

                {
                    !isViewMode && (

                        <button
                            id="purchase-order-submit"
                            type="button"
                            style={{
                                display:
                                    "none",
                            }}
                            aria-hidden="true"
                            tabIndex={-1}
                            onClick={
                                handleSubmitForApproval
                            }
                        />

                    )
                }

            </Form>

        </div>

    );

};


export default PurchaseOrderForm;