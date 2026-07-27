import { Tag } from "antd";
import { AppButton } from "@/components/common";

export const getRackColumns = ({
    onView,
    onEdit
}) => [

    {
        title: "Rack Code",
        dataIndex: "rackCode",
        width: 140
    },

    {
        title: "Rack Name",
        dataIndex: "rackName",
        width: 220
    },

    {
        title: "Rack Type",
        dataIndex: "rackType",
        width: 180
    },

    {
        title: "Sub Store",
        dataIndex: "subStoreName",
        width: 200
    },

    {
        title: "Maximum Shelves",
        dataIndex: "maximumShelves",
        align: "center",
        width: 150
    },

    {
        title: "Status",
        dataIndex: "status",
        width: 120,
        align: "center",
        render: (value) => (
            <Tag color={value ? "green" : "red"}>
                {value ? "Active" : "Inactive"}
            </Tag>
        )
    },

    {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 180,
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