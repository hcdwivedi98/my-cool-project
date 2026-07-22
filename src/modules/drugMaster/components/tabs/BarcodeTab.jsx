import React, { memo } from "react";

import {
    AppFormGrid,
    AppFormItem,
    AppInput,
    AppSwitch,
    AppNumberInput,
} from "../../../../components/common/form";

function BarcodeTab() {

    return (

        <AppFormGrid>

            <AppFormGrid.Item>

                <AppFormItem
                    name="barcode"
                    label="Primary Barcode"
                >

                    <AppInput/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="secondaryBarcode"
                    label="Secondary Barcode"
                >

                    <AppInput/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="barcodePrefix"
                    label="Barcode Prefix"
                >

                    <AppInput/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="barcodeLength"
                    label="Barcode Length"
                >

                    <AppNumberInput
                        min={4}
                        max={30}
                    />

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="qrCode"
                    label="QR Code"
                >

                    <AppInput/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="printBarcode"
                    label="Print Barcode"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="printQrCode"
                    label="Print QR Code"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="generateBarcode"
                    label="Auto Generate Barcode"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

            <AppFormGrid.Item>

                <AppFormItem
                    name="barcodeRequired"
                    label="Barcode Mandatory"
                    valuePropName="checked"
                >

                    <AppSwitch/>

                </AppFormItem>

            </AppFormGrid.Item>

        </AppFormGrid>

    );

}

export default memo(BarcodeTab);