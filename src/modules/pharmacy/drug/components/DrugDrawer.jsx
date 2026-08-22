import React, {
    useEffect,
    useState,
} from "react";

import {
    Drawer,
    Form,
    message,
    Space,
} from "antd";

import {
    AppButton,
} from "@/components/common";

import DrugForm from "./DrugForm";
import ConfirmCloseModal from "./ConfirmCloseModal";

import {
    getDefaultDrugValues,
    mapDrugToForm,
    prepareDrugPayload,
} from "../utils/drug.helper";

const drawerTitle = {
    ADD: "Add Drug",
    EDIT: "Edit Drug",
    VIEW: "View Drug",
};

const DrugDrawer = ({
    open = false,
    mode = "ADD",
    record = null,

    lookups = {},

    documents = [],

    loading = false,

    onSave,
    onClose,
}) => {
    const [form] =
        Form.useForm();

    const [dirty, setDirty] =
        useState(false);

    const [
        confirmClose,
        setConfirmClose,
    ] = useState(false);

    const [
        activeTab,
        setActiveTab,
    ] = useState("basic");

    const readOnly =
        mode === "VIEW" ||
        mode === "view";

    /*
     * --------------------------------
     * Initialize Form
     * --------------------------------
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        let values;

        if (
            mode === "ADD" ||
            mode === "add"
        ) {
            values =
                getDefaultDrugValues();
        } else {
            values =
                mapDrugToForm(
                    record || {}
                );
        }

        form.resetFields();

        form.setFieldsValue(
            values
        );

        setDirty(false);

        setConfirmClose(false);

        setActiveTab("basic");
    }, [
        open,
        mode,
        record,
        form,
    ]);

    /*
     * --------------------------------
     * Dirty Change
     * --------------------------------
     */

    const handleDirtyChange = (
        value = true
    ) => {
        if (readOnly) {
            return;
        }

        setDirty(value);
    };

    /*
     * --------------------------------
     * Save
     * --------------------------------
     */

    const handleSave = async () => {
        if (readOnly) {
            return;
        }

        try {
            const values =
                await form.validateFields();

            /*
             * Prepare final payload
             */
            const payload =
                prepareDrugPayload(
                    values
                );

            /*
             * Parent handles API/mock save
             */
            await onSave?.(
                payload,
                mode,
                record
            );

            message.success(
                mode === "EDIT"
                    ? "Drug updated successfully"
                    : "Drug created successfully"
            );

            setDirty(false);

            onClose?.();
        } catch (error) {
            /*
             * Ant Design validation errors
             * should keep drawer open.
             */
            if (
                error?.errorFields
            ) {
                const firstError =
                    error.errorFields?.[0];

                if (
                    firstError?.name
                ) {
                    const fieldName =
                        firstError.name;

                    /*
                     * Move user to first
                     * invalid field's tab
                     */
                    const tab =
                        getTabFromField(
                            fieldName
                        );

                    if (tab) {
                        setActiveTab(
                            tab
                        );
                    }
                }

                message.error(
                    "Please complete all required fields."
                );

                return;
            }

            console.error(
                "Drug save failed:",
                error
            );

            message.error(
                "Unable to save drug. Please try again."
            );
        }
    };

    /*
     * --------------------------------
     * Close
     * --------------------------------
     */

    const handleDrawerClose = () => {
        if (
            !readOnly &&
            dirty
        ) {
            setConfirmClose(
                true
            );

            return;
        }

        handleForceClose();
    };

    /*
     * --------------------------------
     * Force Close
     * --------------------------------
     */

    const handleForceClose = () => {
        form.resetFields();

        setDirty(false);

        setConfirmClose(false);

        setActiveTab("basic");

        onClose?.();
    };

    /*
     * --------------------------------
     * Confirm Close
     * --------------------------------
     */

    const handleConfirmClose = () => {
        handleForceClose();
    };

    /*
     * --------------------------------
     * Cancel Confirm
     * --------------------------------
     */

    const handleCancelClose = () => {
        setConfirmClose(false);
    };

    /*
     * --------------------------------
     * Footer
     * --------------------------------
     */

    const footer = (
        <div
            style={{
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
            }}
        >
            <div>
                {dirty && !readOnly && (
                    <span
                        style={{
                            color: "#fa8c16",
                        }}
                    >
                        Unsaved changes
                    </span>
                )}
            </div>

            <Space
                orientation="horizontal"
            >
                <AppButton
                    onClick={
                        handleDrawerClose
                    }
                >
                    Close
                </AppButton>

                {!readOnly && (
                    <AppButton
                        type="primary"
                        loading={loading}
                        onClick={
                            handleSave
                        }
                    >
                        {mode === "EDIT"
                            ? "Update Drug"
                            : "Save Drug"}
                    </AppButton>
                )}
            </Space>
        </div>
    );

    return (
        <>
            <Drawer
                open={open}
                title={
                    drawerTitle[
                        mode
                    ] ||
                    "Drug"
                }
                size="large"
                destroyOnHidden
                maskClosable={false}
                keyboard={false}
                onClose={
                    handleDrawerClose
                }
                footer={footer}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    preserve={false}
                >
                    <DrugForm
                        form={form}
                        mode={mode}
                        record={
                            record || {}
                        }
                        lookups={lookups}
                        documents={
                            documents
                        }
                        activeTab={
                            activeTab
                        }
                        setActiveTab={
                            setActiveTab
                        }
                        onDirtyChange={
                            handleDirtyChange
                        }
                    />
                </Form>
            </Drawer>

            <ConfirmCloseModal
                open={confirmClose}
                onOk={
                    handleConfirmClose
                }
                onCancel={
                    handleCancelClose
                }
            />
        </>
    );
};

/*
 * --------------------------------
 * Field → Tab mapping
 * --------------------------------
 */

const getTabFromField = (
    fieldName
) => {
    const name =
        Array.isArray(fieldName)
            ? fieldName[0]
            : fieldName;

    const mapping = {
        drugCode: "basic",
        drugName: "basic",
        genericName: "basic",
        brandName: "basic",
        shortName: "basic",
        drugType: "basic",
        status: "basic",

        category:
            "classification",
        schedule:
            "classification",

        composition:
            "composition",

        dosageForm:
            "strength",
        strength:
            "strength",
        strengthUnit:
            "strength",
        route:
            "strength",

        baseUnit:
            "packaging",
        purchaseUnit:
            "packaging",
        dispensingUnit:
            "packaging",
        packSize:
            "packaging",
        unitsPerPack:
            "packaging",

        storageCondition:
            "storage",
        temperatureFrom:
            "storage",
        temperatureTo:
            "storage",

        minStock:
            "inventory",
        reorderLevel:
            "inventory",
        maxStock:
            "inventory",

        manufacturerId:
            "manufacturer",

        suppliers:
            "suppliers",

        drugLicenseCategory:
            "regulatory",
        licenseNumber:
            "regulatory",

        documents:
            "documents",
    };

    return mapping[name];
};

export default React.memo(
    DrugDrawer
);
