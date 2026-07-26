export const STORE_TYPES = [
    "Warehouse",
    "Pharmacy",
    "Sub Store",
    "Ward Store",
    "Emergency",
    "OT",
    "ICU",
    "Laboratory",
    "Blood Bank",
    "CSSD"
];

export const STORE_STATUS = {
    ACTIVE: true,
    INACTIVE: false
};

export const DRAWER_MODE = {
    ADD: "ADD",
    EDIT: "EDIT",
    VIEW: "VIEW"
};
export const STORE_FORM_TABS = {

    centerId: "basic",
    departmentId: "basic",
    storeCode: "basic",
    storeName: "basic",
    shortName: "basic",
    storeType: "basic",
    managerId: "basic",
    status: "basic",

    contactPerson: "contact",
    mobileNo: "contact",
    alternateMobileNo: "contact",
    email: "contact",
    extension: "contact",
    emergencyContact: "contact",
    fax: "contact",
    remarks: "contact",

    buildingId: "location",
    floorId: "location",
    wingId: "location",
    zoneId: "location",
    roomId: "location",
    rackId: "location",
    shelfId: "location",
    binId: "location",
    latitude: "location",
    longitude: "location",

    allowNegativeStock: "inventory",
    allowBatchSplit: "inventory",
    autoReorder: "inventory",
    expiryAlertDays: "inventory",
    fifo: "inventory",
    fefo: "inventory",
    barcodeEnabled: "inventory",

    costCenter: "financial",
    revenueCenter: "financial",
    profitCenter: "financial",
    taxGroup: "financial",
    defaultDiscount: "financial",
    roundOff: "financial",

    defaultPrinter: "printer",
    labelPrinter: "printer",
    barcodePrinter: "printer",
    thermalPrinter: "printer",
    a4Printer: "printer",
    printTemplate: "printer",

    is24Hours: "workingHours",
    workingOnHoliday: "workingHours",
    openingTime: "workingHours",
    closingTime: "workingHours",

    approvalRequired: "approval",
    approvalLevel: "approval",
    approverRole: "approval",
    approvalLimit: "approval"

};