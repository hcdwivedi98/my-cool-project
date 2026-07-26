import { Col, Row } from "antd";

import {
    AppSection,
    AppFormItem,
    AppNumberInput,
    AppSwitch,
} from "@/components/common";

const InventoryConfigurationSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Inventory Configuration">

            <Row gutter={[16,16]}>

                <Col span={12}>
                    <AppFormItem
                        name="allowNegativeStock"
                        label="Allow Negative Stock"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="allowBatchSplit"
                        label="Allow Batch Split"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="autoReorder"
                        label="Auto Reorder"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="expiryAlertDays"
                        label="Expiry Alert Days"
                    >
                        <AppNumberInput
                            min={0}
                            style={{ width: "100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="fifo"
                        label="FIFO"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="fefo"
                        label="FEFO"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="barcodeEnabled"
                        label="Barcode Enabled"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default InventoryConfigurationSection;