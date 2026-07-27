import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput
} from "@/components/common";

const ContactSection = () => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="contactPerson"
                    label="Contact Person"
                >

                    <AppInput
                        maxLength={100}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="mobileNo"
                    label="Mobile Number"
                    rules={[
                        {
                            pattern: /^[6-9]\d{9}$/,
                            message: "Please enter a valid Mobile Number."
                        }
                    ]}
                >

                    <AppInput
                        maxLength={10}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message: "Please enter a valid Email."
                        }
                    ]}
                >

                    <AppInput
                        maxLength={100}
                    />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="extensionNo"
                    label="Extension No."
                >

                    <AppInput
                        maxLength={10}
                    />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default ContactSection;