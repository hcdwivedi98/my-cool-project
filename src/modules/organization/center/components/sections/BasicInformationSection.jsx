import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppLookupSelect,
} from "@/components/common";

import {
    CENTER_TYPES,
    HOSPITAL_TYPES,
} from "../../constants/centerLookup";

import {
    centerValidation,
} from "../../constants/centerValidation";

function BasicInformationSection({
    readOnly = false,
}) {

    return (

        <AppFormSection title="Basic Information">

            <AppFormRow>

                <FormColumn span={6}>

                    <AppFormItem
                        name="code"
                        label="Center Code"
                        rules={centerValidation.code}
                        required
                        readOnly={readOnly}
                    >
                        <AppInput />
                    </AppFormItem>

                </FormColumn>

                <FormColumn span={12}>

                    <AppFormItem
                        name="name"
                        label="Center Name"
                        rules={centerValidation.name}
                        required
                        readOnly={readOnly}
                    >
                        <AppInput />
                    </AppFormItem>

                </FormColumn>

                <FormColumn span={6}>

                    <AppFormItem
                        name="shortName"
                        label="Short Name"
                        readOnly={readOnly}
                    >
                        <AppInput />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

            <AppFormRow>

                <FormColumn span={8}>

                    <AppFormItem
                        name="centerType"
                        label="Center Type"
                        rules={centerValidation.centerType}
                        required
                        readOnly={readOnly}
                    >
                        <AppLookupSelect
                            options={CENTER_TYPES}
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn span={8}>

                    <AppFormItem
                        name="hospitalType"
                        label="Hospital Type"
                        readOnly={readOnly}
                    >
                        <AppLookupSelect
                            options={HOSPITAL_TYPES}
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn span={8}>

                    <AppFormItem
                        name="registrationNo"
                        label="Registration No."
                        readOnly={readOnly}
                    >
                        <AppInput />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

            <AppFormRow>

                <FormColumn span={12}>

                    <AppFormItem
                        name="gstin"
                        label="GSTIN"
                        readOnly={readOnly}
                    >
                        <AppInput
                            uppercase
                            maxLength={15}
                        />
                    </AppFormItem>

                </FormColumn>

                <FormColumn span={12}>

                    <AppFormItem
                        name="pan"
                        label="PAN"
                        readOnly={readOnly}
                    >
                        <AppInput
                            uppercase
                            maxLength={10}
                        />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

            <AppFormRow>

                <FormColumn span={24}>

                    <AppFormItem
                        name="description"
                        label="Description"
                        readOnly={readOnly}
                    >
                        <AppInput
                            variant="textarea"
                            rows={3}
                            showCount
                            maxLength={500}
                        />
                    </AppFormItem>

                </FormColumn>

            </AppFormRow>

        </AppFormSection>

    );

}

BasicInformationSection.propTypes = {
    readOnly: PropTypes.bool,
};

export default BasicInformationSection;