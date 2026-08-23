/* =========================================================
   DRUG UNIT TABLE COLUMNS
   ========================================================= */

import React from "react";

import {
    Button,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";

import {
    DRUG_UNIT_STATUS,
} from "../constants/drugUnit.constants";

import {
    getDrugUnitTypeLabel,
    getDrugUnitUsageLabel,
    formatDrugUnitUsageCount,
} from "../utils/drugUnit.helper";


/* =========================================================
   STATUS TAG
   ========================================================= */

const renderStatus = (
    isActive
) => {

    if (
        isActive
    ) {

        return (
            <Tag
                color="success"
            >
                Active
            </Tag>
        );
    }


    return (
        <Tag>
            Inactive
        </Tag>
    );
};


/* =========================================================
   USAGE TAG
   ========================================================= */

const renderUsage = (
    usageCount
) => {

    const used =
        Number(
            usageCount
        ) > 0;


    return (
        <Tag
            color={
                used
                    ? "processing"
                    : undefined
            }
        >
            {
                getDrugUnitUsageLabel(
                    usageCount
                )
            }
        </Tag>
    );
};


/* =========================================================
   COLUMNS FACTORY
   ========================================================= */

const getDrugUnitColumns = (
    {
        onView,
        onEdit,
        onActivate,
        onDeactivate,
    } = {}
) => [

    /* =====================================================
       UNIT CODE
    ===================================================== */

    {
        title: "Unit Code",

        dataIndex: "unitCode",

        key: "unitCode",

        width: 120,

        fixed: "left",

        sorter: true,

        render: (
            value
        ) => (

            <span
                style={{
                    fontWeight: 600,
                }}
            >
                {
                    value || "-"
                }
            </span>

        ),
    },


    /* =====================================================
       UNIT NAME
    ===================================================== */

    {
        title: "Unit Name",

        dataIndex: "unitName",

        key: "unitName",

        width: 180,

        sorter: true,

        render: (
            value
        ) =>
            value || "-",
    },


    /* =====================================================
       SYMBOL
    ===================================================== */

    {
        title: "Symbol",

        dataIndex: "symbol",

        key: "symbol",

        width: 110,

        sorter: true,

        render: (
            value
        ) => (

            <Tag
                color="blue"
            >
                {
                    value || "-"
                }
            </Tag>

        ),
    },


    /* =====================================================
       UNIT TYPE
    ===================================================== */

    {
        title: "Unit Type",

        dataIndex: "unitType",

        key: "unitType",

        width: 140,

        sorter: true,

        render: (
            value
        ) =>
            getDrugUnitTypeLabel(
                value
            ),
    },


    /* =====================================================
       DECIMAL PRECISION
    ===================================================== */

    {
        title: "Precision",

        dataIndex:
            "decimalPrecision",

        key:
            "decimalPrecision",

        width: 100,

        align: "center",

        sorter: true,

        render: (
            value
        ) =>
            Number.isFinite(
                Number(value)
            )
                ? value
                : 0,
    },


    /* =====================================================
       MAPPED DRUGS
    ===================================================== */

    {
        title: "Mapped Drugs",

        dataIndex:
            "drugCount",

        key:
            "drugCount",

        width: 130,

        align: "right",

        sorter: true,

        render: (
            value,
            record
        ) => {

            const count =
                record?.drugCount ??
                record?.usageCount ??
                0;


            return (
                <span
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {
                        formatDrugUnitUsageCount(
                            count
                        )
                    }
                </span>
            );
        },
    },


    /* =====================================================
       USAGE
    ===================================================== */

    {
        title: "Usage",

        key: "usage",

        width: 110,

        align: "center",

        render: (
            _,
            record
        ) =>
            renderUsage(
                record?.usageCount
            ),
    },


    /* =====================================================
       STATUS
    ===================================================== */

    {
        title: "Status",

        key: "status",

        width: 110,

        align: "center",

        filters: [

            {
                text: "Active",

                value:
                    DRUG_UNIT_STATUS.ACTIVE,
            },

            {
                text: "Inactive",

                value:
                    DRUG_UNIT_STATUS.INACTIVE,
            },

        ],

        render: (
            _,
            record
        ) =>
            renderStatus(
                record?.isActive
            ),
    },


    /* =====================================================
       ACTIONS
    ===================================================== */

    {
        title: "Actions",

        key: "actions",

        width: 180,

        fixed: "right",

        render: (
            _,
            record
        ) => (

            <Space
                size={4}
            >

                {/* =========================================
                    VIEW
                ========================================== */}

                <Tooltip
                    title="View"
                >

                    <Button
                        type="text"
                        size="small"
                        icon={
                            <EyeOutlined />
                        }
                        onClick={() =>
                            onView?.(
                                record
                            )
                        }
                    />

                </Tooltip>


                {/* =========================================
                    EDIT
                ========================================== */}

                <Tooltip
                    title="Edit"
                >

                    <Button
                        type="text"
                        size="small"
                        icon={
                            <EditOutlined />
                        }
                        onClick={() =>
                            onEdit?.(
                                record
                            )
                        }
                    />

                </Tooltip>


                {/* =========================================
                    ACTIVATE
                ========================================== */}

                {
                    record?.isActive ===
                        false && (

                        <Tooltip
                            title="Activate"
                        >

                            <Button
                                type="text"
                                size="small"
                                icon={
                                    <CheckCircleOutlined />
                                }
                                onClick={() =>
                                    onActivate?.(
                                        record
                                    )
                                }
                            />

                        </Tooltip>

                    )
                }


                {/* =========================================
                    DEACTIVATE
                ========================================== */}

                {
                    record?.isActive ===
                        true && (

                        <Tooltip
                            title="Deactivate"
                        >

                            <Button
                                type="text"
                                size="small"
                                danger
                                icon={
                                    <StopOutlined />
                                }
                                onClick={() =>
                                    onDeactivate?.(
                                        record
                                    )
                                }
                            />

                        </Tooltip>

                    )
                }

            </Space>

        ),
    },

];


export default getDrugUnitColumns;