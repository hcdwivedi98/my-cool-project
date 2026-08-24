// src/modules/user-management/permission/components/PermissionDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import PermissionForm from "./PermissionForm";

import ConfirmCloseModal from "./ConfirmCloseModal";


/* =========================================================
   PERMISSION DRAWER
   ========================================================= */

const PermissionDrawer = ({
    open = false,

    mode = "CREATE",

    permission = null,

    loading = false,

    error = null,

    onSubmit,

    onClose,
}) => {

    /* =====================================================
       UNSAVED CHANGES
    ===================================================== */

    const [
        isDirty,
        setIsDirty,
    ] =
        useState(false);


    /* =====================================================
       CONFIRM MODAL
    ===================================================== */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] =
        useState(false);


    /* =====================================================
       RESET DIRTY STATE
    ===================================================== */

    useEffect(
        () => {

            if (
                open
            ) {

                setIsDirty(
                    false
                );

                setConfirmCloseOpen(
                    false
                );

            }

        },
        [
            open,
            permission?.id,
            mode,
        ]
    );


    /* =====================================================
       CLOSE REQUEST
    ===================================================== */

    const requestClose = () => {

        if (
            mode === "VIEW" ||
            !isDirty
        ) {

            handleClose();

            return;

        }


        setConfirmCloseOpen(
            true
        );

    };


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleClose = () => {

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
       CONFIRM DISCARD
    ===================================================== */

    const handleConfirmDiscard = () => {

        handleClose();

    };


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    const handleSubmit = async (
        values
    ) => {

        if (
            typeof onSubmit !==
            "function"
        ) {

            return;

        }


        await onSubmit(
            values
        );


        /*
         * Parent can close drawer after
         * successful API operation.
         */

    };


    /* =====================================================
       TITLE
    ===================================================== */

    const getTitle = () => {

        switch (
            mode
        ) {

            case "EDIT":

                return "Edit Permission";


            case "VIEW":

                return "Permission Details";


            case "CREATE":

            default:

                return "Create Permission";

        }

    };


    /* =====================================================
       WIDTH
    ===================================================== */

    const getWidth = () => {

        if (
            typeof window !==
            "undefined" &&
            window.innerWidth <=
                768
        ) {

            return "100%";

        }


        return 760;

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <>

            <Drawer

                className="permission-drawer"

                title={
                    getTitle()
                }

                open={
                    open
                }

                width={
                    getWidth()
                }

                destroyOnHidden

                maskClosable={
                    false
                }

                keyboard={
                    false
                }

                onClose={
                    requestClose
                }

                styles={{
                    body: {
                        padding:
                            24,
                    },
                }}

            >

                <PermissionForm

                    key={
                        permission?.id ||
                        "new-permission"
                    }

                    mode={
                        mode
                    }

                    initialValues={
                        permission
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
                        requestClose
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

                onCancel={() =>
                    setConfirmCloseOpen(
                        false
                    )
                }

                onConfirm={
                    handleConfirmDiscard
                }

            />

        </>

    );

};


export default PermissionDrawer;