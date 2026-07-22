import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSelect,
} from "../../../../components/common/form";

function AddressTab({

    lookups = {},

}) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="address1"
                    label="Address Line 1"
                >

                    <AppInput
                        placeholder="Enter Address Line 1"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="address2"
                    label="Address Line 2"
                >

                    <AppInput
                        placeholder="Enter Address Line 2"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="countryId"
                    label="Country"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Country"
                        options={lookups.countries || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="stateId"
                    label="State"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select State"
                        options={lookups.states || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="cityId"
                    label="City"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select City"
                        options={lookups.cities || []}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="pinCode"
                    label="PIN Code"
                >

                    <AppInput
                        placeholder="Enter PIN Code"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="district"
                    label="District"
                >

                    <AppInput
                        placeholder="Enter District"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="landmark"
                    label="Landmark"
                >

                    <AppInput
                        placeholder="Enter Landmark"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="latitude"
                    label="Latitude"
                >

                    <AppInput
                        placeholder="Latitude"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="longitude"
                    label="Longitude"
                >

                    <AppInput
                        placeholder="Longitude"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="addressRemarks"
                    label="Address Remarks"
                >

                    <AppInput.TextArea
                        rows={3}
                        placeholder="Enter Address Remarks"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(AddressTab);