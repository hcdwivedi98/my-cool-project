/**
 * Department Master Permissions
 * ----------------------------------------
 * Enterprise RBAC Permission Helpers
 */

export const DEPARTMENT_PERMISSIONS = {
    VIEW: "department.view",
    CREATE: "department.create",
    EDIT: "department.edit",
    DELETE: "department.delete",
    EXPORT: "department.export",
    IMPORT: "department.import",
    PRINT: "department.print",
    APPROVE: "department.approve",
};

/**
 * Generic Permission Checker
 */
export function hasDepartmentPermission(
    permissions = [],
    permission
) {
    if (!Array.isArray(permissions))
        return false;

    return permissions.includes(permission);
}

/**
 * View Permission
 */
export function canViewDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.VIEW
    );
}

/**
 * Create Permission
 */
export function canCreateDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.CREATE
    );
}

/**
 * Edit Permission
 */
export function canEditDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.EDIT
    );
}

/**
 * Delete Permission
 */
export function canDeleteDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.DELETE
    );
}

/**
 * Export Permission
 */
export function canExportDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.EXPORT
    );
}

/**
 * Import Permission
 */
export function canImportDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.IMPORT
    );
}

/**
 * Print Permission
 */
export function canPrintDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.PRINT
    );
}

/**
 * Approve Permission
 */
export function canApproveDepartment(
    permissions = []
) {
    return hasDepartmentPermission(
        permissions,
        DEPARTMENT_PERMISSIONS.APPROVE
    );
}

/**
 * Get All Allowed Actions
 */
export function getDepartmentPermissions(
    permissions = []
) {
    return {
        canView:
            canViewDepartment(permissions),

        canCreate:
            canCreateDepartment(permissions),

        canEdit:
            canEditDepartment(permissions),

        canDelete:
            canDeleteDepartment(permissions),

        canExport:
            canExportDepartment(permissions),

        canImport:
            canImportDepartment(permissions),

        canPrint:
            canPrintDepartment(permissions),

        canApprove:
            canApproveDepartment(permissions),
    };
}