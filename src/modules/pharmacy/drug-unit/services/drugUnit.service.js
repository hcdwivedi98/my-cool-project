/* =========================================================
   DRUG UNIT SERVICE
   ========================================================= */

import {
    drugUnitList,
} from "../mock/drugUnit.mock";

import {
    DRUG_UNIT_STATUS,
    DRUG_UNIT_USAGE,
} from "../constants/drugUnit.constants";

import {
    buildDrugUnitQueryParams,
} from "../utils/drugUnit.query";

import {
    hasDuplicateDrugUnitCode,
    hasDuplicateDrugUnitNameAndType,
    hasDuplicateDrugUnitSymbol,
    normalizeDrugUnitFormValues,
    normalizeDrugUnitCode,
    prepareDrugUnitPayload,
} from "../utils/drugUnit.helper";


/* =========================================================
   LOCAL DATA STORE
   ========================================================= */

let drugUnits = [
    ...drugUnitList,
];


/* =========================================================
   DELAY
   ========================================================= */

const delay = (
    milliseconds = 300
) =>
    new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );


/* =========================================================
   CREATE ID
   ========================================================= */

const createDrugUnitId = () => {

    const maxId =
        drugUnits.reduce(
            (
                maximum,
                item
            ) => {

                const numericPart =
                    Number(
                        String(
                            item.id || ""
                        ).replace(
                            /\D/g,
                            ""
                        )
                    ) || 0;

                return Math.max(
                    maximum,
                    numericPart
                );
            },
            0
        );


    return `DU-${String(
        maxId + 1
    ).padStart(
        3,
        "0"
    )}`;
};


/* =========================================================
   CURRENT USER
   ========================================================= */

const getCurrentUser = () => {
    return "admin";
};


/* =========================================================
   GET ALL
   ========================================================= */

