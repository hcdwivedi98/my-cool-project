import PropTypes from "prop-types";

import {
    AppForm,
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppLookupSelect,
} from "@/components/common";

import { GST_REGISTRATION_TYPES } from "../../constants/gstRegistrationTypes";

function TaxInformation({ readOnly = false }) {
    const form = AppForm.useFormInstance();

    const gstRegistrationType = AppForm.useWatch(
        "gstRegistrationType",
        form
    );

    const isRegistered =
        gstRegistrationType === "REGULAR" ||
        gstRegistrationType === "COMPOSITION";

    return (
        <AppFormSection title="Tax Information">
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="GST Registration Type"
                        name="gstRegistrationType"
                    >
                        <AppLookupSelect
                            options={GST_REGISTRATION_TYPES}
                            placeholder="Select GST Registration Type"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="GSTIN"
                        name="gstin"
                        rules={[
                            {
                                required: isRegistered,
                                message: "GSTIN is required.",
                            },
                            {
                                pattern:
                                    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                message: "Invalid GSTIN.",
                            },
                        ]}
                    >
                        <AppInput
                            uppercase
                            maxLength={15}
                            placeholder="Enter GSTIN"
                            disabled={readOnly || !isRegistered}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="PAN"
                        name="pan"
                        rules={[
                            {
                                pattern:
                                    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                message: "Invalid PAN.",
                            },
                        ]}
                    >
                        <AppInput
                            uppercase
                            maxLength={10}
                            placeholder="Enter PAN"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="TAN"
                        name="tan"
                        rules={[
                            {
                                pattern:
                                    /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/,
                                message: "Invalid TAN.",
                            },
                        ]}
                    >
                        <AppInput
                            uppercase
                            maxLength={10}
                            placeholder="Enter TAN"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="MSME Number"
                        name="msmeNumber"
                        rules={[
                            {
                                max: 30,
                                message:
                                    "Maximum 30 characters allowed.",
                            },
                        ]}
                    >
                        <AppInput
                            uppercase
                            maxLength={30}
                            placeholder="Enter MSME Number"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn />
            </AppFormRow>
        </AppFormSection>
    );
}

TaxInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default TaxInformation;