import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppLookupSelect,
} from "@/components/common";

function AddressInformation({ readOnly = false }) {
    return (
        <AppFormSection title="Address Information">
            {/* Address */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Address Line 1"
                        name="addressLine1"
                        rules={[
                            {
                                required: true,
                                message: "Address Line 1 is required",
                            },
                            {
                                max: 250,
                                message: "Maximum 250 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Address Line 1"
                            maxLength={250}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Address Line 2"
                        name="addressLine2"
                        rules={[
                            {
                                max: 250,
                                message: "Maximum 250 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Address Line 2"
                            maxLength={250}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Landmark"
                        name="landmark"
                    >
                        <AppInput
                            placeholder="Enter Landmark"
                            maxLength={150}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* Location */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Country"
                        name="countryId"
                        rules={[
                            {
                                required: true,
                                message: "Country is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select Country"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="State"
                        name="stateId"
                        rules={[
                            {
                                required: true,
                                message: "State is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select State"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="District"
                        name="districtId"
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select District"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* City */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="City"
                        name="cityId"
                        rules={[
                            {
                                required: true,
                                message: "City is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select City"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Pin Code"
                        name="pinCode"
                        rules={[
                            {
                                required: true,
                                message: "Pin Code is required",
                            },
                            {
                                pattern: /^[1-9][0-9]{5}$/,
                                message: "Invalid Pin Code",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Pin Code"
                            maxLength={6}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn />
            </AppFormRow>

            {/* Geo Location */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Latitude"
                        name="latitude"
                    >
                        <AppInput
                            placeholder="Latitude"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Longitude"
                        name="longitude"
                    >
                        <AppInput
                            placeholder="Longitude"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn />
            </AppFormRow>
        </AppFormSection>
    );
}

AddressInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default AddressInformation;