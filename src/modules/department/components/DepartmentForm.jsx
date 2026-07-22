import { useEffect, useMemo } from "react";
import { Form } from "antd";

import {AppTabs} from "@/components/common/layout";

import BasicInformationSection from "./sections/BasicInformationSection";
import ContactInformationSection from "./sections/ContactInformationSection";
import LocationSection from "./sections/LocationSection";
import ConfigurationSection from "./sections/ConfigurationSection";
import DocumentSection from "./sections/DocumentSection";

const DepartmentForm = ({
    initialValues = {},
    documents = [],
    onSave,
    onCancel,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleFinish = (values) => {
        onSave?.({
            ...values,
            documents,
        });
    };

    const items = useMemo(
        () => [
            {
                key: "basic",
                label: "Basic Information",
                children: (
                    <BasicInformationSection form={form} />
                ),
            },
            {
                key: "contact",
                label: "Contact",
                children: (
                    <ContactInformationSection form={form} />
                ),
            },
            {
                key: "location",
                label: "Location",
                children: (
                    <LocationSection form={form} />
                ),
            },
            {
                key: "configuration",
                label: "Configuration",
                children: (
                    <ConfigurationSection form={form} />
                ),
            },
            {
                key: "documents",
                label: `Documents (${documents.length})`,
                children: (
                    <DocumentSection />
                ),
            },
        ],
        [documents.length, form]
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
        >
            <AppTabs items={items} />

            {/* Hidden submit for Drawer Footer */}
            <button
                id="department-form-submit"
                type="submit"
                hidden
            />
        </Form>
    );
};

export default DepartmentForm;