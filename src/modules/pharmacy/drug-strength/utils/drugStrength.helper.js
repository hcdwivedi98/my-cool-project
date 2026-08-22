// src/modules/pharmacy/drug-strength/utils/drugStrength.helper.js

import {
    DRUG_STRENGTH_DEFAULTS,
    DRUG_STRENGTH_LIMITS,
    DRUG_STRENGTH_STATUS,
    DRUG_STRENGTH_TYPES,
} from "../constants/drugStrength.constants";


/* =========================================================
   NORMALIZE VALUE
   ========================================================= */

/**
 * Converts a value into a safe numeric value.
 *
 * @param {any} value
 * @returns {number|null}
 */
export const normalizeStrengthValue = (
    value
) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }


    const numericValue =
        Number(value);


    if (
        Number.isNaN(
            numericValue
        )
    ) {
        return null;
    }


    return numericValue;
};


/* =========================================================
   NORMALIZE DECIMAL PRECISION
   ========================================================= */

/**
 * Ensures decimal precision is a valid non-negative integer.
 *
 * @param {any} value
 * @returns {number}
 */
export const normalizeDecimalPrecision = (
    value
) => {

    const precision =
        Number(value);


    if (
        Number.isNaN(
            precision
        ) ||
        precision < 0
    ) {
        return 0;
    }


    return Math.floor(
        precision
    );
};


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

/**
 * Formats strength value according to decimal precision.
 *
 * @param {number|string|null} value
 * @param {number} precision
 * @returns {string}
 */
export const formatStrengthValue = (
    value,
    precision = 0
) => {

    const numericValue =
        normalizeStrengthValue(
            value
        );


    if (
        numericValue === null
    ) {
        return "";
    }


    const normalizedPrecision =
        normalizeDecimalPrecision(
            precision
        );


    return numericValue.toFixed(
        normalizedPrecision
    );
};


/* =========================================================
   FORMAT DISPLAY
   ========================================================= */

/**
 * Generates standardized strength display.
 *
 * Example:
 * 500 + mg => "500 mg"
 * 1 + g   => "1 g"
 * 5 + %   => "5%"
 *
 * @param {number|string} value
 * @param {string} unitName
 * @param {string} unitCode
 * @param {number} precision
 * @returns {string}
 */
export const formatStrengthDisplay = ({
    value,
    unitName = "",
    unitCode = "",
    precision = 0,
} = {}) => {

    const formattedValue =
        formatStrengthValue(
            value,
            precision
        );


    if (
        !formattedValue
    ) {
        return "";
    }


    const normalizedUnit =
        String(
            unitName ||
            unitCode ||
            ""
        )
            .trim();


    if (
        !normalizedUnit
    ) {
        return formattedValue;
    }


    /*
     * Percentage does not need a space.
     */

    if (
        normalizedUnit === "%" ||
        unitCode === "PCT"
    ) {
        return `${formattedValue}%`;
    }


    return `${formattedValue} ${normalizedUnit}`;
};


/* =========================================================
   GENERATE STRENGTH CODE
   ========================================================= */

/**
 * Generates a suggested strength code.
 *
 * Example:
 * 500 + MG => STR-500MG
 *
 * @param {number|string} value
 * @param {string} unitCode
 * @param {number} precision
 * @returns {string}
 */
export const generateStrengthCode = ({
    value,
    unitCode = "",
    precision = 0,
} = {}) => {

    const formattedValue =
        formatStrengthValue(
            value,
            precision
        );


    if (
        !formattedValue
    ) {
        return "";
    }


    const normalizedUnit =
        String(
            unitCode ||
            ""
        )
            .trim()
            .toUpperCase();


    if (
        !normalizedUnit
    ) {
        return "";
    }


    const normalizedValue =
        formattedValue
            .replace(
                /\./g,
                "_"
            );


    return `STR-${normalizedValue}${normalizedUnit}`;
};


/* =========================================================
   NORMALIZE CODE
   ========================================================= */

