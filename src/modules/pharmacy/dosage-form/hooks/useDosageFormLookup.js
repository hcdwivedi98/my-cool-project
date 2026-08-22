// src/modules/pharmacy/dosage-form/hooks/useDosageFormLookup.js

import {
    DOSAGE_FORM_TYPES,
    DOSAGE_FORM_STATUS_OPTIONS,
    ROUTE_OF_ADMINISTRATION_OPTIONS,
    DOSAGE_FORM_USAGE_OPTIONS,
} from "../constants/dosageForm.constants";

import {
    activeDosageFormList,
} from "../mock/dosageForm.mock";


/*
 * =========================================================
 * UOM LOOKUP
 * =========================================================
 *
 * In production this should come from UOM Master API/store.
 *
 * For the current mock implementation we keep only the UOM
 * values required by the Dosage Form mock data.
 */

const UOM_OPTIONS = [
    {
        value: "TABLET",
        label: "Tablet",
    },
    {
        value: "CAPSULE",
        label: "Capsule",
    },
    {
        value: "VIAL",
        label: "Vial",
    },
    {
        value: "BOTTLE",
        label: "Bottle",
    },
    {
        value: "TUBE",
        label: "Tube",
    },
    {
        value: "PUFF",
        label: "Puff",
    },
    {
        value: "SACHET",
        label: "Sachet",
    },
    {
        value: "SUPPOSITORY",
        label: "Suppository",
    },
    {
        value: "PATCH",
        label: "Patch",
    },
];


/*
 * =========================================================
 * ACTIVE DOSAGE FORM OPTIONS
 * =========================================================
 *
 * Useful when another module needs to select a dosage form.
 */

const dosageFormOptions =
    activeDosageFormList.map(
        (item) => ({
            value: item.id,
            label: item.formName,
        })
    );


/*
 * =========================================================
 * LOOKUP HOOK
 * =========================================================
 */

const useDosageFormLookup = () => {

    return {

        /*
         * Form Type
         */

        formTypes:
            DOSAGE_FORM_TYPES,


        /*
         * Status
         */

        statuses:
            DOSAGE_FORM_STATUS_OPTIONS,


        /*
         * Route of Administration
         */

        routesOfAdministration:
            ROUTE_OF_ADMINISTRATION_OPTIONS,


        /*
         * UOM
         */

        uoms:
            UOM_OPTIONS,


        /*
         * Usage
         */

        usageOptions:
            DOSAGE_FORM_USAGE_OPTIONS,


        /*
         * Active Dosage Forms
         */

        activeDosageForms:
            activeDosageFormList,


        /*
         * Dosage Form Select Options
         */

        dosageFormOptions,
    };
};


export default useDosageFormLookup;