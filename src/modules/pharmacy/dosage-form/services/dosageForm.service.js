// src/modules/pharmacy/dosage-form/services/dosageForm.service.js

import {
    dosageFormList,
} from "../mock/dosageForm.mock";

import {
    buildDosageFormQueryParams,
} from "../utils/dosageForm.query";

import {
    normalizeDosageFormCode,
    normalizeDosageFormName,
    prepareDosageFormPayload,
} from "../utils/dosageForm.helper";


/*
 * =========================================================
 * LOCAL MOCK DATABASE
 * =========================================================
 *
 * Keep service state separate from the exported mock array.
 * This allows create/update/delete-status operations during
 * the current application session.
 */

let dosageForms = [
    ...dosageFormList,
];


/*
 * =========================================================
 * ID GENERATOR
 * =========================================================
 */

const generateId = () => {

    if (!dosageForms.length) {
        return 1;
    }

    return (
        Math.max(
            ...dosageForms.map(
                (item) =>
                    Number(item.id) || 0
            )
        ) + 1
    );
};


/*
 * =========================================================
 * CURRENT USER
 * =========================================================
 */

const getCurrentUser = () => {

    return (
        localStorage.getItem(
            "userName"
        ) ||
        "Current User"
    );
};


/*
 * =========================================================
 * CURRENT DATE
 * =========================================================
 */

const getCurrentDateTime = () => {

    return new Date()
        .toISOString()
        .slice(
            0,
            19
        )
        .replace(
            "T",
            " "
        );
};


/*
 * =========================================================
 * SIMULATED API DELAY
 * =========================================================
 */

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


/*
 * =========================================================
 * GET ALL
 * =========================================================
 */

const getAll = async () => {

    await delay();


    return [
        ...dosageForms,
    ];
};


/*
 * =========================================================
 * GET BY ID
 * =========================================================
 */

const getById = async (
    id
) => {

    await delay();


    const record =
        dosageForms.find(
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
            "Dosage form not found."
        );
    }


    return {
        ...record,
    };
};


/*
 * =========================================================
 * DUPLICATE CODE CHECK
 * =========================================================
 */

const isDuplicateCode = (
    formCode,
    excludeId = null
) => {

    const normalizedCode =
        normalizeDosageFormCode(
            formCode
        );


    return dosageForms.some(
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
                normalizeDosageFormCode(
                    item.formCode
                ) ===
                normalizedCode
            );
        }
    );
};


/*
 * =========================================================
 * DUPLICATE NAME CHECK
 * =========================================================
 */

const isDuplicateName = (
    formName,
    excludeId = null
) => {

    const normalizedName =
        normalizeDosageFormName(
            formName
        ).toLowerCase();


    return dosageForms.some(
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
                normalizeDosageFormName(
                    item.formName
                ).toLowerCase() ===
                normalizedName
            );
        }
    );
};


/*
 * =========================================================
 * CREATE
 * =========================================================
 */

const create = async (
    values
) => {

    await delay();


    const payload =
        prepareDosageFormPayload(
            values
        );


    /*
     * -----------------------------------------------
     * DUPLICATE CODE
     * -----------------------------------------------
     */

    if (
        isDuplicateCode(
            payload.formCode
        )
    ) {

        throw new Error(
            "Form code already exists."
        );
    }


    /*
     * -----------------------------------------------
     * DUPLICATE NAME
     * -----------------------------------------------
     */

    if (
        isDuplicateName(
            payload.formName
        )
    ) {

        throw new Error(
            "Form name already exists."
        );
    }


    const now =
        getCurrentDateTime();


    const user =
        getCurrentUser();


    const newRecord = {

        id:
            generateId(),

        ...payload,

        drugCount:
            0,

        createdBy:
            user,

        createdOn:
            now,

        modifiedBy:
            user,

        modifiedOn:
            now,
    };


    dosageForms = [
        newRecord,
        ...dosageForms,
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

    await delay();


    const index =
        dosageForms.findIndex(
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
            "Dosage form not found."
        );
    }


    const existing =
        dosageForms[index];


    const payload =
        prepareDosageFormPayload(
            values
        );


    /*
     * -----------------------------------------------
     * DUPLICATE CODE
     * -----------------------------------------------
     */

    if (
        isDuplicateCode(
            payload.formCode,
            id
        )
    ) {

        throw new Error(
            "Form code already exists."
        );
    }


    /*
     * -----------------------------------------------
     * DUPLICATE NAME
     * -----------------------------------------------
     */

    if (
        isDuplicateName(
            payload.formName,
            id
        )
    ) {

        throw new Error(
            "Form name already exists."
        );
    }


    const now =
        getCurrentDateTime();


    const user =
        getCurrentUser();


    const updatedRecord = {

        ...existing,

        ...payload,

        /*
         * Preserve usage count.
         */

        drugCount:
            existing.drugCount || 0,

        /*
         * Preserve creation audit.
         */

        createdBy:
            existing.createdBy,

        createdOn:
            existing.createdOn,

        /*
         * Update modification audit.
         */

        modifiedBy:
            user,

        modifiedOn:
            now,
    };


    dosageForms[index] =
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

    await delay();


    const index =
        dosageForms.findIndex(
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
            "Dosage form not found."
        );
    }


    const now =
        getCurrentDateTime();


    const user =
        getCurrentUser();


    dosageForms[index] = {

        ...dosageForms[index],

        status:
            "Active",

        modifiedBy:
            user,

        modifiedOn:
            now,
    };


    return {
        ...dosageForms[index],
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

    await delay();


    const index =
        dosageForms.findIndex(
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
            "Dosage form not found."
        );
    }


    const existing =
        dosageForms[index];


    const drugCount =
        Number(
            existing.drugCount
        ) || 0;


    const now =
        getCurrentDateTime();


    const user =
        getCurrentUser();


    dosageForms[index] = {

        ...existing,

        status:
            "Inactive",

        modifiedBy:
            user,

        modifiedOn:
            now,
    };


    return {
        ...dosageForms[index],

        /*
         * Helpful information for UI.
         */

        deactivationWarning:
            drugCount > 0
                ? `This dosage form is currently mapped to ${drugCount} drug${drugCount === 1 ? "" : "s"}. Existing mappings have been preserved.`
                : null,
    };
};


