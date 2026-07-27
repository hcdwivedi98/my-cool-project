import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput,
    AppNumberInput,
    AppSelect,
    AppSwitch
} from "@/components/common";

const APPROVAL_LEVELS = [

    {
        value: 1,
        label: "Level 1"
    },
    {
        value: 2,
        label: "Level 2"
    },
    {
        value: 3,
        label: "Level 3"
    }

];

const ApprovalSection = () => {

    return (

        <Row gutter={16}>

            <Col span={8}>

                <AppFormItem
                    name="storeManager"
                    label="Store Manager"
                >

                    <AppInput />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="approver"
                    label="Approver"
                >

                    <AppInput />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="approvalLevel"
                    label="Approval Level"
                >

                    <AppSelect
                        options={APPROVAL_LEVELS}
                    />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="issueApprovalRequired"
                    label="Issue Approval"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="returnApprovalRequired"
                    label="Return Approval"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="purchaseApprovalRequired"
                    label="Purchase Approval"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={6}>

                <AppFormItem
                    name="stockTransferApproval"
                    label="Transfer Approval"
                    valuePropName="checked"
                >

                    <AppSwitch />

                </AppFormItem>

            </Col>

            <Col span={8}>

                <AppFormItem
                    name="maximumApprovalAmount"
                    label="Maximum Approval Amount"
                >

                    <AppNumberInput
                        min={0}
                        style={{ width: "100%" }}
                    />

                </AppFormItem>

            </Col>

            <Col span={16}>

                <AppFormItem
                    name="approvalRemarks"
                    label="Approval Remarks"
                >

                    <AppInput />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default ApprovalSection;