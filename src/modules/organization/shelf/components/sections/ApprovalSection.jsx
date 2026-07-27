import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppCheckbox,
    AppSelect,
    AppNumberInput,
} from "@/components/common";

const approvers = [
    {
        label: "Store Manager",
        value: 1,
    },
    {
        label: "Inventory Manager",
        value: 2,
    },
    {
        label: "Pharmacy Administrator",
        value: 3,
    },
];

const ApprovalSection = ({
    form,
    disabled = false,
    onDirtyChange = () => {},
}) => {

    const approvalRequired =
        Form.useWatch("approvalRequired", form);

    return (
        <Row gutter={16}>

            <Col span={24}>
                <Form.Item
                    name="approvalRequired"
                    valuePropName="checked"
                >
                    <AppCheckbox
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    >
                        Approval Required
                    </AppCheckbox>
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Approver"
                    name="approverId"
                >
                    <AppSelect
                        options={approvers}
                        disabled={
                            disabled ||
                            !approvalRequired
                        }
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Approval Level"
                    name="approvalLevel"
                >
                    <AppNumberInput
                        min={1}
                        max={10}
                        disabled={
                            disabled ||
                            !approvalRequired
                        }
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

        </Row>
    );
};

export default ApprovalSection;