/* =========================================================
   DRUG UNIT CONSTANTS
   ========================================================= */


/* =========================================================
   FORM MODES
   ========================================================= */

export const DRUG_UNIT_FORM_MODES = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    VIEW: "VIEW",
};


/* =========================================================
   STATUS
   ========================================================= */

export const DRUG_UNIT_STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};


/* =========================================================
   STATUS OPTIONS
   ========================================================= */

export const DRUG_UNIT_STATUS_OPTIONS = [
    {
        label: "Active",
        value: DRUG_UNIT_STATUS.ACTIVE,
    },
    {
        label: "Inactive",
        value: DRUG_UNIT_STATUS.INACTIVE,
    },
];


/* =========================================================
   UNIT TYPES
   ========================================================= */

export const DRUG_UNIT_TYPES = {
    MASS: "MASS",
    VOLUME: "VOLUME",
    COUNT: "COUNT",
    PACKAGING: "PACKAGING",
    LENGTH: "LENGTH",
    AREA: "AREA",
    TIME: "TIME",
    BIOLOGICAL: "BIOLOGICAL",
    OTHER: "OTHER",
};


/* =========================================================
   UNIT TYPE OPTIONS
   ========================================================= */

export const DRUG_UNIT_TYPE_OPTIONS = [
    {
        label: "Mass",
        value: DRUG_UNIT_TYPES.MASS,
    },

    {
        label: "Volume",
        value: DRUG_UNIT_TYPES.VOLUME,
    },

    {
        label: "Count",
        value: DRUG_UNIT_TYPES.COUNT,
    },

    {
        label: "Packaging",
        value: DRUG_UNIT_TYPES.PACKAGING,
    },

    {
        label: "Length",
        value: DRUG_UNIT_TYPES.LENGTH,
    },

    {
        label: "Area",
        value: DRUG_UNIT_TYPES.AREA,
    },

    {
        label: "Time",
        value: DRUG_UNIT_TYPES.TIME,
    },

    {
        label: "Biological",
        value: DRUG_UNIT_TYPES.BIOLOGICAL,
    },

    {
        label: "Other",
        value: DRUG_UNIT_TYPES.OTHER,
    },
];


/* =========================================================
   USAGE
   ========================================================= */

export const DRUG_UNIT_USAGE = {
    ALL: "ALL",
    USED: "USED",
    UNUSED: "UNUSED",
};


/* =========================================================
   USAGE OPTIONS
   ========================================================= */

export const DRUG_UNIT_USAGE_OPTIONS = [
    {
        label: "Used",
        value: DRUG_UNIT_USAGE.USED,
    },

    {
        label: "Unused",
        value: DRUG_UNIT_USAGE.UNUSED,
    },
];


/* =========================================================
   DECIMAL PRECISION
   ========================================================= */

export const DRUG_UNIT_PRECISION = {
    MIN: 0,
    MAX: 6,
    DEFAULT: 0,
};


/* =========================================================
   DECIMAL PRECISION OPTIONS
   ========================================================= */

export const DRUG_UNIT_PRECISION_OPTIONS = [
    {
        label: "0",
        value: 0,
    },

    {
        label: "1",
        value: 1,
    },

    {
        label: "2",
        value: 2,
    },

    {
        label: "3",
        value: 3,
    },

    {
        label: "4",
        value: 4,
    },

    {
        label: "5",
        value: 5,
    },

    {
        label: "6",
        value: 6,
    },
];


/* =========================================================
   FIELD LIMITS
   ========================================================= */

export const DRUG_UNIT_FIELD_LIMITS = {
    UNIT_CODE_MAX_LENGTH: 30,

    UNIT_NAME_MAX_LENGTH: 100,

    SYMBOL_MAX_LENGTH: 30,

    DESCRIPTION_MAX_LENGTH: 500,
};


/* =========================================================
   VALIDATION
   ========================================================= */

export const DRUG_UNIT_VALIDATION = {
    UNIT_CODE_REQUIRED:
        "Unit code is required.",

    UNIT_NAME_REQUIRED:
        "Unit name is required.",

    SYMBOL_REQUIRED:
        "Symbol is required.",

    UNIT_TYPE_REQUIRED:
        "Unit type is required.",

    DECIMAL_PRECISION_REQUIRED:
        "Decimal precision is required.",

    UNIT_CODE_DUPLICATE:
        "Unit code already exists.",

    SYMBOL_DUPLICATE:
        "Symbol already exists.",

    INVALID_PRECISION:
        "Decimal precision must be between 0 and 6.",

    DESCRIPTION_MAX:
        "Description cannot exceed 500 characters.",
};


/* =========================================================
   LABELS
   ========================================================= */

export const DRUG_UNIT_LABELS = {
    UNIT_CODE: "Unit Code",

    UNIT_NAME: "Unit Name",

    SYMBOL: "Symbol",

    UNIT_TYPE: "Unit Type",

    DECIMAL_PRECISION:
        "Decimal Precision",

    DESCRIPTION: "Description",

    STATUS: "Status",

    USAGE: "Usage",

    MAPPED_DRUGS:
        "Mapped Drugs",

    SYSTEM_DEFINED:
        "System Defined",
};


/* =========================================================
   DEFAULT FORM VALUES
   ========================================================= */

export const DRUG_UNIT_DEFAULT_VALUES = {
    unitCode: "",

    unitName: "",

    symbol: "",

    unitType:
        DRUG_UNIT_TYPES.COUNT,

    decimalPrecision:
        DRUG_UNIT_PRECISION.DEFAULT,

    description: "",

    status:
        DRUG_UNIT_STATUS.ACTIVE,

    isActive: true,

    isSystemDefined: false,

    usageCount: 0,
};


/* =========================================================
   API SORTING
   ========================================================= */

export const DRUG_UNIT_SORT_FIELDS = {
    UNIT_CODE: "unitCode",

    UNIT_NAME: "unitName",

    SYMBOL: "symbol",

    UNIT_TYPE: "unitType",

    DECIMAL_PRECISION:
        "decimalPrecision",

    USAGE_COUNT:
        "usageCount",

    STATUS: "status",
};


/* =========================================================
   DEFAULT SORT
   ========================================================= */

export const DRUG_UNIT_DEFAULT_SORT = {
    field:
        DRUG_UNIT_SORT_FIELDS.UNIT_NAME,

    order: "ascend",
};


/* =========================================================
   PAGINATION
   ========================================================= */

export const DRUG_UNIT_PAGINATION = {
    DEFAULT_PAGE: 1,

    DEFAULT_PAGE_SIZE: 10,

    PAGE_SIZE_OPTIONS: [
        10,
        20,
        50,
        100,
    ],
};


/* =========================================================
   API / ENTITY
   ========================================================= */

export const DRUG_UNIT_ENTITY = {
    NAME: "Drug Unit",

    PLURAL_NAME: "Drug Units",

    API_RESOURCE: "drug-units",
};


/* =========================================================
   PERMISSION KEYS
   ========================================================= */

export const DRUG_UNIT_PERMISSIONS = {
    VIEW:
        "pharmacy.drugUnit.view",

    CREATE:
        "pharmacy.drugUnit.create",

    EDIT:
        "pharmacy.drugUnit.edit",

    ACTIVATE:
        "pharmacy.drugUnit.activate",

    DEACTIVATE:
        "pharmacy.drugUnit.deactivate",
};