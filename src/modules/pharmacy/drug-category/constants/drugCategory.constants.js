// src/modules/pharmacy/drug-category/constants/drugCategory.constants.js


/*
 * =========================================================
 * CATEGORY TYPES
 * =========================================================
 */

export const DRUG_CATEGORY_TYPES = [
    {
        value: "THERAPEUTIC",
        label: "Therapeutic",
    },
    {
        value: "PHARMACOLOGICAL",
        label: "Pharmacological",
    },
    {
        value: "CLINICAL",
        label: "Clinical",
    },
    {
        value: "OTHER",
        label: "Other",
    },
];


/*
 * =========================================================
 * STATUS
 * =========================================================
 */

export const DRUG_CATEGORY_STATUS_OPTIONS = [
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
 * DEFAULT STATUS
 * =========================================================
 */

export const DEFAULT_DRUG_CATEGORY_STATUS =
    "Active";


/*
 * =========================================================
 * DEFAULT CATEGORY TYPE
 * =========================================================
 */

export const DEFAULT_DRUG_CATEGORY_TYPE =
    "THERAPEUTIC";


/*
 * =========================================================
 * DEFAULT SORT ORDER
 * =========================================================
 */

export const DEFAULT_DRUG_CATEGORY_SORT_ORDER =
    10;


/*
 * =========================================================
 * CATEGORY CODE CONFIGURATION
 * =========================================================
 */

export const DRUG_CATEGORY_CODE_MAX_LENGTH =
    50;


/*
 * =========================================================
 * CATEGORY NAME CONFIGURATION
 * =========================================================
 */

export const DRUG_CATEGORY_NAME_MAX_LENGTH =
    100;


/*
 * =========================================================
 * DESCRIPTION CONFIGURATION
 * =========================================================
 */

export const DRUG_CATEGORY_DESCRIPTION_MAX_LENGTH =
    500;


/*
 * =========================================================
 * CATEGORY TYPE LABEL MAP
 * =========================================================
 */

export const DRUG_CATEGORY_TYPE_LABELS = {
    THERAPEUTIC:
        "Therapeutic",

    PHARMACOLOGICAL:
        "Pharmacological",

    CLINICAL:
        "Clinical",

    OTHER:
        "Other",
};


/*
 * =========================================================
 * STATUS LABEL MAP
 * =========================================================
 */

export const DRUG_CATEGORY_STATUS_LABELS = {
    Active:
        "Active",

    Inactive:
        "Inactive",
};


/*
 * =========================================================
 * STATUS COLORS
 * =========================================================
 */

export const DRUG_CATEGORY_STATUS_COLORS = {
    Active:
        "success",

    Inactive:
        "default",
};


/*
 * =========================================================
 * CATEGORY TYPE COLORS
 * =========================================================
 */

export const DRUG_CATEGORY_TYPE_COLORS = {
    THERAPEUTIC:
        "blue",

    PHARMACOLOGICAL:
        "purple",

    CLINICAL:
        "cyan",

    OTHER:
        "default",
};


/*
 * =========================================================
 * PAGE DEFAULTS
 * =========================================================
 */

export const DRUG_CATEGORY_PAGE_SIZE =
    10;

export const DRUG_CATEGORY_PAGE_SIZE_OPTIONS = [
    10,
    20,
    50,
    100,
];


/*
 * =========================================================
 * SORT OPTIONS
 * =========================================================
 */

export const DRUG_CATEGORY_SORT_OPTIONS = [
    {
        value: "categoryCode",
        label: "Category Code",
    },
    {
        value: "categoryName",
        label: "Category Name",
    },
    {
        value: "categoryType",
        label: "Category Type",
    },
    {
        value: "sortOrder",
        label: "Sort Order",
    },
    {
        value: "createdOn",
        label: "Created On",
    },
];


/*
 * =========================================================
 * SORT ORDER OPTIONS
 * =========================================================
 */

export const DRUG_CATEGORY_SORT_ORDER_OPTIONS = [
    {
        value: "asc",
        label: "Ascending",
    },
    {
        value: "desc",
        label: "Descending",
    },
];


/*
 * =========================================================
 * FILTER OPTIONS
 * =========================================================
 */

export const DRUG_CATEGORY_USAGE_OPTIONS = [
    {
        value: "ALL",
        label: "All Categories",
    },
    {
        value: "USED",
        label: "Used by Drugs",
    },
    {
        value: "UNUSED",
        label: "Not Used",
    },
];


/*
 * =========================================================
 * DEFAULT QUERY
 * =========================================================
 */

export const DEFAULT_DRUG_CATEGORY_QUERY = {
    search: "",

    categoryType:
        undefined,

    parentCategoryId:
        undefined,

    status:
        "Active",

    usage:
        "ALL",

    page: 1,

    pageSize:
        DRUG_CATEGORY_PAGE_SIZE,

    sortBy:
        "sortOrder",

    sortOrder:
        "asc",
};


/*
 * =========================================================
 * DEFAULT FORM VALUES
 * =========================================================
 */

export const DEFAULT_DRUG_CATEGORY_VALUES = {
    categoryCode: "",

    categoryName: "",

    categoryType:
        DEFAULT_DRUG_CATEGORY_TYPE,

    parentCategoryId:
        null,

    description: "",

    status:
        DEFAULT_DRUG_CATEGORY_STATUS,

    sortOrder:
        DEFAULT_DRUG_CATEGORY_SORT_ORDER,
};