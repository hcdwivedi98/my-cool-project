// src/modules/pharmacy/drug-route/services/drugRoute.service.js

import {
    drugRouteList,
} from "../mock/drugRoute.mock";

import {
    prepareDrugRoutePayload,
} from "../utils/drugRoute.helper";

import {
    buildDrugRouteQuery,
} from "../utils/drugRoute.query";


/*
 * =========================================================
 * MOCK DATABASE
 * =========================================================
 *
 * Keep service state outside React components.
 *
 * Later this section can be replaced by API calls.
 */

let mockDrugRoutes = [
    ...drugRouteList,
];


/*
 * =========================================================
 * ID GENERATOR
 * =========================================================
 */

const generateDrugRouteId = () => {

    if (
        mockDrugRoutes.length === 0
    ) {
        return 1;
    }

    return (
        Math.max(
            ...mockDrugRoutes.map(
                (item) =>
                    Number(
                        item.id
                    ) || 0
            )
        ) + 1
    );
};


/*
 * =========================================================
 * DATE
 * =========================================================
 */

const getCurrentDateTime = () => {

    return new Date()
        .toISOString();
};


/*
 * =========================================================
 * CURRENT USER
 * =========================================================
 *
 * Temporary mock user.
 *
 * Later backend JWT will provide this.
 */

const getCurrentUser = () => {

    return "Current User";
};


/*
 * =========================================================
 * SEARCH
 * =========================================================
 */

const matchesSearch = (
    record,
    search
) => {

    if (
        !search
    ) {
        return true;
    }


    const keyword =
        String(
            search
        )
            .trim()
            .toLowerCase();


    if (!keyword) {
        return true;
    }


    const searchableText = [

        record.routeCode,

        record.routeName,

        record.routeType,

        record.description,

        record.status,

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    return searchableText.includes(
        keyword
    );
};


/*
 * =========================================================
 * FILTER
 * =========================================================
 */

const matchesFilters = (
    record,
    query
) => {

    /*
     * -----------------------------------------------
     * SEARCH
     * -----------------------------------------------
     */

    if (
        !matchesSearch(
            record,
            query.search
        )
    ) {
        return false;
    }


    /*
     * -----------------------------------------------
     * ROUTE TYPE
     * -----------------------------------------------
     */

    if (
        query.routeType &&
        record.routeType !==
            query.routeType
    ) {
        return false;
    }


    /*
     * -----------------------------------------------
     * STATUS
     * -----------------------------------------------
 */

    if (
        query.status &&
        record.status !==
            query.status
    ) {
        return false;
    }


    /*
     * -----------------------------------------------
     * USAGE
     * -----------------------------------------------
     */

    if (
        query.usage ===
        "USED"
    ) {

        if (
            Number(
                record.drugCount
            ) <= 0
        ) {
            return false;
        }
    }


    if (
        query.usage ===
        "UNUSED"
    ) {

        if (
            Number(
                record.drugCount
            ) > 0
        ) {
            return false;
        }
    }


    return true;
};


/*
 * =========================================================
 * SORT
 * =========================================================
 */

const sortDrugRoutes = (
    records,
    sortBy,
    sortOrder
) => {

    const result = [
        ...records,
    ];


    result.sort(
        (
            first,
            second
        ) => {

            const firstValue =
                first?.[
                    sortBy
                ];

            const secondValue =
                second?.[
                    sortBy
                ];


            /*
             * -------------------------------------------
             * NULL VALUES
             * -------------------------------------------
             */

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


            /*
             * -------------------------------------------
             * NUMBERS
             * -------------------------------------------
             */

            if (
                typeof firstValue ===
                    "number" ||
                typeof secondValue ===
                    "number"
            ) {

                const firstNumber =
                    Number(
                        firstValue
                    ) || 0;

                const secondNumber =
                    Number(
                        secondValue
                    ) || 0;


                const result =
                    firstNumber -
                    secondNumber;


                return sortOrder ===
                    "desc"
                    ? -result
                    : result;
            }


            /*
             * -------------------------------------------
             * STRING
             * -------------------------------------------
             */

            const result =
                String(
                    firstValue
                ).localeCompare(
                    String(
                        secondValue
                    ),
                    undefined,
                    {
                        numeric:
                            true,

                        sensitivity:
                            "base",
                    }
                );


            return sortOrder ===
                "desc"
                ? -result
                : result;
        }
    );


    return result;
};


/*
 * =========================================================
 * GET LIST
 * =========================================================
 */

const getAll = async (
    query = {}
) => {

    const normalizedQuery =
        buildDrugRouteQuery(
            query
        );


    /*
     * -----------------------------------------------
     * FILTER
     * -----------------------------------------------
     */

    let filtered =
        mockDrugRoutes.filter(
            (record) =>
                matchesFilters(
                    record,
                    normalizedQuery
                )
        );


    /*
     * -----------------------------------------------
     * SORT
     * -----------------------------------------------
     */

    filtered =
        sortDrugRoutes(
            filtered,

            normalizedQuery.sortBy,

            normalizedQuery.sortOrder
        );


    /*
     * -----------------------------------------------
     * TOTAL
     * -----------------------------------------------
     */

    const total =
        filtered.length;


    /*
     * -----------------------------------------------
     * PAGINATION
     * -----------------------------------------------
     */

    const startIndex =
        (
            normalizedQuery.page -
            1
        ) *
        normalizedQuery.pageSize;


    const endIndex =
        startIndex +
        normalizedQuery.pageSize;


    const items =
        filtered.slice(
            startIndex,
            endIndex
        );


    return {

        items,

        total,

        page:
            normalizedQuery.page,

        pageSize:
            normalizedQuery.pageSize,

    };
};


/*
 * =========================================================
 * GET BY ID
 * =========================================================
 */

const getById = async (
    id
) => {

    const record =
        mockDrugRoutes.find(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (!record) {

        throw new Error(
            "Drug route not found."
        );
    }


    return {
        ...record,
    };
};


/*
 * =========================================================
 * CREATE
 * =========================================================
 */

const create = async (
    values
) => {

    const payload =
        prepareDrugRoutePayload(
            values
        );


    const now =
        getCurrentDateTime();


    const newRecord = {

        id:
            generateDrugRouteId(),

        ...payload,

        drugCount:
            0,

        createdBy:
            getCurrentUser(),

        createdOn:
            now,

        modifiedBy:
            getCurrentUser(),

        modifiedOn:
            now,
    };


    mockDrugRoutes = [

        newRecord,

        ...mockDrugRoutes,

    ];


    return {
        ...newRecord,
    };
};


/*
 * =========================================================
 * UPDATE
 * =========================================================
 */

const update = async (
    id,
    values
) => {

    const index =
        mockDrugRoutes.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug route not found."
        );
    }


    const payload =
        prepareDrugRoutePayload(
            values
        );


    const existing =
        mockDrugRoutes[
            index
        ];


    const updatedRecord = {

        ...existing,

        ...payload,

        id:
            existing.id,

        drugCount:
            existing.drugCount || 0,

        createdBy:
            existing.createdBy,

        createdOn:
            existing.createdOn,

        modifiedBy:
            getCurrentUser(),

        modifiedOn:
            getCurrentDateTime(),
    };


    mockDrugRoutes[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/*
 * =========================================================
 * ACTIVATE
 * =========================================================
 */

const activate = async (
    id
) => {

    const index =
        mockDrugRoutes.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug route not found."
        );
    }


    const existing =
        mockDrugRoutes[
            index
        ];


    const updatedRecord = {

        ...existing,

        status:
            "Active",

        modifiedBy:
            getCurrentUser(),

        modifiedOn:
            getCurrentDateTime(),
    };


    mockDrugRoutes[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/*
 * =========================================================
 * DEACTIVATE
 * =========================================================
 */

const deactivate = async (
    id
) => {

    const index =
        mockDrugRoutes.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug route not found."
        );
    }


    const existing =
        mockDrugRoutes[
            index
        ];


    const updatedRecord = {

        ...existing,

        status:
            "Inactive",

        modifiedBy:
            getCurrentUser(),

        modifiedOn:
            getCurrentDateTime(),
    };


    mockDrugRoutes[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/*
 * =========================================================
 * DELETE
 * =========================================================
 *
 * Hard delete is intentionally blocked when
 * drug mappings exist.
 */

const remove = async (
    id
) => {

    const index =
        mockDrugRoutes.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug route not found."
        );
    }


    const existing =
        mockDrugRoutes[
            index
        ];


    const drugCount =
        Number(
            existing.drugCount
        ) || 0;


    if (
        drugCount > 0
    ) {

        throw new Error(
            `Cannot delete this route because it is mapped to ${drugCount} drug${drugCount === 1 ? "" : "s"}. Deactivate it instead.`
        );
    }


    mockDrugRoutes.splice(
        index,
        1
    );


    return {
        success:
            true,

        id,
    };
};


