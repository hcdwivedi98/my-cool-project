import {
    binList,
} from "../mock/bin.mock";

const delay = (ms = 300) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

let bins = [...binList];

export const getBins = async (
    query = {}
) => {
    await delay();

    const {
        page = 1,
        pageSize = 10,
        search = "",
        centerId,
        departmentId,
        storeId,
        subStoreId,
        rackId,
        shelfId,
        binType,
        storageCondition,
        status,
        sortBy = "binCode",
        sortOrder = "asc",
    } = query;

    let result = [...bins];

    const searchText =
        search?.trim().toLowerCase();

    if (searchText) {
        result = result.filter((item) =>
            [
                item.binCode,
                item.binName,
                item.shelfName,
                item.rackName,
                item.storeName,
                item.subStoreName,
            ]
                .filter(Boolean)
                .some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(searchText)
                )
        );
    }

    if (centerId) {
        result = result.filter(
            (item) =>
                item.centerId === centerId
        );
    }

    if (departmentId) {
        result = result.filter(
            (item) =>
                item.departmentId === departmentId
        );
    }

    if (storeId) {
        result = result.filter(
            (item) =>
                item.storeId === storeId
        );
    }

    if (subStoreId) {
        result = result.filter(
            (item) =>
                item.subStoreId === subStoreId
        );
    }

    if (rackId) {
        result = result.filter(
            (item) =>
                item.rackId === rackId
        );
    }

    if (shelfId) {
        result = result.filter(
            (item) =>
                item.shelfId === shelfId
        );
    }

    if (binType) {
        result = result.filter(
            (item) =>
                item.binType === binType
        );
    }

    if (storageCondition) {
        result = result.filter(
            (item) =>
                item.storageCondition ===
                storageCondition
        );
    }

    if (status) {
        result = result.filter(
            (item) =>
                item.status === status
        );
    }

    result.sort((a, b) => {
        const first =
            a?.[sortBy] ?? "";

        const second =
            b?.[sortBy] ?? "";

        const comparison =
            typeof first === "string"
                ? first.localeCompare(
                    String(second)
                )
                : Number(first) -
                  Number(second);

        return sortOrder === "desc"
            ? -comparison
            : comparison;
    });

    const total = result.length;

    const start =
        (page - 1) * pageSize;

    const end =
        start + pageSize;

    return {
        items: result.slice(start, end),
        page,
        pageSize,
        total,
        totalPages:
            Math.ceil(total / pageSize),
    };
};

export const createBin = async (
    payload
) => {
    await delay();

    const newBin = {
        id:
            bins.length > 0
                ? Math.max(
                    ...bins.map(
                        (item) => item.id
                    )
                ) + 1
                : 1,

        ...payload,

        currentQuantity:
            payload.currentQuantity ?? 0,

        availableQuantity:
            payload.availableQuantity ??
            payload.maxQuantity,

        occupancyPercentage:
            payload.occupancyPercentage ??
            0,

        createdBy: "Current User",
        createdOn:
            new Date()
                .toISOString()
                .slice(0, 10),

        modifiedBy: "Current User",
        modifiedOn:
            new Date()
                .toISOString()
                .slice(0, 10),
    };

    bins = [newBin, ...bins];

    return newBin;
};

export const updateBin = async (
    id,
    payload
) => {
    await delay();

    const index = bins.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        throw new Error(
            "Bin not found"
        );
    }

    const updatedBin = {
        ...bins[index],
        ...payload,

        modifiedBy: "Current User",
        modifiedOn:
            new Date()
                .toISOString()
                .slice(0, 10),
    };

    bins[index] = updatedBin;

    return updatedBin;
};

export const deleteBin = async (
    id
) => {
    await delay();

    const exists = bins.some(
        (item) => item.id === id
    );

    if (!exists) {
        throw new Error(
            "Bin not found"
        );
    }

    bins = bins.filter(
        (item) => item.id !== id
    );

    return true;
};