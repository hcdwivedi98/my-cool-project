import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
    AppTextArea,
} from "@/components/common";

import {
    SHELF_STATUS,
    SHELF_TYPES,
} from "../../constants/shelf.constants";

const BasicSection = ({
    lookups,
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Center"
                    name="centerId"
                    rules={[{ required: true, message: "Please select center" }]}
                >
                    <AppSelect
                        options={lookups?.centers || []}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[{ required: true, message: "Please select department" }]}
                >
                    <AppSelect
                        options={lookups?.departments || []}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Store"
                    name="storeId"
                    rules={[{ required: true, message: "Please select store" }]}
                >
                    <AppSelect
                        options={lookups?.stores || []}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Sub Store"
                    name="subStoreId"
                    rules={[{ required: true, message: "Please select sub store" }]}
                >
                    <AppSelect
                        options={lookups?.subStores || []}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Rack"
                    name="rackId"
                    rules={[{ required: true, message: "Please select rack" }]}
                >
                    <AppSelect
                        options={lookups?.racks || []}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Shelf Code"
                    name="shelfCode"
                    rules={[{ required: true, message: "Please enter shelf code" }]}
                >
                    <AppInput
                        maxLength={30}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Shelf Name"
                    name="shelfName"
                    rules={[{ required: true, message: "Please enter shelf name" }]}
                >
                    <AppInput
                        maxLength={100}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Shelf Type"
                    name="shelfType"
                    rules={[{ required: true, message: "Please select shelf type" }]}
                >
                    <AppSelect
                        options={SHELF_TYPES}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <AppTextArea
                        rows={3}
                        maxLength={500}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: "Please select status" }]}
                >
                    <AppSelect
                        options={[
                            {
                                label: SHELF_STATUS.ACTIVE,
                                value: SHELF_STATUS.ACTIVE,
                            },
                            {
                                label: SHELF_STATUS.INACTIVE,
                                value: SHELF_STATUS.INACTIVE,
                            },
                        ]}
                        disabled={disabled}
                        onChange={() => onDirtyChange(true)}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default BasicSection;