/*
 * =========================================================
 * CHECK CODE EXISTS
 * =========================================================
 */

const codeExists = async (
    routeCode,
    excludeId = null
) => {

    const normalizedCode =
        String(
            routeCode || ""
        )
            .trim()
            .toUpperCase();


    if (!normalizedCode) {
        return false;
    }


    return mockDrugRoutes.some(
        (item) => {

            if (
                excludeId !== null &&
                excludeId !== undefined &&
                String(
                    item.id
                ) ===
                String(
                    excludeId
                )
            ) {
                return false;
            }


            return (
                String(
                    item.routeCode ||
                    ""
                )
                    .trim()
                    .toUpperCase() ===
                normalizedCode
            );
        }
    );
};


/*
 * =========================================================
 * NAME EXISTS
 * =========================================================
 */

const nameExists = async (
    routeName,
    excludeId = null
) => {

    const normalizedName =
        String(
            routeName || ""
        )
            .trim()
            .toLowerCase();


    if (!normalizedName) {
        return false;
    }


    return mockDrugRoutes.some(
        (item) => {

            if (
                excludeId !== null &&
                excludeId !== undefined &&
                String(
                    item.id
                ) ===
                String(
                    excludeId
                )
            ) {
                return false;
            }


            return (
                String(
                    item.routeName ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                normalizedName
            );
        }
    );
};


/*
 * =========================================================
 * EXPORT
 * =========================================================
 */

const drugRouteService = {

    getAll,

    getById,

    create,

    update,

    activate,

    deactivate,

    remove,

    codeExists,

    nameExists,

};


export default drugRouteService;