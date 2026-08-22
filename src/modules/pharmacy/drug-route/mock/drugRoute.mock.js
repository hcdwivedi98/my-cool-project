// src/modules/pharmacy/drug-route/mock/drugRoute.mock.js


/*
 * =========================================================
 * DRUG ROUTE MOCK DATA
 * =========================================================
 *
 * This file represents development/mock data only.
 *
 * Production data will come from:
 *
 * ASP.NET Core API
 *        ↓
 * DrugRoute Service
 *        ↓
 * Database
 */


/*
 * =========================================================
 * MOCK DATA
 * =========================================================
 */

export const drugRouteList = [

    /*
     * =====================================================
     * 1. ORAL
     * =====================================================
     */

    {
        id: 1,

        routeCode: "PO",

        routeName: "Oral",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine through the mouth.",

        status: "Active",

        sortOrder: 10,

        drugCount: 28,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:30:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:30:00",
    },


    /*
     * =====================================================
     * 2. INTRAVENOUS
     * =====================================================
     */

    {
        id: 2,

        routeCode: "IV",

        routeName: "Intravenous",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine directly into a vein.",

        status: "Active",

        sortOrder: 20,

        drugCount: 18,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:35:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:35:00",
    },


    /*
     * =====================================================
     * 3. INTRAMUSCULAR
     * =====================================================
     */

    {
        id: 3,

        routeCode: "IM",

        routeName: "Intramuscular",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine into a muscle.",

        status: "Active",

        sortOrder: 30,

        drugCount: 12,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:40:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:40:00",
    },


    /*
     * =====================================================
     * 4. SUBCUTANEOUS
     * =====================================================
     */

    {
        id: 4,

        routeCode: "SC",

        routeName: "Subcutaneous",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine into the tissue beneath the skin.",

        status: "Active",

        sortOrder: 40,

        drugCount: 9,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:45:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:45:00",
    },


    /*
     * =====================================================
     * 5. TOPICAL
     * =====================================================
     */

    {
        id: 5,

        routeCode: "TOP",

        routeName: "Topical",

        routeType: "LOCAL",

        description:
            "Application of a medicine directly to the skin or external surface.",

        status: "Active",

        sortOrder: 50,

        drugCount: 15,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:50:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:50:00",
    },


    /*
     * =====================================================
     * 6. OPHTHALMIC
     * =====================================================
     */

    {
        id: 6,

        routeCode: "OPH",

        routeName: "Ophthalmic",

        routeType: "LOCAL",

        description:
            "Administration of a medicine to the eye.",

        status: "Active",

        sortOrder: 60,

        drugCount: 8,

        createdBy: "System Admin",

        createdOn: "2026-01-05 09:55:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-05 09:55:00",
    },


    /*
     * =====================================================
     * 7. OTIC
     * =====================================================
     */

    {
        id: 7,

        routeCode: "OTIC",

        routeName: "Otic",

        routeType: "LOCAL",

        description:
            "Administration of a medicine into the ear.",

        status: "Active",

        sortOrder: 70,

        drugCount: 5,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:00:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:00:00",
    },


    /*
     * =====================================================
     * 8. NASAL
     * =====================================================
     */

    {
        id: 8,

        routeCode: "NAS",

        routeName: "Nasal",

        routeType: "LOCAL",

        description:
            "Administration of a medicine through the nasal passage.",

        status: "Active",

        sortOrder: 80,

        drugCount: 6,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:05:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:05:00",
    },


    /*
     * =====================================================
     * 9. RECTAL
     * =====================================================
     */

    {
        id: 9,

        routeCode: "REC",

        routeName: "Rectal",

        routeType: "LOCAL",

        description:
            "Administration of a medicine through the rectum.",

        status: "Active",

        sortOrder: 90,

        drugCount: 4,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:10:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:10:00",
    },


    /*
     * =====================================================
     * 10. VAGINAL
     * =====================================================
     */

    {
        id: 10,

        routeCode: "VAG",

        routeName: "Vaginal",

        routeType: "LOCAL",

        description:
            "Administration of a medicine through the vaginal route.",

        status: "Active",

        sortOrder: 100,

        drugCount: 3,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:15:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:15:00",
    },


    /*
     * =====================================================
     * 11. SUBLINGUAL
     * =====================================================
     */

    {
        id: 11,

        routeCode: "SL",

        routeName: "Sublingual",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine under the tongue.",

        status: "Active",

        sortOrder: 110,

        drugCount: 3,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:20:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:20:00",
    },


    /*
     * =====================================================
     * 12. BUCCAL
     * =====================================================
     */

    {
        id: 12,

        routeCode: "BUCC",

        routeName: "Buccal",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine through the buccal mucosa.",

        status: "Active",

        sortOrder: 120,

        drugCount: 2,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:25:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:25:00",
    },


    /*
     * =====================================================
     * 13. INHALATION
     * =====================================================
     */

    {
        id: 13,

        routeCode: "INH",

        routeName: "Inhalation",

        routeType: "SYSTEMIC",

        description:
            "Administration of a medicine through inhalation into the respiratory tract.",

        status: "Active",

        sortOrder: 130,

        drugCount: 10,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:30:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:30:00",
    },


    /*
     * =====================================================
     * 14. TRANSDERMAL
     * =====================================================
     */

    {
        id: 14,

        routeCode: "TD",

        routeName: "Transdermal",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine through the skin using a transdermal delivery system.",

        status: "Active",

        sortOrder: 140,

        drugCount: 4,

        createdBy: "System Admin",

        createdOn: "2026-01-06 09:35:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-06 09:35:00",
    },


    /*
     * =====================================================
     * 15. INTRADERMAL
     * =====================================================
     */

    {
        id: 15,

        routeCode: "ID",

        routeName: "Intradermal",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine into the dermis of the skin.",

        status: "Active",

        sortOrder: 150,

        drugCount: 1,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:00:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:00:00",
    },


    /*
     * =====================================================
     * 16. INTRAARTICULAR
     * =====================================================
     */

    {
        id: 16,

        routeCode: "IA",

        routeName: "Intra-articular",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine directly into a joint.",

        status: "Active",

        sortOrder: 160,

        drugCount: 1,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:05:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:05:00",
    },


    /*
     * =====================================================
     * 17. INTRATHECAL
     * =====================================================
     */

    {
        id: 17,

        routeCode: "IT",

        routeName: "Intrathecal",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine into the intrathecal space.",

        status: "Active",

        sortOrder: 170,

        drugCount: 0,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:10:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:10:00",
    },


    /*
     * =====================================================
     * 18. INTRAOCULAR
     * =====================================================
     */

    {
        id: 18,

        routeCode: "IOC",

        routeName: "Intraocular",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine into the eye.",

        status: "Inactive",

        sortOrder: 180,

        drugCount: 0,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:15:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:15:00",
    },


    /*
     * =====================================================
     * 19. INTRAVESICAL
     * =====================================================
     */

    {
        id: 19,

        routeCode: "IVS",

        routeName: "Intravesical",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine directly into the urinary bladder.",

        status: "Active",

        sortOrder: 190,

        drugCount: 0,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:20:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:20:00",
    },


    /*
     * =====================================================
     * 20. INTRAPERITONEAL
     * =====================================================
     */

    {
        id: 20,

        routeCode: "IP",

        routeName: "Intraperitoneal",

        routeType: "SPECIALIZED",

        description:
            "Administration of a medicine into the peritoneal cavity.",

        status: "Inactive",

        sortOrder: 200,

        drugCount: 0,

        createdBy: "System Admin",

        createdOn: "2026-01-07 09:25:00",

        modifiedBy: "System Admin",

        modifiedOn: "2026-01-07 09:25:00",
    },
];


/*
 * =========================================================
 * ACTIVE DRUG ROUTES
 * =========================================================
 */

export const activeDrugRouteList =
    drugRouteList.filter(
        (item) =>
            item.status ===
            "Active"
    );


/*
 * =========================================================
 * USED DRUG ROUTES
 * =========================================================
 */

export const usedDrugRouteList =
    drugRouteList.filter(
        (item) =>
            Number(
                item.drugCount
            ) > 0
    );


/*
 * =========================================================
 * UNUSED DRUG ROUTES
 * =========================================================
 */

export const unusedDrugRouteList =
    drugRouteList.filter(
        (item) =>
            Number(
                item.drugCount
            ) === 0
    );


/*
 * =========================================================
 * DEFAULT EXPORT
 * =========================================================
 */

export default drugRouteList;