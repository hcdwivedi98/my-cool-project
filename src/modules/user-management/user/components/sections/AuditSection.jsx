/* =========================================================
   USER AUDIT SECTION
   ========================================================= */

import React from "react";

import {
    Col,
    Descriptions,
    Empty,
    Row,
    Tag,
} from "antd";


const AuditSection = ({
    mode,
    record,
}) => {

    const isNewRecord =
        !record?.id;


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDateTime =
        (
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
                return "-";
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


    /* =====================================================
       CREATE MODE
    ===================================================== */

    if (
        isNewRecord
    ) {

        return (

            <section
                className="user-form-section user-audit-section"
            >

                <div
                    className="user-section-header"
                >

                    <div
                        className="user-section-title"
                    >
                        Audit Information
                    </div>

                    <div
                        className="user-section-description"
                    >
                        System-generated audit information for
                        this user account.
                    </div>

                </div>


                <div
                    className="user-audit-empty"
                >

                    <Empty
                        image={
                            Empty.PRESENTED_IMAGE_SIMPLE
                        }

                        description="Audit information will be available after the user is created."
                    />

                </div>


                <div
                    className="user-audit-note"
                >
                    Audit fields are system managed and cannot
                    be edited manually.
                </div>

            </section>

        );
    }


    /* =====================================================
       EXISTING RECORD
    ===================================================== */

    return (

        <section
            className="user-form-section user-audit-section"
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
                className="user-section-header"
            >

                <div
                    className="user-section-title"
                >
                    Audit Information
                </div>

                <div
                    className="user-section-description"
                >
                    System-generated information about this
                    user record.
                </div>

            </div>


            {/* =================================================
                AUDIT SUMMARY
            ================================================= */}

            <div
                className="user-audit-card"
            >

                <Descriptions
                    column={{
                        xs: 1,
                        sm: 2,
                        md: 2,
                    }}

                    size="small"

                    bordered
                >

                    {/* =========================================
                        RECORD ID
                    ========================================== */}

                    <Descriptions.Item
                        label="Record ID"
                    >
                        {
                            record.id ||
                            "-"
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        USER CODE
                    ========================================== */}

                    <Descriptions.Item
                        label="User Code"
                    >
                        {
                            record.userCode ||
                            "-"
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        CREATED AT
                    ========================================== */}

                    <Descriptions.Item
                        label="Created At"
                    >
                        {
                            formatDateTime(
                                record.createdAt
                            )
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        CREATED BY
                    ========================================== */}

                    <Descriptions.Item
                        label="Created By"
                    >
                        {
                            record.createdBy ||
                            "-"
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        UPDATED AT
                    ========================================== */}

                    <Descriptions.Item
                        label="Updated At"
                    >
                        {
                            formatDateTime(
                                record.updatedAt
                            )
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        UPDATED BY
                    ========================================== */}

                    <Descriptions.Item
                        label="Updated By"
                    >
                        {
                            record.updatedBy ||
                            "-"
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        VERSION
                    ========================================== */}

                    <Descriptions.Item
                        label="Version"
                    >
                        {
                            record.version ??
                            "-"
                        }
                    </Descriptions.Item>


                    {/* =========================================
                        DELETED
                    ========================================== */}

                    <Descriptions.Item
                        label="Deleted"
                    >

                        <Tag
                            color={
                                record.isDeleted
                                    ? "error"
                                    : "success"
                            }
                        >
                            {
                                record.isDeleted
                                    ? "Yes"
                                    : "No"
                            }
                        </Tag>

                    </Descriptions.Item>

                </Descriptions>

            </div>


            {/* =================================================
                AUDIT NOTE
            ================================================= */}

            <div
                className="user-audit-note"
            >
                Audit information is maintained by the system.
                Users cannot manually modify creation,
                modification, version, or deletion metadata.
            </div>

        </section>

    );
};


export default AuditSection;