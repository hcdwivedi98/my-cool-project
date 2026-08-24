// src/modules/user-management/role/components/RoleDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import RoleForm
    from "./RoleForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";

import {
    ROLE_FORM_MODES,
} from "../constants/role.constants";


/* =========================================================
   ROLE DRAWER
   ========================================================= */

const RoleDrawer = ({
    open = false,

    mode =
        ROLE_FORM_MODES.CREATE,

    record = null,

    roles = [],

    permissions = [],

    loading = false,

    error = null,

    onClose,

    onSubmit,

    onSuccess,

}) => {

    /* =====================================================
       CONFIRM MODAL
    ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(
        false
    );


    /* =====================================================
       FORM DIRTY
    ===================================================== */

    const [
        formDirty,
        setFormDirty,
    ] = useState(
        false
    );


    /* =====================================================
       RESET DIRTY STATE
    ===================================================== */

    useEffect(
        () => {

            if (
                !open
            ) {

                setFormDirty(
                    false
                );

                setConfirmCloseOpen(
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

            switch (
                mode
            ) {

                case ROLE_FORM_MODES.EDIT:

                    return "Edit Role";


                case ROLE_FORM_MODES.VIEW:

                    return "View Role";


                case ROLE_FORM_MODES.CREATE:

                default:

                    return "Add Role";

            }

        };


    /* =====================================================
       HANDLE FORM CHANGE
    ===================================================== */

    const handleFormChange =
        () => {

            if (
                mode ===
                ROLE_FORM_MODES.VIEW
            ) {

                return;

            }


            setFormDirty(
                true
            );

        };


    /* =====================================================
       HANDLE SUBMIT
    ===================================================== */

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


            const result =
                await onSubmit(
                    payload,
                    context
                );


            /*
             * Successful submit means
             * there are no unsaved changes.
             */

            setFormDirty(
                false
            );


            if (
                typeof onSuccess ===
                "function"
            ) {

                await onSuccess(
                    result
                );

            }


            return result;

        };


    /* =====================================================
       CLOSE REQUEST
    ===================================================== */

    const handleCloseRequest =
        () => {

            if (
                loading
            ) {

                return;

            }


            if (
                mode ===
                ROLE_FORM_MODES.VIEW
            ) {

                onClose?.();

                return;

            }


            if (
                formDirty
            ) {

                setConfirmCloseOpen(
                    true
                );

                return;

            }


            onClose?.();

        };


    /* =====================================================
       CONFIRM DISCARD
    ===================================================== */

    const handleConfirmDiscard =
        () => {

            setConfirmCloseOpen(
                false
            );


            setFormDirty(
                false
            );


            onClose?.();

        };


    /* =====================================================
       CANCEL DISCARD
    ===================================================== */

    const handleCancelDiscard =
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
       FORM CANCEL
    ===================================================== */

    const handleFormCancel =
        () => {

            handleCloseRequest();

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

                className="role-drawer"

                title={
                    getDrawerTitle()
                }

                placement="right"

                open={
                    open
                }

                width={
                    720
                }

                destroyOnClose

                maskClosable={
                    false
                }

                closable={
                    !loading
                }

                onClose={
                    handleCloseRequest
                }

                styles={{
                    body: {
                        padding:
                            0,
                    },
                }}

            >

                <div
                    className="role-drawer-body"
                    onChange={
                        handleFormChange
                    }
                >

                    <RoleForm

                        key={
                            record?.id ||
                            "new-role"
                        }

                        mode={
                            mode
                        }

                        record={
                            record
                        }

                        roles={
                            roles
                        }

                        permissions={
                            permissions
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

                        onCancel={
                            handleFormCancel
                        }

                    />

                </div>

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
                    handleCancelDiscard
                }

                onConfirm={
                    handleConfirmDiscard
                }

            />

        </>

    );

};


export default RoleDrawer;