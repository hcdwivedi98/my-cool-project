import PropTypes from "prop-types";

import {
    AppCard,
    AppFormItem,
    AppInput,
} from "@/components/common";
import {
    Row,
    Col,
} from "antd";
function ContactInformationSection({
    readOnly = false,
}) {
    return (
        <AppCard title="Contact Information">

            <Row gutter={[16, 16]}>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="contactPerson"
                        label="Contact Person"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Contact Person is required",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Contact Person"
                            maxLength={100}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="designation"
                        label="Designation"
                    >
                        <AppInput
                            placeholder="Enter Designation"
                            maxLength={100}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                pattern: /^[0-9]{10}$/,
                                message:
                                    "Enter valid Phone Number",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Phone Number"
                            maxLength={10}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="mobileNumber"
                        label="Mobile Number"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Mobile Number is required",
                            },
                            {
                                pattern: /^[0-9]{10}$/,
                                message:
                                    "Enter valid Mobile Number",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Mobile Number"
                            maxLength={10}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={8}>
                    <AppFormItem
                        name="extensionNumber"
                        label="Extension Number"
                    >
                        <AppInput
                            placeholder="Enter Extension"
                            maxLength={10}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="email"
                        label="Email Address"
                        rules={[
                            {
                                type: "email",
                                message:
                                    "Enter valid Email Address",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Email Address"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="alternateEmail"
                        label="Alternate Email"
                        rules={[
                            {
                                type: "email",
                                message:
                                    "Enter valid Alternate Email",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Alternate Email"
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="emergencyContactName"
                        label="Emergency Contact Person"
                    >
                        <AppInput
                            placeholder="Enter Emergency Contact Person"
                            maxLength={100}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

                <Col xs={24} md={12}>
                    <AppFormItem
                        name="emergencyContactNumber"
                        label="Emergency Contact Number"
                        rules={[
                            {
                                pattern: /^[0-9]{10}$/,
                                message:
                                    "Enter valid Emergency Contact Number",
                            },
                        ]}
                    >
                        <AppInput
                            placeholder="Enter Emergency Contact Number"
                            maxLength={10}
                            readOnly={readOnly}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppCard>
    );
}

ContactInformationSection.propTypes = {
    readOnly: PropTypes.bool,
};

export default ContactInformationSection;