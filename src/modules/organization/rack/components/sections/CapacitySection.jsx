import { Row, Col, Form } from "antd";

import {
    AppNumberInput
} from "@/components/common";

const CapacitySection = ({
    readOnly,
    onDirtyChange
}) => {

    return (

        <Row gutter={16}>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Maximum Shelves"
                    name="maximumShelves"
                    rules={[
                        {
                            required: true,
                            message: "Maximum Shelves is required."
                        }
                    ]}
                >

                    <AppNumberInput
                        min={1}
                        max={999}
                        style={{ width: "100%" }}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Maximum Weight (Kg)"
                    name="maximumWeight"
                    rules={[
                        {
                            required: true,
                            message: "Maximum Weight is required."
                        }
                    ]}
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                        style={{ width: "100%" }}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

            <Col xs={24} md={8}>

                <Form.Item
                    label="Maximum Volume (m³)"
                    name="maximumVolume"
                >

                    <AppNumberInput
                        min={0}
                        precision={2}
                        style={{ width: "100%" }}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />

                </Form.Item>

            </Col>

        </Row>

    );

};

export default CapacitySection;