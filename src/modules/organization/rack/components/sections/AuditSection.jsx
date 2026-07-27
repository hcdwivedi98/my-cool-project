import { Descriptions, Empty } from "antd";

const AuditSection = ({ record }) => {

    if (!record) {

        return <Empty description="Audit information will be available after the record is saved." />;

    }

    return (

        <Descriptions
            bordered
            column={2}
            size="small"
        >

            <Descriptions.Item label="Created By">
                {record.createdBy || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Created On">
                {record.createdOn || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Modified By">
                {record.modifiedBy || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Modified On">
                {record.modifiedOn || "-"}
            </Descriptions.Item>

        </Descriptions>

    );

};

export default AuditSection;