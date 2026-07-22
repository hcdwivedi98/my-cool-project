import React, { memo } from "react";

import {
    Button,
    Dropdown,
    Popconfirm,
    Tooltip,
} from "antd";

import {
    MoreOutlined,
    EyeOutlined,
    EditOutlined,
    CopyOutlined,
    CheckCircleOutlined,
    StopOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

function AppRowActions({

    record,

    onView,

    onEdit,

    onClone,

    onActivate,

    onDeactivate,

    onDelete,

}) {

    const items = [

        onView && {

            key: "view",

            icon: <EyeOutlined />,

            label: "View",

            onClick: () => onView(record),

        },

        onEdit && {

            key: "edit",

            icon: <EditOutlined />,

            label: "Edit",

            onClick: () => onEdit(record),

        },

        onClone && {

            key: "clone",

            icon: <CopyOutlined />,

            label: "Clone",

            onClick: () => onClone(record),

        },

        record?.isActive

            ? onDeactivate && {

                  key: "deactivate",

                  icon: <StopOutlined />,

                  label: "Deactivate",

                  onClick: () => onDeactivate(record),

              }

            : onActivate && {

                  key: "activate",

                  icon: <CheckCircleOutlined />,

                  label: "Activate",

                  onClick: () => onActivate(record),

              },

        onDelete && {

            key: "delete",

            danger: true,

            icon: <DeleteOutlined />,

            label: (

                <Popconfirm

                    title="Delete Record"

                    description="Are you sure you want to delete this record?"

                    okText="Yes"

                    cancelText="No"

                    onConfirm={() => onDelete(record)}

                >

                    Delete

                </Popconfirm>

            ),

        },

    ].filter(Boolean);

    return (

        <Dropdown

            trigger={["click"]}

            menu={{

                items,

            }}

        >

            <Tooltip title="Actions">

                <Button

                    type="text"

                    icon={<MoreOutlined />}

                />

            </Tooltip>

        </Dropdown>

    );

}

export default memo(AppRowActions);