import { useEffect, useMemo, useState } from "react";
import { Form } from "antd";

import {
    AppTabs,
    AppButton
} from "@/components/common";

import useStoreLookup from "../hooks/useStoreLookup";

import {
    DRAWER_MODE,
    STORE_FORM_TABS
} from "../constants/store.constants";

import { prepareStorePayload } from "../utils/store.helper";

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
    mode,
    record,
    onSave,
    stores,
    onCancel,
    onDirtyChange
}) => {

    const [form] = Form.useForm();

    const lookup = useStoreLookup(form);

    const isView = mode === DRAWER_MODE.VIEW;

    const [activeTab, setActiveTab] = useState("basic");

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        setActiveTab("basic");

        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }

    }, [record, form]);

    const handleFinish = async () => {

        if (saving) {
            return;
        }

        setSaving(true);

        try {

            const values = await form.validateFields();

            const payload =
                prepareStorePayload(values);

            await onSave?.(payload);

            onDirtyChange?.(false);

        } catch (error) {

            if (error.errorFields?.length) {

                const firstField =
                    error.errorFields[0].name[0];

                const tab =
                    STORE_FORM_TABS[firstField];

                if (tab) {
                    setActiveTab(tab);
                }

                form.scrollToField(firstField, {
                    behavior: "smooth",
                    block: "center"
                });

            }

        } finally {

            setSaving(false);

        }

    };

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