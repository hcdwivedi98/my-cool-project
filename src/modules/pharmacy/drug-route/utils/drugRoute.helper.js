// src/modules/pharmacy/drug-route/utils/drugRoute.helper.js

import {
    DEFAULT_DRUG_ROUTE_FORM_VALUES,
    DRUG_ROUTE_CODE_CONFIG,
    DRUG_ROUTE_DESCRIPTION_CONFIG,
    DRUG_ROUTE_NAME_CONFIG,
    DRUG_ROUTE_SORT_ORDER_CONFIG,
    DRUG_ROUTE_TYPES,
    DRUG_ROUTE_STATUS_OPTIONS,
} from "../constants/drugRoute.constants";


/*
 * =========================================================
 * NORMALIZE ROUTE CODE
 * =========================================================
 *
 * Example:
 *
 * " iv "  -> "IV"
 * "oral"  -> "ORAL"
 */

export const normalizeDrugRouteCode = (
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
        .toUpperCase();
};


/*
 * =========================================================
 * NORMALIZE ROUTE NAME
 * =========================================================
 *
 * Removes unnecessary spaces.
 *
 * "  Intravenous   " -> "Intravenous"
 */

export const normalizeDrugRouteName = (
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
        .replace(
            /\s+/g,
            " "
        );
};


/*
 * =========================================================
 * NORMALIZE DESCRIPTION
 * =========================================================
 */

export const normalizeDrugRouteDescription = (
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
        .replace(
            /\s+/g,
            " "
        );
};


/*
 * =========================================================
 * NORMALIZE STATUS
 * =========================================================
 */

export const normalizeDrugRouteStatus = (
    value
) => {

    if (
        value === "Inactive"
    ) {
        return "Inactive";
    }

    return "Active";
};


/*
 * =========================================================
 * NORMALIZE ROUTE TYPE
 * =========================================================
 */

export const normalizeDrugRouteType = (
    value
) => {

    const validType =
        DRUG_ROUTE_TYPES.find(
            (item) =>
                item.value ===
                value
        );

    return (
        validType?.value ||
        "SYSTEMIC"
    );
};


/*
 * =========================================================
 * NORMALIZE SORT ORDER
 * =========================================================
 */

export const normalizeDrugRouteSortOrder = (
    value
) => {

    const number =
        Number(value);


    if (
        Number.isNaN(
            number
        )
    ) {
        return 0;
    }


    return Math.max(
        DRUG_ROUTE_SORT_ORDER_CONFIG.min,
        Math.min(
            number,
            DRUG_ROUTE_SORT_ORDER_CONFIG.max
        )
    );
};


/*
 * =========================================================
 * PREPARE FORM VALUES
 * =========================================================
 *
 * Used when opening:
 *
 * Create
 * Edit
 * View
 */

export const prepareDrugRouteFormValues = (
    record = null
) => {

    if (!record) {

        return {
            ...DEFAULT_DRUG_ROUTE_FORM_VALUES,
        };
    }


    return {

        routeCode:
            normalizeDrugRouteCode(
                record.routeCode
            ),

        routeName:
            normalizeDrugRouteName(
                record.routeName
            ),

        routeType:
            normalizeDrugRouteType(
                record.routeType
            ),

        description:
            normalizeDrugRouteDescription(
                record.description
            ),

        status:
            normalizeDrugRouteStatus(
                record.status
            ),

        sortOrder:
            normalizeDrugRouteSortOrder(
                record.sortOrder
            ),
    };
};


/*
 * =========================================================
 * PREPARE API PAYLOAD
 * =========================================================
 *
 * System fields are intentionally excluded:
 *
 * id
 * drugCount
 * createdBy
 * createdOn
 * modifiedBy
 * modifiedOn
 */

export const prepareDrugRoutePayload = (
    values = {}
) => {

    return {

        routeCode:
            normalizeDrugRouteCode(
                values.routeCode
            ),

        routeName:
            normalizeDrugRouteName(
                values.routeName
            ),

        routeType:
            normalizeDrugRouteType(
                values.routeType
            ),

        description:
            normalizeDrugRouteDescription(
                values.description
            ),

        status:
            normalizeDrugRouteStatus(
                values.status
            ),

        sortOrder:
            normalizeDrugRouteSortOrder(
                values.sortOrder
            ),
    };
};


