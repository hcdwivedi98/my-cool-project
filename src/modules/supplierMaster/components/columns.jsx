import React from "react";

import { AppRowActions } from "@/components/common/table";
import { AppStatusTag } from "@/components/common/feedback";

export const getSupplierColumns = ({

    onView,

    onEdit,

    onDelete,

    onClone,

    onActivate,

    onDeactivate,

}) => [

    {
        title: "Code",

        dataIndex: "supplierCode",

        key: "supplierCode",

        width: 120,

        sorter: true,

        fixed: "left",
    },

    {
        title: "Supplier Name",

        dataIndex: "supplierName",

        key: "supplierName",

        width: 260,

        sorter: true,

        ellipsis: true,

        fixed: "left",
    },

    {
        title: "Type",

        dataIndex: "supplierType",

        key: "supplierType",

        width: 120,

        align: "center",
    },

    {
        title: "Contact Person",

        dataIndex: "contactPerson",

        key: "contactPerson",

        width: 180,

        ellipsis: true,
    },

    {
        title: "Mobile",

        dataIndex: "mobileNo",

        key: "mobileNo",

        width: 130,
    },

    {
        title: "Email",

        dataIndex: "email",

        key: "email",

        width: 240,

        ellipsis: true,
    },

    {
        title: "GST No",

        dataIndex: "gstNo",

        key: "gstNo",

        width: 180,
    },

    {
        title: "Drug License",

        dataIndex: "drugLicenseNo",

        key: "drugLicenseNo",

        width: 180,
    },

    {
        title: "Payment",

        dataIndex: "paymentType",

        key: "paymentType",

        width: 120,

        align: "center",
    },

    {
        title: "Credit Days",

        dataIndex: "creditDays",

        key: "creditDays",

        width: 120,

        align: "center",
    },

    {
        title: "Credit Limit",

        dataIndex: "creditLimit",

        key: "creditLimit",

        width: 140,

        align: "right",

        render: (value) =>

            Number(value || 0).toLocaleString(

                "en-IN",

                {

                    minimumFractionDigits: 2,

                    maximumFractionDigits: 2,

                }

            ),
    },

    {
        title: "City",

        dataIndex: "cityName",

        key: "cityName",

        width: 150,
    },

    {
        title: "State",

        dataIndex: "stateName",

        key: "stateName",

        width: 150,
    },

    {
        title: "Status",

        dataIndex: "isActive",

        key: "isActive",

        width: 100,

        align: "center",

        render: (value) => (

            <AppStatusTag

                value={value}

            />

        ),
    },

    {
        title: "Actions",

        key: "actions",

        width: 70,

        fixed: "right",

        align: "center",

        render: (_, record) => (

            <AppRowActions

                record={record}

                onView={onView}

                onEdit={onEdit}

                onClone={onClone}

                onActivate={onActivate}

                onDeactivate={onDeactivate}

                onDelete={onDelete}

            />

        ),
    },

];