/**
 * Normalizes strength code for comparison/storage.
 *
 * @param {string} code
 * @returns {string}
 */
export const normalizeStrengthCode = (
    code
) => {

    return String(
        code ||
        ""
    )
        .trim()
        .toUpperCase();
};


/* =========================================================
   NORMALIZE UNIT CODE
   ========================================================= */

/**
 * Normalizes UOM code.
 *
 * @param {string} code
 * @returns {string}
 */
export const normalizeUnitCode = (
    code
) => {

    return String(
        code ||
        ""
    )
        .trim()
        .toUpperCase();
};


/* =========================================================
   NORMALIZE STATUS
   ========================================================= */

export const normalizeStrengthStatus = (
    status
) => {

    if (
        status ===
        DRUG_STRENGTH_STATUS.INACTIVE
    ) {
        return DRUG_STRENGTH_STATUS.INACTIVE;
    }


    return DRUG_STRENGTH_STATUS.ACTIVE;
};


/* =========================================================
   NORMALIZE FORM VALUES
   ========================================================= */

/**
 * Converts form values into a normalized payload.
 *
 * @param {object} values
 * @param {object|null} unit
 * @returns {object}
 */
export const normalizeDrugStrengthForm = (
    values = {},
    unit = null
) => {

    const strengthValue =
        normalizeStrengthValue(
            values.strengthValue
        );


    const decimalPrecision =
        normalizeDecimalPrecision(
            values.decimalPrecision
        );


    const unitId =
        values.strengthUnitId ??
        unit?.id ??
        null;


    const unitCode =
        values.strengthUnitCode ??
        unit?.code ??
        "";


    const unitName =
        values.strengthUnitName ??
        unit?.name ??
        unit?.displayName ??
        "";


    const strengthDisplay =
        formatStrengthDisplay(
            {
                value:
                    strengthValue,

                unitName:
                    unitName,

                unitCode:
                    unitCode,

                precision:
                    decimalPrecision,
            }
        );


    const strengthCode =
        normalizeStrengthCode(
            values.strengthCode
        );


    return {

        ...DRUG_STRENGTH_DEFAULTS,

        ...values,

        strengthCode,

        strengthValue,

        strengthUnitId:
            unitId,

        strengthUnitCode:
            unitCode,

        strengthUnitName:
            unitName,

        strengthDisplay,

        strengthType:
            values.strengthType ||
            DRUG_STRENGTH_TYPES.MASS,

        decimalPrecision,

        sortOrder:
            Number(
                values.sortOrder
            ) || 0,

        status:
            normalizeStrengthStatus(
                values.status
            ),

        description:
            String(
                values.description ||
                ""
            ).trim(),

        remarks:
            String(
                values.remarks ||
                ""
            ).trim(),

        isSystemDefined:
            Boolean(
                values.isSystemDefined
            ),
    };
};


/* =========================================================
   CREATE EMPTY FORM
   ========================================================= */

/**
 * Returns default form model.
 *
 * @returns {object}
 */
export const createEmptyDrugStrength =
    () => ({
        ...DRUG_STRENGTH_DEFAULTS,
    });


/* =========================================================
   MAP RECORD TO FORM
   ========================================================= */

/**
 * Converts an existing record into form values.
 *
 * @param {object|null} record
 * @returns {object}
 */
export const mapDrugStrengthToForm = (
    record
) => {

    if (
        !record
    ) {
        return createEmptyDrugStrength();
    }


    return {

        ...DRUG_STRENGTH_DEFAULTS,

        ...record,

        strengthValue:
            normalizeStrengthValue(
                record.strengthValue
            ),

        decimalPrecision:
            normalizeDecimalPrecision(
                record.decimalPrecision
            ),

        sortOrder:
            Number(
                record.sortOrder
            ) || 0,

        status:
            normalizeStrengthStatus(
                record.status
            ),

        strengthCode:
            normalizeStrengthCode(
                record.strengthCode
            ),
    };
};


/* =========================================================
   DUPLICATE KEY
   ========================================================= */

