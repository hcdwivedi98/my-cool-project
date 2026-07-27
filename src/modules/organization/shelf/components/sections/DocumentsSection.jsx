import React from "react";
import { Table, Space } from "antd";
import {
    EyeOutlined,
    DownloadOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import { AppButton } from "@/components/common";

const columns = [
    {
        title: "Document Name",
        dataIndex: "documentName",
    },
    {
        title: "Document Type",
        dataIndex: "documentType",
    },
    {
        title: "Uploaded By",
        dataIndex: "uploadedBy",
    },
    {
        title: "Uploaded On",
        dataIndex: "uploadedOn",
    },
    {
        title: "Actions",
        render: () => (
            <Space>
                <AppButton
                    type="text"
                    icon={<EyeOutlined />}
                />

                <AppButton
                    type="text"
                    icon={<DownloadOutlined />}
                />

                <AppButton
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                />
            </Space>
        ),
    },
];

const DocumentsSection = ({
    documents = [],
    disabled = false,
}) => {
    return (
        <>
            {!disabled && (
                <div
                    style={{
                        marginBottom: 16,
                        textAlign: "right",
                    }}
                >
                    <AppButton
                        type="primary"
                        icon={<UploadOutlined />}
                    >
                        Upload Document
                    </AppButton>
                </div>
            )}

            <Table
                rowKey="id"
                columns={columns}
                dataSource={documents}
                pagination={false}
                size="small"
            />
        </>
    );
};

export default DocumentsSection;