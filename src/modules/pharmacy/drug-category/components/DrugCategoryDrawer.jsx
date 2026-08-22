// src/modules/pharmacy/drug-category/components/DrugCategoryDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
} from "antd";

import {
    EyeOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import DrugCategoryForm, {
    DRUG_CATEGORY_FORM_MODES,
} from "./DrugCategoryForm";

import ConfirmCloseModal
    from "./ConfirmCloseModal";


/*
 * =========================================================
 * DRAWER
 * =========================================================
 */

const DrugCategoryDrawer = ({
    open = false,

    mode =
        DRUG_CATEGORY_FORM_MODES.CREATE,

    record = null,

    loading = false,

    onClose,

    onSubmit,
}) => {

    /*
     * =====================================================
     * LOCAL STATE
     * =====================================================
     */

    const [
        showConfirmClose,
        setShowConfirmClose,
    ] = useState(false);

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);


    /*
     * =====================================================
     * MODE FLAGS
     * =====================================================
     */

    const isCreateMode =
        mode ===
        DRUG_CATEGORY_FORM_MODES.CREATE;

    const isEditMode =
        mode ===
        DRUG_CATEGORY_FORM_MODES.EDIT;

    const isViewMode =
        mode ===
        DRUG_CATEGORY_FORM_MODES.VIEW;


    /*
     * =====================================================
     * RESET DRAWER STATE
     * =====================================================
     */

    useEffect(() => {

        if (!open) {
            setShowConfirmClose(false);
            setIsDirty(false);
        }

    }, [
        open,
    ]);


    /*
     * =====================================================
     * DRAWER TITLE
     * =====================================================
     */

    const getDrawerTitle = () => {

        if (isCreateMode) {
            return "Add Drug Category";
        }

        if (isEditMode) {
            return "Edit Drug Category";
        }

        return "Drug Category Details";
    };


    /*
     * =====================================================
     * DRAWER SUBTITLE
     * =====================================================
     */

    const getDrawerSubtitle = () => {

        if (isCreateMode) {
            return "Create a new drug category";
        }

        if (isEditMode) {
            return "Update drug category information";
        }

        return "View drug category information";
    };


    /*
     * =====================================================
     * REQUEST CLOSE
     * =====================================================
     */

    const requestClose = () => {

        if (
            isViewMode ||
            !isDirty
        ) {
            handleForceClose();
            return;
        }

        setShowConfirmClose(true);
    };


    /*
     * =====================================================
     * FORCE CLOSE
     * =====================================================
     */

    const handleForceClose = () => {

        setShowConfirmClose(false);

        setIsDirty(false);

        onClose?.();
    };


    /*
     * =====================================================
     * CANCEL CONFIRMATION
     * =====================================================
     */

    const handleCancelConfirmation = () => {

        if (loading) {
            return;
        }

        setShowConfirmClose(false);
    };


    /*
     * =====================================================
     * FORM SUBMIT
     * =====================================================
     */

    const handleSubmit = async (
        payload,
        context
    ) => {

        await onSubmit?.(
            payload,
            context
        );

        /*
         * If parent operation succeeds,
         * reset local dirty state.
         */

        setIsDirty(false);
    };


    /*
     * =====================================================
     * FORM CANCEL
     * =====================================================
     */

    const handleFormCancel = (
        formState
    ) => {

        setIsDirty(
            Boolean(
                formState?.isDirty
            )
        );

        requestClose();
    };


    /*
     * =====================================================
     * DRAWER WIDTH
     * =====================================================
     */

    const drawerWidth =
        "min(720px, 100vw)";


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <>
            <Drawer
                open={open}

                width={
                    drawerWidth
                }

                placement="right"

                destroyOnClose={false}

                maskClosable={
                    !isDirty &&
                    !loading
                }

                keyboard={
                    !isDirty &&
                    !loading
                }

                closable={
                    !loading
                }

                onClose={
                    requestClose
                }

                title={
                    <div className="drug-category-drawer-header">

                        <div className="drug-category-drawer-title">

                            <div className="drug-category-drawer-title-icon">

                                {isCreateMode ? (
                                    <PlusOutlined />
                                ) : (
                                    <EyeOutlined />
                                )}

                            </div>

                            <div>

                                <div className="drug-category-drawer-title-text">
                                    {
                                        getDrawerTitle()
                                    }
                                </div>

                                <div className="drug-category-drawer-subtitle">
                                    {
                                        getDrawerSubtitle()
                                    }
                                </div>

                            </div>

                        </div>

                    </div>
                }

                styles={{
                    body: {
                        padding: 20,
                        background:
                            "#f7f8fa",
                    },

                    header: {
                        padding:
                            "14px 20px",
                    },

                    footer: {
                        padding:
                            "12px 20px",
                    },
                }}
            >

                {/* =================================================
                    FORM
                ================================================= */}

                <DrugCategoryForm
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
                />

            </Drawer>


            {/* =====================================================
                CONFIRM CLOSE MODAL
            ===================================================== */}

            <ConfirmCloseModal
                open={
                    showConfirmClose
                }

                loading={
                    loading
                }

                title="Discard Changes?"

                message={
                    "You have unsaved changes. Are you sure you want to close without saving?"
                }

                confirmText="Discard Changes"

                cancelText="Continue Editing"

                onConfirm={
                    handleForceClose
                }

                onCancel={
                    handleCancelConfirmation
                }
            />
        </>
    );
};


export default DrugCategoryDrawer;