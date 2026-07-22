import React from "react";

import { Tag } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

import AppTable from "./AppTable";

import AppButton from "../buttons/AppButton";

function AppItemGrid({

    items = [],

    loading = false,

    rowKey = "id",

    showBatch = true,

    showExpiry = true,

    showStock = true,

    showGST = false,

    showDelete = true,

    onDelete,

}) {

    const columns = [

        {
            title: "Item Code",
            dataIndex: "itemCode",
            width: 120,
            fixed: "left",
        },

        {
            title: "Medicine",
            dataIndex: "itemName",
            width: 280,
        },

        showBatch && {

            title: "Batch",

            dataIndex: "batchNo",

            width: 120,

        },

        showExpiry && {

            title: "Expiry",

            dataIndex: "expiry",

            width: 110,

        },

        showStock && {

            title: "Stock",

            dataIndex: "stock",

            width: 100,

            align: "right",

            render: value => (

                <Tag

                    color={

                        value > 20

                            ? "green"

                            : "orange"

                    }

                >

                    {value}

                </Tag>

            ),

        },

        {

            title: "Qty",

            dataIndex: "qty",

            width: 90,

            align: "right",

        },

        {

            title: "Rate",

            dataIndex: "purchaseRate",

            width: 120,

            align: "right",

            render: value =>

                `₹ ${Number(value).toFixed(2)}`,

        },

        showGST && {

            title: "GST",

            dataIndex: "gst",

            width: 90,

            align: "center",

        },

        {

            title: "Amount",

            width: 130,

            align: "right",

            render: (_, row) =>

                `₹ ${(row.qty * row.purchaseRate).toFixed(2)}`,

        },

        showDelete && {

            title: "",

            width: 60,

            fixed: "right",

            render: (_, row) => (

                <AppButton

                    type="text"

                    danger

                    icon={<DeleteOutlined />}

                    onClick={() =>

                        onDelete?.(row)

                    }

                />

            ),

        },

    ].filter(Boolean);

    return (

        <AppTable

            rowKey={rowKey}

            loading={loading}

            columns={columns}

            dataSource={items}

            pagination={false}

            scroll={{

                x: 1500,

            }}

        />

    );

}

export default React.memo(AppItemGrid);