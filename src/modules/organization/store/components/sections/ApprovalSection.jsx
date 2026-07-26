import { Col, Row } from "antd";

import {
    AppSection,
    AppFormItem,
    AppLookupSelect,
    AppNumberInput,
    AppSwitch
} from "@/components/common";

const ApprovalSection = ({ isView }) => {

    const fieldProps = {
        disabled: isView
    };

    return (

        <AppSection title="Approval Configuration">

            <Row gutter={[16, 16]}>

                <Col span={12}>
                    <AppFormItem
                        name="approvalRequired"
                        label="Approval Required"
                        valuePropName="checked"
                    >
                        <AppSwitch {...fieldProps} />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="approvalLevel"
                        label="Approval Level"
                    >
                        <AppNumberInput
                            min={1}
                            style={{ width: "100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="approverRole"
                        label="Approver Role"
                    >
                        <AppLookupSelect
                            lookupKey="roles"
                            placeholder="Select Approver Role"
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

                <Col span={12}>
                    <AppFormItem
                        name="approvalLimit"
                        label="Approval Limit"
                    >
                        <AppNumberInput
                            min={0}
                            style={{ width: "100%" }}
                            {...fieldProps}
                        />
                    </AppFormItem>
                </Col>

            </Row>

        </AppSection>

    );

};

export default ApprovalSection;