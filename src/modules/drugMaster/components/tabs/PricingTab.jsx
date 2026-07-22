// src/modules/drugMaster/components/tabs/PricingTab.jsx

import React, { memo, useEffect } from "react";
import { Form } from "antd";

import {
    AppFormGrid,
    AppFormItem,
    AppNumberInput,
    AppSelect,
    AppDatePicker,
    AppSwitch,
} from "../../../../components/common/form";

function PricingTab({ lookups = {} }) {

    const form = Form.useFormInstance();

    const purchasePrice = Form.useWatch("purchasePrice", form);
    const landingCost = Form.useWatch("landingCost", form);
    const salePrice = Form.useWatch("salePrice", form);
    const mrp = Form.useWatch("mrp", form);
    const gstRate = Form.useWatch("gstRate", form);

    //------------------------------------------------------
    // Auto Margin Calculation
    //------------------------------------------------------

    useEffect(() => {

        const cost = Number(landingCost || purchasePrice || 0);
        const sale = Number(salePrice || 0);

        if (!cost || !sale) {

            form.setFieldValue("marginPercentage", 0);
            return;

        }

        const margin = ((sale - cost) / cost) * 100;

        form.setFieldValue(
            "marginPercentage",
            Number(margin.toFixed(2))
        );

    }, [

        purchasePrice,
        landingCost,
        salePrice,
        form,

    ]);

    //------------------------------------------------------
    // GST Amount
    //------------------------------------------------------

    useEffect(() => {

        const sale = Number(salePrice || 0);
        const gst = Number(gstRate || 0);

        const gstAmount =
            sale * gst / 100;

        form.setFieldValue(
            "gstAmount",
            Number(gstAmount.toFixed(2))
        );

    }, [

        salePrice,
        gstRate,
        form,

    ]);

    //------------------------------------------------------

    return (

        <AppFormGrid>

            {/* Purchase Price */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="purchasePrice"
                    label="Purchase Price"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Landing Cost */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="landingCost"
                    label="Landing Cost"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Cost Price */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="costPrice"
                    label="Cost Price"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* PTR */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="ptr"
                    label="PTR"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* PTS */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="pts"
                    label="PTS"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* MRP */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="mrp"
                    label="MRP"
                    rules={[
                        {
                            required: true,
                            message: "MRP is required",
                        },
                    ]}
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Sale Price */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="salePrice"
                    label="Sale Price"
                    rules={[
                        {
                            required: true,
                            message: "Sale Price is required",
                        },
                    ]}
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Discount */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="discountPercentage"
                    label="Discount %"
                >

                    <AppNumberInput
                        min={0}
                        max={100}
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Margin */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="marginPercentage"
                    label="Margin %"
                >

                    <AppNumberInput
                        disabled
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* GST */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstId"
                    label="GST"
                >

                    <AppSelect
                        options={lookups.gst}
                        allowClear
                        showSearch
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* GST Rate */}

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

            {/* GST Amount */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="gstAmount"
                    label="GST Amount"
                >

                    <AppNumberInput
                        disabled
                        precision={2}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Effective Date */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="priceEffectiveDate"
                    label="Effective Date"
                >

                    <AppDatePicker />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Tax Inclusive */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="taxInclusive"
                    label="Tax Inclusive"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Allow Price Override */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="allowPriceOverride"
                    label="Allow Price Override"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Freeze Selling Price */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="freezeSellingPrice"
                    label="Freeze Selling Price"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Print MRP */}

            <AppFormGrid.Item>

                <AppFormItem
                    name="printMrpOnLabel"
                    label="Print MRP On Label"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            {/* Price History */}

            <AppFormGrid.Item span={24}>

                <AppFormItem
                    name="maintainPriceHistory"
                    label="Maintain Price History"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(PricingTab);