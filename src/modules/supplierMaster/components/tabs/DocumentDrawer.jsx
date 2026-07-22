import React, {
    memo,
    useEffect,
} from "react";

import { Form } from "antd";

import {
    AppDrawer,
} from "../../../components/common/drawer";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSelect,
    AppDatePicker,
    AppUpload,
    AppSwitch,
} from "../../../components/common/form";

function DocumentDrawer({

    open,

    loading = false,

    document,

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

        if (document) {

            form.setFieldsValue(document);

        } else {

            form.resetFields();

        }

    }, [

        open,

        document,

        form,

    ]);

    //--------------------------------------------------

    const handleFinish = (values) => {

        onSave?.({

            ...document,

            ...values,

        });

    };

    //--------------------------------------------------

    return (

        <AppDrawer

            open={open}

            title={

                document?.id

                    ? "Edit Document"

                    : "Add Document"

            }

            width={750}

            destroyOnClose={false}

            maskClosable={false}

            loading={loading}

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

                <AppFormGrid>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="documentType"

                            label="Document Type"

                            rules={[

                                {

                                    required: true,

                                    message: "Document Type is required",

                                },

                            ]}

                        >

                            <AppSelect

                                allowClear

                                showSearch

                                placeholder="Select Document Type"

                                options={

                                    lookups.documentTypes || []

                                }

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="documentName"

                            label="Document Name"

                            rules={[

                                {

                                    required: true,

                                    message: "Document Name is required",

                                },

                            ]}

                        >

                            <AppInput

                                placeholder="Enter Document Name"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="documentNumber"

                            label="Document Number"

                        >

                            <AppInput

                                placeholder="Enter Document Number"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="issuedBy"

                            label="Issued By"

                        >

                            <AppInput

                                placeholder="Enter Issuing Authority"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="issueDate"

                            label="Issue Date"

                        >

                            <AppDatePicker

                                className="w-full"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="expiryDate"

                            label="Expiry Date"

                        >

                            <AppDatePicker

                                className="w-full"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="isMandatory"

                            label="Mandatory"

                            valuePropName="checked"

                        >

                            <AppSwitch />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="isVerified"

                            label="Verified"

                            valuePropName="checked"

                        >

                            <AppSwitch />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item span={24}>

                        <AppFormItem

                            name="attachment"

                            label="Attachment"

                        >

                            <AppUpload />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item span={24}>

                        <AppFormItem

                            name="remarks"

                            label="Remarks"

                        >

                            <AppInput.TextArea

                                rows={4}

                                placeholder="Enter Remarks"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                </AppFormGrid>

            </Form>

        </AppDrawer>

    );

}

export default memo(DocumentDrawer);