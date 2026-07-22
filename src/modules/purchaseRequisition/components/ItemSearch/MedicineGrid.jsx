import React from "react";

import {
    Tag,
    Tooltip,
} from "antd";

import {
    CheckOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "../../../../components/common/buttons";

import AppTable from "../../../../components/common/table/AppTable";

function MedicineGrid({

    loading = false,

    dataSource = [],

    onSelect,

}) {

    //-----------------------------------------------------

    const columns = [

        {
            title: "Code",
            dataIndex: "itemCode",
            width: 120,
            fixed: "left",
        },

        {
            title: "Medicine",
            dataIndex: "itemName",
            width: 260,
        },

        {
            title: "Generic",
            dataIndex: "genericName",
            width: 220,
        },

        {
            title: "Manufacturer",
            dataIndex: "manufacturer",
            width: 220,
        },

        {
            title: "Batch",
            dataIndex: "batchNo",
            width: 120,
        },

        {
            title: "Expiry",
            dataIndex: "expiry",
            width: 110,

            render: value => (

                <Tag color="blue">

                    {value}

                </Tag>

            ),

        },

        {
            title: "Stock",
            dataIndex: "stock",
            width: 100,
            align: "center",

            render: value => (

                <Tag

                    color={

                        value > 20

                            ? "green"

                            : value > 0

                            ? "orange"

                            : "red"

                    }

                >

                    {value}

                </Tag>

            ),

        },

        {
            title: "Purchase Rate",
            dataIndex: "purchaseRate",
            width: 140,
            align: "right",

            render: value =>

                `₹ ${Number(value).toFixed(2)}`,

        },

        {
            title: "",
            width: 90,
            fixed: "right",

            render: (_, record) => (

                <Tooltip title="Select">

                    <AppButton

                        type="primary"

                        size="small"

                        icon={<CheckOutlined />}

                        disabled={record.stock <= 0}

                        onClick={() =>

                            onSelect?.(record)

                        }

                    >

                        Select

                    </AppButton>

                </Tooltip>

            ),

        },

    ];

    //-----------------------------------------------------
console.log("Grid Data:", dataSource);
    return (

        <AppTable

            rowKey="id"

            loading={loading}

            columns={columns}

            dataSource={dataSource}

            pagination={{

                pageSize: 10,

                showSizeChanger: true,

                showTotal: total =>

                    `Total ${total} Medicines`,

            }}

            scroll={{

                x: 1400,

                y: 450,

            }}

        />

    );

}

export default React.memo(MedicineGrid);