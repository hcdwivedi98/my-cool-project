import React from "react";
import {
    Button,
    Empty,
    Form,
    List,
    Tag,
    Upload,
} from "antd";

import {
    DeleteOutlined,
    EyeOutlined,
    UploadOutlined,
} from "@ant-design/icons";

const DocumentsSection = ({
    form,
    record = {},
    documents = [],
    disabled = false,
    onDirtyChange = () => {},
}) => {
    const currentDocuments =
        Form.useWatch("documents", form) ||
        documents ||
        record.documents ||
        [];

    const handleBeforeUpload = (file) => {
        const newDocument = {
            id: `temp-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}`,

            name: file.name,

            fileName: file.name,

            fileType: file.type,

            fileSize: file.size,

            status: "Pending",

            uploadedBy: "Current User",

            uploadedOn:
                new Date().toISOString(),
        };

        const updatedDocuments = [
            ...currentDocuments,
            newDocument,
        ];

        form?.setFieldValue(
            "documents",
            updatedDocuments
        );

        onDirtyChange(true);

        // Prevent actual upload for now.
        return false;
    };

    const handleRemove = (documentId) => {
        const updatedDocuments =
            currentDocuments.filter(
                (item) =>
                    item.id !== documentId
            );

        form?.setFieldValue(
            "documents",
            updatedDocuments
        );

        onDirtyChange(true);
    };

    const handlePreview = (document) => {
        if (document.url) {
            window.open(
                document.url,
                "_blank",
                "noopener,noreferrer"
            );
        }
    };

    return (
        <div>
            {/* Upload */}
            <div
                style={{
                    marginBottom: 20,
                }}
            >
                {!disabled && (
                    <Upload
                        multiple
                        beforeUpload={
                            handleBeforeUpload
                        }
                        showUploadList={false}
                    >
                        <Button
                            type="primary"
                            icon={
                                <UploadOutlined />
                            }
                        >
                            Upload Document
                        </Button>
                    </Upload>
                )}
            </div>

            {/* Document List */}
            {currentDocuments.length === 0 ? (
                <Empty
                    description="No documents available"
                />
            ) : (
                <List
                    bordered
                    dataSource={
                        currentDocuments
                    }
                    renderItem={(document) => (
                        <List.Item
                            actions={[
                                document.url && (
                                    <Button
                                        key="view"
                                        type="text"
                                        icon={
                                            <EyeOutlined />
                                        }
                                        onClick={() =>
                                            handlePreview(
                                                document
                                            )
                                        }
                                    >
                                        View
                                    </Button>
                                ),

                                !disabled && (
                                    <Button
                                        key="delete"
                                        danger
                                        type="text"
                                        icon={
                                            <DeleteOutlined />
                                        }
                                        onClick={() =>
                                            handleRemove(
                                                document.id
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                ),
                            ].filter(Boolean)}
                        >
                            <List.Item.Meta
                                title={
                                    document.name ||
                                    document.fileName
                                }
                                description={
                                    <div>
                                        {document.fileType && (
                                            <Tag>
                                                {
                                                    document.fileType
                                                }
                                            </Tag>
                                        )}

                                        {document.status && (
                                            <Tag
                                                color={
                                                    document.status ===
                                                    "Uploaded"
                                                        ? "success"
                                                        : "processing"
                                                }
                                            >
                                                {
                                                    document.status
                                                }
                                            </Tag>
                                        )}

                                        {document.fileSize && (
                                            <span
                                                style={{
                                                    marginLeft: 8,
                                                }}
                                            >
                                                {(
                                                    document.fileSize /
                                                    1024
                                                ).toFixed(
                                                    1
                                                )}{" "}
                                                KB
                                            </span>
                                        )}
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}

            {/* Hidden Form Field */}
            <Form.Item
                name="documents"
                hidden
            >
                <input />
            </Form.Item>
        </div>
    );
};

export default DocumentsSection;