// src/modules/pharmacy/generic/services/generic.service.js

import {
    genericList,
} from "../mock/generic.mock";

import {
    buildGenericQueryParams,
} from "../utils/generic.query";

import {
    prepareGenericPayload,
} from "../utils/generic.helper";

/*
 * ============================================
 * Local Data Store
 * ============================================
 *
 * Mock environment me direct array mutate
 * karne ke bajay local copy maintain karenge.
 */

let genericStore = [
    ...genericList,
];

/*
 * ============================================
 * Utility
 * ============================================
 */

const delay = (
    ms = 250
) =>
    new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                ms
            )
    );

/*
 * ============================================
 * Normalize Search
 * ============================================
 */

const normalizeSearch = (
    value
) =>
    String(
        value || ""
    )
        .trim()
        .toLowerCase();

/*
 * ============================================
 * Get Generic Label
 * ============================================
 */

const includesValue = (
    source,
    value
) => {
    if (!value) {
        return true;
    }

    return (
        source ===
            value
    );
};

/*
 * ============================================
 * Get All Generics
 * ============================================
 */

export const getGenerics =
    async (
        query = {}
    ) => {
        await delay();

        const params =
            buildGenericQueryParams(
                query
            );

        let result = [
            ...genericStore,
        ];

        /*
         * Search
         */

        const search =
            normalizeSearch(
                params.search
            );

        if (search) {
            result =
                result.filter(
                    (
                        item
                    ) => {
                        const searchableText =
                            [
                                item.genericCode,
                                item.genericName,
                                item.shortName,
                                item.description,
                                item.therapeuticClass,
                                item.pharmacologicalClass,
                            ]
                                .filter(
                                    Boolean
                                )
                                .join(
                                    " "
                                )
                                .toLowerCase();

                        return searchableText.includes(
                            search
                        );
                    }
                );
        }

        /*
         * Generic Type
         */

        if (
            params.genericType
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        item.genericType ===
                        params.genericType
                );
        }

        /*
         * Therapeutic Class
         */

        if (
            params.therapeuticClass
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        item.therapeuticClass ===
                        params.therapeuticClass
                );
        }

        /*
         * Pharmacological Class
         */

        if (
            params.pharmacologicalClass
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        item.pharmacologicalClass ===
                        params.pharmacologicalClass
                );
        }

        /*
         * Dosage Form
         */

        if (
            params.dosageForm
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        Array.isArray(
                            item.dosageForms
                        ) &&
                        item.dosageForms.includes(
                            params.dosageForm
                        )
                );
        }

        /*
         * Route
         */

        if (
            params.route
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        Array.isArray(
                            item.routes
                        ) &&
                        item.routes.includes(
                            params.route
                        )
                );
        }

        /*
         * Status
         */

        if (
            params.status
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        item.status ===
                        params.status
                );
        }

        /*
         * Prescription Required
         */

        if (
            params.prescriptionRequired !==
            undefined
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        Boolean(
                            item.prescriptionRequired
                        ) ===
                        Boolean(
                            params.prescriptionRequired
                        )
                );
        }

        /*
         * High Alert
         */

        if (
            params.highAlert !==
            undefined
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        Boolean(
                            item.highAlert
                        ) ===
                        Boolean(
                            params.highAlert
                        )
                );
        }

        /*
         * Active Only
         *
         * Important:
         * Agar explicitly status diya gaya hai,
         * to activeOnly ko override nahi karenge.
         */

        if (
            params.activeOnly &&
            !params.status
        ) {
            result =
                result.filter(
                    (
                        item
                    ) =>
                        item.status ===
                        "Active"
                );
        }

        /*
         * Sorting
         */

        if (
            params.sortBy
        ) {
            const {
                sortBy,
                sortOrder,
            } = params;

            result.sort(
                (
                    a,
                    b
                ) => {
                    const first =
                        a?.[
                            sortBy
                        ];

                    const second =
                        b?.[
                            sortBy
                        ];

                    if (
                        first ===
                        second
                    ) {
                        return 0;
                    }

                    if (
                        first ===
                            undefined ||
                        first ===
                            null
                    ) {
                        return 1;
                    }

                    if (
                        second ===
                            undefined ||
                        second ===
                            null
                    ) {
                        return -1;
                    }

                    const comparison =
                        String(
                            first
                        ).localeCompare(
                            String(
                                second
                            ),
                            undefined,
                            {
                                numeric: true,
                                sensitivity:
                                    "base",
                            }
                        );

                    return sortOrder ===
                        "desc"
                        ? -comparison
                        : comparison;
                }
            );
        } else {
            /*
             * Default sorting
             */

            result.sort(
                (
                    a,
                    b
                ) =>
                    String(
                        a.genericName ||
                            ""
                    ).localeCompare(
                        String(
                            b.genericName ||
                                ""
                        )
                    )
            );
        }

        /*
         * Pagination
         */

        const total =
            result.length;

        const page =
            Number(
                params.page
            ) || 1;

        const pageSize =
            Number(
                params.pageSize
            ) || 10;

        const start =
            (page - 1) *
            pageSize;

        const items =
            result.slice(
                start,
                start +
                    pageSize
            );

        return {
            items,

            total,

            page,

            pageSize,

            totalPages:
                Math.ceil(
                    total /
                        pageSize
                ),
        };
    };

