export const SUPPLIER_STATUS = {

    ACTIVE: true,

    INACTIVE: false,

};

export const SUPPLIER_TYPE = {

    LOCAL: "LOCAL",

    NATIONAL: "NATIONAL",

    IMPORT: "IMPORT",

};

export const PAYMENT_TYPE = {

    CASH: "CASH",

    CREDIT: "CREDIT",

    ADVANCE: "ADVANCE",

};

export const DEFAULT_SUPPLIER = {

    id: 0,

    supplierCode: "",

    supplierName: "",

    shortName: "",

    supplierType: SUPPLIER_TYPE.LOCAL,

    contactPerson: "",

    mobileNo: "",

    alternateMobileNo: "",

    email: "",

    website: "",

    gstNo: "",

    panNo: "",

    drugLicenseNo: "",

    foodLicenseNo: "",

    msmeNo: "",

    address1: "",

    address2: "",

    cityId: null,

    stateId: null,

    countryId: null,

    pinCode: "",

    paymentType: PAYMENT_TYPE.CREDIT,

    creditDays: 0,

    creditLimit: 0,

    openingBalance: 0,

    bankName: "",

    accountNo: "",

    ifscCode: "",

    remarks: "",

    isActive: true,

};