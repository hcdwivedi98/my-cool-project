import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppSwitch,
    AppSelect,
    AppNumberInput,
} from "@/components/common";

const ApprovalSection = ({
    form,
    lookups,
    disabled = false,
    onDirtyChange = () => {},
}) => {
    const approvalRequired =
        Form.useWatch(
            "approvalRequired",
            form
        );

    return (
        <Row gutter={16}>

            {/* Approval Required */}
            <Col span={24}>
                <Form.Item
                    label="Approval Required"
                    name="approvalRequired"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Approver */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Approver"
                    name="approverId"
                    rules={
                        approvalRequired
                            ? [
                                {
                                    required: true,
                                    message:
                                        "Please select approver",
                                },
                            ]
                            : []
                    }
                >
                    <AppSelect
                        options={
                            lookups?.approvers || []
                        }
                        disabled={
                            disabled ||
                            !approvalRequired
                        }
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Approval Level */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Approval Level"
                    name="approvalLevel"
                    rules={
                        approvalRequired
                            ? [
                                {
                                    required: true,
                                    message:
                                        "Please enter approval level",
                                },
                            ]
                            : []
                    }
                >
                    <AppNumberInput
                        min={1}
                        max={10}
                        disabled={
                            disabled ||
                            !approvalRequired
                        }
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

        </Row>
    );
};

export default ApprovalSection;