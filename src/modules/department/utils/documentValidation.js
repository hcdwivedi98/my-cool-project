import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MIME_TYPES,
    MAX_FILE_SIZE,
} from "../constants/document.constants";

/**
 * Returns file extension with dot
 * Example:
 * invoice.pdf -> .pdf
 */
export const getFileExtension = (fileName = "") => {
    const index = fileName.lastIndexOf(".");

    if (index === -1) {
        return "";
    }

    return fileName.substring(index).toLowerCase();
};

/**
 * Validate file extension
 */
export const validateFileExtension = (
    file,
    allowedExtensions = ALLOWED_FILE_EXTENSIONS
) => {
    if (!file) {
        return null;
    }

    const extension = getFileExtension(file.name);

    if (!allowedExtensions.includes(extension)) {
        return `Only ${allowedExtensions.join(", ")} files are allowed.`;
    }

    return null;
};

/**
 * Validate mime type
 */
export const validateMimeType = (
    file,
    allowedMimeTypes = ALLOWED_MIME_TYPES
) => {
    if (!file) {
        return null;
    }

    if (!allowedMimeTypes.includes(file.type)) {
        return "Invalid file type.";
    }

    return null;
};

/**
 * Validate max file size
 */
export const validateFileSize = (
    file,
    maxSize = MAX_FILE_SIZE
) => {
    if (!file) {
        return null;
    }

    if (file.size > maxSize) {
        return `Maximum file size is ${Math.round(
            maxSize / (1024 * 1024)
        )} MB.`;
    }

    return null;
};

/**
 * Validate duplicate document
 */
export const validateDuplicateDocument = (
    documentName,
    documents = [],
    currentId = null
) => {
    if (!documentName) {
        return null;
    }

    const duplicate = documents.find(
        (item) =>
            item.id !== currentId &&
            item.documentName
                ?.trim()
                .toLowerCase() ===
                documentName
                    .trim()
                    .toLowerCase()
    );

    if (duplicate) {
        return "Document name already exists.";
    }

    return null;
};

/**
 * Validate Issue / Expiry dates
 */
export const validateDocumentDates = (
    issueDate,
    expiryDate
) => {
    if (!issueDate || !expiryDate) {
        return null;
    }

    if (expiryDate.isBefore(issueDate, "day")) {
        return "Expiry Date cannot be earlier than Issue Date.";
    }

    return null;
};

/**
 * Complete validation
 */
export const validateDocument = ({
    file,
    issueDate,
    expiryDate,
    documentName,
    documents = [],
    currentId = null,
}) => {
    const errors = {};

    const extensionError =
        validateFileExtension(file);

    if (extensionError) {
        errors.file = extensionError;
    }

    const mimeError =
        validateMimeType(file);

    if (mimeError) {
        errors.file = mimeError;
    }

    const sizeError =
        validateFileSize(file);

    if (sizeError) {
        errors.file = sizeError;
    }

    const duplicateError =
        validateDuplicateDocument(
            documentName,
            documents,
            currentId
        );

    if (duplicateError) {
        errors.documentName =
            duplicateError;
    }

    const dateError =
        validateDocumentDates(
            issueDate,
            expiryDate
        );

    if (dateError) {
        errors.expiryDate = dateError;
    }

    return errors;
};

/**
 * Returns true when document is valid
 */
export const isDocumentValid = (
    values
) => {
    return (
        Object.keys(
            validateDocument(values)
        ).length === 0
    );
};