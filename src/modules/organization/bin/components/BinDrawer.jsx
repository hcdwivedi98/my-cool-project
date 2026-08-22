import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Drawer,
    Form,
    Space,
    message,
} from "antd";

import {
    AppButton,
} from "@/components/common";

import BinForm from "./BinForm";
import ConfirmCloseModal from "./ConfirmCloseModal";

import {
    getDefaultBinValues,
    mapBinToForm,
    prepareBinPayload,
} from "../utils/bin.helper";

const drawerTitle = {
    add: "Add Bin",
    edit: "Edit Bin",
    view: "View Bin",
};

const BinDrawer = ({
    open,
    mode = "add",
    record = null,
    lookups = {},
    documents = [],
    loading = false,
    onSave,
    onClose,
}) => {
    const [form] = Form.useForm();

    const [dirty, setDirty] = useState(false);

    const [confirmClose, setConfirmClose] =
        useState(false);

    const readOnly = mode === "view";

    const initialValues = useMemo(() => {
        if (mode === "add") {
            return getDefaultBinValues();
        }

        return mapBinToForm(record || {});
    }, [mode, record]);

    useEffect(() => {
        if (!open) {
            return;
        }

        form.resetFields();

        form.setFieldsValue(initialValues);

        setDirty(false);
    }, [
        open,
        initialValues,
        form,
    ]);

    const handleValuesChange = () => {
        if (!readOnly) {
            setDirty(true);
        }
    };

    const handleDrawerClose = () => {
        if (readOnly || !dirty) {
            onClose?.();
            return;
        }

        setConfirmClose(true);
    };

    const handleConfirmClose = () => {
        setConfirmClose(false);
        setDirty(false);

        form.resetFields();

        onClose?.();
    };

    const handleCancelClose = () => {
        setConfirmClose(false);
    };

    const handleSave = async () => {
        if (readOnly) {
            return;
        }

        try {
            // Validate ALL fields from ALL tabs
            const values = await form.validateFields();

            const payload = prepareBinPayload(values);

            await onSave?.(payload, record);

            setDirty(false);

            message.success(
                mode === "add"
                    ? "Bin created successfully"
                    : "Bin updated successfully"
            );

            onClose?.();

        } catch (error) {
            // Ant Design validation error
            if (error?.errorFields) {
                message.warning(
                    "Please complete all required fields before saving."
                );

                // Jump to first invalid field
                const firstError =
                    error.errorFields?.[0];

                if (firstError?.name) {
                    form.scrollToField(
                        firstError.name,
                        {
                            behavior: "smooth",
                            block: "center",
                        }
                    );
                }

                return;
            }

            console.error(
                "Bin save failed:",
                error
            );

            message.error(
                "Unable to save Bin. Please try again."
            );
        }
    };
    const footer = readOnly ? (
        <Space
            orientation="horizontal"
            style={{
                width: "100%",
                justifyContent: "flex-end",
            }}
        >
            <AppButton
                onClick={handleDrawerClose}
            >
                Close
            </AppButton>
        </Space>
    ) : (
        <Space
            orientation="horizontal"
            style={{
                width: "100%",
                justifyContent: "flex-end",
            }}
        >
            <AppButton
                onClick={handleDrawerClose}
            >
                Cancel
            </AppButton>

            <AppButton
                type="primary"
                loading={loading}
                onClick={handleSave}
            >
                {mode === "add"
                    ? "Create Bin"
                    : "Save Changes"}
            </AppButton>
        </Space>
    );

    return (
        <>
            <Drawer
                open={open}
                title={drawerTitle[mode]}
                size="large"
                destroyOnHidden
                maskClosable={false}
                keyboard={false}
                onClose={handleDrawerClose}
                footer={footer}
            >
                <BinForm
                    form={form}
                    mode={mode}
                    record={record}
                    lookups={lookups}
                    documents={documents}
                    onDirtyChange={setDirty}
                />
            </Drawer>

            <ConfirmCloseModal
                open={confirmClose}
                onOk={handleConfirmClose}
                onCancel={handleCancelClose}
            />
        </>
    );
};

export default React.memo(BinDrawer);