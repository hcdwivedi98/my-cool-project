// src/modules/pharmacy/drug-strength/constants/drugStrength.constants.js


/* =========================================================
   MODULE
   ========================================================= */

export const DRUG_STRENGTH_MODULE =
    "DRUG_STRENGTH_MASTER";


/* =========================================================
   ROUTE
   ========================================================= */

export const DRUG_STRENGTH_PATH =
    "/pharmacy/drug-strength";


/* =========================================================
   FORM MODES
   ========================================================= */

export const DRUG_STRENGTH_FORM_MODES = {

    CREATE:
        "create",

    EDIT:
        "edit",

    VIEW:
        "view",

};


/* =========================================================
   STATUS
   ========================================================= */

export const DRUG_STRENGTH_STATUS = {

    ACTIVE:
        "Active",

    INACTIVE:
        "Inactive",

};


/* =========================================================
   STATUS OPTIONS
   ========================================================= */

export const DRUG_STRENGTH_STATUS_OPTIONS = [

    {
        label:
            "Active",

        value:
            DRUG_STRENGTH_STATUS.ACTIVE,
    },

    {
        label:
            "Inactive",

        value:
            DRUG_STRENGTH_STATUS.INACTIVE,
    },

];


/* =========================================================
   STRENGTH TYPES
   ========================================================= */

export const DRUG_STRENGTH_TYPES = {

    MASS:
        "Mass",

    VOLUME:
        "Volume",

    CONCENTRATION:
        "Concentration",

    ACTIVITY:
        "Activity",

    PERCENTAGE:
        "Percentage",

    OTHER:
        "Other",

};


/* =========================================================
   STRENGTH TYPE OPTIONS
   ========================================================= */

export const DRUG_STRENGTH_TYPE_OPTIONS = [

    {
        label:
            "Mass",

        value:
            DRUG_STRENGTH_TYPES.MASS,
    },

    {
        label:
            "Volume",

        value:
            DRUG_STRENGTH_TYPES.VOLUME,
    },

    {
        label:
            "Concentration",

        value:
            DRUG_STRENGTH_TYPES.CONCENTRATION,
    },

    {
        label:
            "Activity",

        value:
            DRUG_STRENGTH_TYPES.ACTIVITY,
    },

    {
        label:
            "Percentage",

        value:
            DRUG_STRENGTH_TYPES.PERCENTAGE,
    },

    {
        label:
            "Other",

        value:
            DRUG_STRENGTH_TYPES.OTHER,
    },

];


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

export const DRUG_STRENGTH_DEFAULTS = {

    strengthCode:
        "",

    strengthValue:
        null,

    strengthUnitId:
        null,

    strengthDisplay:
        "",

    strengthType:
        DRUG_STRENGTH_TYPES.MASS,

    decimalPrecision:
        0,

    sortOrder:
        0,

    status:
        DRUG_STRENGTH_STATUS.ACTIVE,

    description:
        "",

    remarks:
        "",

    isSystemDefined:
        false,

};


/* =========================================================
   DECIMAL PRECISION
   ========================================================= */

export const DRUG_STRENGTH_DECIMAL_PRECISION = {

    ZERO:
        0,

    ONE:
        1,

    TWO:
        2,

    THREE:
        3,

    FOUR:
        4,

};


/* =========================================================
   DECIMAL PRECISION OPTIONS
   ========================================================= */

export const DRUG_STRENGTH_DECIMAL_PRECISION_OPTIONS = [

    {
        label:
            "0",

        value:
            DRUG_STRENGTH_DECIMAL_PRECISION.ZERO,
    },

    {
        label:
            "1",

        value:
            DRUG_STRENGTH_DECIMAL_PRECISION.ONE,
    },

    {
        label:
            "2",

        value:
            DRUG_STRENGTH_DECIMAL_PRECISION.TWO,
    },

    {
        label:
            "3",

        value:
            DRUG_STRENGTH_DECIMAL_PRECISION.THREE,
    },

    {
        label:
            "4",

        value:
            DRUG_STRENGTH_DECIMAL_PRECISION.FOUR,
    },

];


/* =========================================================
   VALIDATION LIMITS
   ========================================================= */

export const DRUG_STRENGTH_LIMITS = {

    CODE_MAX_LENGTH:
        50,

    VALUE_MIN:
        0.0001,

    VALUE_MAX:
        999999999,

    DESCRIPTION_MAX_LENGTH:
        500,

    REMARKS_MAX_LENGTH:
        1000,

    SORT_ORDER_MIN:
        0,

    SORT_ORDER_MAX:
        999999,

};


/* =========================================================
   LOOKUP / USAGE
   ========================================================= */

export const DRUG_STRENGTH_USAGE = {

    ALL:
        "ALL",

    USED:
        "USED",

    UNUSED:
        "UNUSED",

};


/* =========================================================
   USAGE OPTIONS
   ========================================================= */

export const DRUG_STRENGTH_USAGE_OPTIONS = [

    {
        label:
            "Used",

        value:
            DRUG_STRENGTH_USAGE.USED,
    },

    {
        label:
            "Unused",

        value:
            DRUG_STRENGTH_USAGE.UNUSED,
    },

];


/* =========================================================
   DEFAULT QUERY
   ========================================================= */

export const DRUG_STRENGTH_DEFAULT_QUERY = {

    search:
        "",

    strengthType:
        undefined,

    strengthUnitId:
        undefined,

    status:
        undefined,

    usage:
        DRUG_STRENGTH_USAGE.ALL,

    page:
        1,

    pageSize:
        10,

    sortBy:
        "sortOrder",

    sortOrder:
        "asc",

};


/* =========================================================
   SORT ORDERS
   ========================================================= */

export const DRUG_STRENGTH_SORT_ORDER = {

    ASC:
        "asc",

    DESC:
        "desc",

};


/* =========================================================
   SYSTEM DEFINED
   ========================================================= */

export const DRUG_STRENGTH_SYSTEM_DEFINED = {

    YES:
        true,

    NO:
        false,

};


/* =========================================================
   API ENDPOINT
   ========================================================= */

export const DRUG_STRENGTH_API_ENDPOINT =
    "/api/pharmacy/drug-strengths";