// src/modules/pharmacy/dosage-form/components/sections/AuditSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";


const AuditSection = ({
    record = null,
}) => {

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
        <div className="dosage-form-section">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="dosage-form-section-header">

                <div className="dosage-form-section-title">
                    Audit Information
                </div>

                <div className="dosage-form-section-description">
                    System-generated information about
                    creation and modification history.
                </div>

            </div>


            {/* =================================================
                BODY
            ================================================= */}

            <div className="dosage-form-section-body">

                <Row
                    gutter={[
                        16,
                        0,
                    ]}
                >

                    {/* =========================================
                        CREATED BY
                    ========================================== */}

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
                                disabled
                                readOnly
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        CREATED ON
                    ========================================== */}

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
                                disabled
                                readOnly
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        MODIFIED BY
                    ========================================== */}

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
                                disabled
                                readOnly
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        MODIFIED ON
                    ========================================== */}

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
                                disabled
                                readOnly
                            />

                        </Form.Item>

                    </Col>

                </Row>

            </div>

        </div>
    );
};


export default AuditSection;