const getAll = async (
    query = {}
) => {

    await delay();


    const params =
        buildDrugUnitQueryParams(
            query
        );


    let result = [
        ...drugUnits,
    ];


    /* =====================================================
       SEARCH
       ===================================================== */

    if (
        params.search
    ) {

        const searchValue =
            params.search
                .trim()
                .toLowerCase();


        result =
            result.filter(
                (
                    item
                ) => {

                    return (

                        item.unitCode
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        item.unitName
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        item.symbol
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        item.description
                            ?.toLowerCase()
                            .includes(
                                searchValue
                            )

                    );
                }
            );
    }


    /* =====================================================
       UNIT TYPE
       ===================================================== */

    if (
        params.unitType
    ) {

        result =
            result.filter(
                (
                    item
                ) =>
                    item.unitType ===
                    params.unitType
            );
    }


    /* =====================================================
       STATUS
       ===================================================== */

    if (
        params.status
    ) {

        result =
            result.filter(
                (
                    item
                ) => {

                    if (
                        params.status ===
                        DRUG_UNIT_STATUS.ACTIVE
                    ) {

                        return (
                            item.isActive ===
                            true
                        );
                    }


                    if (
                        params.status ===
                        DRUG_UNIT_STATUS.INACTIVE
                    ) {

                        return (
                            item.isActive ===
                            false
                        );
                    }


                    return true;
                }
            );
    }


    /* =====================================================
       USAGE
       ===================================================== */

    if (
        params.usage &&
        params.usage !==
            DRUG_UNIT_USAGE.ALL
    ) {

        result =
            result.filter(
                (
                    item
                ) => {

                    const usageCount =
                        Number(
                            item.usageCount
                        ) || 0;


                    if (
                        params.usage ===
                        DRUG_UNIT_USAGE.USED
                    ) {

                        return (
                            usageCount > 0
                        );
                    }


                    if (
                        params.usage ===
                        DRUG_UNIT_USAGE.UNUSED
                    ) {

                        return (
                            usageCount === 0
                        );
                    }


                    return true;
                }
            );
    }


    /* =====================================================
       SORT
       ===================================================== */

    if (
        params.sortField
    ) {

        const {
            sortField,
            sortOrder,
        } = params;


        result.sort(
            (
                first,
                second
            ) => {

                const firstValue =
                    first?.[
                        sortField
                    ];


                const secondValue =
                    second?.[
                        sortField
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


                let comparison;


                if (
                    typeof firstValue ===
                        "number" &&
                    typeof secondValue ===
                        "number"
                ) {

                    comparison =
                        firstValue -
                        secondValue;

                }
                else {

                    comparison =
                        String(
                            firstValue
                        )
                            .localeCompare(
                                String(
                                    secondValue
                                ),
                                undefined,
                                {
                                    numeric: true,
                                    sensitivity: "base",
                                }
                            );
                }


                return (
                    sortOrder ===
                    "descend"
                )
                    ? -comparison
                    : comparison;
            }
        );
    }


    /* =====================================================
       TOTAL
       ===================================================== */

    const total =
        result.length;


    /* =====================================================
       PAGINATION
       ===================================================== */

    const page =
        Number(
            params.page
        ) || 1;


    const pageSize =
        Number(
            params.pageSize
        ) || 10;


    const start =
        (
            page - 1
        ) *
        pageSize;


    const end =
        start +
        pageSize;


    const items =
        result.slice(
            start,
            end
        );


    /* =====================================================
       RESPONSE
       ===================================================== */

    return {

        items,

        total,

        page,

        pageSize,

    };
};


/* =========================================================
   GET BY ID
   ========================================================= */

const getById = async (
    id
) => {

    await delay();


    const record =
        drugUnits.find(
            (
                item
            ) =>
                item.id ===
                id
        );


    if (
        !record
    ) {

        throw new Error(
            "Drug unit not found."
        );
    }


    return {
        ...record,
    };
};


/* =========================================================
   VALIDATE UNIQUE FIELDS
   ========================================================= */

const validateUniqueFields = (
    payload,
    excludeId = null
) => {

    if (
        hasDuplicateDrugUnitCode(
            drugUnits,
            payload.unitCode,
            excludeId
        )
    ) {

        throw new Error(
            "Unit code already exists."
        );
    }


    if (
        hasDuplicateDrugUnitSymbol(
            drugUnits,
            payload.symbol,
            excludeId
        )
    ) {

        throw new Error(
            "Symbol already exists."
        );
    }


    if (
        hasDuplicateDrugUnitNameAndType(
            drugUnits,
            payload.unitName,
            payload.unitType,
            excludeId
        )
    ) {

        throw new Error(
            "Unit name already exists for this unit type."
        );
    }
};


/* =========================================================
   CREATE
   ========================================================= */

const create = async (
    values
) => {

    await delay();


    const payload =
        prepareDrugUnitPayload(
            normalizeDrugUnitFormValues(
                values
            )
        );


    validateUniqueFields(
        payload
    );


    const now =
        new Date().toISOString();


    const currentUser =
        getCurrentUser();


    const newRecord = {

        id:
            createDrugUnitId(),

        ...payload,

        isActive:
            payload.isActive !== false,

        status:
            payload.isActive !== false
                ? DRUG_UNIT_STATUS.ACTIVE
                : DRUG_UNIT_STATUS.INACTIVE,

        isSystemDefined:
            false,

        usageCount:
            0,

        drugCount:
            0,

        createdAt:
            now,

        createdBy:
            currentUser,

        updatedAt:
            now,

        updatedBy:
            currentUser,

        version:
            1,

    };


    drugUnits = [
        newRecord,
        ...drugUnits,
    ];


    return {
        ...newRecord,
    };
};


/* =========================================================
   UPDATE
   ========================================================= */

const update = async (
    id,
    values
) => {

    await delay();


    const index =
        drugUnits.findIndex(
            (
                item
            ) =>
                item.id ===
                id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug unit not found."
        );
    }


    const existing =
        drugUnits[
            index
        ];


    const normalized =
        normalizeDrugUnitFormValues(
            values
        );


    const payload =
        prepareDrugUnitPayload(
            normalized
        );


    validateUniqueFields(
        payload,
        id
    );


    const now =
        new Date().toISOString();


    const currentUser =
        getCurrentUser();


    const updatedRecord = {

        ...existing,

        ...payload,

        isActive:
            payload.isActive !== false,

        status:
            payload.isActive !== false
                ? DRUG_UNIT_STATUS.ACTIVE
                : DRUG_UNIT_STATUS.INACTIVE,

        updatedAt:
            now,

        updatedBy:
            currentUser,

        version:
            (
                Number(
                    existing.version
                ) || 0
            ) + 1,

    };


    drugUnits[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/* =========================================================
   ACTIVATE
   ========================================================= */

const activate = async (
    id
) => {

    await delay();


    const index =
        drugUnits.findIndex(
            (
                item
            ) =>
                item.id ===
                id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug unit not found."
        );
    }


    const existing =
        drugUnits[
            index
        ];


    const now =
        new Date().toISOString();


    const updatedRecord = {

        ...existing,

        isActive:
            true,

        status:
            DRUG_UNIT_STATUS.ACTIVE,

        updatedAt:
            now,

        updatedBy:
            getCurrentUser(),

        version:
            (
                Number(
                    existing.version
                ) || 0
            ) + 1,

    };


    drugUnits[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/* =========================================================
   DEACTIVATE
   ========================================================= */

const deactivate = async (
    id
) => {

    await delay();


    const index =
        drugUnits.findIndex(
            (
                item
            ) =>
                item.id ===
                id
        );


    if (
        index === -1
    ) {

        throw new Error(
            "Drug unit not found."
        );
    }


    const existing =
        drugUnits[
            index
        ];


    if (
        existing.isSystemDefined
    ) {

        throw new Error(
            "System-defined drug units cannot be deactivated."
        );
    }


    const now =
        new Date().toISOString();


    const updatedRecord = {

        ...existing,

        isActive:
            false,

        status:
            DRUG_UNIT_STATUS.INACTIVE,

        updatedAt:
            now,

        updatedBy:
            getCurrentUser(),

        version:
            (
                Number(
                    existing.version
                ) || 0
            ) + 1,

    };


    drugUnits[
        index
    ] =
        updatedRecord;


    return {
        ...updatedRecord,
    };
};


/* =========================================================
   GET STATISTICS
   ========================================================= */

const getStats = async () => {

    await delay();


    const total =
        drugUnits.length;


    const active =
        drugUnits.filter(
            (
                item
            ) =>
                item.isActive === true
        ).length;


    const inactive =
        drugUnits.filter(
            (
                item
            ) =>
                item.isActive === false
        ).length;


    const mappedDrugs =
        drugUnits.reduce(
            (
                totalCount,
                item
            ) =>
                totalCount +
                (
                    Number(
                        item.drugCount ??
                        item.usageCount
                    ) || 0
                ),
            0
        );


    return {

        total,

        active,

        inactive,

        mappedDrugs,

    };
};


/* =========================================================
   RESET MOCK STORE
   ========================================================= */

const resetMockData = () => {

    drugUnits = [
        ...drugUnitList,
    ];

};


/* =========================================================
   SERVICE OBJECT
   ========================================================= */

const drugUnitService = {

    getAll,

    getById,

    getStats,

    create,

    update,

    activate,

    deactivate,

    resetMockData,

};


export default drugUnitService;