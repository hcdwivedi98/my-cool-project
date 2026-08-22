// src/modules/pharmacy/dosage-form/components/sections/ValidationSection.jsx

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
    InfoCircleOutlined,
} from "@ant-design/icons";

import {
    getDosageFormUsageStatus,
} from "../../utils/dosageForm.helper";


const ValidationSection = ({
    disabled = false,
    drugCount = 0,
}) => {

    const usage =
        getDosageFormUsageStatus(
            drugCount
        );


    const isUsed =
        usage.value === "USED";


    return (
        <div className="dosage-form-section">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dosage-form-section-header">

                <div className="dosage-form-section-title">
                    Validation & Usage
                </div>

                <div className="dosage-form-section-description">
                    Review dependency and usage information
                    before activating or deactivating this
                    dosage form.
                </div>

            </div>


            {/* =================================================
                BODY
            ================================================= */}

            <div className="dosage-form-section-body">

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                >

                    {/* =========================================
                        MAPPED DRUG COUNT
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Mapped Drugs"
                        >

                            <InputNumber
                                value={
                                    Number(
                                        drugCount
                                    ) || 0
                                }
                                disabled
                                readOnly
                                controls={false}
                                style={{
                                    width:
                                        "100%",
                                }}
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        USAGE STATUS
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Usage Status"
                        >

                            <div
                                style={{
                                    height:
                                        32,

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",
                                }}
                            >

                                {isUsed ? (

                                    <Tag
                                        color="blue"
                                        icon={
                                            <InfoCircleOutlined />
                                        }
                                    >
                                        In Use
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="default"
                                        icon={
                                            <CheckCircleOutlined />
                                        }
                                    >
                                        Not Used
                                    </Tag>

                                )}

                            </div>

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        DEPENDENCY STATUS
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                    >

                        <Form.Item
                            label="Dependency Status"
                        >

                            <div
                                style={{
                                    height:
                                        32,

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",
                                }}
                            >

                                {isUsed ? (

                                    <Tag
                                        color="warning"
                                    >
                                        Has Dependencies
                                    </Tag>

                                ) : (

                                    <Tag
                                        color="success"
                                    >
                                        No Dependencies
                                    </Tag>

                                )}

                            </div>

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        WARNING
                    ========================================== */}

                    <Col
                        xs={24}
                    >

                        {isUsed ? (

                            <Alert
                                type="warning"
                                showIcon
                                message="Dosage form is currently in use"
                                description={
                                    `This dosage form is mapped to ${drugCount} drug${Number(drugCount) === 1 ? "" : "s"}. Deactivating it will not remove existing mappings, but it will prevent the dosage form from being selected for new drug records.`
                                }
                            />

                        ) : (

                            <Alert
                                type="info"
                                showIcon
                                message="Dosage form is not currently in use"
                                description="No active drug mapping was found for this dosage form."
                            />

                        )}

                    </Col>

                </Row>

            </div>

        </div>
    );
};


export default ValidationSection;