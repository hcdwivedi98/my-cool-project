import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSelect,
    AppNumberInput,
} from "../../../../components/common/form";

import {
    supplierValidation,
} from "../../validation/supplier.validation";

function FinancialTab({

    lookups = {},

}) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="paymentType"
                    label="Payment Type"
                    rules={supplierValidation.paymentType}
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Payment Type"
                        options={
                            lookups.paymentTypes || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="currencyId"
                    label="Currency"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Currency"
                        options={
                            lookups.currencies || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="creditDays"
                    label="Credit Days"
                >

                    <AppNumberInput
                        min={0}
                        max={365}
                        precision={0}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="creditLimit"
                    label="Credit Limit"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="openingBalance"
                    label="Opening Balance"
                >

                    <AppNumberInput
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="bankName"
                    label="Bank Name"
                >

                    <AppInput
                        placeholder="Enter Bank Name"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="branchName"
                    label="Branch Name"
                >

                    <AppInput
                        placeholder="Enter Branch Name"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="accountHolderName"
                    label="Account Holder Name"
                >

                    <AppInput
                        placeholder="Enter Account Holder Name"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="accountNo"
                    label="Account Number"
                >

                    <AppInput
                        placeholder="Enter Account Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="ifscCode"
                    label="IFSC Code"
                >

                    <AppInput
                        placeholder="Enter IFSC Code"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="upiId"
                    label="UPI ID"
                >

                    <AppInput
                        placeholder="Enter UPI ID"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="tdsPercentage"
                    label="TDS (%)"
                >

                    <AppNumberInput
                        min={0}
                        max={100}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="financialRemarks"
                    label="Financial Remarks"
                >

                    <AppInput.TextArea
                        rows={3}
                        placeholder="Enter Financial Remarks"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(FinancialTab);