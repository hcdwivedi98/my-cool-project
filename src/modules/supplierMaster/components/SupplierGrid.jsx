import React, { memo, useMemo } from "react";

import {
    AppTable,
} from "../../../components/common/table";

import {
    getSupplierColumns,
} from "./columns";

function SupplierGrid({

    loading = false,

    dataSource = [],

    pagination,

    selectedRowKeys = [],

    onSelectionChange,

    onChange,

    onView,

    onEdit,

    onDelete,

    onClone,

    onActivate,

    onDeactivate,

}) {

    //--------------------------------------------------
    // Columns
    //--------------------------------------------------

    const columns = useMemo(

        () =>

            getSupplierColumns({

                onView,

                onEdit,

                onDelete,

                onClone,

                onActivate,

                onDeactivate,

            }),

        [

            onView,

            onEdit,

            onDelete,

            onClone,

            onActivate,

            onDeactivate,

        ]

    );

    //--------------------------------------------------
    // Row Selection
    //--------------------------------------------------

    const rowSelection = {

        selectedRowKeys,

        preserveSelectedRowKeys: true,

        onChange: onSelectionChange,

    };

    //--------------------------------------------------

    return (

        <AppTable

            loading={loading}

            columns={columns}

            dataSource={dataSource}

            rowKey="id"

            pagination={pagination}

            rowSelection={rowSelection}

            bordered

            sticky

            size="small"

            scroll={{

                x: "max-content",

                y: "calc(100vh - 320px)",

            }}

            onChange={onChange}

        />

    );

}

export default memo(SupplierGrid);