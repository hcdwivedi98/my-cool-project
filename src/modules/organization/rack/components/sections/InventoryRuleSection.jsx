import { Row, Col, Form } from "antd";

import {
    AppSwitch
} from "@/components/common";

const InventoryRuleSection = ({
    readOnly,
    onDirtyChange
}) => {

    return (

        <Row gutter={[16, 16]}>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Cold Storage Rack"
                    name="coldStorage"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Narcotic Rack"
                    name="narcoticRack"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="LASA Rack"
                    name="lasaRack"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Quarantine Rack"
                    name="quarantineRack"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Damaged Stock Rack"
                    name="damagedRack"
                    valuePropName="checked"
                >

                    <AppSwitch
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

        </Row>

    );

};

export default InventoryRuleSection;