// src/modules/pharmacy/drug-strength/columns/drugStrength.columns.jsx

import React from "react";

import {
    Button,
    Dropdown,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    MoreOutlined,
    StopOutlined,
} from "@ant-design/icons";

import {
    DRUG_STRENGTH_STATUS,
} from "../constants/drugStrength.constants";

import {
    getDrugStrengthStatusColor,
    getDrugStrengthStatusLabel,
    getDrugStrengthUsageLabel,
} from "../utils/drugStrength.helper";


/* =========================================================
   STATUS TAG
   ========================================================= */

const renderStatus = (
    status
) => {

    const color =
        getDrugStrengthStatusColor(
            status
        );

    const label =
        getDrugStrengthStatusLabel(
            status
        );


    return (
        <Tag
            color={color}
        >
            {label}
        </Tag>
    );
};


/* =========================================================
   USAGE TAG
   ========================================================= */

const renderUsage = (
    mappedDrugCount
) => {

    const count =
        Number(
            mappedDrugCount
        ) || 0;

    const label =
        getDrugStrengthUsageLabel(
            count
        );


    return (
        <Space
            size={6}
        >

            <Tag
                color={
                    count > 0
                        ? "blue"
                        : "default"
                }
            >
                {label}
            </Tag>

            <span>
                {count}
            </span>

        </Space>
    );
};


/* =========================================================
   COLUMN FACTORY
   ========================================================= */

const getDrugStrengthColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
    onDelete,
} = {}) => {


    /* =====================================================
       ACTION HANDLER SAFETY
    ===================================================== */

    const handleView =
        typeof onView === "function"
            ? onView
            : () => {};


    const handleEdit =
        typeof onEdit === "function"
            ? onEdit
            : () => {};


    const handleActivate =
        typeof onActivate === "function"
            ? onActivate
            : () => {};


    const handleDeactivate =
        typeof onDeactivate === "function"
            ? onDeactivate
            : () => {};


    const handleDelete =
        typeof onDelete === "function"
            ? onDelete
            : () => {};


    /* =====================================================
       COLUMNS
    ===================================================== */

    return [

        /* =================================================
           STRENGTH CODE
        ================================================= */

        {
            title:
                "Strength Code",

            dataIndex:
                "strengthCode",

            key:
                "strengthCode",

            width:
                150,

            fixed:
                "left",

            sorter:
                true,

            render: (
                value
            ) => (

                <span
                    style={{
                        fontWeight:
                            600,

                        color:
                            "#1677ff",
                    }}
                >
                    {value}
                </span>

            ),
        },


        /* =================================================
           STRENGTH
        ================================================= */

        {
            title:
                "Strength",

            dataIndex:
                "strengthDisplay",

            key:
                "strengthDisplay",

            width:
                140,

            sorter:
                true,

            render: (
                value,
                record
            ) => (

                <Tooltip
                    title={
                        record.description ||
                        undefined
                    }
                >

                    <span
                        style={{
                            fontWeight:
                                600,
                        }}
                    >
                        {value}
                    </span>

                </Tooltip>

            ),
        },


        /* =================================================
           VALUE
        ================================================= */

        {
            title:
                "Value",

            dataIndex:
                "strengthValue",

            key:
                "strengthValue",

            width:
                110,

            align:
                "right",

            sorter:
                true,

            render: (
                value
            ) =>
                value === null ||
                value === undefined
                    ? "-"
                    : value,
        },


        /* =================================================
           UNIT
        ================================================= */

        {
            title:
                "Unit",

            dataIndex:
                "strengthUnitName",

            key:
                "strengthUnitName",

            width:
                100,

            sorter:
                true,

            render: (
                value,
                record
            ) =>
                value ||
                record.strengthUnitCode ||
                "-",
        },


        /* =================================================
           TYPE
        ================================================= */

        {
            title:
                "Strength Type",

            dataIndex:
                "strengthType",

            key:
                "strengthType",

            width:
                150,

            sorter:
                true,

            render: (
                value
            ) =>
                value ||
                "-",
        },


        /* =================================================
           PRECISION
        ================================================= */

        {
            title:
                "Precision",

            dataIndex:
                "decimalPrecision",

            key:
                "decimalPrecision",

            width:
                100,

            align:
                "center",

            sorter:
                true,

            render: (
                value
            ) =>
                value === null ||
                value === undefined
                    ? 0
                    : value,
        },


        /* =================================================
           MAPPED DRUGS
        ================================================= */

        {
            title:
                "Mapped Drugs",

            dataIndex:
                "mappedDrugCount",

            key:
                "mappedDrugCount",

            width:
                140,

            align:
                "center",

            sorter:
                true,

            render: (
                value
            ) =>
                renderUsage(
                    value
                ),
        },


        /* =================================================
           STATUS
        ================================================= */

        {
            title:
                "Status",

            dataIndex:
                "status",

            key:
                "status",

            width:
                110,

            align:
                "center",

            sorter:
                true,

            render: (
                status
            ) =>
                renderStatus(
                    status
                ),
        },


        /* =================================================
           SYSTEM DEFINED
        ================================================= */

        {
            title:
                "Source",

            dataIndex:
                "isSystemDefined",

            key:
                "isSystemDefined",

            width:
                110,

            align:
                "center",

            render: (
                value
            ) => (

                <Tag
                    color={
                        value
                            ? "purple"
                            : "default"
                    }
                >
                    {
                        value
                            ? "System"
                            : "Custom"
                    }
                </Tag>

            ),
        },


        /* =================================================
           ACTIONS
        ================================================= */

        {
            title:
                "Actions",

            key:
                "actions",

            width:
                90,

            fixed:
                "right",

            align:
                "center",

            render: (
                _,
                record
            ) => {

                const isActive =
                    record.status ===
                    DRUG_STRENGTH_STATUS.ACTIVE;


                const canDelete =
                    !record.isSystemDefined &&
                    (
                        Number(
                            record.mappedDrugCount
                        ) || 0
                    ) === 0;


                const menuItems = [

                    {
                        key:
                            "view",

                        icon:
                            <EyeOutlined />,

                        label:
                            "View",

                        onClick:
                            () =>
                                handleView(
                                    record
                                ),
                    },


                    {
                        key:
                            "edit",

                        icon:
                            <EditOutlined />,

                        label:
                            "Edit",

                        onClick:
                            () =>
                                handleEdit(
                                    record
                                ),
                    },


                    {
                        type:
                            "divider",
                    },


                    isActive
                        ? {

                            key:
                                "deactivate",

                            icon:
                                <StopOutlined />,

                            label:
                                "Deactivate",

                            onClick:
                                () =>
                                    handleDeactivate(
                                        record
                                    ),

                        }
                        : {

                            key:
                                "activate",

                            icon:
                                <CheckCircleOutlined />,

                            label:
                                "Activate",

                            onClick:
                                () =>
                                    handleActivate(
                                        record
                                    ),

                        },


                    {
                        key:
                            "delete",

                        icon:
                            <DeleteOutlined />,

                        label:
                            "Delete",

                        danger:
                            true,

                        disabled:
                            !canDelete,

                        onClick:
                            () =>
                                handleDelete(
                                    record
                                ),
                    },

                ];


                return (

                    <Dropdown
                        trigger={[
                            "click",
                        ]}
                        menu={{
                            items:
                                menuItems,
                        }}
                    >

                        <Button
                            type="text"
                            icon={
                                <MoreOutlined />
                            }
                            aria-label="Drug strength actions"
                        />

                    </Dropdown>

                );
            },
        },

    ];
};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default getDrugStrengthColumns;