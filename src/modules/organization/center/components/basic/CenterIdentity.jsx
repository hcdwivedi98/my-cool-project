import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppLookupSelect,
} from "@/components/common";

import { CENTER_TYPES } from "../../constants/centerTypes";
import { HOSPITAL_TYPES } from "../../constants/hospitalTypes";
import { OWNERSHIP_TYPES } from "../../constants/ownershipTypes";

function CenterIdentity({ readOnly = false }) {
    return (
        <AppFormSection title="Center Identity">
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Center Code"
                        name="centerCode"
                        rules={[
                            {
                                required: true,
                                message: "Center Code is required",
                            },
                            {
                                max: 20,
                                message: "Maximum 20 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Center Code"
                            uppercase
                            maxLength={20}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Center Name"
                        name="centerName"
                        rules={[
                            {
                                required: true,
                                message: "Center Name is required",
                            },
                            {
                                max: 200,
                                message: "Maximum 200 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Center Name"
                            maxLength={200}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Short Name"
                        name="shortName"
                        rules={[
                            {
                                required: true,
                                message: "Short Name is required",
                            },
                            {
                                max: 50,
                                message: "Maximum 50 characters allowed",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Short Name"
                            uppercase
                            maxLength={50}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Center Type"
                        name="centerType"
                        rules={[
                            {
                                required: true,
                                message: "Center Type is required",
                            },
                        ]}
                    >
                        <AppLookupSelect
                            options={CENTER_TYPES}
                            placeholder="Select Center Type"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Hospital Type"
                        name="hospitalType"
                    >
                        <AppLookupSelect
                            options={HOSPITAL_TYPES}
                            placeholder="Select Hospital Type"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Parent Center"
                        name="parentCenterId"
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select Parent Center"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Company"
                        name="companyId"
                    >
                        <AppLookupSelect
                            options={[]}
                            placeholder="Select Company"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Ownership Type"
                        name="ownershipType"
                    >
                        <AppLookupSelect
                            options={OWNERSHIP_TYPES}
                            placeholder="Select Ownership Type"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn />
            </AppFormRow>
        </AppFormSection>
    );
}

CenterIdentity.propTypes = {
    readOnly: PropTypes.bool,
};

export default CenterIdentity;