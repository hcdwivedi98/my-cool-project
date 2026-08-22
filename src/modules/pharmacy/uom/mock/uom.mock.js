// src/modules/pharmacy/uom/mock/uom.mock.js

/*
 * ============================================
 * UOM MASTER MOCK DATA
 * ============================================
 *
 * IMPORTANT:
 *
 * This file contains master UOM definitions only.
 *
 * Drug-specific packaging conversion such as:
 *
 *   1 BOX = 10 STRIPS
 *   1 STRIP = 10 TABLETS
 *
 * should NOT be maintained here.
 *
 * That relationship belongs to Drug Master.
 */

export const uomList = [
    /*
     * ========================================
     * MASS
     * ========================================
     */

    {
        id: 1,

        uomCode: "MCG",
        uomName: "Microgram",
        shortName: "mcg",

        uomType: "MASS",

        baseUnitId: 1,
        baseUnitCode: "MCG",
        baseUnitName: "Microgram",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Unit of mass equal to one microgram.",

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-01",
    },

    {
        id: 2,

        uomCode: "MG",
        uomName: "Milligram",
        shortName: "mg",

        uomType: "MASS",

        baseUnitId: 2,
        baseUnitCode: "MG",
        baseUnitName: "Milligram",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Unit of mass commonly used for medicine strength.",

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-01",
    },

    {
        id: 3,

        uomCode: "G",
        uomName: "Gram",
        shortName: "g",

        uomType: "MASS",

        baseUnitId: 2,
        baseUnitCode: "MG",
        baseUnitName: "Milligram",

        conversionFactor: 1000,

        decimalAllowed: true,

        status: "Active",

        description:
            "Unit of mass equal to 1000 milligrams.",

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-01",
    },

    {
        id: 4,

        uomCode: "KG",
        uomName: "Kilogram",
        shortName: "kg",

        uomType: "MASS",

        baseUnitId: 2,
        baseUnitCode: "MG",
        baseUnitName: "Milligram",

        conversionFactor: 1000000,

        decimalAllowed: true,

        status: "Active",

        description:
            "Unit of mass equal to 1000 grams.",

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-01",
    },

    /*
     * ========================================
     * VOLUME
     * ========================================
     */

    {
        id: 5,

        uomCode: "ML",
        uomName: "Millilitre",
        shortName: "mL",

        uomType: "VOLUME",

        baseUnitId: 5,
        baseUnitCode: "ML",
        baseUnitName: "Millilitre",

        conversionFactor: 1,

        decimalAllowed: true,

        status: "Active",

        description:
            "Unit of volume commonly used for liquid medicines.",

        createdBy: "Admin",
        createdOn: "2026-08-02",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-02",
    },

    {
        id: 6,

        uomCode: "L",
        uomName: "Litre",
        shortName: "L",

        uomType: "VOLUME",

        baseUnitId: 5,
        baseUnitCode: "ML",
        baseUnitName: "Millilitre",

        conversionFactor: 1000,

        decimalAllowed: true,

        status: "Active",

        description:
            "Unit of volume equal to 1000 millilitres.",

        createdBy: "Admin",
        createdOn: "2026-08-02",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-02",
    },

    /*
     * ========================================
     * COUNT
     * ========================================
     */

    {
        id: 7,

        uomCode: "UNIT",
        uomName: "Unit",
        shortName: "unit",

        uomType: "COUNT",

        baseUnitId: 7,
        baseUnitCode: "UNIT",
        baseUnitName: "Unit",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Generic countable unit.",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 8,

        uomCode: "TABLET",
        uomName: "Tablet",
        shortName: "Tab",

        uomType: "COUNT",

        baseUnitId: 7,
        baseUnitCode: "UNIT",
        baseUnitName: "Unit",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Countable pharmaceutical tablet unit.",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 9,

        uomCode: "CAPSULE",
        uomName: "Capsule",
        shortName: "Cap",

        uomType: "COUNT",

        baseUnitId: 7,
        baseUnitCode: "UNIT",
        baseUnitName: "Unit",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Countable pharmaceutical capsule unit.",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 10,

        uomCode: "VIAL",
        uomName: "Vial",
        shortName: "Vial",

        uomType: "COUNT",

        baseUnitId: 7,
        baseUnitCode: "UNIT",
        baseUnitName: "Unit",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Countable pharmaceutical vial unit.",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 11,

        uomCode: "AMPOULE",
        uomName: "Ampoule",
        shortName: "Amp",

        uomType: "COUNT",

        baseUnitId: 7,
        baseUnitCode: "UNIT",
        baseUnitName: "Unit",

        conversionFactor: 1,

        decimalAllowed: false,

        status: "Active",

        description:
            "Countable pharmaceutical ampoule unit.",

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    /*
     * ========================================
     * PACKAGING
     * ========================================
     *
     * No global conversion factor is used here.
     *
     * Example:
     *
     * BOX can contain:
     * 10 STRIPS for one Drug
     * 20 STRIPS for another Drug
     *
     * Therefore the actual conversion belongs
     * to Drug Master packaging configuration.
     */

    {
        id: 12,

        uomCode: "STRIP",
        uomName: "Strip",
        shortName: "Strip",

        uomType: "PACKAGING",

        baseUnitId: null,
        baseUnitCode: null,
        baseUnitName: null,

        conversionFactor: null,

        decimalAllowed: false,

        status: "Active",

        description:
            "Pharmaceutical strip packaging unit. Quantity per strip is defined at Drug level.",

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },

    {
        id: 13,

        uomCode: "BOTTLE",
        uomName: "Bottle",
        shortName: "Btl",

        uomType: "PACKAGING",

        baseUnitId: null,
        baseUnitCode: null,
        baseUnitName: null,

        conversionFactor: null,

        decimalAllowed: false,

        status: "Active",

        description:
            "Pharmaceutical bottle packaging unit. Fill volume is defined at Drug level.",

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },

    {
        id: 14,

        uomCode: "BOX",
        uomName: "Box",
        shortName: "Box",

        uomType: "PACKAGING",

        baseUnitId: null,
        baseUnitCode: null,
        baseUnitName: null,

        conversionFactor: null,

        decimalAllowed: false,

        status: "Active",

        description:
            "Outer packaging unit. Pack quantity is defined at Drug level.",

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },

    {
        id: 15,

        uomCode: "PACK",
        uomName: "Pack",
        shortName: "Pack",

        uomType: "PACKAGING",

        baseUnitId: null,
        baseUnitCode: null,
        baseUnitName: null,

        conversionFactor: null,

        decimalAllowed: false,

        status: "Active",

        description:
            "General pharmaceutical packaging unit. Actual quantity is defined at Drug level.",

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },

    /*
     * ========================================
     * INACTIVE LEGACY UNIT
     * ========================================
     */

    {
        id: 16,

        uomCode: "OLD-UNIT",
        uomName: "Old Unit",
        shortName: "OU",

        uomType: "OTHER",

        baseUnitId: null,
        baseUnitCode: null,
        baseUnitName: null,

        conversionFactor: null,

        decimalAllowed: false,

        status: "Inactive",

        description:
            "Legacy unit retained for historical reference.",

        createdBy: "Admin",
        createdOn: "2026-08-05",

        modifiedBy: "Pharmacy Manager",
        modifiedOn: "2026-08-10",
    },
];

/*
 * ============================================
 * UOM STATISTICS
 * ============================================
 */

export const uomStatistics = {
    total:
        uomList.length,

    active:
        uomList.filter(
            (item) =>
                item.status ===
                "Active"
        ).length,

    inactive:
        uomList.filter(
            (item) =>
                item.status ===
                "Inactive"
        ).length,

    mass:
        uomList.filter(
            (item) =>
                item.uomType ===
                "MASS"
        ).length,

    volume:
        uomList.filter(
            (item) =>
                item.uomType ===
                "VOLUME"
        ).length,

    count:
        uomList.filter(
            (item) =>
                item.uomType ===
                "COUNT"
        ).length,

    packaging:
        uomList.filter(
            (item) =>
                item.uomType ===
                "PACKAGING"
        ).length,
};

/*
 * ============================================
 * BASE UNITS
 * ============================================
 */

export const uomBaseUnits =
    uomList.filter(
        (item) =>
            item.baseUnitId ===
                item.id &&
            item.status ===
                "Active"
    );

/*
 * ============================================
 * ACTIVE UOMS
 * ============================================
 */

export const activeUomList =
    uomList.filter(
        (item) =>
            item.status ===
            "Active"
    );

/*
 * ============================================
 * DEFAULT EXPORT
 * ============================================
 */

export default uomList;