/*
 * =========================================================
 * GET ROUTE TYPE LABEL
 * =========================================================
 */

export const getDrugRouteTypeLabel = (
    value
) => {

    const option =
        DRUG_ROUTE_TYPES.find(
            (item) =>
                item.value ===
                value
        );


    return (
        option?.label ||
        value ||
        "-"
    );
};


/*
 * =========================================================
 * GET STATUS LABEL
 * =========================================================
 */

export const getDrugRouteStatusLabel = (
    value
) => {

    const option =
        DRUG_ROUTE_STATUS_OPTIONS.find(
            (item) =>
                item.value ===
                value
        );


    return (
        option?.label ||
        value ||
        "-"
    );
};


/*
 * =========================================================
 * GET STATUS COLOR
 * =========================================================
 */

export const getDrugRouteStatusColor = (
    status
) => {

    return status ===
        "Active"
        ? "success"
        : "default";
};


/*
 * =========================================================
 * GET USAGE STATUS
 * =========================================================
 */

export const getDrugRouteUsageStatus = (
    drugCount
) => {

    const count =
        Number(
            drugCount
        ) || 0;


    return count > 0
        ? "USED"
        : "UNUSED";
};


/*
 * =========================================================
 * GET USAGE LABEL
 * =========================================================
 */

export const getDrugRouteUsageLabel = (
    drugCount
) => {

    const count =
        Number(
            drugCount
        ) || 0;


    if (
        count === 0
    ) {
        return "Unused";
    }


    return `Used (${count})`;
};


/*
 * =========================================================
 * CHECK WHETHER ROUTE IS USED
 * =========================================================
 */

export const isDrugRouteUsed = (
    record
) => {

    return (
        Number(
            record?.drugCount
        ) > 0
    );
};


/*
 * =========================================================
 * CHECK WHETHER ROUTE IS ACTIVE
 * =========================================================
 */

export const isDrugRouteActive = (
    record
) => {

    return (
        record?.status ===
        "Active"
    );
};


/*
 * =========================================================
 * CHECK WHETHER ROUTE IS INACTIVE
 * =========================================================
 */

export const isDrugRouteInactive = (
    record
) => {

    return (
        record?.status ===
        "Inactive"
    );
};


/*
 * =========================================================
 * VALIDATE ROUTE CODE
 * =========================================================
 */

export const validateDrugRouteCode = (
    value
) => {

    const code =
        normalizeDrugRouteCode(
            value
        );


    if (!code) {
        return "Route code is required.";
    }


    if (
        code.length <
        DRUG_ROUTE_CODE_CONFIG.minLength
    ) {

        return `Route code must contain at least ${DRUG_ROUTE_CODE_CONFIG.minLength} characters.`;
    }


    if (
        code.length >
        DRUG_ROUTE_CODE_CONFIG.maxLength
    ) {

        return `Route code cannot exceed ${DRUG_ROUTE_CODE_CONFIG.maxLength} characters.`;
    }


    if (
        !/^[A-Z0-9_-]+$/.test(
            code
        )
    ) {

        return "Route code can contain only uppercase letters, numbers, hyphen and underscore.";
    }


    return null;
};


/*
 * =========================================================
 * VALIDATE ROUTE NAME
 * =========================================================
 */

export const validateDrugRouteName = (
    value
) => {

    const name =
        normalizeDrugRouteName(
            value
        );


    if (!name) {
        return "Route name is required.";
    }


    if (
        name.length <
        DRUG_ROUTE_NAME_CONFIG.minLength
    ) {

        return `Route name must contain at least ${DRUG_ROUTE_NAME_CONFIG.minLength} characters.`;
    }


    if (
        name.length >
        DRUG_ROUTE_NAME_CONFIG.maxLength
    ) {

        return `Route name cannot exceed ${DRUG_ROUTE_NAME_CONFIG.maxLength} characters.`;
    }


    return null;
};


/*
 * =========================================================
 * VALIDATE DESCRIPTION
 * =========================================================
 */

