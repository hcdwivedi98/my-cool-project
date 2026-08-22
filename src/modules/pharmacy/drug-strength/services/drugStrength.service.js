// src/modules/pharmacy/drug-strength/services/drugStrength.service.js

import {
    drugStrengthList,
} from "../mock/drugStrength.mock";

import {
    DRUG_STRENGTH_STATUS,
} from "../constants/drugStrength.constants";

import {
    createDrugStrengthQuery,
    drugStrengthQueryToApiParams,
} from "../utils/drugStrength.query";

import {
    normalizeDrugStrengthForm,
} from "../utils/drugStrength.helper";


/* =========================================================
   LOCAL DATA STORE
   ========================================================= */

/*
 * We keep a local copy so CRUD operations work during
 * frontend development without an API.
 */

let localDrugStrengthList = [
    ...drugStrengthList,
];


/* =========================================================
   UTILITY
   ========================================================= */

const delay = (
    milliseconds = 250
) =>
    new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


const generateId = () => {

    if (
        !localDrugStrengthList.length
    ) {
        return 1;
    }


    return (
        Math.max(
            ...localDrugStrengthList.map(
                (
                    item
                ) =>
                    Number(
                        item.id
                    ) || 0
            )
        ) + 1
    );
};


/* =========================================================
   SORT
   ========================================================= */

const sortItems = (
    items,
    sortBy,
    sortOrder
) => {

    const direction =
        sortOrder === "desc"
            ? -1
            : 1;


    return [
        ...items,
    ].sort(
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


            if (
                typeof firstValue ===
                "number" &&
                typeof secondValue ===
                "number"
            ) {

                return (
                    firstValue -
                    secondValue
                ) * direction;
            }


            return String(
                firstValue
            )
                .localeCompare(
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
                ) * direction;
        }
    );
};


/* =========================================================
   SEARCH
   ========================================================= */

const matchesSearch = (
    item,
    search
) => {

    if (
        !search
    ) {
        return true;
    }


    const normalizedSearch =
        String(
            search
        )
            .trim()
            .toLowerCase();


    const searchableText = [

        item.strengthCode,

        item.strengthDisplay,

        item.strengthUnitCode,

        item.strengthUnitName,

        item.strengthType,

        item.description,

        item.remarks,

    ]
        .filter(
            Boolean
        )
        .join(
            " "
        )
        .toLowerCase();


    return searchableText.includes(
        normalizedSearch
    );
};


/* =========================================================
   FILTER
   ========================================================= */

const filterItems = (
    query
) => {

    return localDrugStrengthList.filter(
        (
            item
        ) => {

            /*
             * Search
             */

            if (
                !matchesSearch(
                    item,
                    query.search
                )
            ) {
                return false;
            }


            /*
             * Strength Type
             */

            if (
                query.strengthType &&
                item.strengthType !==
                    query.strengthType
            ) {
                return false;
            }


            /*
             * Unit
             */

            if (
                query.strengthUnitId &&
                Number(
                    item.strengthUnitId
                ) !==
                    Number(
                        query.strengthUnitId
                    )
            ) {
                return false;
            }


            /*
             * Status
             */

            if (
                query.status &&
                item.status !==
                    query.status
            ) {
                return false;
            }


            /*
             * Usage
             */

            if (
                query.usage ===
                "USED"
            ) {

                const mappedCount =
                    Number(
                        item.mappedDrugCount
                    ) || 0;


                if (
                    mappedCount <= 0
                ) {
                    return false;
                }
            }


            if (
                query.usage ===
                "UNUSED"
            ) {

                const mappedCount =
                    Number(
                        item.mappedDrugCount
                    ) || 0;


                if (
                    mappedCount > 0
                ) {
                    return false;
                }
            }


            return true;
        }
    );
};


/* =========================================================
   GET ALL
   ========================================================= */

const getAll = async (
    queryInput = {}
) => {

    await delay();


    const query =
        createDrugStrengthQuery(
            queryInput
        );


    /*
     * Keep API parameter mapping available so the
     * service can later be switched to HTTP easily.
     */

    drugStrengthQueryToApiParams(
        query
    );


    let items =
        filterItems(
            query
        );


    items =
        sortItems(
            items,
            query.sortBy,
            query.sortOrder
        );


    const total =
        items.length;


    const startIndex =
        (
            query.page -
            1
        ) *
        query.pageSize;


    const endIndex =
        startIndex +
        query.pageSize;


    const pagedItems =
        items.slice(
            startIndex,
            endIndex
        );


    return {

        items:
            pagedItems,

        total,

        page:
            query.page,

        pageSize:
            query.pageSize,

    };
};


