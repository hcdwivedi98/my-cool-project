// src/modules/user-management/permission/constants/permission.constants.js


/* =========================================================
   PERMISSION ACTIONS
   ========================================================= */

export const PERMISSION_ACTIONS = {

    VIEW:
        "VIEW",

    CREATE:
        "CREATE",

    EDIT:
        "EDIT",

    DELETE:
        "DELETE",

    APPROVE:
        "APPROVE",

    EXPORT:
        "EXPORT",

};


/* =========================================================
   PERMISSION ACTION OPTIONS
   ========================================================= */

export const PERMISSION_ACTION_OPTIONS = [

    {
        label:
            "View",

        value:
            PERMISSION_ACTIONS.VIEW,
    },

    {
        label:
            "Create",

        value:
            PERMISSION_ACTIONS.CREATE,
    },

    {
        label:
            "Edit",

        value:
            PERMISSION_ACTIONS.EDIT,
    },

    {
        label:
            "Delete",

        value:
            PERMISSION_ACTIONS.DELETE,
    },

    {
        label:
            "Approve",

        value:
            PERMISSION_ACTIONS.APPROVE,
    },

    {
        label:
            "Export",

        value:
            PERMISSION_ACTIONS.EXPORT,
    },

];


/* =========================================================
   PERMISSION STATUS
   ========================================================= */

export const PERMISSION_STATUS = {

    ACTIVE:
        "ACTIVE",

    INACTIVE:
        "INACTIVE",

};


/* =========================================================
   PERMISSION STATUS OPTIONS
   ========================================================= */

export const PERMISSION_STATUS_OPTIONS = [

    {
        label:
            "Active",

        value:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        label:
            "Inactive",

        value:
            PERMISSION_STATUS.INACTIVE,
    },

];


/* =========================================================
   PERMISSION FORM MODES
   ========================================================= */

export const PERMISSION_FORM_MODES = {

    CREATE:
        "CREATE",

    EDIT:
        "EDIT",

    VIEW:
        "VIEW",

};


/* =========================================================
   PERMISSION TYPES
   ========================================================= */

export const PERMISSION_TYPES = {

    SYSTEM:
        "SYSTEM",

    CUSTOM:
        "CUSTOM",

};


/* =========================================================
   PERMISSION TYPE OPTIONS
   ========================================================= */

export const PERMISSION_TYPE_OPTIONS = [

    {
        label:
            "System",

        value:
            PERMISSION_TYPES.SYSTEM,
    },

    {
        label:
            "Custom",

        value:
            PERMISSION_TYPES.CUSTOM,
    },

];


/* =========================================================
   PERMISSION MODULES
   ========================================================= */

export const PERMISSION_MODULES = {

    DASHBOARD:
        "DASHBOARD",

    PURCHASE:
        "PURCHASE",

    INVENTORY:
        "INVENTORY",

    SUPPLIER:
        "SUPPLIER",

    ORGANIZATION:
        "ORGANIZATION",

    PHARMACY:
        "PHARMACY",

    USER_MANAGEMENT:
        "USER_MANAGEMENT",

    REPORTS:
        "REPORTS",

    SETTINGS:
        "SETTINGS",

};


/* =========================================================
   PERMISSION MODULE OPTIONS
   ========================================================= */

export const PERMISSION_MODULE_OPTIONS = [

    {
        label:
            "Dashboard",

        value:
            PERMISSION_MODULES.DASHBOARD,
    },

    {
        label:
            "Purchase",

        value:
            PERMISSION_MODULES.PURCHASE,
    },

    {
        label:
            "Inventory",

        value:
            PERMISSION_MODULES.INVENTORY,
    },

    {
        label:
            "Supplier",

        value:
            PERMISSION_MODULES.SUPPLIER,
    },

    {
        label:
            "Organization",

        value:
            PERMISSION_MODULES.ORGANIZATION,
    },

    {
        label:
            "Pharmacy",

        value:
            PERMISSION_MODULES.PHARMACY,
    },

    {
        label:
            "User Management",

        value:
            PERMISSION_MODULES.USER_MANAGEMENT,
    },

    {
        label:
            "Reports",

        value:
            PERMISSION_MODULES.REPORTS,
    },

    {
        label:
            "Settings",

        value:
            PERMISSION_MODULES.SETTINGS,
    },

];


/* =========================================================
   PERMISSION SCOPES
   ========================================================= */

export const PERMISSION_SCOPES = {

    GLOBAL:
        "GLOBAL",

    COMPANY:
        "COMPANY",

    CENTER:
        "CENTER",

    DEPARTMENT:
        "DEPARTMENT",

    STORE:
        "STORE",

};


/* =========================================================
   PERMISSION SCOPE OPTIONS
   ========================================================= */

export const PERMISSION_SCOPE_OPTIONS = [

    {
        label:
            "Global",

        value:
            PERMISSION_SCOPES.GLOBAL,
    },

    {
        label:
            "Company",

        value:
            PERMISSION_SCOPES.COMPANY,
    },

    {
        label:
            "Center",

        value:
            PERMISSION_SCOPES.CENTER,
    },

    {
        label:
            "Department",

        value:
            PERMISSION_SCOPES.DEPARTMENT,
    },

    {
        label:
            "Store",

        value:
            PERMISSION_SCOPES.STORE,
    },

];


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

export const DEFAULT_PERMISSION_ACTIONS = [

    PERMISSION_ACTIONS.VIEW,

];


export const DEFAULT_PERMISSION_STATUS =
    PERMISSION_STATUS.ACTIVE;


export const DEFAULT_PERMISSION_TYPE =
    PERMISSION_TYPES.CUSTOM;


export const DEFAULT_PERMISSION_SCOPE =
    PERMISSION_SCOPES.GLOBAL;


/* =========================================================
   PAGINATION
   ========================================================= */

export const DEFAULT_PERMISSION_PAGE =
    1;


export const DEFAULT_PERMISSION_PAGE_SIZE =
    10;


export const PERMISSION_PAGE_SIZE_OPTIONS = [

    10,

    20,

    50,

    100,

];