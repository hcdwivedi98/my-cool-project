/* =========================================================
   DRUG UNIT HELPERS
   ========================================================= */

import {
    DRUG_UNIT_PRECISION,
    DRUG_UNIT_STATUS,
    DRUG_UNIT_TYPES,
} from "../constants/drugUnit.constants";


/* =========================================================
   NORMALIZE STRING
   ========================================================= */

export const normalizeDrugUnitString = (
    value
) => {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .trim()
        .replace(
            /\s+/g,
            " "
        );
};


/* =========================================================
   NORMALIZE CODE
   ========================================================= */

export const normalizeDrugUnitCode = (
    value
) => {

    return normalizeDrugUnitString(
        value
    )
        .toUpperCase();
};


/* =========================================================
   NORMALIZE SYMBOL
   ========================================================= */

export const normalizeDrugUnitSymbol = (
    value
) => {

    return normalizeDrugUnitString(
        value
    )
        .toLowerCase();
};


/* =========================================================
   DISPLAY TYPE
   ========================================================= */

export const getDrugUnitTypeLabel = (
    unitType
) => {

    const labels = {

        [DRUG_UNIT_TYPES.MASS]:
            "Mass",

        [DRUG_UNIT_TYPES.VOLUME]:
            "Volume",

        [DRUG_UNIT_TYPES.COUNT]:
            "Count",

        [DRUG_UNIT_TYPES.PACKAGING]:
            "Packaging",

        [DRUG_UNIT_TYPES.LENGTH]:
            "Length",

        [DRUG_UNIT_TYPES.AREA]:
            "Area",

        [DRUG_UNIT_TYPES.TIME]:
            "Time",

        [DRUG_UNIT_TYPES.BIOLOGICAL]:
            "Biological",

        [DRUG_UNIT_TYPES.OTHER]:
            "Other",
    };


    return (
        labels[unitType] ||
        unitType ||
        "-"
    );
};


/* =========================================================
   STATUS LABEL
   ========================================================= */

export const getDrugUnitStatusLabel = (
    isActive
) => {

    return isActive
        ? DRUG_UNIT_STATUS.ACTIVE
        : DRUG_UNIT_STATUS.INACTIVE;
};


/* =========================================================
   USAGE STATUS
   ========================================================= */

export const getDrugUnitUsageLabel = (
    usageCount
) => {

    return Number(
        usageCount
    ) > 0
        ? "Used"
        : "Unused";
};


/* =========================================================
   USAGE VALUE
   ========================================================= */

export const isDrugUnitUsed = (
    usageCount
) => {

    return (
        Number(
            usageCount
        ) > 0
    );
};


/* =========================================================
   PRECISION VALIDATION
   ========================================================= */

export const isValidDrugUnitPrecision = (
    value
) => {

    const precision =
        Number(value);


    return (
        Number.isInteger(
            precision
        )

        &&

        precision >=
            DRUG_UNIT_PRECISION.MIN

        &&

        precision <=
            DRUG_UNIT_PRECISION.MAX
    );
};


/* =========================================================
   COUNT TYPE PRECISION
   ========================================================= */

export const isCountUnitPrecisionValid = (
    unitType,
    decimalPrecision
) => {

    if (
        unitType !==
        DRUG_UNIT_TYPES.COUNT
    ) {

        return true;
    }


    return Number(
        decimalPrecision
    ) === 0;
};


/* =========================================================
   NORMALIZE FORM VALUES
   ========================================================= */

export const normalizeDrugUnitFormValues = (
    values = {}
) => {

    return {

        ...values,

        unitCode:
            normalizeDrugUnitCode(
                values.unitCode
            ),

        unitName:
            normalizeDrugUnitString(
                values.unitName
            ),

        symbol:
            normalizeDrugUnitString(
                values.symbol
            ),

        unitType:
            normalizeDrugUnitString(
                values.unitType
            ),

        decimalPrecision:
            Number(
                values.decimalPrecision ?? 0
            ),

        description:
            normalizeDrugUnitString(
                values.description
            ),

        isActive:
            values.isActive !== false,

    };
};


/* =========================================================
   CREATE DISPLAY NAME
   ========================================================= */

