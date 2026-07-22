import React from "react";

import {
    Space,
    Popconfirm,
} from "antd";

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
    CheckOutlined,
    CloseOutlined,
    PrinterOutlined,
} from "@ant-design/icons";

import {
    AppIconButton,
} from "../buttons";

function AppTableActions({

    record,

    showView = true,

    showEdit = true,

    showDelete = false,

    showClone = false,

    showApprove = false,

    showReject = false,

    showPrint = false,

    disableEdit = false,

    disableDelete = false,

    disableApprove = false,

    disableReject = false,

    onView,

    onEdit,

    onDelete,

    onClone,

    onApprove,

    onReject,

    onPrint,

}) {

    return (

        <Space
            size={4}
            wrap
        >

            {

                showView && (

                    <AppIconButton

                        icon={<EyeOutlined />}

                        tooltip="View"

                        onClick={() =>
                            onView?.(record)
                        }

                    />

                )

            }

            {

                showEdit && (

                    <AppIconButton

                        icon={<EditOutlined />}

                        tooltip="Edit"

                        disabled={disableEdit}

                        onClick={() =>
                            onEdit?.(record)
                        }

                    />

                )

            }

            {

                showClone && (

                    <AppIconButton

                        icon={<CopyOutlined />}

                        tooltip="Clone"

                        onClick={() =>
                            onClone?.(record)
                        }

                    />

                )

            }

            {

                showApprove && (

                    <AppIconButton

                        icon={<CheckOutlined />}

                        tooltip="Approve"

                        disabled={disableApprove}

                        onClick={() =>
                            onApprove?.(record)
                        }

                    />

                )

            }

            {

                showReject && (

                    <AppIconButton

                        icon={<CloseOutlined />}

                        tooltip="Reject"

                        disabled={disableReject}

                        onClick={() =>
                            onReject?.(record)
                        }

                    />

                )

            }

            {

                showPrint && (

                    <AppIconButton

                        icon={<PrinterOutlined />}

                        tooltip="Print"

                        onClick={() =>
                            onPrint?.(record)
                        }

                    />

                )

            }

            {

                showDelete && (

                    <Popconfirm

                        title="Delete Record"

                        description="Are you sure you want to delete this record?"

                        okText="Delete"

                        cancelText="Cancel"

                        onConfirm={() =>
                            onDelete?.(record)
                        }

                    >

                        <span>

                            <AppIconButton

                                icon={<DeleteOutlined />}

                                tooltip="Delete"

                                danger

                                disabled={disableDelete}

                            />

                        </span>

                    </Popconfirm>

                )

            }

        </Space>

    );

}

export default React.memo(AppTableActions);