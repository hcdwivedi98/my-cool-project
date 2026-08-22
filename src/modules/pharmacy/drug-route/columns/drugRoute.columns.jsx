// src/modules/pharmacy/drug-route/columns/drugRoute.columns.jsx

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
    DRUG_ROUTE_TYPES,
} from "../constants/drugRoute.constants";

import {
    getDrugRouteTypeLabel,
    getDrugRouteUsageStatus,
} from "../utils/drugRoute.helper";


/*
 * =========================================================
 * TYPE LABEL
 * =========================================================
 */

const getTypeLabel = (
    value
) => {

    const option =
        DRUG_ROUTE_TYPES.find(
            (item) =>
                item.value ===
                value
        );

    return (
        option?.label ||
        value ||
        "-"
    );
};


/*
 * =========================================================
 * TYPE COLOR
 * =========================================================
 *
 * Keep colors centralized here so table UI remains
 * consistent.
 */

const getTypeColor = (
    value
) => {

    switch (value) {

        case "SYSTEMIC":
            return "blue";

        case "LOCAL":
            return "green";

        case "SPECIALIZED":
            return "purple";

        default:
            return "default";
    }
};


/*
 * =========================================================
 * STATUS TAG
 * =========================================================
 */

const renderStatus = (
    status
) => {

    if (
        status ===
        "Active"
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
        <Tag
            color="default"
        >
            Inactive
        </Tag>
    );
};


/*
 * =========================================================
 * USAGE
 * =========================================================
 */

const renderUsage = (
    drugCount
) => {

    const count =
        Number(
            drugCount
        ) || 0;


    if (
        count === 0
    ) {

        return (
            <Tag>
                Unused
            </Tag>
        );
    }


    return (
        <Tag
            color="blue"
        >
            {count}{" "}
            {count === 1
                ? "Drug"
                : "Drugs"}
        </Tag>
    );
};


/*
 * =========================================================
 * ACTION MENU
 * =========================================================
 */

const ActionMenu = ({
    record,
    onView,
    onEdit,
    onActivate,
    onDeactivate,
}) => {

    const isActive =
        record?.status ===
        "Active";


    const menuItems = [

        /*
         * -----------------------------------------------
         * VIEW
         * -----------------------------------------------
         */

        {
            key:
                "view",

            label:
                "View",

            icon:
                <EyeOutlined />,
        },


        /*
         * -----------------------------------------------
         * EDIT
         * -----------------------------------------------
         */

        {
            key:
                "edit",

            label:
                "Edit",

            icon:
                <EditOutlined />,
        },


        {
            type:
                "divider",
        },


        /*
         * -----------------------------------------------
         * ACTIVATE / DEACTIVATE
         * -----------------------------------------------
         */

        isActive
            ? {
                  key:
                      "deactivate",

                  label:
                      "Deactivate",

                  icon:
                      <StopOutlined />,
              }
            : {
                  key:
                      "activate",

                  label:
                      "Activate",

                  icon:
                      <CheckCircleOutlined />,
              },
    ];


    const handleClick =
        ({
            key,
        }) => {

            switch (key) {

                case "view":

                    onView?.(
                        record
                    );

                    break;


                case "edit":

                    onEdit?.(
                        record
                    );

                    break;


                case "activate":

                    onActivate?.(
                        record
                    );

                    break;


                case "deactivate":

                    onDeactivate?.(
                        record
                    );

                    break;


                default:
                    break;
            }
        };


    return (
        <Dropdown
            trigger={[
                "click",
            ]}

            menu={{
                items:
                    menuItems,

                onClick:
                    handleClick,
            }}
        >
            <Button
                type="text"
                icon={
                    <MoreOutlined />
                }
            />
        </Dropdown>
    );
};


/*
 * =========================================================
 * COLUMNS FACTORY
 * =========================================================
 *
 * Usage:
 *
 * getDrugRouteColumns({
 *     onView,
 *     onEdit,
 *     onActivate,
 *     onDeactivate,
 * })
 */

const getDrugRouteColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
} = {}) => {

    return [

        /*
         * =================================================
         * ROUTE CODE
         * =================================================
         */

        {
            title:
                "Route Code",

            dataIndex:
                "routeCode",

            key:
                "routeCode",

            width:
                130,

            fixed:
                "left",

            sorter:
                true,

            render:
                (
                    value
                ) => (

                    <strong>
                        {
                            value ||
                            "-"
                        }
                    </strong>

                ),
        },


        /*
         * =================================================
         * ROUTE NAME
         * =================================================
         */

        {
            title:
                "Route Name",

            dataIndex:
                "routeName",

            key:
                "routeName",

            width:
                190,

            sorter:
                true,

            render:
                (
                    value
                ) => (

                    <span>
                        {
                            value ||
                            "-"
                        }
                    </span>

                ),
        },


        /*
         * =================================================
         * ROUTE TYPE
         * =================================================
         */

        {
            title:
                "Route Type",

            dataIndex:
                "routeType",

            key:
                "routeType",

            width:
                150,

            filters:
                DRUG_ROUTE_TYPES.map(
                    (
                        item
                    ) => ({

                        text:
                            item.label,

                        value:
                            item.value,
                    })
                ),

            render:
                (
                    value
                ) => (

                    <Tag
                        color={
                            getTypeColor(
                                value
                            )
                        }
                    >
                        {
                            getTypeLabel(
                                value
                            )
                        }
                    </Tag>

                ),
        },


        /*
         * =================================================
         * DESCRIPTION
         * =================================================
         */

        {
            title:
                "Description",

            dataIndex:
                "description",

            key:
                "description",

            width:
                280,

            ellipsis:
                true,

            render:
                (
                    value
                ) => {

                    if (
                        !value
                    ) {
                        return "-";
                    }


                    return (
                        <Tooltip
                            title={
                                value
                            }
                        >
                            <span>
                                {
                                    value
                                }
                            </span>
                        </Tooltip>
                    );
                },
        },


        /*
         * =================================================
         * DRUG COUNT
         * =================================================
         */

        {
            title:
                "Mapped Drugs",

            dataIndex:
                "drugCount",

            key:
                "drugCount",

            width:
                130,

            sorter:
                true,

            align:
                "center",

            render:
                (
                    value
                ) =>
                    renderUsage(
                        value
                    ),
        },


        /*
         * =================================================
         * USAGE
         * =================================================
         */

        {
            title:
                "Usage",

            key:
                "usage",

            width:
                120,

            filters: [

                {
                    text:
                        "Used",

                    value:
                        "USED",
                },

                {
                    text:
                        "Unused",

                    value:
                        "UNUSED",
                },

            ],

            render:
                (
                    _,
                    record
                ) => {

                    const usage =
                        getDrugRouteUsageStatus(
                            record?.drugCount
                        );


                    return usage ===
                        "USED"
                        ? (
                            <Tag
                                color="blue"
                            >
                                Used
                            </Tag>
                        )
                        : (
                            <Tag>
                                Unused
                            </Tag>
                        );
                },
        },


        /*
         * =================================================
         * STATUS
         * =================================================
         */

        {
            title:
                "Status",

            dataIndex:
                "status",

            key:
                "status",

            width:
                120,

            filters: [

                {
                    text:
                        "Active",

                    value:
                        "Active",
                },

                {
                    text:
                        "Inactive",

                    value:
                        "Inactive",
                },

            ],

            render:
                (
                    value
                ) =>
                    renderStatus(
                        value
                    ),
        },


        /*
         * =================================================
         * SORT ORDER
         * =================================================
         */

        {
            title:
                "Order",

            dataIndex:
                "sortOrder",

            key:
                "sortOrder",

            width:
                90,

            sorter:
                true,

            align:
                "center",
        },


        /*
         * =================================================
         * MODIFIED
         * =================================================
         */

        {
            title:
                "Modified",

            dataIndex:
                "modifiedOn",

            key:
                "modifiedOn",

            width:
                170,

            sorter:
                true,

            render:
                (
                    value
                ) =>
                    value ||
                    "-",
        },


        /*
         * =================================================
         * ACTIONS
         * =================================================
         */

        {
            title:
                "Action",

            key:
                "action",

            width:
                80,

            fixed:
                "right",

            align:
                "center",

            render:
                (
                    _,
                    record
                ) => (

                    <ActionMenu

                        record={
                            record
                        }

                        onView={
                            onView
                        }

                        onEdit={
                            onEdit
                        }

                        onActivate={
                            onActivate
                        }

                        onDeactivate={
                            onDeactivate
                        }

                    />

                ),
        },
    ];
};


/*
 * =========================================================
 * DEFAULT EXPORT
 * =========================================================
 */

export default getDrugRouteColumns;