// src/modules/pharmacy/manufacturer/constants/manufacturer.constants.js

/*
 * ============================================
 * Manufacturer Types
 * ============================================
 */

export const MANUFACTURER_TYPES = [
    {
        value: "PHARMACEUTICAL",
        label: "Pharmaceutical Manufacturer",
    },
    {
        value: "BIOLOGICAL",
        label: "Biological Manufacturer",
    },
    {
        value: "VACCINE",
        label: "Vaccine Manufacturer",
    },
    {
        value: "SURGICAL",
        label: "Surgical Manufacturer",
    },
    {
        value: "MEDICAL_DEVICE",
        label: "Medical Device Manufacturer",
    },
    {
        value: "NUTRACEUTICAL",
        label: "Nutraceutical Manufacturer",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];

/*
 * ============================================
 * Manufacturer Categories
 * ============================================
 */

export const MANUFACTURER_CATEGORIES = [
    {
        value: "DOMESTIC",
        label: "Domestic",
    },
    {
        value: "MULTINATIONAL",
        label: "Multinational",
    },
    {
        value: "GOVERNMENT",
        label: "Government",
    },
    {
        value: "IMPORTER",
        label: "Importer",
    },
    {
        value: "CONTRACT_MANUFACTURER",
        label: "Contract Manufacturer",
    },
];

/*
 * ============================================
 * Status
 * ============================================
 */

export const MANUFACTURER_STATUS_OPTIONS = [
    {
        value: "Active",
        label: "Active",
    },
    {
        value: "Inactive",
        label: "Inactive",
    },
];

/*
 * ============================================
 * License Types
 * ============================================
 */

export const LICENSE_TYPES = [
    {
        value: "WHOLESALE_DRUG_LICENSE",
        label: "Wholesale Drug License",
    },
    {
        value: "MANUFACTURING_LICENSE",
        label: "Manufacturing License",
    },
    {
        value: "FSSAI",
        label: "FSSAI",
    },
    {
        value: "MEDICAL_DEVICE_LICENSE",
        label: "Medical Device License",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];

/*
 * ============================================
 * Certification Types
 * ============================================
 */

export const CERTIFICATION_TYPES = [
    {
        value: "WHO_GMP",
        label: "WHO-GMP",
    },
    {
        value: "GMP",
        label: "GMP",
    },
    {
        value: "ISO_9001",
        label: "ISO 9001",
    },
    {
        value: "ISO_13485",
        label: "ISO 13485",
    },
    {
        value: "GLP",
        label: "GLP",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];

/*
 * ============================================
 * Countries
 * ============================================
 */

export const COUNTRIES = [
    {
        value: "INDIA",
        label: "India",
    },
    {
        value: "USA",
        label: "United States",
    },
    {
        value: "UK",
        label: "United Kingdom",
    },
    {
        value: "GERMANY",
        label: "Germany",
    },
    {
        value: "SWITZERLAND",
        label: "Switzerland",
    },
    {
        value: "FRANCE",
        label: "France",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];

/*
 * ============================================
 * States
 * ============================================
 */

export const STATES = [
    {
        value: "DELHI",
        label: "Delhi",
    },
    {
        value: "MAHARASHTRA",
        label: "Maharashtra",
    },
    {
        value: "UTTAR_PRADESH",
        label: "Uttar Pradesh",
    },
    {
        value: "GUJARAT",
        label: "Gujarat",
    },
    {
        value: "KARNATAKA",
        label: "Karnataka",
    },
    {
        value: "TELANGANA",
        label: "Telangana",
    },
    {
        value: "TAMIL_NADU",
        label: "Tamil Nadu",
    },
    {
        value: "WEST_BENGAL",
        label: "West Bengal",
    },
    {
        value: "RAJASTHAN",
        label: "Rajasthan",
    },
    {
        value: "MADHYA_PRADESH",
        label: "Madhya Pradesh",
    },
];

/*
 * ============================================
 * Cities
 * ============================================
 */

export const CITIES = [
    {
        value: "NEW_DELHI",
        label: "New Delhi",
    },
    {
        value: "MUMBAI",
        label: "Mumbai",
    },
    {
        value: "LUCKNOW",
        label: "Lucknow",
    },
    {
        value: "KANPUR",
        label: "Kanpur",
    },
    {
        value: "AHMEDABAD",
        label: "Ahmedabad",
    },
    {
        value: "BENGALURU",
        label: "Bengaluru",
    },
    {
        value: "HYDERABAD",
        label: "Hyderabad",
    },
    {
        value: "CHENNAI",
        label: "Chennai",
    },
    {
        value: "KOLKATA",
        label: "Kolkata",
    },
    {
        value: "JAIPUR",
        label: "Jaipur",
    },
];

/*
 * ============================================
 * Currencies
 * ============================================
 */

export const CURRENCIES = [
    {
        value: "INR",
        label: "Indian Rupee (INR)",
    },
    {
        value: "USD",
        label: "US Dollar (USD)",
    },
    {
        value: "EUR",
        label: "Euro (EUR)",
    },
    {
        value: "GBP",
        label: "British Pound (GBP)",
    },
];

/*
 * ============================================
 * Payment Terms
 * ============================================
 */

export const PAYMENT_TERMS = [
    {
        value: "ADVANCE",
        label: "Advance",
    },
    {
        value: "COD",
        label: "Cash on Delivery",
    },
    {
        value: "NET_15",
        label: "Net 15 Days",
    },
    {
        value: "NET_30",
        label: "Net 30 Days",
    },
    {
        value: "NET_45",
        label: "Net 45 Days",
    },
    {
        value: "NET_60",
        label: "Net 60 Days",
    },
    {
        value: "NET_90",
        label: "Net 90 Days",
    },
];

/*
 * ============================================
 * Yes / No
 * ============================================
 */

export const YES_NO_OPTIONS = [
    {
        value: true,
        label: "Yes",
    },
    {
        value: false,
        label: "No",
    },
];

/*
 * ============================================
 * Default Manufacturer Status
 * ============================================
 */

export const DEFAULT_MANUFACTURER_STATUS =
    "Active";

/*
 * ============================================
 * Default Country
 * ============================================
 */

export const DEFAULT_MANUFACTURER_COUNTRY =
    "INDIA";

/*
 * ============================================
 * Default Currency
 * ============================================
 */

export const DEFAULT_MANUFACTURER_CURRENCY =
    "INR";