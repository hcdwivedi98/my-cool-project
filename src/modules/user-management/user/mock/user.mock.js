/* =========================================================
   USER MANAGEMENT MOCK DATA
   ========================================================= */

import {
    PASSWORD_STATUS,
    USER_STATUS,
    USER_TYPES,
} from "../constants/user.constants";


/* =========================================================
   DEPARTMENTS
   ========================================================= */

export const userDepartmentList = [

    {
        id: "DEPT-001",
        code: "PHARMACY",
        name: "Pharmacy",
        isActive: true,
    },

    {
        id: "DEPT-002",
        code: "OPD",
        name: "Out Patient Department",
        isActive: true,
    },

    {
        id: "DEPT-003",
        code: "IPD",
        name: "In Patient Department",
        isActive: true,
    },

    {
        id: "DEPT-004",
        code: "NURSING",
        name: "Nursing",
        isActive: true,
    },

    {
        id: "DEPT-005",
        code: "ADMIN",
        name: "Administration",
        isActive: true,
    },

];


/* =========================================================
   DESIGNATIONS
   ========================================================= */

export const userDesignationList = [

    {
        id: "DESIG-001",
        code: "PHARMACIST",
        name: "Pharmacist",
        departmentId: "DEPT-001",
        isActive: true,
    },

    {
        id: "DESIG-002",
        code: "PHARMACY-MGR",
        name: "Pharmacy Manager",
        departmentId: "DEPT-001",
        isActive: true,
    },

    {
        id: "DESIG-003",
        code: "DOCTOR",
        name: "Medical Officer",
        departmentId: "DEPT-002",
        isActive: true,
    },

    {
        id: "DESIG-004",
        code: "STAFF-NURSE",
        name: "Staff Nurse",
        departmentId: "DEPT-004",
        isActive: true,
    },

    {
        id: "DESIG-005",
        code: "ADMIN-OFFICER",
        name: "Administrative Officer",
        departmentId: "DEPT-005",
        isActive: true,
    },

];


/* =========================================================
   ROLES
   ========================================================= */

export const userRoleList = [

    {
        id: "ROLE-001",
        code: "SUPER_ADMIN",
        name: "Super Administrator",
        isActive: true,
    },

    {
        id: "ROLE-002",
        code: "PHARMACY_ADMIN",
        name: "Pharmacy Administrator",
        isActive: true,
    },

    {
        id: "ROLE-003",
        code: "PHARMACIST",
        name: "Pharmacist",
        isActive: true,
    },

    {
        id: "ROLE-004",
        code: "DOCTOR",
        name: "Doctor",
        isActive: true,
    },

    {
        id: "ROLE-005",
        code: "NURSE",
        name: "Nurse",
        isActive: true,
    },

];


/* =========================================================
   USERS
   ========================================================= */

