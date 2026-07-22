import React from "react";

import AppCard from "../cards/AppCard";
import AppTable from "../table/AppTable";

function AppMasterGrid({

    columns,

    dataSource,

    loading = false,

    rowKey = "id",

    pagination = true,

    rowSelection,

    scroll = {
        x: 1400,
    },

    emptyText = "No Records Found",

    children,

    ...rest

}) {

    if (children) {

        return (

            <AppCard>

                {children}

            </AppCard>

        );

    }

    return (

        <AppCard>

            <AppTable

                columns={columns}

                dataSource={dataSource}

                loading={loading}

                rowKey={rowKey}

                pagination={pagination}

                rowSelection={rowSelection}

                scroll={scroll}

                emptyText={emptyText}

                {...rest}

            />

        </AppCard>

    );

}

export default AppMasterGrid;