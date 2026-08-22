// src/modules/pharmacy/supplier/components/SupplierDrawer.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    Button,
    Drawer,
    Form,
    Space,
    message,
} from "antd";

import {
    CloseOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import SupplierForm from "./SupplierForm";

import ConfirmCloseModal from "./ConfirmCloseModal";

import useSupplierLookup from "../hooks/useSupplierLookup";

import {
    getDefaultSupplierValues,
    mapSupplierToForm,
    prepareSupplierPayload,
} from "../utils/supplier.helper";

const SupplierDrawer = ({
    open = false,

    mode = "ADD",

    record = null,

    onClose,

    onSave,
}) => {
    const [form] = Form.useForm();

    const lookup =
        useSupplierLookup();

    const [activeTab, setActiveTab] =
        useState("basic");

    const [dirty, setDirty] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [
        confirmCloseOpen,
        setConfirmCloseOpen,
    ] = useState(false);

    const normalizedMode =
        String(mode).toUpperCase();

    const readOnly =
        normalizedMode === "VIEW";

    /*
     * -----------------------------------------
     * Drawer Title
     * -----------------------------------------
     */

    const getTitle = () => {
        if (
            normalizedMode ===
            "VIEW"
        ) {
            return "View Supplier";
        }

        if (
            normalizedMode ===
            "EDIT"
        ) {
            return "Edit Supplier";
        }

        return "Add Supplier";
    };

    /*
     * -----------------------------------------
     * Initialize Form
     * -----------------------------------------
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        setActiveTab("basic");
        setDirty(false);
        setConfirmCloseOpen(
            false
        );

        if (
            normalizedMode ===
                "EDIT" ||
            normalizedMode ===
                "VIEW"
        ) {
            form.setFieldsValue(
                mapSupplierToForm(
                    record || {}
                )
            );

            return;
        }

        form.setFieldsValue(
            getDefaultSupplierValues()
        );
    }, [
        open,
        normalizedMode,
        record,
        form,
    ]);

    /*
     * -----------------------------------------
     * Reset Form
     * -----------------------------------------
     */

    const resetForm = () => {
        form.resetFields();

        setDirty(false);

        setActiveTab("basic");

        setConfirmCloseOpen(
            false
        );
    };

    /*
     * -----------------------------------------
     * Close Drawer
     * -----------------------------------------
     */

    const requestClose = () => {
        if (
            readOnly ||
            !dirty
        ) {
            resetForm();
            onClose?.();

            return;
        }

        setConfirmCloseOpen(
            true
        );
    };

    /*
     * -----------------------------------------
     * Discard Changes
     * -----------------------------------------
     */

    const handleDiscard = () => {
        resetForm();

        onClose?.();
    };

    /*
     * -----------------------------------------
     * Cancel Confirmation
     * -----------------------------------------
     */

    const handleCancelDiscard = () => {
        setConfirmCloseOpen(
            false
        );
    };

    /*
     * -----------------------------------------
     * Save
     * -----------------------------------------
     */

    const handleSave = async () => {
        if (readOnly) {
            return;
        }

        try {
            setSaving(true);

            /*
             * Validate ALL fields
             *
             * Important:
             * validateFields() validates
             * fields across all tabs,
             * not only current tab.
             */

            const values =
                await form.validateFields();

            const payload =
                prepareSupplierPayload(
                    values
                );

            await onSave?.(
                payload,
                {
                    mode:
                        normalizedMode,
                    record,
                }
            );

            message.success(
                normalizedMode ===
                    "EDIT"
                    ? "Supplier updated successfully"
                    : "Supplier created successfully"
            );

            resetForm();

            onClose?.();
        } catch (error) {
            /*
             * Ant Design validation
             * errors are handled here.
             */

            if (
                error?.errorFields
            ) {
                const firstError =
                    error
                        .errorFields?.[0];

                const firstField =
                    firstError?.name?.[0];

                /*
                 * Move user to the
                 * relevant tab.
                 */

                const fieldTabMap = {
                    supplierCode:
                        "basic",
                    supplierName:
                        "basic",
                    supplierType:
                        "basic",
                    supplierCategory:
                        "basic",
                    status: "basic",

                    contactPerson:
                        "contact",
                    mobile: "contact",
                    alternateMobile:
                        "contact",
                    email: "contact",
                    website: "contact",

                    addressLine1:
                        "address",
                    addressLine2:
                        "address",
                    city: "address",
                    state: "address",
                    country: "address",
                    pinCode: "address",

                    gstin: "regulatory",
                    pan: "regulatory",
                    licenseType:
                        "regulatory",
                    drugLicenseNumber:
                        "regulatory",
                    drugLicenseExpiry:
                        "regulatory",
                    fssaiLicense:
                        "regulatory",
                    otherRegistration:
                        "regulatory",

                    paymentTerms:
                        "commercial",
                    creditDays:
                        "commercial",
                    currency:
                        "commercial",
                    bankName:
                        "commercial",
                    accountNumber:
                        "commercial",
                    ifscCode:
                        "commercial",
                    branchName:
                        "commercial",

                    documents:
                        "documents",
                };

                const tab =
                    fieldTabMap[
                        firstField
                    ];

                if (tab) {
                    setActiveTab(tab);
                }

                message.error(
                    "Please complete all required fields before saving."
                );

                return;
            }

            console.error(
                "Supplier save error:",
                error
            );

            message.error(
                error?.message ||
                    "Unable to save supplier."
            );
        } finally {
            setSaving(false);
        }
    };

    /*
     * -----------------------------------------
     * Footer
     * -----------------------------------------
     */

    const footer = readOnly ? (
        <div
            style={{
                display: "flex",
                justifyContent:
                    "flex-end",
            }}
        >
            <Button
                icon={
                    <CloseOutlined />
                }
                onClick={
                    requestClose
                }
            >
                Close
            </Button>
        </div>
    ) : (
        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
            }}
        >
            <div>
                {dirty && (
                    <span
                        style={{
                            color: "#8c8c8c",
                            fontSize: 13,
                        }}
                    >
                        Unsaved changes
                    </span>
                )}
            </div>

            <Space
                orientation="horizontal"
            >
                <Button
                    onClick={
                        requestClose
                    }
                    disabled={saving}
                >
                    Cancel
                </Button>

                <Button
                    type="primary"
                    icon={
                        <SaveOutlined />
                    }
                    loading={saving}
                    onClick={
                        handleSave
                    }
                >
                    Save
                </Button>
            </Space>
        </div>
    );

    return (
        <>
            <Drawer
                title={getTitle()}
                open={open}
                onClose={
                    requestClose
                }
                size="large"
                destroyOnHidden
                mask={{
                    closable: false,
                }}
                footer={footer}
            >
                <SupplierForm
                    form={form}
                    mode={
                        normalizedMode
                    }
                    record={
                        record || {}
                    }
                    lookup={lookup}
                    activeTab={
                        activeTab
                    }
                    setActiveTab={
                        setActiveTab
                    }
                    onDirtyChange={
                        setDirty
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
                onDiscard={
                    handleDiscard
                }
            />
        </>
    );
};

export default SupplierDrawer;