import {
    useMemo,
    useState,
} from "react";

import {
    useTable,
    useTableColumns,
    useTablePagination,
} from "../components/common/table/hooks";

import useColumnChooser from "../components/common/table/columnChooser/useColumnChooser";

export default function useEnterpriseTable({

    moduleName,

    columns = [],

    initialSearch = "",

    initialPagination = {

        current: 1,

        pageSize: 10,

        total: 0,

    },

    serverSide = true,

}) {

    // ----------------------------------------
    // Base Table Hook
    // ----------------------------------------

    const table = useTable({

        initialSearch,

        initialPagination,

    });

    // ----------------------------------------
    // Column Chooser
    // ----------------------------------------

    const columnChooser =

        useColumnChooser({

            moduleName,

            columns,

        });

    // ----------------------------------------
    // Visible Columns
    // ----------------------------------------

    const finalColumns =

        useTableColumns({

            columns,

            visibleColumns:

                columnChooser.visibleColumns,

        });

    // ----------------------------------------
    // Pagination
    // ----------------------------------------

    const pagination =

        useTablePagination({

            pagination:

                table.pagination,

            serverSide,

        });

    // ----------------------------------------
    // Toolbar State
    // ----------------------------------------

    const [

        columnChooserOpen,

        setColumnChooserOpen,

    ] = useState(false);

    // ----------------------------------------
    // Toolbar Props
    // ----------------------------------------

    const toolbarProps = useMemo(

        () => ({

            search: table.search,

            onSearch: table.handleSearch,

            onSearchChange:

                table.setSearch,

            onRefresh:

                table.handleRefresh,

            onColumnChooser: () =>

                setColumnChooserOpen(

                    true

                ),

        }),

        [table]

    );

    // ----------------------------------------
    // Column Chooser Props
    // ----------------------------------------

    const columnChooserProps =

        useMemo(

            () => ({

                open:

                    columnChooserOpen,

                onClose: () =>

                    setColumnChooserOpen(

                        false

                    ),

                moduleName,

                columns,

            }),

            [

                columnChooserOpen,

                moduleName,

                columns,

            ]

        );

    return {

        //--------------------------------

        loading:

            table.loading,

        setLoading:

            table.setLoading,

        //--------------------------------

        search:

            table.search,

        setSearch:

            table.setSearch,

        //--------------------------------

        pagination,

        setPagination:

            table.setPagination,

        //--------------------------------

        rowSelection:

            table.rowSelection,

        //--------------------------------

        columns:

            finalColumns,

        //--------------------------------

        toolbarProps,

        //--------------------------------

        columnChooserProps,

        //--------------------------------

        table,

        //--------------------------------

        columnChooser,

    };

}