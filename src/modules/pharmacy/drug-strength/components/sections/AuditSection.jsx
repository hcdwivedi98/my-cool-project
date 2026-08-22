// src/modules/pharmacy/drug-strength/components/sections/AuditSection.jsx

import React from "react";

import {
    Col,
    Descriptions,
    Row,
    Tag,
} from "antd";

import {
    DRUG_STRENGTH_STATUS,
} from "../../constants/drugStrength.constants";


const AuditSection = ({
    record = null,
    mode = "create",
}) => {

    const isCreateMode =
        mode === "create";


    const isViewMode =
        mode === "view";


    /* =====================================================
       AUDIT VALUES
    ===================================================== */

    const createdBy =
        record?.createdBy ||
        "—";


    const createdOn =
        record?.createdOn ||
        "—";


    const modifiedBy =
        record?.modifiedBy ||
        "—";


    const modifiedOn =
        record?.modifiedOn ||
        "—";


    const mappedDrugCount =
        Number(
            record?.mappedDrugCount
        ) || 0;


    const status =
        record?.status ||
        DRUG_STRENGTH_STATUS.ACTIVE;


    const isSystemDefined =
        Boolean(
            record?.isSystemDefined
        );


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    const formatDateTime = (
        value
    ) => {

        if (
            !value ||
            value === "—"
        ) {
            return "—";
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
            return value;
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
       CREATE MODE
    ===================================================== */

    if (
        isCreateMode
    ) {

        return (
            <section
                className="drug-strength-form-section"
            >

                <div
                    className="drug-strength-section-header"
                >

                    <div
                        className="drug-strength-section-title"
                    >
                        Audit Information
                    </div>

                    <div
                        className="drug-strength-section-description"
                    >
                        Audit information will be generated
                        automatically when the record is saved.
                    </div>

                </div>


                <div
                    className="drug-strength-audit-empty"
                >

                    <span>
                        This is a new drug strength record.
                        Audit details will be available after
                        creation.
                    </span>

                </div>

            </section>
        );
    }


    /* =====================================================
       EDIT / VIEW MODE
    ===================================================== */

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
                    Audit Information
                </div>

                <div
                    className="drug-strength-section-description"
                >
                    Track record ownership, modification history
                    and current usage.
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

                {/* =============================================
                    CREATED BY
                ============================================== */}

                <Descriptions.Item
                    label="Created By"
                >
                    {createdBy}
                </Descriptions.Item>


                {/* =============================================
                    CREATED ON
                ============================================== */}

                <Descriptions.Item
                    label="Created On"
                >
                    {
                        formatDateTime(
                            createdOn
                        )
                    }
                </Descriptions.Item>


                {/* =============================================
                    MODIFIED BY
                ============================================== */}

                <Descriptions.Item
                    label="Modified By"
                >
                    {modifiedBy}
                </Descriptions.Item>


                {/* =============================================
                    MODIFIED ON
                ============================================== */}

                <Descriptions.Item
                    label="Modified On"
                >
                    {
                        formatDateTime(
                            modifiedOn
                        )
                    }
                </Descriptions.Item>


                {/* =============================================
                    STATUS
                ============================================== */}

                <Descriptions.Item
                    label="Status"
                >

                    <Tag
                        color={
                            status ===
                            DRUG_STRENGTH_STATUS.INACTIVE
                                ? "default"
                                : "success"
                        }
                    >
                        {status}
                    </Tag>

                </Descriptions.Item>


                {/* =============================================
                    SOURCE
                ============================================== */}

                <Descriptions.Item
                    label="Source"
                >

                    <Tag
                        color={
                            isSystemDefined
                                ? "purple"
                                : "default"
                        }
                    >
                        {
                            isSystemDefined
                                ? "System Defined"
                                : "Custom"
                        }
                    </Tag>

                </Descriptions.Item>


                {/* =============================================
                    MAPPED DRUGS
                ============================================== */}

                <Descriptions.Item
                    label="Mapped Drugs"
                >

                    <Tag
                        color={
                            mappedDrugCount > 0
                                ? "blue"
                                : "default"
                        }
                    >
                        {
                            mappedDrugCount
                        }
                    </Tag>

                </Descriptions.Item>


                {/* =============================================
                    USAGE STATUS
                ============================================== */}

                <Descriptions.Item
                    label="Usage Status"
                >

                    <Tag
                        color={
                            mappedDrugCount > 0
                                ? "blue"
                                : "default"
                        }
                    >
                        {
                            mappedDrugCount > 0
                                ? "Used"
                                : "Unused"
                        }
                    </Tag>

                </Descriptions.Item>

            </Descriptions>


            {/* =================================================
                EDIT MODE NOTE
            ================================================= */}

            {
                !isViewMode && (

                    <div
                        className="drug-strength-audit-note"
                    >
                        Audit fields are read-only and are
                        maintained by the system.
                    </div>

                )
            }

        </section>
    );
};


export default AuditSection;