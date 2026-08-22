// src/modules/pharmacy/drug-category/services/drugCategory.service.js

import {
    drugCategoryList,
} from "../mock/drugCategory.mock";

import {
    normalizeDrugCategoryQuery,
} from "../utils/drugCategory.query";

import {
    prepareDrugCategoryPayload,
} from "../utils/drugCategory.helper";


/*
 * =========================================================
 * LOCAL DATA STORE
 * =========================================================
 *
 * We create a local copy so mock operations do not directly
 * mutate the imported mock array.
 */

let categories = [
    ...drugCategoryList,
];


/*
 * =========================================================
 * HELPERS
 * =========================================================
 */

const wait = (
    milliseconds = 250
) =>
    new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


const normalizeText = (
    value
) =>
    String(
        value ?? ""
    )
        .trim()
        .toLowerCase();


const getNextId = () => {

    if (!categories.length) {
        return 1;
    }

    return (
        Math.max(
            ...categories.map(
                (item) =>
                    Number(
                        item.id
                    ) || 0
            )
        ) + 1
    );
};


const getCategoryName = (
    id
) => {

    if (
        id === null ||
        id === undefined ||
        id === ""
    ) {
        return null;
    }

    const category =
        categories.find(
            (item) =>
                String(
                    item.id
                ) ===
                String(id)
        );

    return (
        category?.categoryName ||
        null
    );
};


const enrichCategory = (
    category
) => {

    return {
        ...category,

        parentCategoryName:
            getCategoryName(
                category.parentCategoryId
            ),

        drugCount:
            Number(
                category.drugCount
            ) || 0,
    };
};


/*
 * =========================================================
 * GET ALL CATEGORIES
 * =========================================================
 */

const getAll = async () => {

    await wait();

    return categories.map(
        enrichCategory
    );
};


/*
 * =========================================================
 * GET BY ID
 * =========================================================
 */

const getById = async (
    id
) => {

    await wait();

    const category =
        categories.find(
            (item) =>
                String(
                    item.id
                ) ===
                String(id)
        );

    if (!category) {
        throw new Error(
            "Drug category not found."
        );
    }

    return enrichCategory(
        category
    );
};


/*
 * =========================================================
 * SEARCH / FILTER / PAGINATION
 * =========================================================
 */

