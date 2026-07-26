import { useState } from "react";

import mockData from "../data/store.mock";
import { DRAWER_MODE } from "../constants/store.constants";

const useStoreMaster = () => {

    const [stores, setStores] = useState(mockData);

    const [selectedStore, setSelectedStore] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerMode, setDrawerMode] = useState(DRAWER_MODE.ADD);

    const [filters, setFilters] = useState({});

    const openAddDrawer = () => {
        setSelectedStore(null);
        setDrawerMode(DRAWER_MODE.ADD);
        setDrawerOpen(true);
    };

    const openEditDrawer = (record) => {

        setSelectedStore(record);

        setDrawerMode(DRAWER_MODE.EDIT);

        setDrawerOpen(true);

    };

    const openViewDrawer = (record) => {

        setSelectedStore(record);

        setDrawerMode(DRAWER_MODE.VIEW);

        setDrawerOpen(true);

    };

    const closeDrawer = () => {

        setDrawerOpen(false);

        setSelectedStore(null);

    };

    const saveStore = (values) => {

        if (drawerMode === DRAWER_MODE.ADD) {

            const newStore = {

                id: Date.now(),

                ...values

            };

            setStores(prev => [...prev, newStore]);

        } else {

            setStores(prev =>
                prev.map(item =>
                    item.id === selectedStore.id
                        ? {
                            ...item,
                            ...values
                        }
                        : item
                )
            );

        }

        closeDrawer();

    };

    const toggleStatus = (record) => {

        setStores(prev =>
            prev.map(item =>
                item.id === record.id
                    ? {
                        ...item,
                        status: !item.status
                    }
                    : item
            )
        );

    };

    const searchStores = () => {

        let result = [...mockData];

        if (filters.centerId) {
            result = result.filter(x => x.centerId === filters.centerId);
        }

        if (filters.departmentId) {
            result = result.filter(x => x.departmentId === filters.departmentId);
        }

        if (filters.storeCode) {
            result = result.filter(x =>
                x.storeCode.toLowerCase().includes(filters.storeCode.toLowerCase())
            );
        }

        if (filters.storeName) {
            result = result.filter(x =>
                x.storeName.toLowerCase().includes(filters.storeName.toLowerCase())
            );
        }

        if (filters.storeType) {
            result = result.filter(x => x.storeType === filters.storeType);
        }

        // Location Filters
        if (filters.buildingId) {
            result = result.filter(x => x.buildingId === filters.buildingId);
        }

        if (filters.floorId) {
            result = result.filter(x => x.floorId === filters.floorId);
        }

        if (filters.wingId) {
            result = result.filter(x => x.wingId === filters.wingId);
        }

        if (filters.roomId) {
            result = result.filter(x => x.roomId === filters.roomId);
        }

        if (filters.rackId) {
            result = result.filter(x => x.rackId === filters.rackId);
        }

        if (filters.shelfId) {
            result = result.filter(x => x.shelfId === filters.shelfId);
        }

        if (filters.binId) {
            result = result.filter(x => x.binId === filters.binId);
        }

        if (filters.status !== undefined) {
            result = result.filter(x => x.status === filters.status);
        }

        setStores(result);

    };

    const resetFilters = () => {

        setFilters({});

        setStores(mockData);

    };

    return {

        stores,

        filters,

        drawerOpen,

        drawerMode,

        selectedStore,

        openAddDrawer,

        openEditDrawer,

        openViewDrawer,

        closeDrawer,

        saveStore,

        toggleStatus,

        searchStores,

        resetFilters,

        setFilters

    };

};

export default useStoreMaster;