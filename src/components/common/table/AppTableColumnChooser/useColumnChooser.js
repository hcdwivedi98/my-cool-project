import {
    useEffect,
    useMemo,
    useState,
} from "react";

import ColumnChooserService from "../../../../core/services/ColumnChooserService";

export default function useColumnChooser({

    moduleName,

    columns = [],

}) {

    const defaultColumns = useMemo(

        () => columns.map(column => column.key),

        [columns]

    );

    const [

        visibleColumns,

        setVisibleColumns,

    ] = useState(defaultColumns);

    const [

        search,

        setSearch,

    ] = useState("");

    useEffect(() => {

        const savedColumns =

            ColumnChooserService.load(

                moduleName,

                defaultColumns

            );

        setVisibleColumns(savedColumns);

    }, [

        moduleName,

        defaultColumns,

    ]);

    function toggleColumn(key) {

        setVisibleColumns(previous =>

            previous.includes(key)

                ? previous.filter(

                      columnKey => columnKey !== key

                  )

                : [

                      ...previous,

                      key,

                  ]

        );

    }

    function apply() {

        ColumnChooserService.save(

            moduleName,

            visibleColumns

        );

    }

    function reset() {

        setVisibleColumns(defaultColumns);

        ColumnChooserService.reset(moduleName);

    }

    function selectAll() {

        setVisibleColumns(defaultColumns);

    }

    function clearAll() {

        setVisibleColumns([]);

    }

    return {

        search,

        setSearch,

        visibleColumns,

        toggleColumn,

        apply,

        reset,

        selectAll,

        clearAll,

    };

}