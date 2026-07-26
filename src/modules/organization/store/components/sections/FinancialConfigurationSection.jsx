import { Col, Row } from "antd";

import {
    AppFormItem,
    AppInput,
    AppNumberInput,
    AppSection
} from "@/components/common";


const FinancialConfigurationSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Financial Configuration">

            <Row gutter={[16,16]}>

                <Col span={12}>
                    <AppFormItem
                        name="costCenter"
                        label="Cost Center"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="revenueCenter"
                        label="Revenue Center"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="profitCenter"
                        label="Profit Center"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="taxGroup"
                        label="Tax Group"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="defaultDiscount"
                        label="Default Discount (%)"
                    >
                        <AppNumberInput
                            min={0}
                            max={100}
                            style={{ width:"100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="roundOff"
                        label="Round Off"
                    >
                        <AppNumberInput
                            style={{ width:"100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default FinancialConfigurationSection;