/*
 * ============================================
 * Get Generic By ID
 * ============================================
 */

export const getGenericById =
    async (
        id
    ) => {
        await delay();

        const item =
            genericStore.find(
                (
                    generic
                ) =>
                    Number(
                        generic.id
                    ) ===
                    Number(id)
            );

        if (!item) {
            throw new Error(
                "Generic not found."
            );
        }

        return {
            ...item,
        };
    };

/*
 * ============================================
 * Create Generic
 * ============================================
 */

export const createGeneric =
    async (
        values
    ) => {
        await delay();

        const payload =
            prepareGenericPayload(
                values
            );

        /*
         * Duplicate Code
         */

        const duplicateCode =
            genericStore.some(
                (
                    item
                ) =>
                    String(
                        item.genericCode ||
                            ""
                    ).toLowerCase() ===
                    String(
                        payload.genericCode ||
                            ""
                    ).toLowerCase()
            );

        if (
            duplicateCode
        ) {
            throw new Error(
                "Generic code already exists."
            );
        }

        /*
         * Duplicate Name
         */

        const duplicateName =
            genericStore.some(
                (
                    item
                ) =>
                    String(
                        item.genericName ||
                            ""
                    )
                        .trim()
                        .toLowerCase() ===
                    String(
                        payload.genericName ||
                            ""
                    )
                        .trim()
                        .toLowerCase()
            );

        if (
            duplicateName
        ) {
            throw new Error(
                "Generic name already exists."
            );
        }

        const now =
            new Date()
                .toISOString()
                .split(
                    "T"
                )[0];

        const nextId =
            genericStore.length
                ? Math.max(
                      ...genericStore.map(
                          (
                              item
                          ) =>
                              Number(
                                  item.id
                              ) || 0
                      )
                  ) + 1
                : 1;

        const newGeneric =
            {
                id: nextId,

                ...payload,

                drugsCount:
                    0,

                drugs: [],

                createdBy:
                    "Admin",

                createdOn:
                    now,

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now,
            };

        genericStore = [
            newGeneric,
            ...genericStore,
        ];

        return {
            ...newGeneric,
        };
    };

/*
 * ============================================
 * Update Generic
 * ============================================
 */

