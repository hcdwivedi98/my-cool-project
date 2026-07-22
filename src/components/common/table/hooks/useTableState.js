import { useState } from "react";

export default function useTableState() {

    const [loading, setLoading] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [pagination, setPagination] =
        useState({
            current: 1,
            pageSize: 20,
            total: 0,
        });

    const [sorter, setSorter] =
        useState({});

    const [filters, setFilters] =
        useState({});

    const handleTableChange = (
        pager,
        tableFilters,
        tableSorter
    ) => {

        setPagination(pager);

        setFilters(tableFilters);

        setSorter(tableSorter);
    };

    return {

        loading,
        setLoading,

        search,
        setSearch,

        pagination,
        setPagination,

        sorter,
        filters,

        handleTableChange,

    };
}