export const validateDrugRouteDescription = (
    value
) => {

    const description =
        normalizeDrugRouteDescription(
            value
        );


    if (
        description.length >
        DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength
    ) {

        return `Description cannot exceed ${DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength} characters.`;
    }


    return null;
};


/*
 * =========================================================
 * VALIDATE ROUTE TYPE
 * =========================================================
 */

export const validateDrugRouteType = (
    value
) => {

    const exists =
        DRUG_ROUTE_TYPES.some(
            (item) =>
                item.value ===
                value
        );


    if (!exists) {

        return "Please select a valid route type.";
    }


    return null;
};


/*
 * =========================================================
 * VALIDATE STATUS
 * =========================================================
 */

export const validateDrugRouteStatus = (
    value
) => {

    const exists =
        DRUG_ROUTE_STATUS_OPTIONS.some(
            (item) =>
                item.value ===
                value
        );


    if (!exists) {

        return "Please select a valid status.";
    }


    return null;
};


/*
 * =========================================================
 * VALIDATE SORT ORDER
 * =========================================================
 */

export const validateDrugRouteSortOrder = (
    value
) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }


    const number =
        Number(value);


    if (
        Number.isNaN(
            number
        )
    ) {

        return "Sort order must be a number.";
    }


    if (
        number <
        DRUG_ROUTE_SORT_ORDER_CONFIG.min
    ) {

        return `Sort order cannot be less than ${DRUG_ROUTE_SORT_ORDER_CONFIG.min}.`;
    }


    if (
        number >
        DRUG_ROUTE_SORT_ORDER_CONFIG.max
    ) {

        return `Sort order cannot exceed ${DRUG_ROUTE_SORT_ORDER_CONFIG.max}.`;
    }


    if (
        !Number.isInteger(
            number
        )
    ) {

        return "Sort order must be a whole number.";
    }


    return null;
};


/*
 * =========================================================
 * BUSINESS VALIDATION
 * =========================================================
 *
 * Returns:
 *
 * {
 *   routeCode: "...",
 *   routeName: "...",
 * }
 *
 * Empty object = valid.
 */

export const validateDrugRoute = (
    values = {},
    routeList = [],
    excludeId = null
) => {

    const errors = {};


    /*
     * -----------------------------------------------
     * FIELD VALIDATION
     * -----------------------------------------------
     */

    const codeError =
        validateDrugRouteCode(
            values.routeCode
        );


    if (codeError) {
        errors.routeCode =
            codeError;
    }


    const nameError =
        validateDrugRouteName(
            values.routeName
        );


    if (nameError) {
        errors.routeName =
            nameError;
    }


    const typeError =
        validateDrugRouteType(
            values.routeType
        );


    if (typeError) {
        errors.routeType =
            typeError;
    }


    const descriptionError =
        validateDrugRouteDescription(
            values.description
        );


    if (descriptionError) {
        errors.description =
            descriptionError;
    }


    const statusError =
        validateDrugRouteStatus(
            values.status
        );


    if (statusError) {
        errors.status =
            statusError;
    }


    const sortOrderError =
        validateDrugRouteSortOrder(
            values.sortOrder
        );


    if (sortOrderError) {
        errors.sortOrder =
            sortOrderError;
    }


    /*
     * -----------------------------------------------
     * DUPLICATE CODE
     * -----------------------------------------------
     */

    const normalizedCode =
        normalizeDrugRouteCode(
            values.routeCode
        );


    const duplicateCode =
        routeList.some(
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
                    normalizeDrugRouteCode(
                        item.routeCode
                    ) ===
                    normalizedCode
                );
            }
        );


    if (
        normalizedCode &&
        duplicateCode
    ) {

        errors.routeCode =
            "Route code already exists.";
    }


    /*
     * -----------------------------------------------
     * DUPLICATE NAME
     * -----------------------------------------------
     */

    const normalizedName =
        normalizeDrugRouteName(
            values.routeName
        ).toLowerCase();


    const duplicateName =
        routeList.some(
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
                    normalizeDrugRouteName(
                        item.routeName
                    ).toLowerCase() ===
                    normalizedName
                );
            }
        );


    if (
        normalizedName &&
        duplicateName
    ) {

        errors.routeName =
            "Route name already exists.";
    }


    return errors;
};


