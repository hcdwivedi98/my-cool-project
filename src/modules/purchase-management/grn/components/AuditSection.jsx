// src/modules/purchase-management/grn/components/AuditSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Avatar,
    Card,
    Empty,
    Space,
    Tag,
    Timeline,
    Typography,
} from "antd";

import {
    AuditOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
    FileAddOutlined,
    SendOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


/* =========================================================
   LOCAL STATUS CONFIG
   ========================================================= */

const STATUS_CONFIG = {

    CREATED: {

        label:
            "Created",

        color:
            "blue",

        icon:
            <FileAddOutlined />,

    },

    DRAFT: {

        label:
            "Draft",

        color:
            "default",

        icon:
            <EditOutlined />,

    },

    SUBMITTED: {

        label:
            "Submitted",

        color:
            "processing",

        icon:
            <SendOutlined />,

    },

    APPROVED: {

        label:
            "Approved",

        color:
            "success",

        icon:
            <CheckCircleOutlined />,

    },

    REJECTED: {

        label:
            "Rejected",

        color:
            "error",

        icon:
            <CloseCircleOutlined />,

    },

    POSTED: {

        label:
            "Posted",

        color:
            "success",

        icon:
            <CheckCircleOutlined />,

    },

};


/* =========================================================
   HELPERS
   ========================================================= */

const getStatusConfig = (
    status
) => {

    const key =
        String(
            status ||
            ""
        )
            .toUpperCase();


    return (
        STATUS_CONFIG[
            key
        ] || {

            label:
                status ||
                "Activity",

            color:
                "default",

            icon:
                <ClockCircleOutlined />,

        }
    );

};


const formatDateTime = (
    value
) => {

    if (
        !value
    ) {

        return "-";

    }


    const date =
        value instanceof Date
            ? value
            : new Date(
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
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit",

        }
    );

};


/* =========================================================
   COMPONENT
   ========================================================= */

const AuditSection = ({
    mode = "CREATE",

    disabled = false,

    auditTrail = [],

}) => {


    /* =====================================================
       NORMALIZE AUDIT TRAIL
    ===================================================== */

    const entries =
        useMemo(
            () => {

                if (
                    !Array.isArray(
                        auditTrail
                    )
                ) {

                    return [];

                }


                return auditTrail.map(
                    (
                        entry,
                        index
                    ) => {

                        const status =
                            entry?.status ||
                            entry?.action ||
                            entry?.eventType ||
                            "ACTIVITY";


                        const config =
                            getStatusConfig(
                                status
                            );


                        return {

                            id:
                                entry?.id ||
                                entry?.auditId ||
                                `AUDIT-${index}`,

                            status,

                            config,

                            userName:
                                entry?.userName ||
                                entry?.createdByName ||
                                entry?.performedByName ||
                                entry?.performedBy ||
                                "System",

                            userRole:
                                entry?.userRole ||
                                entry?.createdByRole ||
                                "",

                            remarks:
                                entry?.remarks ||
                                entry?.comments ||
                                entry?.description ||
                                "",

                            date:
                                entry?.date ||
                                entry?.createdAt ||
                                entry?.performedAt ||
                                entry?.timestamp ||
                                null,

                        };

                    }
                );

            },
            [
                auditTrail,
            ]
        );


    /* =====================================================
       TIMELINE ITEMS
    ===================================================== */

    const timelineItems =
        entries.map(
            entry => ({

                key:
                    entry.id,

                color:
                    entry.config.color,

                dot:
                    entry.config.icon,

                children: (

                    <div
                        className="grn-audit-entry"
                    >

                        {/* -----------------------------------------
                            HEADER
                        ----------------------------------------- */}

                        <Space
                            wrap
                        >

                            <Tag
                                color={
                                    entry.config.color
                                }
                            >
                                {
                                    entry.config.label
                                }
                            </Tag>

                            <Text
                                strong
                            >
                                {
                                    entry.userName
                                }
                            

                            </Text>

                            {
                                entry.userRole && (

                                    <Text
                                        type="secondary"
                                    >
                                        (
                                        {
                                            entry.userRole
                                        }
                                        )
                                    </Text>

                                )
                            }

                        </Space>


                        {/* -----------------------------------------
                            DATE
                        ----------------------------------------- */}

                        <div
                            style={{
                                marginTop:
                                    4,
                            }}
                        >

                            <Text
                                type="secondary"
                            >
                                {
                                    formatDateTime(
                                        entry.date
                                    )
                                }
                            </Text>

                        </div>


                        {/* -----------------------------------------
                            REMARKS
                        ----------------------------------------- */}

                        {
                            entry.remarks && (

                                <div
                                    style={{
                                        marginTop:
                                            8,
                                    }}
                                >

                                    <Text>
                                        {
                                            entry.remarks
                                        }
                                    </Text>

                                </div>

                            )
                        }

                    </div>

                ),

            })
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <AuditOutlined />

                    <span>
                        Audit Trail
                    </span>

                    {
                        entries.length >
                        0 && (

                            <Tag>
                                {
                                    entries.length
                                } Events
                            </Tag>

                        )
                    }

                </Space>

            }

            style={{
                marginBottom:
                    20,
            }}

        >

            {
                entries.length ===
                0 ? (

                    <Empty

                        image={
                            Empty.PRESENTED_IMAGE_SIMPLE
                        }

                        description={
                            "No audit history available."
                        }

                    />

                ) : (

                    <Timeline
                        items={
                            timelineItems
                        }
                    />

                )
            }

        </Card>

    );

};


export default AuditSection;