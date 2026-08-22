// src/modules/pharmacy/drug/mock/drug.mock.js

export const drugList = [
    {
        id: 1,

        drugCode: "PCM-500-TAB",
        drugName: "Paracetamol 500 mg Tablet",
        genericName: "Paracetamol",
        brandName: "Crocin",

        drugType: "MEDICINE",
        category: "ANALGESIC",

        dosageForm: "TABLET",
        strength: 500,
        strengthUnit: "MG",
        route: "ORAL",

        baseUnit: "TABLET",
        purchaseUnit: "BOX",
        dispensingUnit: "TABLET",
        packSize: 10,
        unitsPerPack: 10,

        storageCondition: "AMBIENT",

        batchRequired: true,
        expiryRequired: true,
        barcodeRequired: true,
        serialNumberRequired: false,
        fefoRequired: true,
        fifoRequired: false,

        minStock: 100,
        maxStock: 1000,
        reorderLevel: 200,

        mrp: 25.5,
        purchasePrice: 18.5,
        sellingPrice: 24,
        costPrice: 18.5,

        gstPercentage: 12,
        hsnCode: "30049099",

        manufacturerId: 1,
        manufacturerName: "ABC Pharmaceuticals",

        schedule: "NON_SCHEDULED",

        controlledDrug: false,
        narcotic: false,
        prescriptionRequired: false,
        highAlert: false,
        lasa: false,

        status: "Active",

        composition: [
            {
                id: 1,
                ingredientName: "Paracetamol",
                strength: 500,
                strengthUnit: "MG",
            },
        ],

        suppliers: [
            {
                id: 1,
                supplierId: 1,
                supplierName: "ABC Pharma Distributors",
                supplierDrugCode: "ABC-PCM-500",
                supplierPrice: 18.5,
                leadTimeDays: 3,
                preferred: true,
            },
        ],

        documents: [],

        createdBy: "Admin",
        createdOn: "2026-08-01",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-10",
    },

    {
        id: 2,

        drugCode: "AMX-625-TAB",
        drugName: "Amoxicillin 625 mg Tablet",
        genericName: "Amoxicillin + Clavulanic Acid",
        brandName: "Augmentin",

        drugType: "MEDICINE",
        category: "ANTIBIOTIC",

        dosageForm: "TABLET",
        strength: 625,
        strengthUnit: "MG",
        route: "ORAL",

        baseUnit: "TABLET",
        purchaseUnit: "BOX",
        dispensingUnit: "TABLET",
        packSize: 6,
        unitsPerPack: 6,

        storageCondition: "AMBIENT",

        batchRequired: true,
        expiryRequired: true,
        barcodeRequired: true,
        serialNumberRequired: false,
        fefoRequired: true,
        fifoRequired: false,

        minStock: 50,
        maxStock: 500,
        reorderLevel: 100,

        mrp: 180,
        purchasePrice: 145,
        sellingPrice: 170,
        costPrice: 145,

        gstPercentage: 12,
        hsnCode: "30041090",

        manufacturerId: 2,
        manufacturerName: "XYZ Pharma Ltd.",

        schedule: "SCHEDULE_H",

        controlledDrug: false,
        narcotic: false,
        prescriptionRequired: true,
        highAlert: false,
        lasa: false,

        status: "Active",

        composition: [
            {
                id: 1,
                ingredientName: "Amoxicillin",
                strength: 500,
                strengthUnit: "MG",
            },
            {
                id: 2,
                ingredientName:
                    "Clavulanic Acid",
                strength: 125,
                strengthUnit: "MG",
            },
        ],

        suppliers: [
            {
                id: 1,
                supplierId: 2,
                supplierName: "XYZ Medical Distributors",
                supplierDrugCode: "XYZ-AMX-625",
                supplierPrice: 145,
                leadTimeDays: 5,
                preferred: true,
            },
        ],

        documents: [],

        createdBy: "Admin",
        createdOn: "2026-08-02",

        modifiedBy: "Pharmacy Manager",
        modifiedOn: "2026-08-11",
    },

    {
        id: 3,

        drugCode: "INS-100-ML",
        drugName: "Human Insulin 100 IU/mL",
        genericName: "Human Insulin",
        brandName: "Insulin",

        drugType: "MEDICINE",
        category: "ANTIDIABETIC",

        dosageForm: "INJECTION",
        strength: 100,
        strengthUnit: "IU",
        route: "SUBCUTANEOUS",

        baseUnit: "VIAL",
        purchaseUnit: "BOX",
        dispensingUnit: "VIAL",
        packSize: 10,
        unitsPerPack: 10,

        storageCondition: "REFRIGERATED",

        temperatureFrom: 2,
        temperatureTo: 8,

        batchRequired: true,
        expiryRequired: true,
        barcodeRequired: true,
        serialNumberRequired: false,
        fefoRequired: true,
        fifoRequired: false,

        minStock: 20,
        maxStock: 100,
        reorderLevel: 30,

        mrp: 450,
        purchasePrice: 380,
        sellingPrice: 430,
        costPrice: 380,

        gstPercentage: 12,
        hsnCode: "30043100",

        manufacturerId: 3,
        manufacturerName:
            "Global Biotech Pharmaceuticals",

        schedule: "SCHEDULE_H",

        controlledDrug: false,
        narcotic: false,
        prescriptionRequired: true,
        highAlert: true,
        lasa: false,

        status: "Active",

        composition: [
            {
                id: 1,
                ingredientName: "Human Insulin",
                strength: 100,
                strengthUnit: "IU",
            },
        ],

        suppliers: [],

        documents: [],

        createdBy: "Admin",
        createdOn: "2026-08-03",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-03",
    },

    {
        id: 4,

        drugCode: "CET-10-TAB",
        drugName: "Cetirizine 10 mg Tablet",
        genericName: "Cetirizine",
        brandName: "Cetirizine",

        drugType: "MEDICINE",
        category: "ANTIHISTAMINE",

        dosageForm: "TABLET",
        strength: 10,
        strengthUnit: "MG",
        route: "ORAL",

        baseUnit: "TABLET",
        purchaseUnit: "BOX",
        dispensingUnit: "TABLET",
        packSize: 10,
        unitsPerPack: 10,

        storageCondition: "AMBIENT",

        batchRequired: true,
        expiryRequired: true,
        barcodeRequired: true,
        serialNumberRequired: false,
        fefoRequired: true,
        fifoRequired: false,

        minStock: 100,
        maxStock: 1000,
        reorderLevel: 200,

        mrp: 35,
        purchasePrice: 22,
        sellingPrice: 32,
        costPrice: 22,

        gstPercentage: 12,
        hsnCode: "30049099",

        manufacturerId: 1,
        manufacturerName: "ABC Pharmaceuticals",

        schedule: "NON_SCHEDULED",

        controlledDrug: false,
        narcotic: false,
        prescriptionRequired: false,
        highAlert: false,
        lasa: false,

        status: "Inactive",

        composition: [
            {
                id: 1,
                ingredientName: "Cetirizine",
                strength: 10,
                strengthUnit: "MG",
            },
        ],

        suppliers: [],

        documents: [],

        createdBy: "Admin",
        createdOn: "2026-08-04",

        modifiedBy: "Admin",
        modifiedOn: "2026-08-04",
    },
];

export const drugStatistics = {
    total: drugList.length,

    active: drugList.filter(
        (item) =>
            item.status === "Active"
    ).length,

    inactive: drugList.filter(
        (item) =>
            item.status === "Inactive"
    ).length,

    prescription: drugList.filter(
        (item) =>
            item.prescriptionRequired
    ).length,

    highAlert: drugList.filter(
        (item) =>
            item.highAlert
    ).length,
};

export const drugDocuments = [];

export default drugList;