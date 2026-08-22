// src/modules/pharmacy/uom/services/uom.service.js

import {
    uomList,
} from "../mock/uom.mock";

import {
    filterUoms,
    findUomById,
    findUomByCode,
    isDuplicateUomCode,
    isDuplicateUomName,
    prepareUomListResult,
    prepareUomPayload,
} from "../utils/uom.helper";

import {
    buildUomQuery,
} from "../utils/uom.query";


/*
 * ============================================
 * MOCK DATABASE
 * ============================================
 *
 * We keep a local copy so that CRUD operations
 * during development can mutate the mock data
 * without directly changing imported mock data.
 */

let uoms = [
    ...uomList,
];


/*
 * ============================================
 * UTILITY
 * ============================================
 */

const delay = (
    milliseconds = 250
) => {
    return new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );
};


/*
 * ============================================
 * SERVICE ERROR
 * ============================================
 */

const createServiceError = (
    message,
    code = "UOM_ERROR"
) => {
    const error =
        new Error(message);

    error.code =
        code;

    return error;
};


/*
 * ============================================
 * GET UOM LIST
 * ============================================
 */

export const getUoms = async (
    query = {}
) => {
    await delay();


    const normalizedQuery =
        buildUomQuery(
            query
        );


    const result =
        prepareUomListResult(
            uoms,
            normalizedQuery
        );


    return {
        success: true,

        data:
            result.data,

        total:
            result.total,

        page:
            result.page,

        pageSize:
            result.pageSize,

        totalPages:
            result.totalPages,
    };
};


/*
 * ============================================
 * GET ALL UOMS
 * ============================================
 */

export const getAllUoms =
    async () => {
        await delay();

        return {
            success: true,

            data: [
                ...uoms,
            ],
        };
    };


/*
 * ============================================
 * GET ACTIVE UOMS
 * ============================================
 */

export const getActiveUoms =
    async () => {
        await delay();

        return {
            success: true,

            data:
                uoms.filter(
                    (item) =>
                        item.status ===
                        "Active"
                ),
        };
    };


/*
 * ============================================
 * GET UOM BY ID
 * ============================================
 */

export const getUomById = async (
    id
) => {
    await delay();

    const numericId =
        Number(id);

    const uom =
        findUomById(
            uoms,
            numericId
        );


    if (!uom) {
        throw createServiceError(
            "UOM not found.",
            "UOM_NOT_FOUND"
        );
    }


    return {
        success: true,

        data: {
            ...uom,
        },
    };
};


/*
 * ============================================
 * GET UOM BY CODE
 * ============================================
 */

export const getUomByCode =
    async (
        code
    ) => {
        await delay();

        const uom =
            findUomByCode(
                uoms,
                code
            );


        if (!uom) {
            throw createServiceError(
                "UOM not found.",
                "UOM_NOT_FOUND"
            );
        }


        return {
            success: true,

            data: {
                ...uom,
            },
        };
    };


/*
 * ============================================
 * CREATE UOM
 * ============================================
 */

export const createUom = async (
    values
) => {
    await delay();


    /*
     * ----------------------------------------
     * PREPARE PAYLOAD
     * ----------------------------------------
     */

    const payload =
        prepareUomPayload(
            values
        );


    /*
     * ----------------------------------------
     * DUPLICATE CODE
     * ----------------------------------------
     */

    if (
        isDuplicateUomCode(
            uoms,
            payload.uomCode
        )
    ) {
        throw createServiceError(
            `UOM code "${payload.uomCode}" already exists.`,
            "DUPLICATE_UOM_CODE"
        );
    }


    /*
     * ----------------------------------------
     * DUPLICATE NAME
     * ----------------------------------------
     */

    if (
        isDuplicateUomName(
            uoms,
            payload.uomName
        )
    ) {
        throw createServiceError(
            `UOM name "${payload.uomName}" already exists.`,
            "DUPLICATE_UOM_NAME"
        );
    }


    /*
     * ----------------------------------------
     * NEW ID
     * ----------------------------------------
     */

    const newId =
        uoms.length
            ? Math.max(
                ...uoms.map(
                    (item) =>
                        Number(
                            item.id
                        )
                )
            ) + 1
            : 1;


    /*
     * ----------------------------------------
     * AUDIT
     * ----------------------------------------
     */

    const today =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );


    const newUom = {
        id: newId,

        ...payload,

        createdBy:
            "Admin",

        createdOn:
            today,

        modifiedBy:
            "Admin",

        modifiedOn:
            today,
    };


    /*
     * ----------------------------------------
     * SAVE
     * ----------------------------------------
     */

    uoms = [
        newUom,
        ...uoms,
    ];


    return {
        success: true,

        message:
            "UOM created successfully.",

        data: {
            ...newUom,
        },
    };
};


/*
 * ============================================
 * UPDATE UOM
 * ============================================
 */

