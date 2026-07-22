import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSelect,
    AppDatePicker,
} from "../../../../components/common/form";

import {
    supplierValidation,
} from "../../validation/supplier.validation";

function BusinessTab({

    lookups = {},

}) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstNo"
                    label="GST Number"
                    rules={supplierValidation.gstNo}
                >

                    <AppInput
                        placeholder="Enter GST Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="panNo"
                    label="PAN Number"
                >

                    <AppInput
                        placeholder="Enter PAN Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="drugLicenseNo"
                    label="Drug License No."
                >

                    <AppInput
                        placeholder="Enter Drug License Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="drugLicenseExpiry"
                    label="Drug License Expiry"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="foodLicenseNo"
                    label="Food License No."
                >

                    <AppInput
                        placeholder="Enter Food License Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="foodLicenseExpiry"
                    label="Food License Expiry"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="msmeNo"
                    label="MSME Number"
                >

                    <AppInput
                        placeholder="Enter MSME Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="supplierCategoryId"
                    label="Supplier Category"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Supplier Category"
                        options={lookups.supplierCategories || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="businessTypeId"
                    label="Business Type"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Business Type"
                        options={lookups.businessTypes || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="registrationNo"
                    label="Registration Number"
                >

                    <AppInput
                        placeholder="Enter Registration Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="businessRemarks"
                    label="Business Remarks"
                >

                    <AppInput.TextArea
                        rows={3}
                        placeholder="Enter Business Remarks"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(BusinessTab);