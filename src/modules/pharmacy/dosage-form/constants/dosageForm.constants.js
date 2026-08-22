// src/modules/pharmacy/dosage-form/constants/dosageForm.constants.js

/*
 * =========================================================
 * DOSAGE FORM TYPES
 * =========================================================
 */

export const DOSAGE_FORM_TYPES = [
    {
        value: "SOLID",
        label: "Solid",
    },
    {
        value: "LIQUID",
        label: "Liquid",
    },
    {
        value: "SEMI_SOLID",
        label: "Semi-Solid",
    },
    {
        value: "GAS",
        label: "Gas",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];


/*
 * =========================================================
 * DOSAGE FORM STATUS
 * =========================================================
 */

export const DOSAGE_FORM_STATUS_OPTIONS = [
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
 * =========================================================
 * ROUTE OF ADMINISTRATION
 * =========================================================
 */

export const ROUTE_OF_ADMINISTRATION_OPTIONS = [
    {
        value: "ORAL",
        label: "Oral",
    },
    {
        value: "INTRAVENOUS",
        label: "Intravenous",
    },
    {
        value: "INTRAMUSCULAR",
        label: "Intramuscular",
    },
    {
        value: "SUBCUTANEOUS",
        label: "Subcutaneous",
    },
    {
        value: "TOPICAL",
        label: "Topical",
    },
    {
        value: "OPHTHALMIC",
        label: "Ophthalmic",
    },
    {
        value: "OTIC",
        label: "Otic",
    },
    {
        value: "NASAL",
        label: "Nasal",
    },
    {
        value: "INHALATION",
        label: "Inhalation",
    },
    {
        value: "RECTAL",
        label: "Rectal",
    },
    {
        value: "VAGINAL",
        label: "Vaginal",
    },
    {
        value: "TRANSDERMAL",
        label: "Transdermal",
    },
    {
        value: "PARENTERAL",
        label: "Parenteral",
    },
];


/*
 * =========================================================
 * DEFAULT VALUES
 * =========================================================
 */

export const DEFAULT_DOSAGE_FORM_VALUES = {
    formCode: "",
    formName: "",
    formType: "SOLID",
    description: "",
    routeOfAdministrationId: undefined,
    uomId: undefined,
    status: "Active",
    sortOrder: 0,
};


/*
 * =========================================================
 * DEFAULT QUERY
 * =========================================================
 */

export const DEFAULT_DOSAGE_FORM_QUERY = {
    search: "",

    formType: undefined,

    routeOfAdministrationId:
        undefined,

    uomId:
        undefined,

    status:
        undefined,

    usage:
        "ALL",

    page:
        1,

    pageSize:
        10,

    sortBy:
        "sortOrder",

    sortOrder:
        "asc",
};


/*
 * =========================================================
 * USAGE OPTIONS
 * =========================================================
 */

export const DOSAGE_FORM_USAGE_OPTIONS = [
    {
        value: "ALL",
        label: "All Usage",
    },
    {
        value: "USED",
        label: "Used",
    },
    {
        value: "UNUSED",
        label: "Unused",
    },
];


/*
 * =========================================================
 * CODE CONFIGURATION
 * =========================================================
 */

export const DOSAGE_FORM_CODE_CONFIG = {
    minLength: 2,
    maxLength: 20,
};


/*
 * =========================================================
 * NAME CONFIGURATION
 * =========================================================
 */

export const DOSAGE_FORM_NAME_CONFIG = {
    minLength: 2,
    maxLength: 100,
};


/*
 * =========================================================
 * DESCRIPTION CONFIGURATION
 * =========================================================
 */

export const DOSAGE_FORM_DESCRIPTION_CONFIG = {
    maxLength: 500,
};


/*
 * =========================================================
 * SORT ORDER CONFIGURATION
 * =========================================================
 */

export const DOSAGE_FORM_SORT_ORDER_CONFIG = {
    min: 0,
    max: 9999,
};


/*
 * =========================================================
 * FORM MODE
 * =========================================================
 */

export const DOSAGE_FORM_FORM_MODES = {
    CREATE: "create",
    EDIT: "edit",
    VIEW: "view",
};