// src/modules/purchase-management/purchase-order/components/AuditSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Empty,
    Tag,
    Timeline,
} from "antd";

import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
    FileAddOutlined,
    SendOutlined,
} from "@ant-design/icons";


/* =========================================================
   AUDIT SECTION
   ========================================================= */

const AuditSection = ({
    mode = "CREATE",
    disabled = false,
    auditTrail = [],
}) => {

    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       SAFE AUDIT DATA
       ===================================================== */

    const safeAuditTrail =
        Array.isArray(
            auditTrail
        )
            ? auditTrail
            : [];


    /* =====================================================
       ICON
       ===================================================== */

    const getAuditIcon = (
        action
    ) => {

        switch (
            String(
                action ||
                ""
            ).toUpperCase()
        ) {

            case "CREATE":

                return (
                    <FileAddOutlined />
                );


            case "UPDATE":

            case "EDIT":

                return (
                    <EditOutlined />
                );


            case "SUBMIT":

                return (
                    <SendOutlined />
                );


            case "APPROVE":

                return (
                    <CheckCircleOutlined />
                );


            case "REJECT":

                return (
                    <CloseCircleOutlined />
                );


            default:

                return (
                    <ClockCircleOutlined />
                );

        }

    };


    /* =====================================================
       STATUS COLOR
       ===================================================== */

    const getAuditColor = (
        action
    ) => {

        switch (
            String(
                action ||
                ""
            ).toUpperCase()
        ) {

            case "CREATE":
                return "blue";


            case "UPDATE":

            case "EDIT":
                return "cyan";


            case "SUBMIT":
                return "orange";


            case "APPROVE":
                return "green";


            case "REJECT":
                return "red";


            default:
                return "gray";

        }

    };


    /* =====================================================
       ACTION LABEL
       ===================================================== */

    const getAuditLabel = (
        action
    ) => {

        const value =
            String(
                action ||
                ""
            )
                .replace(
                    /_/g,
                    " "
                )
                .toLowerCase();


        return value.replace(
            /\b\w/g,
            (
                character
            ) =>
                character.toUpperCase()
        );

    };


    /* =====================================================
       DATE FORMAT
       ===================================================== */

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


    /* =====================================================
       SORT AUDIT
       ===================================================== */

    const sortedAuditTrail =
        useMemo(
            () => {

                return [
                    ...safeAuditTrail,
                ].sort(
                    (
                        a,
                        b
                    ) => {

                        const dateA =
                            new Date(
                                a?.timestamp ||
                                a?.createdAt ||
                                0
                            ).getTime();


                        const dateB =
                            new Date(
                                b?.timestamp ||
                                b?.createdAt ||
                                0
                            ).getTime();


                        return dateB -
                            dateA;

                    }
                );

            },
            [
                safeAuditTrail,
            ]
        );


    /* =====================================================
       TIMELINE ITEMS
       ===================================================== */

    const timelineItems =
        sortedAuditTrail.map(
            (
                entry,
                index
            ) => {

                const action =
                    entry?.action ||
                    entry?.event ||
                    "UPDATE";


                const actionLabel =
                    getAuditLabel(
                        action
                    );


                const actor =
                    entry?.userName ||
                    entry?.performedByName ||
                    entry?.performedBy ||
                    "System";


                const timestamp =
                    entry?.timestamp ||
                    entry?.createdAt;


                const remarks =
                    entry?.remarks ||
                    entry?.description ||
                    entry?.message;


                return {

                    key:
                        entry?.id ||
                        `audit-${index}`,

                    color:
                        getAuditColor(
                            action
                        ),

                    dot:
                        getAuditIcon(
                            action
                        ),

                    children: (

                        <div
                            className="purchase-order-audit-entry"
                        >

                            <div
                                className="purchase-order-audit-entry-header"
                            >

                                <Tag
                                    color={
                                        getAuditColor(
                                            action
                                        )
                                    }
                                >
                                    {
                                        actionLabel
                                    }
                                </Tag>


                                <span
                                    className="purchase-order-audit-date"
                                >
                                    {
                                        formatAuditDate(
                                            timestamp
                                        )
                                    }
                                </span>

                            </div>


                            <div
                                className="purchase-order-audit-actor"
                            >
                                {
                                    actor
                                }
                            </div>


                            {
                                remarks && (

                                    <div
                                        className="purchase-order-audit-remarks"
                                    >
                                        {
                                            remarks
                                        }
                                    </div>

                                )
                            }


                            {
                                entry?.status && (

                                    <div
                                        style={{
                                            marginTop:
                                                6,
                                        }}
                                    >

                                        Status:{" "}

                                        <strong>
                                            {
                                                getAuditLabel(
                                                    entry.status
                                                )
                                            }
                                        </strong>

                                    </div>

                                )
                            }

                        </div>

                    ),

                };

            }
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-audit-section"
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
                    Audit History
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Track purchase order creation, changes,
                    submission and approval activities.
                </div>

            </div>


            {/* =================================================
                EMPTY
            ================================================= */}

            {
                sortedAuditTrail.length ===
                0 ? (

                    <div
                        className="purchase-order-audit-empty"
                    >

                        <Empty
                            image={
                                Empty.PRESENTED_IMAGE_SIMPLE
                            }

                            description={
                                "No audit activity available."
                            }
                        />

                    </div>

                ) : (

                    <div
                        className="purchase-order-audit-card"
                    >

                        <Timeline
                            items={
                                timelineItems
                            }
                        />

                    </div>

                )
            }


            {/* =================================================
                NOTE
            ================================================= */}

            <div
                className="purchase-order-audit-note"
            >

                {
                    isViewMode
                        ? "Audit history is read-only."
                        : "Audit entries are generated automatically when the purchase order is created, updated, submitted, approved or rejected."
                }

            </div>

        </section>

    );

};


export default AuditSection;