// src/modules/pharmacy/uom/components/UomDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
    Typography,
} from "antd";

import {
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import UomForm from "./UomForm";

import ConfirmCloseModal from "./ConfirmCloseModal";


const {
    Text,
} = Typography;


const UomDrawer = ({
    open = false,

    mode = "ADD",

    record = null,

    loading = false,

    onClose,

    onSubmit,

    width = 760,
}) => {
    /*
     * ============================================
     * LOCAL FORM MODE
     * ============================================
     */

    const [
        currentMode,
        setCurrentMode,
    ] = useState(
        mode
    );


    /*
     * ============================================
     * DIRTY STATE
     * ============================================
     */

    const [
        isDirty,
        setIsDirty,
    ] = useState(
        false
    );


    /*
     * ============================================
     * CONFIRM MODAL
     * ============================================
     */

    const [
        confirmOpen,
        setConfirmOpen,
    ] = useState(
        false
    );


    /*
     * ============================================
     * RESET WHEN DRAWER OPENS
     * ============================================
     */

    useEffect(() => {
        if (open) {
            setCurrentMode(
                mode
            );

            setIsDirty(
                false
            );

            setConfirmOpen(
                false
            );
        }
    }, [
        open,
        mode,
        record?.id,
    ]);


    /*
     * ============================================
     * MODE
     * ============================================
     */

    const isAddMode =
        currentMode ===
        "ADD";

    const isEditMode =
        currentMode ===
        "EDIT";

    const isViewMode =
        currentMode ===
        "VIEW";


    /*
     * ============================================
     * DRAWER TITLE
     * ============================================
     */

    const getDrawerTitle =
        () => {
            if (
                isAddMode
            ) {
                return (
                    "Add UOM"
                );
            }

            if (
                isEditMode
            ) {
                return (
                    "Edit UOM"
                );
            }

            return (
                "UOM Details"
            );
        };


    /*
     * ============================================
     * DRAWER ICON
     * ============================================
     */

    const getDrawerIcon =
        () => {
            if (
                isAddMode
            ) {
                return (
                    <PlusOutlined />
                );
            }

            if (
                isEditMode
            ) {
                return (
                    <EditOutlined />
                );
            }

            return (
                <EyeOutlined />
            );
        };


    /*
     * ============================================
     * CLOSE REQUEST
     * ============================================
     */

    const requestClose =
        () => {
            /*
             * VIEW mode never has
             * unsaved changes.
             */

            if (
                isViewMode ||
                !isDirty
            ) {
                handleClose();
                return;
            }


            /*
             * ADD / EDIT with
             * unsaved changes.
             */

            setConfirmOpen(
                true
            );
        };


    /*
     * ============================================
     * FINAL CLOSE
     * ============================================
     */

    const handleClose =
        () => {
            setConfirmOpen(
                false
            );

            setIsDirty(
                false
            );

            if (
                onClose
            ) {
                onClose();
            }
        };


    /*
     * ============================================
     * CANCEL CONFIRMATION
     * ============================================
     */

    const handleConfirmCancel =
        () => {
            setConfirmOpen(
                false
            );
        };


    /*
     * ============================================
     * CONFIRM DISCARD
     * ============================================
     */

    const handleConfirmDiscard =
        () => {
            handleClose();
        };


    /*
     * ============================================
     * SUBMIT
     * ============================================
     */

    const handleSubmit =
        async (
            payload,
            meta
        ) => {
            if (
                !onSubmit
            ) {
                return;
            }

            await onSubmit(
                payload,
                meta
            );

            /*
             * Parent service is responsible
             * for closing the drawer after
             * successful save if required.
             *
             * We reset dirty state here
             * because the current form has
             * successfully submitted.
             */

            setIsDirty(
                false
            );
        };


    /*
     * ============================================
     * VIEW → EDIT
     * ============================================
     */

    const handleEdit =
        () => {
            setCurrentMode(
                "EDIT"
            );

            setIsDirty(
                false
            );
        };


    /*
     * ============================================
     * DRAWER SUBTITLE
     * ============================================
     */

    const getSubtitle =
        () => {
            if (
                isAddMode
            ) {
                return (
                    "Create a new Unit of Measure"
                );
            }

            if (
                isEditMode
            ) {
                return (
                    "Update Unit of Measure information"
                );
            }

            return (
                "View Unit of Measure information"
            );
        };


    return (
        <>
            <Drawer
                open={open}

                title={
                    <div
                        style={{
                            display:
                                "flex",
                            alignItems:
                                "center",
                            gap: 10,
                        }}
                    >
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius:
                                    8,
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                background:
                                    "#f5f5f5",
                            }}
                        >
                            {getDrawerIcon()}
                        </div>

                        <div>
                            <div
                                style={{
                                    fontWeight:
                                        600,
                                    fontSize:
                                        16,
                                }}
                            >
                                {
                                    getDrawerTitle()
                                }
                            </div>

                            <Text
                                type="secondary"
                                style={{
                                    fontSize:
                                        12,
                                    fontWeight:
                                        400,
                                }}
                            >
                                {
                                    getSubtitle()
                                }
                            </Text>
                        </div>
                    </div>
                }

                placement="right"

                width={width}

                destroyOnHidden

                maskClosable={false}

                keyboard={
                    !loading &&
                    !confirmOpen
                }

                closable={
                    !loading
                }

                onClose={
                    requestClose
                }

                styles={{
                    body: {
                        padding:
                            "20px 24px 24px",
                        background:
                            "#fafafa",
                    },

                    header: {
                        padding:
                            "14px 20px",
                    },
                }}
            >
                <UomForm
                    key={`${currentMode}-${record?.id || "new"}`}

                    mode={
                        currentMode
                    }

                    initialValues={
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

                    onEdit={
                        handleEdit
                    }

                    onDirtyChange={
                        setIsDirty
                    }
                />
            </Drawer>


            {/* ================================= */}
            {/* CONFIRM CLOSE MODAL */}
            {/* ================================= */}

            <ConfirmCloseModal
                open={
                    confirmOpen
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


export default UomDrawer;