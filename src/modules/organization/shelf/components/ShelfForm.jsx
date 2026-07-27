import React from "react";
import { Form, Tabs } from "antd";

import BasicSection from "./sections/BasicSection";
import LocationSection from "./sections/LocationSection";
import CapacitySection from "./sections/CapacitySection";

import ApprovalSection from "./sections/ApprovalSection";
import DocumentsSection from "./sections/DocumentsSection";


const ShelfForm = ({
    form,
    mode = "add",
    lookups,
    record = {},
    documents = [],
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
                />
            ),
        },
        {
            key: "location",
            label: "Location",
            children: (
                <LocationSection
                    form={form}
                    lookups={lookups}
                    disabled={readOnly}
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
                />
            ),
        },
        {
            key: "approval",
            label: "Approval",
            children: (
                <ApprovalSection
                    form={form}
                    disabled={readOnly}
                />
            ),
        },
        {
            key: "documents",
            label: "Documents",
            children: (
                <DocumentsSection
                    documents={documents}
                    disabled={readOnly}
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
                destroyInactiveTabPane={false}
                items={items}
            />
        </Form>
    );
};

export default ShelfForm;