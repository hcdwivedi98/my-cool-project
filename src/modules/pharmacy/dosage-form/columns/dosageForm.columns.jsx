// src/modules/pharmacy/dosage-form/columns/dosageForm.columns.jsx

import React from "react";

import {
    Button,
    Dropdown,
    Space,
    Tag,
    Tooltip,
} from "antd";

import {
    EditOutlined,
    EyeOutlined,
    MoreOutlined,
    StopOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

import {
    getDosageFormUsageStatus,
    getDosageFormTypeLabel,
    getRouteOfAdministrationLabel,
    getUomLabel,
} from "../utils/dosageForm.helper";

import {
    DOSAGE_FORM_TYPES,
    DOSAGE_FORM_STATUS_OPTIONS,
    ROUTE_OF_ADMINISTRATION_OPTIONS,
} from "../constants/dosageForm.constants";


/*
 * =========================================================
 * STATUS TAG
 * =========================================================
 */

const renderStatus = (
    status
) => {

    const option =
        DOSAGE_FORM_STATUS_OPTIONS.find(
            (item) =>
                item.value ===
                status
        );


    return (
        <Tag
            color={
                status === "Active"
                    ? "success"
                    : "default"
            }
        >
            {
                option?.label ||
                status ||
                "-"
            }
        </Tag>
    );
};


/*
 * =========================================================
 * FORM TYPE
 * =========================================================
 */

const renderFormType = (
    value
) => {

    return getDosageFormTypeLabel(
        value,
        DOSAGE_FORM_TYPES
    );
};


/*
 * =========================================================
 * ROUTE
 * =========================================================
 */

const renderRoute = (
    value
) => {

    return getRouteOfAdministrationLabel(
        value,
        ROUTE_OF_ADMINISTRATION_OPTIONS
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

    const usage =
        getDosageFormUsageStatus(
            drugCount
        );


    if (
        usage.value ===
        "USED"
    ) {

        return (
            <Tag color="blue">
                In Use ({usage.drugCount})
            </Tag>
        );
    }


    return (
        <Tag>
            Not Used
        </Tag>
    );
};


/*
 * =========================================================
 * ACTION MENU
 * =========================================================
 */

const getActionItems = ({
    record,
    onView,
    onEdit,
    onActivate,
    onDeactivate,
}) => {

    const items = [

        {
            key: "view",

            icon: (
                <EyeOutlined />
            ),

            label: "View",

            onClick: () => {

                if (
                    typeof onView ===
                    "function"
                ) {
                    onView(
                        record
                    );
                }
            },
        },

        {
            key: "edit",

            icon: (
                <EditOutlined />
            ),

            label: "Edit",

            onClick: () => {

                if (
                    typeof onEdit ===
                    "function"
                ) {
                    onEdit(
                        record
                    );
                }
            },
        },
    ];


    /*
     * -----------------------------------------------
     * ACTIVE
     * -----------------------------------------------
     */

    if (
        record?.status ===
        "Active"
    ) {

        items.push({

            key:
                "deactivate",

            icon: (
                <StopOutlined />
            ),

            label:
                "Deactivate",

            danger:
                true,

            onClick: () => {

                if (
                    typeof onDeactivate ===
                    "function"
                ) {
                    onDeactivate(
                        record
                    );
                }
            },
        });
    }


    /*
     * -----------------------------------------------
     * INACTIVE
     * -----------------------------------------------
     */

    if (
        record?.status ===
        "Inactive"
    ) {

        items.push({

            key:
                "activate",

            icon: (
                <CheckCircleOutlined />
            ),

            label:
                "Activate",

            onClick: () => {

                if (
                    typeof onActivate ===
                    "function"
                ) {
                    onActivate(
                        record
                    );
                }
            },
        });
    }


    return items;
};


/*
 * =========================================================
 * COLUMNS
 * =========================================================
 */

const getDosageFormColumns = ({
    onView,
    onEdit,
    onActivate,
    onDeactivate,
} = {}) => {

    return [

        /*
         * -----------------------------------------------
         * CODE
         * -----------------------------------------------
         */

        {
            title:
                "Code",

            dataIndex:
                "formCode",

            key:
                "formCode",

            width:
                110,

            fixed:
                "left",

            sorter:
                true,

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
         * -----------------------------------------------
         * NAME
         * -----------------------------------------------
         */

        {
            title:
                "Dosage Form",

            dataIndex:
                "formName",

            key:
                "formName",

            width:
                180,

            sorter:
                true,

            render: (
                value
            ) => (
                <span>
                    {value || "-"}
                </span>
            ),
        },


        /*
         * -----------------------------------------------
         * TYPE
         * -----------------------------------------------
         */

        {
            title:
                "Form Type",

            dataIndex:
                "formType",

            key:
                "formType",

            width:
                130,

            filters:
                DOSAGE_FORM_TYPES.map(
                    (item) => ({
                        text:
                            item.label,

                        value:
                            item.value,
                    })
                ),

            render:
                renderFormType,
        },


        /*
         * -----------------------------------------------
         * ROUTE
         * -----------------------------------------------
         */

        {
            title:
                "Route",

            dataIndex:
                "routeOfAdministrationId",

            key:
                "routeOfAdministrationId",

            width:
                160,

            filters:
                ROUTE_OF_ADMINISTRATION_OPTIONS.map(
                    (item) => ({
                        text:
                            item.label,

                        value:
                            item.value,
                    })
                ),

            render:
                renderRoute,
        },


        /*
         * -----------------------------------------------
         * UOM
         * -----------------------------------------------
         */

        {
            title:
                "UOM",

            dataIndex:
                "uomId",

            key:
                "uomId",

            width:
                120,

            render: (
                value,
                record
            ) => {

                return (
                    record?.uomName ||
                    getUomLabel(
                        value
                    )
                );
            },
        },


        /*
         * -----------------------------------------------
         * DRUG COUNT
         * -----------------------------------------------
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

            align:
                "center",

            sorter:
                true,

            render: (
                value
            ) => (
                <span
                    style={{
                        fontWeight: 500,
                    }}
                >
                    {
                        Number(
                            value
                        ) || 0
                    }
                </span>
            ),
        },


        /*
         * -----------------------------------------------
         * USAGE
         * -----------------------------------------------
         */

        {
            title:
                "Usage",

            key:
                "usage",

            width:
                130,

            render: (
                _,
                record
            ) =>
                renderUsage(
                    record?.drugCount
                ),
        },


        /*
         * -----------------------------------------------
         * STATUS
         * -----------------------------------------------
         */

        {
            title:
                "Status",

            dataIndex:
                "status",

            key:
                "status",

            width:
                110,

            filters:
                DOSAGE_FORM_STATUS_OPTIONS.map(
                    (item) => ({
                        text:
                            item.label,

                        value:
                            item.value,
                    })
                ),

            render:
                renderStatus,
        },


        /*
         * -----------------------------------------------
         * SORT ORDER
         * -----------------------------------------------
         */

        {
            title:
                "Order",

            dataIndex:
                "sortOrder",

            key:
                "sortOrder",

            width:
                80,

            align:
                "center",

            sorter:
                true,
        },


        /*
         * -----------------------------------------------
         * ACTIONS
         * -----------------------------------------------
         */

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

                const items =
                    getActionItems({
                        record,

                        onView,

                        onEdit,

                        onActivate,

                        onDeactivate,
                    });


                return (
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={[
                            "click",
                        ]}
                    >

                        <Tooltip
                            title="Actions"
                        >

                            <Button
                                type="text"
                                icon={
                                    <MoreOutlined />
                                }
                            />

                        </Tooltip>

                    </Dropdown>
                );
            },
        },
    ];
};


export default getDosageFormColumns;