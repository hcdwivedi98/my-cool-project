import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppSelect,
    AppSwitch,
    AppDatePicker,
    AppInput,
} from "../../../../components/common/form";

function MappingTab({

    lookups = {},

}) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="centerIds"
                    label="Centers"
                >

                    <AppSelect
                        mode="multiple"
                        allowClear
                        showSearch
                        placeholder="Select Centers"
                        options={
                            lookups.centers || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="storeIds"
                    label="Stores"
                >

                    <AppSelect
                        mode="multiple"
                        allowClear
                        showSearch
                        placeholder="Select Stores"
                        options={
                            lookups.stores || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="defaultCenterId"
                    label="Default Center"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Default Center"
                        options={
                            lookups.centers || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="defaultStoreId"
                    label="Default Store"
                >

                    <AppSelect
                        allowClear
                        showSearch
                        placeholder="Select Default Store"
                        options={
                            lookups.stores || []
                        }
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="effectiveFrom"
                    label="Effective From"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="effectiveTo"
                    label="Effective To"
                >

                    <AppDatePicker
                        className="w-full"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="preferredSupplier"
                    label="Preferred Supplier"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="defaultSupplier"
                    label="Default Supplier"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="purchaseAllowed"
                    label="Purchase Allowed"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="activeMapping"
                    label="Active Mapping"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="mappingRemarks"
                    label="Mapping Remarks"
                >

                    <AppInput.TextArea
                        rows={4}
                        placeholder="Enter Mapping Remarks"
                    />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(MappingTab);