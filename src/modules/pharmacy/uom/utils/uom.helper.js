// src/modules/pharmacy/uom/utils/uom.helper.js

import {
    UOM_CODE_REGEX,
    UOM_VALIDATION,
    CONVERTIBLE_UOM_TYPES,
    PACKAGING_UOM_TYPES,
} from "../constants/uom.constants";


/*
 * ============================================
 * NORMALIZE VALUE
 * ============================================
 */

export const normalizeUomValue = (
    value
) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .trim();
};


/*
 * ============================================
 * NORMALIZE UOM CODE
 * ============================================
 */

export const normalizeUomCode = (
    value
) => {
    return normalizeUomValue(
        value
    ).toUpperCase();
};


/*
 * ============================================
 * NORMALIZE UOM NAME
 * ============================================
 */

export const normalizeUomName = (
    value
) => {
    return normalizeUomValue(
        value
    )
        .replace(
            /\s+/g,
            " "
        )
        .toLowerCase();
};


/*
 * ============================================
 * FORMAT UOM LABEL
 * ============================================
 */

export const formatUomLabel = (
    uom
) => {
    if (!uom) {
        return "";
    }

    if (
        uom.shortName
    ) {
        return `${uom.uomName} (${uom.shortName})`;
    }

    return uom.uomName || "";
};


/*
 * ============================================
 * GET UOM DISPLAY LABEL
 * ============================================
 */

export const getUomDisplayLabel = (
    uom
) => {
    if (!uom) {
        return "";
    }

    const name =
        uom.uomName ||
        "";

    const code =
        uom.uomCode ||
        "";

    if (
        name &&
        code
    ) {
        return `${name} (${code})`;
    }

    return name || code;
};


/*
 * ============================================
 * VALIDATE UOM CODE
 * ============================================
 */

export const validateUomCode = (
    value
) => {
    const code =
        normalizeUomCode(
            value
        );

    if (!code) {
        return "UOM code is required.";
    }

    if (
        code.length >
        UOM_VALIDATION.CODE_MAX_LENGTH
    ) {
        return `UOM code cannot exceed ${UOM_VALIDATION.CODE_MAX_LENGTH} characters.`;
    }

    if (
        !UOM_CODE_REGEX.test(
            code
        )
    ) {
        return "UOM code can contain only uppercase letters, numbers, hyphens and underscores.";
    }

    return null;
};


/*
 * ============================================
 * VALIDATE UOM NAME
 * ============================================
 */

export const validateUomName = (
    value
) => {
    const name =
        normalizeUomValue(
            value
        );

    if (!name) {
        return "UOM name is required.";
    }

    if (
        name.length >
        UOM_VALIDATION.NAME_MAX_LENGTH
    ) {
        return `UOM name cannot exceed ${UOM_VALIDATION.NAME_MAX_LENGTH} characters.`;
    }

    return null;
};


/*
 * ============================================
 * VALIDATE SHORT NAME
 * ============================================
 */

export const validateShortName = (
    value
) => {
    const shortName =
        normalizeUomValue(
            value
        );

    if (
        !shortName
    ) {
        return null;
    }

    if (
        shortName.length >
        UOM_VALIDATION.SHORT_NAME_MAX_LENGTH
    ) {
        return `Short name cannot exceed ${UOM_VALIDATION.SHORT_NAME_MAX_LENGTH} characters.`;
    }

    return null;
};


/*
 * ============================================
 * VALIDATE DESCRIPTION
 * ============================================
 */

export const validateDescription = (
    value
) => {
    const description =
        normalizeUomValue(
            value
        );

    if (
        description.length >
        UOM_VALIDATION.DESCRIPTION_MAX_LENGTH
    ) {
        return `Description cannot exceed ${UOM_VALIDATION.DESCRIPTION_MAX_LENGTH} characters.`;
    }

    return null;
};


