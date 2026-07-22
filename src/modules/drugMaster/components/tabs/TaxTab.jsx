import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppSelect,
    AppSwitch,
    AppInput,
    AppNumberInput,
} from "../../../../components/common/form";

function TaxTab({ lookups = {} }) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstId"
                    label="GST"
                    rules={[
                        {
                            required: true,
                            message: "GST is required",
                        },
                    ]}
                >

                    <AppSelect
                        allowClear
                        showSearch
                        options={lookups.gst}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstRate"
                    label="GST %"
                >

                    <AppNumberInput
                        min={0}
                        max={100}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="cgst"
                    label="CGST %"
                >

                    <AppNumberInput
                        disabled
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="sgst"
                    label="SGST %"
                >

                    <AppNumberInput
                        disabled
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="igst"
                    label="IGST %"
                >

                    <AppNumberInput
                        disabled
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="taxInclusive"
                    label="Tax Inclusive"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="cessApplicable"
                    label="CESS Applicable"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="cessRate"
                    label="CESS %"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="tcsApplicable"
                    label="TCS Applicable"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="tdsApplicable"
                    label="TDS Applicable"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="taxRemarks"
                    label="Tax Remarks"
                >

                    <AppInput.TextArea
                        rows={3}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(TaxTab);