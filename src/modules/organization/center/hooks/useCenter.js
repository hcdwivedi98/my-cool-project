import { useCallback, useEffect, useMemo, useState } from "react";

import {
    defaultCenter,
    defaultCenterFilters,
    defaultPagination,
    DrawerMode,
    emptyCenter,
} from "../models/centerModel";

import {
    activateCenter,
    cloneExistingCenter,
    createCenter,
    deactivateCenter,
    deleteCenter,
    getCenterById,
    getCenters,
    getLookups,
    updateCenter,
} from "../services/centerService";

export default function useCenter() {

    /* ==============================
       State
    ============================== */

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [data, setData] = useState([]);

    const [filters, setFilters] = useState(defaultCenterFilters);

    const [pagination, setPagination] = useState(defaultPagination);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerMode, setDrawerMode] = useState(DrawerMode.CREATE);

    const [selectedCenter, setSelectedCenter] = useState(defaultCenter);

    const [lookups, setLookups] = useState({});

    /* ==============================
       Load List
    ============================== */

    const loadCenters = useCallback(async () => {

        setLoading(true);

        try {

            const response = await getCenters(filters, pagination);

            setData(response.items);

            setPagination((prev) => ({
                ...prev,
                totalRecords: response.totalRecords,
            }));

        } finally {

            setLoading(false);

        }

    }, [filters, pagination.pageNumber, pagination.pageSize]);

    /* ==============================
       Load Lookups
    ============================== */

    const loadLookups = useCallback(async () => {

        const response = await getLookups();

        setLookups(response);

    }, []);

    useEffect(() => {

        loadLookups();

    }, [loadLookups]);

    useEffect(() => {

        loadCenters();

    }, [loadCenters]);

    /* ==============================
       Drawer
    ============================== */

    const openCreate = () => {

        setDrawerMode(DrawerMode.CREATE);

        setSelectedCenter(emptyCenter());

        setDrawerOpen(true);

    };

    const openView = async (id) => {

        setLoading(true);

        try {

            const data = await getCenterById(id);

            setSelectedCenter(data);

            setDrawerMode(DrawerMode.VIEW);

            setDrawerOpen(true);

        } finally {

            setLoading(false);

        }

    };

    const openEdit = async (id) => {

        setLoading(true);

        try {

            const data = await getCenterById(id);

            setSelectedCenter(data);

            setDrawerMode(DrawerMode.EDIT);

            setDrawerOpen(true);

        } finally {

            setLoading(false);

        }

    };

    const closeDrawer = () => {

        setDrawerOpen(false);

    };

    /* ==============================
       Save
    ============================== */

    const saveCenter = async (values) => {

        setSaving(true);

        try {

            if (drawerMode === DrawerMode.CREATE) {

                await createCenter(values);

            } else {

                await updateCenter(values);

            }

            closeDrawer();

            await loadCenters();

        } finally {

            setSaving(false);

        }

    };

    /* ==============================
       Delete
    ============================== */

    const removeCenter = async (id) => {

        await deleteCenter(id);

        await loadCenters();

    };

    /* ==============================
       Activate
    ============================== */

    const activate = async (id) => {

        await activateCenter(id);

        await loadCenters();

    };

    const deactivate = async (id) => {

        await deactivateCenter(id);

        await loadCenters();

    };

    /* ==============================
       Clone
    ============================== */

    const clone = async (id) => {

        const center = await cloneExistingCenter(id);

        setSelectedCenter(center);

        setDrawerMode(DrawerMode.CREATE);

        setDrawerOpen(true);

    };

    /* ==============================
       Filters
    ============================== */

    const search = (values) => {

        setFilters((prev) => ({
            ...prev,
            ...values,
        }));

    };

    const resetFilters = () => {

        setFilters(defaultCenterFilters);

    };

    /* ==============================
       Pagination
    ============================== */

    const changePage = (pageNumber, pageSize) => {

        setPagination((prev) => ({
            ...prev,
            pageNumber,
            pageSize,
        }));

    };

    /* ==============================
       Public API
    ============================== */

    return useMemo(() => ({

        loading,
        saving,

        data,

        filters,

        pagination,

        drawerOpen,
        drawerMode,

        selectedCenter,

        lookups,

        openCreate,
        openView,
        openEdit,

        closeDrawer,

        saveCenter,

        removeCenter,

        activate,
        deactivate,

        clone,

        search,
        resetFilters,

        changePage,

        refresh: loadCenters

    }), [

        loading,
        saving,

        data,

        filters,

        pagination,

        drawerOpen,
        drawerMode,

        selectedCenter,

        lookups,

        loadCenters

    ]);

}