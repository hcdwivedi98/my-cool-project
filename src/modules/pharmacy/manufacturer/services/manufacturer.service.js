// src/modules/pharmacy/manufacturer/services/manufacturer.service.js

import {
    manufacturerList,
} from "../mock/manufacturer.mock";

import {
    buildManufacturerQueryParams,
} from "../utils/manufacturer.query";

/*
 * ============================================
 * Local Mock Store
 * ============================================
 *
 * API integration ke time isko replace
 * kiya ja sakta hai.
 */

let manufacturers = [
    ...manufacturerList,
];

/*
 * ============================================
 * Helpers
 * ============================================
 */

const normalize = (
    value
) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim()
        .toLowerCase();
};

/*
 * ============================================
 * Apply Filters
 * ============================================
 */

const applyFilters = (
    data,
    query
) => {
    const search =
        normalize(
            query.search
        );

    return data.filter(
        (manufacturer) => {
            /*
             * Search
             */

            if (search) {
                const searchableValues = [
                    manufacturer.manufacturerCode,
                    manufacturer.manufacturerName,
                    manufacturer.shortName,
                    manufacturer.contactPerson,
                    manufacturer.mobile,
                    manufacturer.email,
                    manufacturer.gstin,
                    manufacturer.pan,
                    manufacturer.licenseNumber,
                    manufacturer.city,
                    manufacturer.state,
                ];

                const matchesSearch =
                    searchableValues.some(
                        (value) =>
                            normalize(
                                value
                            ).includes(
                                search
                            )
                    );

                if (
                    !matchesSearch
                ) {
                    return false;
                }
            }

            /*
             * Manufacturer Type
             */

            if (
                query.manufacturerType &&
                manufacturer.manufacturerType !==
                    query.manufacturerType
            ) {
                return false;
            }

            /*
             * Manufacturer Category
             */

            if (
                query.manufacturerCategory &&
                manufacturer.manufacturerCategory !==
                    query.manufacturerCategory
            ) {
                return false;
            }

            /*
             * Country
             */

            if (
                query.country &&
                manufacturer.country !==
                    query.country
            ) {
                return false;
            }

            /*
             * State
             */

            if (
                query.state &&
                manufacturer.state !==
                    query.state
            ) {
                return false;
            }

            /*
             * City
             */

            if (
                query.city &&
                manufacturer.city !==
                    query.city
            ) {
                return false;
            }

            /*
             * Status
             */

            if (
                query.status &&
                manufacturer.status !==
                    query.status
            ) {
                return false;
            }

            /*
             * Active Only
             */

            if (
                query.activeOnly &&
                manufacturer.status !==
                    "Active"
            ) {
                return false;
            }

            return true;
        }
    );
};

/*
 * ============================================
 * Apply Sorting
 * ============================================
 */

const applySorting = (
    data,
    query
) => {
    if (
        !query.sortBy
    ) {
        return data;
    }

    const sorted = [
        ...data,
    ];

    sorted.sort(
        (
            first,
            second
        ) => {
            const firstValue =
                first[
                    query.sortBy
                ];

            const secondValue =
                second[
                    query.sortBy
                ];

            if (
                firstValue ===
                secondValue
            ) {
                return 0;
            }

            if (
                firstValue ===
                null ||
                firstValue ===
                undefined
            ) {
                return 1;
            }

            if (
                secondValue ===
                null ||
                secondValue ===
                undefined
            ) {
                return -1;
            }

            const result =
                String(
                    firstValue
                ).localeCompare(
                    String(
                        secondValue
                    ),
                    undefined,
                    {
                        numeric: true,
                        sensitivity:
                            "base",
                    }
                );

            return query.sortOrder ===
                "desc"
                ? -result
                : result;
        }
    );

    return sorted;
};

/*
 * ============================================
 * Get Manufacturers
 * ============================================
 */

