import { useMemo } from "react";
import PropTypes from "prop-types";

import {
    AppTable,
    AppButton,
} from "@/components/common";
import {
    Space,
} from "antd";
import StatusTag from "./StatusTag";

function DepartmentTable({
    data = [],
    loading = false,
    pagination,
    onEdit,
    onView,
    onDelete,
    onTableChange,
}) {
    const columns = useMemo(
        () => [
            {
                title: "Code",
                dataIndex: "code",
                width: 120,
                sorter: true,
            },
            {
                title: "Department",
                dataIndex: "name",
                sorter: true,
            },
            {
                title: "Type",
                dataIndex: "departmentType",
                width: 150,
            },
            {
                title: "Center",
                dataIndex: "centerName",
                width: 180,
            },
            {
                title: "Phone",
                dataIndex: "phoneNumber",
                width: 150,
            },
            {
                title: "Status",
                dataIndex: "isActive",
                width: 120,
                align: "center",
                render: (value) => (
                    <StatusTag active={value} />
                ),
            },
            {
                title: "Actions",
                key: "actions",
                width: 180,
                fixed: "right",
                render: (_, record) => (
                    <Space>
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

                        <AppButton
                            danger
                            type="link"
                            onClick={() => onDelete(record)}
                        >
                            Delete
                        </AppButton>
                    </Space>
                ),
            },
        ],
        [onDelete, onEdit, onView]
    );

    return (
        <AppTable
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onChange={onTableChange}
            scroll={{
                x: 1200,
            }}
        />
    );
}

DepartmentTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    pagination: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onTableChange: PropTypes.func,
    onView: PropTypes.func,
};

export default DepartmentTable;