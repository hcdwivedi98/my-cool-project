import { useState } from "react";

export default function useTable({

    initialSearch = "",

    initialPagination = {

        current: 1,

        pageSize: 10,

        total: 0,

    },

}) {

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(initialSearch);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [pagination, setPagination] =

        useState(initialPagination);

    function handleRefresh(loadData) {

        loadData?.();

    }

    function handleSearch(value, loadData) {

        setSearch(value);

        loadData?.(value);

    }

    function handlePageChange(current, pageSize) {

        setPagination(prev => ({

            ...prev,

            current,

            pageSize,

        }));

    }

    const rowSelection = {

        selectedRowKeys,

        onChange: setSelectedRowKeys,

    };

    return {

        loading,

        setLoading,

        search,

        setSearch,

        pagination,

        setPagination,

        selectedRowKeys,

        rowSelection,

        handleRefresh,

        handleSearch,

        handlePageChange,

    };

}