// src/modules/pharmacy/drug-strength/components/sections/BasicSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";

import {
    DRUG_STRENGTH_LIMITS,
} from "../../constants/drugStrength.constants";


const BasicSection = ({
    form,
    mode = "create",
}) => {

    const isViewMode =
        mode === "view";


    return (
        <section
            className="drug-strength-form-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="drug-strength-section-header"
            >

                <div
                    className="drug-strength-section-title"
                >
                    Basic Information
                </div>

                <div
                    className="drug-strength-section-description"
                >
                    Define the basic identification and
                    description of the drug strength.
                </div>

            </div>


            {/* =================================================
                FORM FIELDS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =============================================
                    STRENGTH CODE
                ============================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Strength Code"
                        name="strengthCode"

                        rules={[
                            {
                                required:
                                    true,

                                whitespace:
                                    true,

                                message:
                                    "Please enter strength code.",
                            },

                            {
                                max:
                                    DRUG_STRENGTH_LIMITS.CODE_MAX_LENGTH,

                                message:
                                    `Strength code cannot exceed ${DRUG_STRENGTH_LIMITS.CODE_MAX_LENGTH} characters.`,
                            },

                            {
                                pattern:
                                    /^[A-Za-z0-9_-]+$/,

                                message:
                                    "Only letters, numbers, hyphens and underscores are allowed.",
                            },
                        ]}
                    >

                        <Input
                            placeholder="e.g. STR-500MG"

                            maxLength={
                                DRUG_STRENGTH_LIMITS.CODE_MAX_LENGTH
                            }

                            disabled={
                                isViewMode
                            }

                            onChange={(
                                event
                            ) => {

                                const value =
                                    event.target.value
                                        .toUpperCase();

                                form?.setFieldValue(
                                    "strengthCode",
                                    value
                                );

                            }}
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    DESCRIPTION
                ============================================== */}

                <Col
                    xs={24}
                    md={12}
                >

                    <Form.Item
                        label="Description"
                        name="description"

                        rules={[
                            {
                                max:
                                    DRUG_STRENGTH_LIMITS.DESCRIPTION_MAX_LENGTH,

                                message:
                                    `Description cannot exceed ${DRUG_STRENGTH_LIMITS.DESCRIPTION_MAX_LENGTH} characters.`,
                            },
                        ]}
                    >

                        <Input
                            placeholder="Enter strength description"

                            maxLength={
                                DRUG_STRENGTH_LIMITS.DESCRIPTION_MAX_LENGTH
                            }

                            disabled={
                                isViewMode
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =============================================
                    REMARKS
                ============================================== */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        label="Remarks"
                        name="remarks"

                        rules={[
                            {
                                max:
                                    DRUG_STRENGTH_LIMITS.REMARKS_MAX_LENGTH,

                                message:
                                    `Remarks cannot exceed ${DRUG_STRENGTH_LIMITS.REMARKS_MAX_LENGTH} characters.`,
                            },
                        ]}
                    >

                        <Input.TextArea
                            placeholder="Enter additional remarks if required"

                            rows={3}

                            maxLength={
                                DRUG_STRENGTH_LIMITS.REMARKS_MAX_LENGTH
                            }

                            disabled={
                                isViewMode
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>

            </Row>

        </section>
    );
};


export default BasicSection;