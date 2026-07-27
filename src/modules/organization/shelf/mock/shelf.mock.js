export const shelfList = [
    {
        id: 1,

        centerId: 1,
        centerName: "Lucknow Main",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 1,
        storeName: "Central Medical Store",

        subStoreId: 1,
        subStoreName: "OPD Pharmacy",

        rackId: 1,
        rackCode: "RCK-001",
        rackName: "General Medicine Rack",

        shelfCode: "SH-001",
        shelfName: "Shelf A",

        shelfType: "NORMAL",

        storageCondition: "AMBIENT",

        orientation: "HORIZONTAL",

        maxBins: 20,
        maxWeight: 300,
        maxVolume: 120,

        inventoryMethod: "FEFO",

        barcodeRequired: true,
        batchRequired: true,
        expiryRequired: true,

        occupancyStatus: "PARTIAL",
        occupancyPercentage: 45,

        status: "Active",

        createdBy: "Administrator",
        createdOn: "01-Jul-2026",

        modifiedBy: "Administrator",
        modifiedOn: "15-Jul-2026",
    },
    {
        id: 2,

        centerId: 1,
        centerName: "Lucknow Main",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 1,
        storeName: "Central Medical Store",

        subStoreId: 1,
        subStoreName: "OPD Pharmacy",

        rackId: 2,
        rackCode: "RCK-002",
        rackName: "Cold Storage Rack",

        shelfCode: "SH-002",
        shelfName: "Cold Shelf",

        shelfType: "COLD_STORAGE",

        storageCondition: "REFRIGERATED",

        orientation: "HORIZONTAL",

        maxBins: 12,
        maxWeight: 150,
        maxVolume: 60,

        inventoryMethod: "FEFO",

        barcodeRequired: true,
        batchRequired: true,
        expiryRequired: true,

        occupancyStatus: "AVAILABLE",
        occupancyPercentage: 10,

        status: "Active",

        createdBy: "Administrator",
        createdOn: "03-Jul-2026",

        modifiedBy: "Administrator",
        modifiedOn: "18-Jul-2026",
    },
    {
        id: 3,

        centerId: 1,
        centerName: "Lucknow Main",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 2,
        storeName: "Emergency Pharmacy",

        subStoreId: 3,
        subStoreName: "Emergency Counter",

        rackId: 5,
        rackCode: "RCK-005",
        rackName: "Controlled Drug Rack",

        shelfCode: "SH-003",
        shelfName: "Controlled Shelf",

        shelfType: "CONTROLLED_DRUG",

        storageCondition: "AMBIENT",

        orientation: "VERTICAL",

        maxBins: 10,
        maxWeight: 100,
        maxVolume: 40,

        inventoryMethod: "FIFO",

        barcodeRequired: true,
        batchRequired: true,
        expiryRequired: true,

        occupancyStatus: "FULL",
        occupancyPercentage: 100,

        status: "Inactive",

        createdBy: "Store Manager",
        createdOn: "10-Jul-2026",

        modifiedBy: "Administrator",
        modifiedOn: "20-Jul-2026",
    },
];
export const shelfStatistics = [
    {
        title: "Total Shelves",
        value: 125,
        color: "blue",
        label: "All",
    },
    {
        title: "Active",
        value: 110,
        color: "green",
        label: "Available",
    },
    {
        title: "Inactive",
        value: 15,
        color: "red",
        label: "Disabled",
    },
    {
        title: "Occupied",
        value: 84,
        color: "orange",
        label: "67%",
    },
];