export const updateGeneric =
    async (
        id,
        values
    ) => {
        await delay();

        const index =
            genericStore.findIndex(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Generic not found."
            );
        }

        const payload =
            prepareGenericPayload(
                values
            );

        /*
         * Duplicate Code
         */

        const duplicateCode =
            genericStore.some(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) !==
                        Number(id) &&
                    String(
                        item.genericCode ||
                            ""
                    ).toLowerCase() ===
                        String(
                            payload.genericCode ||
                                ""
                        ).toLowerCase()
            );

        if (
            duplicateCode
        ) {
            throw new Error(
                "Generic code already exists."
            );
        }

        /*
         * Duplicate Name
         */

        const duplicateName =
            genericStore.some(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) !==
                        Number(id) &&
                    String(
                        item.genericName ||
                            ""
                    )
                        .trim()
                        .toLowerCase() ===
                        String(
                            payload.genericName ||
                                ""
                        )
                            .trim()
                            .toLowerCase()
            );

        if (
            duplicateName
        ) {
            throw new Error(
                "Generic name already exists."
            );
        }

        const existing =
            genericStore[
                index
            ];

        const now =
            new Date()
                .toISOString()
                .split(
                    "T"
                )[0];

        const updated =
            {
                ...existing,

                ...payload,

                /*
                 * Drug mapping service/
                 * Drug Master own karega.
                 * Isliye update me preserve karenge.
                 */

                drugs:
                    existing.drugs ||
                    [],

                drugsCount:
                    Number(
                        existing.drugsCount
                    ) ||
                    (
                        existing
                            .drugs ||
                        []
                    ).length,

                createdBy:
                    existing.createdBy,

                createdOn:
                    existing.createdOn,

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now,
            };

        genericStore[
            index
        ] = updated;

        return {
            ...updated,
        };
    };

/*
 * ============================================
 * Deactivate Generic
 * ============================================
 */

export const deactivateGeneric =
    async (
        id
    ) => {
        await delay();

        const index =
            genericStore.findIndex(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Generic not found."
            );
        }

        const existing =
            genericStore[
                index
            ];

        /*
         * Don't deactivate if drugs
         * are still mapped.
         */

        const mappedDrugs =
            Number(
                existing.drugsCount
            ) || 0;

        if (
            mappedDrugs > 0
        ) {
            throw new Error(
                `Cannot deactivate this generic because ${mappedDrugs} drug(s) are still mapped to it.`
            );
        }

        const now =
            new Date()
                .toISOString()
                .split(
                    "T"
                )[0];

        const updated =
            {
                ...existing,

                status:
                    "Inactive",

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now,
            };

        genericStore[
            index
        ] = updated;

        return {
            ...updated,
        };
    };

/*
 * ============================================
 * Activate Generic
 * ============================================
 */

export const activateGeneric =
    async (
        id
    ) => {
        await delay();

        const index =
            genericStore.findIndex(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Generic not found."
            );
        }

        const existing =
            genericStore[
                index
            ];

        const now =
            new Date()
                .toISOString()
                .split(
                    "T"
                )[0];

        const updated =
            {
                ...existing,

                status:
                    "Active",

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now,
            };

        genericStore[
            index
        ] = updated;

        return {
            ...updated,
        };
    };

/*
 * ============================================
 * Get Statistics
 * ============================================
 */

export const getGenericStatistics =
    async () => {
        await delay();

        const total =
            genericStore.length;

        const active =
            genericStore.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Active"
            ).length;

        const inactive =
            genericStore.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Inactive"
            ).length;

        const prescription =
            genericStore.filter(
                (
                    item
                ) =>
                    item.prescriptionRequired
            ).length;

        const highAlert =
            genericStore.filter(
                (
                    item
                ) =>
                    item.highAlert
            ).length;

        const mappedDrugs =
            genericStore.reduce(
                (
                    totalCount,
                    item
                ) =>
                    totalCount +
                    (
                        Number(
                            item.drugsCount
                        ) || 0
                    ),
                0
            );

        return {
            total,

            active,

            inactive,

            prescription,

            highAlert,

            mappedDrugs,
        };
    };

export default {
    getGenerics,
    getGenericById,
    createGeneric,
    updateGeneric,
    deactivateGeneric,
    activateGeneric,
    getGenericStatistics,
};