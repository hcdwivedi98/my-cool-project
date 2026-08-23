/* =========================================================
   USER MANAGEMENT HELPERS
   ========================================================= */

import {
    PASSWORD_STATUS,
    USER_STATUS,
    USER_TYPES,
} from "../constants/user.constants";

import {
    userDepartmentList,
    userDesignationList,
    userRoleList,
} from "../mock/user.mock";


/* =========================================================
   GET DEPARTMENT NAME
   ========================================================= */

export const getDepartmentName = (
    departmentId
) => {

    const department =
        userDepartmentList.find(
            (
                item
            ) =>
                item.id ===
                departmentId
        );


    return (
        department?.name ||
        "-"
    );
};


/* =========================================================
   GET DESIGNATION NAME
   ========================================================= */

export const getDesignationName = (
    designationId
) => {

    const designation =
        userDesignationList.find(
            (
                item
            ) =>
                item.id ===
                designationId
        );


    return (
        designation?.name ||
        "-"
    );
};


/* =========================================================
   GET ROLE NAME
   ========================================================= */

export const getRoleName = (
    roleId
) => {

    const role =
        userRoleList.find(
            (
                item
            ) =>
                item.id ===
                roleId
        );


    return (
        role?.name ||
        "-"
    );
};


/* =========================================================
   GET ROLE NAMES
   ========================================================= */

export const getRoleNames = (
    roleIds = []
) => {

    if (
        !Array.isArray(
            roleIds
        )
    ) {
        return [];
    }


    return userRoleList
        .filter(
            (
                role
            ) =>
                roleIds.includes(
                    role.id
                )
        )
        .map(
            (
                role
            ) =>
                role.name
        );
};


/* =========================================================
   GET ROLE DISPLAY TEXT
   ========================================================= */

export const getRoleDisplayText = (
    roleIds = []
) => {

    const roleNames =
        getRoleNames(
            roleIds
        );


    if (
        roleNames.length === 0
    ) {
        return "-";
    }


    return roleNames.join(
        ", "
    );
};


/* =========================================================
   GET USER TYPE LABEL
   ========================================================= */

export const getUserTypeLabel = (
    userType
) => {

    const labels = {

        [USER_TYPES.HOSPITAL_STAFF]:
            "Hospital Staff",

        [USER_TYPES.CLINICAL_STAFF]:
            "Clinical Staff",

        [USER_TYPES.NURSING_STAFF]:
            "Nursing Staff",

        [USER_TYPES.ADMINISTRATIVE_STAFF]:
            "Administrative Staff",

        [USER_TYPES.SYSTEM_USER]:
            "System User",

        [USER_TYPES.SUPPORT_USER]:
            "Support User",

    };


    return (
        labels[userType] ||
        "-"
    );
};


/* =========================================================
   GET STATUS LABEL
   ========================================================= */

export const getUserStatusLabel = (
    status
) => {

    const labels = {

        [USER_STATUS.ACTIVE]:
            "Active",

        [USER_STATUS.INACTIVE]:
            "Inactive",

        [USER_STATUS.SUSPENDED]:
            "Suspended",

    };


    return (
        labels[status] ||
        "-"
    );
};


/* =========================================================
   GET PASSWORD STATUS LABEL
   ========================================================= */

export const getPasswordStatusLabel = (
    status
) => {

    const labels = {

        [PASSWORD_STATUS.ACTIVE]:
            "Active",

        [PASSWORD_STATUS.RESET_REQUIRED]:
            "Reset Required",

        [PASSWORD_STATUS.EXPIRED]:
            "Expired",

        [PASSWORD_STATUS.LOCKED]:
            "Locked",

    };


    return (
        labels[status] ||
        "-"
    );
};


/* =========================================================
   GET STATUS COLOR
   ========================================================= */

export const getUserStatusColor = (
    status
) => {

    const colors = {

        [USER_STATUS.ACTIVE]:
            "success",

        [USER_STATUS.INACTIVE]:
            "default",

        [USER_STATUS.SUSPENDED]:
            "warning",

    };


    return (
        colors[status] ||
        "default"
    );
};


