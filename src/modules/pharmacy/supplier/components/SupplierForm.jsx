// src/modules/pharmacy/supplier/components/SupplierForm.jsx

import React from "react";

import {
    Form,
    Tabs,
} from "antd";

import BasicSection from "./sections/BasicSection";
import ContactSection from "./sections/ContactSection";
import AddressSection from "./sections/AddressSection";
import RegulatorySection from "./sections/RegulatorySection";
import CommercialSection from "./sections/CommercialSection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

const SupplierForm = ({
    form,
    mode = "ADD",
    record = {},
    lookup = {},

    activeTab = "basic",
    setActiveTab,

    onDirtyChange = () => {},
}) => {
    const readOnly =
        String(mode).toUpperCase() ===
        "VIEW";

    const items = [
        {
            key: "basic",
            label: "Basic Information",

            children: (
                <BasicSection
                    lookup={lookup}
                    readOnly={readOnly}
                    onDirtyChange={
                        onDirtyChange
                    }
                />
            ),
        },

        {
            key: "contact",
            label: "Contact Information",

            children: (
                <ContactSection
                    readOnly={readOnly}
                    onDirtyChange={
                        onDirtyChange
                    }
                />
            ),
        },

        {
            key: "address",
            label: "Address",

            children: (
                <AddressSection
                    lookup={lookup}
                    readOnly={readOnly}
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
                    lookup={lookup}
                    readOnly={readOnly}
                    onDirtyChange={
                        onDirtyChange
                    }
                />
            ),
        },

        {
            key: "commercial",
            label: "Commercial",

            children: (
                <CommercialSection
                    form={form}
                    lookup={lookup}
                    readOnly={readOnly}
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
                    readOnly={readOnly}
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
    ];

    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            preserve={false}
        >
            <Tabs
                activeKey={activeTab}
                items={items}
                destroyInactiveTabPane={
                    false
                }
                onChange={(key) => {
                    setActiveTab?.(key);
                }}
            />
        </Form>
    );
};

export default SupplierForm;