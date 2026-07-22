import React, { memo, useCallback } from "react";

import {
    AppPage,
} from "../../../components/common/layout";

import SupplierToolbar from "../components/SupplierToolbar";
import SupplierFilter from "../components/SupplierFilter";
import SupplierGrid from "../components/SupplierGrid";
import SupplierDrawer from "../components/SupplierDrawer";

import useSupplierMaster from "../hooks/useSupplierMaster";

function SupplierMaster() {

    //--------------------------------------------------
    // Hook
    //--------------------------------------------------

    const {

        loading,

        saving,

        suppliers,

        total,

        filters,

        pagination,

        lookups,

        drawerOpen,

        currentSupplier,

        selectedRowKeys,

        setFilters,

        setPagination,

        setSelectedRowKeys,

        loadData,

        openCreateDrawer,

        openEditDrawer,

        closeDrawer,

        saveSupplier,

        deleteSupplier,

        activateSupplier,

        deactivateSupplier,

        cloneSupplier,

        importSupplier,

        exportExcel,

        exportPdf,

        bulkDelete,

        bulkActivate,

        bulkDeactivate,

    } = useSupplierMaster();

    //--------------------------------------------------
    // Grid Change
    //--------------------------------------------------

    const handleTableChange = useCallback(

        (tablePagination, tableFilters, sorter) => {

            setPagination({

                current: tablePagination.current,

                pageSize: tablePagination.pageSize,

                sorter,

            });

        },

        [setPagination]

    );

    //--------------------------------------------------
    // Filter Reset
    //--------------------------------------------------

    const handleReset = () => {

        setFilters({

            search: "",

            supplierType: null,

            cityId: null,

            stateId: null,

            paymentType: null,

            isActive: true,

        });

    };

    //--------------------------------------------------

    return (

        <AppPage title="Supplier Master">

            <SupplierToolbar

                loading={loading}

                selectedRowKeys={selectedRowKeys}

                onAdd={openCreateDrawer}

                onImport={importSupplier}

                onExportExcel={exportExcel}

                onExportPdf={exportPdf}

                onRefresh={loadData}

                onBulkActivate={bulkActivate}

                onBulkDeactivate={bulkDeactivate}

                onBulkDelete={bulkDelete}

            />

            <SupplierFilter

                loading={loading}

                filters={filters}

                lookups={lookups}

                onChange={setFilters}

                onSearch={loadData}

                onReset={handleReset}

            />

            <SupplierGrid

                loading={loading}

                dataSource={suppliers}

                pagination={{

                    ...pagination,

                    total,

                }}

                selectedRowKeys={selectedRowKeys}

                onSelectionChange={setSelectedRowKeys}

                onChange={handleTableChange}

                onView={openEditDrawer}

                onEdit={openEditDrawer}

                onDelete={deleteSupplier}

                onClone={cloneSupplier}

                onActivate={activateSupplier}

                onDeactivate={deactivateSupplier}

            />

            <SupplierDrawer

                open={drawerOpen}

                loading={saving}

                supplier={currentSupplier}

                lookups={lookups}

                onClose={closeDrawer}

                onSave={saveSupplier}

            />

        </AppPage>

    );

}

export default memo(SupplierMaster);