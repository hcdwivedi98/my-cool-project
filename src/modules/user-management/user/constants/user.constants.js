/* =========================================================
   USER MANAGEMENT CONSTANTS
   ========================================================= */


/* =========================================================
   USER FORM MODES
   ========================================================= */

export const USER_FORM_MODES = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    VIEW: "VIEW",
};


/* =========================================================
   USER STATUS
   ========================================================= */

export const USER_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    SUSPENDED: "SUSPENDED",
};


/* =========================================================
   USER STATUS OPTIONS
   ========================================================= */

export const USER_STATUS_OPTIONS = [
    {
        label: "Active",
        value: USER_STATUS.ACTIVE,
    },

    {
        label: "Inactive",
        value: USER_STATUS.INACTIVE,
    },

    {
        label: "Suspended",
        value: USER_STATUS.SUSPENDED,
    },
];


/* =========================================================
   USER TYPES
   ========================================================= */

export const USER_TYPES = {
    HOSPITAL_STAFF: "HOSPITAL_STAFF",
    CLINICAL_STAFF: "CLINICAL_STAFF",
    NURSING_STAFF: "NURSING_STAFF",
    ADMINISTRATIVE_STAFF: "ADMINISTRATIVE_STAFF",
    SYSTEM_USER: "SYSTEM_USER",
    SUPPORT_USER: "SUPPORT_USER",
};


/* =========================================================
   USER TYPE OPTIONS
   ========================================================= */

export const USER_TYPE_OPTIONS = [
    {
        label: "Hospital Staff",
        value: USER_TYPES.HOSPITAL_STAFF,
    },

    {
        label: "Clinical Staff",
        value: USER_TYPES.CLINICAL_STAFF,
    },

    {
        label: "Nursing Staff",
        value: USER_TYPES.NURSING_STAFF,
    },

    {
        label: "Administrative Staff",
        value: USER_TYPES.ADMINISTRATIVE_STAFF,
    },

    {
        label: "System User",
        value: USER_TYPES.SYSTEM_USER,
    },

    {
        label: "Support User",
        value: USER_TYPES.SUPPORT_USER,
    },
];


/* =========================================================
   PASSWORD STATUS
   ========================================================= */

export const PASSWORD_STATUS = {
    ACTIVE: "ACTIVE",
    RESET_REQUIRED: "RESET_REQUIRED",
    EXPIRED: "EXPIRED",
    LOCKED: "LOCKED",
};


/* =========================================================
   PASSWORD STATUS OPTIONS
   ========================================================= */

export const PASSWORD_STATUS_OPTIONS = [
    {
        label: "Active",
        value: PASSWORD_STATUS.ACTIVE,
    },

    {
        label: "Reset Required",
        value: PASSWORD_STATUS.RESET_REQUIRED,
    },

    {
        label: "Expired",
        value: PASSWORD_STATUS.EXPIRED,
    },

    {
        label: "Locked",
        value: PASSWORD_STATUS.LOCKED,
    },
];


/* =========================================================
   USER USAGE
   ========================================================= */

export const USER_USAGE = {
    ALL: "ALL",
    ACTIVE_LOGIN: "ACTIVE_LOGIN",
    LOGIN_DISABLED: "LOGIN_DISABLED",
};


/* =========================================================
   USER USAGE OPTIONS
   ========================================================= */

export const USER_USAGE_OPTIONS = [
    {
        label: "Login Enabled",
        value: USER_USAGE.ACTIVE_LOGIN,
    },

    {
        label: "Login Disabled",
        value: USER_USAGE.LOGIN_DISABLED,
    },
];


/* =========================================================
   DEFAULT VALUES
   ========================================================= */

export const USER_DEFAULTS = {
    status: USER_STATUS.ACTIVE,

    userType:
        USER_TYPES.HOSPITAL_STAFF,

    loginAllowed: true,

    passwordStatus:
        PASSWORD_STATUS.RESET_REQUIRED,

    mustChangePassword: true,

    failedLoginCount: 0,

    isDeleted: false,

    version: 1,
};


/* =========================================================
   USER CODE PREFIX
   ========================================================= */

export const USER_CODE_PREFIX = "USR";


/* =========================================================
   DEFAULT PAGINATION
   ========================================================= */

export const USER_DEFAULT_PAGE = 1;

export const USER_DEFAULT_PAGE_SIZE = 10;


/* =========================================================
   PAGE SIZE OPTIONS
   ========================================================= */

export const USER_PAGE_SIZE_OPTIONS = [
    10,
    20,
    50,
    100,
];


/* =========================================================
   SORT ORDERS
   ========================================================= */

export const USER_SORT_ORDERS = {
    ASCEND: "ascend",
    DESCEND: "descend",
};


/* =========================================================
   AUDIT ACTIONS
   ========================================================= */

export const USER_AUDIT_ACTIONS = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    ACTIVATE: "ACTIVATE",
    DEACTIVATE: "DEACTIVATE",
    SUSPEND: "SUSPEND",
    UNLOCK: "UNLOCK",
    PASSWORD_RESET: "PASSWORD_RESET",
    ROLE_ASSIGN: "ROLE_ASSIGN",
    ROLE_REMOVE: "ROLE_REMOVE",
};


/* =========================================================
   VALIDATION LIMITS
   ========================================================= */

export const USER_VALIDATION = {

    USER_CODE_MAX_LENGTH: 30,

    USERNAME_MIN_LENGTH: 3,

    USERNAME_MAX_LENGTH: 50,

    EMPLOYEE_ID_MAX_LENGTH: 30,

    FIRST_NAME_MAX_LENGTH: 50,

    MIDDLE_NAME_MAX_LENGTH: 50,

    LAST_NAME_MAX_LENGTH: 50,

    EMAIL_MAX_LENGTH: 150,

    MOBILE_MAX_LENGTH: 15,

    ALTERNATE_MOBILE_MAX_LENGTH: 15,

};


/* =========================================================
   EXPORT GROUP
   ========================================================= */

export default {
    USER_FORM_MODES,

    USER_STATUS,

    USER_STATUS_OPTIONS,

    USER_TYPES,

    USER_TYPE_OPTIONS,

    PASSWORD_STATUS,

    PASSWORD_STATUS_OPTIONS,

    USER_USAGE,

    USER_USAGE_OPTIONS,

    USER_DEFAULTS,

    USER_CODE_PREFIX,

    USER_DEFAULT_PAGE,

    USER_DEFAULT_PAGE_SIZE,

    USER_PAGE_SIZE_OPTIONS,

    USER_SORT_ORDERS,

    USER_AUDIT_ACTIONS,

    USER_VALIDATION,
};