import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
    AppSwitch
} from "@/components/common";

const ApprovalSection = ({
    lookup,
    readOnly,
    onDirtyChange
}) => {

    return (

        <Row gutter={16}>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Approval Required"
                    name="approvalRequired"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    noStyle
                    shouldUpdate={(prev, current) =>
                        prev.approvalRequired !== current.approvalRequired
                    }
                >
                    {({ getFieldValue }) => {

                        const required = getFieldValue("approvalRequired");

                        return (

                            <Form.Item
                                label="Approver"
                                name="approver"
                                rules={
                                    required
                                        ? [{
                                            required: true,
                                            message: "Approver is required."
                                        }]
                                        : []
                                }
                            >

                                <AppSelect
                                    options={lookup.approvers}
                                    disabled={readOnly || !required}
                                    placeholder="Select Approver"
                                    onChange={() => onDirtyChange(true)}
                                />

                            </Form.Item>

                        );

                    }}
                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    noStyle
                    shouldUpdate={(prev, current) =>
                        prev.approvalRequired !== current.approvalRequired
                    }
                >
                    {({ getFieldValue }) => {

                        const required = getFieldValue("approvalRequired");

                        return (

                            <Form.Item
                                label="Approval Level"
                                name="approvalLevel"
                                rules={
                                    required
                                        ? [{
                                            required: true,
                                            message: "Approval Level is required."
                                        }]
                                        : []
                                }
                            >

                                <AppInput
                                    placeholder="Level 1"
                                    disabled={readOnly || !required}
                                    onChange={() => onDirtyChange(true)}
                                />

                            </Form.Item>

                        );

                    }}
                </Form.Item>

            </Col>

        </Row>

    );

};

export default ApprovalSection;