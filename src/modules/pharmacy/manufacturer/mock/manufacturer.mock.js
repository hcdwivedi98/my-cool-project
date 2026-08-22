// src/modules/pharmacy/manufacturer/mock/manufacturer.mock.js

export const manufacturerList = [
    {
        id: 1,

        manufacturerCode:
            "MFG-001",

        manufacturerName:
            "ABC Pharmaceuticals Ltd.",

        shortName:
            "ABC Pharma",

        manufacturerType:
            "PHARMACEUTICAL",

        manufacturerCategory:
            "DOMESTIC",

        // ------------------------------------
        // Contact
        // ------------------------------------

        contactPerson:
            "Rajesh Sharma",

        designation:
            "Sales Manager",

        mobile:
            "9876543210",

        alternateMobile:
            "9812345678",

        email:
            "sales@abcpharma.com",

        website:
            "https://www.abcpharma.com",

        // ------------------------------------
        // Address
        // ------------------------------------

        addressLine1:
            "Plot No. 25, Industrial Area",

        addressLine2:
            "Phase II",

        country:
            "INDIA",

        state:
            "DELHI",

        city:
            "NEW_DELHI",

        pinCode:
            "110020",

        // ------------------------------------
        // Regulatory
        // ------------------------------------

        gstin:
            "07ABCDE1234F1Z5",

        pan:
            "ABCDE1234F",

        licenseType:
            "MANUFACTURING_LICENSE",

        licenseNumber:
            "DL-MFG-001234",

        licenseIssueDate:
            "2025-01-15",

        licenseExpiryDate:
            "2028-01-14",

        fssaiLicenseNumber:
            null,

        // ------------------------------------
        // Certifications
        // ------------------------------------

        certifications: [
            {
                id: 1,
                type: "WHO_GMP",
                name: "WHO-GMP Certification",
                certificateNumber:
                    "WHO-GMP-ABC-001",
                issueDate:
                    "2025-03-01",
                expiryDate:
                    "2028-02-29",
            },
            {
                id: 2,
                type: "ISO_9001",
                name: "ISO 9001",
                certificateNumber:
                    "ISO-ABC-9001-001",
                issueDate:
                    "2025-02-01",
                expiryDate:
                    "2028-01-31",
            },
        ],

        // ------------------------------------
        // Commercial
        // ------------------------------------

        paymentTerms:
            "NET_30",

        currency:
            "INR",

        bankName:
            "State Bank of India",

        accountNumber:
            "123456789012",

        ifscCode:
            "SBIN0001234",

        branchName:
            "Okhla Industrial Area",

        // ------------------------------------
        // Business
        // ------------------------------------

        productsCount: 125,

        activeProductsCount: 120,

        status:
            "Active",

        // ------------------------------------
        // Documents
        // ------------------------------------

        documents: [],

        // ------------------------------------
        // Audit
        // ------------------------------------

        createdBy:
            "Admin",

        createdOn:
            "2026-08-01",

        modifiedBy:
            "Admin",

        modifiedOn:
            "2026-08-10",
    },

    {
        id: 2,

        manufacturerCode:
            "MFG-002",

        manufacturerName:
            "XYZ Pharma Ltd.",

        shortName:
            "XYZ Pharma",

        manufacturerType:
            "PHARMACEUTICAL",

        manufacturerCategory:
            "MULTINATIONAL",

        // ------------------------------------
        // Contact
        // ------------------------------------

        contactPerson:
            "Amit Verma",

        designation:
            "Regional Manager",

        mobile:
            "9811112233",

        alternateMobile:
            "9822223344",

        email:
            "contact@xyzpharma.com",

        website:
            "https://www.xyzpharma.com",

        // ------------------------------------
        // Address
        // ------------------------------------

        addressLine1:
            "Industrial Estate, Andheri East",

        addressLine2:
            "MIDC Area",

        country:
            "INDIA",

        state:
            "MAHARASHTRA",

        city:
            "MUMBAI",

        pinCode:
            "400093",

        // ------------------------------------
        // Regulatory
        // ------------------------------------

        gstin:
            "27XYZAB5678G1Z2",

        pan:
            "XYZAB5678G",

        licenseType:
            "MANUFACTURING_LICENSE",

        licenseNumber:
            "MH-MFG-002567",

        licenseIssueDate:
            "2024-06-10",

        licenseExpiryDate:
            "2027-06-09",

        fssaiLicenseNumber:
            null,

        // ------------------------------------
        // Certifications
        // ------------------------------------

        certifications: [
            {
                id: 1,
                type: "GMP",
                name: "GMP Certification",
                certificateNumber:
                    "GMP-XYZ-2025",
                issueDate:
                    "2025-04-10",
                expiryDate:
                    "2028-04-09",
            },
        ],

        // ------------------------------------
        // Commercial
        // ------------------------------------

        paymentTerms:
            "NET_45",

        currency:
            "INR",

        bankName:
            "HDFC Bank",

        accountNumber:
            "987654321012",

        ifscCode:
            "HDFC0000456",

        branchName:
            "Andheri East",

        // ------------------------------------
        // Business
        // ------------------------------------

        productsCount: 86,

        activeProductsCount: 84,

        status:
            "Active",

        documents: [],

        createdBy:
            "Admin",

        createdOn:
            "2026-08-02",

        modifiedBy:
            "Pharmacy Manager",

        modifiedOn:
            "2026-08-11",
    },

    {
        id: 3,

        manufacturerCode:
            "MFG-003",

        manufacturerName:
            "Global Biotech Pharmaceuticals",

        shortName:
            "Global Biotech",

        manufacturerType:
            "BIOLOGICAL",

        manufacturerCategory:
            "DOMESTIC",

        // ------------------------------------
        // Contact
        // ------------------------------------

        contactPerson:
            "Priya Mehta",

        designation:
            "Business Development Manager",

        mobile:
            "9898989898",

        alternateMobile:
            "9797979797",

        email:
            "business@globalbiotech.com",

        website:
            "https://www.globalbiotech.com",

        // ------------------------------------
        // Address
        // ------------------------------------

        addressLine1:
            "Biotech Park, Phase I",

        addressLine2:
            "Genome Valley",

        country:
            "INDIA",

        state:
            "TELANGANA",

        city:
            "HYDERABAD",

        pinCode:
            "500078",

        // ------------------------------------
        // Regulatory
        // ------------------------------------

        gstin:
            "36GLBPT7890H1Z1",

        pan:
            "GLBPT7890H",

        licenseType:
            "MANUFACTURING_LICENSE",

        licenseNumber:
            "TS-BIO-003789",

        licenseIssueDate:
            "2025-02-20",

        licenseExpiryDate:
            "2028-02-19",

        fssaiLicenseNumber:
            null,

        // ------------------------------------
        // Certifications
        // ------------------------------------

        certifications: [
            {
                id: 1,
                type: "WHO_GMP",
                name: "WHO-GMP Certification",
                certificateNumber:
                    "WHO-GMP-GB-001",
                issueDate:
                    "2025-05-01",
                expiryDate:
                    "2028-04-30",
            },
        ],

        // ------------------------------------
        // Commercial
        // ------------------------------------

        paymentTerms:
            "NET_30",

        currency:
            "INR",

        bankName:
            "ICICI Bank",

        accountNumber:
            "456789012345",

        ifscCode:
            "ICIC0000789",

        branchName:
            "Hyderabad",

        // ------------------------------------
        // Business
        // ------------------------------------

        productsCount: 42,

        activeProductsCount: 42,

        status:
            "Active",

        documents: [],

        createdBy:
            "Admin",

        createdOn:
            "2026-08-03",

        modifiedBy:
            "Admin",

        modifiedOn:
            "2026-08-03",
    },

    {
        id: 4,

        manufacturerCode:
            "MFG-004",

        manufacturerName:
            "MediCare Laboratories",

        shortName:
            "MediCare Labs",

        manufacturerType:
            "PHARMACEUTICAL",

        manufacturerCategory:
            "DOMESTIC",

        // ------------------------------------
        // Contact
        // ------------------------------------

        contactPerson:
            "Sanjay Gupta",

        designation:
            "Director",

        mobile:
            "9765432100",

        alternateMobile:
            null,

        email:
            "info@medicarelabs.com",

        website:
            "https://www.medicarelabs.com",

        // ------------------------------------
        // Address
        // ------------------------------------

        addressLine1:
            "Industrial Area, Phase III",

        addressLine2:
            "Near Pharma City",

        country:
            "INDIA",

        state:
            "UTTAR_PRADESH",

        city:
            "LUCKNOW",

        pinCode:
            "226010",

        // ------------------------------------
        // Regulatory
        // ------------------------------------

        gstin:
            "09MEDIC1234J1Z8",

        pan:
            "MEDIC1234J",

        licenseType:
            "MANUFACTURING_LICENSE",

        licenseNumber:
            "UP-MFG-004321",

        licenseIssueDate:
            "2024-08-15",

        licenseExpiryDate:
            "2027-08-14",

        fssaiLicenseNumber:
            null,

        // ------------------------------------
        // Certifications
        // ------------------------------------

        certifications: [
            {
                id: 1,
                type: "GMP",
                name: "GMP Certification",
                certificateNumber:
                    "GMP-MCL-2025",
                issueDate:
                    "2025-06-01",
                expiryDate:
                    "2028-05-31",
            },
        ],

        // ------------------------------------
        // Commercial
        // ------------------------------------

        paymentTerms:
            "NET_30",

        currency:
            "INR",

        bankName:
            "Axis Bank",

        accountNumber:
            "567890123456",

        ifscCode:
            "UTIB0000123",

        branchName:
            "Lucknow",

        // ------------------------------------
        // Business
        // ------------------------------------

        productsCount: 34,

        activeProductsCount: 31,

        status:
            "Inactive",

        documents: [],

        createdBy:
            "Admin",

        createdOn:
            "2026-08-04",

        modifiedBy:
            "Admin",

        modifiedOn:
            "2026-08-04",
    },
];

/*
 * ============================================
 * Statistics
 * ============================================
 */

export const manufacturerStatistics = {
    total:
        manufacturerList.length,

    active:
        manufacturerList.filter(
            (item) =>
                item.status ===
                "Active"
        ).length,

    inactive:
        manufacturerList.filter(
            (item) =>
                item.status ===
                "Inactive"
        ).length,

    pharmaceutical:
        manufacturerList.filter(
            (item) =>
                item.manufacturerType ===
                "PHARMACEUTICAL"
        ).length,

    biological:
        manufacturerList.filter(
            (item) =>
                item.manufacturerType ===
                "BIOLOGICAL"
        ).length,

    totalProducts:
        manufacturerList.reduce(
            (
                total,
                item
            ) =>
                total +
                (item.productsCount ||
                    0),
            0
        ),
};

/*
 * ============================================
 * Documents
 * ============================================
 */

export const manufacturerDocuments =
    [];

/*
 * ============================================
 * Default Export
 * ============================================
 */

export default manufacturerList;