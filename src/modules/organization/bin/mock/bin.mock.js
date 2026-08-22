export const binList = [
    {
        id: 1,

        centerId: 1,
        centerName: "Main Hospital",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 1,
        storeName: "Main Pharmacy Store",

        subStoreId: 1,
        subStoreName: "Main Pharmacy Sub Store",

        rackId: 1,
        rackName: "Rack A",

        shelfId: 1,
        shelfName: "Shelf A-01",

        binCode: "BIN-A01-001",
        binName: "Bin A01-001",

        binType: "STANDARD",

        storageCondition: "AMBIENT",
        orientation: "FRONT",

        zone: "Zone A",
        aisleNo: "A-01",

        maxQuantity: 100,
        maxWeight: 50,
        maxVolume: 100,

        currentQuantity: 65,
        availableQuantity: 35,
        occupancyPercentage: 65,

        approvalRequired: false,
        approverId: null,
        approvalLevel: null,

        status: "Active",

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-10",

        documents: [],
    },

    {
        id: 2,

        centerId: 1,
        centerName: "Main Hospital",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 1,
        storeName: "Main Pharmacy Store",

        subStoreId: 2,
        subStoreName: "Emergency Pharmacy",

        rackId: 2,
        rackName: "Rack B",

        shelfId: 3,
        shelfName: "Shelf B-01",

        binCode: "BIN-B01-001",
        binName: "Bin B01-001",

        binType: "HIGH_VALUE",

        storageCondition: "COOL",
        orientation: "FRONT",

        zone: "Zone B",
        aisleNo: "B-01",

        maxQuantity: 50,
        maxWeight: 30,
        maxVolume: 60,

        currentQuantity: 20,
        availableQuantity: 30,
        occupancyPercentage: 40,

        approvalRequired: true,
        approverId: 1,
        approvalLevel: 1,

        status: "Active",

        createdBy: "Admin",
        createdOn: "2026-08-02",

        modifiedBy: "Store Manager",
        modifiedOn: "2026-08-12",

        documents: [],
    },

    {
        id: 3,

        centerId: 2,
        centerName: "Branch Hospital",

        departmentId: 2,
        departmentName: "Emergency",

        storeId: 2,
        storeName: "Emergency Store",

        subStoreId: 3,
        subStoreName: "Emergency Sub Store",

        rackId: 3,
        rackName: "Rack C",

        shelfId: 5,
        shelfName: "Shelf C-02",

        binCode: "BIN-C02-001",
        binName: "Bin C02-001",

        binType: "COLD_STORAGE",

        storageCondition: "COLD",
        orientation: "BACK",

        zone: "Cold Zone",
        aisleNo: "C-02",

        maxQuantity: 40,
        maxWeight: 25,
        maxVolume: 50,

        currentQuantity: 40,
        availableQuantity: 0,
        occupancyPercentage: 100,

        approvalRequired: false,
        approverId: null,
        approvalLevel: null,

        status: "Active",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-15",

        documents: [],
    },

    {
        id: 4,

        centerId: 1,
        centerName: "Main Hospital",

        departmentId: 1,
        departmentName: "Pharmacy",

        storeId: 1,
        storeName: "Main Pharmacy Store",

        subStoreId: 1,
        subStoreName: "Main Pharmacy Sub Store",

        rackId: 1,
        rackName: "Rack A",

        shelfId: 2,
        shelfName: "Shelf A-02",

        binCode: "BIN-A02-001",
        binName: "Bin A02-001",

        binType: "QUARANTINE",

        storageCondition: "AMBIENT",
        orientation: "LEFT",

        zone: "Quarantine Zone",
        aisleNo: "Q-01",

        maxQuantity: 30,
        maxWeight: 20,
        maxVolume: 30,

        currentQuantity: 5,
        availableQuantity: 25,
        occupancyPercentage: 17,

        approvalRequired: true,
        approverId: 2,
        approvalLevel: 2,

        status: "Inactive",

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Pharmacy Admin",
        modifiedOn: "2026-08-16",

        documents: [],
    },
];

export const binStatistics = {
    total: binList.length,

    active: binList.filter(
        (item) => item.status === "Active"
    ).length,

    inactive: binList.filter(
        (item) => item.status === "Inactive"
    ).length,

    full: binList.filter(
        (item) => item.occupancyPercentage >= 100
    ).length,
};