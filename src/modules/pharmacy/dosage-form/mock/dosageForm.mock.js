// src/modules/pharmacy/dosage-form/mock/dosageForm.mock.js

/*
 * =========================================================
 * DOSAGE FORM MOCK DATA
 * =========================================================
 */

export const dosageFormList = [

    /*
     * -----------------------------------------------------
     * TABLET
     * -----------------------------------------------------
     */

    {
        id: 1,

        formCode:
            "TAB",

        formName:
            "Tablet",

        formType:
            "SOLID",

        description:
            "Solid pharmaceutical dosage form intended primarily for oral administration.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "TABLET",

        uomName:
            "Tablet",

        status:
            "Active",

        sortOrder:
            10,

        drugCount:
            125,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-10 09:30:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-10 09:30:00",
    },


    /*
     * -----------------------------------------------------
     * CAPSULE
     * -----------------------------------------------------
     */

    {
        id: 2,

        formCode:
            "CAP",

        formName:
            "Capsule",

        formType:
            "SOLID",

        description:
            "Solid dosage form consisting of a shell containing the active pharmaceutical ingredient.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "CAPSULE",

        uomName:
            "Capsule",

        status:
            "Active",

        sortOrder:
            20,

        drugCount:
            82,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-10 09:35:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-10 09:35:00",
    },


    /*
     * -----------------------------------------------------
     * INJECTION
     * -----------------------------------------------------
     */

    {
        id: 3,

        formCode:
            "INJ",

        formName:
            "Injection",

        formType:
            "LIQUID",

        description:
            "Sterile pharmaceutical preparation intended for parenteral administration.",

        routeOfAdministrationId:
            "PARENTERAL",

        routeOfAdministrationName:
            "Parenteral",

        uomId:
            "VIAL",

        uomName:
            "Vial",

        status:
            "Active",

        sortOrder:
            30,

        drugCount:
            46,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-11 10:00:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-11 10:00:00",
    },


    /*
     * -----------------------------------------------------
     * SYRUP
     * -----------------------------------------------------
     */

    {
        id: 4,

        formCode:
            "SYR",

        formName:
            "Syrup",

        formType:
            "LIQUID",

        description:
            "Liquid oral pharmaceutical preparation containing active pharmaceutical ingredients.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "BOTTLE",

        uomName:
            "Bottle",

        status:
            "Active",

        sortOrder:
            40,

        drugCount:
            38,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-11 10:20:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-11 10:20:00",
    },


    /*
     * -----------------------------------------------------
     * SUSPENSION
     * -----------------------------------------------------
     */

    {
        id: 5,

        formCode:
            "SUS",

        formName:
            "Suspension",

        formType:
            "LIQUID",

        description:
            "Liquid dosage form containing finely divided insoluble particles dispersed in a liquid medium.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "BOTTLE",

        uomName:
            "Bottle",

        status:
            "Active",

        sortOrder:
            50,

        drugCount:
            24,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-12 09:15:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-12 09:15:00",
    },


    /*
     * -----------------------------------------------------
     * CREAM
     * -----------------------------------------------------
     */

    {
        id: 6,

        formCode:
            "CRM",

        formName:
            "Cream",

        formType:
            "SEMI_SOLID",

        description:
            "Semi-solid pharmaceutical preparation generally intended for topical application.",

        routeOfAdministrationId:
            "TOPICAL",

        routeOfAdministrationName:
            "Topical",

        uomId:
            "TUBE",

        uomName:
            "Tube",

        status:
            "Active",

        sortOrder:
            60,

        drugCount:
            18,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-12 09:30:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-12 09:30:00",
    },


    /*
     * -----------------------------------------------------
     * OINTMENT
     * -----------------------------------------------------
     */

    {
        id: 7,

        formCode:
            "ONT",

        formName:
            "Ointment",

        formType:
            "SEMI_SOLID",

        description:
            "Semi-solid preparation intended primarily for application to the skin or mucous membranes.",

        routeOfAdministrationId:
            "TOPICAL",

        routeOfAdministrationName:
            "Topical",

        uomId:
            "TUBE",

        uomName:
            "Tube",

        status:
            "Active",

        sortOrder:
            70,

        drugCount:
            12,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-13 10:00:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-13 10:00:00",
    },


    /*
     * -----------------------------------------------------
     * EYE DROPS
     * -----------------------------------------------------
     */

    {
        id: 8,

        formCode:
            "EDR",

        formName:
            "Eye Drops",

        formType:
            "LIQUID",

        description:
            "Liquid ophthalmic preparation administered as drops into the eye.",

        routeOfAdministrationId:
            "OPHTHALMIC",

        routeOfAdministrationName:
            "Ophthalmic",

        uomId:
            "BOTTLE",

        uomName:
            "Bottle",

        status:
            "Active",

        sortOrder:
            80,

        drugCount:
            15,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-13 10:15:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-13 10:15:00",
    },


    /*
     * -----------------------------------------------------
     * EAR DROPS
     * -----------------------------------------------------
     */

    {
        id: 9,

        formCode:
            "ODR",

        formName:
            "Ear Drops",

        formType:
            "LIQUID",

        description:
            "Liquid otic preparation administered as drops into the ear.",

        routeOfAdministrationId:
            "OTIC",

        routeOfAdministrationName:
            "Otic",

        uomId:
            "BOTTLE",

        uomName:
            "Bottle",

        status:
            "Active",

        sortOrder:
            90,

        drugCount:
            9,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-14 09:00:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-14 09:00:00",
    },


    /*
     * -----------------------------------------------------
     * INHALER
     * -----------------------------------------------------
     */

    {
        id: 10,

        formCode:
            "INH",

        formName:
            "Inhaler",

        formType:
            "GAS",

        description:
            "Dosage form designed to deliver medication directly to the respiratory tract through inhalation.",

        routeOfAdministrationId:
            "INHALATION",

        routeOfAdministrationName:
            "Inhalation",

        uomId:
            "PUFF",

        uomName:
            "Puff",

        status:
            "Active",

        sortOrder:
            100,

        drugCount:
            11,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-14 09:20:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-14 09:20:00",
    },


    /*
     * -----------------------------------------------------
     * POWDER
     * -----------------------------------------------------
     */

    {
        id: 11,

        formCode:
            "PWD",

        formName:
            "Powder",

        formType:
            "SOLID",

        description:
            "Dry solid dosage form consisting of finely divided particles.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "SACHET",

        uomName:
            "Sachet",

        status:
            "Active",

        sortOrder:
            110,

        drugCount:
            7,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-15 09:45:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-15 09:45:00",
    },


    /*
     * -----------------------------------------------------
     * SUPPOSITORY
     * -----------------------------------------------------
     */

    {
        id: 12,

        formCode:
            "SUP",

        formName:
            "Suppository",

        formType:
            "SOLID",

        description:
            "Solid dosage form intended for insertion into a body cavity where it dissolves or melts.",

        routeOfAdministrationId:
            "RECTAL",

        routeOfAdministrationName:
            "Rectal",

        uomId:
            "SUPPOSITORY",

        uomName:
            "Suppository",

        status:
            "Active",

        sortOrder:
            120,

        drugCount:
            4,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-15 10:10:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-15 10:10:00",
    },


    /*
     * -----------------------------------------------------
     * PATCH
     * -----------------------------------------------------
     */

    {
        id: 13,

        formCode:
            "PCH",

        formName:
            "Patch",

        formType:
            "SEMI_SOLID",

        description:
            "Dosage form designed to deliver medication through the skin over a defined period.",

        routeOfAdministrationId:
            "TRANSDERMAL",

        routeOfAdministrationName:
            "Transdermal",

        uomId:
            "PATCH",

        uomName:
            "Patch",

        status:
            "Active",

        sortOrder:
            130,

        drugCount:
            3,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-16 09:30:00",

        modifiedBy:
            "System Administrator",

        modifiedOn:
            "2026-01-16 09:30:00",
    },


    /*
     * -----------------------------------------------------
     * INACTIVE EXAMPLE
     * -----------------------------------------------------
     */

    {
        id: 14,

        formCode:
            "OLD-SYR",

        formName:
            "Legacy Syrup",

        formType:
            "LIQUID",

        description:
            "Legacy dosage form retained for historical drug mappings.",

        routeOfAdministrationId:
            "ORAL",

        routeOfAdministrationName:
            "Oral",

        uomId:
            "BOTTLE",

        uomName:
            "Bottle",

        status:
            "Inactive",

        sortOrder:
            140,

        drugCount:
            6,

        createdBy:
            "System Administrator",

        createdOn:
            "2026-01-16 10:00:00",

        modifiedBy:
            "Pharmacy Administrator",

        modifiedOn:
            "2026-02-01 11:30:00",
    },
];


