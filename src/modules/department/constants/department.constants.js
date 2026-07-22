export const DEPARTMENT_TYPES = [
    { label: "Clinical", value: "CLINICAL" },
    { label: "Non Clinical", value: "NON_CLINICAL" },
    { label: "Support", value: "SUPPORT" },
];

export const STATUS_OPTIONS = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
];

export const BUILDINGS = [
    { label: "Main Building", value: "MAIN" },
    { label: "Block A", value: "BLOCK_A" },
    { label: "Block B", value: "BLOCK_B" },
];

export const FLOORS = [
    { label: "Ground Floor", value: "GROUND" },
    { label: "First Floor", value: "FIRST" },
    { label: "Second Floor", value: "SECOND" },
    { label: "Third Floor", value: "THIRD" },
];

export const DEFAULT_VALUES = {
    code: "",
    name: "",
    centerId: null,
    departmentType: null,
    parentDepartmentId: null,

    contactPerson: "",
    designation: "",
    phoneNumber: "",
    mobileNumber: "",
    extensionNumber: "",
    email: "",
    alternateEmail: "",
    emergencyContactName: "",
    emergencyContactNumber: "",

    building: null,
    floor: null,
    wing: "",
    block: "",
    roomNumber: "",
    locationCode: "",
    locationDescription: "",

    isActive: true,
    remarks: "",
};

export const SEARCH_PLACEHOLDER =
    "Search by Department Code / Name";