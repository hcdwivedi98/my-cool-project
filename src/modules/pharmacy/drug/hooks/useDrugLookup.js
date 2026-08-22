import { useMemo } from "react";

import {
    DRUG_CATEGORIES,
    DRUG_SCHEDULES,
    DRUG_TYPES,
    DOSAGE_FORMS,
    ROUTES,
    STORAGE_CONDITIONS,
    UNITS,
    STRENGTH_UNITS,
} from "../constants/drug.constants";

const manufacturers = [
    {
        label: "ABC Pharmaceuticals",
        value: 1,
    },
    {
        label: "XYZ Pharma Ltd.",
        value: 2,
    },
    {
        label: "Global Biotech Pharmaceuticals",
        value: 3,
    },
];

const suppliers = [
    {
        label: "ABC Pharma Distributors",
        value: 1,
    },
    {
        label: "XYZ Medical Distributors",
        value: 2,
    },
    {
        label: "Global Pharma Suppliers",
        value: 3,
    },
];

const useDrugLookup = () => {
    return useMemo(
        () => ({
            drugTypes: DRUG_TYPES,

            categories: DRUG_CATEGORIES,

            dosageForms: DOSAGE_FORMS,

            routes: ROUTES,

            storageConditions:
                STORAGE_CONDITIONS,

            units: UNITS,

            strengthUnits:
                STRENGTH_UNITS,

            schedules:
                DRUG_SCHEDULES,

            manufacturers,

            suppliers,
        }),
        []
    );
};

export default useDrugLookup;