const getList = async (
    query = {}
) => {

    await wait();

    const normalizedQuery =
        normalizeDrugCategoryQuery(
            query
        );


    let result =
        categories.map(
            enrichCategory
        );


    /*
     * -----------------------------------------------
     * SEARCH
     * -----------------------------------------------
     */

    if (
        normalizedQuery.search
    ) {

        const search =
            normalizeText(
                normalizedQuery.search
            );

        result =
            result.filter(
                (item) => {

                    const code =
                        normalizeText(
                            item.categoryCode
                        );

                    const name =
                        normalizeText(
                            item.categoryName
                        );

                    const description =
                        normalizeText(
                            item.description
                        );

                    return (
                        code.includes(
                            search
                        ) ||
                        name.includes(
                            search
                        ) ||
                        description.includes(
                            search
                        )
                    );
                }
            );
    }


    /*
     * -----------------------------------------------
     * CATEGORY TYPE
     * -----------------------------------------------
     */

    if (
        normalizedQuery.categoryType
    ) {

        result =
            result.filter(
                (item) =>
                    item.categoryType ===
                    normalizedQuery.categoryType
            );
    }


    /*
     * -----------------------------------------------
     * PARENT CATEGORY
     * -----------------------------------------------
     */

    if (
        normalizedQuery.parentCategoryId !==
        undefined
    ) {

        result =
            result.filter(
                (item) =>
                    String(
                        item.parentCategoryId
                    ) ===
                    String(
                        normalizedQuery.parentCategoryId
                    )
            );
    }


    /*
     * -----------------------------------------------
     * STATUS
     * -----------------------------------------------
     */

    if (
        normalizedQuery.status
    ) {

        result =
            result.filter(
                (item) =>
                    item.status ===
                    normalizedQuery.status
            );
    }


    /*
     * -----------------------------------------------
     * USAGE
     * -----------------------------------------------
     */

    if (
        normalizedQuery.usage ===
        "USED"
    ) {

        result =
            result.filter(
                (item) =>
                    Number(
                        item.drugCount
                    ) > 0
            );
    }

    if (
        normalizedQuery.usage ===
        "UNUSED"
    ) {

        result =
            result.filter(
                (item) =>
                    Number(
                        item.drugCount
                    ) === 0
            );
    }


    /*
     * -----------------------------------------------
     * SORTING
     * -----------------------------------------------
     */

    const sortBy =
        normalizedQuery.sortBy ||
        "sortOrder";

    const sortOrder =
        normalizedQuery.sortOrder ===
        "desc"
            ? -1
            : 1;


    result.sort(
        (a, b) => {

            const first =
                a?.[sortBy];

            const second =
                b?.[sortBy];


            if (
                first ===
                second
            ) {
                return 0;
            }


            if (
                first ===
                null ||
                first ===
                undefined
            ) {
                return 1;
            }


            if (
                second ===
                null ||
                second ===
                undefined
            ) {
                return -1;
            }


            if (
                typeof first ===
                "number" &&
                typeof second ===
                "number"
            ) {
                return (
                    first -
                    second
                ) * sortOrder;
            }


            return String(
                first
            ).localeCompare(
                String(
                    second
                )
            ) * sortOrder;
        }
    );


    /*
     * -----------------------------------------------
     * TOTAL
     * -----------------------------------------------
     */

    const total =
        result.length;


    /*
     * -----------------------------------------------
     * PAGINATION
     * -----------------------------------------------
     */

    const page =
        normalizedQuery.page;

    const pageSize =
        normalizedQuery.pageSize;

    const start =
        (
            page - 1
        ) * pageSize;

    const end =
        start +
        pageSize;


    const items =
        result.slice(
            start,
            end
        );


    return {
        items,

        data:
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
 * =========================================================
 * CREATE
 * =========================================================
 */

const create = async (
    payload
) => {

    await wait();

    const normalized =
        prepareDrugCategoryPayload(
            payload
        );


    /*
     * Duplicate code
     */

    const duplicateCode =
        categories.some(
            (item) =>
                normalizeText(
                    item.categoryCode
                ) ===
                normalizeText(
                    normalized.categoryCode
                )
        );

    if (duplicateCode) {
        throw new Error(
            "Category code already exists."
        );
    }


    /*
     * Duplicate name
     */

    const duplicateName =
        categories.some(
            (item) =>
                normalizeText(
                    item.categoryName
                ) ===
                normalizeText(
                    normalized.categoryName
                )
        );

    if (duplicateName) {
        throw new Error(
            "Category name already exists."
        );
    }


    const now =
        new Date().toLocaleString();


    const newCategory = {
        ...normalized,

        id:
            getNextId(),

        drugCount:
            0,

        parentCategoryName:
            getCategoryName(
                normalized.parentCategoryId
            ),

        createdBy:
            "Current User",

        createdOn:
            now,

        modifiedBy:
            "Current User",

        modifiedOn:
            now,
    };


    categories = [
        ...categories,
        newCategory,
    ];


    return enrichCategory(
        newCategory
    );
};


/*
 * =========================================================
 * UPDATE
 * =========================================================
 */

const update = async (
    id,
    payload
) => {

    await wait();


    const index =
        categories.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (index === -1) {
        throw new Error(
            "Drug category not found."
        );
    }


    const normalized =
        prepareDrugCategoryPayload(
            payload
        );


    /*
     * Duplicate code
     */

    const duplicateCode =
        categories.some(
            (item) =>
                String(
                    item.id
                ) !==
                String(id) &&
                normalizeText(
                    item.categoryCode
                ) ===
                normalizeText(
                    normalized.categoryCode
                )
        );


    if (duplicateCode) {
        throw new Error(
            "Category code already exists."
        );
    }


    /*
     * Duplicate name
     */

    const duplicateName =
        categories.some(
            (item) =>
                String(
                    item.id
                ) !==
                String(id) &&
                normalizeText(
                    item.categoryName
                ) ===
                normalizeText(
                    normalized.categoryName
                )
        );


    if (duplicateName) {
        throw new Error(
            "Category name already exists."
        );
    }


    const existing =
        categories[index];


    const updated = {
        ...existing,

        ...normalized,

        id:
            existing.id,

        drugCount:
            existing.drugCount ?? 0,

        createdBy:
            existing.createdBy,

        createdOn:
            existing.createdOn,

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toLocaleString(),

        parentCategoryName:
            getCategoryName(
                normalized.parentCategoryId
            ),
    };


    categories = [
        ...categories.slice(
            0,
            index
        ),

        updated,

        ...categories.slice(
            index + 1
        ),
    ];


    return enrichCategory(
        updated
    );
};


/*
 * =========================================================
 * ACTIVATE
 * =========================================================
 */

const activate = async (
    id
) => {

    await wait();


    const index =
        categories.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (index === -1) {
        throw new Error(
            "Drug category not found."
        );
    }


    const updated = {
        ...categories[index],

        status:
            "Active",

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toLocaleString(),
    };


    categories[index] =
        updated;


    return enrichCategory(
        updated
    );
};


/*
 * =========================================================
 * DEACTIVATE
 * =========================================================
 */

const deactivate = async (
    id
) => {

    await wait();


    const index =
        categories.findIndex(
            (item) =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (index === -1) {
        throw new Error(
            "Drug category not found."
        );
    }


    const updated = {
        ...categories[index],

        status:
            "Inactive",

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toLocaleString(),
    };


    categories[index] =
        updated;


    return enrichCategory(
        updated
    );
};


/*
 * =========================================================
 * RESET MOCK DATA
 * =========================================================
 *
 * Useful during development/testing.
 */

const resetMockData = () => {

    categories = [
        ...drugCategoryList,
    ];
};


/*
 * =========================================================
 * SERVICE EXPORT
 * =========================================================
 */

const drugCategoryService = {
    getAll,

    getById,

    getList,

    create,

    update,

    activate,

    deactivate,

    resetMockData,
};


export default drugCategoryService;

export {
    getAll,
    getById,
    getList,
    create,
    update,
    activate,
    deactivate,
    resetMockData,
};