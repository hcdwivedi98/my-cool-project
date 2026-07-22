import { useState } from "react";

function useDepartmentFilter() {
    const [filters, setFilters] = useState({
        search: "",
        centerId: null,
        departmentType: null,
        isActive: null,
    });

    const handleFilterChange = (
        field,
        value
    ) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: "",
            centerId: null,
            departmentType: null,
            isActive: null,
        });
    };

    return {
        filters,
        handleFilterChange,
        resetFilters,
    };
}

export default useDepartmentFilter;