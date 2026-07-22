import React from "react";
import PropTypes from "prop-types";
import { Table, Empty } from "antd";

function AppTable({
    columns = [],
    dataSource = [],
    loading = false,
    rowKey = "id",

    pagination = false,
    bordered = true,
    size = "small",

    sticky = true,

    scroll,

    rowSelection,

    expandable,

    onChange,

    locale,

    ...rest
}) {
    return (
        <Table
            {...rest}
            bordered={bordered}
            size={size}
            sticky={sticky}
            rowKey={rowKey}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            rowSelection={rowSelection}
            expandable={expandable}
            scroll={scroll}
            onChange={onChange}
            locale={{
                emptyText: <Empty description="No Data Found" />,
                ...locale,
            }}
        />
    );
}

AppTable.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    loading: PropTypes.bool,
    rowKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    pagination: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    bordered: PropTypes.bool,
    size: PropTypes.oneOf([
        "small",
        "middle",
        "large",
    ]),
    sticky: PropTypes.bool,
    scroll: PropTypes.object,
    rowSelection: PropTypes.object,
    expandable: PropTypes.object,
    onChange: PropTypes.func,
    locale: PropTypes.object,
};

export default React.memo(AppTable);