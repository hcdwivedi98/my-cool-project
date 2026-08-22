// src/modules/pharmacy/supplier/components/sections/DocumentsSection.jsx

import React from "react";

import {
    Button,
    Card,
    Col,
    Empty,
    Form,
    Row,
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    DownloadOutlined,
    EyeOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import {
    AppInput,
    AppSelect,
    AppDatePicker,
} from "@/components/common";

const { Text } = Typography;

const DOCUMENT_TYPES = [
    {
        label: "Drug License",
        value: "DRUG_LICENSE",
    },
    {
        label: "GST Certificate",
        value: "GST_CERTIFICATE",
    },
    {
        label: "PAN Card",
        value: "PAN_CARD",
    },
    {
        label: "FSSAI License",
        value: "FSSAI_LICENSE",
    },
    {
        label: "Company Registration",
        value: "COMPANY_REGISTRATION",
    },
    {
        label: "Bank Certificate",
        value: "BANK_CERTIFICATE",
    },
    {
        label: "Other",
        value: "OTHER",
    },
];

const DocumentsSection = ({
    form,
    record = {},
    readOnly = false,
    onDirtyChange = () => {},
}) => {
    const documents =
        Form.useWatch(
            "documents",
            form
        ) || [];

    const addDocument = () => {
        const current =
            form.getFieldValue(
                "documents"
            ) || [];

        form.setFieldValue(
            "documents",
            [
                ...current,
                {
                    id: `temp-${Date.now()}`,
                    documentType:
                        undefined,
                    documentNumber: "",
                    expiryDate: null,
                    fileName: "",
                    fileUrl: "",
                },
            ]
        );

        onDirtyChange(true);
    };

    const removeDocument = (
        index
    ) => {
        const current =
            form.getFieldValue(
                "documents"
            ) || [];

        const updated =
            current.filter(
                (_, itemIndex) =>
                    itemIndex !==
                    index
            );

        form.setFieldValue(
            "documents",
            updated
        );

        onDirtyChange(true);
    };

    const handleDownload = (
        document
    ) => {
        if (!document?.fileUrl) {
            return;
        }

        window.open(
            document.fileUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    const handleView = (
        document
    ) => {
        if (!document?.fileUrl) {
            return;
        }

        window.open(
            document.fileUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "flex-start",
                    gap: 16,
                    marginBottom: 20,
                }}
            >
                <div>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Supplier Documents
                    </Text>

                    <div
                        style={{
                            marginTop: 4,
                            color: "#8c8c8c",
                            fontSize: 13,
                        }}
                    >
                        Maintain supplier
                        licenses,
                        certificates and
                        supporting
                        documents.
                    </div>
                </div>

                {!readOnly && (
                    <Button
                        type="primary"
                        icon={
                            <PlusOutlined />
                        }
                        onClick={
                            addDocument
                        }
                    >
                        Add Document
                    </Button>
                )}
            </div>

            {/* Empty State */}
            {!documents.length && (
                <Card
                    style={{
                        borderStyle:
                            "dashed",
                        borderRadius: 8,
                    }}
                >
                    <Empty
                        image={
                            Empty.PRESENTED_IMAGE_SIMPLE
                        }
                        description="No documents added"
                    >
                        {!readOnly && (
                            <Button
                                type="primary"
                                icon={
                                    <PlusOutlined />
                                }
                                onClick={
                                    addDocument
                                }
                            >
                                Add Document
                            </Button>
                        )}
                    </Empty>
                </Card>
            )}

            {/* Documents */}
            {documents.map(
                (
                    document,
                    index
                ) => (
                    <Card
                        key={
                            document.id ||
                            index
                        }
                        size="small"
                        style={{
                            marginBottom: 12,
                            borderRadius: 8,
                        }}
                    >
                        <Row
                            gutter={[
                                16,
                                8,
                            ]}
                            align="bottom"
                        >
                            {/* Type */}
                            <Col
                                xs={24}
                                md={6}
                            >
                                <Form.Item
                                    label="Document Type"
                                    name={[
                                        "documents",
                                        index,
                                        "documentType",
                                    ]}
                                    rules={[
                                        {
                                            required:
                                                true,
                                            message:
                                                "Please select document type",
                                        },
                                    ]}
                                >
                                    <AppSelect
                                        options={
                                            DOCUMENT_TYPES
                                        }
                                        placeholder="Select type"
                                        disabled={
                                            readOnly
                                        }
                                        onChange={() =>
                                            onDirtyChange(
                                                true
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            {/* Document Number */}
                            <Col
                                xs={24}
                                md={6}
                            >
                                <Form.Item
                                    label="Document Number"
                                    name={[
                                        "documents",
                                        index,
                                        "documentNumber",
                                    ]}
                                    rules={[
                                        {
                                            max: 100,
                                            message:
                                                "Document number cannot exceed 100 characters",
                                        },
                                    ]}
                                >
                                    <AppInput
                                        placeholder="Enter document number"
                                        maxLength={
                                            100
                                        }
                                        disabled={
                                            readOnly
                                        }
                                        onChange={() =>
                                            onDirtyChange(
                                                true
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            {/* Expiry */}
                            <Col
                                xs={24}
                                md={6}
                            >
                                <Form.Item
                                    label="Expiry Date"
                                    name={[
                                        "documents",
                                        index,
                                        "expiryDate",
                                    ]}
                                >
                                    <AppDatePicker
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Select expiry date"
                                        disabled={
                                            readOnly
                                        }
                                        onChange={() =>
                                            onDirtyChange(
                                                true
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            {/* File */}
                            <Col
                                xs={24}
                                md={6}
                            >
                                <Form.Item
                                    label="File"
                                    name={[
                                        "documents",
                                        index,
                                        "fileName",
                                    ]}
                                >
                                    <AppInput
                                        placeholder="Document file name"
                                        maxLength={
                                            200
                                        }
                                        disabled={
                                            readOnly
                                        }
                                        onChange={() =>
                                            onDirtyChange(
                                                true
                                            )
                                        }
                                    />
                                </Form.Item>
                            </Col>

                            {/* Existing File Actions */}
                            <Col
                                span={24}
                            >
                                <Space
                                    size="small"
                                >
                                    {document?.fileUrl && (
                                        <>
                                            <Tooltip title="View">
                                                <Button
                                                    type="text"
                                                    icon={
                                                        <EyeOutlined />
                                                    }
                                                    onClick={() =>
                                                        handleView(
                                                            document
                                                        )
                                                    }
                                                />
                                            </Tooltip>

                                            <Tooltip title="Download">
                                                <Button
                                                    type="text"
                                                    icon={
                                                        <DownloadOutlined />
                                                    }
                                                    onClick={() =>
                                                        handleDownload(
                                                            document
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        </>
                                    )}

                                    {!readOnly && (
                                        <Tooltip title="Remove Document">
                                            <Button
                                                type="text"
                                                danger
                                                icon={
                                                    <DeleteOutlined />
                                                }
                                                onClick={() =>
                                                    removeDocument(
                                                        index
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    )}
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                )
            )}
        </div>
    );
};

export default DocumentsSection;