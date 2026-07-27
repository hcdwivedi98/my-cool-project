import {
    Row,
    Col
} from "antd";

import {
    AppFormItem,
    AppInput
} from "@/components/common";

const AuditSection = ({
    record
}) => {

    return (

        <Row gutter={16}>

            <Col span={12}>

                <AppFormItem
                    label="Created By"
                >

                    <AppInput
                        value={record?.createdBy}
                        readOnly
                    />

                </AppFormItem>

            </Col>

            <Col span={12}>

                <AppFormItem
                    label="Created On"
                >

                    <AppInput
                        value={record?.createdOn}
                        readOnly
                    />

                </AppFormItem>

            </Col>

            <Col span={12}>

                <AppFormItem
                    label="Modified By"
                >

                    <AppInput
                        value={record?.modifiedBy}
                        readOnly
                    />

                </AppFormItem>

            </Col>

            <Col span={12}>

                <AppFormItem
                    label="Modified On"
                >

                    <AppInput
                        value={record?.modifiedOn}
                        readOnly
                    />

                </AppFormItem>

            </Col>

        </Row>

    );

};

export default AuditSection;