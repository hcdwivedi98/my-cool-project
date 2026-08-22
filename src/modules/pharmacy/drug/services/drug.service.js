import { drugList } from "../mock/drug.mock";

import {
    buildDrugQueryParams,
} from "../utils/drug.query";

const delay = (ms = 300) =>
    new Promise((resolve) =>
        setTimeout(resolve, ms)
    );

let drugs = [...drugList];

const normalize = (value) =>
    String(value ?? "")
        .toLowerCase()
        .trim();

const applySearch = (
    data,
    search
) => {
    if (!search?.trim()) {
        return data;
    }

    const keyword =
        normalize(search);

    return data.filter((drug) =>
        [
            drug.drugCode,
            drug.drugName,
            drug.genericName,
            drug.brandName,
            drug.category,
            drug.dosageForm,
            drug.manufacturerName,
        ].some((value) =>
            normalize(value).includes(
                keyword
            )
        )
    );
};

const applyFilters = (
    data,
    query
) => {
    return data.filter((drug) => {
        if (
            query.drugType &&
            drug.drugType !==
                query.drugType
        ) {
            return false;
        }

        if (
            query.category &&
            drug.category !==
                query.category
        ) {
            return false;
        }

        if (
            query.dosageForm &&
            drug.dosageForm !==
                query.dosageForm
        ) {
            return false;
        }

        if (
            query.route &&
            drug.route !== query.route
        ) {
            return false;
        }

        if (
            query.storageCondition &&
            drug.storageCondition !==
                query.storageCondition
        ) {
            return false;
        }

        if (
            query.manufacturerId &&
            Number(
                drug.manufacturerId
            ) !==
                Number(
                    query.manufacturerId
                )
        ) {
            return false;
        }

        if (
            query.schedule &&
            drug.schedule !==
                query.schedule
        ) {
            return false;
        }

        if (
            query.status &&
            drug.status !== query.status
        ) {
            return false;
        }

        if (
            query.prescriptionRequired !==
            undefined
        ) {
            if (
                Boolean(
                    drug.prescriptionRequired
                ) !==
                Boolean(
                    query.prescriptionRequired
                )
            ) {
                return false;
            }
        }

        if (
            query.controlledDrug !==
            undefined
        ) {
            if (
                Boolean(
                    drug.controlledDrug
                ) !==
                Boolean(
                    query.controlledDrug
                )
            ) {
                return false;
            }
        }

        if (
            query.highAlert !==
            undefined
        ) {
            if (
                Boolean(
                    drug.highAlert
                ) !==
                Boolean(
                    query.highAlert
                )
            ) {
                return false;
            }
        }

        return true;
    });
};

const applySorting = (
    data,
    sortBy,
    sortOrder
) => {
    if (!sortBy) {
        return data;
    }

    const sorted = [...data];

    sorted.sort((a, b) => {
        const first = a?.[sortBy];
        const second = b?.[sortBy];

        if (
            first === undefined ||
            first === null
        ) {
            return 1;
        }

        if (
            second === undefined ||
            second === null
        ) {
            return -1;
        }

        if (
            typeof first === "number" &&
            typeof second === "number"
        ) {
            return sortOrder === "desc"
                ? second - first
                : first - second;
        }

        return (
            String(first).localeCompare(
                String(second)
            ) *
            (sortOrder === "desc"
                ? -1
                : 1)
        );
    });

    return sorted;
};

export const getDrugs = async (
    query = {}
) => {
    await delay();

    const params =
        buildDrugQueryParams(query);

    let result = [...drugs];

    result = applySearch(
        result,
        params.search
    );

    result = applyFilters(
        result,
        params
    );

    result = applySorting(
        result,
        params.sortBy,
        params.sortOrder
    );

    const total = result.length;

    const page =
        Number(params.page || 1);

    const pageSize =
        Number(
            params.pageSize || 10
        );

    const start =
        (page - 1) * pageSize;

    const pagedData =
        result.slice(
            start,
            start + pageSize
        );

    return {
        data: pagedData,
        total,
        page,
        pageSize,
    };
};

export const getDrugById =
    async (id) => {
        await delay();

        return (
            drugs.find(
                (item) =>
                    String(item.id) ===
                    String(id)
            ) || null
        );
    };

export const createDrug =
    async (payload) => {
        await delay();

        const now =
            new Date().toISOString();

        const nextId =
            drugs.length
                ? Math.max(
                      ...drugs.map(
                          (item) =>
                              Number(
                                  item.id
                              ) || 0
                      )
                  ) + 1
                : 1;

        const newDrug = {
            ...payload,

            id: nextId,

            createdBy: "Current User",

            createdOn: now,

            modifiedBy: null,

            modifiedOn: null,
        };

        drugs = [
            newDrug,
            ...drugs,
        ];

        return newDrug;
    };

export const updateDrug =
    async (
        id,
        payload
    ) => {
        await delay();

        const index =
            drugs.findIndex(
                (item) =>
                    String(item.id) ===
                    String(id)
            );

        if (index === -1) {
            throw new Error(
                "Drug not found"
            );
        }

        const updatedDrug = {
            ...drugs[index],

            ...payload,

            id: drugs[index].id,

            createdBy:
                drugs[index].createdBy,

            createdOn:
                drugs[index].createdOn,

            modifiedBy:
                "Current User",

            modifiedOn:
                new Date().toISOString(),
        };

        drugs[index] =
            updatedDrug;

        return updatedDrug;
    };

export const deleteDrug =
    async (id) => {
        await delay();

        const index =
            drugs.findIndex(
                (item) =>
                    String(item.id) ===
                    String(id)
            );

        if (index === -1) {
            throw new Error(
                "Drug not found"
            );
        }

        drugs[index] = {
            ...drugs[index],

            status: "Inactive",

            modifiedBy:
                "Current User",

            modifiedOn:
                new Date().toISOString(),
        };

        return drugs[index];
    };

export const getDrugStatistics =
    async () => {
        await delay();

        const total =
            drugs.length;

        const active =
            drugs.filter(
                (item) =>
                    item.status ===
                    "Active"
            ).length;

        const inactive =
            drugs.filter(
                (item) =>
                    item.status ===
                    "Inactive"
            ).length;

        const controlled =
            drugs.filter(
                (item) =>
                    item.controlledDrug
            ).length;

        const highAlert =
            drugs.filter(
                (item) =>
                    item.highAlert
            ).length;

        return {
            total,
            active,
            inactive,
            controlled,
            highAlert,
        };
    };