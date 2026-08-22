// src/modules/pharmacy/drug-route/components/sections/AuditSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";


const AuditSection = ({
    disabled = true,
    loading = false,
    record = null,
}) => {

    /*
     * =====================================================
     * AUDIT VALUES
     * =====================================================
     */

    const createdBy =
        record?.createdBy ||
        "-";


    const createdOn =
        record?.createdOn ||
        "-";


    const modifiedBy =
        record?.modifiedBy ||
        "-";


    const modifiedOn =
        record?.modifiedOn ||
        "-";


    return (
        <div className="drug-route-form-section">

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="drug-route-section-header">

                <div>

                    <div className="drug-route-section-title">
                        Audit Information
                    </div>

                    <div className="drug-route-section-description">
                        System-generated information about creation
                        and last modification of this record.
                    </div>

                </div>

            </div>


            {/* =================================================
                AUDIT FIELDS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    CREATED BY
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Created By"
                    >

                        <Input
                            value={
                                createdBy
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
                    CREATED ON
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Created On"
                    >

                        <Input
                            value={
                                createdOn
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
                    MODIFIED BY
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Modified By"
                    >

                        <Input
                            value={
                                modifiedBy
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
                    MODIFIED ON
                ============================================== */}

                <Col
                    xs={24}
                    sm={12}
                >

                    <Form.Item
                        label="Modified On"
                    >

                        <Input
                            value={
                                modifiedOn
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


export default AuditSection;