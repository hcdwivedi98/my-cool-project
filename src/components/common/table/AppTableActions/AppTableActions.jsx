import React from "react";
import PropTypes from "prop-types";
import { Space } from "antd";

import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
} from "@ant-design/icons";

import AppActionButton from "./AppActionButton";

function AppTableActions({
    onView,
    onEdit,
    onDelete,
    onCopy,

    showView = true,
    showEdit = true,
    showDelete = true,
    showCopy = false,
}) {
    return (
        <Space size={2}>
            {showView && (
                <AppActionButton
                    title="View"
                    icon={<EyeOutlined />}
                    onClick={onView}
                />
            )}

            {showEdit && (
                <AppActionButton
                    title="Edit"
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={onEdit}
                />
            )}

            {showCopy && (
                <AppActionButton
                    title="Copy"
                    icon={<CopyOutlined />}
                    onClick={onCopy}
                />
            )}

            {showDelete && (
                <AppActionButton
                    title="Delete"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={onDelete}
                />
            )}
        </Space>
    );
}

AppTableActions.propTypes = {
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCopy: PropTypes.func,

    showView: PropTypes.bool,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    showCopy: PropTypes.bool,
};

export default React.memo(AppTableActions);