
export const SHELF_STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};

export const SHELF_TYPES = [
    {
        label: "Normal Shelf",
        value: "NORMAL",
    },
    {
        label: "Cold Storage Shelf",
        value: "COLD_STORAGE",
    },
    {
        label: "Narcotic Shelf",
        value: "NARCOTIC",
    },
    {
        label: "High Value Shelf",
        value: "HIGH_VALUE",
    },
    {
        label: "Controlled Drug Shelf",
        value: "CONTROLLED_DRUG",
    },
    {
        label: "Quarantine Shelf",
        value: "QUARANTINE",
    },
    {
        label: "Expiry Shelf",
        value: "EXPIRY",
    },
    {
        label: "Damaged Shelf",
        value: "DAMAGED",
    },
];

export const STORAGE_CONDITIONS = [
    {
        label: "Ambient",
        value: "AMBIENT",
    },
    {
        label: "Refrigerated (2°C - 8°C)",
        value: "REFRIGERATED",
    },
    {
        label: "Frozen (-20°C)",
        value: "FROZEN",
    },
    {
        label: "Controlled Room Temperature",
        value: "CRT",
    },
];

export const SHELF_ORIENTATION = [
    {
        label: "Horizontal",
        value: "HORIZONTAL",
    },
    {
        label: "Vertical",
        value: "VERTICAL",
    },
];

export const OCCUPANCY_STATUS = [
    {
        label: "Available",
        value: "AVAILABLE",
    },
    {
        label: "Partially Occupied",
        value: "PARTIAL",
    },
    {
        label: "Full",
        value: "FULL",
    },
];

export const DEFAULT_SHELF_VALUES = {
    centerId: null,
    departmentId: null,
    storeId: null,
    subStoreId: null,
    rackId: null,

    shelfCode: "",
    shelfName: "",
    description: "",

    shelfType: "NORMAL",
    storageCondition: "AMBIENT",
    orientation: "HORIZONTAL",

    maxBins: 20,
    maxWeight: null,
    maxVolume: null,

    inventoryMethod: "FEFO",

    barcodeRequired: false,
    batchRequired: true,
    expiryRequired: true,

    approvalRequired: false,
    approverId: null,

    status: SHELF_STATUS.ACTIVE,

    remarks: "",
};