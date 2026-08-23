/* =========================================================
   USER DRAWER
   ========================================================= */

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import UserForm
    from "./UserForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";

import {
    USER_FORM_MODES,
} from "../constants/user.constants";


/* =========================================================
   COMPONENT
   ========================================================= */

const UserDrawer = ({
    open = false,

    mode =
        USER_FORM_MODES.CREATE,

    record = null,

    loading = false,

    error = null,

    onClose,

    onSubmit,

    onSuccess,
}) => {

    /* =====================================================
       CONFIRM CLOSE
    ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(
        false
    );


    /* =====================================================
       FORM DIRTY STATE
    ===================================================== */

    const [
        formDirty,
        setFormDirty,
    ] = useState(
        false
    );


    /* =====================================================
       RESET INTERNAL STATE
    ===================================================== */

    useEffect(
        () => {

            if (
                !open
            ) {

                setConfirmCloseOpen(
                    false
                );

                setFormDirty(
                    false
                );

            }

        },
        [
            open,
        ]
    );


    /* =====================================================
       DRAWER TITLE
    ===================================================== */

    const getDrawerTitle =
        () => {

            if (
                mode ===
                USER_FORM_MODES.CREATE
            ) {

                return "Create User";

            }


            if (
                mode ===
                USER_FORM_MODES.EDIT
            ) {

                return "Edit User";

            }


            return "View User";

        };


    /* =====================================================
       HANDLE FORM CHANGE
       ===================================================== */

    const handleFormValuesChange =
        () => {

            if (
                mode ===
                USER_FORM_MODES.VIEW
            ) {

                return;

            }


            setFormDirty(
                true
            );

        };


    /* =====================================================
       HANDLE FORM CLOSE REQUEST
       ===================================================== */

    const handleCloseRequest =
        () => {

            if (
                loading
            ) {

                return;

            }


            /*
             * View mode has no editable
             * changes.
             */

            if (
                mode ===
                USER_FORM_MODES.VIEW
            ) {

                handleForceClose();

                return;

            }


            /*
             * No changes.
             */

            if (
                !formDirty
            ) {

                handleForceClose();

                return;

            }


            /*
             * Changes exist.
             */

            setConfirmCloseOpen(
                true
            );

        };


    /* =====================================================
       FORCE CLOSE
       ===================================================== */

    const handleForceClose =
        () => {

            if (
                loading
            ) {

                return;

            }


            setConfirmCloseOpen(
                false
            );

            setFormDirty(
                false
            );


            onClose?.();

        };


    /* =====================================================
       CANCEL CONFIRM
       ===================================================== */

    const handleConfirmCancel =
        () => {

            if (
                loading
            ) {

                return;

            }


            setConfirmCloseOpen(
                false
            );

        };


    /* =====================================================
       CONFIRM DISCARD
       ===================================================== */

    const handleConfirmDiscard =
        () => {

            if (
                loading
            ) {

                return;

            }


            handleForceClose();

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
             * Save completed successfully.
             * Changes are no longer dirty.
             */

            setFormDirty(
                false
            );


            return result;

        };


    /* =====================================================
       FORM SUCCESS
       ===================================================== */

    const handleSuccess =
        async (
            result
        ) => {

            setFormDirty(
                false
            );


            await onSuccess?.(
                result
            );

        };


    /* =====================================================
       DRAWER
    ===================================================== */

    return (

        <>

            <Drawer
                open={
                    open
                }

                title={
                    getDrawerTitle()
                }

                placement="right"

                width={
                    720
                }

                onClose={
                    handleCloseRequest
                }

                closable={
                    !loading
                }

                maskClosable={
                    !loading
                }

                keyboard={
                    !loading
                }

                destroyOnClose

                className="user-drawer"

                styles={{
                    body: {
                        padding: 24,
                    },
                }}
            >

                <UserForm
                    key={
                        `${mode}-${record?.id || "new"}`
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

                    error={
                        error
                    }

                    onSubmit={
                        handleSubmit
                    }

                    onClose={
                        handleCloseRequest
                    }

                    onSuccess={
                        handleSuccess
                    }

                    onValuesChange={
                        handleFormValuesChange
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


export default UserDrawer;