/*
 * ============================================
 * VALIDATE CONVERSION FACTOR
 * ============================================
 */

export const validateConversionFactor = (
    value,
    uomType
) => {
    /*
     * Packaging UOM does not have a global
     * conversion factor.
     */

    if (
        PACKAGING_UOM_TYPES.includes(
            uomType
        )
    ) {
        return null;
    }

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "Conversion factor is required.";
    }

    const factor =
        Number(value);

    if (
        Number.isNaN(
            factor
        )
    ) {
        return "Conversion factor must be a valid number.";
    }

    if (
        factor <= 0
    ) {
        return "Conversion factor must be greater than zero.";
    }

    if (
        factor <
        UOM_VALIDATION.MIN_CONVERSION_FACTOR
    ) {
        return `Conversion factor cannot be less than ${UOM_VALIDATION.MIN_CONVERSION_FACTOR}.`;
    }

    if (
        factor >
        UOM_VALIDATION.MAX_CONVERSION_FACTOR
    ) {
        return `Conversion factor cannot exceed ${UOM_VALIDATION.MAX_CONVERSION_FACTOR}.`;
    }

    return null;
};


/*
 * ============================================
 * CHECK CONVERTIBLE UOM TYPE
 * ============================================
 */

export const isConvertibleUomType = (
    uomType
) => {
    return CONVERTIBLE_UOM_TYPES.includes(
        uomType
    );
};


/*
 * ============================================
 * CHECK PACKAGING UOM
 * ============================================
 */

export const isPackagingUom = (
    uomType
) => {
    return PACKAGING_UOM_TYPES.includes(
        uomType
    );
};


/*
 * ============================================
 * PREPARE UOM PAYLOAD
 * ============================================
 */

export const prepareUomPayload = (
    values = {}
) => {
    const uomType =
        values.uomType ||
        null;

    const payload = {
        uomCode:
            normalizeUomCode(
                values.uomCode
            ),

        uomName:
            normalizeUomValue(
                values.uomName
            ),

        shortName:
            normalizeUomValue(
                values.shortName
            ),

        uomType,

        baseUnitId:
            values.baseUnitId ||
            null,

        decimalAllowed:
            Boolean(
                values.decimalAllowed
            ),

        status:
            values.status ||
            "Active",

        description:
            normalizeUomValue(
                values.description
            ),
    };


    /*
     * Packaging UOM does not maintain
     * global conversion.
     */

    if (
        isPackagingUom(
            uomType
        )
    ) {
        payload.conversionFactor =
            null;
    } else {
        payload.conversionFactor =
            values.conversionFactor ===
                "" ||
            values.conversionFactor ===
                null ||
            values.conversionFactor ===
                undefined
                ? 1
                : Number(
                    values.conversionFactor
                );
    }


    return payload;
};


/*
 * ============================================
 * PREPARE UOM FORM VALUES
 * ============================================
 */

export const prepareUomFormValues = (
    uom
) => {
    if (!uom) {
        return {
            uomCode: "",
            uomName: "",
            shortName: "",
            uomType: undefined,
            baseUnitId: null,
            conversionFactor: 1,
            decimalAllowed: false,
            status: "Active",
            description: "",
        };
    }

    return {
        uomCode:
            uom.uomCode ||
            "",

        uomName:
            uom.uomName ||
            "",

        shortName:
            uom.shortName ||
            "",

        uomType:
            uom.uomType ||
            undefined,

        baseUnitId:
            uom.baseUnitId ||
            null,

        conversionFactor:
            uom.conversionFactor ??
            1,

        decimalAllowed:
            Boolean(
                uom.decimalAllowed
            ),

        status:
            uom.status ||
            "Active",

        description:
            uom.description ||
            "",
    };
};


/*
 * ============================================
 * CHECK DUPLICATE CODE
 * ============================================
 */

