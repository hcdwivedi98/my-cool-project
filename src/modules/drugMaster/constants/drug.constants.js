// src/modules/drugMaster/constants/drug.constants.js

export const DRUG_STATUS = {
    ACTIVE: true,
    INACTIVE: false,
};

export const DRUG_TYPE = {
    MEDICINE: "MEDICINE",
    CONSUMABLE: "CONSUMABLE",
    SURGICAL: "SURGICAL",
    IMPLANT: "IMPLANT",
    VACCINE: "VACCINE",
};

export const INVENTORY_METHOD = {
    FIFO: "FIFO",
    FEFO: "FEFO",
    LIFO: "LIFO",
};

export const DEFAULT_DRUG = {

    id: 0,

    itemCode: "",

    itemName: "",

    shortName: "",

    genericName: "",

    categoryId: null,

    manufacturerId: null,

    companyId: null,

    dosageFormId: null,

    routeId: null,

    scheduleTypeId: null,

    strength: "",

    hsnCode: "",

    barcode: "",

    qrCode: "",

    image: null,

    purchaseUomId: null,

    issueUomId: null,

    saleUomId: null,

    packTypeId: null,

    packSize: 1,

    boxesPerCarton: 1,

    stripsPerBox: 1,

    tabletsPerStrip: 1,

    conversionFactor: 1,

    allowLoosePurchase: false,

    allowLooseSale: true,

    allowLooseIssue: true,

    minimumStock: 0,

    maximumStock: 0,

    reorderLevel: 0,

    reorderQuantity: 0,

    criticalLevel: 0,

    safetyStock: 0,

    shelfLife: 0,

    expiryAlertDays: 90,

    batchRequired: true,

    expiryRequired: true,

    serialRequired: false,

    temperatureSensitive: false,

    coldStorage: false,

    highRisk: false,

    narcotic: false,

    lasaDrug: false,

    prescriptionRequired: true,

    storageLocation: "",

    inventoryMethod: INVENTORY_METHOD.FEFO,

    purchasePrice: 0,

    landingCost: 0,

    costPrice: 0,

    ptr: 0,

    pts: 0,

    mrp: 0,

    salePrice: 0,

    gstId: null,

    gstRate: 0,

    gstAmount: 0,

    marginPercentage: 0,

    discountPercentage: 0,

    taxInclusive: false,

    allowPriceOverride: false,

    freezeSellingPrice: false,

    maintainPriceHistory: true,

    isActive: true,

};