import React, {
    memo,
    useEffect,
} from "react";

import { Form } from "antd";

import AppDrawer from "../../../components/common/drawer/AppDrawer";

import DrugForm from "./DrugForm";

function DrugDrawer({

    open,

    loading = false,

    drug,

    lookups = {},

    onClose,

    onSave,

}) {

    //--------------------------------------------------

    const [form] = Form.useForm();

    //--------------------------------------------------

    useEffect(() => {

        if (!open) {

            form.resetFields();

            return;

        }

        if (drug) {

            form.setFieldsValue(drug);

        } else {

            form.resetFields();

        }

    }, [

        open,

        drug,

        form,

    ]);

    //--------------------------------------------------

    const handleFinish = async (values) => {

        await onSave?.({

            ...drug,

            ...values,

        });

    };

    //--------------------------------------------------

    return (

        <AppDrawer

            open={open}

            title={

                drug?.id

                    ? "Edit Drug"

                    : "Add Drug"

            }

            width={1200}

            loading={loading}

            destroyOnClose={false}

            maskClosable={false}

            okText="Save"

            cancelText="Cancel"

            onClose={onClose}

            onOk={() => form.submit()}

        >

            <Form

                form={form}

                layout="vertical"

                preserve={false}

                onFinish={handleFinish}

            >

                <DrugForm

                    form={form}

                    lookups={lookups}

                />

            </Form>

        </AppDrawer>

    );

}

export default memo(DrugDrawer);