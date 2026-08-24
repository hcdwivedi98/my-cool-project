// src/modules/user-management/permission/components/AuditSection.jsx

import React from "react";

import {
    Card,
    Col,
    Descriptions,
    Empty,
    Row,
    Tag,
    Typography,
} from "antd";

import {
    ClockCircleOutlined,
    UserOutlined,
} from "@ant-design/icons";

const {
    Text,
} = Typography;


/* =========================================================
   DATE FORMATTER
   ========================================================= */

const formatAuditDate = (
    value
) => {

    if (
        !value
    ) {

        return "-";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }


    return date.toLocaleString(
        "en-IN",
        {
            dateStyle:
                "medium",

            timeStyle:
                "short",
        }
    );

};


/* =========================================================
   AUDIT SECTION
   ========================================================= */

const AuditSection = ({
    mode = "CREATE",
    disabled = false,
    permission = null,
}) => {

    const isCreateMode =
        mode === "CREATE";


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       AUDIT VALUES
    ===================================================== */

    const createdAt =
        permission?.createdAt ||
        null;


    const createdBy =
        permission?.createdBy ||
        null;


    const updatedAt =
        permission?.updatedAt ||
        null;


    const updatedBy =
        permission?.updatedBy ||
        null;


    const version =
        permission?.version ||
        1;


    const hasAuditData =
        Boolean(
            createdAt ||
            createdBy ||
            updatedAt ||
            updatedBy
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="permission-form-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="permission-section-header"
            >

                <div
                    className="permission-section-title"
                >
                    Audit Information
                </div>


                <div
                    className="permission-section-description"
                >
                    Review creation, modification and version
                    information for this permission.
                </div>

            </div>


            {/* =================================================
                CREATE MODE
            ================================================= */}

            {
                isCreateMode &&
                !hasAuditData && (

                    <div
                        className="permission-audit-empty"
                    >

                        <Empty
                            image={
                                Empty.PRESENTED_IMAGE_SIMPLE
                            }
                            description={
                                "Audit information will be available after the permission is created."
                            }
                        />

                    </div>

                )
            }


            {/* =================================================
                AUDIT DATA
            ================================================= */}

            {
                hasAuditData && (

                    <Card
                        size="small"
                        className="permission-audit-card"
                    >

                        <Row
                            gutter={[
                                16,
                                16,
                            ]}
                        >

                            {/* =================================
                                CREATED BY
                            ================================= */}

                            <Col
                                xs={24}
                                md={12}
                            >

                                <div
                                    className="permission-audit-item"
                                >

                                    <div
                                        className="permission-audit-label"
                                    >
                                        <UserOutlined />
                                        Created By
                                    </div>


                                    <div
                                        className="permission-audit-value"
                                    >
                                        {
                                            createdBy ||
                                            "-"
                                        }
                                    </div>

                                </div>

                            </Col>


                            {/* =================================
                                CREATED AT
                            ================================= */}

                            <Col
                                xs={24}
                                md={12}
                            >

                                <div
                                    className="permission-audit-item"
                                >

                                    <div
                                        className="permission-audit-label"
                                    >
                                        <ClockCircleOutlined />
                                        Created At
                                    </div>


                                    <div
                                        className="permission-audit-value"
                                    >
                                        {
                                            formatAuditDate(
                                                createdAt
                                            )
                                        }
                                    </div>

                                </div>

                            </Col>


                            {/* =================================
                                UPDATED BY
                            ================================= */}

                            <Col
                                xs={24}
                                md={12}
                            >

                                <div
                                    className="permission-audit-item"
                                >

                                    <div
                                        className="permission-audit-label"
                                    >
                                        <UserOutlined />
                                        Last Updated By
                                    </div>


                                    <div
                                        className="permission-audit-value"
                                    >
                                        {
                                            updatedBy ||
                                            "-"
                                        }
                                    </div>

                                </div>

                            </Col>


                            {/* =================================
                                UPDATED AT
                            ================================= */}

                            <Col
                                xs={24}
                                md={12}
                            >

                                <div
                                    className="permission-audit-item"
                                >

                                    <div
                                        className="permission-audit-label"
                                    >
                                        <ClockCircleOutlined />
                                        Last Updated At
                                    </div>


                                    <div
                                        className="permission-audit-value"
                                    >
                                        {
                                            formatAuditDate(
                                                updatedAt
                                            )
                                        }
                                    </div>

                                </div>

                            </Col>

                        </Row>


                        {/* =====================================
                            VERSION
                        ===================================== */}

                        <div
                            className="permission-audit-version"
                        >

                            <Text
                                type="secondary"
                            >
                                Record Version
                            </Text>


                            <Tag
                                color="blue"
                            >
                                v{
                                    version
                                }
                            </Tag>

                        </div>

                    </Card>

                )
            }


            {/* =================================================
                SYSTEM NOTE
            ================================================= */}

            {
                permission?.isSystemPermission ===
                    true && (

                    <div
                        className="permission-audit-note"
                    >

                        <Text
                            type="secondary"
                        >
                            This is a system permission. Audit
                            information should be retained for
                            administrative traceability.
                        </Text>

                    </div>

                )
            }

        </section>

    );

};


export default AuditSection;