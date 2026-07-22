import React from "react";
import PropTypes from "prop-types";
import { Tag, Tooltip, Popconfirm } from "antd";

import {
    EyeOutlined,
    DownloadOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import {
    Space,
} from "antd";
import {
    AppTable,
    AppButton,
}from "@/components/common";
const formatFileSize = (bytes = 0) => {
    if (!bytes) return "-";

    const kb = 1024;
    const mb = kb * 1024;

    if (bytes >= mb)
        return `${(bytes / mb).toFixed(2)} MB`;

    return `${(bytes / kb).toFixed(2)} KB`;
};

const DocumentGrid = ({
    data = [],
    loading = false,
    onPreview,
    onDownload,
    onEdit,
    onDelete,
}) => {
    const columns = [
        {
            title: "Document Name",
            dataIndex: "documentName",
            key: "documentName",
            width: 220,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 150,
        },
        {
            title: "Version",
            dataIndex: "version",
            key: "version",
            width: 100,
            align: "center",
        },
        {
            title: "File Type",
            dataIndex: "fileExtension",
            key: "fileExtension",
            width: 100,
            align: "center",
            render: (value) =>
                value
                    ? value.toUpperCase()
                    : "-",
        },
        {
            title: "Size",
            dataIndex: "fileSize",
            key: "fileSize",
            width: 120,
            align: "right",
            render: formatFileSize,
        },
        {
            title: "Uploaded By",
            dataIndex: "uploadedBy",
            key: "uploadedBy",
            width: 170,
        },
        {
            title: "Upload Date",
            dataIndex: "uploadedDate",
            key: "uploadedDate",
            width: 140,
        },
        {
            title: "Expiry",
            dataIndex: "expiryDate",
            key: "expiryDate",
            width: 140,
            render: (value) => value || "-",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            align: "center",
            render: (status) =>
                status ? (
                    <Tag color="green">
                        Active
                    </Tag>
                ) : (
                    <Tag color="red">
                        Inactive
                    </Tag>
                ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 220,
            fixed: "right",
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Preview">
                        <AppButton
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() =>
                                onPreview?.(record)
                            }
                        />
                    </Tooltip>

                    <Tooltip title="Download">
                        <AppButton
                            type="text"
                            icon={
                                <DownloadOutlined />
                            }
                            onClick={() =>
                                onDownload?.(
                                    record
                                )
                            }
                        />
                    </Tooltip>

                    <Tooltip title="Edit">
                        <AppButton
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() =>
                                onEdit?.(record)
                            }
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Delete document?"
                        okText="Delete"
                        cancelText="Cancel"
                        onConfirm={() =>
                            onDelete?.(record)
                        }
                    >
                        <Tooltip title="Delete">
                            <AppButton
                                danger
                                type="text"
                                icon={
                                    <DeleteOutlined />
                                }
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <AppTable
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
                x: 1700,
            }}
        />
    );
};

DocumentGrid.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,

    onPreview: PropTypes.func,
    onDownload: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default DocumentGrid;