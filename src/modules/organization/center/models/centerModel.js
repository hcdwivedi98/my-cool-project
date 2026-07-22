/**
 * ==========================================================
 * Center Master Domain Model
 * Hospital Pharmacy ERP
 * ==========================================================
 */

export const defaultCenter = {

    id: 0,

    code: "",

    name: "",

    shortName: "",

    centerType: null,

    hospitalType: null,

    registrationNo: "",

    gstin: "",

    pan: "",

    description: "",

    contactPerson: "",

    designation: "",

    mobileNo: "",

    alternateMobile: "",

    email: "",

    telephone: "",

    website: "",

    fax: "",

    address1: "",

    address2: "",

    country: null,

    state: null,

    district: "",

    city: "",

    pinCode: "",

    latitude: null,

    longitude: null,

    allowBilling: true,

    allowPurchase: true,

    allowInventory: true,

    isDefault: false,

    isActive: true,

    financialYear: null,

    currency: "INR",

    timeZone: "Asia/Kolkata",

    logo: null,

    createdBy: null,

    createdOn: null,

    modifiedBy: null,

    modifiedOn: null,

    version: 1

};

export const emptyCenter = () => ({

    ...defaultCenter

});