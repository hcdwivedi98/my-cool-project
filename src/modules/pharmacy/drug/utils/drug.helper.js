import {
    DRUG_STATUS,
} from "../constants/drug.constants";

export const getDefaultDrugValues = () => {
    return {
        drugCode: "",
        drugName: "",
        genericName: "",
        brandName: "",
        shortName: "",

        drugType: "MEDICINE",
        category: undefined,

        dosageForm: undefined,
        strength: undefined,
        strengthUnit: undefined,
        route: undefined,

        baseUnit: undefined,
        purchaseUnit: undefined,
        dispensingUnit: undefined,
        packSize: undefined,
        unitsPerPack: undefined,

        storageCondition: "AMBIENT",

        temperatureFrom: undefined,
        temperatureTo: undefined,
        humidityRequired: false,
        lightSensitive: false,
        refrigerated: false,
        freezerRequired: false,
        hazardous: false,

        batchRequired: true,
        expiryRequired: true,
        barcodeRequired: true,
        serialNumberRequired: false,
        fefoRequired: true,
        fifoRequired: false,
        negativeStockAllowed: false,

        minStock: 0,
        maxStock: 0,
        reorderLevel: 0,

        mrp: undefined,
        purchasePrice: undefined,
        sellingPrice: undefined,
        costPrice: undefined,

        gstPercentage: undefined,
        hsnCode: "",

        manufacturerId: undefined,

        schedule: "NON_SCHEDULED",

        controlledDrug: false,
        narcotic: false,
        prescriptionRequired: false,
        highAlert: false,
        lasa: false,

        composition: [],

        suppliers: [],

        documents: [],

        status: DRUG_STATUS.ACTIVE,
    };
};

export const mapDrugToForm = (
    record = {}
) => {
    return {
        ...getDefaultDrugValues(),
        ...record,

        composition:
            record.composition || [],

        suppliers:
            record.suppliers || [],

        documents:
            record.documents || [],
    };
};

export const prepareDrugPayload = (values = {}) => {
    const payload = {
        ...values,

        drugCode:
            values.drugCode
                ?.trim()
                .toUpperCase() || "",

        drugName:
            values.drugName?.trim() || "",

        genericName:
            values.genericName?.trim() || "",

        brandName:
            values.brandName?.trim() || "",

        shortName:
            values.shortName?.trim() || "",

        hsnCode:
            values.hsnCode?.trim() || "",

        dosageInstruction:
            values.dosageInstruction?.trim() || "",

        frequency:
            values.frequency?.trim() || "",

        duration:
            values.duration?.trim() || "",

        barcode:
            values.barcode?.trim() || "",

        composition:
            (values.composition || []).map(
                (item, index) => ({
                    ...item,

                    id:
                        item.id ||
                        index + 1,

                    ingredientName:
                        item.ingredientName
                            ?.trim() || "",
                })
            ),

        suppliers:
            (values.suppliers || []).map(
                (item, index) => ({
                    ...item,

                    id:
                        item.id ||
                        index + 1,
                })
            ),
    };

    // Temperature is applicable only for
    // temperature-controlled storage.
    const temperatureControlledConditions = [
        "REFRIGERATED",
        "FROZEN",
        "CONTROLLED",
    ];

    if (
        !temperatureControlledConditions.includes(
            values.storageCondition
        )
    ) {
        payload.temperatureFrom = undefined;
        payload.temperatureTo = undefined;
    }

    return payload;
};

export const calculatePackQuantity = ({
    packSize = 0,
    unitsPerPack = 0,
}) => {
    return (
        Number(packSize || 0) *
        Number(unitsPerPack || 0)
    );
};

export const calculateMarkupPercentage = ({
    purchasePrice = 0,
    sellingPrice = 0,
}) => {
    const purchase =
        Number(purchasePrice || 0);

    const selling =
        Number(sellingPrice || 0);

    if (
        purchase <= 0 ||
        selling <= 0
    ) {
        return 0;
    }

    return (
        ((selling - purchase) /
            purchase) *
        100
    );
};

export const calculateMarginPercentage = ({
    costPrice = 0,
    sellingPrice = 0,
}) => {
    const cost =
        Number(costPrice || 0);

    const selling =
        Number(sellingPrice || 0);

    if (selling <= 0) {
        return 0;
    }

    return (
        ((selling - cost) /
            selling) *
        100
    );
};

export const isColdStorageDrug = (
    storageCondition
) => {
    return [
        "REFRIGERATED",
        "FROZEN",
    ].includes(storageCondition);
};

export const isControlledDrug = (
    values = {}
) => {
    return Boolean(
        values.controlledDrug ||
        values.narcotic ||
        values.schedule ===
        "SCHEDULE_X"
    );
};

export const requiresPrescription = (
    values = {}
) => {
    return Boolean(
        values.prescriptionRequired ||
        [
            "SCHEDULE_H",
            "SCHEDULE_H1",
            "SCHEDULE_X",
        ].includes(values.schedule)
    );
};

export const getDrugStatusColor = (
    status
) => {
    return status === DRUG_STATUS.ACTIVE
        ? "success"
        : "error";
};

export const getDrugStatusText = (
    status
) => {
    return status === DRUG_STATUS.ACTIVE
        ? "Active"
        : "Inactive";
};

export const validateTemperatureRange = ({
    temperatureFrom,
    temperatureTo,
}) => {
    if (
        temperatureFrom === undefined ||
        temperatureFrom === null ||
        temperatureTo === undefined ||
        temperatureTo === null
    ) {
        return true;
    }

    return (
        Number(temperatureFrom) <=
        Number(temperatureTo)
    );
};