/* =========================================================
   GET BY ID
   ========================================================= */

const getById = async (
    id
) => {

    await delay();


    return (
        localDrugStrengthList.find(
            (
                item
            ) =>
                Number(
                    item.id
                ) ===
                Number(
                    id
                )
        ) ||
        null
    );
};


/* =========================================================
   CHECK DUPLICATE CODE
   ========================================================= */

const hasDuplicateCode = (
    code,
    excludeId = null
) => {

    const normalizedCode =
        String(
            code ||
            ""
        )
            .trim()
            .toUpperCase();


    return localDrugStrengthList.some(
        (
            item
        ) => {

            if (
                excludeId !== null &&
                Number(
                    item.id
                ) ===
                    Number(
                        excludeId
                    )
            ) {
                return false;
            }


            return (
                String(
                    item.strengthCode ||
                    ""
                )
                    .trim()
                    .toUpperCase() ===
                normalizedCode
            );
        }
    );
};


/* =========================================================
   CHECK DUPLICATE VALUE + UNIT
   ========================================================= */

const hasDuplicateCombination = (
    payload,
    excludeId = null
) => {

    return localDrugStrengthList.some(
        (
            item
        ) => {

            if (
                excludeId !== null &&
                Number(
                    item.id
                ) ===
                    Number(
                        excludeId
                    )
            ) {
                return false;
            }


            return (

                Number(
                    item.strengthValue
                ) ===
                Number(
                    payload.strengthValue
                )

                &&

                String(
                    item.strengthUnitCode ||
                    ""
                )
                    .trim()
                    .toUpperCase() ===
                String(
                    payload.strengthUnitCode ||
                    ""
                )
                    .trim()
                    .toUpperCase()

            );
        }
    );
};


/* =========================================================
   CREATE
   ========================================================= */

const create = async (
    values
) => {

    await delay();


    const payload =
        normalizeDrugStrengthForm(
            values
        );


    if (
        hasDuplicateCode(
            payload.strengthCode
        )
    ) {
        throw new Error(
            "Strength code already exists."
        );
    }


    if (
        hasDuplicateCombination(
            payload
        )
    ) {
        throw new Error(
            "This strength and unit combination already exists."
        );
    }


    const now =
        new Date().toISOString();


    const newRecord = {

        ...payload,

        id:
            generateId(),

        status:
            payload.status ||
            DRUG_STRENGTH_STATUS.ACTIVE,

        mappedDrugCount:
            0,

        isSystemDefined:
            false,

        createdBy:
            "Current User",

        createdOn:
            now,

        modifiedBy:
            "Current User",

        modifiedOn:
            now,

    };


    localDrugStrengthList = [

        newRecord,

        ...localDrugStrengthList,

    ];


    return newRecord;
};


/* =========================================================
   UPDATE
   ========================================================= */

const update = async (
    id,
    values
) => {

    await delay();


    const numericId =
        Number(
            id
        );


    const existingIndex =
        localDrugStrengthList.findIndex(
            (
                item
            ) =>
                Number(
                    item.id
                ) ===
                numericId
        );


    if (
        existingIndex === -1
    ) {
        throw new Error(
            "Drug strength record not found."
        );
    }


    const existingRecord =
        localDrugStrengthList[
            existingIndex
        ];


    const payload =
        normalizeDrugStrengthForm(
            values
        );


    if (
        hasDuplicateCode(
            payload.strengthCode,
            numericId
        )
    ) {
        throw new Error(
            "Strength code already exists."
        );
    }


    if (
        hasDuplicateCombination(
            payload,
            numericId
        )
    ) {
        throw new Error(
            "This strength and unit combination already exists."
        );
    }


    const updatedRecord = {

        ...existingRecord,

        ...payload,

        id:
            existingRecord.id,

        mappedDrugCount:
            existingRecord.mappedDrugCount ??
            0,

        isSystemDefined:
            existingRecord.isSystemDefined ??
            false,

        createdBy:
            existingRecord.createdBy,

        createdOn:
            existingRecord.createdOn,

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toISOString(),

    };


    localDrugStrengthList[
        existingIndex
    ] =
        updatedRecord;


    return updatedRecord;
};