/* =========================================================
   GET PASSWORD STATUS COLOR
   ========================================================= */

export const getPasswordStatusColor = (
    status
) => {

    const colors = {

        [PASSWORD_STATUS.ACTIVE]:
            "success",

        [PASSWORD_STATUS.RESET_REQUIRED]:
            "warning",

        [PASSWORD_STATUS.EXPIRED]:
            "error",

        [PASSWORD_STATUS.LOCKED]:
            "error",

    };


    return (
        colors[status] ||
        "default"
    );
};


/* =========================================================
   LOGIN ACCESS LABEL
   ========================================================= */

export const getLoginAccessLabel = (
    loginAllowed
) => {

    return loginAllowed
        ? "Login Enabled"
        : "Login Disabled";
};


/* =========================================================
   LOGIN ACCESS COLOR
   ========================================================= */

export const getLoginAccessColor = (
    loginAllowed
) => {

    return loginAllowed
        ? "success"
        : "default";
};


/* =========================================================
   FULL USER NAME
   ========================================================= */

export const getUserFullName = (
    user
) => {

    if (!user) {
        return "-";
    }


    const parts = [

        user.firstName,

        user.middleName,

        user.lastName,

    ].filter(
        Boolean
    );


    return (
        parts.join(" ") ||
        user.displayName ||
        "-"
    );
};


/* =========================================================
   USER INITIALS
   ========================================================= */

export const getUserInitials = (
    user
) => {

    const fullName =
        getUserFullName(
            user
        );


    if (
        !fullName ||
        fullName === "-"
    ) {
        return "-";
    }


    const parts =
        fullName
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (
        parts.length === 1
    ) {
        return parts[0]
            .charAt(0)
            .toUpperCase();
    }


    return (
        parts[0].charAt(0) +
        parts[
            parts.length - 1
        ].charAt(0)
    ).toUpperCase();
};


/* =========================================================
   SEARCH USER
   ========================================================= */

