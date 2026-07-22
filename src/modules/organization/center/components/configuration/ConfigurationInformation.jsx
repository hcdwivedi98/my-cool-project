import PropTypes from "prop-types";

import {
    AppFormSection,
    AppFormRow,
    FormColumn,
    AppFormItem,
    AppSwitch,
} from "@/components/common";

function ConfigurationInformation({ readOnly = false }) {
    return (
        <AppFormSection title="Configuration">
            {/* Row 1 */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Active"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Pharmacy Enabled"
                        name="pharmacyEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Warehouse Enabled"
                        name="warehouseEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* Row 2 */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Billing Enabled"
                        name="billingEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="HIS Integration"
                        name="hisEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Allow Login"
                        name="allowLogin"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* Row 3 */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="OPD Enabled"
                        name="opdEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="IPD Enabled"
                        name="ipdEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Emergency Enabled"
                        name="emergencyEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>

            {/* Row 4 */}
            <AppFormRow>
                <FormColumn>
                    <AppFormItem
                        label="Laboratory Enabled"
                        name="laboratoryEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="Radiology Enabled"
                        name="radiologyEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>

                <FormColumn>
                    <AppFormItem
                        label="OT Enabled"
                        name="otEnabled"
                        valuePropName="checked"
                    >
                        <AppSwitch disabled={readOnly} />
                    </AppFormItem>
                </FormColumn>
            </AppFormRow>
        </AppFormSection>
    );
}

ConfigurationInformation.propTypes = {
    readOnly: PropTypes.bool,
};

export default ConfigurationInformation;