// src/modules/pharmacy/generic/components/GenericDrawer.jsx

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Button,
    Drawer,
    Space,
    Typography,
    message,
} from "antd";

import {
    CloseOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import GenericForm from "./GenericForm";

import ConfirmCloseModal from "./ConfirmCloseModal";

const {
    Text,
} = Typography;

const GenericDrawer = ({
    open = false,

    mode = "ADD",

    record = null,

    loading = false,

    onClose,

    onSubmit,
}) => {
    /*
     * =========================================
     * Form Ref
     * =========================================
     */

    const formRef =
        useRef(null);

    /*
     * =========================================
     * Dirty State
     * =========================================
     */

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);

    /*
     * =========================================
     * Confirm Close
     * =========================================
     */

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);

    /*
     * =========================================
     * Mode
     * =========================================
     */

    const isAdd =
        mode === "ADD";

    const isEdit =
        mode === "EDIT";

    const isView =
        mode === "VIEW";

    /*
     * =========================================
     * Drawer Title
     * =========================================
     */

    const drawerTitle =
        useMemo(() => {
            if (isAdd) {
                return "Add Generic";
            }

            if (isEdit) {
                return "Edit Generic";
            }

            if (isView) {
                return "Generic Details";
            }

            return "Generic";
        }, [
            isAdd,
            isEdit,
            isView,
        ]);

    /*
     * =========================================
     * Reset State When Drawer Closes
     * =========================================
     */

    useEffect(() => {
        if (!open) {
            setIsDirty(false);

            setConfirmCloseOpen(
                false
            );
        }
    }, [open]);

    /*
     * =========================================
     * Dirty Change Handler
     * =========================================
     */

    const handleDirtyChange =
        useCallback(
            (dirty) => {
                setIsDirty(
                    Boolean(dirty)
                );
            },
            []
        );

    /*
     * =========================================
     * Request Close
     * =========================================
     */

    const requestClose =
        useCallback(() => {
            /*
             * View mode me confirmation
             * ki zarurat nahi.
             */

            if (
                isView
            ) {
                onClose?.();

                return;
            }

            /*
             * Add/Edit me dirty form ho
             * to confirmation dikhao.
             */

            if (isDirty) {
                setConfirmCloseOpen(
                    true
                );

                return;
            }

            onClose?.();
        }, [
            isDirty,
            isView,
            onClose,
        ]);

    /*
     * =========================================
     * Confirm Discard
     * =========================================
     */

    const handleConfirmDiscard =
        useCallback(() => {
            setConfirmCloseOpen(
                false
            );

            setIsDirty(false);

            onClose?.();
        }, [
            onClose,
        ]);

    /*
     * =========================================
     * Cancel Discard
     * =========================================
     */

    const handleCancelDiscard =
        useCallback(() => {
            setConfirmCloseOpen(
                false
            );
        }, []);

    /*
     * =========================================
     * Form Submit
     * =========================================
     */

    const handleFormSubmit =
        useCallback(
            async (
                payload,
                context
            ) => {
                try {
                    await onSubmit?.(
                        payload,
                        context
                    );

                    setIsDirty(
                        false
                    );
                } catch (error) {
                    console.error(
                        "Generic submit error:",
                        error
                    );

                    message.error(
                        error?.message ||
                            "Unable to save generic."
                    );

                    throw error;
                }
            },
            [onSubmit]
        );

    /*
     * =========================================
     * Save
     * =========================================
     */

    const handleSave =
        useCallback(
            async () => {
                if (
                    !formRef.current
                ) {
                    return;
                }

                try {
                    /*
                     * First validation.
                     */

                    await formRef.current.validate();

                    /*
                     * Validation successful,
                     * then submit.
                     */

                    formRef.current.submit();
                } catch (error) {
                    /*
                     * Ant Design Form already
                     * displays validation errors.
                     */

                    console.debug(
                        "Generic validation failed:",
                        error
                    );
                }
            },
            []
        );

    /*
     * =========================================
     * Footer
     * =========================================
     */

    const renderFooter =
        () => {
            /*
             * VIEW
             */

            if (isView) {
                return (
                    <Space>
                        <Button
                            onClick={
                                requestClose
                            }
                        >
                            Close
                        </Button>
                    </Space>
                );
            }

            /*
             * ADD / EDIT
             */

            return (
                <Space>
                    <Button
                        icon={
                            <CloseOutlined />
                        }
                        onClick={
                            requestClose
                        }
                        disabled={
                            loading
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        icon={
                            <SaveOutlined />
                        }
                        loading={
                            loading
                        }
                        onClick={
                            handleSave
                        }
                    >
                        {isEdit
                            ? "Update Generic"
                            : "Save Generic"}
                    </Button>
                </Space>
            );
        };

    /*
     * =========================================
     * Render
     * =========================================
     */

    return (
        <>
            <Drawer
                open={open}
                placement="right"
                width={780}
                destroyOnClose
                maskClosable={false}
                onClose={
                    requestClose
                }
                title={
                    <div
                        style={{
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "space-between",
                            paddingRight:
                                28,
                        }}
                    >
                        <Text strong>
                            {drawerTitle}
                        </Text>

                        {record?.genericCode && (
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
                                    record.genericCode
                                }
                            </Text>
                        )}
                    </div>
                }
                footer={
                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "flex-end",
                        }}
                    >
                        {renderFooter()}
                    </div>
                }
                styles={{
                    body: {
                        padding:
                            "12px 20px",
                    },

                    footer: {
                        padding:
                            "10px 20px",
                    },
                }}
            >
                <GenericForm
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
                        handleFormSubmit
                    }
                    onDirtyChange={
                        handleDirtyChange
                    }
                />
            </Drawer>

            <ConfirmCloseModal
                open={
                    confirmCloseOpen
                }
                onCancel={
                    handleCancelDiscard
                }
                onConfirm={
                    handleConfirmDiscard
                }
                loading={
                    loading
                }
            />
        </>
    );
};

export default GenericDrawer;