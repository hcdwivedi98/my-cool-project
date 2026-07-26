import { Col, Row } from "antd";

import 
{
    AppSection,
    AppFormItem,
    AppTimePicker,
    AppSwitch
} from "@/components/common";


const WorkingHoursSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Working Hours">

            <Row gutter={[16, 16]}>

                <Col span={12}>
                    <AppFormItem
                        name="is24Hours"
                        label="24 Hours Store"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="workingOnHoliday"
                        label="Working On Holiday"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="openingTime"
                        label="Opening Time"
                    >
                        <AppTimePicker
                            style={{ width: "100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="closingTime"
                        label="Closing Time"
                    >
                        <AppTimePicker
                            style={{ width: "100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default WorkingHoursSection;