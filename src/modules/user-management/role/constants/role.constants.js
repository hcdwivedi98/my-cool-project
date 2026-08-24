/* =========================================================
   ROLE MANAGEMENT CONSTANTS
   ========================================================= */


/* =========================================================
   FORM MODES
   ========================================================= */

export const ROLE_FORM_MODES = {

    CREATE:
        "CREATE",

    EDIT:
        "EDIT",

    VIEW:
        "VIEW",

};


/* =========================================================
   ROLE STATUS
   ========================================================= */

export const ROLE_STATUS = {

    ACTIVE:
        "ACTIVE",

    INACTIVE:
        "INACTIVE",

};


/* =========================================================
   ROLE STATUS OPTIONS
   ========================================================= */

export const ROLE_STATUS_OPTIONS = [

    {
        label:
            "Active",

        value:
            ROLE_STATUS.ACTIVE,
    },

    {
        label:
            "Inactive",

        value:
            ROLE_STATUS.INACTIVE,
    },

];


/* =========================================================
   ROLE TYPES
   ========================================================= */

export const ROLE_TYPES = {

    SYSTEM:
        "SYSTEM",

    APPLICATION:
        "APPLICATION",

    CUSTOM:
        "CUSTOM",

};


/* =========================================================
   ROLE TYPE OPTIONS
   ========================================================= */

export const ROLE_TYPE_OPTIONS = [

    {
        label:
            "System",

        value:
            ROLE_TYPES.SYSTEM,
    },

    {
        label:
            "Application",

        value:
            ROLE_TYPES.APPLICATION,
    },

    {
        label:
            "Custom",

        value:
            ROLE_TYPES.CUSTOM,
    },

];


/* =========================================================
   ROLE SCOPE
   ========================================================= */

export const ROLE_SCOPES = {

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

    SUB_STORE:
        "SUB_STORE",

};


/* =========================================================
   ROLE SCOPE OPTIONS
   ========================================================= */

export const ROLE_SCOPE_OPTIONS = [

    {
        label:
            "Global",

        value:
            ROLE_SCOPES.GLOBAL,
    },

    {
        label:
            "Company",

        value:
            ROLE_SCOPES.COMPANY,
    },

    {
        label:
            "Center",

        value:
            ROLE_SCOPES.CENTER,
    },

    {
        label:
            "Department",

        value:
            ROLE_SCOPES.DEPARTMENT,
    },

    {
        label:
            "Store",

        value:
            ROLE_SCOPES.STORE,
    },

    {
        label:
            "Sub Store",

        value:
            ROLE_SCOPES.SUB_STORE,
    },

];


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
   MODULE CODES
   ========================================================= */

export const ROLE_MODULES = {

    DASHBOARD:
        "DASHBOARD",

    USER_MANAGEMENT:
        "USER_MANAGEMENT",

    ROLE_MANAGEMENT:
        "ROLE_MANAGEMENT",

    PERMISSION_MANAGEMENT:
        "PERMISSION_MANAGEMENT",

    PHARMACY:
        "PHARMACY",

    INVENTORY:
        "INVENTORY",

    PURCHASE:
        "PURCHASE",

    SUPPLIER:
        "SUPPLIER",

    ORGANIZATION:
        "ORGANIZATION",

    REPORTS:
        "REPORTS",

    SETTINGS:
        "SETTINGS",

};


/* =========================================================
   ROLE RESOURCE CODES
   ========================================================= */

export const ROLE_RESOURCES = {

    DASHBOARD:
        "DASHBOARD",

    USER:
        "USER",

    ROLE:
        "ROLE",

    PERMISSION:
        "PERMISSION",

    DRUG:
        "DRUG",

    DRUG_ROUTE:
        "DRUG_ROUTE",

    DRUG_STRENGTH:
        "DRUG_STRENGTH",

    DRUG_UNIT:
        "DRUG_UNIT",

    GENERIC:
        "GENERIC",

    DRUG_CATEGORY:
        "DRUG_CATEGORY",

    DOSAGE_FORM:
        "DOSAGE_FORM",

    INVENTORY:
        "INVENTORY",

    STOCK_TRANSFER:
        "STOCK_TRANSFER",

    EXPIRY_MANAGEMENT:
        "EXPIRY_MANAGEMENT",

    PURCHASE_REQUISITION:
        "PURCHASE_REQUISITION",

    PURCHASE_ORDER:
        "PURCHASE_ORDER",

    GRN:
        "GRN",

    SUPPLIER:
        "SUPPLIER",

    SUPPLIER_ITEM_MAPPING:
        "SUPPLIER_ITEM_MAPPING",

    COMPANY:
        "COMPANY",

    CENTER:
        "CENTER",

    DEPARTMENT:
        "DEPARTMENT",

    STORE:
        "STORE",

    SUB_STORE:
        "SUB_STORE",

    REPORT:
        "REPORT",

    SETTINGS:
        "SETTINGS",

};


/* =========================================================
   USER ASSIGNMENT STATUS
   ========================================================= */

export const ROLE_ASSIGNMENT_STATUS = {

    ACTIVE:
        "ACTIVE",

    INACTIVE:
        "INACTIVE",

};


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

export const DEFAULT_ROLE_VALUES = {

    status:
        ROLE_STATUS.ACTIVE,

    roleType:
        ROLE_TYPES.CUSTOM,

    scope:
        ROLE_SCOPES.GLOBAL,

    isSystemRole:
        false,

    isDefault:
        false,

    isDeleted:
        false,

};


/* =========================================================
   VALIDATION
   ========================================================= */

export const ROLE_VALIDATION = {

    CODE_MIN_LENGTH:
        3,

    CODE_MAX_LENGTH:
        50,

    NAME_MIN_LENGTH:
        3,

    NAME_MAX_LENGTH:
        100,

    DESCRIPTION_MAX_LENGTH:
        500,

};


/* =========================================================
   LABELS
   ========================================================= */

export const ROLE_LABELS = {

    ROLE_CODE:
        "Role Code",

    ROLE_NAME:
        "Role Name",

    DESCRIPTION:
        "Description",

    ROLE_TYPE:
        "Role Type",

    SCOPE:
        "Scope",

    STATUS:
        "Status",

    PERMISSIONS:
        "Permissions",

    ASSIGNED_USERS:
        "Assigned Users",

    CREATED_BY:
        "Created By",

    CREATED_AT:
        "Created At",

    UPDATED_BY:
        "Updated By",

    UPDATED_AT:
        "Updated At",

};


/* =========================================================
   DEFAULT PERMISSION FLAGS
   ========================================================= */

export const DEFAULT_PERMISSION_FLAGS = {

    canView:
        false,

    canCreate:
        false,

    canEdit:
        false,

    canDelete:
        false,

    canApprove:
        false,

    canExport:
        false,

};