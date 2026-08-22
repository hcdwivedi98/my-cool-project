// src/modules/pharmacy/drug-category/components/sections/ValidationSection.jsx

import React from "react";

import {
    Alert,
    Col,
    Form,
    InputNumber,
    Row,
    Statistic,
    Tag,
} from "antd";

import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    MedicineBoxOutlined,
} from "@ant-design/icons";


const ValidationSection = ({
    disabled = false,
    drugCount = 0,
    status = "Active",
}) => {

    const count =
        Number(drugCount) || 0;

    const hasDrugs =
        count > 0;

    const isActive =
        status === "Active";


    return (
        <div className="form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="form-section-header">

                <div className="form-section-title">
                    Validation & Usage
                </div>

                <div className="form-section-description">
                    Review category status, usage and
                    dependency information.
                </div>

            </div>


            {/* =================================================
                STATUS + DRUG COUNT
            ================================================= */}

            <Row
                gutter={[16, 16]}
                align="middle"
            >

                {/* STATUS */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >
                    <div className="validation-info-card">

                        <div className="validation-info-label">
                            Category Status
                        </div>

                        <div className="validation-info-value">

                            <Tag
                                icon={
                                    isActive
                                        ? (
                                            <CheckCircleOutlined />
                                        )
                                        : (
                                            <ExclamationCircleOutlined />
                                        )
                                }
                                color={
                                    isActive
                                        ? "success"
                                        : "default"
                                }
                            >
                                {status}
                            </Tag>

                        </div>

                    </div>
                </Col>


                {/* DRUG COUNT */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >
                    <div className="validation-info-card">

                        <div className="validation-info-label">
                            Mapped Drugs
                        </div>

                        <div className="validation-info-stat">

                            <MedicineBoxOutlined />

                            <span>
                                {count}
                            </span>

                        </div>

                    </div>
                </Col>


                {/* USAGE */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                >
                    <div className="validation-info-card">

                        <div className="validation-info-label">
                            Usage Status
                        </div>

                        <div className="validation-info-value">

                            <Tag
                                color={
                                    hasDrugs
                                        ? "blue"
                                        : "default"
                                }
                            >
                                {hasDrugs
                                    ? "In Use"
                                    : "Not Used"}
                            </Tag>

                        </div>

                    </div>
                </Col>

            </Row>


            {/* =================================================
                SYSTEM DRUG COUNT
            ================================================= */}

            <Row
                gutter={[16, 4]}
                style={{
                    marginTop: 16,
                }}
            >

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        label="Mapped Drug Count"
                    >

                        <InputNumber
                            value={count}
                            disabled
                            readOnly
                            style={{
                                width: "100%",
                            }}
                            min={0}
                        />

                    </Form.Item>

                </Col>

            </Row>


            {/* =================================================
                DEPENDENCY WARNING
            ================================================= */}

            {hasDrugs && (
                <Alert
                    style={{
                        marginTop: 4,
                    }}
                    type="warning"
                    showIcon
                    icon={
                        <ExclamationCircleOutlined />
                    }
                    message="Category is currently in use"
                    description={
                        isActive
                            ? (
                                "This category is mapped to existing drugs. "
                                + "Deactivating it will prevent the category "
                                + "from being selected for new drugs, while "
                                + "existing mappings will remain unchanged."
                            )
                            : (
                                "This inactive category is still mapped to "
                                + "existing drugs. Existing mappings remain "
                                + "unchanged."
                            )
                    }
                />
            )}


            {/* =================================================
                NO USAGE INFORMATION
            ================================================= */}

            {!hasDrugs && (
                <Alert
                    style={{
                        marginTop: 4,
                    }}
                    type="info"
                    showIcon
                    message="Category is not currently used"
                    description={
                        "No drugs are currently mapped to this category."
                    }
                />
            )}

        </div>
    );
};


export default ValidationSection;