import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppInput,
    AppUpload,
} from "@/components/common";

function DescriptionSection({ readOnly = false }) {
    return (
        <AppFormSection title="Description & Branding">
            <AppFormRow>
                <FormColumn span={24}>
                    <AppFormItem
                        label="Description"
                        name="description"
                        rules={[
                            {
                                max: 1000,
                                message:
                                    "Maximum 1000 characters allowed.",
                            },
                        ]}
                    >
                        <AppInput.TextArea
                            rows={5}
                            maxLength={1000}
                            showCount
                            placeholder="Enter Center Description"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            <AppFormRow>
                <FormColumn span={12}>
                    <AppFormItem
                        label="Remarks"
                        name="remarks"
                        rules={[
                            {
                                max: 500,
                                message:
                                    "Maximum 500 characters allowed.",
                            },
                        ]}
                    >
                        <AppInput.TextArea
                            rows={3}
                            maxLength={500}
                            showCount
                            placeholder="Internal Remarks"
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>

                <FormColumn span={12}>
                    <AppFormItem
                        label="Hospital Logo"
                        name="logo"
                        valuePropName="fileList"
                    >
                        <AppUpload
                            accept=".png,.jpg,.jpeg,.svg"
                            maxCount={1}
                            disabled={readOnly}
                        />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>
        </AppFormSection>
    );
}

DescriptionSection.propTypes = {
    readOnly: PropTypes.bool,
};

export default DescriptionSection;