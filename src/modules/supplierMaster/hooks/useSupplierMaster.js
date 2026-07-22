import { useCallback, useEffect, useState } from "react";

import supplierService from "../services/supplierService";

import { DEFAULT_SUPPLIER } from "../constants/supplier.constants";

function useSupplierMaster() {

    //--------------------------------------------------
    // State
    //--------------------------------------------------

    const [loading, setLoading] = useState(false);

    const [saving, setSaving] = useState(false);

    const [suppliers, setSuppliers] = useState([]);

    const [total, setTotal] = useState(0);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [currentSupplier, setCurrentSupplier] = useState(null);

    const [lookups, setLookups] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [filters, setFilters] = useState({

        search: "",

        supplierType: null,

        cityId: null,

        stateId: null,

        paymentType: null,

        isActive: true,

    });

    const [pagination, setPagination] = useState({

        current: 1,

        pageSize: 20,

    });

    //--------------------------------------------------
    // Load Grid
    //--------------------------------------------------

    const loadData = useCallback(async () => {

        try {

            setLoading(true);

            const response = await supplierService.getPaged({

                ...filters,

                pageNumber: pagination.current,

                pageSize: pagination.pageSize,

            });

            setSuppliers(response.items || []);

            setTotal(response.totalCount || 0);

        }

        finally {

            setLoading(false);

        }

    }, [

        filters,

        pagination,

    ]);

    //--------------------------------------------------
    // Lookup
    //--------------------------------------------------

    const loadLookups = useCallback(async () => {

        const data = await supplierService.getLookup();

        setLookups(data || {});

    }, []);

    //--------------------------------------------------
    // Drawer
    //--------------------------------------------------

    const openCreateDrawer = () => {

        setCurrentSupplier(DEFAULT_SUPPLIER);

        setDrawerOpen(true);

    };

    const openEditDrawer = async (record) => {

        const supplier =

            await supplierService.getById(record.id);

        setCurrentSupplier(supplier);

        setDrawerOpen(true);

    };

    const closeDrawer = () => {

        setDrawerOpen(false);

        setCurrentSupplier(null);

    };

    //--------------------------------------------------
    // Save
    //--------------------------------------------------

    const saveSupplier = async (values) => {

        try {

            setSaving(true);

            await supplierService.save(values);

            closeDrawer();

            await loadData();

        }

        finally {

            setSaving(false);

        }

    };

    //--------------------------------------------------
    // Delete
    //--------------------------------------------------

    const deleteSupplier = async (record) => {

        await supplierService.delete(record.id);

        loadData();

    };

    //--------------------------------------------------
    // Activate
    //--------------------------------------------------

    const activateSupplier = async (record) => {

        await supplierService.activate(record.id);

        loadData();

    };

    //--------------------------------------------------
    // Deactivate
    //--------------------------------------------------

    const deactivateSupplier = async (record) => {

        await supplierService.deactivate(record.id);

        loadData();

    };

    //--------------------------------------------------
    // Clone
    //--------------------------------------------------

    const cloneSupplier = async (record) => {

        await supplierService.clone(record.id);

        loadData();

    };

    //--------------------------------------------------
    // Import / Export
    //--------------------------------------------------

    const importSupplier = () => {

        console.log("Import Supplier");

    };

    const exportExcel = () => {

        console.log("Export Excel");

    };

    const exportPdf = () => {

        console.log("Export PDF");

    };

    //--------------------------------------------------
    // Bulk Actions
    //--------------------------------------------------

    const bulkDelete = () => {

        console.log(selectedRowKeys);

    };

    const bulkActivate = () => {

        console.log(selectedRowKeys);

    };

    const bulkDeactivate = () => {

        console.log(selectedRowKeys);

    };

    //--------------------------------------------------

    useEffect(() => {

        loadLookups();

    }, [

        loadLookups,

    ]);

    useEffect(() => {

        loadData();

    }, [

        loadData,

    ]);

    //--------------------------------------------------

    return {

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

    };

}

export default useSupplierMaster;