/*
 * =========================================================
 * SEARCH / FILTER / SORT / PAGINATION
 * =========================================================
 */

const getList = async (
    query = {}
) => {

    await delay();


    const params =
        buildDosageFormQueryParams(
            query
        );


    let filtered =
        [
            ...dosageForms,
        ];


    /*
     * =====================================================
     * SEARCH
     * =====================================================
     */

    if (
        params.search
    ) {

        const search =
            String(
                params.search
            )
                .trim()
                .toLowerCase();


        filtered =
            filtered.filter(
                (item) => {

                    const code =
                        String(
                            item.formCode ||
                            ""
                        ).toLowerCase();


                    const name =
                        String(
                            item.formName ||
                            ""
                        ).toLowerCase();


                    const description =
                        String(
                            item.description ||
                            ""
                        ).toLowerCase();


                    const route =
                        String(
                            item.routeOfAdministrationName ||
                            item.routeOfAdministrationId ||
                            ""
                        ).toLowerCase();


                    return (
                        code.includes(
                            search
                        ) ||
                        name.includes(
                            search
                        ) ||
                        description.includes(
                            search
                        ) ||
                        route.includes(
                            search
                        )
                    );
                }
            );
    }


    /*
     * =====================================================
     * FORM TYPE
     * =====================================================
     */

    if (
        params.formType
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    item.formType ===
                    params.formType
            );
    }


    /*
     * =====================================================
     * ROUTE
     * =====================================================
     */

    if (
        params.routeOfAdministrationId
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    item.routeOfAdministrationId ===
                    params.routeOfAdministrationId
            );
    }


    /*
     * =====================================================
     * UOM
     * =====================================================
     */

    if (
        params.uomId
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    item.uomId ===
                    params.uomId
            );
    }


    /*
     * =====================================================
     * STATUS
     * =====================================================
     */

    if (
        params.status
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    item.status ===
                    params.status
            );
    }


    /*
     * =====================================================
     * USAGE
     * ===================================================== */

    if (
        params.usage ===
        "USED"
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    Number(
                        item.drugCount
                    ) > 0
            );
    }


    if (
        params.usage ===
        "UNUSED"
    ) {

        filtered =
            filtered.filter(
                (item) =>
                    Number(
                        item.drugCount
                    ) === 0
            );
    }


    /*
     * =====================================================
     * SORT
     * =====================================================
     */

    const sortBy =
        params.sortBy ||
        "sortOrder";


    const sortDirection =
        params.sortOrder ===
        "desc"
            ? -1
            : 1;


    filtered.sort(
        (
            first,
            second
        ) => {

            let firstValue =
                first?.[
                    sortBy
                ];


            let secondValue =
                second?.[
                    sortBy
                ];


            if (
                firstValue ===
                undefined ||
                firstValue ===
                null
            ) {
                firstValue =
                    "";
            }


            if (
                secondValue ===
                undefined ||
                secondValue ===
                null
            ) {
                secondValue =
                    "";
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
                ) *
                sortDirection;
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
                ) *
                sortDirection;
        }
    );


    /*
     * =====================================================
     * TOTAL
     * =====================================================
     */

    const total =
        filtered.length;


    /*
     * =====================================================
     * PAGINATION
     * =====================================================
     */

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
            page -
            1
        ) *
        pageSize;


    const items =
        filtered.slice(
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
 * =========================================================
 * ACTIVE OPTIONS
 * =========================================================
 */

const getActive = async () => {

    await delay();


    return dosageForms
        .filter(
            (item) =>
                item.status ===
                "Active"
        )
        .map(
            (item) => ({
                ...item,
            })
        );
};


/*
 * =========================================================
 * RESET MOCK DATA
 * =========================================================
 *
 * Useful during development/testing.
 * Do not expose this method in production.
 */

const resetMockData = () => {

    dosageForms = [
        ...dosageFormList,
    ];
};


/*
 * =========================================================
 * SERVICE EXPORT
 * =========================================================
 */

const dosageFormService = {

    getAll,

    getList,

    getById,

    getActive,

    create,

    update,

    activate,

    deactivate,

    resetMockData,
};


export default dosageFormService;