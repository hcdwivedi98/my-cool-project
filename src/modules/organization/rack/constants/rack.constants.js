export const DRAWER_MODE = {
    ADD: "ADD",
    EDIT: "EDIT",
    VIEW: "VIEW"
};

export const RACK_STATUS = {
    ACTIVE: true,
    INACTIVE: false
};

export const RACK_TYPES = [
    {
        label: "Standard Rack",
        value: "STANDARD"
    },
    {
        label: "Cold Storage Rack",
        value: "COLD_STORAGE"
    },
    {
        label: "Narcotic Rack",
        value: "NARCOTIC"
    },
    {
        label: "High Value Rack",
        value: "HIGH_VALUE"
    },
    {
        label: "LASA Rack",
        value: "LASA"
    },
    {
        label: "Quarantine Rack",
        value: "QUARANTINE"
    },
    {
        label: "Damaged Stock Rack",
        value: "DAMAGED"
    }
];

export const RACK_TABS = [
    {
        key: "basic",
        label: "Basic"
    },
    {
        key: "location",
        label: "Location"
    },
    {
        key: "capacity",
        label: "Capacity"
    },
    {
        key: "inventory",
        label: "Inventory Rules"
    },
    {
        key: "approval",
        label: "Approval"
    },
    {
        key: "documents",
        label: "Documents"
    },
    {
        key: "audit",
        label: "Audit"
    }
];

export const RACK_FORM_TABS = {

    centerId: "basic",
    departmentId: "basic",
    storeId: "basic",
    subStoreId: "basic",
    rackCode: "basic",
    rackName: "basic",
    shortName: "basic",
    rackType: "basic",
    status: "basic",

    buildingId: "location",
    floorId: "location",
    roomId: "location",
    zone: "location",
    aisle: "location",

    maximumShelves: "capacity",
    maximumWeight: "capacity",
    maximumVolume: "capacity",

    coldStorage: "inventory",
    narcoticRack: "inventory",
    lasaRack: "inventory",
    quarantineRack: "inventory",
    damagedRack: "inventory",

    approvalRequired: "approval",
    approver: "approval",
    approvalLevel: "approval"
};