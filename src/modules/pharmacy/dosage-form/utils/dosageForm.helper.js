// src/modules/pharmacy/dosage-form/utils/dosageForm.helper.js

import {
    DOSAGE_FORM_CODE_CONFIG,
    DOSAGE_FORM_NAME_CONFIG,
    DOSAGE_FORM_DESCRIPTION_CONFIG,
    DOSAGE_FORM_SORT_ORDER_CONFIG,
} from "../constants/dosageForm.constants";


/*
 * =========================================================
 * TEXT NORMALIZATION
 * =========================================================
 */

export const normalizeText = (
    value
) => {

    return String(
        value ?? ""
    )
        .trim()
        .replace(/\s+/g, " ");
};


/*
 * =========================================================
 * CODE NORMALIZATION
 * =========================================================
 */

export const normalizeDosageFormCode = (
    value
) => {

    return normalizeText(
        value
    )
        .toUpperCase()
        .replace(/\s+/g, "_");
};


/*
 * =========================================================
 * NAME NORMALIZATION
 * =========================================================
 */

export const normalizeDosageFormName = (
    value
) => {

    return normalizeText(
        value
    );
};


/*
 * =========================================================
 * EMPTY VALUE
 * =========================================================
 */

const isEmpty = (
    value
) => {

    return (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    );
};


/*
 * =========================================================
 * FORM CODE VALIDATION
 * =========================================================
 */

export const validateDosageFormCode = (
    value
) => {

    const code =
        normalizeDosageFormCode(
            value
        );


    if (!code) {
        return "Form code is required.";
    }


    if (
        code.length <
        DOSAGE_FORM_CODE_CONFIG.minLength
    ) {
        return `Form code must be at least ${DOSAGE_FORM_CODE_CONFIG.minLength} characters.`;
    }


    if (
        code.length >
        DOSAGE_FORM_CODE_CONFIG.maxLength
    ) {
        return `Form code must not exceed ${DOSAGE_FORM_CODE_CONFIG.maxLength} characters.`;
    }


    /*
     * Allows:
     * A-Z
     * 0-9
     * underscore
     * hyphen
     */

    if (
        !/^[A-Z0-9_-]+$/.test(
            code
        )
    ) {
        return "Form code can contain only letters, numbers, hyphens and underscores.";
    }


    return null;
};


/*
 * =========================================================
 * FORM NAME VALIDATION
 * =========================================================
 */

export const validateDosageFormName = (
    value
) => {

    const name =
        normalizeDosageFormName(
            value
        );


    if (!name) {
        return "Form name is required.";
    }


    if (
        name.length <
        DOSAGE_FORM_NAME_CONFIG.minLength
    ) {
        return `Form name must be at least ${DOSAGE_FORM_NAME_CONFIG.minLength} characters.`;
    }


    if (
        name.length >
        DOSAGE_FORM_NAME_CONFIG.maxLength
    ) {
        return `Form name must not exceed ${DOSAGE_FORM_NAME_CONFIG.maxLength} characters.`;
    }


    return null;
};


/*
 * =========================================================
 * DESCRIPTION VALIDATION
 * =========================================================
 */

export const validateDosageFormDescription = (
    value
) => {

    const description =
        normalizeText(
            value
        );


    if (
        description.length >
        DOSAGE_FORM_DESCRIPTION_CONFIG.maxLength
    ) {
        return `Description must not exceed ${DOSAGE_FORM_DESCRIPTION_CONFIG.maxLength} characters.`;
    }


    return null;
};


/*
 * =========================================================
 * SORT ORDER VALIDATION
 * =========================================================
 */

export const validateDosageFormSortOrder = (
    value
) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }


    const sortOrder =
        Number(value);


    if (
        !Number.isInteger(
            sortOrder
        )
    ) {
        return "Display order must be a whole number.";
    }


    if (
        sortOrder <
        DOSAGE_FORM_SORT_ORDER_CONFIG.min
    ) {
        return `Display order cannot be less than ${DOSAGE_FORM_SORT_ORDER_CONFIG.min}.`;
    }


    if (
        sortOrder >
        DOSAGE_FORM_SORT_ORDER_CONFIG.max
    ) {
        return `Display order cannot be greater than ${DOSAGE_FORM_SORT_ORDER_CONFIG.max}.`;
    }


    return null;
};


/*
 * =========================================================
 * COMPLETE FORM VALIDATION
 * =========================================================
 */