/**
 * Creates a unique comparison key from value + unit.
 *
 * Example:
 * 500 + MG => "500|MG"
 *
 * @param {number|string} value
 * @param {string} unitCode
 * @returns {string}
 */
export const createStrengthDuplicateKey = ({
    value,
    unitCode,
    precision = 0,
} = {}) => {

    const normalizedValue =
        formatStrengthValue(
            value,
            precision
        );


    const normalizedUnit =
        normalizeUnitCode(
            unitCode
        );


    return `${normalizedValue}|${normalizedUnit}`;
};


/* =========================================================
   FIND DUPLICATE
   ========================================================= */

/**
 * Finds duplicate strength by value + unit.
 *
 * @param {Array} list
 * @param {object} values
 * @param {number|null} excludeId
 * @returns {object|null}
 */
export const findDuplicateDrugStrength = (
    list = [],
    values = {},
    excludeId = null
) => {

    const duplicateKey =
        createStrengthDuplicateKey(
            {
                value:
                    values.strengthValue,

                unitCode:
                    values.strengthUnitCode,

                precision:
                    values.decimalPrecision,
            }
        );


    if (
        !duplicateKey ||
        duplicateKey === "|"
    ) {
        return null;
    }


    return (
        list.find(
            (
                item
            ) => {

                if (
                    excludeId !== null &&
                    item.id === excludeId
                ) {
                    return false;
                }


                const itemKey =
                    createStrengthDuplicateKey(
                        {
                            value:
                                item.strengthValue,

                            unitCode:
                                item.strengthUnitCode,

                            precision:
                                item.decimalPrecision,
                        }
                    );


                return (
                    itemKey ===
                    duplicateKey
                );
            }
        ) ||
        null
    );
};


/* =========================================================
   FIND DUPLICATE CODE
   ========================================================= */

/**
 * Finds duplicate strength code.
 *
 * @param {Array} list
 * @param {string} code
 * @param {number|null} excludeId
 * @returns {object|null}
 */
export const findDuplicateStrengthCode = (
    list = [],
    code = "",
    excludeId = null
) => {

    const normalizedCode =
        normalizeStrengthCode(
            code
        );


    if (
        !normalizedCode
    ) {
        return null;
    }


    return (
        list.find(
            (
                item
            ) => {

                if (
                    excludeId !== null &&
                    item.id === excludeId
                ) {
                    return false;
                }


                return (
                    normalizeStrengthCode(
                        item.strengthCode
                    ) ===
                    normalizedCode
                );
            }
        ) ||
        null
    );
};


/* =========================================================
   VALIDATE STRENGTH VALUE
   ========================================================= */

/**
 * Validates numeric strength value.
 *
 * @param {any} value
 * @param {number} precision
 * @returns {string|null}
 */
export const validateStrengthValue = (
    value,
    precision = 0
) => {

    const numericValue =
        normalizeStrengthValue(
            value
        );


    if (
        numericValue === null
    ) {
        return "Strength value is required.";
    }


    if (
        numericValue <= 0
    ) {
        return "Strength value must be greater than 0.";
    }


    if (
        numericValue >
        DRUG_STRENGTH_LIMITS.VALUE_MAX
    ) {
        return `Strength value cannot exceed ${DRUG_STRENGTH_LIMITS.VALUE_MAX}.`;
    }


    const normalizedPrecision =
        normalizeDecimalPrecision(
            precision
        );


    const multiplier =
        Math.pow(
            10,
            normalizedPrecision
        );


    const roundedValue =
        Math.round(
            numericValue *
            multiplier
        ) /
        multiplier;


    if (
        roundedValue !==
        numericValue
    ) {
        return `Strength value can have a maximum of ${normalizedPrecision} decimal place(s).`;
    }


    return null;
};


/* =========================================================
   VALIDATE CODE
   ========================================================= */

