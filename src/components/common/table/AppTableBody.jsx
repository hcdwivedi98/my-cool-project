import React, { memo } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

function AppTableBody({

    columns,

    dataSource,

    loading = false,

    rowKey = "id",

    rowSelection,

    expandable,

    pagination = false,

    size = "small",

    bordered = true,

    sticky = true,

    scroll = {

        x: "max-content",

        y: "calc(100vh - 320px)",

    },

    locale,

    onChange,

    onRow,

    summary,

    footer,

    rowClassName,

    ...restProps

}) {

    return (

        <Table

            columns={columns}

            dataSource={dataSource}

            loading={loading}

            rowKey={rowKey}

            rowSelection={rowSelection}

            expandable={expandable}

            pagination={pagination}

            bordered={bordered}

            size={size}

            sticky={sticky}

            scroll={scroll}

            locale={locale}

            onChange={onChange}

            onRow={onRow}

            summary={summary}

            footer={footer}

            rowClassName={rowClassName}

            {...restProps}

        />

    );

}

AppTableBody.propTypes = {

    columns: PropTypes.array.isRequired,

    dataSource: PropTypes.array,

    loading: PropTypes.bool,

    rowKey: PropTypes.oneOfType([

        PropTypes.string,

        PropTypes.func,

    ]),

    rowSelection: PropTypes.object,

    expandable: PropTypes.object,

    pagination: PropTypes.oneOfType([

        PropTypes.bool,

        PropTypes.object,

    ]),

    size: PropTypes.oneOf([

        "small",

        "middle",

        "large",

    ]),

    bordered: PropTypes.bool,

    sticky: PropTypes.bool,

    scroll: PropTypes.object,

    locale: PropTypes.object,

    onChange: PropTypes.func,

    onRow: PropTypes.func,

    summary: PropTypes.func,

    footer: PropTypes.func,

    rowClassName: PropTypes.oneOfType([

        PropTypes.string,

        PropTypes.func,

    ]),

};

export default memo(AppTableBody);