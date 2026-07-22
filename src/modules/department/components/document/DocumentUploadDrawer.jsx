import React from "react";
import PropTypes from "prop-types";

import AppDrawer from "@/components/common/drawer/AppDrawer";

import DocumentForm from "./DocumentForm";

const DocumentUploadDrawer = ({
    open,
    loading = false,
    initialValues,
    onClose,
    onSave,
}) => {
    const handleSubmit = () => {
        document
            .getElementById("department-document-form")
            ?.requestSubmit();
    };

    return (
        <AppDrawer
            open={open}
            width={700}
            title={
                initialValues?.id
                    ? "Update Document"
                    : "Upload Document"
            }
            loading={loading}
            onClose={onClose}
            onSave={handleSubmit}
            destroyOnClose
        >
            <DocumentForm
                id="department-document-form"
                initialValues={initialValues}
                onSubmit={onSave}
            />
        </AppDrawer>
    );
};

DocumentUploadDrawer.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,

    initialValues: PropTypes.object,

    onClose: PropTypes.func,
    onSave: PropTypes.func,
};

export default DocumentUploadDrawer;