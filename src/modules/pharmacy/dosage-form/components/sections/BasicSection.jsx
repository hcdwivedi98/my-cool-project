// src/modules/pharmacy/dosage-form/components/sections/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";


const BasicSection = ({
    disabled = false,
}) => {

    return (
        <div className="dosage-form-section">

            <div className="dosage-form-section-header">
                <div className="dosage-form-section-title">
                    Basic Information
                </div>

                <div className="dosage-form-section-description">
                    Enter the basic identification details
                    of the dosage form.
                </div>
            </div>


            <div className="dosage-form-section-body">

                <Row
                    gutter={[
                        16,
                        0,
                    ]}
                >

                    {/* =========================================
                        FORM CODE
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={24}
                        md={8}
                    >

                        <Form.Item
                            label="Form Code"
                            name="formCode"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Form code is required.",
                                },
                            ]}
                        >

                            <Input
                                disabled={
                                    disabled
                                }
                                placeholder="Enter form code"
                                maxLength={20}
                                showCount
                                style={{
                                    textTransform:
                                        "uppercase",
                                }}
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        FORM NAME
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={24}
                        md={16}
                    >

                        <Form.Item
                            label="Dosage Form Name"
                            name="formName"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Dosage form name is required.",
                                },
                            ]}
                        >

                            <Input
                                disabled={
                                    disabled
                                }
                                placeholder="Enter dosage form name"
                                maxLength={100}
                                showCount
                            />

                        </Form.Item>

                    </Col>


                    {/* =========================================
                        DESCRIPTION
                    ========================================== */}

                    <Col
                        xs={24}
                    >

                        <Form.Item
                            label="Description"
                            name="description"
                        >

                            <Input.TextArea
                                disabled={
                                    disabled
                                }
                                placeholder="Enter dosage form description"
                                maxLength={500}
                                showCount
                                rows={4}
                            />

                        </Form.Item>

                    </Col>

                </Row>

            </div>

        </div>
    );
};


export default BasicSection;