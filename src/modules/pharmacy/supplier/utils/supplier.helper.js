// src/modules/pharmacy/supplier/utils/supplier.helper.js

import {
    SUPPLIER_DEFAULTS,
} from "../constants/supplier.constants";

/*
 * -----------------------------------------
 * Create Empty Supplier
 * -----------------------------------------
 */

export const getDefaultSupplierValues = () => {
    return {
        supplierCode: "",
        supplierName: "",

        supplierType:
            SUPPLIER_DEFAULTS.supplierType,

        supplierCategory:
            SUPPLIER_DEFAULTS.supplierCategory,

        status:
            SUPPLIER_DEFAULTS.status,

        // Contact
        contactPerson: "",
        mobile: "",
        alternateMobile: "",
        email: "",
        website: "",

        // Address
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "IN",
        pinCode: "",

        // Regulatory
        gstin: "",
        pan: "",
        drugLicenseNumber: "",
        drugLicenseExpiry: null,
        licenseType: "",
        fssaiLicense: "",
        otherRegistration: "",

        // Commercial
        paymentTerms:
            SUPPLIER_DEFAULTS.paymentTerms,

        creditDays:
            SUPPLIER_DEFAULTS.creditDays,

        currency:
            SUPPLIER_DEFAULTS.currency,

        // Bank
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",

        // Documents
        documents: [],
    };
};

/*
 * -----------------------------------------
 * Normalize String
 * -----------------------------------------
 */

const cleanString = (
    value
) => {
    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }

    return String(value).trim();
};

/*
 * -----------------------------------------
 * Nullable String
 * -----------------------------------------
 */

const nullableString = (
    value
) => {
    const cleaned =
        cleanString(value);

    return cleaned || null;
};

/*
 * -----------------------------------------
 * Number
 * -----------------------------------------
 */

const cleanNumber = (
    value
) => {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return null;
    }

    const number =
        Number(value);

    return Number.isNaN(number)
        ? null
        : number;
};

/*
 * -----------------------------------------
 * Boolean
 * -----------------------------------------
 */

const cleanBoolean = (
    value
) => {
    return Boolean(value);
};

/*
 * -----------------------------------------
 * Date
 * -----------------------------------------
 */

const cleanDate = (
    value
) => {
    if (!value) {
        return null;
    }

    if (
        typeof value === "string"
    ) {
        return value;
    }

    if (
        value?.format
    ) {
        return value.format(
            "YYYY-MM-DD"
        );
    }

    return value;
};

/*
 * -----------------------------------------
 * Documents
 * -----------------------------------------
 */

const normalizeDocuments = (
    documents
) => {
    if (
        !Array.isArray(
            documents
        )
    ) {
        return [];
    }

    return documents.map(
        (document) => ({
            ...document,

            id:
                document.id ??
                null,

            name:
                cleanString(
                    document.name
                ),

            documentType:
                cleanString(
                    document.documentType
                ),

            documentNumber:
                cleanString(
                    document.documentNumber
                ),

            expiryDate:
                cleanDate(
                    document.expiryDate
                ),
        })
    );
};

/*
 * -----------------------------------------
 * Form → API Payload
 * -----------------------------------------
 */

export const prepareSupplierPayload = (
    values = {}
) => {
    return {
        supplierCode:
            cleanString(
                values.supplierCode
            ),

        supplierName:
            cleanString(
                values.supplierName
            ),

        supplierType:
            cleanString(
                values.supplierType
            ),

        supplierCategory:
            cleanString(
                values.supplierCategory
            ),

        status:
            cleanString(
                values.status
            ),

        // Contact
        contactPerson:
            cleanString(
                values.contactPerson
            ),

        mobile:
            cleanString(
                values.mobile
            ),

        alternateMobile:
            nullableString(
                values.alternateMobile
            ),

        email:
            nullableString(
                values.email
            ),

        website:
            nullableString(
                values.website
            ),

        // Address
        addressLine1:
            cleanString(
                values.addressLine1
            ),

        addressLine2:
            nullableString(
                values.addressLine2
            ),

        city:
            cleanString(
                values.city
            ),

        state:
            cleanString(
                values.state
            ),

        country:
            cleanString(
                values.country
            ),

        pinCode:
            cleanString(
                values.pinCode
            ),

        // Regulatory
        gstin:
            nullableString(
                values.gstin
            )?.toUpperCase() ||
            null,

        pan:
            nullableString(
                values.pan
            )?.toUpperCase() ||
            null,

        drugLicenseNumber:
            nullableString(
                values.drugLicenseNumber
            ),

        drugLicenseExpiry:
            cleanDate(
                values.drugLicenseExpiry
            ),

        licenseType:
            nullableString(
                values.licenseType
            ),

        fssaiLicense:
            nullableString(
                values.fssaiLicense
            ),

        otherRegistration:
            nullableString(
                values.otherRegistration
            ),

        // Commercial
        paymentTerms:
            cleanString(
                values.paymentTerms
            ),

        creditDays:
            cleanNumber(
                values.creditDays
            ),

        currency:
            cleanString(
                values.currency
            ),

        // Bank
        bankName:
            nullableString(
                values.bankName
            ),

        accountNumber:
            nullableString(
                values.accountNumber
            ),

        ifscCode:
            nullableString(
                values.ifscCode
            )?.toUpperCase() ||
            null,

        branchName:
            nullableString(
                values.branchName
            ),

        // Documents
        documents:
            normalizeDocuments(
                values.documents
            ),
    };
};

