import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect
} from "@/components/common";

const LocationSection = ({
    lookup,
    readOnly,
    onDirtyChange
}) => {

    return (

        <Row gutter={16}>

            <Col xs={24} md={4}>
                <Form.Item
                    label="Building"
                    name="buildingId"
                >
                    <AppSelect
                        options={lookup.buildings}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={4}>
                <Form.Item
                    label="Floor"
                    name="floorId"
                >
                    <AppSelect
                        options={lookup.floors}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={4}>
                <Form.Item
                    label="Room"
                    name="roomId"
                >
                    <AppSelect
                        options={lookup.rooms}
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={6}>
                <Form.Item
                    label="Zone"
                    name="zone"
                >
                    <AppInput
                        placeholder="Zone"
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={6}>
                <Form.Item
                    label="Aisle"
                    name="aisle"
                >
                    <AppInput
                        placeholder="Aisle"
                        disabled={readOnly}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

        </Row>

    );

};

export default LocationSection;