/* =========================================================
   ACTIVATE
   ========================================================= */

const activate = async (
    id
) => {

    await delay();


    const index =
        localDrugStrengthList.findIndex(
            (
                item
            ) =>
                Number(
                    item.id
                ) ===
                Number(
                    id
                )
        );


    if (
        index === -1
    ) {
        throw new Error(
            "Drug strength record not found."
        );
    }


    localDrugStrengthList[
        index
    ] = {

        ...localDrugStrengthList[
            index
        ],

        status:
            DRUG_STRENGTH_STATUS.ACTIVE,

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toISOString(),

    };


    return localDrugStrengthList[
        index
    ];
};


/* =========================================================
   DEACTIVATE
   ========================================================= */

const deactivate = async (
    id
) => {

    await delay();


    const index =
        localDrugStrengthList.findIndex(
            (
                item
            ) =>
                Number(
                    item.id
                ) ===
                Number(
                    id
                )
        );


    if (
        index === -1
    ) {
        throw new Error(
            "Drug strength record not found."
        );
    }


    localDrugStrengthList[
        index
    ] = {

        ...localDrugStrengthList[
            index
        ],

        status:
            DRUG_STRENGTH_STATUS.INACTIVE,

        modifiedBy:
            "Current User",

        modifiedOn:
            new Date().toISOString(),

    };


    return localDrugStrengthList[
        index
    ];
};


/* =========================================================
   DELETE
   ========================================================= */

const remove = async (
    id
) => {

    await delay();


    const numericId =
        Number(
            id
        );


    const record =
        localDrugStrengthList.find(
            (
                item
            ) =>
                Number(
                    item.id
                ) ===
                numericId
        );


    if (
        !record
    ) {
        throw new Error(
            "Drug strength record not found."
        );
    }


    if (
        record.isSystemDefined
    ) {
        throw new Error(
            "System-defined drug strength cannot be deleted."
        );
    }


    const mappedDrugCount =
        Number(
            record.mappedDrugCount
        ) || 0;


    if (
        mappedDrugCount > 0
    ) {
        throw new Error(
            "Drug strength cannot be deleted because it is mapped to drugs."
        );
    }


    localDrugStrengthList =
        localDrugStrengthList.filter(
            (
                item
            ) =>
                Number(
                    item.id
                ) !==
                numericId
        );


    return {
        success:
            true,

        id:
            numericId,
    };
};


/* =========================================================
   GET LOOKUP
   ========================================================= */

const getLookup = async () => {

    await delay();


    return localDrugStrengthList
        .filter(
            (
                item
            ) =>
                item.status ===
                DRUG_STRENGTH_STATUS.ACTIVE
        )
        .map(
            (
                item
            ) => ({

                value:
                    item.id,

                label:
                    item.strengthDisplay,

                code:
                    item.strengthCode,

                strengthValue:
                    item.strengthValue,

                strengthUnitId:
                    item.strengthUnitId,

                strengthUnitCode:
                    item.strengthUnitCode,

                strengthUnitName:
                    item.strengthUnitName,

                strengthType:
                    item.strengthType,

            })
        );
};


/* =========================================================
   GET SUMMARY
   ========================================================= */

const getSummary = async () => {

    await delay();


    const total =
        localDrugStrengthList.length;


    const active =
        localDrugStrengthList.filter(
            (
                item
            ) =>
                item.status ===
                DRUG_STRENGTH_STATUS.ACTIVE
        ).length;


    const inactive =
        localDrugStrengthList.filter(
            (
                item
            ) =>
                item.status ===
                DRUG_STRENGTH_STATUS.INACTIVE
        ).length;


    const mapped =
        localDrugStrengthList.reduce(
            (
                totalCount,
                item
            ) =>
                totalCount +
                (
                    Number(
                        item.mappedDrugCount
                    ) || 0
                ),
            0
        );


    const used =
        localDrugStrengthList.filter(
            (
                item
            ) =>
                (
                    Number(
                        item.mappedDrugCount
                    ) || 0
                ) > 0
        ).length;


    return {

        total,

        active,

        inactive,

        mappedDrugCount:
            mapped,

        used,

        unused:
            total -
            used,

    };
};


/* =========================================================
   SERVICE EXPORT
   ========================================================= */

const drugStrengthService = {

    getAll,

    getById,

    getLookup,

    getSummary,

    create,

    update,

    activate,

    deactivate,

    delete:
        remove,

};


export default drugStrengthService;