import { Col, Row } from "antd";

import {
    AppInput,
    AppTextArea ,
    AppSection,
    AppFormItem
} from "@/components/common";

const ContactInformationSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Contact Information">

            <Row gutter={[16, 16]}>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="contactPerson"
                        label="Contact Person"
                    >
                        <AppInput
                            placeholder="Enter Contact Person"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="mobileNo"
                        label="Mobile Number"
                    >
                        <AppInput
                            placeholder="Enter Mobile Number"
                            maxLength={10}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="alternateMobileNo"
                        label="Alternate Mobile"
                    >
                        <AppInput
                            placeholder="Enter Alternate Mobile"
                            maxLength={10}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="email"
                        label="Email Address"
                    >
                        <AppInput
                            placeholder="Enter Email Address"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="extensionNo"
                        label="Extension Number"
                    >
                        <AppInput
                            placeholder="Enter Extension Number"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="emergencyContactNo"
                        label="Emergency Contact"
                    >
                        <AppInput
                            placeholder="Enter Emergency Contact"
                            maxLength={10}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="faxNumber"
                        label="Fax Number"
                    >
                        <AppInput
                            placeholder="Enter Fax Number"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={24}>
                    <AppFormItem
                        name="remarks"
                        label="Remarks"
                    >
                        <AppTextArea
                            rows={4}
                            placeholder="Enter Remarks"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default ContactInformationSection;