export const validateStrengthCode = (
    code
) => {

    const normalizedCode =
        normalizeStrengthCode(
            code
        );


    if (
        !normalizedCode
    ) {
        return "Strength code is required.";
    }


    if (
        normalizedCode.length >
        DRUG_STRENGTH_LIMITS.CODE_MAX_LENGTH
    ) {
        return `Strength code cannot exceed ${DRUG_STRENGTH_LIMITS.CODE_MAX_LENGTH} characters.`;
    }


    return null;
};


/* =========================================================
   VALIDATE COMPLETE FORM
   ========================================================= */

/**
 * Returns validation errors.
 *
 * @param {object} values
 * @returns {object}
 */
export const validateDrugStrengthForm = (
    values = {}
) => {

    const errors = {};


    const codeError =
        validateStrengthCode(
            values.strengthCode
        );


    if (
        codeError
    ) {
        errors.strengthCode =
            codeError;
    }


    const valueError =
        validateStrengthValue(
            values.strengthValue,
            values.decimalPrecision
        );


    if (
        valueError
    ) {
        errors.strengthValue =
            valueError;
    }


    if (
        !values.strengthUnitId
    ) {
        errors.strengthUnitId =
            "Strength unit is required.";
    }


    if (
        !values.strengthType
    ) {
        errors.strengthType =
            "Strength type is required.";
    }


    return errors;
};


/* =========================================================
   CAN DELETE
   ========================================================= */

/**
 * Strength can be deleted only when
 * it is not mapped to any drug.
 *
 * @param {object} record
 * @returns {boolean}
 */
export const canDeleteDrugStrength = (
    record
) => {

    if (
        !record
    ) {
        return false;
    }


    if (
        record.isSystemDefined
    ) {
        return false;
    }


    const mappedDrugCount =
        Number(
            record.mappedDrugCount
        ) || 0;


    return (
        mappedDrugCount === 0
    );
};


/* =========================================================
   CAN DEACTIVATE
   ========================================================= */

export const canDeactivateDrugStrength = (
    record
) => {

    if (
        !record
    ) {
        return false;
    }


    return (
        record.status ===
        DRUG_STRENGTH_STATUS.ACTIVE
    );
};


/* =========================================================
   CAN ACTIVATE
   ========================================================= */

export const canActivateDrugStrength = (
    record
) => {

    if (
        !record
    ) {
        return false;
    }


    return (
        record.status ===
        DRUG_STRENGTH_STATUS.INACTIVE
    );
};


/* =========================================================
   STATUS LABEL
   ========================================================= */

export const getDrugStrengthStatusLabel = (
    status
) => {

    if (
        status ===
        DRUG_STRENGTH_STATUS.INACTIVE
    ) {
        return "Inactive";
    }


    return "Active";
};


/* =========================================================
   STATUS COLOR
   ========================================================= */

export const getDrugStrengthStatusColor = (
    status
) => {

    if (
        status ===
        DRUG_STRENGTH_STATUS.INACTIVE
    ) {
        return "default";
    }


    return "success";
};


/* =========================================================
   USAGE LABEL
   ========================================================= */

export const getDrugStrengthUsageLabel = (
    mappedDrugCount
) => {

    const count =
        Number(
            mappedDrugCount
        ) || 0;


    if (
        count > 0
    ) {
        return "Used";
    }


    return "Unused";
};


/* =========================================================
   EXPORT
   ========================================================= */

export default {
    normalizeStrengthValue,

    normalizeDecimalPrecision,

    formatStrengthValue,

    formatStrengthDisplay,

    generateStrengthCode,

    normalizeStrengthCode,

    normalizeUnitCode,

    normalizeStrengthStatus,

    normalizeDrugStrengthForm,

    createEmptyDrugStrength,

    mapDrugStrengthToForm,

    createStrengthDuplicateKey,

    findDuplicateDrugStrength,

    findDuplicateStrengthCode,

    validateStrengthValue,

    validateStrengthCode,

    validateDrugStrengthForm,

    canDeleteDrugStrength,

    canDeactivateDrugStrength,

    canActivateDrugStrength,

    getDrugStrengthStatusLabel,

    getDrugStrengthStatusColor,

    getDrugStrengthUsageLabel,
};