export const matchesUserSearch = (
    user,
    search
) => {

    if (
        !search ||
        !search.trim()
    ) {
        return true;
    }


    const keyword =
        search
            .trim()
            .toLowerCase();


    const searchableText = [

        user.userCode,

        user.username,

        user.employeeId,

        user.firstName,

        user.middleName,

        user.lastName,

        user.displayName,

        user.email,

        user.mobileNumber,

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    return searchableText.includes(
        keyword
    );
};


/* =========================================================
   GET USER DISPLAY VALUE
   ========================================================= */

export const getUserDisplayValue = (
    user
) => {

    if (!user) {
        return "-";
    }


    if (
        user.displayName
    ) {
        return user.displayName;
    }


    return getUserFullName(
        user
    );
};


/* =========================================================
   IS USER ACTIVE
   ========================================================= */

export const isUserActive = (
    user
) => {

    return (
        user?.status ===
        USER_STATUS.ACTIVE
    );
};


/* =========================================================
   CAN USER LOGIN
   ========================================================= */

export const canUserLogin = (
    user
) => {

    if (!user) {
        return false;
    }


    return (
        user.status ===
            USER_STATUS.ACTIVE &&
        user.loginAllowed === true &&
        user.passwordStatus !==
            PASSWORD_STATUS.LOCKED
    );
};


/* =========================================================
   IS PASSWORD RESET REQUIRED
   ========================================================= */

export const isPasswordResetRequired = (
    user
) => {

    if (!user) {
        return false;
    }


    return (
        user.mustChangePassword ===
            true ||
        user.passwordStatus ===
            PASSWORD_STATUS.RESET_REQUIRED
    );
};


/* =========================================================
   IS ACCOUNT LOCKED
   ========================================================= */

export const isUserLocked = (
    user
) => {

    return (
        user?.passwordStatus ===
        PASSWORD_STATUS.LOCKED
    );
};


/* =========================================================
   GET PRIMARY ROLE
   ========================================================= */

export const getPrimaryRole = (
    user
) => {

    if (
        !user?.primaryRoleId
    ) {
        return null;
    }


    return (
        userRoleList.find(
            (
                role
            ) =>
                role.id ===
                user.primaryRoleId
        ) || null
    );
};


/* =========================================================
   GET PRIMARY ROLE NAME
   ========================================================= */

export const getPrimaryRoleName = (
    user
) => {

    return (
        getPrimaryRole(
            user
        )?.name ||
        "-"
    );
};


/* =========================================================
   GET USER SUMMARY
   ========================================================= */

export const getUserSummary = (
    user
) => {

    if (!user) {
        return null;
    }


    return {

        name:
            getUserDisplayValue(
                user
            ),

        username:
            user.username ||
            "-",

        employeeId:
            user.employeeId ||
            "-",

        department:
            getDepartmentName(
                user.departmentId
            ),

        designation:
            getDesignationName(
                user.designationId
            ),

        roles:
            getRoleDisplayText(
                user.roleIds
            ),

        status:
            getUserStatusLabel(
                user.status
            ),

        login:
            getLoginAccessLabel(
                user.loginAllowed
            ),

        password:
            getPasswordStatusLabel(
                user.passwordStatus
            ),

    };
};


/* =========================================================
   NORMALIZE USER PAYLOAD
   ========================================================= */

export const normalizeUserPayload = (
    values = {}
) => {

    return {

        userCode:
            values.userCode?.trim() ||
            "",

        username:
            values.username?.trim() ||
            "",

        employeeId:
            values.employeeId?.trim() ||
            "",

        firstName:
            values.firstName?.trim() ||
            "",

        middleName:
            values.middleName?.trim() ||
            "",

        lastName:
            values.lastName?.trim() ||
            "",

        displayName:
            values.displayName?.trim() ||
            "",

        email:
            values.email?.trim() ||
            "",

        mobileNumber:
            values.mobileNumber?.trim() ||
            "",

        alternateMobileNumber:
            values.alternateMobileNumber
                ?.trim() ||
            "",

        userType:
            values.userType ||
            null,

        departmentId:
            values.departmentId ||
            null,

        designationId:
            values.designationId ||
            null,

        roleIds:
            Array.isArray(
                values.roleIds
            )
                ? values.roleIds
                : [],

        primaryRoleId:
            values.primaryRoleId ||
            null,

        status:
            values.status ||
            USER_STATUS.ACTIVE,

        loginAllowed:
            values.loginAllowed !== false,

        mustChangePassword:
            values.mustChangePassword !== false,

    };
};


/* =========================================================
   GENERATE USER CODE
   ========================================================= */

export const generateUserCode = (
    existingUsers = []
) => {

    const prefix = "USR";


    const numbers =
        existingUsers
            .map(
                (
                    user
                ) => {

                    const match =
                        user.userCode?.match(
                            /(\d+)$/
                        );

                    return match
                        ? Number(
                            match[1]
                        )
                        : 0;
                }
            );


    const nextNumber =
        Math.max(
            0,
            ...numbers
        ) + 1;


    return (
        `${prefix}-` +
        String(
            nextNumber
        ).padStart(
            4,
            "0"
        )
    );
};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default {

    getDepartmentName,

    getDesignationName,

    getRoleName,

    getRoleNames,

    getRoleDisplayText,

    getUserTypeLabel,

    getUserStatusLabel,

    getPasswordStatusLabel,

    getUserStatusColor,

    getPasswordStatusColor,

    getLoginAccessLabel,

    getLoginAccessColor,

    getUserFullName,

    getUserInitials,

    matchesUserSearch,

    getUserDisplayValue,

    isUserActive,

    canUserLogin,

    isPasswordResetRequired,

    isUserLocked,

    getPrimaryRole,

    getPrimaryRoleName,

    getUserSummary,

    normalizeUserPayload,

    generateUserCode,

};