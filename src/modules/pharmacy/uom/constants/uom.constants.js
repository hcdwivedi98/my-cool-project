// src/modules/pharmacy/uom/constants/uom.constants.js

/*
 * ============================================
 * UOM TYPES
 * ============================================
 *
 * Defines the category/type of a Unit of Measure.
 */

export const UOM_TYPES = [
    {
        value: "MASS",
        label: "Mass",
    },
    {
        value: "VOLUME",
        label: "Volume",
    },
    {
        value: "COUNT",
        label: "Count",
    },
    {
        value: "PACKAGING",
        label: "Packaging",
    },
    {
        value: "LENGTH",
        label: "Length",
    },
    {
        value: "AREA",
        label: "Area",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];

/*
 * ============================================
 * UOM STATUS
 * ============================================
 */

export const UOM_STATUS_OPTIONS = [
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
 * DECIMAL OPTIONS
 * ============================================
 */

export const DECIMAL_OPTIONS = [
    {
        value: true,
        label: "Allowed",
    },
    {
        value: false,
        label: "Not Allowed",
    },
];

/*
 * ============================================
 * COMMON UOM TYPE OPTIONS
 * ============================================
 *
 * Used where only pharmacy-relevant UOM
 * categories should be displayed.
 */

export const PHARMACY_UOM_TYPES = [
    {
        value: "MASS",
        label: "Mass",
    },
    {
        value: "VOLUME",
        label: "Volume",
    },
    {
        value: "COUNT",
        label: "Count",
    },
    {
        value: "PACKAGING",
        label: "Packaging",
    },
];

/*
 * ============================================
 * DEFAULT UOM FORM VALUES
 * ============================================
 */

export const DEFAULT_UOM_VALUES = {
    uomCode: "",
    uomName: "",
    shortName: "",

    uomType: undefined,

    baseUnitId: null,

    conversionFactor: 1,

    decimalAllowed: false,

    status: "Active",

    description: "",
};

/*
 * ============================================
 * DEFAULT LIST QUERY
 * ============================================
 */

export const DEFAULT_UOM_QUERY = {
    search: "",

    uomType: undefined,

    status: "Active",

    decimalAllowed: undefined,

    page: 1,

    pageSize: 10,

    sortBy: "uomName",

    sortOrder: "asc",
};

/*
 * ============================================
 * VALIDATION RULES
 * ============================================
 */

export const UOM_VALIDATION = {
    CODE_MAX_LENGTH: 30,

    NAME_MAX_LENGTH: 100,

    SHORT_NAME_MAX_LENGTH: 20,

    DESCRIPTION_MAX_LENGTH: 500,

    MIN_CONVERSION_FACTOR: 0.000001,

    MAX_CONVERSION_FACTOR: 999999999,
};

/*
 * ============================================
 * UOM CODE REGEX
 * ============================================
 *
 * Allowed:
 *   MG
 *   TABLET
 *   ML
 *   BOX-10
 *
 * Not allowed:
 *   mg@
 *   tablet#
 */

export const UOM_CODE_REGEX =
    /^[A-Z0-9_-]+$/;

/*
 * ============================================
 * COMMON PHARMACY UOM CODES
 * ============================================
 */

export const COMMON_UOM_CODES = {
    MCG: "MCG",
    MG: "MG",
    G: "G",
    KG: "KG",

    ML: "ML",
    L: "L",

    UNIT: "UNIT",

    TABLET: "TABLET",
    CAPSULE: "CAPSULE",

    VIAL: "VIAL",
    AMPOULE: "AMPOULE",

    BOTTLE: "BOTTLE",
    STRIP: "STRIP",

    BOX: "BOX",
    PACK: "PACK",
};

/*
 * ============================================
 * CONVERSION BASE TYPES
 * ============================================
 *
 * Mathematical conversion is meaningful for
 * physical units such as mass and volume.
 *
 * Packaging conversion is NOT globally defined
 * here because it varies by Drug.
 */

export const CONVERTIBLE_UOM_TYPES = [
    "MASS",
    "VOLUME",
    "LENGTH",
    "AREA",
];

/*
 * ============================================
 * COUNT BASED TYPES
 * ============================================
 */

export const COUNT_BASED_UOM_TYPES = [
    "COUNT",
];

/*
 * ============================================
 * PACKAGING TYPES
 * ============================================
 */

export const PACKAGING_UOM_TYPES = [
    "PACKAGING",
];

/*
 * ============================================
 * SYSTEM BASE UNIT CODES
 * ============================================
 *
 * These are the reference units for
 * mathematical conversions.
 */

export const SYSTEM_BASE_UNITS = {
    MASS: "MG",
    VOLUME: "ML",
    LENGTH: "MM",
    AREA: "MM2",
};

/*
 * ============================================
 * UOM FORM MODES
 * ============================================
 */

export const UOM_FORM_MODES = {
    ADD: "ADD",
    EDIT: "EDIT",
    VIEW: "VIEW",
};