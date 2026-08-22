import React from "react";
import { Row, Col, Form, Empty, List, Typography } from "antd";

import {
    FilePdfOutlined,
    FileImageOutlined,
    FileTextOutlined,
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons";

import { AppButton } from "@/components/common";

const { Text } = Typography;

const getFileIcon = (fileName = "") => {
    const extension = fileName
        .split(".")
        .pop()
        ?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
        return <FileImageOutlined />;
    }

    if (extension === "pdf") {
        return <FilePdfOutlined />;
    }

    return <FileTextOutlined />;
};

const DocumentsSection = ({
    form,
    record = {},
    documents = [],
    disabled = false,
    onDirtyChange = () => {},
}) => {
    const currentDocuments =
        documents?.length
            ? documents
            : record?.documents || [];

    const handleView = (document) => {
        if (document?.url) {
            window.open(
                document.url,
                "_blank",
                "noopener,noreferrer"
            );
        }
    };

    const handleDelete = (document) => {
        // Backend document deletion will be implemented later.
        console.log(
            "Delete Bin document:",
            document
        );

        onDirtyChange(true);
    };

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Form.Item label="Documents">
                    {currentDocuments.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No documents available"
                        />
                    ) : (
                        <List
                            bordered
                            dataSource={currentDocuments}
                            renderItem={(document) => (
                                <List.Item
                                    actions={[
                                        document?.url && (
                                            <AppButton
                                                key="view"
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
                                        ),

                                        !disabled && (
                                            <AppButton
                                                key="delete"
                                                type="text"
                                                danger
                                                icon={
                                                    <DeleteOutlined />
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        document
                                                    )
                                                }
                                            />
                                        ),
                                    ].filter(Boolean)}
                                >
                                    <List.Item.Meta
                                        avatar={getFileIcon(
                                            document?.name
                                        )}
                                        title={
                                            document?.name ||
                                            "Unnamed Document"
                                        }
                                        description={
                                            <Text type="secondary">
                                                {document?.type ||
                                                    "Document"}
                                            </Text>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </Form.Item>
            </Col>
        </Row>
    );
};

export default DocumentsSection;