import { Col, Row } from "antd";

import {
    AppSection,
    AppFormItem,
    AppInput,
} from "@/components/common";


const PrinterConfigurationSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Printer Configuration">

            <Row gutter={[16,16]}>

                <Col span={12}>
                    <AppFormItem
                        name="defaultPrinter"
                        label="Default Printer"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="labelPrinter"
                        label="Label Printer"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="barcodePrinter"
                        label="Barcode Printer"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="thermalPrinter"
                        label="Thermal Printer"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="a4Printer"
                        label="A4 Printer"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="printTemplate"
                        label="Print Template"
                    >
                        <AppInput {...fieldProps} />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default PrinterConfigurationSection;