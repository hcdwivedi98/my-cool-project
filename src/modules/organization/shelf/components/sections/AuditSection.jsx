import React from "react";
import { Descriptions } from "antd";

const AuditSection = ({
    record = {},
}) => {
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

            <Descriptions.Item label="Status">
                {record.status || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Occupancy">
                {record.occupancyPercentage ?? 0}%
            </Descriptions.Item>
        </Descriptions>
    );
};

export default AuditSection;