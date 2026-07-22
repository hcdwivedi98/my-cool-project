import { useCallback, useMemo, useState } from "react";

import {
    validateDocument,
} from "../utils/documentValidation";

const generateId = () =>
    crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random()}`;

export default function useDepartmentDocuments(
    initialDocuments = []
) {
    const [documents, setDocuments] =
        useState(initialDocuments);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [editingDocument, setEditingDocument] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    /**
     * Drawer
     */

    const openCreateDrawer = useCallback(() => {
        setEditingDocument(null);
        setDrawerOpen(true);
    }, []);

    const openEditDrawer = useCallback(
        (document) => {
            setEditingDocument(document);
            setDrawerOpen(true);
        },
        []
    );

    const closeDrawer = useCallback(() => {
        setEditingDocument(null);
        setDrawerOpen(false);
    }, []);

    /**
     * Save
     */

    const saveDocument = useCallback(
        (values) => {
            setLoading(true);

            const errors =
                validateDocument({
                    ...values,
                    documents,
                    currentId:
                        editingDocument?.id,
                });

            if (
                Object.keys(errors).length
            ) {
                setLoading(false);

                return {
                    success: false,
                    errors,
                };
            }

            if (editingDocument) {
                setDocuments((prev) =>
                    prev.map((item) =>
                        item.id ===
                        editingDocument.id
                            ? {
                                  ...item,
                                  ...values,
                              }
                            : item
                    )
                );
            } else {
                setDocuments((prev) => [
                    ...prev,
                    {
                        id: generateId(),
                        ...values,
                    },
                ]);
            }

            setLoading(false);

            closeDrawer();

            return {
                success: true,
            };
        },
        [
            documents,
            editingDocument,
            closeDrawer,
        ]
    );

    /**
     * Delete
     */

    const deleteDocument =
        useCallback((id) => {
            setDocuments((prev) =>
                prev.filter(
                    (item) =>
                        item.id !== id
                )
            );
        }, []);

    /**
     * Preview
     */

    const previewDocument =
        useCallback((document) => {
            console.log(
                "Preview",
                document
            );
        }, []);

    /**
     * Download
     */

    const downloadDocument =
        useCallback((document) => {
            console.log(
                "Download",
                document
            );
        }, []);

    /**
     * Reset
     */

    const clearDocuments =
        useCallback(() => {
            setDocuments([]);
        }, []);

    /**
     * Derived State
     */

    const totalDocuments = useMemo(
        () => documents.length,
        [documents]
    );

    return {
        loading,

        documents,

        totalDocuments,

        drawerOpen,

        editingDocument,

        openCreateDrawer,

        openEditDrawer,

        closeDrawer,

        saveDocument,

        deleteDocument,

        previewDocument,

        downloadDocument,

        clearDocuments,
    };
}