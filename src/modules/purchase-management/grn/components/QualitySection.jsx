// src/modules/purchase-management/grn/components/QualitySection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Tag,
} from "antd";

import {
    SafetyCertificateOutlined,
} from "@ant-design/icons";


/* =========================================================
   LOCAL OPTIONS
   =========================================================
   Kept inside this component intentionally.
   This prevents the component from breaking if a GRN
   constant export is missing.
   ========================================================= */

const QUALITY_STATUS_OPTIONS = [

    {
        value: "PENDING",
        label: "Pending",
    },

    {
        value: "PASSED",
        label: "Passed",
    },

    {
        value: "FAILED",
        label: "Failed",
    },

    {
        value: "PARTIALLY_PASSED",
        label: "Partially Passed",
    },

    {
        value: "QUARANTINED",
        label: "Quarantined",
    },

];


const INSPECTION_STATUS_OPTIONS = [

    {
        value: "NOT_REQUIRED",
        label: "Not Required",
    },

    {
        value: "PENDING",
        label: "Pending Inspection",
    },

    {
        value: "IN_PROGRESS",
        label: "Inspection In Progress",
    },

    {
        value: "PASSED",
        label: "Inspection Passed",
    },

    {
        value: "FAILED",
        label: "Inspection Failed",
    },

    {
        value: "PARTIALLY_PASSED",
        label: "Partially Passed",
    },

];


const REJECTION_REASON_OPTIONS = [

    {
        value: "DAMAGED",
        label: "Damaged",
    },

    {
        value: "EXPIRED",
        label: "Expired / Near Expiry",
    },

    {
        value: "WRONG_ITEM",
        label: "Wrong Item",
    },

    {
        value: "WRONG_BATCH",
        label: "Wrong Batch",
    },

    {
        value: "QUALITY_FAILURE",
        label: "Quality Failure",
    },

    {
        value: "PACKAGING_DAMAGE",
        label: "Packaging Damage",
    },

    {
        value: "QUANTITY_MISMATCH",
        label: "Quantity Mismatch",
    },

    {
        value: "OTHER",
        label: "Other",
    },

];


const STORAGE_CONDITION_OPTIONS = [

    {
        value: "ROOM_TEMPERATURE",
        label: "Room Temperature",
    },

    {
        value: "REFRIGERATED",
        label: "Refrigerated",
    },

    {
        value: "COLD_CHAIN",
        label: "Cold Chain",
    },

    {
        value: "FROZEN",
        label: "Frozen",
    },

    {
        value: "CONTROLLED",
        label: "Controlled Storage",
    },

    {
        value: "OTHER",
        label: "Other",
    },

];


/* =========================================================
   COMPONENT
   ========================================================= */

const QualitySection = ({
    mode = "CREATE",

    disabled = false,

}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       WATCH VALUES
    ===================================================== */

    const qualityStatus =
        Form.useWatch(
            "qualityStatus",
            form
        );


    const inspectionStatus =
        Form.useWatch(
            "inspectionStatus",
            form
        );


    const rejectedQuantity =
        Number(
            Form.useWatch(
                "totalRejectedQuantity",
                form
            )
        ) || 0;


    const acceptedQuantity =
        Number(
            Form.useWatch(
                "totalAcceptedQuantity",
                form
            )
        ) || 0;


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <SafetyCertificateOutlined />

                    <span>
                        Quality & Inspection
                    </span>

                    {
                        qualityStatus && (

                            <Tag
                                color={
                                    qualityStatus ===
                                    "PASSED"
                                        ? "green"
                                        : qualityStatus ===
                                            "FAILED"
                                            ? "red"
                                            : "orange"
                                }
                            >
                                {
                                    QUALITY_STATUS_OPTIONS.find(
                                        item =>
                                            item.value ===
                                            qualityStatus
                                    )?.label ||
                                    qualityStatus
                                }
                            </Tag>

                        )
                    }

                </Space>

            }

            style={{
                marginBottom:
                    20,
            }}

        >

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =================================================
                    QUALITY STATUS
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="qualityStatus"
                        label="Quality Status"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select quality status.",
                            },
                        ]}
                    >

                        <Select
                            allowClear
                            placeholder="Select quality status"
                            options={
                                QUALITY_STATUS_OPTIONS
                            }
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INSPECTION STATUS
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="inspectionStatus"
                        label="Inspection Status"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select inspection status.",
                            },
                        ]}
                    >

                        <Select
                            allowClear
                            placeholder="Select inspection status"
                            options={
                                INSPECTION_STATUS_OPTIONS
                            }
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INSPECTED BY
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="inspectedByName"
                        label="Inspected By"
                    >

                        <Input
                            placeholder="Inspector name"
                            disabled
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INSPECTION REFERENCE
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="inspectionReference"
                        label="Inspection Reference"
                    >

                        <Input
                            placeholder="Inspection reference"
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ACCEPTED QTY
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="totalAcceptedQuantity"
                        label="Accepted Quantity"
                    >

                        <InputNumber
                            min={0}
                            precision={0}
                            style={{
                                width:
                                    "100%",
                            }}
                            value={
                                acceptedQuantity
                            }
                            disabled
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    REJECTED QTY
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="totalRejectedQuantity"
                        label="Rejected Quantity"
                    >

                        <InputNumber
                            min={0}
                            precision={0}
                            style={{
                                width:
                                    "100%",
                            }}
                            value={
                                rejectedQuantity
                            }
                            disabled
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    REJECTION REASON
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="rejectionReason"
                        label="Rejection Reason"
                    >

                        <Select
                            allowClear
                            showSearch
                            placeholder="Select reason"
                            options={
                                REJECTION_REASON_OPTIONS
                            }
                            optionFilterProp="label"
                            disabled={
                                disabled ||
                                rejectedQuantity <= 0
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    STORAGE CONDITION
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="storageCondition"
                        label="Storage Condition"
                    >

                        <Select
                            allowClear
                            placeholder="Select storage condition"
                            options={
                                STORAGE_CONDITION_OPTIONS
                            }
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    QUALITY REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="qualityRemarks"
                        label="Quality Remarks"
                    >

                        <Input.TextArea
                            rows={4}
                            placeholder="Enter quality / inspection remarks"
                            maxLength={1000}
                            showCount
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    REJECTION REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="rejectionRemarks"
                        label="Rejection Remarks"
                    >

                        <Input.TextArea
                            rows={4}
                            placeholder="Enter rejection details"
                            maxLength={1000}
                            showCount
                            disabled={
                                disabled
                            }
                        />

                    </Form.Item>

                </Col>

            </Row>

        </Card>

    );

};


export default QualitySection;