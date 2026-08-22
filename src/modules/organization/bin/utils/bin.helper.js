import {
    BIN_STATUS,
} from "../constants/bin.constants";

/**
 * Default values for Add Bin form
 */
export const getDefaultBinValues = () => ({
    centerId: undefined,
    departmentId: undefined,
    storeId: undefined,
    subStoreId: undefined,
    rackId: undefined,
    shelfId: undefined,

    binCode: "",
    binName: "",

    binType: "STANDARD",

    storageCondition: "AMBIENT",
    orientation: "FRONT",

    zone: "",
    aisleNo: "",

    maxQuantity: 1,
    maxWeight: 0,
    maxVolume: 0,

    currentQuantity: 0,
    availableQuantity: 1,
    occupancyPercentage: 0,

    approvalRequired: false,
    approverId: undefined,
    approvalLevel: undefined,

    status: BIN_STATUS.ACTIVE,

    documents: [],
});

/**
 * Calculate bin occupancy percentage
 */
export const calculateBinOccupancy = (
    currentQuantity = 0,
    maxQuantity = 0
) => {
    if (!maxQuantity || maxQuantity <= 0) {
        return 0;
    }

    const percentage =
        (currentQuantity / maxQuantity) * 100;

    return Math.min(
        Math.max(Math.round(percentage), 0),
        100
    );
};

/**
 * Calculate available quantity
 */
export const calculateAvailableQuantity = (
    currentQuantity = 0,
    maxQuantity = 0
) => {
    return Math.max(
        maxQuantity - currentQuantity,
        0
    );
};

/**
 * Convert Bin record into Form values
 */
export const mapBinToForm = (record = {}) => ({
    centerId: record.centerId,
    departmentId: record.departmentId,
    storeId: record.storeId,
    subStoreId: record.subStoreId,
    rackId: record.rackId,
    shelfId: record.shelfId,

    binCode: record.binCode || "",
    binName: record.binName || "",

    binType: record.binType || "STANDARD",

    storageCondition:
        record.storageCondition || "AMBIENT",

    orientation:
        record.orientation || "FRONT",

    zone: record.zone || "",
    aisleNo: record.aisleNo || "",

    maxQuantity:
        record.maxQuantity ?? 1,

    maxWeight:
        record.maxWeight ?? 0,

    maxVolume:
        record.maxVolume ?? 0,

    currentQuantity:
        record.currentQuantity ?? 0,

    availableQuantity:
        record.availableQuantity ??
        calculateAvailableQuantity(
            record.currentQuantity ?? 0,
            record.maxQuantity ?? 0
        ),

    occupancyPercentage:
        record.occupancyPercentage ??
        calculateBinOccupancy(
            record.currentQuantity ?? 0,
            record.maxQuantity ?? 0
        ),

    approvalRequired:
        record.approvalRequired ?? false,

    approverId:
        record.approverId ?? undefined,

    approvalLevel:
        record.approvalLevel ?? undefined,

    status:
        record.status || BIN_STATUS.ACTIVE,

    documents:
        record.documents || [],
});

/**
 * Prepare form values for save operation
 */
export const prepareBinPayload = (
    values = {}
) => {
    const maxQuantity =
        Number(values.maxQuantity || 0);

    const currentQuantity =
        Number(values.currentQuantity || 0);

    return {
        centerId: values.centerId,
        departmentId: values.departmentId,
        storeId: values.storeId,
        subStoreId: values.subStoreId,
        rackId: values.rackId,
        shelfId: values.shelfId,

        binCode:
            values.binCode?.trim() || "",

        binName:
            values.binName?.trim() || "",

        binType: values.binType,

        storageCondition:
            values.storageCondition,

        orientation:
            values.orientation,

        zone:
            values.zone?.trim() || "",

        aisleNo:
            values.aisleNo?.trim() || "",

        maxQuantity,

        maxWeight:
            Number(values.maxWeight || 0),

        maxVolume:
            Number(values.maxVolume || 0),

        // These are system calculated.
        currentQuantity,

        availableQuantity:
            calculateAvailableQuantity(
                currentQuantity,
                maxQuantity
            ),

        occupancyPercentage:
            calculateBinOccupancy(
                currentQuantity,
                maxQuantity
            ),

        approvalRequired:
            Boolean(values.approvalRequired),

        approverId:
            values.approvalRequired
                ? values.approverId
                : null,

        approvalLevel:
            values.approvalRequired
                ? values.approvalLevel
                : null,

        status:
            values.status || BIN_STATUS.ACTIVE,

        documents:
            values.documents || [],
    };
};

/**
 * Get occupancy status text
 */
export const getBinOccupancyText = (
    percentage = 0
) => {
    if (percentage >= 100) {
        return "Full";
    }

    if (percentage >= 80) {
        return "Near Full";
    }

    if (percentage >= 50) {
        return "Moderate";
    }

    return "Available";
};

/**
 * Get occupancy color
 */
export const getBinOccupancyColor = (
    percentage = 0
) => {
    if (percentage >= 100) {
        return "red";
    }

    if (percentage >= 80) {
        return "orange";
    }

    if (percentage >= 50) {
        return "gold";
    }

    return "green";
};

/**
 * Validate Bin Code
 */
export const validateBinCode = (
    value = ""
) => {
    return /^[A-Z0-9-]+$/.test(
        value.trim()
    );
};