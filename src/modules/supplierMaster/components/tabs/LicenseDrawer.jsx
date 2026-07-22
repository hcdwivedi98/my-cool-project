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
} from "../../../components/common/form";

function LicenseDrawer({

    open,

    loading = false,

    license,

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

        if (license) {

            form.setFieldsValue(license);

        } else {

            form.resetFields();

        }

    }, [

        open,

        license,

        form,

    ]);

    //--------------------------------------------------

    const handleFinish = (values) => {

        onSave?.({

            ...license,

            ...values,

        });

    };

    //--------------------------------------------------

    return (

        <AppDrawer

            open={open}

            title={

                license?.id

                    ? "Edit License"

                    : "Add License"

            }

            width={700}

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

                            name="licenseType"

                            label="License Type"

                            rules={[

                                {

                                    required: true,

                                    message: "License Type is required",

                                },

                            ]}

                        >

                            <AppSelect

                                allowClear

                                showSearch

                                placeholder="Select License Type"

                                options={

                                    lookups.licenseTypes || []

                                }

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="licenseNumber"

                            label="License Number"

                            rules={[

                                {

                                    required: true,

                                    message: "License Number is required",

                                },

                            ]}

                        >

                            <AppInput

                                placeholder="Enter License Number"

                            />

                        </AppFormItem>

                    </AppFormGrid.Item>

                    <AppFormGrid.Item>

                        <AppFormItem

                            name="issuingAuthority"

                            label="Issuing Authority"

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

                            name="renewalReminderDays"

                            label="Renewal Reminder (Days)"

                        >

                            <AppInput

                                type="number"

                                placeholder="30"

                            />

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

export default memo(LicenseDrawer);