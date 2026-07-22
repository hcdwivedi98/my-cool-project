import PropTypes from "prop-types";
import dayjs from "dayjs";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppLookupSelect,
    AppDatePicker,
    AppUpload,
} from "@/components/common";

const LICENSE_TYPES = [
    {
        label: "Drug License",
        value: "DRUG",
    },
    {
        label: "Retail Drug License",
        value: "RETAIL",
    },
    {
        label: "Wholesale Drug License",
        value: "WHOLESALE",
    },
    {
        label: "Trade License",
        value: "TRADE",
    },
    {
        label: "Hospital Registration",
        value: "HOSPITAL",
    },
    {
        label: "Biomedical Waste",
        value: "BMW",
    },
    {
        label: "Other",
        value: "OTHER",
    },
];

function disabledFutureDate(current) {
    return current && current > dayjs().endOf("day");
}

function disabledExpiry(current, form) {
    const issueDate = form.getFieldValue("licenseIssueDate");

    if (!issueDate) return false;

    return current && current < dayjs(issueDate).startOf("day");
}

function LicenseInformation({
    form,
    readOnly = false,
}) {
    return (
        <AppFormSection title="License Information">

            <AppFormRow>

                <FormColumn>

                    <AppFormItem
                        label="License Type"
                        name="licenseType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select License Type",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={LICENSE_TYPES}
                            disabled={readOnly}
                            placeholder="Select License Type"
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn>

                    <AppFormItem
                        label="License Number"
                        name="licenseNumber"
                        rules={[
                            {
                                required: true,
                                message:
                                    "License Number is required",
                            },
                            {
                                max: 50,
                            },
                        ]}
                    >
                        <AppInput
                            disabled={readOnly}
                            maxLength={50}
                            placeholder="Enter License Number"
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn>

                    <AppFormItem
                        label="Issued By"
                        name="issuedBy"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Issued By is required",
                            },
                        ]}
                    >
                        <AppInput
                            disabled={readOnly}
                            maxLength={150}
                            placeholder="Licensing Authority"
                        />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

            <AppFormRow>

                <FormColumn>

                    <AppFormItem
                        label="Issue Date"
                        name="licenseIssueDate"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Issue Date is required",
                            },
                        ]}
                    >
                        <AppDatePicker
                            disabled={readOnly}
                            disabledDate={disabledFutureDate}
                            style={{ width: "100%" }}
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn>

                    <AppFormItem
                        label="Expiry Date"
                        name="licenseExpiryDate"
                        dependencies={[
                            "licenseIssueDate",
                        ]}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Expiry Date is required",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {

                                    const issue =
                                        getFieldValue(
                                            "licenseIssueDate"
                                        );

                                    if (
                                        !issue ||
                                        !value
                                    )
                                        return Promise.resolve();

                                    if (
                                        dayjs(value).isAfter(issue)
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "Expiry Date should be greater than Issue Date"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <AppDatePicker
                            disabled={readOnly}
                            disabledDate={(current) =>
                                disabledExpiry(
                                    current,
                                    form
                                )
                            }
                            style={{ width: "100%" }}
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn>

                    <AppFormItem
                        label="Attachment"
                        name="licenseAttachment"
                    >
                        <AppUpload
                            disabled={readOnly}
                            accept=".pdf,.jpg,.jpeg,.png"
                            maxCount={1}
                        />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

            <AppFormRow>

                <FormColumn span={3}>

                    <AppFormItem
                        label="Remarks"
                        name="licenseRemarks"
                    >
                        <AppInput.TextArea
                            rows={3}
                            disabled={readOnly}
                            maxLength={500}
                            placeholder="Remarks..."
                        />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

        </AppFormSection>
    );
}

LicenseInformation.propTypes = {
    form: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
};

export default LicenseInformation;