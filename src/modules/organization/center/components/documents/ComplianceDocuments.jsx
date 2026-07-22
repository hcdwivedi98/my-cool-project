import { useState } from "react";
import PropTypes from "prop-types";

import { AppFormSection, AppButton } from "@/components/common";

import DocumentDrawer from "./DocumentDrawer";
import DocumentGrid from "./DocumentGrid";

function ComplianceDocuments({
    readOnly = false,
}) {
    const [documents, setDocuments] = useState([]);

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

    const handleDelete = (id) => {
        setDocuments((prev) =>
            prev.filter((x) => x.id !== id)
        );
    };

    const handleSave = (values) => {
        if (editingDocument) {
            setDocuments((prev) =>
                prev.map((item) =>
                    item.id === editingDocument.id
                        ? {
                              ...editingDocument,
                              ...values,
                          }
                        : item
                )
            );
        } else {
            setDocuments((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...values,
                },
            ]);
        }

        setDrawerOpen(false);
        setEditingDocument(null);
    };

    return (
        <AppFormSection
            title="Compliance Documents"
            extra={
                !readOnly && (
                    <AppButton
                        type="primary"
                        onClick={handleAdd}
                    >
                        Add Document
                    </AppButton>
                )
            }
        >
            <DocumentGrid
                data={documents}
                readOnly={readOnly}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DocumentDrawer
                open={drawerOpen}
                readOnly={readOnly}
                record={editingDocument}
                onClose={() => {
                    setDrawerOpen(false);
                    setEditingDocument(null);
                }}
                onSave={handleSave}
            />
        </AppFormSection>
    );
}

ComplianceDocuments.propTypes = {
    readOnly: PropTypes.bool,
};

export default ComplianceDocuments;