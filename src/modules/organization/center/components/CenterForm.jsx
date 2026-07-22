import { useEffect, useState } from "react";

import {
    AppForm,
    AppButton,
    AppTabs,
} from "@/components/common";

import BasicInformationSection from "./sections/BasicInformationSection";
import ContactInformationSection from "./sections/ContactInformationSection";
import AddressInformationSection from "./sections/AddressInformationSection";
import ConfigurationSection from "./sections/ConfigurationSection";
import DocumentSection from "./sections/DocumentSection";
const DEFAULT_VALUES = {
    code: "",
    name: "",
    shortName: "",

    centerType: null,
    hospitalType: null,

    registrationNo: "",
    gstin: "",
    pan: "",

    description: "",

    phone: "",
    mobile: "",
    email: "",
    website: "",
    emergencyContact: "",

    address1: "",
    address2: "",

    country: null,
    state: null,
    city: null,
    pinCode: "",

    isActive: true,
    hisEnabled: false,
    warehouse: false,
    allowBilling: true,

    logo: null,
};

function CenterForm({
    mode = "create",
    initialValues,
    loading = false,
    saving = false,
    onCancel,
    onSubmit,
}) {

    const [form] = AppForm.useForm();
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...DEFAULT_VALUES,
                ...initialValues,
            });

            setLogo(initialValues.logo ?? null);
        } else {
            form.resetFields();

            form.setFieldsValue(DEFAULT_VALUES);

            setLogo(null);
        }
    }, [initialValues, form]);

    const handleFinish = (values) => {
        onSubmit?.({
            ...values,
            logo,
        });
    };

    const readOnly = mode === "view";

    return (

        <AppForm
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            disabled={loading}
        >

            <AppTabs
                items={[
                    {
                        key: "basic",
                        label: "Basic Information",
                        children: (
                            <BasicInformationSection
                                mode={mode}
                                readOnly={readOnly}
                            />
                        ),
                    },
                    {
                        key: "contact",
                        label: "Contact",
                        children: (
                            <ContactInformationSection
                                mode={mode}
                                readOnly={readOnly}
                            />
                        ),
                    },
                    {
                        key: "address",
                        label: "Address",
                        children: (
                            <AddressInformationSection
                                mode={mode}
                                readOnly={readOnly}
                            />
                        ),
                    },
                    {
                        key: "configuration",
                        label: "Configuration",
                        children: (
                            <ConfigurationSection
                                mode={mode}
                                readOnly={readOnly}
                            />
                        ),
                    },
                    {
                        key: "documents",
                        label: "Documents",
                        children: (
                            <DocumentSection
    form={form}
    readOnly={readOnly}
    logo={logo}
    onLogoChange={setLogo}
/>
                        ),
                    },
                ]}
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    marginTop: 24,
                }}
            >
                <AppButton onClick={onCancel}>
                    Cancel
                </AppButton>

                {mode !== "view" && (
                    <AppButton
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                    >
                        Save
                    </AppButton>
                )}
            </div>
        </AppForm>

    );
}

export default CenterForm;