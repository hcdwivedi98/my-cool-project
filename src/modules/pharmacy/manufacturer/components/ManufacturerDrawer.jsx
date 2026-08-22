// src/modules/pharmacy/manufacturer/components/ManufacturerDrawer.jsx

import React, {
    useCallback,
    useEffect,
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

import ManufacturerForm from "./ManufacturerForm";

import ConfirmCloseModal from "./ConfirmCloseModal";

const {
    Text,
} = Typography;

const ManufacturerDrawer = ({
    open = false,

    mode = "ADD",

    record = null,

    loading = false,

    onClose,

    onSubmit,
}) => {
    const formRef =
        useRef(null);

    const [
        isDirty,
        setIsDirty,
    ] = useState(false);

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);

    /*
     * =========================================
     * Mode Helpers
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

    const getDrawerTitle =
        () => {
            if (isAdd) {
                return "Add Manufacturer";
            }

            if (isEdit) {
                return "Edit Manufacturer";
            }

            if (isView) {
                return "Manufacturer Details";
            }

            return "Manufacturer";
        };

    /*
     * =========================================
     * Reset Internal State
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
     * Request Close
     * =========================================
     */

    const requestClose =
        useCallback(() => {
            if (
                isDirty &&
                !isView
            ) {
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
        () => {
            setConfirmCloseOpen(
                false
            );

            setIsDirty(false);

            onClose?.();
        };

    /*
     * =========================================
     * Cancel Discard
     * =========================================
     */

    const handleCancelDiscard =
        () => {
            setConfirmCloseOpen(
                false
            );
        };

    /*
     * =========================================
     * Form Submit
     * =========================================
     */

    const handleFormSubmit =
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
                    "Manufacturer submit error:",
                    error
                );

                message.error(
                    error?.message ||
                        "Unable to save manufacturer."
                );

                throw error;
            }
        };

    /*
     * =========================================
     * Save Button
     * =========================================
     */

    const handleSave =
        async () => {
            if (
                !formRef.current
            ) {
                return;
            }

            try {
                await formRef.current.validate();

                formRef.current.submit();
            } catch (error) {
                // Validation errors are already
                // displayed by Ant Design Form.
                console.debug(
                    "Manufacturer validation failed:",
                    error
                );
            }
        };

    /*
     * =========================================
     * Drawer Footer
     * =========================================
     */

    const renderFooter =
        () => {
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
                            ? "Update Manufacturer"
                            : "Save Manufacturer"}
                    </Button>
                </Space>
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
                            justifyContent:
                                "space-between",
                            paddingRight: 32,
                        }}
                    >
                        <Text strong>
                            {getDrawerTitle()}
                        </Text>

                        {record?.manufacturerCode && (
                            <Text
                                type="secondary"
                                style={{
                                    fontSize: 12,
                                }}
                            >
                                {
                                    record.manufacturerCode
                                }
                            </Text>
                        )}
                    </div>
                }
                placement="right"
                width={760}
                destroyOnClose
                maskClosable={
                    false
                }
                closable
                onClose={
                    requestClose
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
                            "16px 20px",
                    },

                    footer: {
                        padding:
                            "10px 20px",
                    },
                }}
            >
                <ManufacturerForm
                    ref={
                        formRef
                    }
                    mode={
                        mode
                    }
                    record={
                        record
                    }
                    onSubmit={
                        handleFormSubmit
                    }
                    onDirtyChange={
                        setIsDirty
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
            />
        </>
    );
};

export default ManufacturerDrawer;