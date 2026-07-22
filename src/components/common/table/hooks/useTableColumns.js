import { useMemo } from "react";

export default function useTableColumns({

    columns = [],

    visibleColumns = [],

}) {

    return useMemo(() => {

        if (!visibleColumns.length) {

            return columns;

        }

        return columns.filter(col =>

            visibleColumns.includes(col.key)

        );

    }, [

        columns,

        visibleColumns,

    ]);

}