import { useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import {
    AppDrawer,
    AppForm,
    AppFormRow,
    AppFormItem,
    FormColumn,
    AppInput,
    AppLookupSelect,
    AppDatePicker,
    AppUpload,
    AppButton,
} from "@/components/common";

const DOCUMENT_TYPES = [
    { label: "Fire NOC", value: "FIRE_NOC" },
    { label: "Pollution NOC", value: "POLLUTION_NOC" },
    { label: "Biomedical Waste", value: "BMW" },
    { label: "Trade License", value: "TRADE" },
    { label: "Drug License", value: "DRUG" },
    { label: "NABH", value: "NABH" },
    { label: "NABL", value: "NABL" },
    { label: "ISO", value: "ISO" },
    { label: "Other", value: "OTHER" },
];

const DEFAULT_VALUES = {
    documentType: null,
    documentNumber: "",
    authority: "",
    issueDate: null,
    expiryDate: null,
    attachment: null,
    remarks: "",
};

function DocumentDrawer({
    open,
    record,
    readOnly = false,
    onClose,
    onSave,
}) {

    const [form] = AppForm.useForm();
        useEffect(() => {

        if (record) {

            form.setFieldsValue({
                ...record,

                issueDate: record.issueDate
                    ? dayjs(record.issueDate)
                    : null,

                expiryDate: record.expiryDate
                    ? dayjs(record.expiryDate)
                    : null,
            });

        } else {

            form.resetFields();

            form.setFieldsValue(DEFAULT_VALUES);

        }

    }, [record, form]);
        const handleFinish = (values) => {

        onSave?.({

            ...values,

            issueDate: values.issueDate
                ? values.issueDate.format("YYYY-MM-DD")
                : null,

            expiryDate: values.expiryDate
                ? values.expiryDate.format("YYYY-MM-DD")
                : null,

        });

        form.resetFields();

    };
        return (

        <AppDrawer

            open={open}

            title={
                record
                    ? "Edit Document"
                    : "Add Document"
            }

            width={700}

            destroyOnClose

            onClose={onClose}

            footer={null}

        >

            <AppForm

                form={form}

                layout="vertical"

                onFinish={handleFinish}

                disabled={readOnly}

            >
                                <AppFormRow>

                    <FormColumn>

                        <AppFormItem

                            label="Document Type"

                            name="documentType"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Document Type is required",
                                },
                            ]}

                        >

                            <AppLookupSelect

                                options={DOCUMENT_TYPES}

                                placeholder="Select Document Type"

                            />

                        </AppFormItem>

                    </FormColumn>

                    <FormColumn>

                        <AppFormItem

                            label="Document Number"

                            name="documentNumber"

                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Document Number is required",
                                },
                            ]}

                        >

                            <AppInput
                                maxLength={50}
                            />

                        </AppFormItem>

                    </FormColumn>

                </AppFormRow>
                                <AppFormRow>

                    <FormColumn>

                        <AppFormItem

                            label="Issuing Authority"

                            name="authority"

                        >

                            <AppInput
                                maxLength={150}
                            />

                        </AppFormItem>

                    </FormColumn>

                    <FormColumn>

                        <AppFormItem

                            label="Issue Date"

                            name="issueDate"

                        >

                            <AppDatePicker
                                style={{
                                    width: "100%",
                                }}
                            />

                        </AppFormItem>

                    </FormColumn>

                </AppFormRow>
                                <AppFormRow>

                    <FormColumn>

                        <AppFormItem
                            label="Expiry Date"
                            name="expiryDate"
                            dependencies={["issueDate"]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {

                                        const issueDate =
                                            getFieldValue("issueDate");

                                        if (
                                            !issueDate ||
                                            !value
                                        ) {
                                            return Promise.resolve();
                                        }

                                        if (
                                            value.isAfter(issueDate)
                                        ) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(
                                            new Error(
                                                "Expiry Date must be greater than Issue Date."
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <AppDatePicker
                                style={{
                                    width: "100%",
                                }}
                            />
                        </AppFormItem>

                    </FormColumn>

                    <FormColumn>

                        <AppFormItem
                            label="Attachment"
                            name="attachment"
                        >
                            <AppUpload
                                maxCount={1}
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                        </AppFormItem>

                    </FormColumn>

                </AppFormRow>
                                <AppFormRow>

                    <FormColumn span={24}>

                        <AppFormItem
                            label="Remarks"
                            name="remarks"
                        >
                            <AppInput.TextArea
                                rows={4}
                                maxLength={500}
                                showCount
                                placeholder="Enter Remarks"
                            />
                        </AppFormItem>

                    </FormColumn>

                </AppFormRow>
                                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 8,
                        marginTop: 24,
                    }}
                >
                    <AppButton
                        onClick={onClose}
                    >
                        Cancel
                    </AppButton>

                    {!readOnly && (
                        <AppButton
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </AppButton>
                    )}

                </div>
                            </AppForm>

        </AppDrawer>

    );
}

DocumentDrawer.propTypes = {
    open: PropTypes.bool,
    record: PropTypes.object,
    readOnly: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};

export default DocumentDrawer;