export const isDuplicateUomCode = (
    list = [],
    code,
    currentId = null
) => {
    const normalizedCode =
        normalizeUomCode(
            code
        );

    if (!normalizedCode) {
        return false;
    }

    return list.some(
        (item) =>
            item.id !== currentId &&
            normalizeUomCode(
                item.uomCode
            ) ===
                normalizedCode
    );
};


/*
 * ============================================
 * CHECK DUPLICATE NAME
 * ============================================
 */

export const isDuplicateUomName = (
    list = [],
    name,
    currentId = null
) => {
    const normalizedName =
        normalizeUomName(
            name
        );

    if (!normalizedName) {
        return false;
    }

    return list.some(
        (item) =>
            item.id !== currentId &&
            normalizeUomName(
                item.uomName
            ) ===
                normalizedName
    );
};


/*
 * ============================================
 * GET UOM BY ID
 * ============================================
 */

export const findUomById = (
    list = [],
    id
) => {
    if (
        id === null ||
        id === undefined
    ) {
        return null;
    }

    return (
        list.find(
            (item) =>
                item.id === id
        ) || null
    );
};


/*
 * ============================================
 * GET UOM BY CODE
 * ============================================
 */

export const findUomByCode = (
    list = [],
    code
) => {
    const normalizedCode =
        normalizeUomCode(
            code
        );

    if (!normalizedCode) {
        return null;
    }

    return (
        list.find(
            (item) =>
                normalizeUomCode(
                    item.uomCode
                ) ===
                    normalizedCode
        ) || null
    );
};


/*
 * ============================================
 * FILTER ACTIVE UOMS
 * ============================================
 */

export const getActiveUoms = (
    list = []
) => {
    return list.filter(
        (item) =>
            item.status ===
            "Active"
    );
};


/*
 * ============================================
 * FILTER UOMS BY TYPE
 * ============================================
 */

export const getUomsByType = (
    list = [],
    uomType
) => {
    if (!uomType) {
        return list;
    }

    return list.filter(
        (item) =>
            item.uomType ===
            uomType
    );
};


/*
 * ============================================
 * GET BASE UNITS
 * ============================================
 */

export const getBaseUnits = (
    list = []
) => {
    return list.filter(
        (item) =>
            item.status ===
                "Active" &&
            item.baseUnitId ===
                item.id
    );
};


/*
 * ============================================
 * GET BASE UNITS BY TYPE
 * ============================================
 */

export const getBaseUnitsByType = (
    list = [],
    uomType
) => {
    return getBaseUnits(
        getUomsByType(
            list,
            uomType
        )
    );
};


/*
 * ============================================
 * BUILD UOM OPTIONS
 * ============================================
 */

export const buildUomOptions = (
    list = []
) => {
    return list.map(
        (item) => ({
            value: item.id,

            label:
                item.uomName,

            code:
                item.uomCode,

            shortName:
                item.shortName,

            type:
                item.uomType,
        })
    );
};


/*
 * ============================================
 * BUILD UOM CODE OPTIONS
 * ============================================
 */

export const buildUomCodeOptions = (
    list = []
) => {
    return list.map(
        (item) => ({
            value:
                item.uomCode,

            label:
                `${item.uomName} (${item.uomCode})`,
        })
    );
};


/*
 * ============================================
 * CALCULATE PHYSICAL CONVERSION
 * ============================================
 *
 * Example:
 *
 * 1 G
 * base = MG
 * factor = 1000
 *
 * result:
 * 1000 MG
 *
 * This helper should ONLY be used for
 * mathematically convertible UOM types.
 */

export const convertToBaseUnit = (
    quantity,
    conversionFactor,
    uomType
) => {
    if (
        !isConvertibleUomType(
            uomType
        )
    ) {
        return null;
    }

    const qty =
        Number(quantity);

    const factor =
        Number(
            conversionFactor
        );

    if (
        Number.isNaN(qty) ||
        Number.isNaN(factor)
    ) {
        return null;
    }

    return (
        qty * factor
    );
};


