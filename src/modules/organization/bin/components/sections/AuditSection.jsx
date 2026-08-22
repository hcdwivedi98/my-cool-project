import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppInput,
} from "@/components/common";

const AuditSection = ({
    record = {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item label="Created By">
                    <AppInput
                        value={
                            record?.createdBy || "-"
                        }
                        disabled
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item label="Created On">
                    <AppInput
                        value={
                            record?.createdOn || "-"
                        }
                        disabled
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item label="Modified By">
                    <AppInput
                        value={
                            record?.modifiedBy || "-"
                        }
                        disabled
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item label="Modified On">
                    <AppInput
                        value={
                            record?.modifiedOn || "-"
                        }
                        disabled
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default AuditSection;