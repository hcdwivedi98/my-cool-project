// src/modules/purchase-management/purchase-order/components/NotesSection.jsx

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
} from "antd";


/* =========================================================
   NOTES SECTION
   ========================================================= */

const NotesSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-notes-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="purchase-order-section-header"
            >

                <div
                    className="purchase-order-section-title"
                >
                    Notes & Instructions
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Add supplier instructions, internal remarks
                    and special handling information.
                </div>

            </div>


            {/* =================================================
                FORM
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =================================================
                    SUPPLIER INSTRUCTIONS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="supplierInstructions"
                        label="Supplier Instructions"
                    >

                        <Input.TextArea
                            rows={
                                5
                            }

                            placeholder="Enter instructions for supplier"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                1000
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INTERNAL REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="internalRemarks"
                        label="Internal Remarks"
                    >

                        <Input.TextArea
                            rows={
                                5
                            }

                            placeholder="Enter internal remarks"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                1000
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SPECIAL INSTRUCTIONS
                ================================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="specialInstructions"
                        label="Special Instructions"
                    >

                        <Input.TextArea
                            rows={
                                4
                            }

                            placeholder="Enter special instructions, handling requirements or storage instructions"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                1000
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    TERMS & CONDITIONS
                ================================================= */}

                <Col
                    xs={24}
                >

                    <Form.Item
                        name="termsAndConditions"
                        label="Terms & Conditions"
                    >

                        <Input.TextArea
                            rows={
                                6
                            }

                            placeholder="Enter applicable terms and conditions"

                            disabled={
                                isViewMode
                            }

                            maxLength={
                                3000
                            }

                            showCount
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    APPROVAL REMARKS
                ================================================= */}

                {
                    (
                        mode === "VIEW" ||
                        mode === "EDIT"
                    ) && (

                        <Col
                            xs={24}
                        >

                            <Form.Item
                                name="approvalRemarks"
                                label="Approval Remarks"
                            >

                                <Input.TextArea
                                    rows={
                                        4
                                    }

                                    placeholder="Approval / rejection remarks"

                                    disabled={
                                        isViewMode
                                    }

                                    maxLength={
                                        1000
                                    }

                                    showCount
                                />

                            </Form.Item>

                        </Col>

                    )
                }

            </Row>

        </section>

    );

};


export default NotesSection;