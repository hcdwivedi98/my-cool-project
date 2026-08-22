// src/modules/pharmacy/drug-route/constants/drugRoute.constants.js


/*
 * =========================================================
 * DRUG ROUTE TYPES
 * =========================================================
 */

export const DRUG_ROUTE_TYPES = [
    {
        value: "SYSTEMIC",
        label: "Systemic",
    },
    {
        value: "LOCAL",
        label: "Local",
    },
    {
        value: "SPECIALIZED",
        label: "Specialized",
    },
];


/*
 * =========================================================
 * DRUG ROUTE STATUS
 * =========================================================
 */

export const DRUG_ROUTE_STATUS_OPTIONS = [
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
 * DRUG ROUTE USAGE
 * =========================================================
 *
 * Used by:
 * - Search/filter
 * - Validation section
 * - Query layer
 */

export const DRUG_ROUTE_USAGE_OPTIONS = [
    {
        value: "ALL",
        label: "All",
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
 * FORM MODES
 * =========================================================
 */

export const DRUG_ROUTE_FORM_MODES = {
    CREATE: "create",
    EDIT: "edit",
    VIEW: "view",
};


/*
 * =========================================================
 * DEFAULT FORM VALUES
 * =========================================================
 */

export const DEFAULT_DRUG_ROUTE_FORM_VALUES = {
    routeCode: "",
    routeName: "",
    routeType: "SYSTEMIC",
    description: "",
    status: "Active",
    sortOrder: 0,
};


/*
 * =========================================================
 * DEFAULT QUERY
 * =========================================================
 */

export const DEFAULT_DRUG_ROUTE_QUERY = {
    search: "",

    routeType: undefined,

    status: undefined,

    usage: "ALL",

    page: 1,

    pageSize: 10,

    sortBy: "sortOrder",

    sortOrder: "asc",
};


/*
 * =========================================================
 * CODE CONFIGURATION
 * =========================================================
 */

export const DRUG_ROUTE_CODE_CONFIG = {
    minLength: 2,

    maxLength: 30,
};


/*
 * =========================================================
 * NAME CONFIGURATION
 * =========================================================
 */

export const DRUG_ROUTE_NAME_CONFIG = {
    minLength: 2,

    maxLength: 100,
};


/*
 * =========================================================
 * DESCRIPTION CONFIGURATION
 * =========================================================
 */

export const DRUG_ROUTE_DESCRIPTION_CONFIG = {
    maxLength: 500,
};


/*
 * =========================================================
 * SORT ORDER CONFIGURATION
 * =========================================================
 */

export const DRUG_ROUTE_SORT_ORDER_CONFIG = {
    min: 0,

    max: 9999,
};


/*
 * =========================================================
 * DEFAULT PAGINATION
 * =========================================================
 */

export const DRUG_ROUTE_PAGE_SIZE_OPTIONS = [
    10,
    20,
    50,
    100,
];


/*
 * =========================================================
 * ROUTE CODE REGEX
 * =========================================================
 *
 * Allowed:
 * A-Z
 * 0-9
 * -
 * _
 */

export const DRUG_ROUTE_CODE_REGEX =
    /^[A-Z0-9_-]+$/;


/*
 * =========================================================
 * API CONFIG
 * =========================================================
 */

export const DRUG_ROUTE_API_CONFIG = {
    basePath: "/api/pharmacy/drug-routes",

    resourceName: "Drug Route",
};


/*
 * =========================================================
 * TABLE CONFIGURATION
 * =========================================================
 */

export const DRUG_ROUTE_TABLE_CONFIG = {
    defaultPageSize: 10,

    scrollX: 1100,
};


/*
 * =========================================================
 * DEFAULT SORT
 * =========================================================
 */

export const DRUG_ROUTE_DEFAULT_SORT = {
    field: "sortOrder",

    order: "asc",
};