export const getDrugUnitDisplayName = (
    unit
) => {

    if (
        !unit
    ) {
        return "-";
    }


    const unitName =
        normalizeDrugUnitString(
            unit.unitName
        );

    const symbol =
        normalizeDrugUnitString(
            unit.symbol
        );


    if (
        unitName &&
        symbol
    ) {

        return `${unitName} (${symbol})`;
    }


    return (
        unitName ||
        symbol ||
        "-"
    );
};


/* =========================================================
   CREATE OPTION
   ========================================================= */

export const createDrugUnitOption = (
    unit
) => {

    if (
        !unit
    ) {
        return null;
    }


    return {

        label:
            getDrugUnitDisplayName(
                unit
            ),

        value:
            unit.id,

        unitCode:
            unit.unitCode,

        unitName:
            unit.unitName,

        symbol:
            unit.symbol,

        unitType:
            unit.unitType,

        decimalPrecision:
            unit.decimalPrecision,

        isActive:
            unit.isActive,

    };
};


/* =========================================================
   MAP TO LOOKUP OPTION
   ========================================================= */

export const mapDrugUnitsToOptions = (
    units = []
) => {

    return units
        .map(
            createDrugUnitOption
        )
        .filter(
            Boolean
        );
};


/* =========================================================
   CHECK DUPLICATE CODE
   ========================================================= */

export const hasDuplicateDrugUnitCode = (
    units = [],
    unitCode,
    excludeId = null
) => {

    const normalizedCode =
        normalizeDrugUnitCode(
            unitCode
        );


    if (
        !normalizedCode
    ) {
        return false;
    }


    return units.some(
        (item) => {

            if (
                excludeId &&
                item.id === excludeId
            ) {
                return false;
            }


            return (
                normalizeDrugUnitCode(
                    item.unitCode
                ) ===
                normalizedCode
            );
        }
    );
};


/* =========================================================
   CHECK DUPLICATE SYMBOL
   ========================================================= */

export const hasDuplicateDrugUnitSymbol = (
    units = [],
    symbol,
    excludeId = null
) => {

    const normalizedSymbol =
        normalizeDrugUnitSymbol(
            symbol
        );


    if (
        !normalizedSymbol
    ) {
        return false;
    }


    return units.some(
        (item) => {

            if (
                excludeId &&
                item.id === excludeId
            ) {
                return false;
            }


            return (
                normalizeDrugUnitSymbol(
                    item.symbol
                ) ===
                normalizedSymbol
            );
        }
    );
};


/* =========================================================
   CHECK DUPLICATE NAME + TYPE
   ========================================================= */

export const hasDuplicateDrugUnitNameAndType = (
    units = [],
    unitName,
    unitType,
    excludeId = null
) => {

    const normalizedName =
        normalizeDrugUnitString(
            unitName
        ).toLowerCase();


    if (
        !normalizedName ||
        !unitType
    ) {
        return false;
    }


    return units.some(
        (item) => {

            if (
                excludeId &&
                item.id === excludeId
            ) {
                return false;
            }


            return (

                normalizeDrugUnitString(
                    item.unitName
                ).toLowerCase() ===
                normalizedName

                &&

                item.unitType ===
                unitType

            );
        }
    );
};


/* =========================================================
   CAN DEACTIVATE
   ========================================================= */

export const canDeactivateDrugUnit = (
    unit
) => {

    if (
        !unit
    ) {
        return false;
    }


    /*
     * System-defined units should
     * not be deactivated automatically.
     */

    if (
        unit.isSystemDefined
    ) {
        return false;
    }


    return (
        unit.isActive === true
    );
};


/* =========================================================
   CAN DELETE
   ========================================================= */

export const canDeleteDrugUnit = (
    unit
) => {

    if (
        !unit
    ) {
        return false;
    }


    /*
     * Used or system-defined units
     * should never be hard deleted.
     */

    if (
        unit.isSystemDefined
    ) {
        return false;
    }


    if (
        isDrugUnitUsed(
            unit.usageCount
        )
    ) {
        return false;
    }


    return true;
};


/* =========================================================
   CAN EDIT
   ========================================================= */

export const canEditDrugUnit = (
    unit
) => {

    if (
        !unit
    ) {
        return false;
    }


    return true;
};


/* =========================================================
   GET STATUS TAG TYPE
   ========================================================= */

export const getDrugUnitStatusTagType = (
    isActive
) => {

    return isActive
        ? "success"
        : "default";
};


