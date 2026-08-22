import React from "react";
import { Form, Tabs } from "antd";

import BasicSection from "./sections/BasicSection";
import LocationSection from "./sections/LocationSection";
import CapacitySection from "./sections/CapacitySection";
import ApprovalSection from "./sections/ApprovalSection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

const BinForm = ({
    form,
    mode = "add",
    record = {},
    lookups = {},
    documents = [],
    onDirtyChange = () => {},
}) => {
    const readOnly = mode === "view";

    const items = [
        {
            key: "basic",
            label: "Basic Information",

            children: (
                <BasicSection
                    form={form}
                    lookups={lookups}
                    disabled={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            ),
        },

        {
            key: "location",
            label: "Location",

            children: (
                <LocationSection
                    form={form}
                    disabled={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            ),
        },

        {
            key: "capacity",
            label: "Capacity",

            children: (
                <CapacitySection
                    form={form}
                    disabled={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            ),
        },

        {
            key: "approval",
            label: "Approval",

            children: (
                <ApprovalSection
                    form={form}
                    lookups={lookups}
                    disabled={readOnly}
                    onDirtyChange={onDirtyChange}
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
                    onDirtyChange={onDirtyChange}
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
                items={items}
                destroyOnHidden={false}
            />
        </Form>
    );
};

export default BinForm;