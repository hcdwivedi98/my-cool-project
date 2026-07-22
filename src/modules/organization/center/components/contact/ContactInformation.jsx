import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
} from "@/components/common";

function ContactInformation({ readOnly = false }) {
    return (
        <AppFormSection title="Contact Information">
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Contact Person"
                        name="contactPerson"
                        rules={[
                            {
                                required: true,
                                message: "Contact Person is required",
                            },
                            {
                                max: 100,
                                message: "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Contact Person"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Designation"
                        name="designation"
                        rules={[
                            {
                                max: 100,
                                message: "Maximum 100 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Designation"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Department"
                        name="department"
                    >
                        <AppInput
                            placeholder="Enter Department"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                pattern: /^[0-9]{10}$/,
                                message: "Enter valid phone number",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Phone Number"
                            maxLength={10}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[
                            {
                                required: true,
                                message: "Mobile Number is required",
                            },
                            {
                                pattern: /^[6-9][0-9]{9}$/,
                                message: "Enter valid mobile number",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Mobile Number"
                            maxLength={10}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Emergency Contact"
                        name="emergencyContact"
                        rules={[
                            {
                                pattern: /^[6-9][0-9]{9}$/,
                                message: "Enter valid emergency contact",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Emergency Contact"
                            maxLength={10}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "Enter valid email address",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Email"
                            maxLength={100}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Website"
                        name="website"
                    >
                        <AppInput
                            placeholder="https://example.com"
                            maxLength={200}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Fax"
                        name="fax"
                    >
                        <AppInput
                            placeholder="Enter Fax Number"
                            maxLength={20}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>
        </AppFormSection>
    );
}

ContactInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default ContactInformation;