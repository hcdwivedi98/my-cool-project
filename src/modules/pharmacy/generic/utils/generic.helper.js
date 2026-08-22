// src/modules/pharmacy/generic/utils/generic.helper.js

/*
 * ============================================
 * Normalize String
 * ============================================
 */

export const normalizeValue = (
    value
) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    if (
        typeof value !== "string"
    ) {
        return value;
    }

    return value.trim();
};

/*
 * ============================================
 * Normalize Boolean
 * ============================================
 */

export const normalizeBoolean = (
    value,
    defaultValue = false
) => {
    if (
        value === true ||
        value === false
    ) {
        return value;
    }

    return defaultValue;
};

/*
 * ============================================
 * Normalize Array
 * ============================================
 */

export const normalizeArray = (
    value
) => {
    if (
        !Array.isArray(value)
    ) {
        return [];
    }

    return value.filter(
        (
            item
        ) =>
            item !==
                null &&
            item !==
                undefined &&
            item !== ""
    );
};

/*
 * ============================================
 * Default Generic Values
 * ============================================
 */

export const getDefaultGenericValues =
    () => ({
        genericCode: "",

        genericName: "",

        shortName: "",

        description: "",

        genericType:
            "SINGLE",

        therapeuticClass:
            undefined,

        pharmacologicalClass:
            undefined,

        dosageForms: [],

        routes: [],

        prescriptionRequired:
            false,

        controlledDrug:
            false,

        narcotic:
            false,

        highAlert:
            false,

        lasa:
            false,

        status:
            "Active",

        drugsCount:
            0,

        createdBy:
            undefined,

        createdOn:
            undefined,

        modifiedBy:
            undefined,

        modifiedOn:
            undefined,
    });

/*
 * ============================================
 * Map Generic API → Form
 * ============================================
 */

export const mapGenericToForm = (
    record
) => {
    if (!record) {
        return getDefaultGenericValues();
    }

    return {
        ...getDefaultGenericValues(),

        id:
            record.id,

        genericCode:
            record.genericCode ||
            "",

        genericName:
            record.genericName ||
            "",

        shortName:
            record.shortName ||
            "",

        description:
            record.description ||
            "",

        genericType:
            record.genericType ||
            "SINGLE",

        therapeuticClass:
            record.therapeuticClass ||
            undefined,

        pharmacologicalClass:
            record.pharmacologicalClass ||
            undefined,

        dosageForms:
            normalizeArray(
                record.dosageForms
            ),

        routes:
            normalizeArray(
                record.routes
            ),

        prescriptionRequired:
            normalizeBoolean(
                record.prescriptionRequired
            ),

        controlledDrug:
            normalizeBoolean(
                record.controlledDrug
            ),

        narcotic:
            normalizeBoolean(
                record.narcotic
            ),

        highAlert:
            normalizeBoolean(
                record.highAlert
            ),

        lasa:
            normalizeBoolean(
                record.lasa
            ),

        status:
            record.status ||
            "Active",

        drugsCount:
            Number(
                record.drugsCount
            ) || 0,

        createdBy:
            record.createdBy,

        createdOn:
            record.createdOn,

        modifiedBy:
            record.modifiedBy,

        modifiedOn:
            record.modifiedOn,
    };
};

/*
 * ============================================
 * Prepare Generic Payload
 * ============================================
 */

export const prepareGenericPayload =
    (
        values = {}
    ) => {
        return {
            genericCode:
                normalizeValue(
                    values.genericCode
                ).toUpperCase(),

            genericName:
                normalizeValue(
                    values.genericName
                ),

            shortName:
                normalizeValue(
                    values.shortName
                ),

            description:
                normalizeValue(
                    values.description
                ),

            genericType:
                values.genericType ||
                "SINGLE",

            therapeuticClass:
                values.therapeuticClass ||
                null,

            pharmacologicalClass:
                values.pharmacologicalClass ||
                null,

            dosageForms:
                normalizeArray(
                    values.dosageForms
                ),

            routes:
                normalizeArray(
                    values.routes
                ),

            prescriptionRequired:
                normalizeBoolean(
                    values.prescriptionRequired
                ),

            controlledDrug:
                normalizeBoolean(
                    values.controlledDrug
                ),

            narcotic:
                normalizeBoolean(
                    values.narcotic
                ),

            highAlert:
                normalizeBoolean(
                    values.highAlert
                ),

            lasa:
                normalizeBoolean(
                    values.lasa
                ),

            status:
                values.status ||
                "Active",
        };
    };

/*
 * ============================================
 * Generic Display Name
 * ============================================
 */

export const getGenericDisplayName =
    (
        generic
    ) => {
        if (!generic) {
            return "";
        }

        if (
            generic.shortName
        ) {
            return `${generic.genericName} (${generic.shortName})`;
        }

        return (
            generic.genericName ||
            ""
        );
    };

/*
 * ============================================
 * Generic Search Text
 * ============================================
 */

export const getGenericSearchText =
    (
        generic
    ) => {
        if (!generic) {
            return "";
        }

        return [
            generic.genericCode,
            generic.genericName,
            generic.shortName,
            generic.description,
            generic.therapeuticClass,
            generic.pharmacologicalClass,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
    };

/*
 * ============================================
 * Duplicate Comparison
 * ============================================
 */

export const normalizeGenericName =
    (
        genericName
    ) => {
        return normalizeValue(
            genericName
        )
            .toLowerCase()
            .replace(
                /\s+/g,
                " "
            );
    };

/*
 * ============================================
 * Generic Duplicate Check
 * ============================================
 *
 * currentId EDIT mode me existing record
 * ko duplicate check se exclude karta hai.
 */

export const isDuplicateGeneric =
    (
        genericList = [],
        genericName,
        currentId = null
    ) => {
        const normalizedName =
            normalizeGenericName(
                genericName
            );

        if (
            !normalizedName
        ) {
            return false;
        }

        return genericList.some(
            (
                item
            ) => {
                if (
                    currentId !==
                        null &&
                    Number(
                        item.id
                    ) ===
                        Number(
                            currentId
                        )
                ) {
                    return false;
                }

                return (
                    normalizeGenericName(
                        item.genericName
                    ) ===
                    normalizedName
                );
            }
        );
    };

/*
 * ============================================
 * Status Helper
 * ============================================
 */

export const isGenericActive =
    (
        generic
    ) =>
        generic?.status ===
        "Active";

/*
 * ============================================
 * Generic Summary
 * ============================================
 */

export const getGenericSummary =
    (
        generic
    ) => {
        if (!generic) {
            return {
                name: "",
                type: "",
                therapeuticClass:
                    "",
                dosageForms: 0,
                routes: 0,
                drugsCount: 0,
                status: "",
            };
        }

        return {
            name:
                generic.genericName ||
                "",

            type:
                generic.genericType ||
                "",

            therapeuticClass:
                generic.therapeuticClass ||
                "",

            dosageForms:
                Array.isArray(
                    generic.dosageForms
                )
                    ? generic
                          .dosageForms
                          .length
                    : 0,

            routes:
                Array.isArray(
                    generic.routes
                )
                    ? generic.routes
                          .length
                    : 0,

            drugsCount:
                Number(
                    generic.drugsCount
                ) || 0,

            status:
                generic.status ||
                "",
        };
    };