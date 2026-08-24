/* =========================================================
   ROLE MANAGEMENT MOCK DATA
   ========================================================= */

import {
    ROLE_STATUS,
    ROLE_TYPES,
    ROLE_SCOPES,
    ROLE_MODULES,
    ROLE_RESOURCES,
    PERMISSION_STATUS,
} from "../constants/role.constants";


/* =========================================================
   MOCK PERMISSIONS
   ========================================================= */

export const permissionList = [

    /* =====================================================
       DASHBOARD
    ===================================================== */

    {
        id:
            "PERM-001",

        permissionCode:
            "DASHBOARD_VIEW",

        permissionName:
            "View Dashboard",

        moduleCode:
            ROLE_MODULES.DASHBOARD,

        resourceCode:
            ROLE_RESOURCES.DASHBOARD,

        description:
            "View application dashboard.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       USER MANAGEMENT
    ===================================================== */

    {
        id:
            "PERM-002",

        permissionCode:
            "USER_VIEW",

        permissionName:
            "View Users",

        moduleCode:
            ROLE_MODULES.USER_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.USER,

        description:
            "View user records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-003",

        permissionCode:
            "USER_CREATE",

        permissionName:
            "Create Users",

        moduleCode:
            ROLE_MODULES.USER_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.USER,

        description:
            "Create new users.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-004",

        permissionCode:
            "USER_EDIT",

        permissionName:
            "Edit Users",

        moduleCode:
            ROLE_MODULES.USER_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.USER,

        description:
            "Edit existing users.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-005",

        permissionCode:
            "USER_DELETE",

        permissionName:
            "Delete Users",

        moduleCode:
            ROLE_MODULES.USER_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.USER,

        description:
            "Deactivate or remove users.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       ROLE MANAGEMENT
    ===================================================== */

    {
        id:
            "PERM-006",

        permissionCode:
            "ROLE_VIEW",

        permissionName:
            "View Roles",

        moduleCode:
            ROLE_MODULES.ROLE_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.ROLE,

        description:
            "View role records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-007",

        permissionCode:
            "ROLE_CREATE",

        permissionName:
            "Create Roles",

        moduleCode:
            ROLE_MODULES.ROLE_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.ROLE,

        description:
            "Create application roles.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-008",

        permissionCode:
            "ROLE_EDIT",

        permissionName:
            "Edit Roles",

        moduleCode:
            ROLE_MODULES.ROLE_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.ROLE,

        description:
            "Edit application roles.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-009",

        permissionCode:
            "ROLE_DELETE",

        permissionName:
            "Delete Roles",

        moduleCode:
            ROLE_MODULES.ROLE_MANAGEMENT,

        resourceCode:
            ROLE_RESOURCES.ROLE,

        description:
            "Deactivate application roles.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       PHARMACY - DRUG
    ===================================================== */

    {
        id:
            "PERM-010",

        permissionCode:
            "DRUG_VIEW",

        permissionName:
            "View Drug Master",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG,

        description:
            "View drug master records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-011",

        permissionCode:
            "DRUG_CREATE",

        permissionName:
            "Create Drug",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG,

        description:
            "Create drug master records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-012",

        permissionCode:
            "DRUG_EDIT",

        permissionName:
            "Edit Drug",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG,

        description:
            "Edit drug master records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-013",

        permissionCode:
            "DRUG_DELETE",

        permissionName:
            "Delete Drug",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG,

        description:
            "Deactivate drug records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       PHARMACY - DRUG ROUTE
    ===================================================== */

    {
        id:
            "PERM-014",

        permissionCode:
            "DRUG_ROUTE_VIEW",

        permissionName:
            "View Drug Routes",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_ROUTE,

        description:
            "View drug route master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-015",

        permissionCode:
            "DRUG_ROUTE_CREATE",

        permissionName:
            "Create Drug Route",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_ROUTE,

        description:
            "Create drug route records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-016",

        permissionCode:
            "DRUG_ROUTE_EDIT",

        permissionName:
            "Edit Drug Route",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_ROUTE,

        description:
            "Edit drug route records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       PHARMACY - DRUG STRENGTH
    ===================================================== */

    {
        id:
            "PERM-017",

        permissionCode:
            "DRUG_STRENGTH_VIEW",

        permissionName:
            "View Drug Strengths",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_STRENGTH,

        description:
            "View drug strength master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-018",

        permissionCode:
            "DRUG_STRENGTH_CREATE",

        permissionName:
            "Create Drug Strength",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_STRENGTH,

        description:
            "Create drug strength records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-019",

        permissionCode:
            "DRUG_STRENGTH_EDIT",

        permissionName:
            "Edit Drug Strength",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_STRENGTH,

        description:
            "Edit drug strength records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       PHARMACY - DRUG UNIT
    ===================================================== */

    {
        id:
            "PERM-020",

        permissionCode:
            "DRUG_UNIT_VIEW",

        permissionName:
            "View Drug Units",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_UNIT,

        description:
            "View drug unit master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-021",

        permissionCode:
            "DRUG_UNIT_CREATE",

        permissionName:
            "Create Drug Unit",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_UNIT,

        description:
            "Create drug unit records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-022",

        permissionCode:
            "DRUG_UNIT_EDIT",

        permissionName:
            "Edit Drug Unit",

        moduleCode:
            ROLE_MODULES.PHARMACY,

        resourceCode:
            ROLE_RESOURCES.DRUG_UNIT,

        description:
            "Edit drug unit records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       INVENTORY
    ===================================================== */

    {
        id:
            "PERM-023",

        permissionCode:
            "INVENTORY_VIEW",

        permissionName:
            "View Inventory",

        moduleCode:
            ROLE_MODULES.INVENTORY,

        resourceCode:
            ROLE_RESOURCES.INVENTORY,

        description:
            "View current pharmacy inventory.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-024",

        permissionCode:
            "INVENTORY_CREATE",

        permissionName:
            "Create Inventory Transaction",

        moduleCode:
            ROLE_MODULES.INVENTORY,

        resourceCode:
            ROLE_RESOURCES.INVENTORY,

        description:
            "Create inventory transactions.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-025",

        permissionCode:
            "INVENTORY_APPROVE",

        permissionName:
            "Approve Inventory",

        moduleCode:
            ROLE_MODULES.INVENTORY,

        resourceCode:
            ROLE_RESOURCES.INVENTORY,

        description:
            "Approve inventory transactions.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       PURCHASE
    ===================================================== */

    {
        id:
            "PERM-026",

        permissionCode:
            "PURCHASE_REQUISITION_VIEW",

        permissionName:
            "View Purchase Requisitions",

        moduleCode:
            ROLE_MODULES.PURCHASE,

        resourceCode:
            ROLE_RESOURCES.PURCHASE_REQUISITION,

        description:
            "View purchase requisitions.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-027",

        permissionCode:
            "PURCHASE_REQUISITION_CREATE",

        permissionName:
            "Create Purchase Requisition",

        moduleCode:
            ROLE_MODULES.PURCHASE,

        resourceCode:
            ROLE_RESOURCES.PURCHASE_REQUISITION,

        description:
            "Create purchase requisitions.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-028",

        permissionCode:
            "PURCHASE_ORDER_VIEW",

        permissionName:
            "View Purchase Orders",

        moduleCode:
            ROLE_MODULES.PURCHASE,

        resourceCode:
            ROLE_RESOURCES.PURCHASE_ORDER,

        description:
            "View purchase orders.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-029",

        permissionCode:
            "PURCHASE_ORDER_CREATE",

        permissionName:
            "Create Purchase Orders",

        moduleCode:
            ROLE_MODULES.PURCHASE,

        resourceCode:
            ROLE_RESOURCES.PURCHASE_ORDER,

        description:
            "Create purchase orders.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-030",

        permissionCode:
            "PURCHASE_ORDER_APPROVE",

        permissionName:
            "Approve Purchase Orders",

        moduleCode:
            ROLE_MODULES.PURCHASE,

        resourceCode:
            ROLE_RESOURCES.PURCHASE_ORDER,

        description:
            "Approve purchase orders.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       SUPPLIER
    ===================================================== */

    {
        id:
            "PERM-031",

        permissionCode:
            "SUPPLIER_VIEW",

        permissionName:
            "View Suppliers",

        moduleCode:
            ROLE_MODULES.SUPPLIER,

        resourceCode:
            ROLE_RESOURCES.SUPPLIER,

        description:
            "View supplier master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-032",

        permissionCode:
            "SUPPLIER_CREATE",

        permissionName:
            "Create Supplier",

        moduleCode:
            ROLE_MODULES.SUPPLIER,

        resourceCode:
            ROLE_RESOURCES.SUPPLIER,

        description:
            "Create supplier records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-033",

        permissionCode:
            "SUPPLIER_EDIT",

        permissionName:
            "Edit Supplier",

        moduleCode:
            ROLE_MODULES.SUPPLIER,

        resourceCode:
            ROLE_RESOURCES.SUPPLIER,

        description:
            "Edit supplier records.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       ORGANIZATION
    ===================================================== */

    {
        id:
            "PERM-034",

        permissionCode:
            "DEPARTMENT_VIEW",

        permissionName:
            "View Departments",

        moduleCode:
            ROLE_MODULES.ORGANIZATION,

        resourceCode:
            ROLE_RESOURCES.DEPARTMENT,

        description:
            "View department master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-035",

        permissionCode:
            "STORE_VIEW",

        permissionName:
            "View Stores",

        moduleCode:
            ROLE_MODULES.ORGANIZATION,

        resourceCode:
            ROLE_RESOURCES.STORE,

        description:
            "View store master.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },


    /* =====================================================
       REPORTS
    ===================================================== */

    {
        id:
            "PERM-036",

        permissionCode:
            "REPORT_VIEW",

        permissionName:
            "View Reports",

        moduleCode:
            ROLE_MODULES.REPORTS,

        resourceCode:
            ROLE_RESOURCES.REPORT,

        description:
            "View pharmacy reports.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

    {
        id:
            "PERM-037",

        permissionCode:
            "REPORT_EXPORT",

        permissionName:
            "Export Reports",

        moduleCode:
            ROLE_MODULES.REPORTS,

        resourceCode:
            ROLE_RESOURCES.REPORT,

        description:
            "Export pharmacy reports.",

        status:
            PERMISSION_STATUS.ACTIVE,
    },

];


/* =========================================================
   ROLE PERMISSION BUILDER
   ========================================================= */

const createPermission = (
    permissionId,
    flags = {}
) => {

    return {

        id:
            `RP-${permissionId}`,

        permissionId,

        canView:
            flags.canView === true,

        canCreate:
            flags.canCreate === true,

        canEdit:
            flags.canEdit === true,

        canDelete:
            flags.canDelete === true,

        canApprove:
            flags.canApprove === true,

        canExport:
            flags.canExport === true,

        scopeOverride:
            null,

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

    };

};


/* =========================================================
   SYSTEM ADMIN PERMISSIONS
   ========================================================= */

const systemAdminPermissions =
    permissionList.map(
        (
            permission
        ) =>
            createPermission(
                permission.id,
                {
                    canView:
                        true,

                    canCreate:
                        true,

                    canEdit:
                        true,

                    canDelete:
                        true,

                    canApprove:
                        true,

                    canExport:
                        true,
                }
            )
    );


/* =========================================================
   PHARMACY ADMIN PERMISSIONS
   ========================================================= */

const pharmacyAdminPermissionCodes = [

    "PERM-001",

    "PERM-002",
    "PERM-003",
    "PERM-004",
    "PERM-005",

    "PERM-006",
    "PERM-007",
    "PERM-008",

    "PERM-010",
    "PERM-011",
    "PERM-012",
    "PERM-013",

    "PERM-014",
    "PERM-015",
    "PERM-016",

    "PERM-017",
    "PERM-018",
    "PERM-019",

    "PERM-020",
    "PERM-021",
    "PERM-022",

    "PERM-023",
    "PERM-024",
    "PERM-025",

    "PERM-026",
    "PERM-027",
    "PERM-028",
    "PERM-029",
    "PERM-030",

    "PERM-031",
    "PERM-032",
    "PERM-033",

    "PERM-034",
    "PERM-035",

    "PERM-036",
    "PERM-037",

];


const pharmacyAdminPermissions =
    pharmacyAdminPermissionCodes.map(
        (
            permissionId
        ) => {

            const permission =
                permissionList.find(
                    (
                        item
                    ) =>
                        item.id ===
                        permissionId
                );


            const code =
                permission?.permissionCode ||
                "";


            return createPermission(
                permissionId,
                {

                    canView:
                        code.endsWith(
                            "_VIEW"
                        ) ||
                        code.includes(
                            "_VIEW"
                        ),

                    canCreate:
                        code.endsWith(
                            "_CREATE"
                        ),

                    canEdit:
                        code.endsWith(
                            "_EDIT"
                        ),

                    canDelete:
                        code.endsWith(
                            "_DELETE"
                        ),

                    canApprove:
                        code.endsWith(
                            "_APPROVE"
                        ),

                    canExport:
                        code.endsWith(
                            "_EXPORT"
                        ),

                }
            );

        }
    );


/* =========================================================
   PHARMACIST PERMISSIONS
   ========================================================= */

const pharmacistPermissionIds = [

    "PERM-001",

    "PERM-010",

    "PERM-014",

    "PERM-017",

    "PERM-020",

    "PERM-023",

    "PERM-026",

    "PERM-028",

    "PERM-031",

    "PERM-036",

];


const pharmacistPermissions =
    pharmacistPermissionIds.map(
        (
            permissionId
        ) =>
            createPermission(
                permissionId,
                {
                    canView:
                        true,
                }
            )
    );


/* =========================================================
   STORE MANAGER PERMISSIONS
   ========================================================= */

const storeManagerPermissions = [

    createPermission(
        "PERM-001",
        {
            canView: true,
        }
    ),

    createPermission(
        "PERM-023",
        {
            canView: true,
            canCreate: true,
            canApprove: true,
        }
    ),

    createPermission(
        "PERM-025",
        {
            canView: true,
            canApprove: true,
        }
    ),

    createPermission(
        "PERM-031",
        {
            canView: true,
        }
    ),

    createPermission(
        "PERM-036",
        {
            canView: true,
            canExport: true,
        }
    ),

];


/* =========================================================
   PURCHASE MANAGER PERMISSIONS
   ========================================================= */

const purchaseManagerPermissions = [

    createPermission(
        "PERM-001",
        {
            canView: true,
        }
    ),

    createPermission(
        "PERM-026",
        {
            canView: true,
            canCreate: true,
            canEdit: true,
        }
    ),

    createPermission(
        "PERM-027",
        {
            canView: true,
            canCreate: true,
        }
    ),

    createPermission(
        "PERM-028",
        {
            canView: true,
            canCreate: true,
        }
    ),

    createPermission(
        "PERM-029",
        {
            canView: true,
            canCreate: true,
            canEdit: true,
        }
    ),

    createPermission(
        "PERM-030",
        {
            canView: true,
            canApprove: true,
        }
    ),

    createPermission(
        "PERM-031",
        {
            canView: true,
        }
    ),

];


/* =========================================================
   ROLE LIST
   ========================================================= */

export const roleList = [

    /* =====================================================
       SYSTEM ADMIN
    ===================================================== */

    {
        id:
            "ROLE-001",

        roleCode:
            "SYSTEM_ADMIN",

        roleName:
            "System Administrator",

        description:
            "Full administrative access to the hospital pharmacy ERP.",

        roleType:
            ROLE_TYPES.SYSTEM,

        scope:
            ROLE_SCOPES.GLOBAL,

        companyId:
            null,

        centerId:
            null,

        departmentId:
            null,

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            true,

        isDefault:
            true,

        isDeleted:
            false,

        permissionIds:
            systemAdminPermissions.map(
                (
                    item
                ) =>
                    item.permissionId
            ),

        permissions:
            systemAdminPermissions,

        assignedUserCount:
            1,

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

    },


    /* =====================================================
       PHARMACY ADMIN
    ===================================================== */

    {
        id:
            "ROLE-002",

        roleCode:
            "PHARMACY_ADMIN",

        roleName:
            "Pharmacy Administrator",

        description:
            "Administrative access to pharmacy masters and operations.",

        roleType:
            ROLE_TYPES.APPLICATION,

        scope:
            ROLE_SCOPES.GLOBAL,

        companyId:
            null,

        centerId:
            null,

        departmentId:
            null,

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds:
            pharmacyAdminPermissions.map(
                (
                    item
                ) =>
                    item.permissionId
            ),

        permissions:
            pharmacyAdminPermissions,

        assignedUserCount:
            2,

        createdAt:
            "2026-01-02T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-10T11:30:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            2,

    },


    /* =====================================================
       PHARMACIST
    ===================================================== */

    {
        id:
            "ROLE-003",

        roleCode:
            "PHARMACIST",

        roleName:
            "Pharmacist",

        description:
            "Operational pharmacy access for pharmacists.",

        roleType:
            ROLE_TYPES.APPLICATION,

        scope:
            ROLE_SCOPES.STORE,

        companyId:
            "COMP-001",

        centerId:
            "CENTER-001",

        departmentId:
            "DEPT-PHARMACY",

        storeId:
            "STORE-MAIN-PHARMACY",

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            true,

        isDeleted:
            false,

        permissionIds:
            pharmacistPermissions.map(
                (
                    item
                ) =>
                    item.permissionId
            ),

        permissions:
            pharmacistPermissions,

        assignedUserCount:
            8,

        createdAt:
            "2026-01-03T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-03T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

    },


    /* =====================================================
       STORE MANAGER
    ===================================================== */

    {
        id:
            "ROLE-004",

        roleCode:
            "STORE_MANAGER",

        roleName:
            "Store Manager",

        description:
            "Manages pharmacy inventory and store operations.",

        roleType:
            ROLE_TYPES.APPLICATION,

        scope:
            ROLE_SCOPES.STORE,

        companyId:
            "COMP-001",

        centerId:
            "CENTER-001",

        departmentId:
            "DEPT-PHARMACY",

        storeId:
            "STORE-MAIN-PHARMACY",

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds:
            storeManagerPermissions.map(
                (
                    item
                ) =>
                    item.permissionId
            ),

        permissions:
            storeManagerPermissions,

        assignedUserCount:
            3,

        createdAt:
            "2026-01-04T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-04T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

    },


    /* =====================================================
       PURCHASE MANAGER
    ===================================================== */

    {
        id:
            "ROLE-005",

        roleCode:
            "PURCHASE_MANAGER",

        roleName:
            "Purchase Manager",

        description:
            "Manages pharmacy purchasing and supplier operations.",

        roleType:
            ROLE_TYPES.APPLICATION,

        scope:
            ROLE_SCOPES.DEPARTMENT,

        companyId:
            "COMP-001",

        centerId:
            "CENTER-001",

        departmentId:
            "DEPT-PURCHASE",

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds:
            purchaseManagerPermissions.map(
                (
                    item
                ) =>
                    item.permissionId
            ),

        permissions:
            purchaseManagerPermissions,

        assignedUserCount:
            2,

        createdAt:
            "2026-01-05T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-01-05T09:00:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

    },


    /* =====================================================
       INVENTORY VIEWER
    ===================================================== */

    {
        id:
            "ROLE-006",

        roleCode:
            "INVENTORY_VIEWER",

        roleName:
            "Inventory Viewer",

        description:
            "Read-only access to pharmacy inventory.",

        roleType:
            ROLE_TYPES.CUSTOM,

        scope:
            ROLE_SCOPES.STORE,

        companyId:
            "COMP-001",

        centerId:
            "CENTER-001",

        departmentId:
            "DEPT-PHARMACY",

        storeId:
            "STORE-MAIN-PHARMACY",

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds: [
            "PERM-001",
            "PERM-023",
            "PERM-036",
        ],

        permissions: [

            createPermission(
                "PERM-001",
                {
                    canView: true,
                }
            ),

            createPermission(
                "PERM-023",
                {
                    canView: true,
                }
            ),

            createPermission(
                "PERM-036",
                {
                    canView: true,
                }
            ),

        ],

        assignedUserCount:
            4,

        createdAt:
            "2026-01-06T09:00:00.000Z",

        createdBy:
            "ADMIN-001",

        updatedAt:
            "2026-01-06T09:00:00.000Z",

        updatedBy:
            "ADMIN-001",

        version:
            1,

    },


    /* =====================================================
       REPORTING USER
    ===================================================== */

    {
        id:
            "ROLE-007",

        roleCode:
            "REPORTING_USER",

        roleName:
            "Reporting User",

        description:
            "Read-only reporting access with export capability.",

        roleType:
            ROLE_TYPES.CUSTOM,

        scope:
            ROLE_SCOPES.GLOBAL,

        companyId:
            null,

        centerId:
            null,

        departmentId:
            null,

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.ACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds: [
            "PERM-036",
            "PERM-037",
        ],

        permissions: [

            createPermission(
                "PERM-036",
                {
                    canView: true,
                }
            ),

            createPermission(
                "PERM-037",
                {
                    canExport: true,
                }
            ),

        ],

        assignedUserCount:
            1,

        createdAt:
            "2026-01-07T09:00:00.000Z",

        createdBy:
            "ADMIN-001",

        updatedAt:
            "2026-01-07T09:00:00.000Z",

        updatedBy:
            "ADMIN-001",

        version:
            1,

    },


    /* =====================================================
       INACTIVE ROLE
    ===================================================== */

    {
        id:
            "ROLE-008",

        roleCode:
            "LEGACY_PHARMACY_USER",

        roleName:
            "Legacy Pharmacy User",

        description:
            "Deprecated legacy pharmacy access role.",

        roleType:
            ROLE_TYPES.CUSTOM,

        scope:
            ROLE_SCOPES.GLOBAL,

        companyId:
            null,

        centerId:
            null,

        departmentId:
            null,

        storeId:
            null,

        subStoreId:
            null,

        status:
            ROLE_STATUS.INACTIVE,

        isSystemRole:
            false,

        isDefault:
            false,

        isDeleted:
            false,

        permissionIds: [
            "PERM-001",
            "PERM-010",
        ],

        permissions: [

            createPermission(
                "PERM-001",
                {
                    canView: true,
                }
            ),

            createPermission(
                "PERM-010",
                {
                    canView: true,
                }
            ),

        ],

        assignedUserCount:
            0,

        createdAt:
            "2025-06-01T09:00:00.000Z",

        createdBy:
            "ADMIN-001",

        updatedAt:
            "2026-01-08T09:00:00.000Z",

        updatedBy:
            "ADMIN-001",

        version:
            3,

    },

];


/* =========================================================
   USER ROLE ASSIGNMENTS
   ========================================================= */

export const userRoleList = [

    {
        id:
            "UR-001",

        userId:
            "USER-001",

        roleId:
            "ROLE-001",

        isPrimary:
            true,

        assignedAt:
            "2026-01-01T09:00:00.000Z",

        assignedBy:
            "SYSTEM",

        expiresAt:
            null,

        status:
            "ACTIVE",
    },

    {
        id:
            "UR-002",

        userId:
            "USER-002",

        roleId:
            "ROLE-002",

        isPrimary:
            true,

        assignedAt:
            "2026-01-02T09:00:00.000Z",

        assignedBy:
            "USER-001",

        expiresAt:
            null,

        status:
            "ACTIVE",
    },

    {
        id:
            "UR-003",

        userId:
            "USER-003",

        roleId:
            "ROLE-003",

        isPrimary:
            true,

        assignedAt:
            "2026-01-03T09:00:00.000Z",

        assignedBy:
            "USER-001",

        expiresAt:
            null,

        status:
            "ACTIVE",
    },

];


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default roleList;