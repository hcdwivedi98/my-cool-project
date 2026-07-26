import { Row, Col } from "antd";

import {
    AppFormItem,
    AppInput
} from "@/components/common";

const AuditInformationSection = ({ isView }) => {

    return (

        <Row gutter={[16, 16]}>

            <Col span={12}>
                <AppFormItem
                    name="createdBy"
                    label="Created By"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="createdOn"
                    label="Created On"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="modifiedBy"
                    label="Modified By"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="modifiedOn"
                    label="Modified On"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="version"
                    label="Version"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

            <Col span={12}>
                <AppFormItem
                    name="statusText"
                    label="Status"
                >
                    <AppInput disabled />
                </AppFormItem>
            </Col>

        </Row>

    );

};

export default AuditInformationSection;