export const updateUom = async (
    id,
    values
) => {
    await delay();


    const numericId =
        Number(id);


    const existingUom =
        findUomById(
            uoms,
            numericId
        );


    if (!existingUom) {
        throw createServiceError(
            "UOM not found.",
            "UOM_NOT_FOUND"
        );
    }


    /*
     * ----------------------------------------
     * PREPARE PAYLOAD
     * ----------------------------------------
     */

    const payload =
        prepareUomPayload(
            values
        );


    /*
     * ----------------------------------------
     * DUPLICATE CODE
     * ----------------------------------------
     */

    if (
        isDuplicateUomCode(
            uoms,
            payload.uomCode,
            numericId
        )
    ) {
        throw createServiceError(
            `UOM code "${payload.uomCode}" already exists.`,
            "DUPLICATE_UOM_CODE"
        );
    }


    /*
     * ----------------------------------------
     * DUPLICATE NAME
     * ----------------------------------------
     */

    if (
        isDuplicateUomName(
            uoms,
            payload.uomName,
            numericId
        )
    ) {
        throw createServiceError(
            `UOM name "${payload.uomName}" already exists.`,
            "DUPLICATE_UOM_NAME"
        );
    }


    /*
     * ----------------------------------------
     * AUDIT
     * ----------------------------------------
     */

    const today =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );


    const updatedUom = {
        ...existingUom,

        ...payload,

        id:
            numericId,

        createdBy:
            existingUom.createdBy,

        createdOn:
            existingUom.createdOn,

        modifiedBy:
            "Admin",

        modifiedOn:
            today,
    };


    /*
     * ----------------------------------------
     * SAVE
     * ----------------------------------------
     */

    uoms =
        uoms.map(
            (item) =>
                item.id ===
                numericId
                    ? updatedUom
                    : item
        );


    return {
        success: true,

        message:
            "UOM updated successfully.",

        data: {
            ...updatedUom,
        },
    };
};


/*
 * ============================================
 * ACTIVATE UOM
 * ============================================
 */

export const activateUom = async (
    id
) => {
    await delay();


    const numericId =
        Number(id);


    const existingUom =
        findUomById(
            uoms,
            numericId
        );


    if (!existingUom) {
        throw createServiceError(
            "UOM not found.",
            "UOM_NOT_FOUND"
        );
    }


    if (
        existingUom.status ===
        "Active"
    ) {
        throw createServiceError(
            "UOM is already active.",
            "UOM_ALREADY_ACTIVE"
        );
    }


    const today =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );


    const updatedUom = {
        ...existingUom,

        status:
            "Active",

        modifiedBy:
            "Admin",

        modifiedOn:
            today,
    };


    uoms =
        uoms.map(
            (item) =>
                item.id ===
                numericId
                    ? updatedUom
                    : item
        );


    return {
        success: true,

        message:
            "UOM activated successfully.",

        data: {
            ...updatedUom,
        },
    };
};


/*
 * ============================================
 * DEACTIVATE UOM
 * ============================================
 */

export const deactivateUom =
    async (
        id
    ) => {
        await delay();


        const numericId =
            Number(id);


        const existingUom =
            findUomById(
                uoms,
                numericId
            );


        if (!existingUom) {
            throw createServiceError(
                "UOM not found.",
                "UOM_NOT_FOUND"
            );
        }


        if (
            existingUom.status ===
            "Inactive"
        ) {
            throw createServiceError(
                "UOM is already inactive.",
                "UOM_ALREADY_INACTIVE"
            );
        }


        const today =
            new Date()
                .toISOString()
                .slice(
                    0,
                    10
                );


        const updatedUom = {
            ...existingUom,

            status:
                "Inactive",

            modifiedBy:
                "Admin",

            modifiedOn:
                today,
        };


        uoms =
            uoms.map(
                (item) =>
                    item.id ===
                    numericId
                        ? updatedUom
                        : item
            );


        return {
            success: true,

            message:
                "UOM deactivated successfully.",

            data: {
                ...updatedUom,
            },
        };
    };


/*
 * ============================================
 * SEARCH UOMS
 * ============================================
 */

export const searchUoms =
    async (
        search
    ) => {
        await delay();


        const filtered =
            filterUoms(
                uoms,
                {
                    search,
                }
            );


        return {
            success: true,

            data: filtered,
        };
    };


/*
 * ============================================
 * CHECK CODE
 * ============================================
 */

export const checkUomCode =
    async (
        code,
        excludeId = null
    ) => {
        await delay();


        const duplicate =
            isDuplicateUomCode(
                uoms,
                code,
                excludeId
            );


        return {
            success: true,

            available:
                !duplicate,
        };
    };


/*
 * ============================================
 * CHECK NAME
 * ============================================
 */

export const checkUomName =
    async (
        name,
        excludeId = null
    ) => {
        await delay();


        const duplicate =
            isDuplicateUomName(
                uoms,
                name,
                excludeId
            );


        return {
            success: true,

            available:
                !duplicate,
        };
    };


/*
 * ============================================
 * DEFAULT SERVICE OBJECT
 * ============================================
 */

const uomService = {
    getUoms,

    getAllUoms,

    getActiveUoms,

    getUomById,

    getUomByCode,

    createUom,

    updateUom,

    activateUom,

    deactivateUom,

    searchUoms,

    checkUomCode,

    checkUomName,
};


export default uomService;