import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSelect,
    AppSwitch,
} from "../../../../components/common/form";

import {
    supplierValidation,
} from "../../validation/supplier.validation";

function BasicInformationTab({

    lookups = {},

}) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="supplierCode"
                    label="Supplier Code"
                    rules={
                        supplierValidation.supplierCode
                    }
                >

                    <AppInput
                        placeholder="Enter Supplier Code"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="supplierName"
                    label="Supplier Name"
                    rules={
                        supplierValidation.supplierName
                    }
                >

                    <AppInput
                        placeholder="Enter Supplier Name"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="shortName"
                    label="Short Name"
                >

                    <AppInput
                        placeholder="Enter Short Name"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="supplierType"
                    label="Supplier Type"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Supplier Type"
                        options={
                            lookups.supplierTypes || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="contactPerson"
                    label="Contact Person"
                >

                    <AppInput
                        placeholder="Enter Contact Person"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="designation"
                    label="Designation"
                >

                    <AppInput
                        placeholder="Enter Designation"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="mobileNo"
                    label="Mobile Number"
                    rules={
                        supplierValidation.mobileNo
                    }
                >

                    <AppInput
                        placeholder="Enter Mobile Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="alternateMobileNo"
                    label="Alternate Mobile"
                >

                    <AppInput
                        placeholder="Enter Alternate Mobile"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="phoneNo"
                    label="Phone Number"
                >

                    <AppInput
                        placeholder="Enter Phone Number"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="email"
                    label="Email"
                >

                    <AppInput
                        placeholder="Enter Email Address"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="website"
                    label="Website"
                >

                    <AppInput
                        placeholder="Enter Website URL"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="isActive"
                    label="Active"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(BasicInformationTab);