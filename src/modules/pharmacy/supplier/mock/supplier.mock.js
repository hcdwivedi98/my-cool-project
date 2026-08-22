// src/modules/pharmacy/supplier/mock/supplier.mock.js

export const supplierList = [
    {
        id: 1,

        supplierCode: "SUP-0001",
        supplierName: "ABC Pharma Distributors",

        supplierType: "DISTRIBUTOR",
        supplierCategory: "PHARMACEUTICAL",

        status: "Active",

        // Contact
        contactPerson: "Rajesh Kumar",
        mobile: "9876543210",
        alternateMobile: "9812345678",
        email: "contact@abcpharma.com",
        website: "https://www.abcpharma.com",

        // Address
        addressLine1: "123 Medical Market",
        addressLine2: "Near Central Hospital",
        city: "New Delhi",
        state: "Delhi",
        country: "IN",
        pinCode: "110001",

        // Tax & Regulatory
        gstin: "07ABCDE1234F1Z5",
        pan: "ABCDE1234F",

        drugLicenseNumber:
            "DL-DEL-000123",
        drugLicenseExpiry:
            "2028-12-31",

        licenseType:
            "WHOLESALE_DRUG",

        fssaiLicense: null,

        otherRegistration:
            "REG-ABC-001",

        // Commercial
        paymentTerms: "CREDIT",
        creditDays: 30,
        currency: "INR",

        // Bank
        bankName: "HDFC Bank",
        accountNumber:
            "XXXXXXXXXXXX1234",
        ifscCode: "HDFC0001234",
        branchName: "Connaught Place",

        // Documents
        documents: [],

        // Audit
        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-10",
    },

    {
        id: 2,

        supplierCode: "SUP-0002",
        supplierName: "XYZ Medical Distributors",

        supplierType: "WHOLESALER",
        supplierCategory: "PHARMACEUTICAL",

        status: "Active",

        // Contact
        contactPerson: "Amit Sharma",
        mobile: "9876543211",
        alternateMobile: "",
        email: "sales@xyzmedical.com",
        website: "",

        // Address
        addressLine1:
            "45 Wholesale Market",
        addressLine2:
            "Industrial Area",
        city: "Gurugram",
        state: "Haryana",
        country: "IN",
        pinCode: "122001",

        // Tax & Regulatory
        gstin: "06XYZAB5678G1Z2",
        pan: "XYZAB5678G",

        drugLicenseNumber:
            "DL-HR-000456",
        drugLicenseExpiry:
            "2027-09-30",

        licenseType:
            "WHOLESALE_DRUG",

        fssaiLicense: null,

        otherRegistration: "",

        // Commercial
        paymentTerms: "CREDIT",
        creditDays: 45,
        currency: "INR",

        // Bank
        bankName: "ICICI Bank",
        accountNumber:
            "XXXXXXXXXXXX5678",
        ifscCode: "ICIC0004567",
        branchName: "MG Road",

        // Documents
        documents: [],

        // Audit
        createdBy: "Admin",
        createdOn: "2026-08-02",

        modifiedBy:
            "Pharmacy Manager",
        modifiedOn: "2026-08-11",
    },

    {
        id: 3,

        supplierCode: "SUP-0003",
        supplierName:
            "Global Healthcare Imports",

        supplierType: "IMPORTER",
        supplierCategory:
            "MEDICAL_DEVICE",

        status: "Active",

        // Contact
        contactPerson: "Priya Mehta",
        mobile: "9876543212",
        alternateMobile: "",
        email: "info@globalhealthcare.com",
        website:
            "https://www.globalhealthcare.com",

        // Address
        addressLine1:
            "12 Export Import Complex",
        addressLine2: "Airport Road",
        city: "Mumbai",
        state: "Maharashtra",
        country: "IN",
        pinCode: "400099",

        // Tax & Regulatory
        gstin: "27GHIJK9012L1Z8",
        pan: "GHIJK9012L",

        drugLicenseNumber:
            "IMP-MH-000789",
        drugLicenseExpiry:
            "2029-03-31",

        licenseType: "IMPORT",

        fssaiLicense: null,

        otherRegistration:
            "IEC-GHI-123456",

        // Commercial
        paymentTerms: "ADVANCE",
        creditDays: 0,
        currency: "INR",

        // Bank
        bankName: "Axis Bank",
        accountNumber:
            "XXXXXXXXXXXX7890",
        ifscCode: "UTIB0007890",
        branchName: "Andheri",

        // Documents
        documents: [],

        // Audit
        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 4,

        supplierCode: "SUP-0004",
        supplierName:
            "MediCare Surgical Supplies",

        supplierType: "DISTRIBUTOR",
        supplierCategory: "SURGICAL",

        status: "Active",

        // Contact
        contactPerson: "Sanjay Verma",
        mobile: "9876543213",
        alternateMobile: "",
        email: "support@medicaresurgical.com",
        website: "",

        // Address
        addressLine1:
            "78 Surgical Market",
        addressLine2:
            "Civil Lines",
        city: "Lucknow",
        state: "Uttar Pradesh",
        country: "IN",
        pinCode: "226001",

        // Tax & Regulatory
        gstin: "09MNOPQ3456R1Z4",
        pan: "MNOPQ3456R",

        drugLicenseNumber: null,
        drugLicenseExpiry: null,

        licenseType: "OTHER",

        fssaiLicense: null,

        otherRegistration:
            "SURGICAL-REG-004",

        // Commercial
        paymentTerms: "CREDIT",
        creditDays: 30,
        currency: "INR",

        // Bank
        bankName: "State Bank of India",
        accountNumber:
            "XXXXXXXXXXXX4567",
        ifscCode: "SBIN0004567",
        branchName: "Hazratganj",

        // Documents
        documents: [],

        // Audit
        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },

    {
        id: 5,

        supplierCode: "SUP-0005",
        supplierName:
            "National Pharma Manufacturing",

        supplierType: "MANUFACTURER",
        supplierCategory:
            "PHARMACEUTICAL",

        status: "Inactive",

        // Contact
        contactPerson: "Vikas Gupta",
        mobile: "9876543214",
        alternateMobile: "",
        email: "sales@nationalpharma.com",
        website: "",

        // Address
        addressLine1:
            "Industrial Estate",
        addressLine2:
            "Phase II",
        city: "Ahmedabad",
        state: "Gujarat",
        country: "IN",
        pinCode: "380015",

        // Tax & Regulatory
        gstin: "24STUVW7890X1Z6",
        pan: "STUVW7890X",

        drugLicenseNumber:
            "MFG-GJ-000555",
        drugLicenseExpiry:
            "2026-12-31",

        licenseType:
            "MANUFACTURING",

        fssaiLicense: null,

        otherRegistration:
            "MFG-REG-005",

        // Commercial
        paymentTerms: "CREDIT",
        creditDays: 60,
        currency: "INR",

        // Bank
        bankName: "Bank of Baroda",
        accountNumber:
            "XXXXXXXXXXXX8901",
        ifscCode: "BARB0008901",
        branchName: "Navrangpura",

        // Documents
        documents: [],

        // Audit
        createdBy: "Admin",
        createdOn: "2026-08-05",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-05",
    },
];

export const supplierStatistics = {
    total: supplierList.length,

    active: supplierList.filter(
        (item) =>
            item.status === "Active"
    ).length,

    inactive: supplierList.filter(
        (item) =>
            item.status === "Inactive"
    ).length,

    manufacturers:
        supplierList.filter(
            (item) =>
                item.supplierType ===
                "MANUFACTURER"
        ).length,

    distributors:
        supplierList.filter(
            (item) =>
                item.supplierType ===
                "DISTRIBUTOR"
        ).length,
};

export const supplierDocuments = [];

export default supplierList;