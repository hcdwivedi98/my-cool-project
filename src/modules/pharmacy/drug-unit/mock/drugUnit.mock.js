/* =========================================================
   DRUG UNIT MOCK DATA
   ========================================================= */

import {
    DRUG_UNIT_STATUS,
    DRUG_UNIT_TYPES,
} from "../constants/drugUnit.constants";


/* =========================================================
   DRUG UNIT LIST
   ========================================================= */

export const drugUnitList = [

    /* =====================================================
       MASS
    ===================================================== */

    {
        id: "DU-001",

        unitCode: "MG",

        unitName: "Milligram",

        symbol: "mg",

        unitType:
            DRUG_UNIT_TYPES.MASS,

        decimalPrecision: 3,

        description:
            "Metric unit of mass commonly used for drug strength and dosage.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 86,

        drugCount: 86,

        createdAt:
            "2026-01-05T09:00:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-12T10:30:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-002",

        unitCode: "MCG",

        unitName: "Microgram",

        symbol: "mcg",

        unitType:
            DRUG_UNIT_TYPES.MASS,

        decimalPrecision: 6,

        description:
            "Metric unit of mass used for very small drug quantities.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 42,

        drugCount: 42,

        createdAt:
            "2026-01-05T09:10:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-10T11:15:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-003",

        unitCode: "G",

        unitName: "Gram",

        symbol: "g",

        unitType:
            DRUG_UNIT_TYPES.MASS,

        decimalPrecision: 2,

        description:
            "Metric unit of mass.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 28,

        drugCount: 28,

        createdAt:
            "2026-01-05T09:20:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-08T09:20:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-004",

        unitCode: "KG",

        unitName: "Kilogram",

        symbol: "kg",

        unitType:
            DRUG_UNIT_TYPES.MASS,

        decimalPrecision: 3,

        description:
            "Metric unit of mass used for larger quantities.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 11,

        drugCount: 11,

        createdAt:
            "2026-01-05T09:30:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-07T08:30:00",

        updatedBy:
            "admin",

        version: 1,
    },


    /* =====================================================
       VOLUME
    ===================================================== */

    {
        id: "DU-005",

        unitCode: "ML",

        unitName: "Millilitre",

        symbol: "mL",

        unitType:
            DRUG_UNIT_TYPES.VOLUME,

        decimalPrecision: 2,

        description:
            "Metric unit of volume commonly used for liquid medicines.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 72,

        drugCount: 72,

        createdAt:
            "2026-01-05T09:40:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-12T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-006",

        unitCode: "L",

        unitName: "Litre",

        symbol: "L",

        unitType:
            DRUG_UNIT_TYPES.VOLUME,

        decimalPrecision: 2,

        description:
            "Metric unit of volume.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 15,

        drugCount: 15,

        createdAt:
            "2026-01-05T09:50:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-05T12:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    /* =====================================================
       COUNT
    ===================================================== */

    {
        id: "DU-007",

        unitCode: "TAB",

        unitName: "Tablet",

        symbol: "tab",

        unitType:
            DRUG_UNIT_TYPES.COUNT,

        decimalPrecision: 0,

        description:
            "Discrete unit representing one tablet.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 124,

        drugCount: 124,

        createdAt:
            "2026-01-05T10:00:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-12T09:45:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-008",

        unitCode: "CAP",

        unitName: "Capsule",

        symbol: "cap",

        unitType:
            DRUG_UNIT_TYPES.COUNT,

        decimalPrecision: 0,

        description:
            "Discrete unit representing one capsule.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 58,

        drugCount: 58,

        createdAt:
            "2026-01-05T10:10:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-11T14:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-009",

        unitCode: "PCS",

        unitName: "Piece",

        symbol: "pc",

        unitType:
            DRUG_UNIT_TYPES.COUNT,

        decimalPrecision: 0,

        description:
            "Generic discrete count unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 9,

        drugCount: 9,

        createdAt:
            "2026-02-02T10:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-01T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    /* =====================================================
       PACKAGING
    ===================================================== */

    {
        id: "DU-010",

        unitCode: "VIAL",

        unitName: "Vial",

        symbol: "vial",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Pharmaceutical packaging unit for injectable products.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 34,

        drugCount: 34,

        createdAt:
            "2026-01-05T10:20:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-10T09:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-011",

        unitCode: "AMP",

        unitName: "Ampoule",

        symbol: "amp",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Sealed pharmaceutical packaging unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 27,

        drugCount: 27,

        createdAt:
            "2026-01-05T10:30:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-09T10:30:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-012",

        unitCode: "BTL",

        unitName: "Bottle",

        symbol: "btl",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Bottle packaging unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 21,

        drugCount: 21,

        createdAt:
            "2026-02-04T10:30:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-03T11:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-013",

        unitCode: "STRIP",

        unitName: "Strip",

        symbol: "strip",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Blister strip packaging unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 36,

        drugCount: 36,

        createdAt:
            "2026-02-05T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-04T12:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-014",

        unitCode: "TUBE",

        unitName: "Tube",

        symbol: "tube",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Tube packaging unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 14,

        drugCount: 14,

        createdAt:
            "2026-02-06T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-05T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-015",

        unitCode: "SACHET",

        unitName: "Sachet",

        symbol: "sachet",

        unitType:
            DRUG_UNIT_TYPES.PACKAGING,

        decimalPrecision: 0,

        description:
            "Single sachet packaging unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 8,

        drugCount: 8,

        createdAt:
            "2026-02-07T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-05T11:30:00",

        updatedBy:
            "admin",

        version: 1,
    },


    /* =====================================================
       BIOLOGICAL
    ===================================================== */

    {
        id: "DU-016",

        unitCode: "IU",

        unitName: "International Unit",

        symbol: "IU",

        unitType:
            DRUG_UNIT_TYPES.BIOLOGICAL,

        decimalPrecision: 0,

        description:
            "International unit used for biological activity.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: true,

        usageCount: 19,

        drugCount: 19,

        createdAt:
            "2026-01-05T11:00:00",

        createdBy:
            "system",

        updatedAt:
            "2026-06-06T09:30:00",

        updatedBy:
            "admin",

        version: 1,
    },


    /* =====================================================
       OTHER
    ===================================================== */

    {
        id: "DU-017",

        unitCode: "DROP",

        unitName: "Drop",

        symbol: "drop",

        unitType:
            DRUG_UNIT_TYPES.OTHER,

        decimalPrecision: 0,

        description:
            "Single drop used for ophthalmic and liquid preparations.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 12,

        drugCount: 12,

        createdAt:
            "2026-02-10T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-06T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-018",

        unitCode: "PUFF",

        unitName: "Puff",

        symbol: "puff",

        unitType:
            DRUG_UNIT_TYPES.OTHER,

        decimalPrecision: 0,

        description:
            "Single inhalation dose unit.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 7,

        drugCount: 7,

        createdAt:
            "2026-02-11T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-07T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },


    {
        id: "DU-019",

        unitCode: "DAY",

        unitName: "Day",

        symbol: "day",

        unitType:
            DRUG_UNIT_TYPES.TIME,

        decimalPrecision: 0,

        description:
            "Time unit used for treatment duration.",

        isActive: false,

        status:
            DRUG_UNIT_STATUS.INACTIVE,

        isSystemDefined: false,

        usageCount: 0,

        drugCount: 0,

        createdAt:
            "2026-02-12T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-05-01T10:00:00",

        updatedBy:
            "admin",

        version: 2,
    },


    {
        id: "DU-020",

        unitCode: "HR",

        unitName: "Hour",

        symbol: "hr",

        unitType:
            DRUG_UNIT_TYPES.TIME,

        decimalPrecision: 0,

        description:
            "Time unit used for treatment duration.",

        isActive: true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        isSystemDefined: false,

        usageCount: 0,

        drugCount: 0,

        createdAt:
            "2026-02-13T11:00:00",

        createdBy:
            "admin",

        updatedAt:
            "2026-06-01T10:00:00",

        updatedBy:
            "admin",

        version: 1,
    },

];


/* =========================================================
   MOCK RESPONSE HELPERS
   ========================================================= */

export const getDrugUnitMockById = (
    id
) => {

    return drugUnitList.find(
        (item) =>
            item.id === id
    ) || null;
};


/* =========================================================
   MOCK ACTIVE UNITS
   ========================================================= */

export const getActiveDrugUnits = () => {

    return drugUnitList.filter(
        (item) =>
            item.isActive === true
    );
};


/* =========================================================
   MOCK USED UNITS
   ========================================================= */

export const getUsedDrugUnits = () => {

    return drugUnitList.filter(
        (item) =>
            Number(
                item.usageCount
            ) > 0
    );
};


/* =========================================================
   MOCK UNUSED UNITS
   ========================================================= */

export const getUnusedDrugUnits = () => {

    return drugUnitList.filter(
        (item) =>
            Number(
                item.usageCount
            ) === 0
    );
};


/* =========================================================
   MOCK COUNTS
   ========================================================= */

export const getDrugUnitMockStats = () => {

    const total =
        drugUnitList.length;

    const active =
        drugUnitList.filter(
            (item) =>
                item.isActive === true
        ).length;

    const inactive =
        drugUnitList.filter(
            (item) =>
                item.isActive === false
        ).length;

    const mappedDrugs =
        drugUnitList.reduce(
            (
                totalCount,
                item
            ) =>
                totalCount +
                (
                    Number(
                        item.drugCount
                    ) || 0
                ),
            0
        );

    return {
        total,

        active,

        inactive,

        mappedDrugs,
    };
};