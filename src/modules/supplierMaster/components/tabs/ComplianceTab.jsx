import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSwitch,
    AppDatePicker,
} from "../../../../components/common/form";

function ComplianceTab() {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="isBlackListed"
                    label="Black Listed"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="blackListReason"
                    label="Black List Reason"
                >

                    <AppInput
                        placeholder="Enter Black List Reason"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="vendorSince"
                    label="Vendor Since"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="vendorRating"
                    label="Vendor Rating"
                >

                    <AppInput
                        placeholder="A / B / C"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="isoCertified"
                    label="ISO Certified"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="isoCertificateNo"
                    label="ISO Certificate No."
                >

                    <AppInput
                        placeholder="Enter ISO Certificate Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="isoExpiryDate"
                    label="ISO Expiry Date"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="approvedVendor"
                    label="Approved Vendor"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="tdsApplicable"
                    label="TDS Applicable"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstApplicable"
                    label="GST Applicable"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="complianceRemarks"
                    label="Compliance Remarks"
                >

                    <AppInput.TextArea
                        rows={4}
                        placeholder="Enter Compliance Remarks"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(ComplianceTab);