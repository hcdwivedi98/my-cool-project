import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { Form } from "antd";

import {
    AppTabs,
    AppCard,
    AppInput,
    AppFormItem,
    AppLookupSelect,
    AppSwitch,
    
} from "@/components/common";
import {
    Row,
    Col,
    InputNumber,
    Upload,
    Typography,
    DatePicker,
} from "antd";

import {
    InboxOutlined,
} from "@ant-design/icons";

import {
    DOCUMENT_CATEGORIES,
    DEFAULT_DOCUMENT,
} from "../../constants/document.constants";

const DocumentForm = ({
    id = "department-document-form",
    initialValues = DEFAULT_DOCUMENT,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...DEFAULT_DOCUMENT,
            ...initialValues,
        });
    }, [form, initialValues]);

    const handleFinish = (values) => {
        if (
            values.issueDate &&
            values.expiryDate &&
            values.expiryDate.isBefore(values.issueDate, "day")
        ) {
            form.setFields([
                {
                    name: "expiryDate",
                    errors: [
                        "Expiry Date cannot be earlier than Issue Date",
                    ],
                },
            ]);

            return;
        }

        onSubmit?.(values);
    };

    const items = [
        {
            key: "basic",
            label: "Basic Information",
            children: (
                <AppCard bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="documentName"
                                label="Document Name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Document Name is required",
                                    },
                                ]}
                            >
                                <AppInput
                                    maxLength={100}
                                    placeholder="Enter Document Name"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="category"
                                label="Document Category"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select Document Category",
                                    },
                                ]}
                            >
                                <AppLookupSelect
                                    placeholder="Select Category"
                                    options={DOCUMENT_CATEGORIES}
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="documentNumber"
                                label="Document Number"
                            >
                                <AppInput
                                    maxLength={50}
                                    placeholder="Enter Document Number"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="version"
                                label="Version"
                            >
                                <AppInput
                                    placeholder="1.0"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="status"
                                label="Active"
                                valuePropName="checked"
                            >
                                <AppSwitch
                                    checkedChildren="Active"
                                    unCheckedChildren="Inactive"
                                />
                            </AppFormItem>
                        </Col>
                    </Row>
                </AppCard>
            ),
        },
        {
            key: "document-information",
            label: "Document Information",
            children: (
                <AppCard bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <AppFormItem
                                name="file"
                                label="Upload Document"
                                valuePropName="fileList"
                            >
                                <Upload.Dragger
                                    name="file"
                                    multiple={false}
                                    maxCount={1}
                                    beforeUpload={() => false}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>

                                    <Typography.Text strong>
                                        Click or Drag document here
                                    </Typography.Text>

                                    <br />

                                    <Typography.Text type="secondary">
                                        PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                                    </Typography.Text>
                                </Upload.Dragger>
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="fileName"
                                label="File Name"
                            >
                                <AppInput
                                    disabled
                                    placeholder="Auto Generated"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="fileExtension"
                                label="File Type"
                            >
                                <AppInput
                                    disabled
                                    placeholder="Auto Generated"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="fileSize"
                                label="File Size"
                            >
                                <AppInput
                                    disabled
                                    placeholder="Auto Generated"
                                />
                            </AppFormItem>
                        </Col>

                        <Col span={24}>
                            <AppFormItem
                                name="remarks"
                                label="Description"
                            >
                                <AppInput.TextArea
                                    rows={4}
                                    maxLength={500}
                                    showCount
                                    placeholder="Enter Description"
                                />
                            </AppFormItem>
                        </Col>
                    </Row>
                </AppCard>
            ),
        },
        {
            key: "validity",
            label: "Validity",
            children: (
                <AppCard bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="issueDate"
                                label="Issue Date"
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="expiryDate"
                                label="Expiry Date"
                            >
                                <AppDatePicker
                                    style={{ width: "100%" }}
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="reminderBeforeDays"
                                label="Reminder Before Expiry (Days)"
                            >
                                <InputNumber
                                    type="number"
                                    min={0}
                                    max={365}
                                    placeholder="30"
                                />
                            </AppFormItem>
                        </Col>

                        <Col xs={24} md={12}>
                            <AppFormItem
                                name="mandatoryDocument"
                                label="Mandatory Document"
                                valuePropName="checked"
                            >
                                <AppSwitch
                                    checkedChildren="Yes"
                                    unCheckedChildren="No"
                                />
                            </AppFormItem>
                        </Col>
                    </Row>
                </AppCard>
            ),
        },
    ];

    return (
        <Form
            id={id}
            form={form}
            layout="vertical"
            initialValues={{
                ...DEFAULT_DOCUMENT,
                ...initialValues,
            }}
            onFinish={handleFinish}
        >
            <AppTabs items={items} />
        </Form>
    );
};

DocumentForm.propTypes = {
    id: PropTypes.string,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default DocumentForm;