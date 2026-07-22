import React from "react";

import { Tag, Space } from "antd";

import {
    EyeOutlined,
    EditOutlined,
    CopyOutlined,
    SendOutlined,
} from "@ant-design/icons";

import { AppTable } from "../../../components/common/table";
import { AppButton } from "../../../components/common/buttons";

function PurchaseGrid({

    dataSource,

    loading,

    pagination,

    onChange,

    onView,

    onEdit,

    onClone,

    onSubmit,

}) {

    const columns = [

        {
            title: "PR No",
            dataIndex: "prNo",
            width: 150,
            fixed: "left",
        },

        {
            title: "PR Date",
            dataIndex: "prDate",
            width: 120,
        },

        {
            title: "Center",
            dataIndex: "center",
            width: 180,
        },

        {
            title: "Store",
            dataIndex: "store",
            width: 220,
        },

        {
            title: "Priority",
            dataIndex: "priority",
            width: 130,

            render: (value) => {

                let color = "blue";

                if (value === "Urgent")
                    color = "orange";

                if (value === "Emergency")
                    color = "red";

                return (

                    <Tag color={color}>
                        {value}
                    </Tag>

                );

            },

        },

        {
            title: "Items",
            dataIndex: "itemCount",
            width: 90,
            align: "center",
        },

        {
            title: "Amount",
            dataIndex: "amount",
            width: 130,
            align: "right",

            render: (value) =>

                `₹ ${value.toLocaleString()}`,

        },

        {
            title: "Status",
            dataIndex: "status",
            width: 170,

            render: (value) => {

                const colors = {

                    Draft: "default",

                    "Pending Approval": "orange",

                    Approved: "green",

                    Rejected: "red",

                };

                return (

                    <Tag color={colors[value]}>
                        {value}
                    </Tag>

                );

            },

        },

        {
            title: "Created By",
            dataIndex: "createdBy",
            width: 150,
        },

        {
            title: "Actions",
            key: "actions",
            width: 240,
            fixed: "right",

            render: (_, record) => (

                <Space size={4}>

                    <AppButton

                        type="link"

                        icon={<EyeOutlined />}

                        onClick={() => onView?.(record)}

                    />

                    {

                        record.status === "Draft" && (

                            <AppButton

                                type="link"

                                icon={<EditOutlined />}

                                onClick={() => onEdit?.(record)}

                            />

                        )

                    }

                    <AppButton

                        type="link"

                        icon={<CopyOutlined />}

                        onClick={() => onClone?.(record)}

                    />

                    {

                        record.status === "Draft" && (

                            <AppButton

                                type="link"

                                icon={<SendOutlined />}

                                onClick={() => onSubmit?.(record)}

                            />

                        )

                    }

                </Space>

            ),

        },

    ];

    return (

        <AppTable

            rowKey="key"

            loading={loading}

            columns={columns}

            dataSource={dataSource}

            pagination={pagination}

            onChange={onChange}

            scroll={{

                x: 1800,

            }}

        />

    );

}

export default React.memo(PurchaseGrid);