import { useEffect, useMemo } from "react";
import { Form } from "antd";

import {
    AppTabs
} from "@/components/common";

import BasicSection from "./sections/BasicSection";
import ContactSection from "./sections/ContactSection";
import LocationSection from "./sections/LocationSection";
import InventorySection from "./sections/InventorySection";
import FinancialSection from "./sections/FinancialSection";
import ApprovalSection from "./sections/ApprovalSection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

import useSubStoreLookup from "../hooks/useSubStoreLookup";

const SubStoreForm = ({
    form,
    mode,
    record,
    activeTab,
    setActiveTab,
    onDirtyChange
}) => {

    const lookup = useSubStoreLookup();

    useEffect(() => {

        if (record) {

            form.setFieldsValue(record);

        }
        else {

            form.resetFields();

        }

    }, [record, form]);

    const handleValuesChange = () => {

        onDirtyChange?.(true);

    };

    const tabItems = useMemo(() => {

        const items = [

            {
                key: "basic",
                label: "Basic",
                children: (
                    <BasicSection
                        form={form}
                        mode={mode}
                        lookup={lookup}
                    />
                )
            },

            {
                key: "contact",
                label: "Contact",
                children: (
                    <ContactSection
                        form={form}
                        mode={mode}
                    />
                )
            },

            {
                key: "location",
                label: "Location",
                children: (
                    <LocationSection
                        form={form}
                        mode={mode}
                        lookup={lookup}
                    />
                )
            },

            {
                key: "inventory",
                label: "Inventory",
                children: (
                    <InventorySection
                        form={form}
                        mode={mode}
                    />
                )
            },

            {
                key: "financial",
                label: "Financial",
                children: (
                    <FinancialSection
                        form={form}
                        mode={mode}
                    />
                )
            },

            {
                key: "approval",
                label: "Approval",
                children: (
                    <ApprovalSection
                        form={form}
                        mode={mode}
                    />
                )
            },

            {
                key: "documents",
                label: "Documents",
                children: (
                    <DocumentsSection
                        form={form}
                        mode={mode}
                    />
                )
            }

        ];

        if (record) {

            items.push({

                key: "audit",

                label: "Audit",

                children: (

                    <AuditSection
                        record={record}
                    />

                )

            });

        }

        return items;

    }, [

        form,
        mode,
        record,
        lookup

    ]);

        return (

        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValuesChange}
            disabled={mode === "VIEW"}
        >

            <AppTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
            />

        </Form>

    );

};

export default SubStoreForm;