/* =========================================================
   GET USAGE TAG TYPE
   ========================================================= */

export const getDrugUnitUsageTagType = (
    usageCount
) => {

    return isDrugUnitUsed(
        usageCount
    )
        ? "processing"
        : "default";
};


/* =========================================================
   FORMAT PRECISION
   ========================================================= */

export const formatDrugUnitPrecision = (
    decimalPrecision
) => {

    const value =
        Number(
            decimalPrecision
        );


    if (
        !Number.isFinite(
            value
        )
    ) {
        return "0";
    }


    return String(
        value
    );
};


/* =========================================================
   FORMAT MAPPED DRUG COUNT
   ========================================================= */

export const formatDrugUnitUsageCount = (
    usageCount
) => {

    const value =
        Number(
            usageCount
        );


    if (
        !Number.isFinite(
            value
        )
    ) {
        return "0";
    }


    return value.toLocaleString();
};


/* =========================================================
   GET VALIDATION SUMMARY
   ========================================================= */

export const getDrugUnitValidationSummary = (
    values = {},
    units = [],
    excludeId = null
) => {

    const errors = [];


    if (
        !normalizeDrugUnitCode(
            values.unitCode
        )
    ) {

        errors.push(
            "Unit code is required."
        );
    }


    if (
        !normalizeDrugUnitString(
            values.unitName
        )
    ) {

        errors.push(
            "Unit name is required."
        );
    }


    if (
        !normalizeDrugUnitString(
            values.symbol
        )
    ) {

        errors.push(
            "Symbol is required."
        );
    }


    if (
        !values.unitType
    ) {

        errors.push(
            "Unit type is required."
        );
    }


    if (
        !isValidDrugUnitPrecision(
            values.decimalPrecision
        )
    ) {

        errors.push(
            "Decimal precision must be between 0 and 6."
        );
    }


    if (
        hasDuplicateDrugUnitCode(
            units,
            values.unitCode,
            excludeId
        )
    ) {

        errors.push(
            "Unit code already exists."
        );
    }


    if (
        hasDuplicateDrugUnitSymbol(
            units,
            values.symbol,
            excludeId
        )
    ) {

        errors.push(
            "Symbol already exists."
        );
    }


    if (
        hasDuplicateDrugUnitNameAndType(
            units,
            values.unitName,
            values.unitType,
            excludeId
        )
    ) {

        errors.push(
            "Unit name already exists for this unit type."
        );
    }


    if (
        !isCountUnitPrecisionValid(
            values.unitType,
            values.decimalPrecision
        )
    ) {

        errors.push(
            "Count units must use decimal precision 0."
        );
    }


    return {

        isValid:
            errors.length === 0,

        errors,

    };
};


/* =========================================================
   PREPARE PAYLOAD
   ========================================================= */

export const prepareDrugUnitPayload = (
    values = {}
) => {

    const normalized =
        normalizeDrugUnitFormValues(
            values
        );


    return {

        unitCode:
            normalized.unitCode,

        unitName:
            normalized.unitName,

        symbol:
            normalized.symbol,

        unitType:
            normalized.unitType,

        decimalPrecision:
            normalized.decimalPrecision,

        description:
            normalized.description,

        isActive:
            normalized.isActive,

    };
};


/* =========================================================
   EXPORT DEFAULT
   ========================================================= */

const drugUnitHelper = {

    normalizeDrugUnitString,

    normalizeDrugUnitCode,

    normalizeDrugUnitSymbol,

    getDrugUnitTypeLabel,

    getDrugUnitStatusLabel,

    getDrugUnitUsageLabel,

    isDrugUnitUsed,

    isValidDrugUnitPrecision,

    isCountUnitPrecisionValid,

    normalizeDrugUnitFormValues,

    getDrugUnitDisplayName,

    createDrugUnitOption,

    mapDrugUnitsToOptions,

    hasDuplicateDrugUnitCode,

    hasDuplicateDrugUnitSymbol,

    hasDuplicateDrugUnitNameAndType,

    canDeactivateDrugUnit,

    canDeleteDrugUnit,

    canEditDrugUnit,

    getDrugUnitStatusTagType,

    getDrugUnitUsageTagType,

    formatDrugUnitPrecision,

    formatDrugUnitUsageCount,

    getDrugUnitValidationSummary,

    prepareDrugUnitPayload,

};


export default drugUnitHelper;