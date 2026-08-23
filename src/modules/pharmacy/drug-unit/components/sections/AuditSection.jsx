/* =========================================================
   DRUG UNIT - AUDIT SECTION
   ========================================================= */

import React from "react";

import {
    Col,
    Form,
    Input,
    Row,
    Tag,
} from "antd";


/* =========================================================
   COMPONENT
   ========================================================= */

const AuditSection = ({
    record = null,
    mode,
}) => {

    const isCreateMode =
        mode === "CREATE";


    /* =====================================================
       RECORD VALUES
       ===================================================== */

    const createdBy =
        record?.createdBy ||
        "-";


    const createdAt =
        record?.createdAt ||
        "-";


    const updatedBy =
        record?.updatedBy ||
        "-";


    const updatedAt =
        record?.updatedAt ||
        "-";


    const usageCount =
        Number(
            record?.usageCount
        ) || 0;


    const isSystemDefined =
        record?.isSystemDefined === true;


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="drug-unit-form-section"
        >

            {/* =============================================
                SECTION HEADER
            ============================================== */}

            <div
                className="drug-unit-section-header"
            >

                <div
                    className="drug-unit-section-title"
                >
                    Audit Information
                </div>

                <div
                    className="drug-unit-section-description"
                >
                    Review record ownership, timestamps,
                    usage, and system protection information.
                </div>

            </div>


            {/* =============================================
                CREATE MODE
            ============================================== */}

            {
                isCreateMode ? (

                    <div
                        className="drug-unit-audit-empty"
                    >
                        Audit information will be generated
                        automatically when this drug unit is created.
                    </div>

                ) : (

                    <Row
                        gutter={[
                            16,
                            0,
                        ]}
                    >

                        {/* =================================
                            CREATED BY
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="Created By"
                            >

                                <Input
                                    value={
                                        createdBy
                                    }
                                    readOnly
                                />

                            </Form.Item>

                        </Col>


                        {/* =================================
                            CREATED AT
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="Created At"
                            >

                                <Input
                                    value={
                                        createdAt
                                    }
                                    readOnly
                                />

                            </Form.Item>

                        </Col>


                        {/* =================================
                            UPDATED BY
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="Updated By"
                            >

                                <Input
                                    value={
                                        updatedBy
                                    }
                                    readOnly
                                />

                            </Form.Item>

                        </Col>


                        {/* =================================
                            UPDATED AT
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="Updated At"
                            >

                                <Input
                                    value={
                                        updatedAt
                                    }
                                    readOnly
                                />

                            </Form.Item>

                        </Col>


                        {/* =================================
                            USAGE COUNT
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="Mapped Drugs"
                            >

                                <Input
                                    value={
                                        usageCount
                                    }
                                    readOnly
                                />

                            </Form.Item>

                        </Col>


                        {/* =================================
                            SYSTEM DEFINED
                        ================================== */}

                        <Col
                            xs={24}
                            md={12}
                        >

                            <Form.Item
                                label="System Defined"
                            >

                                {
                                    isSystemDefined ? (

                                        <Tag
                                            color="blue"
                                        >
                                            System Defined
                                        </Tag>

                                    ) : (

                                        <Tag>
                                            User Defined
                                        </Tag>

                                    )
                                }

                            </Form.Item>

                        </Col>

                    </Row>

                )
            }


            {/* =============================================
                AUDIT NOTE
            ============================================== */}

            <div
                className="drug-unit-audit-note"
            >
                Audit fields are read-only and should be
                maintained by the backend service.
            </div>

        </section>
    );
};


export default AuditSection;