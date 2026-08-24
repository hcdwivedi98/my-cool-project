import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Drawer,
    message,
} from "antd";

import {
    CloseOutlined,
    SaveOutlined,
    SendOutlined,
} from "@ant-design/icons";

import PurchaseOrderForm
    from "./PurchaseOrderForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";


/* =========================================================
   PURCHASE ORDER DRAWER
   ========================================================= */

const PurchaseOrderDrawer = ({
    open = false,

    mode = "CREATE",

    record = null,

    auditTrail = [],

    loading = false,

    width = 1000,

    onClose,

    onSaveDraft,

    onSubmit,

    onSuccess,
}) => {


    /* =====================================================
       STATE
       ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);


    const [
        saving,
        setSaving,
    ] = useState(false);


    const [
        hasChanges,
        setHasChanges,
    ] = useState(false);


    /* =====================================================
       MODE
       ===================================================== */

    const normalizedMode =
        String(
            mode || "CREATE"
        ).toUpperCase();


    const isCreateMode =
        normalizedMode === "CREATE";


    const isEditMode =
        normalizedMode === "EDIT";


    const isViewMode =
        normalizedMode === "VIEW";


    /* =====================================================
       TITLE
       ===================================================== */

    const drawerTitle =
        isCreateMode
            ? "Create Purchase Order"
            : isEditMode
                ? "Edit Purchase Order"
                : "Purchase Order Details";


    /* =====================================================
       SAFE RECORD
       ===================================================== */

    const safeRecord =
        record &&
        typeof record === "object"
            ? record
            : {};


    const safeAuditTrail =
        Array.isArray(auditTrail)
            ? auditTrail
            : Array.isArray(
                safeRecord.auditTrail
            )
                ? safeRecord.auditTrail
                : [];


    /* =====================================================
       INITIAL VALUES
       ===================================================== */

    const initialValues =
        useMemo(
            () => {

                if (
                    isCreateMode
                ) {
                    return {};
                }

                return {
                    ...safeRecord,
                };

            },
            [
                isCreateMode,
                safeRecord,
            ]
        );


    /* =====================================================
       RESET
       ===================================================== */

    useEffect(
        () => {

            if (open) {

                setConfirmCloseOpen(false);

                setHasChanges(false);

                setSaving(false);

            }

        },
        [
            open,
            mode,
            record,
        ]
    );


    /* =====================================================
       CHANGE HANDLER
       ===================================================== */

    const handleFormChange =
        useCallback(
            () => {

                if (
                    !isViewMode
                ) {

                    setHasChanges(true);

                }

            },
            [
                isViewMode,
            ]
        );


    /* =====================================================
       REQUEST CLOSE
       ===================================================== */

    const requestClose =
        useCallback(
            () => {

                if (
                    isViewMode
                ) {

                    onClose?.();

                    return;

                }


                if (
                    !hasChanges
                ) {

                    onClose?.();

                    return;

                }


                setConfirmCloseOpen(true);

            },
            [
                hasChanges,
                isViewMode,
                onClose,
            ]
        );


    /* =====================================================
       CONFIRM CLOSE
       ===================================================== */

    const handleConfirmClose =
        useCallback(
            () => {

                setConfirmCloseOpen(false);

                setHasChanges(false);

                onClose?.();

            },
            [
                onClose,
            ]
        );


    /* =====================================================
       CANCEL CONFIRMATION
       ===================================================== */

    const handleCancelClose =
        useCallback(
            () => {

                if (
                    saving
                ) {

                    return;

                }

                setConfirmCloseOpen(false);

            },
            [
                saving,
            ]
        );


    /* =====================================================
       SAVE DRAFT
       ===================================================== */

    const handleSaveDraft =
        useCallback(
            async (
                values
            ) => {

                try {

                    setSaving(true);


                    await onSaveDraft?.(
                        values
                    );


                    setHasChanges(false);


                    message.success(
                        "Purchase order draft saved successfully."
                    );


                    await onSuccess?.({
                        action: "SAVE",
                        payload: values,
                    });

                }
                catch (
                    error
                ) {

                    console.error(
                        "Purchase order draft save failed:",
                        error
                    );


                    message.error(
                        error?.message ||
                        "Failed to save purchase order draft."
                    );

                }
                finally {

                    setSaving(false);

                }

            },
            [
                onSaveDraft,
                onSuccess,
            ]
        );


    /* =====================================================
       SUBMIT
       ===================================================== */

    const handleSubmit =
        useCallback(
            async (
                values
            ) => {

                try {

                    setSaving(true);


                    await onSubmit?.(
                        values
                    );


                    setHasChanges(false);


                    message.success(
                        isEditMode
                            ? "Purchase order updated successfully."
                            : "Purchase order submitted for approval."
                    );


                    await onSuccess?.({
                        action: "SUBMIT",
                        payload: values,
                    });

                }
                catch (
                    error
                ) {

                    console.error(
                        "Purchase order submit failed:",
                        error
                    );


                    message.error(
                        error?.message ||
                        "Failed to submit purchase order."
                    );

                }
                finally {

                    setSaving(false);

                }

            },
            [
                isEditMode,
                onSubmit,
                onSuccess,
            ]
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <>

            <Drawer
                className="purchase-order-drawer"

                title={
                    drawerTitle
                }

                open={
                    open
                }

                width={
                    width
                }

                onClose={
                    requestClose
                }

                destroyOnClose

                maskClosable={
                    false
                }

                closable

            >

                <div
                    className="purchase-order-drawer-content"
                >

                    {/* =================================================
                       SCROLLABLE CONTENT
                       ================================================= */}

                    <div
                        className="purchase-order-drawer-scroll"
                    >

                        <PurchaseOrderForm

                            mode={
                                normalizedMode
                            }

                            initialValues={
                                initialValues
                            }

                            record={
                                safeRecord
                            }

                            auditTrail={
                                safeAuditTrail
                            }

                            loading={
                                loading ||
                                saving
                            }

                            disabled={
                                isViewMode
                            }

                            onSubmit={
                                handleSubmit
                            }

                            onSaveDraft={
                                handleSaveDraft
                            }

                            onChange={
                                handleFormChange
                            }

                        />

                    </div>


                    {/* =================================================
                       ONLY FOOTER
                       ================================================= */}

                    {!isViewMode && (

                        <div
                            className="purchase-order-form-footer"
                        >

                            <div
                                className="purchase-order-footer-actions"
                            >

                                <Button
                                    icon={
                                        <CloseOutlined />
                                    }

                                    onClick={
                                        requestClose
                                    }

                                    disabled={
                                        saving
                                    }
                                >
                                    Cancel
                                </Button>


                                <Button
                                    icon={
                                        <SaveOutlined />
                                    }

                                    onClick={() => {

                                        /*
                                         * Save Draft is intentionally
                                         * handled by PurchaseOrderForm.
                                         *
                                         * Do not create another footer
                                         * inside PurchaseOrderForm.
                                         */

                                        document
                                            .getElementById(
                                                "purchase-order-save-draft"
                                            )
                                            ?.click();

                                    }}

                                    disabled={
                                        saving
                                    }
                                >
                                    Save Draft
                                </Button>


                                <Button
                                    type="primary"

                                    icon={
                                        <SendOutlined />
                                    }

                                    onClick={() => {

                                        document
                                            .getElementById(
                                                "purchase-order-submit"
                                            )
                                            ?.click();

                                    }}

                                    loading={
                                        saving
                                    }
                                >
                                    Submit for Approval
                                </Button>

                            </div>

                        </div>

                    )}

                </div>

            </Drawer>


            {/* =====================================================
               CONFIRM CLOSE MODAL
               ===================================================== */}

            <ConfirmCloseModal

                open={
                    confirmCloseOpen
                }

                loading={
                    saving
                }

                onConfirm={
                    handleConfirmClose
                }

                onCancel={
                    handleCancelClose
                }

            />

        </>

    );

};


export default PurchaseOrderDrawer;