export const validateDosageForm = (
    values,
    existingList = [],
    editingId = null
) => {

    const errors = {};


    /*
     * -----------------------------------------------
     * CODE
     * -----------------------------------------------
     */

    const codeError =
        validateDosageFormCode(
            values?.formCode
        );

    if (codeError) {
        errors.formCode =
            codeError;
    }


    /*
     * -----------------------------------------------
     * NAME
     * -----------------------------------------------
     */

    const nameError =
        validateDosageFormName(
            values?.formName
        );

    if (nameError) {
        errors.formName =
            nameError;
    }


    /*
     * -----------------------------------------------
     * DESCRIPTION
     * -----------------------------------------------
     */

    const descriptionError =
        validateDosageFormDescription(
            values?.description
        );

    if (descriptionError) {
        errors.description =
            descriptionError;
    }


    /*
     * -----------------------------------------------
     * FORM TYPE
     * -----------------------------------------------
     */

    if (
        isEmpty(
            values?.formType
        )
    ) {
        errors.formType =
            "Form type is required.";
    }


    /*
     * -----------------------------------------------
     * ROUTE
     * -----------------------------------------------
     */

    if (
        isEmpty(
            values?.routeOfAdministrationId
        )
    ) {
        errors.routeOfAdministrationId =
            "Route of administration is required.";
    }


    /*
     * -----------------------------------------------
     * UOM
     * -----------------------------------------------
     */

    if (
        isEmpty(
            values?.uomId
        )
    ) {
        errors.uomId =
            "UOM is required.";
    }


    /*
     * -----------------------------------------------
     * STATUS
     * -----------------------------------------------
     */

    if (
        isEmpty(
            values?.status
        )
    ) {
        errors.status =
            "Status is required.";
    }


    /*
     * -----------------------------------------------
     * SORT ORDER
     * -----------------------------------------------
     */

    const sortOrderError =
        validateDosageFormSortOrder(
            values?.sortOrder
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
        normalizeDosageFormCode(
            values?.formCode
        );


    if (normalizedCode) {

        const duplicateCode =
            existingList.some(
                (item) => {

                    const sameRecord =
                        editingId !== null &&
                        editingId !== undefined &&
                        String(
                            item.id
                        ) ===
                        String(
                            editingId
                        );


                    if (sameRecord) {
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


        if (duplicateCode) {
            errors.formCode =
                "Form code already exists.";
        }
    }


    /*
     * -----------------------------------------------
     * DUPLICATE NAME
     * -----------------------------------------------
     */

    const normalizedName =
        normalizeDosageFormName(
            values?.formName
        );


    if (normalizedName) {

        const duplicateName =
            existingList.some(
                (item) => {

                    const sameRecord =
                        editingId !== null &&
                        editingId !== undefined &&
                        String(
                            item.id
                        ) ===
                        String(
                            editingId
                        );


                    if (sameRecord) {
                        return false;
                    }


                    return (
                        normalizeDosageFormName(
                            item.formName
                        ).toLowerCase() ===
                        normalizedName.toLowerCase()
                    );
                }
            );


        if (duplicateName) {
            errors.formName =
                "Form name already exists.";
        }
    }


    return errors;
};


/*
 * =========================================================
 * PREPARE FORM VALUES
 * =========================================================
 */

export const prepareDosageFormFormValues = (
    record
) => {

    if (!record) {

        return {
            formCode: "",
            formName: "",
            formType: "SOLID",
            description: "",
            routeOfAdministrationId:
                undefined,
            uomId:
                undefined,
            status:
                "Active",
            sortOrder:
                0,
        };
    }


    return {
        formCode:
            record.formCode ?? "",

        formName:
            record.formName ?? "",

        formType:
            record.formType ?? "SOLID",

        description:
            record.description ?? "",

        routeOfAdministrationId:
            record.routeOfAdministrationId ??
            undefined,

        uomId:
            record.uomId ??
            undefined,

        status:
            record.status ?? "Active",

        sortOrder:
            Number(
                record.sortOrder
            ) || 0,
    };
};


/*
 * =========================================================
 * PREPARE API PAYLOAD
 * =========================================================
 */

export const prepareDosageFormPayload = (
    values
) => {

    return {

        formCode:
            normalizeDosageFormCode(
                values?.formCode
            ),

        formName:
            normalizeDosageFormName(
                values?.formName
            ),

        formType:
            values?.formType ??
            null,

        description:
            normalizeText(
                values?.description
            ) || null,

        routeOfAdministrationId:
            values?.routeOfAdministrationId ??
            null,

        uomId:
            values?.uomId ??
            null,

        status:
            values?.status ??
            "Active",

        sortOrder:
            Number(
                values?.sortOrder
            ) || 0,
    };
};


/*
 * =========================================================
 * GET USAGE STATUS
 * =========================================================
 */

export const getDosageFormUsageStatus = (
    drugCount
) => {

    const count =
        Number(
            drugCount
        ) || 0;


    if (count > 0) {

        return {
            value:
                "USED",

            label:
                "In Use",

            drugCount:
                count,
        };
    }


    return {
        value:
            "UNUSED",

        label:
            "Not Used",

        drugCount:
            0,
    };
};


/*
 * =========================================================
 * GET STATUS LABEL
 * =========================================================
 */

export const getDosageFormStatusLabel = (
    status
) => {

    if (
        status ===
        "Active"
    ) {
        return "Active";
    }


    if (
        status ===
        "Inactive"
    ) {
        return "Inactive";
    }


    return status || "-";
};


/*
 * =========================================================
 * GET FORM TYPE LABEL
 * =========================================================
 */

export const getDosageFormTypeLabel = (
    value,
    options = []
) => {

    const option =
        options.find(
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
 * GET ROUTE LABEL
 * =========================================================
 */

export const getRouteOfAdministrationLabel = (
    value,
    options = []
) => {

    const option =
        options.find(
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
 * GET UOM LABEL
 * =========================================================
 */

export const getUomLabel = (
    value,
    options = []
) => {

    const option =
        options.find(
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
 * SORT DOSAGE FORMS
 * =========================================================
 */

export const sortDosageForms = (
    list = [],
    sortBy = "sortOrder",
    sortOrder = "asc"
) => {

    const direction =
        sortOrder === "desc"
            ? -1
            : 1;


    return [
        ...list,
    ].sort(
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
                ) * direction;
            }


            return String(
                first
            ).localeCompare(
                String(
                    second
                )
            ) * direction;
        }
    );
};


/*
 * =========================================================
 * BUILD SELECT OPTION
 * =========================================================
 */

export const toDosageFormOption = (
    record
) => {

    if (!record) {
        return null;
    }


    return {
        value:
            record.id,

        label:
            record.formName,
    };
};


/*
 * =========================================================
 * BUILD ACTIVE OPTIONS
 * =========================================================
 */

export const toActiveDosageFormOptions = (
    list = []
) => {

    return list
        .filter(
            (item) =>
                item.status ===
                "Active"
        )
        .map(
            toDosageFormOption
        )
        .filter(
            Boolean
        );
};