// src/modules/drugMaster/components/tabs/PackagingTab.jsx

import React, { memo, useEffect } from "react";
import { Form } from "antd";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppNumberInput,
    AppSelect,
    AppSwitch,
} from "../../../../components/common/form";

function PackagingTab({ lookups = {} }) {

    const form = Form.useFormInstance();

    const purchaseUom = Form.useWatch("purchaseUomId", form);
    const issueUom = Form.useWatch("issueUomId", form);
    const saleUom = Form.useWatch("saleUomId", form);

    const packSize = Form.useWatch("packSize", form);
    const stripsPerBox = Form.useWatch("stripsPerBox", form);
    const tabletsPerStrip = Form.useWatch("tabletsPerStrip", form);

    useEffect(() => {

        if (
            stripsPerBox &&
            tabletsPerStrip
        ) {

            form.setFieldValue(
                "conversionFactor",
                stripsPerBox * tabletsPerStrip
            );

        }

    }, [

        stripsPerBox,
        tabletsPerStrip,
        form,

    ]);

    useEffect(() => {

        if (

            purchaseUom &&
            !issueUom

        ) {

            form.setFieldValue(

                "issueUomId",

                purchaseUom

            );

        }

        if (

            purchaseUom &&
            !saleUom

        ) {

            form.setFieldValue(

                "saleUomId",

                purchaseUom

            );

        }

    }, [

        purchaseUom,

        issueUom,

        saleUom,

        form,

    ]);

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem

                    name="purchaseUomId"

                    label="Purchase UOM"

                    rules={[

                        {

                            required: true,

                            message: "Purchase UOM is required",

                        },

                    ]}

                >

                    <AppSelect

                        showSearch

                        allowClear

                        placeholder="Purchase UOM"

                        options={lookups.uoms}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="issueUomId"

                    label="Issue UOM"

                    rules={[

                        {

                            required: true,

                            message: "Issue UOM is required",

                        },

                    ]}

                >

                    <AppSelect

                        showSearch

                        allowClear

                        placeholder="Issue UOM"

                        options={lookups.uoms}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="saleUomId"

                    label="Sale UOM"

                    rules={[

                        {

                            required: true,

                            message: "Sale UOM is required",

                        },

                    ]}

                >

                    <AppSelect

                        showSearch

                        allowClear

                        placeholder="Sale UOM"

                        options={lookups.uoms}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="packTypeId"

                    label="Pack Type"

                >

                    <AppSelect

                        options={lookups.packTypes}

                        showSearch

                        allowClear

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="packSize"

                    label="Pack Size"

                >

                    <AppNumberInput

                        min={1}

                        precision={0}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="boxesPerCarton"

                    label="Boxes / Carton"

                >

                    <AppNumberInput

                        min={1}

                        precision={0}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="stripsPerBox"

                    label="Strips / Box"

                >

                    <AppNumberInput

                        min={1}

                        precision={0}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="tabletsPerStrip"

                    label="Tablets / Strip"

                >

                    <AppNumberInput

                        min={1}

                        precision={0}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="conversionFactor"

                    label="Conversion Factor"

                >

                    <AppNumberInput

                        disabled

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="barcodePrefix"

                    label="Barcode Prefix"

                >

                    <AppInput

                        maxLength={20}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="defaultBatchPrefix"

                    label="Default Batch Prefix"

                >

                    <AppInput

                        maxLength={20}

                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="storageBin"

                    label="Default Bin"

                >

                    <AppInput />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="allowLoosePurchase"

                    label="Loose Purchase"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="allowLooseSale"

                    label="Loose Sale"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="allowLooseIssue"

                    label="Loose Issue"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem

                    name="autoCalculateConversion"

                    label="Auto Conversion"

                    valuePropName="checked"

                >

                    <AppSwitch />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item span={24}>

                <AppFormItem

                    name="packagingRemarks"

                    label="Packaging Remarks"

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

export default memo(PackagingTab);