import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
} from "@/components/common";

import {
    STORAGE_CONDITIONS,
    BIN_ORIENTATION,
} from "../../constants/bin.constants";

const LocationSection = ({
    disabled = false,
    onDirtyChange = () => { },
}) => {
    return (
        <Row gutter={16}>

            {/* Storage Condition */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Storage Condition"
                    name="storageCondition"
                    rules={[
                        {
                            required: true,
                            message: "Please select storage condition",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            STORAGE_CONDITIONS
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Orientation */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Bin Orientation"
                    name="orientation"
                    rules={[
                        {
                            required: true,
                            message: "Please select bin orientation",
                        },
                    ]}
                >
                    <AppSelect
                        options={BIN_ORIENTATION}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Aisle */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Aisle Number"
                    name="aisleNo"
                >
                    <AppInput
                        maxLength={20}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Zone */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Zone"
                    name="zone"
                >
                    <AppInput
                        maxLength={50}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Location Remarks */}
            <Col span={24}>
                <Form.Item
                    label="Location Remarks"
                    name="locationRemarks"
                >
                    <AppInput
                        maxLength={250}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

        </Row>
    );
};

export default LocationSection;