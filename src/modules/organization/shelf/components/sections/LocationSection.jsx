import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
} from "@/components/common";

import {
    STORAGE_CONDITIONS,
    SHELF_ORIENTATION,
} from "../../constants/shelf.constants";

const LocationSection = ({
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Storage Condition"
                    name="storageCondition"
                >
                    <AppSelect
                        options={STORAGE_CONDITIONS}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Shelf Orientation"
                    name="orientation"
                >
                    <AppSelect
                        options={SHELF_ORIENTATION}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Aisle Number"
                    name="aisleNo"
                >
                    <AppInput
                        maxLength={20}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Zone"
                    name="zone"
                >
                    <AppInput
                        maxLength={50}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    label="Location Remarks"
                    name="locationRemarks"
                >
                    <AppInput
                        maxLength={250}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default LocationSection;