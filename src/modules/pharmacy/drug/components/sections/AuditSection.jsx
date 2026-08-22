import React from "react";
import {
    Col,
    Descriptions,
    Row,
    Tag,
} from "antd";

const formatValue = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return "-";
    }

    if (
        typeof value === "boolean"
    ) {
        return value ? "Yes" : "No";
    }

    return String(value);
};

const formatDate = (value) => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-IN");
};

const AuditSection = ({
    record = {},
}) => {
    const status =
        record.status || "Active";

    return (
        <Row gutter={[16, 16]}>
            {/* Created Information */}
            <Col span={24}>
                <Descriptions
                    title="Created Information"
                    bordered
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                    }}
                    size="small"
                >
                    <Descriptions.Item label="Created By">
                        {formatValue(
                            record.createdBy
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Created On">
                        {formatDate(
                            record.createdOn
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Created From">
                        {formatValue(
                            record.createdFrom
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Col>

            {/* Modified Information */}
            <Col span={24}>
                <Descriptions
                    title="Last Modified Information"
                    bordered
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                    }}
                    size="small"
                >
                    <Descriptions.Item label="Modified By">
                        {formatValue(
                            record.modifiedBy
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Modified On">
                        {formatDate(
                            record.modifiedOn
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Modified From">
                        {formatValue(
                            record.modifiedFrom
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Col>

            {/* Record Status */}
            <Col span={24}>
                <Descriptions
                    title="Record Information"
                    bordered
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 3,
                    }}
                    size="small"
                >
                    <Descriptions.Item label="Drug ID">
                        {formatValue(
                            record.id
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Drug Code">
                        {formatValue(
                            record.drugCode
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status">
                        <Tag
                            color={
                                status ===
                                "Active"
                                    ? "success"
                                    : "error"
                            }
                        >
                            {status}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );
};

export default AuditSection;