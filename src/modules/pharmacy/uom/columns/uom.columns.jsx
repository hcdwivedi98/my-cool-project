// src/modules/pharmacy/uom/columns/uom.columns.jsx

import React from "react";

import {
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EditOutlined,
    EyeOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";


/*
 * ============================================
 * STATUS TAG
 * ============================================
 */

const renderStatus = (
    status
) => {
    if (status === "Active") {
        return (
            <Tag
                icon={
                    <CheckCircleOutlined />
                }
                color="success"
            >
                Active
            </Tag>
        );
    }

    return (
        <Tag
            icon={
                <StopOutlined />
            }
            color="default"
        >
            Inactive
        </Tag>
    );
};


/*
 * ============================================
 * TYPE LABEL
 * ============================================
 */

const UOM_TYPE_LABELS = {
    MASS: "Mass",
    VOLUME: "Volume",
    COUNT: "Count",
    PACKAGING: "Packaging",
    LENGTH: "Length",
    AREA: "Area",
    OTHER: "Other",
};


const renderUomType = (
    type
) => {
    return (
        <Tag>
            {UOM_TYPE_LABELS[type] ||
                type ||
                "-"}
        </Tag>
    );
};


/*
 * ============================================
 * DECIMAL DISPLAY
 * ============================================
 */

const renderDecimalAllowed = (
    value
) => {
    if (value) {
        return (
            <Tag color="blue">
                Allowed
            </Tag>
        );
    }

    return (
        <Tag>
            Not Allowed
        </Tag>
    );
};


/*
 * ============================================
 * CONVERSION DISPLAY
 * ============================================
 *
 * Packaging UOM does not have a global
 * conversion factor.
 */

const renderConversionFactor = (
    value,
    record
) => {
    if (
        record?.uomType ===
        "PACKAGING"
    ) {
        return (
            <span>
                -
            </span>
        );
    }

    if (
        value === null ||
        value === undefined
    ) {
        return (
            <span>
                -
            </span>
        );
    }

    return (
        <span>
            {value}
        </span>
    );
};


/*
 * ============================================
 * BASE UNIT DISPLAY
 * ============================================
 */

const renderBaseUnit = (
    record
) => {
    if (
        !record?.baseUnitCode
    ) {
        return (
            <span>
                -
            </span>
        );
    }

    return (
        <span>
            {record.baseUnitCode}
        </span>
    );
};


/*
 * ============================================
 * UOM NAME DISPLAY
 * ============================================
 */

const renderUomName = (
    value,
    record
) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection:
                    "column",
                gap: 2,
            }}
        >
            <span
                style={{
                    fontWeight: 600,
                }}
            >
                {value || "-"}
            </span>

            {record?.shortName && (
                <span
                    style={{
                        fontSize: 12,
                        color: "#8c8c8c",
                    }}
                >
                    {record.shortName}
                </span>
            )}
        </div>
    );
};


/*
 * ============================================
 * ACTION BUTTON
 * ============================================
 */

const ActionButton = ({
    title,
    icon,
    onClick,
}) => {
    return (
        <Tooltip
            title={title}
        >
            <span
                onClick={onClick}
                style={{
                    width: 30,
                    height: 30,

                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent:
                        "center",

                    borderRadius: 6,

                    cursor: "pointer",

                    color: "#595959",

                    transition:
                        "all 0.2s",
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.background =
                        "#f5f5f5";
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                        "transparent";
                }}
            >
                {icon}
            </span>
        </Tooltip>
    );
};


/*
 * ============================================
 * COLUMNS
 * ============================================
 */

export const getUomColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
}) => {
    return [
        /*
         * ----------------------------------------
         * UOM CODE
         * ----------------------------------------
         */

        {
            title: "UOM Code",

            dataIndex: "uomCode",

            key: "uomCode",

            width: 130,

            sorter: true,

            fixed: "left",

            render: (
                value
            ) => (
                <span
                    style={{
                        fontWeight: 600,
                    }}
                >
                    {value || "-"}
                </span>
            ),
        },


        /*
         * ----------------------------------------
         * UOM NAME
         * ----------------------------------------
         */

        {
            title: "UOM Name",

            dataIndex: "uomName",

            key: "uomName",

            width: 190,

            sorter: true,

            render:
                renderUomName,
        },


        /*
         * ----------------------------------------
         * TYPE
         * ----------------------------------------
         */

        {
            title: "Type",

            dataIndex: "uomType",

            key: "uomType",

            width: 130,

            filters: [
                {
                    text: "Mass",
                    value: "MASS",
                },
                {
                    text: "Volume",
                    value: "VOLUME",
                },
                {
                    text: "Count",
                    value: "COUNT",
                },
                {
                    text: "Packaging",
                    value: "PACKAGING",
                },
                {
                    text: "Length",
                    value: "LENGTH",
                },
                {
                    text: "Area",
                    value: "AREA",
                },
            ],

            render:
                renderUomType,
        },


        /*
         * ----------------------------------------
         * BASE UNIT
         * ----------------------------------------
         */

        {
            title: "Base Unit",

            dataIndex:
                "baseUnitCode",

            key: "baseUnitCode",

            width: 120,

            render: (
                value,
                record
            ) =>
                renderBaseUnit(
                    record
                ),
        },


        /*
         * ----------------------------------------
         * CONVERSION FACTOR
         * ----------------------------------------
         */

        {
            title:
                "Conversion Factor",

            dataIndex:
                "conversionFactor",

            key:
                "conversionFactor",

            width: 160,

            align: "right",

            render:
                renderConversionFactor,
        },


        /*
         * ----------------------------------------
         * DECIMAL
         * ----------------------------------------
         */

        {
            title:
                "Decimal",

            dataIndex:
                "decimalAllowed",

            key:
                "decimalAllowed",

            width: 120,

            align: "center",

            filters: [
                {
                    text: "Allowed",
                    value: true,
                },
                {
                    text:
                        "Not Allowed",
                    value: false,
                },
            ],

            render:
                renderDecimalAllowed,
        },


        /*
         * ----------------------------------------
         * STATUS
         * ----------------------------------------
         */

        {
            title: "Status",

            dataIndex:
                "status",

            key:
                "status",

            width: 120,

            filters: [
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text:
                        "Inactive",
                    value: "Inactive",
                },
            ],

            render:
                renderStatus,
        },


        /*
         * ----------------------------------------
         * ACTIONS
         * ----------------------------------------
         */

        {
            title: "Action",

            key: "action",

            width: 150,

            fixed: "right",

            align: "center",

            render: (
                _,
                record
            ) => (
                <Space
                    size={2}
                >
                    <ActionButton
                        title="View"
                        icon={
                            <EyeOutlined />
                        }
                        onClick={() =>
                            onView?.(
                                record
                            )
                        }
                    />

                    <ActionButton
                        title="Edit"
                        icon={
                            <EditOutlined />
                        }
                        onClick={() =>
                            onEdit?.(
                                record
                            )
                        }
                    />

                    {record.status ===
                    "Active" ? (
                        <ActionButton
                            title="Deactivate"
                            icon={
                                <StopOutlined />
                            }
                            onClick={() =>
                                onDeactivate?.(
                                    record
                                )
                            }
                        />
                    ) : (
                        <ActionButton
                            title="Activate"
                            icon={
                                <CheckCircleOutlined />
                            }
                            onClick={() =>
                                onActivate?.(
                                    record
                                )
                            }
                        />
                    )}
                </Space>
            ),
        },
    ];
};


export default getUomColumns;