/*
 * ============================================
 * VALIDATE COMPLETE UOM
 * ============================================
 */

export const validateUom = (
    values = {}
) => {
    const errors = {};


    const codeError =
        validateUomCode(
            values.uomCode
        );

    if (codeError) {
        errors.uomCode =
            codeError;
    }


    const nameError =
        validateUomName(
            values.uomName
        );

    if (nameError) {
        errors.uomName =
            nameError;
    }


    const shortNameError =
        validateShortName(
            values.shortName
        );

    if (shortNameError) {
        errors.shortName =
            shortNameError;
    }


    if (
        !values.uomType
    ) {
        errors.uomType =
            "UOM type is required.";
    }


    const conversionError =
        validateConversionFactor(
            values.conversionFactor,
            values.uomType
        );

    if (conversionError) {
        errors.conversionFactor =
            conversionError;
    }


    const descriptionError =
        validateDescription(
            values.description
        );

    if (descriptionError) {
        errors.description =
            descriptionError;
    }


    return errors;
};


/*
 * ============================================
 * CHECK VALID FORM
 * ============================================
 */

export const isValidUom = (
    values
) => {
    const errors =
        validateUom(
            values
        );

    return (
        Object.keys(
            errors
        ).length === 0
    );
};


/*
 * ============================================
 * SORT UOM LIST
 * ============================================
 */

export const sortUoms = (
    list = [],
    sortBy = "uomName",
    sortOrder = "asc"
) => {
    const sorted =
        [...list].sort(
            (a, b) => {
                const first =
                    String(
                        a?.[sortBy] ??
                            ""
                    ).toLowerCase();

                const second =
                    String(
                        b?.[sortBy] ??
                            ""
                    ).toLowerCase();

                return first.localeCompare(
                    second
                );
            }
        );

    if (
        sortOrder === "desc"
    ) {
        return sorted.reverse();
    }

    return sorted;
};


/*
 * ============================================
 * FILTER UOM LIST
 * ============================================
 */

export const filterUoms = (
    list = [],
    filters = {}
) => {
    const {
        search = "",
        uomType,
        status,
        decimalAllowed,
    } = filters;


    const normalizedSearch =
        normalizeUomValue(
            search
        ).toLowerCase();


    return list.filter(
        (item) => {
            /*
             * Search
             */

            const matchesSearch =
                !normalizedSearch ||
                [
                    item.uomCode,
                    item.uomName,
                    item.shortName,
                    item.description,
                ]
                    .filter(Boolean)
                    .some(
                        (value) =>
                            String(
                                value
                            )
                                .toLowerCase()
                                .includes(
                                    normalizedSearch
                                )
                    );


            /*
             * Type
             */

            const matchesType =
                !uomType ||
                item.uomType ===
                    uomType;


            /*
             * Status
             */

            const matchesStatus =
                !status ||
                item.status ===
                    status;


            /*
             * Decimal
             */

            const matchesDecimal =
                decimalAllowed ===
                    undefined ||
                item.decimalAllowed ===
                    decimalAllowed;


            return (
                matchesSearch &&
                matchesType &&
                matchesStatus &&
                matchesDecimal
            );
        }
    );
};


/*
 * ============================================
 * PREPARE LIST RESULT
 * ============================================
 */

export const prepareUomListResult = (
    list = [],
    query = {}
) => {
    const {
        page = 1,
        pageSize = 10,
        sortBy = "uomName",
        sortOrder = "asc",
    } = query;


    const filtered =
        filterUoms(
            list,
            query
        );


    const sorted =
        sortUoms(
            filtered,
            sortBy,
            sortOrder
        );


    const total =
        sorted.length;


    const start =
        (page - 1) *
        pageSize;


    const end =
        start +
        pageSize;


    return {
        data:
            sorted.slice(
                start,
                end
            ),

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