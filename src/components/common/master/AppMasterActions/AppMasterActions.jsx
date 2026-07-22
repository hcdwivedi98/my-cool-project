import React from "react";
import PropTypes from "prop-types";
import { Button, Space, Tooltip } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons";

function AppMasterActions({
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <Space size={4}>
            <Tooltip title="View">
                <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={onView}
                />
            </Tooltip>

            <Tooltip title="Edit">
                <Button
                    size="small"
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={onEdit}
                />
            </Tooltip>

            <Tooltip title="Delete">
                <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={onDelete}
                />
            </Tooltip>
        </Space>
    );
}

AppMasterActions.propTypes = {
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default React.memo(AppMasterActions);