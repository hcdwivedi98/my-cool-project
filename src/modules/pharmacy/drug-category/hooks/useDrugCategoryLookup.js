// src/modules/pharmacy/drug-category/hooks/useDrugCategoryLookup.js

import {
    DRUG_CATEGORY_TYPES,
    DRUG_CATEGORY_STATUS_OPTIONS,
    DRUG_CATEGORY_TYPE_LABELS,
    DRUG_CATEGORY_STATUS_LABELS,
    DEFAULT_DRUG_CATEGORY_TYPE,
    DEFAULT_DRUG_CATEGORY_STATUS,
} from "../constants/drugCategory.constants";

import {
    drugCategoryList,
} from "../mock/drugCategory.mock";


const useDrugCategoryLookup = (
    currentCategoryId = null
) => {

    /*
     * ============================================
     * ACTIVE CATEGORIES
     * ============================================
     *
     * Used when selecting a parent category.
     *
     * Current category itself is excluded to
     * prevent:
     *
     * Category A
     *    ↓
     * Parent = Category A
     */

    const activeCategories =
        drugCategoryList
            .filter(
                (item) =>
                    item.status ===
                    "Active"
            )
            .filter(
                (item) =>
                    Number(item.id) !==
                    Number(
                        currentCategoryId
                    )
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    a.sortOrder -
                    b.sortOrder
            );


    /*
     * ============================================
     * ROOT CATEGORIES
     * ============================================
     */

    const rootCategories =
        activeCategories.filter(
            (item) =>
                item.parentCategoryId ===
                null
        );


    /*
     * ============================================
     * PARENT CATEGORY OPTIONS
     * ============================================
     *
     * Ant Design Select compatible.
     */

    const parentCategoryOptions =
        activeCategories.map(
            (item) => ({
                value:
                    item.id,

                label:
                    item.parentCategoryId
                        ? `↳ ${item.categoryName}`
                        : item.categoryName,

                code:
                    item.categoryCode,

                categoryType:
                    item.categoryType,

                parentCategoryId:
                    item.parentCategoryId,
            })
        );


    /*
     * ============================================
     * ROOT CATEGORY OPTIONS
     * ============================================
     */

    const rootCategoryOptions =
        rootCategories.map(
            (item) => ({
                value:
                    item.id,

                label:
                    item.categoryName,

                code:
                    item.categoryCode,
            })
        );


    /*
     * ============================================
     * GET CHILD CATEGORIES
     * ============================================
     */

    const getChildCategories =
        (
            parentId
        ) => {
            if (
                parentId ===
                null ||
                parentId ===
                undefined
            ) {
                return [];
            }

            return activeCategories
                .filter(
                    (item) =>
                        Number(
                            item.parentCategoryId
                        ) ===
                        Number(
                            parentId
                        )
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        a.sortOrder -
                        b.sortOrder
                );
        };


    /*
     * ============================================
     * GET CATEGORIES BY TYPE
     * ============================================
     */

    const getCategoriesByType =
        (
            categoryType
        ) => {
            if (
                !categoryType
            ) {
                return activeCategories;
            }

            return activeCategories.filter(
                (item) =>
                    item.categoryType ===
                    categoryType
            );
        };


    /*
     * ============================================
     * FIND CATEGORY
     * ============================================
     */

    const getCategoryById =
        (
            id
        ) =>
            drugCategoryList.find(
                (item) =>
                    Number(item.id) ===
                    Number(id)
            ) || null;


    /*
     * ============================================
     * TYPE LABEL
     * ============================================
     */

    const getCategoryTypeLabel =
        (
            type
        ) =>
            DRUG_CATEGORY_TYPE_LABELS[
                type
            ] ||
            type ||
            "-";


    /*
     * ============================================
     * STATUS LABEL
     * ============================================
     */

    const getStatusLabel =
        (
            status
        ) =>
            DRUG_CATEGORY_STATUS_LABELS[
                status
            ] ||
            status ||
            "-";


    /*
     * ============================================
     * FORM DEFAULTS
     * ============================================
     */

    const defaultValues = {
        categoryCode:
            "",

        categoryName:
            "",

        categoryType:
            DEFAULT_DRUG_CATEGORY_TYPE,

        parentCategoryId:
            null,

        description:
            "",

        status:
            DEFAULT_DRUG_CATEGORY_STATUS,

        sortOrder:
            10,
    };


    /*
     * ============================================
     * RETURN LOOKUPS
     * ============================================
     */

    return {
        categoryTypes:
            DRUG_CATEGORY_TYPES,

        statuses:
            DRUG_CATEGORY_STATUS_OPTIONS,

        activeCategories,

        rootCategories,

        parentCategoryOptions,

        rootCategoryOptions,

        defaultValues,

        getChildCategories,

        getCategoriesByType,

        getCategoryById,

        getCategoryTypeLabel,

        getStatusLabel,
    };
};


export default useDrugCategoryLookup;