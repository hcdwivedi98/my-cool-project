import React from "react";
import { Row, Col, Form } from "antd";

import {
    AppInput,
    AppSelect,
    AppSwitch,
} from "@/components/common";

import {
    BIN_STATUS,
    BIN_TYPES,
} from "../../constants/bin.constants";

const BasicSection = ({
    lookups,
    disabled = false,
    onDirtyChange = () => {},
}) => {
    return (
        <Row gutter={16}>

            {/* Center */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Center"
                    name="centerId"
                    rules={[
                        {
                            required: true,
                            message: "Please select center",
                        },
                    ]}
                >
                    <AppSelect
                        options={lookups?.centers || []}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Department */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Department"
                    name="departmentId"
                    rules={[
                        {
                            required: true,
                            message: "Please select department",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups?.departments || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Store */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Store"
                    name="storeId"
                    rules={[
                        {
                            required: true,
                            message: "Please select store",
                        },
                    ]}
                >
                    <AppSelect
                        options={lookups?.stores || []}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Sub Store */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Sub Store"
                    name="subStoreId"
                    rules={[
                        {
                            required: true,
                            message: "Please select sub store",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups?.subStores || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Rack */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Rack"
                    name="rackId"
                    rules={[
                        {
                            required: true,
                            message: "Please select rack",
                        },
                    ]}
                >
                    <AppSelect
                        options={lookups?.racks || []}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Shelf */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Shelf"
                    name="shelfId"
                    rules={[
                        {
                            required: true,
                            message: "Please select shelf",
                        },
                    ]}
                >
                    <AppSelect
                        options={lookups?.shelves || []}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Bin Code */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Bin Code"
                    name="binCode"
                    rules={[
                        {
                            required: true,
                            message: "Please enter bin code",
                        },
                    ]}
                >
                    <AppInput
                        maxLength={30}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Bin Name */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Bin Name"
                    name="binName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter bin name",
                        },
                    ]}
                >
                    <AppInput
                        maxLength={100}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Bin Type */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Bin Type"
                    name="binType"
                    rules={[
                        {
                            required: true,
                            message: "Please select bin type",
                        },
                    ]}
                >
                    <AppSelect
                        options={BIN_TYPES}
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Please select status",
                        },
                    ]}
                >
                    <AppSelect
                        options={[
                            {
                                label: BIN_STATUS.ACTIVE,
                                value: BIN_STATUS.ACTIVE,
                            },
                            {
                                label: BIN_STATUS.INACTIVE,
                                value: BIN_STATUS.INACTIVE,
                            },
                        ]}
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

export default BasicSection;