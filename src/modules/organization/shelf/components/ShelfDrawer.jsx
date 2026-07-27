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

import ShelfForm from "./ShelfForm";
import ConfirmCloseModal from "./ConfirmCloseModal";

import {
    getDefaultShelfValues,

    
} from "../utils/shelf.helper";

const drawerTitle = {
    add: "Add Shelf",
    edit: "Edit Shelf",
    view: "View Shelf",
};

const ShelfDrawer = ({
    open,
    mode = "add",
    record = null,
    lookups,
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
            return getDefaultShelfValues();
        }

        return mapShelfToForm(record);

    }, [mode, record]);

    useEffect(() => {
        if (!open) return;

        form.resetFields();
        form.setFieldsValue(initialValues);

        setDirty(false);
    }, [open, initialValues, form]);

    const handleValuesChange = () => {
        if (!dirty) {
            setDirty(true);
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();

            const payload = prepareShelfPayload(values);

            if (onSave) {
                await onSave(payload);
            }

            message.success(
                mode === "add"
                    ? "Shelf created successfully."
                    : "Shelf updated successfully."
            );

            setDirty(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrawerClose = () => {
        if (readOnly) {
            onClose?.();
            return;
        }

        if (dirty) {
            setConfirmClose(true);
            return;
        }

        onClose?.();
    };

    const handleConfirmClose = () => {
        setConfirmClose(false);
        setDirty(false);
        onClose?.();
    };

    const handleCancelClose = () => {
        setConfirmClose(false);
    };

    const footer = (
        <Space>
            <AppButton onClick={handleDrawerClose}>
                Cancel
            </AppButton>

            {!readOnly && (
                <AppButton
                    type="primary"
                    loading={loading}
                    onClick={handleSave}
                >
                    {mode === "add"
                        ? "Save"
                        : "Update"}
                </AppButton>
            )}
        </Space>
    );

    return (
        <>
            <Drawer
                open={open}
                title={drawerTitle[mode]}
                width={1100}
                destroyOnClose
                maskClosable={false}
                keyboard={false}
                onClose={handleDrawerClose}
                footer={footer}
            >
                <ShelfForm
                    form={form}
                    mode={mode}
                    record={record}
                    lookups={lookups}
                    documents={documents}
                    onValuesChange={handleValuesChange}
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

export default React.memo(ShelfDrawer);