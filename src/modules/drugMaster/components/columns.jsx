import React from "react";

import { AppRowActions } from "@/components/common/table";
import { AppStatusTag } from "@/components/common/feedback";

export const getDrugColumns = ({
    onView,
    onEdit,
    onDelete,
    onClone,
    onActivate,
    onDeactivate,
}) => [

        {
            title: "Code",
            dataIndex: "itemCode",
            key: "itemCode",
            width: 120,
            sorter: true,
            fixed: "left",
        },

        {
            title: "Medicine Name",
            dataIndex: "itemName",
            key: "itemName",
            width: 250,
            sorter: true,
            ellipsis: true,
            fixed: "left",
        },

        {
            title: "Generic",
            dataIndex: "genericName",
            key: "genericName",
            width: 180,
            ellipsis: true,
        },

        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
            width: 160,
            sorter: true,
        },

        {
            title: "Manufacturer",
            dataIndex: "manufacturerName",
            key: "manufacturerName",
            width: 180,
            ellipsis: true,
        },

        {
            title: "Dosage Form",
            dataIndex: "dosageFormName",
            key: "dosageFormName",
            width: 130,
        },

        {
            title: "Strength",
            dataIndex: "strength",
            key: "strength",
            width: 100,
            align: "center",
        },

        {
            title: "Pack",
            dataIndex: "packDescription",
            key: "packDescription",
            width: 160,
        },

        {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp",
            width: 110,
            align: "right",
            sorter: true,
            render: value =>

                Number(value || 0).toLocaleString(

                    "en-IN",

                    {

                        minimumFractionDigits: 2,

                        maximumFractionDigits: 2,

                    }

                )
        },

        {
            title: "Sale Price",
            dataIndex: "salePrice",
            key: "salePrice",
            width: 110,
            align: "right",
            sorter: true,
            render: value =>

                Number(value || 0).toLocaleString(

                    "en-IN",

                    {

                        minimumFractionDigits: 2,

                        maximumFractionDigits: 2,

                    }

                ),
        },

        {
            title: "GST %",
            dataIndex: "gstRate",
            key: "gstRate",
            width: 90,
            align: "center",
        },

        {
            title: "Reorder",
            dataIndex: "reorderLevel",
            key: "reorderLevel",
            width: 100,
            align: "center",
        },

        {
            title: "Stock",
            dataIndex: "currentStock",
            key: "currentStock",
            width: 100,
            align: "right",
        },

        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            width: 100,
            align: "center",

            render: value => (

                <AppStatusTag
                    value={value}
                />

            ),

        },

        {
            title: "Actions",
            key: "actions",
            width: 220,
            align: "center",
            fixed: "right",

            render: (_, record) => (

                <AppRowActions

                    record={record}

                    items={[

                        {
                            key: "view",
                            label: "View",
                            onClick: () => onView?.(record),
                        },

                        {
                            key: "edit",
                            label: "Edit",
                            onClick: () => onEdit?.(record),
                        },

                        {
                            key: "clone",
                            label: "Clone",
                            onClick: () => onClone?.(record),
                        },

                        record.isActive
                            ? {
                                key: "deactivate",
                                label: "Deactivate",
                                danger: true,
                                onClick: () =>
                                    onDeactivate?.(record),
                            }
                            : {
                                key: "activate",
                                label: "Activate",
                                onClick: () =>
                                    onActivate?.(record),
                            },

                        {
                            type: "divider",
                        },

                        {
                            key: "delete",
                            label: "Delete",
                            danger: true,
                            onClick: () =>
                                onDelete?.(record),
                        },

                    ]}

                />

            ),

        },

    ];