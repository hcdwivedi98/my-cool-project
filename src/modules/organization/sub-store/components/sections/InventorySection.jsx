import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppNumberInput,
    AppSwitch
} from "@/components/common";

const InventorySection = () => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="minimumStock"
                    label="Minimum Stock"
                >

                    <AppNumberInput
                        min={0}
                        style={{ width: "100%" }}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="maximumStock"
                    label="Maximum Stock"
                >

                    <AppNumberInput
                        min={0}
                        style={{ width: "100%" }}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="reorderLevel"
                    label="Reorder Level"
                >

                    <AppNumberInput
                        min={0}
                        style={{ width: "100%" }}
                    />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="allowNegativeStock"
                    label="Allow Negative Stock"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="batchMandatory"
                    label="Batch Mandatory"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="expiryMandatory"
                    label="Expiry Mandatory"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="barcodeMandatory"
                    label="Barcode Mandatory"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="autoReorder"
                    label="Auto Reorder"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="allowInterStoreTransfer"
                    label="Inter Store Transfer"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="allowIssue"
                    label="Allow Issue"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="allowReceive"
                    label="Allow Receive"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default InventorySection;