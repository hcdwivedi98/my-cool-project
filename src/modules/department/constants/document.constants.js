/**
 * ==========================================================
 * Department Document Constants
 * ==========================================================
 */

/**
 * Allowed Document Categories
 */
export const DOCUMENT_CATEGORIES = [
    {
        label: "License",
        value: "LICENSE",
    },
    {
        label: "Approval",
        value: "APPROVAL",
    },
    {
        label: "Certificate",
        value: "CERTIFICATE",
    },
    {
        label: "Government Document",
        value: "GOVERNMENT",
    },
    {
        label: "Insurance",
        value: "INSURANCE",
    },
    {
        label: "Agreement",
        value: "AGREEMENT",
    },
    {
        label: "Contract",
        value: "CONTRACT",
    },
    {
        label: "Policy",
        value: "POLICY",
    },
    {
        label: "Audit",
        value: "AUDIT",
    },
    {
        label: "Other",
        value: "OTHER",
    },
];

/**
 * Supported File Types
 */
export const ALLOWED_FILE_EXTENSIONS = [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".csv",
];

/**
 * Accepted MIME Types
 */
export const ALLOWED_MIME_TYPES = [
    "application/pdf",

    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.ms-excel",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "text/csv",
];

/**
 * Maximum File Size
 *
 * 10 MB
 */
export const MAX_FILE_SIZE =
    10 * 1024 * 1024;

/**
 * Default Version
 */
export const DEFAULT_DOCUMENT_VERSION =
    "1.0";

/**
 * Document Status
 */
export const DOCUMENT_STATUS = [
    {
        label: "Active",
        value: true,
    },
    {
        label: "Inactive",
        value: false,
    },
];

/**
 * Version Status
 */
export const VERSION_STATUS = [
    {
        label: "Current",
        value: "CURRENT",
    },
    {
        label: "Archived",
        value: "ARCHIVED",
    },
];

/**
 * Upload Messages
 */
export const DOCUMENT_MESSAGES = {
    INVALID_FILE:
        "Unsupported file type.",

    FILE_TOO_LARGE:
        "File size exceeds maximum allowed limit.",

    DUPLICATE_FILE:
        "Document already exists.",

    UPLOAD_SUCCESS:
        "Document uploaded successfully.",

    DELETE_CONFIRM:
        "Are you sure you want to delete this document?",

    VERSION_UPDATED:
        "Document version updated successfully.",
};

/**
 * Default Document Object
 */
export const DEFAULT_DOCUMENT = {
    id: null,

    documentName: "",

    category: null,

    file: null,

    fileName: "",

    fileExtension: "",

    mimeType: "",

    fileSize: 0,

    version:
        DEFAULT_DOCUMENT_VERSION,

    expiryDate: null,

    remarks: "",

    status: true,
};