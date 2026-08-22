// src/modules/pharmacy/drug-route/components/DrugRouteDrawer.jsx

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import {
    CloseOutlined,
} from "@ant-design/icons";

import DrugRouteForm
    from "./DrugRouteForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";

import {
    DRUG_ROUTE_FORM_MODES,
} from "../constants/drugRoute.constants";

import {
    drugRouteList,
} from "../mock/drugRoute.mock";


const DrugRouteDrawer = ({
    open = false,

    mode =
        DRUG_ROUTE_FORM_MODES.CREATE,

    record = null,

    loading = false,

    routeList =
        drugRouteList,

    onClose,

    onSubmit,

    onSuccess,
}) => {

    /*
     * =====================================================
     * STATE
     * =====================================================
     */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);


    const [
        formDirty,
        setFormDirty,
    ] = useState(false);


    const [
        formSubmitting,
        setFormSubmitting,
    ] = useState(false);


    /*
     * =====================================================
     * REF
     * =====================================================
     *
     * Used to keep track of whether the form has
     * actually been submitted successfully.
     */

    const submittedRef =
        useRef(false);


    /*
     * =====================================================
     * MODE FLAGS
     * =====================================================
     */

    const isViewMode =
        mode ===
        DRUG_ROUTE_FORM_MODES.VIEW;


    const isCreateMode =
        mode ===
        DRUG_ROUTE_FORM_MODES.CREATE;


    /*
     * =====================================================
     * RESET DRAWER STATE
     * =====================================================
     */

    useEffect(
        () => {

            if (!open) {

                setConfirmCloseOpen(
                    false
                );

                setFormDirty(
                    false
                );

                setFormSubmitting(
                    false
                );

                submittedRef.current =
                    false;

                return;
            }


            /*
             * New drawer session
             */

            submittedRef.current =
                false;

        },
        [
            open,
        ]
    );


    /*
     * =====================================================
     * DRAWER TITLE
     * =====================================================
     */

    const getDrawerTitle =
        () => {

            if (
                mode ===
                DRUG_ROUTE_FORM_MODES.CREATE
            ) {

                return "Create Drug Route";
            }


            if (
                mode ===
                DRUG_ROUTE_FORM_MODES.EDIT
            ) {

                return "Edit Drug Route";
            }


            return "Drug Route Details";
        };


    /*
     * =====================================================
     * HANDLE CLOSE REQUEST
     * =====================================================
     */

    const handleCloseRequest =
        () => {

            /*
             * View mode has no unsaved changes.
             */

            if (
                isViewMode
            ) {

                onClose?.();

                return;
            }


            /*
             * If form is dirty,
             * ask for confirmation.
             */

            if (
                formDirty
            ) {

                setConfirmCloseOpen(
                    true
                );

                return;
            }


            /*
             * Nothing changed.
             */

            onClose?.();
        };


    /*
     * =====================================================
     * CONFIRM DISCARD
     * =====================================================
     */

    const handleConfirmClose =
        () => {

            if (
                formSubmitting
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


    /*
     * =====================================================
     * CANCEL DISCARD
     * =====================================================
     */

    const handleCancelClose =
        () => {

            setConfirmCloseOpen(
                false
            );
        };


    /*
     * =====================================================
     * FORM SUBMIT
     * =====================================================
     */

    const handleFormSubmit =
        async (
            payload,
            context
        ) => {

            setFormSubmitting(
                true
            );


            try {

                let result;


                if (
                    typeof onSubmit ===
                    "function"
                ) {

                    result =
                        await onSubmit(
                            payload,
                            context
                        );
                }


                /*
                 * Mark submit as successful.
                 */

                submittedRef.current =
                    true;


                setFormDirty(
                    false
                );


                return result;

            }
            catch (
                error
            ) {

                /*
                 * Keep drawer open if
                 * service/API failed.
                 */

                throw error;

            }
            finally {

                setFormSubmitting(
                    false
                );
            }
        };


    /*
     * =====================================================
     * FORM SUCCESS
     * =====================================================
     */

    const handleFormSuccess =
        async (
            result,
            payload
        ) => {

            setFormDirty(
                false
            );


            submittedRef.current =
                true;


            /*
             * Parent can refresh table
             * before drawer closes.
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


            /*
             * Close drawer after successful
             * save.
             */

            onClose?.();
        };


    /*
     * =====================================================
     * FORM CANCEL
     * =====================================================
     */

    const handleFormCancel =
        () => {

            handleCloseRequest();
        };


    /*
     * =====================================================
     * DRAWER WIDTH
     * =====================================================
     */

    const drawerWidth =
        isCreateMode ||
        mode ===
            DRUG_ROUTE_FORM_MODES.EDIT
            ? 720
            : 680;


    /*
     * =====================================================
     * RENDER
     * =====================================================
 */

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
                    drawerWidth
                }

                destroyOnClose

                maskClosable={
                    false
                }

                keyboard={
                    !formSubmitting
                }

                closable={
                    !formSubmitting
                }

                closeIcon={
                    <CloseOutlined />
                }

                onClose={
                    handleCloseRequest
                }

                styles={{
                    body: {
                        padding:
                            24,
                    },
                }}
            >

                <DrugRouteForm
                    mode={
                        mode
                    }

                    record={
                        record
                    }

                    loading={
                        loading ||
                        formSubmitting
                    }

                    routeList={
                        routeList
                    }

                    onSubmit={
                        handleFormSubmit
                    }

                    onCancel={
                        handleFormCancel
                    }

                    onSuccess={
                        handleFormSuccess
                    }
                />

            </Drawer>


            {/* =================================================
                CONFIRM CLOSE MODAL
            ================================================= */}

            <ConfirmCloseModal

                open={
                    confirmCloseOpen
                }

                loading={
                    formSubmitting
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


export default DrugRouteDrawer;