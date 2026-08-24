// src/modules/user-management/permission/mock/permission.mock.js

import {
    PERMISSION_ACTIONS,
    PERMISSION_MODULES,
    PERMISSION_SCOPES,
    PERMISSION_STATUS,
    PERMISSION_TYPES,
} from "../constants/permission.constants";


/* =========================================================
   PERMISSION LIST
   ========================================================= */

export const permissionList = [

    /* =====================================================
       DASHBOARD
       ===================================================== */

    {
        id:
            "PERM-001",

        permissionCode:
            "DASHBOARD.VIEW",

        permissionName:
            "Dashboard",

        moduleCode:
            PERMISSION_MODULES.DASHBOARD,

        resourceCode:
            "DASHBOARD",

        description:
            "View the application dashboard.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            10,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       PURCHASE REQUISITION
       ===================================================== */

    {
        id:
            "PERM-002",

        permissionCode:
            "PURCHASE.REQUISITION",

        permissionName:
            "Purchase Requisition",

        moduleCode:
            PERMISSION_MODULES.PURCHASE,

        resourceCode:
            "PURCHASE_REQUISITION",

        description:
            "Manage purchase requisitions.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.APPROVE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.COMPANY,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            20,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       PURCHASE ORDER
       ===================================================== */

    {
        id:
            "PERM-003",

        permissionCode:
            "PURCHASE.ORDER",

        permissionName:
            "Purchase Order",

        moduleCode:
            PERMISSION_MODULES.PURCHASE,

        resourceCode:
            "PURCHASE_ORDER",

        description:
            "Manage purchase orders.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.APPROVE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.COMPANY,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            30,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       GRN
       ===================================================== */

    {
        id:
            "PERM-004",

        permissionCode:
            "PURCHASE.GRN",

        permissionName:
            "Goods Receipt Note",

        moduleCode:
            PERMISSION_MODULES.PURCHASE,

        resourceCode:
            "GRN",

        description:
            "Manage goods receipt notes.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.APPROVE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.STORE,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            40,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       INVENTORY
       ===================================================== */

    {
        id:
            "PERM-005",

        permissionCode:
            "INVENTORY.STOCK",

        permissionName:
            "Stock Management",

        moduleCode:
            PERMISSION_MODULES.INVENTORY,

        resourceCode:
            "STOCK",

        description:
            "Manage pharmacy inventory stock.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.STORE,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            50,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       STOCK TRANSFER
       ===================================================== */

    {
        id:
            "PERM-006",

        permissionCode:
            "INVENTORY.STOCK_TRANSFER",

        permissionName:
            "Stock Transfer",

        moduleCode:
            PERMISSION_MODULES.INVENTORY,

        resourceCode:
            "STOCK_TRANSFER",

        description:
            "Transfer stock between stores and sub stores.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.APPROVE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.STORE,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            60,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       EXPIRY MANAGEMENT
       ===================================================== */

    {
        id:
            "PERM-007",

        permissionCode:
            "INVENTORY.EXPIRY",

        permissionName:
            "Expiry Management",

        moduleCode:
            PERMISSION_MODULES.INVENTORY,

        resourceCode:
            "EXPIRY_MANAGEMENT",

        description:
            "Manage expired and near-expiry inventory.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.STORE,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            70,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       SUPPLIER
       ===================================================== */

    {
        id:
            "PERM-008",

        permissionCode:
            "SUPPLIER.MASTER",

        permissionName:
            "Supplier Master",

        moduleCode:
            PERMISSION_MODULES.SUPPLIER,

        resourceCode:
            "SUPPLIER",

        description:
            "Manage supplier master records.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.COMPANY,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            80,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       MANUFACTURER
       ===================================================== */

    {
        id:
            "PERM-009",

        permissionCode:
            "PHARMACY.MANUFACTURER",

        permissionName:
            "Manufacturer Master",

        moduleCode:
            PERMISSION_MODULES.PHARMACY,

        resourceCode:
            "MANUFACTURER",

        description:
            "Manage pharmaceutical manufacturer records.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            90,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       DRUG MASTER
       ===================================================== */

    {
        id:
            "PERM-010",

        permissionCode:
            "PHARMACY.DRUG",

        permissionName:
            "Drug Master",

        moduleCode:
            PERMISSION_MODULES.PHARMACY,

        resourceCode:
            "DRUG",

        description:
            "Manage drug master records.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            100,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       DRUG CATEGORY
       ===================================================== */

    {
        id:
            "PERM-011",

        permissionCode:
            "PHARMACY.DRUG_CATEGORY",

        permissionName:
            "Drug Category Master",

        moduleCode:
            PERMISSION_MODULES.PHARMACY,

        resourceCode:
            "DRUG_CATEGORY",

        description:
            "Manage drug category definitions.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            110,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       DRUG STRENGTH
       ===================================================== */

    {
        id:
            "PERM-012",

        permissionCode:
            "PHARMACY.DRUG_STRENGTH",

        permissionName:
            "Drug Strength Master",

        moduleCode:
            PERMISSION_MODULES.PHARMACY,

        resourceCode:
            "DRUG_STRENGTH",

        description:
            "Manage drug strength definitions.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            120,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER MASTER
       ===================================================== */

    {
        id:
            "PERM-013",

        permissionCode:
            "USER_MANAGEMENT.USER",

        permissionName:
            "User Management",

        moduleCode:
            PERMISSION_MODULES.USER_MANAGEMENT,

        resourceCode:
            "USER",

        description:
            "Manage application users.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            130,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       ROLE MASTER
       ===================================================== */

    {
        id:
            "PERM-014",

        permissionCode:
            "USER_MANAGEMENT.ROLE",

        permissionName:
            "Role Management",

        moduleCode:
            PERMISSION_MODULES.USER_MANAGEMENT,

        resourceCode:
            "ROLE",

        description:
            "Manage application roles and permissions.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.APPROVE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            140,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       PERMISSION MASTER
       ===================================================== */

    {
        id:
            "PERM-015",

        permissionCode:
            "USER_MANAGEMENT.PERMISSION",

        permissionName:
            "Permission Management",

        moduleCode:
            PERMISSION_MODULES.USER_MANAGEMENT,

        resourceCode:
            "PERMISSION",

        description:
            "Manage application permission definitions.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.CREATE,

            PERMISSION_ACTIONS.EDIT,

            PERMISSION_ACTIONS.DELETE,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            150,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       REPORTS
       ===================================================== */

    {
        id:
            "PERM-016",

        permissionCode:
            "REPORTS.VIEW",

        permissionName:
            "Reports",

        moduleCode:
            PERMISSION_MODULES.REPORTS,

        resourceCode:
            "REPORT",

        description:
            "View and export application reports.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.EXPORT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            160,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       SETTINGS
       ===================================================== */

    {
        id:
            "PERM-017",

        permissionCode:
            "SETTINGS.SYSTEM",

        permissionName:
            "System Settings",

        moduleCode:
            PERMISSION_MODULES.SETTINGS,

        resourceCode:
            "SYSTEM_SETTINGS",

        description:
            "Manage system configuration settings.",

        actions: [

            PERMISSION_ACTIONS.VIEW,

            PERMISSION_ACTIONS.EDIT,

        ],

        scope:
            PERMISSION_SCOPES.GLOBAL,

        status:
            PERMISSION_STATUS.ACTIVE,

        permissionType:
            PERMISSION_TYPES.SYSTEM,

        isSystemPermission:
            true,

        sortOrder:
            170,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-01T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },

];


/* =========================================================
   MODULE OPTIONS FROM MOCK
   ========================================================= */

export const permissionModuleList = [

    ...new Set(
        permissionList.map(
            (
                permission
            ) =>
                permission.moduleCode
        )
    ),

];


/* =========================================================
   RESOURCE OPTIONS FROM MOCK
   ========================================================= */

export const permissionResourceList = [

    ...new Set(
        permissionList.map(
            (
                permission
            ) =>
                permission.resourceCode
        )
    ),

];


/* =========================================================
   ACTIVE PERMISSIONS
   ========================================================= */

export const activePermissionList =
    permissionList.filter(
        (
            permission
        ) =>
            permission.status ===
            PERMISSION_STATUS.ACTIVE &&
            permission.isDeleted !== true
    );


/* =========================================================
   SYSTEM PERMISSIONS
   ========================================================= */

export const systemPermissionList =
    permissionList.filter(
        (
            permission
        ) =>
            permission.isSystemPermission ===
            true
    );


/* =========================================================
   CUSTOM PERMISSIONS
   ========================================================= */

export const customPermissionList =
    permissionList.filter(
        (
            permission
        ) =>
            permission.permissionType ===
            PERMISSION_TYPES.CUSTOM
    );


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default permissionList;