/*
 * -----------------------------------------
 * API → Form
 * -----------------------------------------
 */

export const mapSupplierToForm = (
    supplier = {}
) => {
    return {
        supplierCode:
            supplier.supplierCode ??
            "",

        supplierName:
            supplier.supplierName ??
            "",

        supplierType:
            supplier.supplierType ??
            SUPPLIER_DEFAULTS.supplierType,

        supplierCategory:
            supplier.supplierCategory ??
            SUPPLIER_DEFAULTS.supplierCategory,

        status:
            supplier.status ??
            SUPPLIER_DEFAULTS.status,

        // Contact
        contactPerson:
            supplier.contactPerson ??
            "",

        mobile:
            supplier.mobile ??
            "",

        alternateMobile:
            supplier.alternateMobile ??
            "",

        email:
            supplier.email ??
            "",

        website:
            supplier.website ??
            "",

        // Address
        addressLine1:
            supplier.addressLine1 ??
            "",

        addressLine2:
            supplier.addressLine2 ??
            "",

        city:
            supplier.city ??
            "",

        state:
            supplier.state ??
            "",

        country:
            supplier.country ??
            "IN",

        pinCode:
            supplier.pinCode ??
            "",

        // Regulatory
        gstin:
            supplier.gstin ??
            "",

        pan:
            supplier.pan ??
            "",

        drugLicenseNumber:
            supplier.drugLicenseNumber ??
            "",

        drugLicenseExpiry:
            supplier.drugLicenseExpiry ??
            null,

        licenseType:
            supplier.licenseType ??
            "",

        fssaiLicense:
            supplier.fssaiLicense ??
            "",

        otherRegistration:
            supplier.otherRegistration ??
            "",

        // Commercial
        paymentTerms:
            supplier.paymentTerms ??
            SUPPLIER_DEFAULTS.paymentTerms,

        creditDays:
            supplier.creditDays ??
            SUPPLIER_DEFAULTS.creditDays,

        currency:
            supplier.currency ??
            SUPPLIER_DEFAULTS.currency,

        // Bank
        bankName:
            supplier.bankName ??
            "",

        accountNumber:
            supplier.accountNumber ??
            "",

        ifscCode:
            supplier.ifscCode ??
            "",

        branchName:
            supplier.branchName ??
            "",

        // Documents
        documents:
            Array.isArray(
                supplier.documents
            )
                ? supplier.documents
                : [],
    };
};

/*
 * -----------------------------------------
 * Supplier Display Name
 * -----------------------------------------
 */

export const getSupplierDisplayName = (
    supplier
) => {
    if (!supplier) {
        return "";
    }

    if (
        supplier.supplierCode &&
        supplier.supplierName
    ) {
        return `${supplier.supplierCode} - ${supplier.supplierName}`;
    }

    return (
        supplier.supplierName ||
        supplier.supplierCode ||
        ""
    );
};

/*
 * -----------------------------------------
 * Active Check
 * -----------------------------------------
 */

export const isSupplierActive = (
    supplier
) => {
    return (
        supplier?.status ===
        "Active"
    );
};

/*
 * -----------------------------------------
 * Supplier Status
 * -----------------------------------------
 */

export const getSupplierStatusLabel = (
    status
) => {
    if (
        status === "Active"
    ) {
        return "Active";
    }

    if (
        status === "Inactive"
    ) {
        return "Inactive";
    }

    return status || "-";
};

/*
 * -----------------------------------------
 * Credit Terms
 * -----------------------------------------
 */

export const getCreditTermsLabel = (
    supplier
) => {
    if (!supplier) {
        return "-";
    }

    if (
        supplier.paymentTerms ===
        "CASH"
    ) {
        return "Cash";
    }

    if (
        supplier.paymentTerms ===
        "ADVANCE"
    ) {
        return "Advance";
    }

    if (
        supplier.paymentTerms ===
        "CREDIT"
    ) {
        const days =
            cleanNumber(
                supplier.creditDays
            );

        return days !== null
            ? `Credit - ${days} Days`
            : "Credit";
    }

    return "-";
};