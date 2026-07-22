import React, { memo, useMemo } from "react";

import { AppTable } from "../../../components/common/table";

import { getDrugColumns } from "./columns";

function DrugGrid({

    loading,

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

    //------------------------------------------------------
    // Columns
    //------------------------------------------------------

    const columns = useMemo(

        () =>

            getDrugColumns({

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

    //------------------------------------------------------
    // Row Selection
    //------------------------------------------------------

    const rowSelection = {

        selectedRowKeys,

        preserveSelectedRowKeys: true,

        onChange: onSelectionChange,

    };

    //------------------------------------------------------

    return (

        <AppTable

            loading={loading}

            columns={columns}

            dataSource={dataSource}

            rowKey="id"

            bordered

            sticky

            size="small"

            pagination={pagination}

            rowSelection={rowSelection}

            scroll={{

                x: "max-content",

                y: "calc(100vh - 300px)",

            }}

            onChange={onChange}

        />

    );

}

export default memo(DrugGrid);