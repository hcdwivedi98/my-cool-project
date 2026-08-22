// src/modules/pharmacy/generic/mock/generic.mock.js

export const genericList = [
    {
        id: 1,

        genericCode: "GEN-PCM",

        genericName: "Paracetamol",

        shortName: "PCM",

        description:
            "Analgesic and antipyretic medicine used for relief of mild to moderate pain and fever.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANALGESIC",

        pharmacologicalClass:
            "NON_OPIOID_ANALGESIC",

        dosageForms: [
            "TABLET",
            "SYRUP",
            "SUSPENSION",
            "INJECTION",
        ],

        routes: [
            "ORAL",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            false,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 8,

        createdBy: "Admin",

        createdOn: "2026-08-01",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-10",
    },

    {
        id: 2,

        genericCode: "GEN-AMX",

        genericName: "Amoxicillin",

        shortName: "AMX",

        description:
            "Broad-spectrum beta-lactam antibiotic used for treatment of susceptible bacterial infections.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIBIOTIC",

        pharmacologicalClass:
            "PENICILLIN",

        dosageForms: [
            "TABLET",
            "CAPSULE",
            "SYRUP",
            "SUSPENSION",
            "INJECTION",
        ],

        routes: [
            "ORAL",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 5,

        createdBy: "Admin",

        createdOn: "2026-08-02",

        modifiedBy:
            "Pharmacy Manager",

        modifiedOn: "2026-08-11",
    },

    {
        id: 3,

        genericCode: "GEN-CLAV",

        genericName:
            "Clavulanic Acid",

        shortName: "CLAV",

        description:
            "Beta-lactamase inhibitor commonly used in combination with beta-lactam antibiotics.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIBIOTIC",

        pharmacologicalClass:
            "PENICILLIN",

        dosageForms: [
            "TABLET",
            "SYRUP",
            "SUSPENSION",
            "INJECTION",
        ],

        routes: [
            "ORAL",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 4,

        createdBy: "Admin",

        createdOn: "2026-08-03",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-03",
    },

    {
        id: 4,

        genericCode: "GEN-METF",

        genericName:
            "Metformin",

        shortName: "MET",

        description:
            "Biguanide antihyperglycemic medicine used as part of the management of type 2 diabetes.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIDIABETIC",

        pharmacologicalClass:
            "BIGUANIDE",

        dosageForms: [
            "TABLET",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 6,

        createdBy: "Admin",

        createdOn: "2026-08-04",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-04",
    },

    {
        id: 5,

        genericCode: "GEN-AMLO",

        genericName:
            "Amlodipine",

        shortName: "AMLO",

        description:
            "Calcium channel blocker used for management of hypertension and certain cardiovascular conditions.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIHYPERTENSIVE",

        pharmacologicalClass:
            "CALCIUM_CHANNEL_BLOCKER",

        dosageForms: [
            "TABLET",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 4,

        createdBy: "Admin",

        createdOn: "2026-08-05",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-05",
    },

    {
        id: 6,

        genericCode: "GEN-CET",

        genericName:
            "Cetirizine",

        shortName: "CET",

        description:
            "Second-generation antihistamine used for relief of allergic symptoms.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIHISTAMINE",

        pharmacologicalClass:
            "H1_ANTAGONIST",

        dosageForms: [
            "TABLET",
            "SYRUP",
            "DROPS",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            false,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 3,

        createdBy: "Admin",

        createdOn: "2026-08-06",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-06",
    },

    {
        id: 7,

        genericCode: "GEN-OMEP",

        genericName:
            "Omeprazole",

        shortName: "OMP",

        description:
            "Proton pump inhibitor used to reduce gastric acid production.",

        genericType: "SINGLE",

        therapeuticClass:
            "GASTROINTESTINAL",

        pharmacologicalClass:
            "PROTON_PUMP_INHIBITOR",

        dosageForms: [
            "CAPSULE",
            "INJECTION",
        ],

        routes: [
            "ORAL",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 4,

        createdBy: "Admin",

        createdOn: "2026-08-07",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-07",
    },

    {
        id: 8,

        genericCode: "GEN-INS",

        genericName:
            "Human Insulin",

        shortName: "INS",

        description:
            "Insulin preparation used for glycemic control in patients requiring insulin therapy.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIDIABETIC",

        pharmacologicalClass:
            "INSULIN",

        dosageForms: [
            "INJECTION",
        ],

        routes: [
            "SUBCUTANEOUS",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: true,

        lasa: false,

        status: "Active",

        drugsCount: 3,

        createdBy: "Admin",

        createdOn: "2026-08-08",

        modifiedBy:
            "Pharmacy Manager",

        modifiedOn: "2026-08-12",
    },

    {
        id: 9,

        genericCode: "GEN-FLU",

        genericName:
            "Fluconazole",

        shortName: "FLU",

        description:
            "Triazole antifungal medicine used for treatment of susceptible fungal infections.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIFUNGAL",

        pharmacologicalClass:
            "ANTIFUNGAL_AZOL",

        dosageForms: [
            "TABLET",
            "CAPSULE",
            "INJECTION",
            "SUSPENSION",
        ],

        routes: [
            "ORAL",
            "INTRAVENOUS",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 2,

        createdBy: "Admin",

        createdOn: "2026-08-09",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-09",
    },

    {
        id: 10,

        genericCode: "GEN-WARF",

        genericName:
            "Warfarin",

        shortName: "WARF",

        description:
            "Oral anticoagulant used for prevention and treatment of thromboembolic disorders.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTICOAGULANT",

        pharmacologicalClass:
            "ANTICOAGULANT",

        dosageForms: [
            "TABLET",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: true,

        lasa: false,

        status: "Active",

        drugsCount: 2,

        createdBy: "Admin",

        createdOn: "2026-08-10",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-10",
    },

    {
        id: 11,

        genericCode: "GEN-ASP",

        genericName:
            "Aspirin",

        shortName: "ASA",

        description:
            "Salicylate medicine with analgesic and antiplatelet properties.",

        genericType: "SINGLE",

        therapeuticClass:
            "ANTIPLATELET",

        pharmacologicalClass:
            "ANTIPLATELET_AGENT",

        dosageForms: [
            "TABLET",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Active",

        drugsCount: 5,

        createdBy: "Admin",

        createdOn: "2026-08-11",

        modifiedBy: "Admin",

        modifiedOn: "2026-08-11",
    },

    {
        id: 12,

        genericCode: "GEN-AMIT",

        genericName:
            "Amitriptyline",

        shortName: "AMT",

        description:
            "Tricyclic antidepressant used in selected psychiatric and neuropathic pain indications.",

        genericType: "SINGLE",

        therapeuticClass:
            "OTHER",

        pharmacologicalClass:
            "OTHER",

        dosageForms: [
            "TABLET",
        ],

        routes: [
            "ORAL",
        ],

        prescriptionRequired:
            true,

        controlledDrug: false,

        narcotic: false,

        highAlert: false,

        lasa: false,

        status: "Inactive",

        drugsCount: 0,

        createdBy: "Admin",

        createdOn: "2026-08-12",

        modifiedBy:
            "Pharmacy Manager",

        modifiedOn: "2026-08-15",
    },
];

/*
 * ============================================
 * Statistics
 * ============================================
 */

export const genericStatistics = {
    total:
        genericList.length,

    active:
        genericList.filter(
            (item) =>
                item.status ===
                "Active"
        ).length,

    inactive:
        genericList.filter(
            (item) =>
                item.status ===
                "Inactive"
        ).length,

    prescription:
        genericList.filter(
            (item) =>
                item.prescriptionRequired
        ).length,

    highAlert:
        genericList.filter(
            (item) =>
                item.highAlert
        ).length,

    mappedDrugs:
        genericList.reduce(
            (
                total,
                item
            ) =>
                total +
                (Number(
                    item.drugsCount
                ) || 0),
            0
        ),
};

/*
 * ============================================
 * Default Export
 * ============================================
 */

export default genericList;