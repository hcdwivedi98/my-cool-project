import { Tag, Space } from "antd";

import {
    EyeOutlined,
    EditOutlined
} from "@ant-design/icons";

import { AppButton, AppTable } from "@/components/common";

import { STORE_COLUMNS } from "../data/store.columns";

const StoreTable = ({
    data,
    onView,
    onEdit
}) => {

    const columns = [

        ...STORE_COLUMNS,

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status) => (
                <Tag color={status ? "green" : "red"}>
                    {status ? "Active" : "Inactive"}
                </Tag>
            )
        },

        {
            title: "Actions",
            key: "actions",
            width: 140,
            render: (_, record) => (

                <Space>

                    <AppButton
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => onView(record)}
                    />

                    <AppButton
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />

                </Space>

            )
        }

    ];

    return (

        <AppTable
            rowKey="id"
            columns={columns}
            dataSource={data}
        />

    );

};

export default StoreTable;