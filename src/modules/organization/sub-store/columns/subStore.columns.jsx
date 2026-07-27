import { Tag } from "antd";
import { AppButton } from "@/components/common";

export const getSubStoreColumns = ({
    onView,
    onEdit
}) => [

    {
        title: "Code",
        dataIndex: "code",
        width: 120
    },

    {
        title: "Sub Store Name",
        dataIndex: "name",
        width: 220
    },

    {
        title: "Store",
        dataIndex: "storeName",
        width: 180
    },

    {
        title: "Incharge",
        dataIndex: "incharge",
        width: 180
    },

    {
        title: "Status",
        dataIndex: "status",
        width: 120,
        render: (value) => (
            <Tag color={value ? "green" : "red"}>
                {value ? "Active" : "Inactive"}
            </Tag>
        )
    },

    {
        title: "Action",
        key: "action",
        width: 180,
        fixed: "right",
        render: (_, record) => (

            <div
                style={{
                    display: "flex",
                    gap: 8
                }}
            >

                <AppButton
                    type="link"
                    onClick={() => onView(record)}
                >
                    View
                </AppButton>

                <AppButton
                    type="link"
                    onClick={() => onEdit(record)}
                >
                    Edit
                </AppButton>

            </div>

        )
    }

];