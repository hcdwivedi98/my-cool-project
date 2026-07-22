import { useMemo, useState } from "react";

import DepartmentHeader from "../components/DepartmentHeader";
import DepartmentFilterBar from "../components/DepartmentFilterBar";
import DepartmentTable from "../components/DepartmentTable";
import DepartmentDrawer from "../components/DepartmentDrawer";

import useDepartmentFilter from "../hooks/useDepartmentFilter";
import useDepartmentTable from "../hooks/useDepartmentTable";

import departmentMockData from "../data/department.mock";

const DepartmentPage = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [departments, setDepartments] = useState(departmentMockData);

    const {
        filters,
        filteredData,
        setSearchText,
        setStatus,
        resetFilters,
    } = useDepartmentFilter(departments);

    const {
        columns,
    } = useDepartmentTable({
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    function handleAdd() {
        setEditingDepartment(null);
        setDrawerOpen(true);
    }

    function handleEdit(record) {
        setEditingDepartment(record);
        setDrawerOpen(true);
    }

    function handleDelete(record) {
        setDepartments((prev) =>
            prev.filter((x) => x.id !== record.id)
        );
    }

    function handleSave(values) {
        if (editingDepartment) {
            setDepartments((prev) =>
                prev.map((item) =>
                    item.id === editingDepartment.id
                        ? {
                              ...item,
                              ...values,
                          }
                        : item
                )
            );
        } else {
            setDepartments((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    ...values,
                },
            ]);
        }

        setDrawerOpen(false);
        setEditingDepartment(null);
    }

    function handleClose() {
        setDrawerOpen(false);
        setEditingDepartment(null);
    }

    const tableData = useMemo(
        () => filteredData,
        [filteredData]
    );

    return (
        <>
            <DepartmentHeader
                onAdd={handleAdd}
            />

            <DepartmentFilterBar
                filters={filters}
                onSearch={setSearchText}
                onStatusChange={setStatus}
                onReset={resetFilters}
            />

            <DepartmentTable
                columns={columns}
                dataSource={tableData}
            />

            <DepartmentDrawer
                open={drawerOpen}
                initialValues={editingDepartment}
                onSave={handleSave}
                onClose={handleClose}
            />
        </>
    );
};

export default DepartmentPage;