/*
 * =========================================================
 * ACTIVE DOSAGE FORMS
 * =========================================================
 */

export const activeDosageFormList =
    dosageFormList.filter(
        (item) =>
            item.status ===
            "Active"
    );


/*
 * =========================================================
 * DOSAGE FORM BY ID
 * =========================================================
 */

export const getDosageFormById = (
    id
) => {

    return dosageFormList.find(
        (item) =>
            String(
                item.id
            ) ===
            String(id)
    );
};


/*
 * =========================================================
 * DOSAGE FORM BY CODE
 * =========================================================
 */

export const getDosageFormByCode = (
    code
) => {

    const normalizedCode =
        String(
            code ?? ""
        )
            .trim()
            .toLowerCase();


    return dosageFormList.find(
        (item) =>
            String(
                item.formCode
            )
                .trim()
                .toLowerCase() ===
            normalizedCode
    );
};


/*
 * =========================================================
 * DOSAGE FORM BY NAME
 * =========================================================
 */

export const getDosageFormByName = (
    name
) => {

    const normalizedName =
        String(
            name ?? ""
        )
            .trim()
            .toLowerCase();


    return dosageFormList.find(
        (item) =>
            String(
                item.formName
            )
                .trim()
                .toLowerCase() ===
            normalizedName
    );
};


export default dosageFormList;