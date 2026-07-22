import React, {
    memo,
    useEffect,
} from "react";

import {
    Form,
} from "antd";

import {
    AppDrawer,
} from "../../../components/common/drawer";

import SupplierForm from "./SupplierForm";

function SupplierDrawer({

    open,

    loading = false,

    supplier,

    lookups,

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

        if (supplier) {

            form.setFieldsValue(supplier);

        } else {

            form.resetFields();

        }

    }, [

        open,

        supplier,

        form,

    ]);

    //--------------------------------------------------

    const handleFinish = async (values) => {

        await onSave?.({

            ...supplier,

            ...values,

        });

    };

    //--------------------------------------------------

    return (

        <AppDrawer

            open={open}

            title={

                supplier?.id

                    ? "Edit Supplier"

                    : "Add Supplier"

            }

            width={1200}

            destroyOnClose={false}

            maskClosable={false}

            loading={loading}

            onClose={onClose}

            onOk={() =>

                form.submit()

            }

            okText="Save"

            cancelText="Cancel"

        >

            <Form

                form={form}

                layout="vertical"

                onFinish={handleFinish}

                preserve={false}

            >

                <SupplierForm

                    form={form}

                    lookups={lookups}

                />

            </Form>

        </AppDrawer>

    );

}

export default memo(

    SupplierDrawer

);