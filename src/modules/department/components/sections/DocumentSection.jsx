import React, { useState } from "react";
import PropTypes from "prop-types";

import {
    AppCard,
    AppButton,
    
} from "@/components/common";
import { Space,} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import DocumentGrid from "./DocumentGrid";
import DocumentUploadDrawer from "../document/DocumentUploadDrawer";

const DocumentSection = ({
    value = [],
    onChange,
}) => {
    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [editingDocument, setEditingDocument] =
        useState(null);

    const handleAdd = () => {
        setEditingDocument(null);
        setDrawerOpen(true);
    };

    const handleEdit = (record) => {
        setEditingDocument(record);
        setDrawerOpen(true);
    };

    const handleDelete = (record) => {
        const updated =
            value.filter(
                (item) => item.id !== record.id
            );

        onChange?.(updated);
    };

    const handleSave = (document) => {
        let updatedDocuments = [];

        if (editingDocument?.id) {
            updatedDocuments = value.map((item) =>
                item.id === editingDocument.id
                    ? {
                          ...editingDocument,
                          ...document,
                      }
                    : item
            );
        } else {
            updatedDocuments = [
                ...value,
                {
                    id: Date.now(),
                    ...document,
                },
            ];
        }

        onChange?.(updatedDocuments);

        setDrawerOpen(false);
        setEditingDocument(null);
    };

    const handlePreview = (record) => {
        console.log(
            "Preview",
            record
        );
    };

    const handleDownload = (record) => {
        console.log(
            "Download",
            record
        );
    };

    return (
        <>
            <AppCard
                title="Documents"
                extra={
                    <Space>
                        <AppButton
                            type="primary"
                            icon={
                                <PlusOutlined />
                            }
                            onClick={handleAdd}
                        >
                            Upload Document
                        </AppButton>
                    </Space>
                }
            >
                <DocumentGrid
                    data={value}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPreview={
                        handlePreview
                    }
                    onDownload={
                        handleDownload
                    }
                />
            </AppCard>

            <DocumentUploadDrawer
                open={drawerOpen}
                initialValues={
                    editingDocument
                }
                onClose={() => {
                    setDrawerOpen(
                        false
                    );

                    setEditingDocument(
                        null
                    );
                }}
                onSave={handleSave}
            />
        </>
    );
};

DocumentSection.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
};

export default DocumentSection;