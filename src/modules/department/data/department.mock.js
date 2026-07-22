export const DEPARTMENT_STATUS = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
};

export const departmentTemplate = {
    id: "",
    departmentCode: "",
    departmentName: "",
    shortName: "",

    departmentType: "",
    category: "",
    costCenter: "",

    hodName: "",
    email: "",
    phoneNumber: "",
    mobileNumber: "",

    building: "",
    floor: "",
    wing: "",
    roomNumber: "",

    workingHours: "",
    shiftType: "",
    priorityLevel: "",

    allowAppointment: false,
    emergencyDepartment: false,
    billingEnabled: false,
    pharmacyIntegration: false,
    laboratoryIntegration: false,

    status: DEPARTMENT_STATUS.ACTIVE,

    documents: [],

    remarks: "",

    createdBy: "System",
    createdOn: "2026-07-20T09:00:00Z",

    modifiedBy: "",
    modifiedOn: "",
};

export const createDepartment = (overrides = {}) => ({
    ...departmentTemplate,
    ...overrides,
});

const departmentMockData = [
    createDepartment({
        id: "DEP001",
        departmentCode: "CARD",
        departmentName: "Cardiology",
        shortName: "CARD",

        departmentType: "Clinical",
        category: "Medical",

        costCenter: "CC-101",

        hodName: "Dr. Amit Sharma",

        email: "cardiology@hospital.com",
        phoneNumber: "0522-4001001",
        mobileNumber: "9876543210",

        building: "Block A",
        floor: "2nd Floor",
        wing: "East",
        roomNumber: "A-201",

        workingHours: "24 x 7",
        shiftType: "Rotational",
        priorityLevel: "High",

        allowAppointment: true,
        emergencyDepartment: true,

        billingEnabled: true,
        pharmacyIntegration: true,
        laboratoryIntegration: true,

        status: DEPARTMENT_STATUS.ACTIVE,

        remarks: "Critical care and cardiac treatment department.",

        documents: [
            {
                id: "DOC001",
                documentName: "NABH Approval",
                category: "Certificate",
                version: "1.0",
                status: "Active",
            },
        ],
    }),

    createDepartment({
        id: "DEP002",
        departmentCode: "RAD",
        departmentName: "Radiology",
        shortName: "RAD",

        departmentType: "Diagnostic",
        category: "Imaging",

        costCenter: "CC-205",

        hodName: "Dr. Neha Gupta",

        email: "radiology@hospital.com",
        phoneNumber: "0522-4001022",
        mobileNumber: "9123456780",

        building: "Block B",
        floor: "Ground Floor",
        wing: "North",
        roomNumber: "B-010",

        workingHours: "08:00 AM - 08:00 PM",
        shiftType: "Morning",
        priorityLevel: "Medium",

        allowAppointment: true,
        emergencyDepartment: false,

        billingEnabled: true,
        pharmacyIntegration: false,
        laboratoryIntegration: true,

        status: DEPARTMENT_STATUS.ACTIVE,

        remarks: "MRI, CT Scan and Ultrasound Unit.",
    }),

    createDepartment({
        id: "DEP003",
        departmentCode: "ADMIN",
        departmentName: "Administration",
        shortName: "ADMIN",

        departmentType: "Non Clinical",
        category: "Administration",

        costCenter: "CC-001",

        hodName: "Mr. Rajesh Singh",

        email: "admin@hospital.com",
        phoneNumber: "0522-4001000",
        mobileNumber: "9988776655",

        building: "Main Block",
        floor: "1st Floor",
        wing: "Central",
        roomNumber: "101",

        workingHours: "09:00 AM - 06:00 PM",
        shiftType: "General",
        priorityLevel: "Low",

        allowAppointment: false,
        emergencyDepartment: false,

        billingEnabled: false,
        pharmacyIntegration: false,
        laboratoryIntegration: false,

        status: DEPARTMENT_STATUS.INACTIVE,

        remarks: "Administrative office.",
    }),

    createDepartment({
        id: "DEP004",
        departmentCode: "LAB",
        departmentName: "Pathology Laboratory",
        shortName: "LAB",

        departmentType: "Diagnostic",
        category: "Laboratory",

        costCenter: "CC-310",

        hodName: "",

        email: "",
        phoneNumber: "0522-4001100",
        mobileNumber: "",

        building: "Block C",
        floor: "Ground Floor",
        wing: "West",
        roomNumber: "C-101",

        workingHours: "24 x 7",
        shiftType: "Rotational",
        priorityLevel: "High",

        allowAppointment: true,
        emergencyDepartment: true,

        billingEnabled: true,
        pharmacyIntegration: true,
        laboratoryIntegration: true,

        status: DEPARTMENT_STATUS.ACTIVE,

        remarks:
            "Department intentionally created with missing HOD and email to test UI validation scenarios.",
    }),

    createDepartment({
        id: "DEP005",
        departmentCode: "PHY",
        departmentName: "Physiotherapy",
        shortName: "PHY",

        departmentType: "Clinical",
        category: "Rehabilitation",

        costCenter: "CC-450",

        hodName: "Dr. Vivek Verma",

        email: "physio@hospital.com",
        phoneNumber: "0522-4001200",
        mobileNumber: "9012345678",

        building: "Block D",
        floor: "1st Floor",
        wing: "South",
        roomNumber: "D-110",

        workingHours: "09:00 AM - 07:00 PM",
        shiftType: "General",
        priorityLevel: "Medium",

        allowAppointment: true,
        emergencyDepartment: false,

        billingEnabled: true,
        pharmacyIntegration: false,
        laboratoryIntegration: false,

        status: DEPARTMENT_STATUS.ACTIVE,

        remarks:
            "This record contains a long description to verify table ellipsis, tooltip behaviour and drawer rendering for lengthy remarks inside the application.",
    }),
];

export default departmentMockData;