import { useState } from "react";

function useDepartmentTable() {
    const [pagination, setPagination] =
        useState({
            current: 1,
            pageSize: 10,
            total: 0,
        });

    const handleTableChange = (
        page,
        filters,
        sorter
    ) => {
        setPagination(page);

        // TODO:
        // API Call
    };

    return {
        pagination,
        handleTableChange,
    };
}

export default useDepartmentTable;