import {
    Tag,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    PrinterOutlined,
} from "@ant-design/icons";

export default function getColumns({

    onView,

    onEdit,

    onDelete,

    onPrint,

    AppRowActions,

}) {

    return [

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
            sorter: true,
            ellipsis: true,
            width: 250,
        },

        {
            title: "Generic Name",
            dataIndex: "genericName",
            key: "genericName",
            ellipsis: true,
            width: 220,
        },

        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
            width: 180,
        },

        {
            title: "Manufacturer",
            dataIndex: "manufacturerName",
            key: "manufacturerName",
            width: 220,
        },

        {
            title: "Dosage",
            dataIndex: "dosageFormName",
            key: "dosageFormName",
            width: 120,
        },

        {
            title: "Strength",
            dataIndex: "strength",
            key: "strength",
            width: 120,
        },

        {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp",
            width: 120,
            align: "right",
        },

        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            width: 100,
            align: "center",

            render: value => (

                <Tag

                    color={

                        value

                            ? "success"

                            : "error"

                    }

                >

                    {value ? "Active" : "Inactive"}

                </Tag>

            )

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

}