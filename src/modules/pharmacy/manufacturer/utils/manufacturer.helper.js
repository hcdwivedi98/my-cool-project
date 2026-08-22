// src/modules/pharmacy/manufacturer/utils/manufacturer.helper.js

/*
 * ============================================
 * Normalize Value
 * ============================================
 */

export const normalizeValue = (
    value
) => {
    if (
        value ===
            null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim();
};

/*
 * ============================================
 * Normalize Uppercase Code
 * ============================================
 */

export const normalizeCode = (
    value
) => {
    return normalizeValue(
        value
    )
        .toUpperCase()
        .replace(
            /\s+/g,
            "-"
        );
};

/*
 * ============================================
 * Default Manufacturer Values
 * ============================================
 */

export const getDefaultManufacturerValues =
    () => {
        return {
            /*
             * Basic
             */

            manufacturerCode:
                "",

            manufacturerName:
                "",

            shortName:
                "",

            manufacturerType:
                "PHARMACEUTICAL",

            manufacturerCategory:
                "DOMESTIC",

            status:
                "Active",

            /*
             * Contact
             */

            contactPerson:
                "",

            designation:
                "",

            mobile:
                "",

            alternateMobile:
                "",

            email:
                "",

            website:
                "",

            /*
             * Address
             */

            addressLine1:
                "",

            addressLine2:
                "",

            country:
                "INDIA",

            state:
                undefined,

            city:
                undefined,

            pinCode:
                "",

            /*
             * Regulatory
             */

            gstin:
                "",

            pan:
                "",

            licenseType:
                "MANUFACTURING_LICENSE",

            licenseNumber:
                "",

            licenseIssueDate:
                null,

            licenseExpiryDate:
                null,

            fssaiLicenseNumber:
                "",

            /*
             * Certifications
             */

            certifications:
                [],

            /*
             * Commercial
             */

            paymentTerms:
                "NET_30",

            currency:
                "INR",

            bankName:
                "",

            accountNumber:
                "",

            ifscCode:
                "",

            branchName:
                "",

            /*
             * Documents
             */

            documents:
                [],
        };
    };

/*
 * ============================================
 * Map Manufacturer → Form
 * ============================================
 */

export const mapManufacturerToForm =
    (
        manufacturer = {}
    ) => {
        return {
            manufacturerCode:
                manufacturer.manufacturerCode ??
                "",

            manufacturerName:
                manufacturer.manufacturerName ??
                "",

            shortName:
                manufacturer.shortName ??
                "",

            manufacturerType:
                manufacturer.manufacturerType ??
                undefined,

            manufacturerCategory:
                manufacturer.manufacturerCategory ??
                undefined,

            status:
                manufacturer.status ??
                "Active",

            /*
             * Contact
             */

            contactPerson:
                manufacturer.contactPerson ??
                "",

            designation:
                manufacturer.designation ??
                "",

            mobile:
                manufacturer.mobile ??
                "",

            alternateMobile:
                manufacturer.alternateMobile ??
                "",

            email:
                manufacturer.email ??
                "",

            website:
                manufacturer.website ??
                "",

            /*
             * Address
             */

            addressLine1:
                manufacturer.addressLine1 ??
                "",

            addressLine2:
                manufacturer.addressLine2 ??
                "",

            country:
                manufacturer.country ??
                "INDIA",

            state:
                manufacturer.state ??
                undefined,

            city:
                manufacturer.city ??
                undefined,

            pinCode:
                manufacturer.pinCode ??
                "",

            /*
             * Regulatory
             */

            gstin:
                manufacturer.gstin ??
                "",

            pan:
                manufacturer.pan ??
                "",

            licenseType:
                manufacturer.licenseType ??
                undefined,

            licenseNumber:
                manufacturer.licenseNumber ??
                "",

            licenseIssueDate:
                manufacturer.licenseIssueDate ??
                null,

            licenseExpiryDate:
                manufacturer.licenseExpiryDate ??
                null,

            fssaiLicenseNumber:
                manufacturer.fssaiLicenseNumber ??
                "",

            /*
             * Certifications
             */

            certifications:
                Array.isArray(
                    manufacturer.certifications
                )
                    ? manufacturer.certifications
                    : [],

            /*
             * Commercial
             */

            paymentTerms:
                manufacturer.paymentTerms ??
                undefined,

            currency:
                manufacturer.currency ??
                "INR",

            bankName:
                manufacturer.bankName ??
                "",

            accountNumber:
                manufacturer.accountNumber ??
                "",

            ifscCode:
                manufacturer.ifscCode ??
                "",

            branchName:
                manufacturer.branchName ??
                "",

            /*
             * Documents
             */

            documents:
                Array.isArray(
                    manufacturer.documents
                )
                    ? manufacturer.documents
                    : [],
        };
    };

/*
 * ============================================
 * Prepare Manufacturer Payload
 * ============================================
 */

export const prepareManufacturerPayload =
    (
        values = {}
    ) => {
        return {
            /*
             * Basic
             */

            manufacturerCode:
                normalizeCode(
                    values.manufacturerCode
                ),

            manufacturerName:
                normalizeValue(
                    values.manufacturerName
                ),

            shortName:
                normalizeValue(
                    values.shortName
                ),

            manufacturerType:
                values.manufacturerType ||
                null,

            manufacturerCategory:
                values.manufacturerCategory ||
                null,

            status:
                values.status ||
                "Active",

            /*
             * Contact
             */

            contactPerson:
                normalizeValue(
                    values.contactPerson
                ),

            designation:
                normalizeValue(
                    values.designation
                ),

            mobile:
                normalizeValue(
                    values.mobile
                ),

            alternateMobile:
                normalizeValue(
                    values.alternateMobile
                ),

            email:
                normalizeValue(
                    values.email
                ).toLowerCase(),

            website:
                normalizeValue(
                    values.website
                ),

            /*
             * Address
             */

            addressLine1:
                normalizeValue(
                    values.addressLine1
                ),

            addressLine2:
                normalizeValue(
                    values.addressLine2
                ),

            country:
                values.country ||
                null,

            state:
                values.state ||
                null,

            city:
                values.city ||
                null,

            pinCode:
                normalizeValue(
                    values.pinCode
                ),

            /*
             * Regulatory
             */

            gstin:
                normalizeValue(
                    values.gstin
                ).toUpperCase(),

            pan:
                normalizeValue(
                    values.pan
                ).toUpperCase(),

            licenseType:
                values.licenseType ||
                null,

            licenseNumber:
                normalizeValue(
                    values.licenseNumber
                ),

            licenseIssueDate:
                values.licenseIssueDate ||
                null,

            licenseExpiryDate:
                values.licenseExpiryDate ||
                null,

            fssaiLicenseNumber:
                normalizeValue(
                    values.fssaiLicenseNumber
                ),

            /*
             * Certifications
             */

            certifications:
                Array.isArray(
                    values.certifications
                )
                    ? values.certifications.map(
                          (
                              item,
                              index
                          ) => ({
                              id:
                                  item.id ??
                                  index +
                                      1,

                              type:
                                  item.type ||
                                  null,

                              name:
                                  normalizeValue(
                                      item.name
                                  ),

                              certificateNumber:
                                  normalizeValue(
                                      item.certificateNumber
                                  ),

                              issueDate:
                                  item.issueDate ||
                                  null,

                              expiryDate:
                                  item.expiryDate ||
                                  null,
                          })
                      )
                    : [],

            /*
             * Commercial
             */

            paymentTerms:
                values.paymentTerms ||
                null,

            currency:
                values.currency ||
                "INR",

            bankName:
                normalizeValue(
                    values.bankName
                ),

            accountNumber:
                normalizeValue(
                    values.accountNumber
                ),

            ifscCode:
                normalizeValue(
                    values.ifscCode
                ).toUpperCase(),

            branchName:
                normalizeValue(
                    values.branchName
                ),

            /*
             * Documents
             */

            documents:
                Array.isArray(
                    values.documents
                )
                    ? values.documents
                    : [],
        };
    };

/*
 * ============================================
 * Manufacturer Display Name
 * ============================================
 */

export const getManufacturerDisplayName =
    (
        manufacturer
    ) => {
        if (!manufacturer) {
            return "";
        }

        const name =
            manufacturer.manufacturerName ||
            "";

        const code =
            manufacturer.manufacturerCode ||
            "";

        if (
            name &&
            code
        ) {
            return `${name} (${code})`;
        }

        return name || code;
    };

/*
 * ============================================
 * Manufacturer Short Display
 * ============================================
 */

export const getManufacturerShortName =
    (
        manufacturer
    ) => {
        if (!manufacturer) {
            return "";
        }

        return (
            manufacturer.shortName ||
            manufacturer.manufacturerName ||
            ""
        );
    };

/*
 * ============================================
 * Status Helpers
 * ============================================
 */

export const isManufacturerActive =
    (
        manufacturer
    ) => {
        return (
            manufacturer?.status ===
            "Active"
        );
    };

export const isManufacturerInactive =
    (
        manufacturer
    ) => {
        return (
            manufacturer?.status ===
            "Inactive"
        );
    };

/*
 * ============================================
 * Status Label
 * ============================================
 */

export const getManufacturerStatusLabel =
    (
        status
    ) => {
        if (
            status ===
            "Active"
        ) {
            return "Active";
        }

        if (
            status ===
            "Inactive"
        ) {
            return "Inactive";
        }

        return status || "-";
    };

/*
 * ============================================
 * Certification Count
 * ============================================
 */

export const getCertificationCount =
    (
        manufacturer
    ) => {
        return Array.isArray(
            manufacturer?.certifications
        )
            ? manufacturer.certifications
                  .length
            : 0;
    };

/*
 * ============================================
 * Product Count
 * ============================================
 */

export const getManufacturerProductCount =
    (
        manufacturer
    ) => {
        return Number(
            manufacturer?.productsCount
        ) || 0;
    };

/*
 * ============================================
 * Active Product Count
 * ============================================
 */

export const getActiveProductCount =
    (
        manufacturer
    ) => {
        return Number(
            manufacturer?.activeProductsCount
        ) || 0;
    };

/*
 * ============================================
 * License Expiry Check
 * ============================================
 */

export const isLicenseExpired =
    (
        manufacturer
    ) => {
        if (
            !manufacturer?.licenseExpiryDate
        ) {
            return false;
        }

        const expiryDate =
            new Date(
                manufacturer.licenseExpiryDate
            );

        if (
            Number.isNaN(
                expiryDate.getTime()
            )
        ) {
            return false;
        }

        return (
            expiryDate <
            new Date()
        );
    };

/*
 * ============================================
 * License Expiry Soon
 *
 * Default: 30 days
 * ============================================
 */

export const isLicenseExpiringSoon =
    (
        manufacturer,
        days = 30
    ) => {
        if (
            !manufacturer?.licenseExpiryDate
        ) {
            return false;
        }

        const expiryDate =
            new Date(
                manufacturer.licenseExpiryDate
            );

        if (
            Number.isNaN(
                expiryDate.getTime()
            )
        ) {
            return false;
        }

        const today =
            new Date();

        const futureDate =
            new Date();

        futureDate.setDate(
            futureDate.getDate() +
                days
        );

        return (
            expiryDate >=
                today &&
            expiryDate <=
                futureDate
        );
    };

/*
 * ============================================
 * Supplier / Drug Display Helpers
 * ============================================
 */

/*
 * Used when Manufacturer is selected
 * in Drug Master.
 */

export const getManufacturerLookupValue =
    (
        manufacturer
    ) => {
        if (!manufacturer) {
            return null;
        }

        return {
            id:
                manufacturer.id,

            manufacturerId:
                manufacturer.id,

            manufacturerCode:
                manufacturer.manufacturerCode,

            manufacturerName:
                manufacturer.manufacturerName,

            shortName:
                manufacturer.shortName,
        };
    };