/*
 * =========================================================
 * PREPARE LOOKUP OPTIONS
 * =========================================================
 */

export const toDrugRouteLookupOptions = (
    routes = [],
    {
        activeOnly = true,
        includeInactive = false,
    } = {}
) => {

    let source =
        Array.isArray(
            routes
        )
            ? routes
            : [];


    if (
        activeOnly &&
        !includeInactive
    ) {

        source =
            source.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Active"
            );
    }


    return source
        .sort(
            (
                first,
                second
            ) => {

                const firstOrder =
                    Number(
                        first.sortOrder
                    ) || 0;


                const secondOrder =
                    Number(
                        second.sortOrder
                    ) || 0;


                return (
                    firstOrder -
                    secondOrder
                );
            }
        )
        .map(
            (
                item
            ) => ({

                value:
                    item.id,

                label:
                    item.routeName,

                code:
                    item.routeCode,

                routeType:
                    item.routeType,

                status:
                    item.status,

                drugCount:
                    Number(
                        item.drugCount
                    ) || 0,
            })
        );
};


/*
 * =========================================================
 * FIND ROUTE BY ID
 * =========================================================
 */

export const findDrugRouteById = (
    routeList = [],
    id
) => {

    return (
        routeList.find(
            (item) =>
                String(
                    item.id
                ) ===
                String(
                    id
                )
        ) ||
        null
    );
};


/*
 * =========================================================
 * FIND ROUTE BY CODE
 * =========================================================
 */

export const findDrugRouteByCode = (
    routeList = [],
    code
) => {

    const normalizedCode =
        normalizeDrugRouteCode(
            code
        );


    return (
        routeList.find(
            (item) =>
                normalizeDrugRouteCode(
                    item.routeCode
                ) ===
                normalizedCode
        ) ||
        null
    );
};


/*
 * =========================================================
 * DISPLAY NAME
 * =========================================================
 *
 * Example:
 *
 * IV - Intravenous
 */

export const getDrugRouteDisplayName = (
    record
) => {

    if (!record) {
        return "-";
    }


    if (
        record.routeCode &&
        record.routeName
    ) {

        return `${record.routeCode} - ${record.routeName}`;
    }


    return (
        record.routeName ||
        record.routeCode ||
        "-"
    );
};


/*
 * =========================================================
 * DEPENDENCY MESSAGE
 * =========================================================
 */

export const getDrugRouteDependencyMessage = (
    record
) => {

    const drugCount =
        Number(
            record?.drugCount
        ) || 0;


    if (
        drugCount === 0
    ) {

        return "This route is not currently mapped to any drug.";
    }


    return `This route is currently mapped to ${drugCount} drug${drugCount === 1 ? "" : "s"}. Existing mappings will be preserved.`;
};


/*
 * =========================================================
 * CAN DEACTIVATE
 * =========================================================
 *
 * Deactivation is allowed even when mapped.
 * Existing mappings are preserved.
 */

export const canDeactivateDrugRoute = (
    record
) => {

    if (!record) {
        return false;
    }


    return (
        record.status ===
        "Active"
    );
};


/*
 * =========================================================
 * CAN ACTIVATE
 * =========================================================
 */

export const canActivateDrugRoute = (
    record
) => {

    if (!record) {
        return false;
    }


    return (
        record.status ===
        "Inactive"
    );
};


/*
 * =========================================================
 * FORM FIELD CONFIG
 * =========================================================
 *
 * Useful for dynamic UI / validation metadata.
 */

export const DRUG_ROUTE_FORM_FIELD_CONFIG = {

    routeCode: {
        required: true,

        maxLength:
            DRUG_ROUTE_CODE_CONFIG.maxLength,
    },

    routeName: {
        required: true,

        maxLength:
            DRUG_ROUTE_NAME_CONFIG.maxLength,
    },

    routeType: {
        required: true,
    },

    description: {
        required: false,

        maxLength:
            DRUG_ROUTE_DESCRIPTION_CONFIG.maxLength,
    },

    status: {
        required: true,
    },

    sortOrder: {
        required: false,
    },
};