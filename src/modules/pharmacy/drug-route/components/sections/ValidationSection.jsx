// src/modules/pharmacy/drug-route/components/sections/ValidationSection.jsx

import React from "react";

import {
    Alert,
    Col,
    Form,
    Input,
    Row,
    Statistic,
    Tag,
} from "antd";

import {
    getDrugRouteDependencyMessage,
    getDrugRouteUsageLabel,
    isDrugRouteUsed,
} from "../../utils/drugRoute.helper";


const ValidationSection = ({
    disabled = true,
    loading = false,
    record = null,
}) => {

    /*
     * =====================================================
     * DATA
     * =====================================================
     */

    const drugCount =
        Number(
            record?.drugCount
        ) || 0;


    const isUsed =
        isDrugRouteUsed(
            record
        );


    const usageLabel =
        getDrugRouteUsageLabel(
            drugCount
        );


    const dependencyMessage =
        getDrugRouteDependencyMessage(
            record
        );


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <div className="drug-route-form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="drug-route-section-header">

                <div>

                    <div className="drug-route-section-title">
                        Validation & Usage
                    </div>

                    <div className="drug-route-section-description">
                        Review route dependencies and usage before
                        changing or deactivating this route.
                    </div>

                </div>

            </div>


            {/* =================================================
                USAGE SUMMARY
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
                style={{
                    marginBottom: 16,
                }}
            >

                {/* =============================================
                    MAPPED DRUGS
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <div
                        className="drug-route-validation-card"
                    >

                        <Statistic
                            title="Mapped Drugs"
                            value={
                                drugCount
                            }
                        />

                    </div>

                </Col>


                {/* =============================================
                    USAGE STATUS
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <div
                        className="drug-route-validation-card"
                    >

                        <div
                            className="drug-route-validation-label"
                        >
                            Usage Status
                        </div>

                        <div
                            style={{
                                marginTop:
                                    8,
                            }}
                        >

                            <Tag
                                color={
                                    isUsed
                                        ? "blue"
                                        : "default"
                                }
                            >
                                {
                                    usageLabel
                                }
                            </Tag>

                        </div>

                    </div>

                </Col>


                {/* =============================================
                    DEPENDENCY STATUS
                ============================================== */}

                <Col
                    xs={24}
                    md={8}
                >

                    <div
                        className="drug-route-validation-card"
                    >

                        <div
                            className="drug-route-validation-label"
                        >
                            Dependency Status
                        </div>

                        <div
                            style={{
                                marginTop:
                                    8,
                            }}
                        >

                            <Tag
                                color={
                                    isUsed
                                        ? "warning"
                                        : "success"
                                }
                            >
                                {
                                    isUsed
                                        ? "Has Dependencies"
                                        : "No Dependencies"
                                }
                            </Tag>

                        </div>

                    </div>

                </Col>

            </Row>


            {/* =================================================
                DEPENDENCY MESSAGE
            ================================================= */}

            <Alert
                type={
                    isUsed
                        ? "warning"
                        : "success"
                }

                showIcon

                message={
                    isUsed
                        ? "Route has existing drug mappings"
                        : "Route is currently unused"
                }

                description={
                    dependencyMessage
                }

                style={{
                    marginBottom:
                        20,
                }}
            />


            {/* =================================================
                SYSTEM VALIDATION FIELDS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    MAPPED DRUG COUNT
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        label="Mapped Drug Count"
                    >

                        <Input
                            value={
                                String(
                                    drugCount
                                )
                            }

                            disabled={
                                disabled ||
                                loading ||
                                true
                            }

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    USAGE STATUS
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        label="Usage"
                    >

                        <Input
                            value={
                                isUsed
                                    ? "Used"
                                    : "Unused"
                            }

                            disabled={
                                disabled ||
                                loading ||
                                true
                            }

                            readOnly
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DEPENDENCY STATE
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                >

                    <Form.Item
                        label="Dependency State"
                    >

                        <Input
                            value={
                                isUsed
                                    ? "Existing mappings"
                                    : "No mappings"
                            }

                            disabled={
                                disabled ||
                                loading ||
                                true
                            }

                            readOnly
                        />

                    </Form.Item>

                </Col>

            </Row>

        </div>
    );
};


export default ValidationSection;