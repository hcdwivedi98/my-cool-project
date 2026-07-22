import PropTypes from "prop-types";

import {
    AppForm,
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppDatePicker,
    AppSwitch,
} from "@/components/common";

function AccreditationInformation({ readOnly = false }) {
    const form = AppForm.useFormInstance();

    const nabhEnabled = AppForm.useWatch("nabhAccredited", form);
    const nablEnabled = AppForm.useWatch("nablAccredited", form);

    return (
        <AppFormSection title="Accreditation Information">
            {/* NABH */}
            <AppFormRow>
                <FormColumn span={8}>
                    <AppFormItem
                        label="NABH Accredited"
                        name="nabhAccredited"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn span={8}>
                    <AppFormItem
                        label="NABH Certificate No."
                        name="nabhCertificateNumber"
                        rules={[
                            {
                                required: nabhEnabled,
                                message: "Certificate Number is required.",
                            },
                            {
                                max: 100,
                                message: "Maximum 100 characters allowed.",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter NABH Certificate Number"
                            maxLength={100}
                            disabled={readOnly || !nabhEnabled}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn span={8}>
                    <AppFormItem
                        label="NABH Valid Till"
                        name="nabhValidTill"
                        rules={[
                            {
                                required: nabhEnabled,
                                message: "Validity Date is required.",
                            },
                        ]}
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            format="DD-MMM-YYYY"
                            disabled={readOnly || !nabhEnabled}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* NABL */}
            <AppFormRow>
                <FormColumn span={8}>
                    <AppFormItem
                        label="NABL Accredited"
                        name="nablAccredited"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn span={8}>
                    <AppFormItem
                        label="NABL Certificate No."
                        name="nablCertificateNumber"
                        rules={[
                            {
                                required: nablEnabled,
                                message: "Certificate Number is required.",
                            },
                            {
                                max: 100,
                                message: "Maximum 100 characters allowed.",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter NABL Certificate Number"
                            maxLength={100}
                            disabled={readOnly || !nablEnabled}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn span={8}>
                    <AppFormItem
                        label="NABL Valid Till"
                        name="nablValidTill"
                        rules={[
                            {
                                required: nablEnabled,
                                message: "Validity Date is required.",
                            },
                        ]}
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            format="DD-MMM-YYYY"
                            disabled={readOnly || !nablEnabled}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>
        </AppFormSection>
    );
}

AccreditationInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default AccreditationInformation;