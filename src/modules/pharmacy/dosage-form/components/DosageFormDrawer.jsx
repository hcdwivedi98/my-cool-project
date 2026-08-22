// src/modules/pharmacy/dosage-form/components/DosageFormDrawer.jsx

import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Drawer,
    message,
} from "antd";

import {
    CloseOutlined,
    EditOutlined,
    PlusOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import DosageFormForm
    from "./DosageFormForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";

import {
    DOSAGE_FORM_FORM_MODES,
} from "../constants/dosageForm.constants";


const DosageFormDrawer = ({
    open = false,

    mode =
        DOSAGE_FORM_FORM_MODES.CREATE,

    record = null,

    loading = false,

    onClose,

    onSubmit,

    width = 760,
}) => {

    /*
     * =========================================================
     * FORM REF
     * =========================================================
     */

    const formRef =
        useRef(null);


    /*
     * =========================================================
     * CONFIRM CLOSE
     * =========================================================
     */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);


    /*
     * =========================================================
     * CLOSE LOADING
     * =========================================================
     */

    const [
        discardLoading,
        setDiscardLoading,
    ] = useState(false);


    /*
     * =========================================================
     * LOCAL MESSAGE
     * =========================================================
     */

    const [
        messageApi,
        messageContextHolder,
    ] =
        message.useMessage();


    /*
     * =========================================================
     * DRAWER TITLE
     * =========================================================
     */

    const getDrawerTitle =
        () => {

            if (
                mode ===
                DOSAGE_FORM_FORM_MODES.EDIT
            ) {

                return (
                    <>
                        <EditOutlined />

                        <span
                            style={{
                                marginLeft:
                                    8,
                            }}
                        >
                            Edit Dosage Form
                        </span>
                    </>
                );
            }


            if (
                mode ===
                DOSAGE_FORM_FORM_MODES.VIEW
            ) {

                return (
                    <>
                        <EyeOutlined />

                        <span
                            style={{
                                marginLeft:
                                    8,
                            }}
                        >
                            Dosage Form Details
                        </span>
                    </>
                );
            }


            return (
                <>
                    <PlusOutlined />

                    <span
                        style={{
                            marginLeft:
                                8,
                        }}
                    >
                        Add Dosage Form
                    </span>
                </>
            );
        };


    /*
     * =========================================================
     * DIRTY CHECK
     * =========================================================
     */

    const isFormDirty =
        useCallback(
            () => {

                if (
                    mode ===
                    DOSAGE_FORM_FORM_MODES.VIEW
                ) {
                    return false;
                }


                return Boolean(
                    formRef
                        .current
                        ?.isDirty?.()
                );
            },
            [
                mode,
            ]
        );


    /*
     * =========================================================
     * ACTUAL CLOSE
     * =========================================================
     */

    const closeDrawer =
        useCallback(
            () => {

                setConfirmCloseOpen(
                    false
                );

                setDiscardLoading(
                    false
                );


                if (
                    typeof onClose ===
                    "function"
                ) {
                    onClose();
                }
            },
            [
                onClose,
            ]
        );


    /*
     * =========================================================
     * REQUEST CLOSE
     * =========================================================
     */

    const requestClose =
        useCallback(
            () => {

                if (
                    !isFormDirty()
                ) {

                    closeDrawer();

                    return;
                }


                setConfirmCloseOpen(
                    true
                );
            },
            [
                closeDrawer,
                isFormDirty,
            ]
        );


    /*
     * =========================================================
     * CONTINUE EDITING
     * =========================================================
     */

    const handleContinueEditing =
        () => {

            if (
                discardLoading
            ) {
                return;
            }


            setConfirmCloseOpen(
                false
            );
        };


    /*
     * =========================================================
     * DISCARD CHANGES
     * =========================================================
     */

    const handleDiscard =
        async () => {

            try {

                setDiscardLoading(
                    true
                );


                /*
                 * Reset local form state before closing.
                 */

                formRef
                    .current
                    ?.reset?.();


                closeDrawer();

            }
            catch (
                error
            ) {

                messageApi.error(
                    "Unable to discard changes."
                );

            }
            finally {

                setDiscardLoading(
                    false
                );
            }
        };


    /*
     * =========================================================
     * SUBMIT
     * =========================================================
     */

    const handleSubmit =
        async (
            payload,
            context
        ) => {

            if (
                typeof onSubmit !==
                "function"
            ) {
                return;
            }


            try {

                await onSubmit(
                    payload,
                    context
                );

            }
            catch (
                error
            ) {

                /*
                 * Do not close drawer when
                 * parent/service fails.
                 */

                throw error;
            }
        };


    /*
     * =========================================================
     * ESC / DRAWER CLOSE
     * =========================================================
     */

    const handleDrawerClose =
        () => {

            requestClose();
        };


    /*
     * =========================================================
     * OPEN STATE RESET
     * =========================================================
     */

    useEffect(
        () => {

            if (
                !open
            ) {

                setConfirmCloseOpen(
                    false
                );

                setDiscardLoading(
                    false
                );
            }

        },
        [
            open,
        ]
    );


    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <>
            {
                messageContextHolder
            }


            <Drawer
                open={
                    open
                }

                title={
                    getDrawerTitle()
                }

                width={
                    width
                }

                destroyOnClose={
                    false
                }

                maskClosable={
                    false
                }

                keyboard={
                    true
                }

                closeIcon={
                    <CloseOutlined />
                }

                onClose={
                    handleDrawerClose
                }

                styles={{
                    body: {
                        padding:
                            20,
                    },

                    footer: {
                        padding:
                            0,
                    },
                }}
            >

                <DosageFormForm
                    ref={
                        formRef
                    }

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
                        requestClose
                    }
                />

            </Drawer>


            {/* =====================================================
                CONFIRM CLOSE MODAL
            ===================================================== */}

            <ConfirmCloseModal
                open={
                    confirmCloseOpen
                }

                loading={
                    discardLoading
                }

                onContinue={
                    handleContinueEditing
                }

                onDiscard={
                    handleDiscard
                }
            />

        </>
    );
};


export default DosageFormDrawer;