/* =========================================================
   DRUG UNIT DRAWER
   ========================================================= */

import React, {
    useCallback,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import {
    CloseOutlined,
} from "@ant-design/icons";


import {
    DRUG_UNIT_FORM_MODES,
} from "../constants/drugUnit.constants";


import DrugUnitForm
    from "./DrugUnitForm";


import ConfirmCloseModal
    from "./ConfirmCloseModal";


/* =========================================================
   COMPONENT
   ========================================================= */

const DrugUnitDrawer = ({
    open = false,

    mode =
        DRUG_UNIT_FORM_MODES.CREATE,

    record = null,

    loading = false,

    onClose,

    onSubmit,

    onSuccess,
}) => {

    /* =====================================================
       DIRTY STATE
       ===================================================== */

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);


    /* =====================================================
       CONFIRM MODAL
       ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
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


    /* =====================================================
       TITLE
       ===================================================== */

    const drawerTitle =
        isCreateMode
            ? "Create Drug Unit"
            : isEditMode
                ? "Edit Drug Unit"
                : "Drug Unit Details";


    /* =====================================================
       HANDLE DIRTY
       ===================================================== */

    const handleDirtyChange =
        useCallback(
            (
                dirty
            ) => {

                setIsDirty(
                    dirty
                );

            },
            []
        );


    /* =====================================================
       FORCE CLOSE
       ===================================================== */

    const forceClose =
        useCallback(
            () => {

                setConfirmCloseOpen(
                    false
                );

                setIsDirty(
                    false
                );

                onClose?.();

            },
            [
                onClose,
            ]
        );


    /* =====================================================
       CLOSE REQUEST
       ===================================================== */

    const handleCloseRequest =
        useCallback(
            () => {

                /*
                 * View mode has no unsaved changes.
                 */

                if (
                    isViewMode
                ) {

                    forceClose();

                    return;
                }


                /*
                 * Nothing changed.
                 */

                if (
                    !isDirty
                ) {

                    forceClose();

                    return;
                }


                /*
                 * Unsaved changes exist.
                 */

                setConfirmCloseOpen(
                    true
                );

            },
            [
                isViewMode,
                isDirty,
                forceClose,
            ]
        );


    /* =====================================================
       CANCEL CONFIRMATION
       ===================================================== */

    const handleConfirmCancel =
        useCallback(
            () => {

                setConfirmCloseOpen(
                    false
                );

            },
            []
        );


    /* =====================================================
       CONFIRM DISCARD
       ===================================================== */

    const handleConfirmDiscard =
        useCallback(
            () => {

                forceClose();

            },
            [
                forceClose,
            ]
        );


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    const handleSubmit =
        useCallback(
            async (
                payload,
                context
            ) => {

                const result =
                    await onSubmit?.(
                        payload,
                        context
                    );


                /*
                 * Parent service successfully
                 * completed the operation.
                 */

                if (
                    result !== false
                ) {

                    setIsDirty(
                        false
                    );

                    await onSuccess?.(
                        result,
                        context
                    );

                }


                return result;

            },
            [
                onSubmit,
                onSuccess,
            ]
        );


    /* =====================================================
       FORM CANCEL
       ===================================================== */

    const handleFormCancel =
        useCallback(
            () => {

                handleCloseRequest();

            },
            [
                handleCloseRequest,
            ]
        );


    /* =====================================================
       DRAWER CLOSED
       ===================================================== */

    const handleAfterOpenChange =
        useCallback(
            (
                visible
            ) => {

                if (
                    !visible
                ) {

                    setConfirmCloseOpen(
                        false
                    );

                    setIsDirty(
                        false
                    );
                }

            },
            []
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <>

            {/* =================================================
                DRAWER
            ================================================= */}

            <Drawer

                className="drug-unit-drawer"

                title={
                    drawerTitle
                }

                placement="right"

                width={
                    isViewMode
                        ? 720
                        : 760
                }

                open={
                    open
                }

                destroyOnClose

                closable

                closeIcon={
                    <CloseOutlined />
                }

                maskClosable={
                    !loading
                }

                keyboard={
                    !loading
                }

                onClose={
                    handleCloseRequest
                }

                afterOpenChange={
                    handleAfterOpenChange
                }

            >

                <DrugUnitForm

                    mode={
                        mode
                    }

                    record={
                        record
                    }

                    loading={
                        loading
                    }

                    onSubmit={
                        handleSubmit
                    }

                    onCancel={
                        handleFormCancel
                    }

                    onDirtyChange={
                        handleDirtyChange
                    }

                />

            </Drawer>


            {/* =================================================
                CONFIRM CLOSE
            ================================================= */}

            <ConfirmCloseModal

                open={
                    confirmCloseOpen
                }

                loading={
                    loading
                }

                onCancel={
                    handleConfirmCancel
                }

                onConfirm={
                    handleConfirmDiscard
                }

            />

        </>
    );
};


export default DrugUnitDrawer;