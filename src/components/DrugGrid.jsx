import React, {
    memo,
    useEffect,
} from "react";

import { Form } from "antd";

import AppDrawer from "../../../components/common/drawer/AppDrawer";

import DrugForm from "./DrugForm";

import {
    DEFAULT_DRUG,
} from "../core/constants/drug.constants";

function DrugDrawer({

    open,

    drug,

    loading = false,

    saving = false,

    onClose,

    onSave,

}) {

    const [form] = Form.useForm();

    useEffect(() => {

        if (!open) return;

        if (drug) {

            form.setFieldsValue(drug);

        } else {

            form.resetFields();

            form.setFieldsValue(DEFAULT_DRUG);

        }

    }, [

        open,

        drug,

        form,

    ]);

    const handleSave = async () => {

        try {

            const values =

                await form.validateFields();

            onSave?.(values);

        }

        catch {

            // Ant Design validation will handle errors
        }

    };

    return (

        <AppDrawer

            open={open}

            title={

                drug

                    ? "Edit Drug"

                    : "Add Drug"

            }

            width="xl"

            loading={loading}

            saving={saving}

            confirmOnClose

            onClose={onClose}

            onSave={handleSave}

            showReset

            onReset={() =>

                form.resetFields()

            }

        >

            <DrugForm

                form={form}

            />

        </AppDrawer>

    );

}

export default memo(DrugDrawer);