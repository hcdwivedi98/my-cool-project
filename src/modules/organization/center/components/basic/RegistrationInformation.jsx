import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppDatePicker,
} from "@/components/common";

function RegistrationInformation({ readOnly = false }) {
    return (
        <AppFormSection title="Registration Information">
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Registration Number"
                        name="registrationNumber"
                        rules={[
                            {
                                max: 100,
                                message:
                                    "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Registration Number"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Registration Date"
                        name="registrationDate"
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            disabled={readOnly}
                            format="DD-MMM-YYYY"
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Registration Expiry"
                        name="registrationExpiry"
                        dependencies={["registrationDate"]}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const registrationDate =
                                        getFieldValue(
                                            "registrationDate"
                                        );

                                    if (
                                        !registrationDate ||
                                        !value ||
                                        value.isSameOrAfter(
                                            registrationDate,
                                            "day"
                                        )
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "Expiry date cannot be earlier than Registration Date."
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            disabled={readOnly}
                            format="DD-MMM-YYYY"
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Establishment Date"
                        name="establishmentDate"
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            disabled={readOnly}
                            format="DD-MMM-YYYY"
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="License Number"
                        name="licenseNumber"
                        rules={[
                            {
                                max: 100,
                                message:
                                    "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter License Number"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="License Expiry"
                        name="licenseExpiry"
                    >
                        <AppDatePicker
                            style={{ width: "100%" }}
                            disabled={readOnly}
                            format="DD-MMM-YYYY"
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>
        </AppFormSection>
    );
}

RegistrationInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default RegistrationInformation;