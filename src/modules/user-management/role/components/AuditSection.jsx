// src/modules/user-management/role/components/AuditSection.jsx

import React from "react";

import {
    Col,
    Descriptions,
    Empty,
    Row,
    Tag,
    Typography,
} from "antd";

const {
    Text,
} = Typography;


/* =========================================================
   DATE FORMATTER
   ========================================================= */

const formatDateTime = (
    value
) => {

    if (!value) {

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
    record = null,
    mode = "CREATE",
}) => {

    const hasAuditData =
        Boolean(
            record &&
            (
                record.createdAt ||
                record.createdBy ||
                record.updatedAt ||
                record.updatedBy
            )
        );


    /* =====================================================
       CREATE MODE
    ===================================================== */

    if (
        mode === "CREATE" &&
        !hasAuditData
    ) {

        return (

            <section
                className="role-form-section role-audit-section"
            >

                <div
                    className="role-section-header"
                >

                    <div
                        className="role-section-title"
                    >
                        Audit Information
                    </div>

                    <div
                        className="role-section-description"
                    >
                        System-generated audit information for
                        this role.
                    </div>

                </div>


                <div
                    className="role-audit-empty"
                >

                    <Empty
                        image={
                            Empty.PRESENTED_IMAGE_SIMPLE
                        }

                        description={
                            "Audit information will be available after the role is created."
                        }
                    />

                </div>

            </section>

        );

    }


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <section
            className="role-form-section role-audit-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="role-section-header"
            >

                <div
                    className="role-section-title"
                >
                    Audit Information
                </div>

                <div
                    className="role-section-description"
                >
                    System-generated information about role
                    creation and modification.
                </div>

            </div>


            {/* =================================================
                AUDIT DETAILS
            ================================================= */}

            <Descriptions
                bordered
                size="small"
                column={{
                    xs: 1,
                    sm: 2,
                    md: 2,
                }}
            >

                <Descriptions.Item
                    label="Created At"
                >
                    {
                        formatDateTime(
                            record?.createdAt
                        )
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Created By"
                >
                    {
                        record?.createdBy ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Updated At"
                >
                    {
                        formatDateTime(
                            record?.updatedAt
                        )
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Updated By"
                >
                    {
                        record?.updatedBy ||
                        "-"
                    }
                </Descriptions.Item>


                <Descriptions.Item
                    label="Version"
                >
                    <Tag>
                        v{
                            record?.version ||
                            1
                        }
                    </Tag>
                </Descriptions.Item>


                <Descriptions.Item
                    label="Record ID"
                >
                    <Text
                        copyable={
                            Boolean(
                                record?.id
                            )
                        }
                    >
                        {
                            record?.id ||
                            "-"
                        }
                    </Text>
                </Descriptions.Item>

            </Descriptions>


            {/* =================================================
                AUDIT NOTE
            ================================================= */}

            <div
                className="role-audit-note"
            >

                <Text
                    type="secondary"
                >
                    Audit information is maintained by the
                    system and cannot be modified manually.
                </Text>

            </div>

        </section>

    );

};


export default AuditSection;