export const userList = [

    /* =====================================================
       USER 1
    ===================================================== */

    {
        id: "USER-001",

        userCode: "USR-0001",

        username: "admin",

        employeeId: "EMP-0001",

        firstName: "System",

        middleName: "",

        lastName: "Administrator",

        displayName: "System Administrator",

        email: "admin@hospital.local",

        mobileNumber: "9876543201",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.SYSTEM_USER,

        departmentId:
            "DEPT-005",

        designationId:
            "DESIG-005",

        roleIds: [
            "ROLE-001",
        ],

        primaryRoleId:
            "ROLE-001",

        status:
            USER_STATUS.ACTIVE,

        loginAllowed:
            true,

        passwordStatus:
            PASSWORD_STATUS.ACTIVE,

        mustChangePassword:
            false,

        failedLoginCount:
            0,

        lastLoginAt:
            "2026-08-22T09:15:00.000Z",

        lastPasswordChangedAt:
            "2026-07-15T10:00:00.000Z",

        accountLockedUntil:
            null,

        createdAt:
            "2026-01-01T09:00:00.000Z",

        createdBy:
            "SYSTEM",

        updatedAt:
            "2026-08-22T09:15:00.000Z",

        updatedBy:
            "SYSTEM",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER 2
    ===================================================== */

    {
        id: "USER-002",

        userCode: "USR-0002",

        username: "pharmacist01",

        employeeId: "EMP-1025",

        firstName: "Raj",

        middleName: "",

        lastName: "Kumar",

        displayName: "Raj Kumar",

        email: "raj.kumar@hospital.local",

        mobileNumber: "9876543210",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.HOSPITAL_STAFF,

        departmentId:
            "DEPT-001",

        designationId:
            "DESIG-001",

        roleIds: [
            "ROLE-003",
        ],

        primaryRoleId:
            "ROLE-003",

        status:
            USER_STATUS.ACTIVE,

        loginAllowed:
            true,

        passwordStatus:
            PASSWORD_STATUS.ACTIVE,

        mustChangePassword:
            false,

        failedLoginCount:
            0,

        lastLoginAt:
            "2026-08-22T08:45:00.000Z",

        lastPasswordChangedAt:
            "2026-07-20T08:30:00.000Z",

        accountLockedUntil:
            null,

        createdAt:
            "2026-02-10T09:00:00.000Z",

        createdBy:
            "USER-001",

        updatedAt:
            "2026-08-22T08:45:00.000Z",

        updatedBy:
            "USER-001",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER 3
    ===================================================== */

    {
        id: "USER-003",

        userCode: "USR-0003",

        username: "pharmacy.manager",

        employeeId: "EMP-1026",

        firstName: "Priya",

        middleName: "",

        lastName: "Sharma",

        displayName: "Priya Sharma",

        email: "priya.sharma@hospital.local",

        mobileNumber: "9876543211",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.HOSPITAL_STAFF,

        departmentId:
            "DEPT-001",

        designationId:
            "DESIG-002",

        roleIds: [
            "ROLE-002",
            "ROLE-003",
        ],

        primaryRoleId:
            "ROLE-002",

        status:
            USER_STATUS.ACTIVE,

        loginAllowed:
            true,

        passwordStatus:
            PASSWORD_STATUS.ACTIVE,

        mustChangePassword:
            false,

        failedLoginCount:
            0,

        lastLoginAt:
            "2026-08-21T16:30:00.000Z",

        lastPasswordChangedAt:
            "2026-07-18T11:00:00.000Z",

        accountLockedUntil:
            null,

        createdAt:
            "2026-02-15T09:30:00.000Z",

        createdBy:
            "USER-001",

        updatedAt:
            "2026-08-21T16:30:00.000Z",

        updatedBy:
            "USER-001",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER 4
    ===================================================== */

    {
        id: "USER-004",

        userCode: "USR-0004",

        username: "doctor01",

        employeeId: "EMP-2010",

        firstName: "Amit",

        middleName: "",

        lastName: "Verma",

        displayName: "Dr. Amit Verma",

        email: "amit.verma@hospital.local",

        mobileNumber: "9876543212",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.CLINICAL_STAFF,

        departmentId:
            "DEPT-002",

        designationId:
            "DESIG-003",

        roleIds: [
            "ROLE-004",
        ],

        primaryRoleId:
            "ROLE-004",

        status:
            USER_STATUS.ACTIVE,

        loginAllowed:
            true,

        passwordStatus:
            PASSWORD_STATUS.RESET_REQUIRED,

        mustChangePassword:
            true,

        failedLoginCount:
            0,

        lastLoginAt:
            null,

        lastPasswordChangedAt:
            null,

        accountLockedUntil:
            null,

        createdAt:
            "2026-03-01T10:00:00.000Z",

        createdBy:
            "USER-001",

        updatedAt:
            "2026-03-01T10:00:00.000Z",

        updatedBy:
            "USER-001",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER 5
    ===================================================== */

    {
        id: "USER-005",

        userCode: "USR-0005",

        username: "nurse01",

        employeeId: "EMP-3012",

        firstName: "Neha",

        middleName: "",

        lastName: "Singh",

        displayName: "Neha Singh",

        email: "neha.singh@hospital.local",

        mobileNumber: "9876543213",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.NURSING_STAFF,

        departmentId:
            "DEPT-004",

        designationId:
            "DESIG-004",

        roleIds: [
            "ROLE-005",
        ],

        primaryRoleId:
            "ROLE-005",

        status:
            USER_STATUS.ACTIVE,

        loginAllowed:
            true,

        passwordStatus:
            PASSWORD_STATUS.ACTIVE,

        mustChangePassword:
            false,

        failedLoginCount:
            0,

        lastLoginAt:
            "2026-08-22T07:45:00.000Z",

        lastPasswordChangedAt:
            "2026-07-25T08:00:00.000Z",

        accountLockedUntil:
            null,

        createdAt:
            "2026-03-05T09:00:00.000Z",

        createdBy:
            "USER-001",

        updatedAt:
            "2026-08-22T07:45:00.000Z",

        updatedBy:
            "USER-001",

        version:
            1,

        isDeleted:
            false,
    },


    /* =====================================================
       USER 6
    ===================================================== */

    {
        id: "USER-006",

        userCode: "USR-0006",

        username: "reception01",

        employeeId: "EMP-4015",

        firstName: "Anjali",

        middleName: "",

        lastName: "Gupta",

        displayName: "Anjali Gupta",

        email: "anjali.gupta@hospital.local",

        mobileNumber: "9876543214",

        alternateMobileNumber: "",

        userType:
            USER_TYPES.ADMINISTRATIVE_STAFF,

        departmentId:
            "DEPT-005",

        designationId:
            "DESIG-005",

        roleIds: [],

        primaryRoleId:
            null,

        status:
            USER_STATUS.INACTIVE,

        loginAllowed:
            false,

        passwordStatus:
            PASSWORD_STATUS.LOCKED,

        mustChangePassword:
            false,

        failedLoginCount:
            5,

        lastLoginAt:
            "2026-07-20T12:00:00.000Z",

        lastPasswordChangedAt:
            "2026-06-15T09:00:00.000Z",

        accountLockedUntil:
            "2026-08-25T09:00:00.000Z",

        createdAt:
            "2026-03-10T09:00:00.000Z",

        createdBy:
            "USER-001",

        updatedAt:
            "2026-08-20T10:00:00.000Z",

        updatedBy:
            "USER-001",

        version:
            2,

        isDeleted:
            false,
    },

];


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default userList;