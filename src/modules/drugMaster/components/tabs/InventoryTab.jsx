import React, { memo } from "react";
import {
    AppFormGrid,
    AppFormItem,
    AppNumberInput,
    AppSelect,
    AppSwitch,
    AppInput,
} from "../../../../components/common/form";

function InventoryTab({ lookups = {} }) {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="minimumStock"
                    label="Minimum Stock"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="maximumStock"
                    label="Maximum Stock"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="reorderLevel"
                    label="Reorder Level"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="reorderQuantity"
                    label="Reorder Qty"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="criticalLevel"
                    label="Critical Level"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="safetyStock"
                    label="Safety Stock"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="shelfLife"
                    label="Shelf Life (Months)"
                >
                    <AppNumberInput min={1} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="expiryAlertDays"
                    label="Expiry Alert (Days)"
                >
                    <AppNumberInput min={0} precision={0}/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="abcCategory"
                    label="ABC Category"
                >
                    <AppSelect
                        options={lookups.abcCategories}
                        allowClear
                    />
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="vedCategory"
                    label="VED Category"
                >
                    <AppSelect
                        options={lookups.vedCategories}
                        allowClear
                    />
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="fsnCategory"
                    label="FSN Category"
                >
                    <AppSelect
                        options={lookups.fsnCategories}
                        allowClear
                    />
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="storageLocation"
                    label="Storage Location"
                >
                    <AppInput/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="batchRequired"
                    label="Batch Required"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="expiryRequired"
                    label="Expiry Required"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="serialRequired"
                    label="Serial Required"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="temperatureSensitive"
                    label="Temperature Sensitive"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="coldStorage"
                    label="Cold Storage"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="highValueItem"
                    label="High Value Item"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="allowNegativeStock"
                    label="Allow Negative Stock"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="autoReorder"
                    label="Auto Reorder"
                    valuePropName="checked"
                >
                    <AppSwitch/>
                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="inventoryRemarks"
                    label="Inventory Remarks"
                >
                    <AppInput.TextArea
                        rows={3}
                        maxLength={500}
                    />
                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(InventoryTab);