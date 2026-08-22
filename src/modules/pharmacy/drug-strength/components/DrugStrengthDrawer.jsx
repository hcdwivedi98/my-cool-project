// src/modules/pharmacy/drug-strength/components/DrugStrengthDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import {
    CloseOutlined,
} from "@ant-design/icons";

import {
    DRUG_STRENGTH_FORM_MODES,
} from "../constants/drugStrength.constants";

import DrugStrengthForm
    from "./DrugStrengthForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";


/* =========================================================
   DRUG STRENGTH DRAWER
   ========================================================= */

const DrugStrengthDrawer = ({
    open = false,

    mode =
        DRUG_STRENGTH_FORM_MODES.CREATE,

    record =
        null,

    loading =
        false,

    strengthList =
        [],

    onClose,

    onSubmit,

    onSuccess,
}) => {


    /* =====================================================
       CLOSE CONFIRMATION
    ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);


    /* =====================================================
       FORM DIRTY STATE
    ===================================================== */

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);


    /* =====================================================
       DRAWER TITLE
    ===================================================== */

    const getDrawerTitle =
        () => {

            if (
                mode ===
                DRUG_STRENGTH_FORM_MODES.EDIT
            ) {
                return "Edit Drug Strength";
            }


            if (
                mode ===
                DRUG_STRENGTH_FORM_MODES.VIEW
            ) {
                return "Drug Strength Details";
            }


            return "Add Drug Strength";
        };


    /* =====================================================
       DRAWER WIDTH
    ===================================================== */

    const drawerWidth =
        720;


    /* =====================================================
       RESET STATE WHEN DRAWER OPENS
    ===================================================== */

    useEffect(
        () => {

            if (
                open
            ) {

                setConfirmCloseOpen(
                    false
                );

                setIsDirty(
                    false
                );

            }

        },
        [
            open,
            record,
            mode,
        ]
    );


    /* =====================================================
       REQUEST CLOSE
    ===================================================== */

    const requestClose =
        () => {

            /*
             * View mode has no editable changes.
             */

            if (
                mode ===
                DRUG_STRENGTH_FORM_MODES.VIEW
            ) {

                if (
                    typeof onClose ===
                    "function"
                ) {
                    onClose();
                }

                return;
            }


            /*
             * If form is not dirty,
             * close immediately.
             */

            if (
                !isDirty
            ) {

                if (
                    typeof onClose ===
                    "function"
                ) {
                    onClose();
                }

                return;
            }


            /*
             * Otherwise show confirmation.
             */

            setConfirmCloseOpen(
                true
            );
        };


    /* =====================================================
       CONFIRM CLOSE
    ===================================================== */

    const handleConfirmClose =
        () => {

            setConfirmCloseOpen(
                false
            );

            setIsDirty(
                false
            );


            if (
                typeof onClose ===
                "function"
            ) {

                onClose();

            }
        };


    /* =====================================================
       CANCEL CLOSE
    ===================================================== */

    const handleCancelClose =
        () => {

            setConfirmCloseOpen(
                false
            );
        };


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    const handleSubmit =
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
             * Successful save means
             * there are no unsaved changes.
             */

            setIsDirty(
                false
            );


            return result;
        };


    /* =====================================================
       FORM SUCCESS
    ===================================================== */

    const handleSuccess =
        async (
            result,
            payload
        ) => {

            setIsDirty(
                false
            );


            if (
                typeof onSuccess ===
                "function"
            ) {

                await onSuccess(
                    result,
                    payload
                );

            }
        };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <>

            {/* =================================================
                DRAWER
            ================================================= */}

            <Drawer

                open={
                    open
                }

                title={
                    getDrawerTitle()
                }

                width={
                    drawerWidth
                }

                destroyOnHidden

                maskClosable={
                    false
                }

                keyboard={
                    !loading
                }

                closable={
                    !loading
                }

                closeIcon={
                    <CloseOutlined />
                }

                onClose={
                    requestClose
                }

                styles={{
                    body: {
                        padding:
                            24,
                    },

                    footer: {
                        padding:
                            16,
                    },
                }}

            >

                {/* =============================================
                    FORM
                ============================================== */}

                <DrugStrengthForm

                    mode={
                        mode
                    }

                    record={
                        record
                    }

                    strengthList={
                        strengthList
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

                    onSuccess={
                        handleSuccess
                    }

                />

            </Drawer>


            {/* =================================================
                CLOSE CONFIRMATION
            ================================================= */}

            <ConfirmCloseModal

                open={
                    confirmCloseOpen
                }

                loading={
                    loading
                }

                onCancel={
                    handleCancelClose
                }

                onConfirm={
                    handleConfirmClose
                }

            />

        </>
    );
};


export default DrugStrengthDrawer;