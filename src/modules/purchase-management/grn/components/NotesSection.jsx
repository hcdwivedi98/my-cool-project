// src/modules/purchase-management/grn/components/NotesSection.jsx

import React from "react";

import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Space,
} from "antd";

import {
    FileTextOutlined,
    MessageOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from "@ant-design/icons";


/* =========================================================
   COMPONENT
   ========================================================= */

const NotesSection = ({
    mode = "CREATE",

    disabled = false,
}) => {

    /* =====================================================
       FORM INSTANCE
       ===================================================== */

    const form =
        Form.useFormInstance();


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <MessageOutlined />

                    <span>
                        Notes & Instructions
                    </span>

                </Space>

            }

            style={{
                marginBottom: 20,
            }}

        >

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =================================================
                    SUPPLIER NOTES
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="supplierNotes"
                        label="Supplier Notes"
                    >

                        <Input.TextArea

                            rows={5}

                            maxLength={2000}

                            showCount

                            placeholder="Enter notes received from supplier"

                            prefix={
                                <UserOutlined />
                            }

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    RECEIVING NOTES
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="receivingNotes"
                        label="Receiving Notes"
                    >

                        <Input.TextArea

                            rows={5}

                            maxLength={2000}

                            showCount

                            placeholder="Enter receiving / unloading notes"

                            disabled={
                                disabled
                            }

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

                            rows={5}

                            maxLength={2000}

                            showCount

                            placeholder="Enter internal remarks"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SPECIAL INSTRUCTIONS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="specialInstructions"
                        label="Special Instructions"
                    >

                        <Input.TextArea

                            rows={5}

                            maxLength={2000}

                            showCount

                            placeholder="Enter special instructions"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DOCUMENT REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="documentRemarks"
                        label="Document Remarks"
                    >

                        <Input.TextArea

                            rows={4}

                            maxLength={2000}

                            showCount

                            placeholder="Enter remarks related to invoice, challan or documents"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    INVENTORY REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="inventoryRemarks"
                        label="Inventory Remarks"
                    >

                        <Input.TextArea

                            rows={4}

                            maxLength={2000}

                            showCount

                            placeholder="Enter inventory / stock related remarks"

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

                            maxLength={2000}

                            showCount

                            placeholder="Enter quality inspection remarks"

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    APPROVAL REMARKS
                ================================================= */}

                <Col
                    xs={24}
                    lg={12}
                >

                    <Form.Item
                        name="approvalRemarks"
                        label="Approval Remarks"
                    >

                        <Input.TextArea

                            rows={4}

                            maxLength={2000}

                            showCount

                            placeholder="Enter approval remarks"

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


export default NotesSection;