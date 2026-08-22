import React, { useMemo } from "react";
import { Tabs } from "antd";

import BasicSection from "./sections/BasicSection";
import ClassificationSection from "./sections/ClassificationSection";
import CompositionSection from "./sections/CompositionSection";
import StrengthSection from "./sections/StrengthSection";
import PackagingSection from "./sections/PackagingSection";
import StorageSection from "./sections/StorageSection";
import InventorySection from "./sections/InventorySection";
import ManufacturerSection from "./sections/ManufacturerSection";
import SupplierSection from "./sections/SupplierSection";
import RegulatorySection from "./sections/RegulatorySection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

const DrugForm = ({
    form,
    mode = "ADD",
    record = {},
    lookups = {},
    documents = [],
    activeTab = "basic",
    setActiveTab,
    onDirtyChange = () => {},
}) => {
    const readOnly =
        mode === "VIEW" ||
        mode === "view";

    const items = useMemo(
        () => [
            {
                key: "basic",
                label: "Basic Information",
                children: (
                    <BasicSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "classification",
                label: "Classification",
                children: (
                    <ClassificationSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "composition",
                label: "Composition",
                children: (
                    <CompositionSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "strength",
                label: "Strength & Dosage",
                children: (
                    <StrengthSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "packaging",
                label: "Packaging",
                children: (
                    <PackagingSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "storage",
                label: "Storage",
                children: (
                    <StorageSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "inventory",
                label: "Inventory",
                children: (
                    <InventorySection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "manufacturer",
                label: "Manufacturer",
                children: (
                    <ManufacturerSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "suppliers",
                label: "Suppliers",
                children: (
                    <SupplierSection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "regulatory",
                label: "Regulatory",
                children: (
                    <RegulatorySection
                        form={form}
                        lookups={lookups}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "documents",
                label: "Documents",
                children: (
                    <DocumentsSection
                        form={form}
                        record={record}
                        documents={documents}
                        disabled={readOnly}
                        onDirtyChange={
                            onDirtyChange
                        }
                    />
                ),
            },

            {
                key: "audit",
                label: "Audit",
                children: (
                    <AuditSection
                        record={record}
                    />
                ),
            },
        ],
        [
            form,
            lookups,
            record,
            documents,
            readOnly,
            onDirtyChange,
        ]
    );

    return (
        <Tabs
            activeKey={activeTab}
            items={items}
            destroyOnHidden={false}
            onChange={(key) => {
                setActiveTab?.(key);
            }}
        />
    );
};

export default React.memo(DrugForm);