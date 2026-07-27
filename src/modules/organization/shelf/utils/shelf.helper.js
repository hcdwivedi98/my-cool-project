import { DEFAULT_SHELF_VALUES } from "../constants/shelf.constants";

export const getDefaultShelfValues = () => ({
    ...DEFAULT_SHELF_VALUES,
});

export const prepareShelfPayload = (values) => ({
    centerId: values.centerId,
    departmentId: values.departmentId,
    storeId: values.storeId,
    subStoreId: values.subStoreId,
    rackId: values.rackId,

    shelfCode: values.shelfCode?.trim(),
    shelfName: values.shelfName?.trim(),
    description: values.description?.trim(),

    shelfType: values.shelfType,
    storageCondition: values.storageCondition,
    orientation: values.orientation,

    maxBins: Number(values.maxBins),
    maxWeight: values.maxWeight
        ? Number(values.maxWeight)
        : null,
    maxVolume: values.maxVolume
        ? Number(values.maxVolume)
        : null,

   

    approvalRequired: Boolean(values.approvalRequired),
    approverId: values.approverId || null,

    status: values.status,

    remarks: values.remarks?.trim(),
});



export const isShelfActive = (record) =>
    record?.status === "Active";

export const getShelfOccupancyColor = (percentage) => {
    if (percentage >= 90) return "red";

    if (percentage >= 70) return "orange";

    if (percentage >= 40) return "gold";

    return "green";
};

export const getShelfOccupancyText = (percentage) => {
    if (percentage >= 90) return "Full";

    if (percentage >= 70) return "Nearly Full";

    if (percentage >= 40) return "Partially Occupied";

    return "Available";
};