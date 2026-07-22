import React, { useMemo } from "react";

import {
    Empty,
} from "antd";

import ColumnItem from "./ColumnItem";

function ColumnList({

    columns = [],

    visibleColumns = [],

    keyword = "",

    onToggle,

}) {

    const filteredColumns = useMemo(() => {

        if (!keyword) {

            return columns;

        }

        const search = keyword.toLowerCase();

        return columns.filter(column =>

            String(column.title)

                .toLowerCase()

                .includes(search)

        );

    }, [

        columns,

        keyword,

    ]);

    if (filteredColumns.length === 0) {

        return (

            <Empty

                description="No Columns Found"

            />

        );

    }

    return (

        <div>

            {

                filteredColumns.map(column => (

                    <ColumnItem

                        key={column.key}

                        column={column}

                        checked={

                            visibleColumns.includes(

                                column.key

                            )

                        }

                        onChange={onToggle}

                    />

                ))

            }

        </div>

    );

}

export default React.memo(ColumnList);