export const getManufacturers =
    async (
        query = {}
    ) => {
        const params =
            buildManufacturerQueryParams(
                query
            );

        let data =
            applyFilters(
                manufacturers,
                params
            );

        data =
            applySorting(
                data,
                params
            );

        const total =
            data.length;

        const page =
            params.page;

        const pageSize =
            params.pageSize;

        const start =
            (page - 1) *
            pageSize;

        const end =
            start + pageSize;

        const paginatedData =
            data.slice(
                start,
                end
            );

        return {
            data:
                paginatedData,

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
 * Get Manufacturer By ID
 * ============================================
 */

export const getManufacturerById =
    async (
        id
    ) => {
        return (
            manufacturers.find(
                (item) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            ) || null
        );
    };

/*
 * ============================================
 * Create Manufacturer
 * ============================================
 */

export const createManufacturer =
    async (
        payload
    ) => {
        const nextId =
            manufacturers.length
                ? Math.max(
                      ...manufacturers.map(
                          (
                              item
                          ) =>
                              Number(
                                  item.id
                              ) || 0
                      )
                  ) + 1
                : 1;

        const now =
            new Date();

        const newManufacturer =
            {
                id: nextId,

                ...payload,

                createdBy:
                    "Admin",

                createdOn:
                    now
                        .toISOString()
                        .split(
                            "T"
                        )[0],

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now
                        .toISOString()
                        .split(
                            "T"
                        )[0],

                productsCount:
                    0,

                activeProductsCount:
                    0,
            };

        manufacturers = [
            newManufacturer,
            ...manufacturers,
        ];

        return newManufacturer;
    };

/*
 * ============================================
 * Update Manufacturer
 * ============================================
 */

export const updateManufacturer =
    async (
        id,
        payload
    ) => {
        const index =
            manufacturers.findIndex(
                (item) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Manufacturer not found."
            );
        }

        const current =
            manufacturers[
                index
            ];

        const now =
            new Date();

        const updatedManufacturer =
            {
                ...current,

                ...payload,

                id:
                    current.id,

                createdBy:
                    current.createdBy,

                createdOn:
                    current.createdOn,

                modifiedBy:
                    "Admin",

                modifiedOn:
                    now
                        .toISOString()
                        .split(
                            "T"
                        )[0],
            };

        manufacturers[
            index
        ] =
            updatedManufacturer;

        return updatedManufacturer;
    };

/*
 * ============================================
 * Delete / Deactivate Manufacturer
 * ============================================
 *
 * Pharmacy master data ko hard delete karna
 * generally avoid karna better hai.
 *
 * Isliye Active → Inactive kar rahe hain.
 */

export const deleteManufacturer =
    async (
        id
    ) => {
        const index =
            manufacturers.findIndex(
                (item) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Manufacturer not found."
            );
        }

        manufacturers[
            index
        ] = {
            ...manufacturers[
                index
            ],

            status:
                "Inactive",

            modifiedBy:
                "Admin",

            modifiedOn:
                new Date()
                    .toISOString()
                    .split(
                        "T"
                    )[0],
        };

        return manufacturers[
            index
        ];
    };

/*
 * ============================================
 * Activate Manufacturer
 * ============================================
 */

export const activateManufacturer =
    async (
        id
    ) => {
        const index =
            manufacturers.findIndex(
                (item) =>
                    Number(
                        item.id
                    ) ===
                    Number(id)
            );

        if (
            index === -1
        ) {
            throw new Error(
                "Manufacturer not found."
            );
        }

        manufacturers[
            index
        ] = {
            ...manufacturers[
                index
            ],

            status:
                "Active",

            modifiedBy:
                "Admin",

            modifiedOn:
                new Date()
                    .toISOString()
                    .split(
                        "T"
                    )[0],
        };

        return manufacturers[
            index
        ];
    };

/*
 * ============================================
 * Statistics
 * ============================================
 */

export const getManufacturerStatistics =
    async () => {
        const total =
            manufacturers.length;

        const active =
            manufacturers.filter(
                (item) =>
                    item.status ===
                    "Active"
            ).length;

        const inactive =
            manufacturers.filter(
                (item) =>
                    item.status ===
                    "Inactive"
            ).length;

        const pharmaceutical =
            manufacturers.filter(
                (item) =>
                    item.manufacturerType ===
                    "PHARMACEUTICAL"
            ).length;

        const biological =
            manufacturers.filter(
                (item) =>
                    item.manufacturerType ===
                    "BIOLOGICAL"
            ).length;

        const totalProducts =
            manufacturers.reduce(
                (
                    totalValue,
                    item
                ) =>
                    totalValue +
                    (Number(
                        item.productsCount
                    ) || 0),
                0
            );

        return {
            total,

            active,

            inactive,

            pharmaceutical,

            biological,

            totalProducts,
        };
    };

export default {
    getManufacturers,
    getManufacturerById,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    activateManufacturer,
    getManufacturerStatistics,
};