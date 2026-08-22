import React from "react";
import { Col, Form, Row } from "antd";

import {
    AppSelect,
    AppSwitch,
} from "@/components/common";

const ClassificationSection = ({
    form,
    lookups = {},
    disabled = false,
    onDirtyChange = () => {},
}) => {
    const schedule = Form.useWatch(
        "schedule",
        form
    );

    const controlledDrug = Form.useWatch(
        "controlledDrug",
        form
    );

    const narcotic = Form.useWatch(
        "narcotic",
        form
    );

    const prescriptionRequired =
        Form.useWatch(
            "prescriptionRequired",
            form
        );

    return (
        <Row gutter={16}>
            {/* Drug Category */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select drug category",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.categories || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Drug Schedule */}
            <Col xs={24} md={12}>
                <Form.Item
                    label="Drug Schedule"
                    name="schedule"
                    rules={[
                        {
                            required: true,
                            message:
                                "Please select drug schedule",
                        },
                    ]}
                >
                    <AppSelect
                        options={
                            lookups.schedules || []
                        }
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Controlled Drug */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Controlled Drug"
                    name="controlledDrug"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Narcotic */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Narcotic"
                    name="narcotic"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Prescription Required */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="Prescription Required"
                    name="prescriptionRequired"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* High Alert */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="High Alert Drug"
                    name="highAlert"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* LASA */}
            <Col xs={24} sm={12} lg={8}>
                <Form.Item
                    label="LASA Drug"
                    name="lasa"
                    valuePropName="checked"
                >
                    <AppSwitch
                        disabled={disabled}
                        onChange={() =>
                            onDirtyChange(true)
                        }
                    />
                </Form.Item>
            </Col>

            {/* Regulatory status indicator */}
            <Col xs={24}>
                <div
                    style={{
                        marginTop: 8,
                        padding: "10px 12px",
                        borderRadius: 6,
                        background:
                            "#fafafa",
                    }}
                >
                    <strong>
                        Classification Summary
                    </strong>

                    <div
                        style={{
                            marginTop: 6,
                        }}
                    >
                        Schedule:{" "}
                        {schedule
                            ? schedule.replaceAll(
                                "_",
                                " "
                            )
                            : "-"}

                        {" | "}

                        Controlled:{" "}
                        {controlledDrug
                            ? "Yes"
                            : "No"}

                        {" | "}

                        Narcotic:{" "}
                        {narcotic
                            ? "Yes"
                            : "No"}

                        {" | "}

                        Prescription:{" "}
                        {prescriptionRequired
                            ? "Required"
                            : "Not Required"}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ClassificationSection;