const rackMock = [

    {
        id: 1,

        centerId: 1,
        departmentId: 1,
        storeId: 1,
        subStoreId: 1,

        rackCode: "RACK001",
        rackName: "General Medicine Rack",

        shortName: "GMR",

        rackType: "STANDARD",

        buildingId: 1,
        floorId: 1,
        roomId: 1,

        zone: "Zone A",
        aisle: "Aisle 01",

        maximumShelves: 10,
        maximumWeight: 500,
        maximumVolume: 120,

        coldStorage: false,
        narcoticRack: false,
        lasaRack: false,
        quarantineRack: false,
        damagedRack: false,

        approvalRequired: false,
        approver: "",
        approvalLevel: "",

        status: true,

        createdBy: "System",
        createdOn: "01-Jul-2026",

        modifiedBy: "System",
        modifiedOn: "01-Jul-2026"
    },

    {
        id: 2,

        centerId: 1,
        departmentId: 1,
        storeId: 1,
        subStoreId: 1,

        rackCode: "RACK002",
        rackName: "Cold Storage Rack",

        shortName: "CSR",

        rackType: "COLD_STORAGE",

        buildingId: 1,
        floorId: 1,
        roomId: 2,

        zone: "Zone B",
        aisle: "Aisle 02",

        maximumShelves: 8,
        maximumWeight: 300,
        maximumVolume: 80,

        coldStorage: true,
        narcoticRack: false,
        lasaRack: false,
        quarantineRack: false,
        damagedRack: false,

        approvalRequired: true,
        approver: "Store Manager",
        approvalLevel: "Level 1",

        status: true,

        createdBy: "Admin",
        createdOn: "05-Jul-2026",

        modifiedBy: "Admin",
        modifiedOn: "10-Jul-2026"
    }

];

export default rackMock;