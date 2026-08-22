export const DEFAULT_DRUG_QUERY = {
    page: 1,
    pageSize: 10,

    search: "",

    drugType: undefined,
    category: undefined,
    dosageForm: undefined,
    route: undefined,

    storageCondition: undefined,

    manufacturerId: undefined,

    schedule: undefined,

    prescriptionRequired: undefined,

    controlledDrug: undefined,

    highAlert: undefined,

    status: undefined,

    sortBy: "drugCode",
    sortOrder: "asc",
};

export const createDrugQuery = (
    overrides = {}
) => {
    return {
        ...DEFAULT_DRUG_QUERY,
        ...overrides,
    };
};

export const resetDrugQuery = () => {
    return {
        ...DEFAULT_DRUG_QUERY,
    };
};

export const buildDrugQueryParams = (
    query = {}
) => {
    const params = {};

    if (query.page) {
        params.page = query.page;
    }

    if (query.pageSize) {
        params.pageSize = query.pageSize;
    }

    if (query.search?.trim()) {
        params.search =
            query.search.trim();
    }

    if (query.drugType) {
        params.drugType =
            query.drugType;
    }

    if (query.category) {
        params.category =
            query.category;
    }

    if (query.dosageForm) {
        params.dosageForm =
            query.dosageForm;
    }

    if (query.route) {
        params.route =
            query.route;
    }

    if (query.storageCondition) {
        params.storageCondition =
            query.storageCondition;
    }

    if (query.manufacturerId) {
        params.manufacturerId =
            query.manufacturerId;
    }

    if (query.schedule) {
        params.schedule =
            query.schedule;
    }

    if (
        query.prescriptionRequired !==
        undefined
    ) {
        params.prescriptionRequired =
            query.prescriptionRequired;
    }

    if (
        query.controlledDrug !==
        undefined
    ) {
        params.controlledDrug =
            query.controlledDrug;
    }

    if (
        query.highAlert !==
        undefined
    ) {
        params.highAlert =
            query.highAlert;
    }

    if (query.status) {
        params.status =
            query.status;
    }

    if (query.sortBy) {
        params.sortBy =
            query.sortBy;
    }

    if (query.sortOrder) {
        params.sortOrder =
            query.sortOrder;
    }

    return params;
};