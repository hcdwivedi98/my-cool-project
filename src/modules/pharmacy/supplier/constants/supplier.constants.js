// src/modules/pharmacy/supplier/constants/supplier.constants.js

export const SUPPLIER_TYPES = [
    {
        label: "Manufacturer",
        value: "MANUFACTURER",
    },
    {
        label: "Distributor",
        value: "DISTRIBUTOR",
    },
    {
        label: "Wholesaler",
        value: "WHOLESALER",
    },
    {
        label: "Importer",
        value: "IMPORTER",
    },
    {
        label: "C&F Agent",
        value: "CF_AGENT",
    },
    {
        label: "Other",
        value: "OTHER",
    },
];

export const SUPPLIER_CATEGORIES = [
    {
        label: "Pharmaceutical",
        value: "PHARMACEUTICAL",
    },
    {
        label: "Medical Devices",
        value: "MEDICAL_DEVICE",
    },
    {
        label: "Consumables",
        value: "CONSUMABLE",
    },
    {
        label: "Surgical",
        value: "SURGICAL",
    },
    {
        label: "General",
        value: "GENERAL",
    },
];

export const SUPPLIER_STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};

export const SUPPLIER_STATUS_OPTIONS = [
    {
        label: "Active",
        value: SUPPLIER_STATUS.ACTIVE,
    },
    {
        label: "Inactive",
        value: SUPPLIER_STATUS.INACTIVE,
    },
];

export const PAYMENT_TERMS = [
    {
        label: "Cash",
        value: "CASH",
    },
    {
        label: "Advance",
        value: "ADVANCE",
    },
    {
        label: "Credit",
        value: "CREDIT",
    },
];

export const CURRENCIES = [
    {
        label: "Indian Rupee (INR)",
        value: "INR",
    },
    {
        label: "US Dollar (USD)",
        value: "USD",
    },
    {
        label: "Euro (EUR)",
        value: "EUR",
    },
    {
        label: "Pound Sterling (GBP)",
        value: "GBP",
    },
];

export const LICENSE_TYPES = [
    {
        label: "Wholesale Drug License",
        value: "WHOLESALE_DRUG",
    },
    {
        label: "Retail Drug License",
        value: "RETAIL_DRUG",
    },
    {
        label: "Manufacturing License",
        value: "MANUFACTURING",
    },
    {
        label: "Import License",
        value: "IMPORT",
    },
    {
        label: "Other",
        value: "OTHER",
    },
];

export const COUNTRIES = [
    {
        label: "India",
        value: "IN",
    },
];

export const SUPPLIER_DEFAULTS = {
    supplierType: "DISTRIBUTOR",
    supplierCategory: "PHARMACEUTICAL",
    paymentTerms: "CREDIT",
    creditDays: 30,
    currency: "INR",
    status: SUPPLIER_STATUS.ACTIVE,
};