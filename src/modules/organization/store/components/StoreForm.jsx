import { useEffect, useMemo } from "react";
import { Form } from "antd";

import {
    AppTabs
} from "@/components/common";

import useStoreLookup from "../hooks/useStoreLookup";

import { DRAWER_MODE } from "../constants/store.constants";

import BasicInformationSection from "./sections/BasicInformationSection";
import ContactInformationSection from "./sections/ContactInformationSection";
import LocationSection from "./sections/LocationSection";
import InventoryConfigurationSection from "./sections/InventoryConfigurationSection";
import FinancialConfigurationSection from "./sections/FinancialConfigurationSection";
import PrinterConfigurationSection from "./sections/PrinterConfigurationSection";
import WorkingHoursSection from "./sections/WorkingHoursSection";
import ApprovalSection from "./sections/ApprovalSection";
import DocumentSection from "./sections/DocumentSection";
import AuditInformationSection from "./sections/AuditInformationSection";
const StoreForm = ({
    form,
    activeTab,
    setActiveTab,
    mode,
    record,
    stores,
    onDirtyChange
}) => {
    const lookup = useStoreLookup(form);

const isView = mode === DRAWER_MODE.VIEW;
useEffect(() => {

    setActiveTab("basic");

    if (record) {

        form.setFieldsValue(record);

    }
    else {

        form.resetFields();

    }

}, [
    form,
    record,
    setActiveTab
]);
const tabItems = useMemo(() => {

    const items = [

        {
            key: "basic",
            label: "Basic Information",
            children: (
                <BasicInformationSection
                    lookup={lookup}
                    isView={isView}
                    stores={stores}
                    currentId={record?.id}
                />
            )
        },

        {
            key: "contact",
            label: "Contact Information",
            children: (
                <ContactInformationSection
                    form={form}
                    isView={isView}
                />
            )
        },

        {
            key: "location",
            label: "Location",
            children: (
                <LocationSection
                    form={form}
                    lookup={lookup}
                    isView={isView}
                />
            )
        },

        {
            key: "inventory",
            label: "Inventory Configuration",
            children: (
                <InventoryConfigurationSection
                    form={form}
                    isView={isView}
                />
            )
        },

        {
            key: "financial",
            label: "Financial Configuration",
            children: (
                <FinancialConfigurationSection
                    form={form}
                    isView={isView}
                />
            )
        },
               {
            key: "printer",
            label: "Printer Configuration",
            children: (
                <PrinterConfigurationSection
                    form={form}
                    isView={isView}
                />
            )
        },

        {
            key: "workingHours",
            label: "Working Hours",
            children: (
                <WorkingHoursSection
                    form={form}
                    isView={isView}
                />
            )
        },

        {
            key: "approval",
            label: "Approval",
            children: (
                <ApprovalSection
                    form={form}
                    isView={isView}
                />
            )
        },

        {
            key: "documents",
            label: "Documents",
            children: (
                <DocumentSection
                    form={form}
                    isView={isView}
                />
            )
        }

    ];

    if (record) {

        items.push({
            key: "audit",
            label: "Audit Information",
            children: (
                <AuditInformationSection
                    isView={isView}
                />
            )
        });

    }

    return items;

}, [
    lookup,
    isView,
    stores,
    record,
    form
]);
return (

    <Form
        form={form}
        layout="vertical"
        onValuesChange={() => {

            onDirtyChange?.(true);

        }}
    >

        <AppTabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
        />

    </Form>

);

};


export default StoreForm;