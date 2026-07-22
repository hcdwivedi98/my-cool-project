import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

function AppMasterTable({
    columns,
    dataSource,
    rowKey = "id",
    loading,
    pagination = true,
    ...props
}) {
    return (
        <Table
            {...props}
            bordered
            sticky
            size="small"
            rowKey={rowKey}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
        />
    );
}

AppMasterTable.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    rowKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    loading: PropTypes.bool,
    pagination: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
};

export default React.memo(AppMasterTable);