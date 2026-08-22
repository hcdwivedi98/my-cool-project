// src/modules/pharmacy/drug-category/utils/drugCategory.helper.js

import {
    DRUG_CATEGORY_CODE_MAX_LENGTH,
    DRUG_CATEGORY_NAME_MAX_LENGTH,
    DRUG_CATEGORY_DESCRIPTION_MAX_LENGTH,
} from "../constants/drugCategory.constants";


/*
 * =========================================================
 * NORMALIZE STRING
 * =========================================================
 */

export const normalizeString = (
    value
) => {
    if (
        value ===
        null ||
        value ===
        undefined
    ) {
        return "";
    }

    return String(value)
        .trim();
};


/*
 * =========================================================
 * NORMALIZE CODE
 * =========================================================
 */

export const normalizeCategoryCode =
    (
        value
    ) =>
        normalizeString(
            value
        )
            .toUpperCase()
            .replace(
                /\s+/g,
                "_"
            );


/*
 * =========================================================
 * NORMALIZE NAME
 * =========================================================
 */

export const normalizeCategoryName =
    (
        value
    ) =>
        normalizeString(
            value
        )
            .replace(
                /\s+/g,
                " "
            );


/*
 * =========================================================
 * CASE-INSENSITIVE COMPARISON
 * ========================================================= */

export const equalsIgnoreCase = (
    first,
    second
) => {
    return (
        normalizeString(
            first
        ).toLowerCase() ===
        normalizeString(
            second
        ).toLowerCase()
    );
};


/*
 * =========================================================
 * FIND CATEGORY BY ID
 * ========================================================= */

export const findCategoryById = (
    categories,
    id
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return null;
    }

    return (
        categories.find(
            (item) =>
                Number(item.id) ===
                Number(id)
        ) || null
    );
};


/*
 * =========================================================
 * FIND CATEGORY BY CODE
 * ========================================================= */

export const findCategoryByCode = (
    categories,
    code
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return null;
    }

    const normalizedCode =
        normalizeCategoryCode(
            code
        );

    return (
        categories.find(
            (item) =>
                normalizeCategoryCode(
                    item.categoryCode
                ) ===
                normalizedCode
        ) || null
    );
};


/*
 * =========================================================
 * FIND CATEGORY BY NAME
 * ========================================================= */

export const findCategoryByName = (
    categories,
    name
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return null;
    }

    const normalizedName =
        normalizeCategoryName(
            name
        );

    return (
        categories.find(
            (item) =>
                equalsIgnoreCase(
                    item.categoryName,
                    normalizedName
                )
        ) || null
    );
};


/*
 * =========================================================
 * DUPLICATE CODE
 * =========================================================
 *
 * excludeId is used during EDIT.
 */

export const isDuplicateCategoryCode = (
    categories,
    code,
    excludeId = null
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return false;
    }

    const normalizedCode =
        normalizeCategoryCode(
            code
        );

    return categories.some(
        (item) => {
            if (
                excludeId !== null &&
                Number(item.id) ===
                    Number(
                        excludeId
                    )
            ) {
                return false;
            }

            return (
                normalizeCategoryCode(
                    item.categoryCode
                ) ===
                normalizedCode
            );
        }
    );
};


/*
 * =========================================================
 * DUPLICATE NAME
 * =========================================================
 */

export const isDuplicateCategoryName = (
    categories,
    name,
    excludeId = null
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return false;
    }

    const normalizedName =
        normalizeCategoryName(
            name
        );

    return categories.some(
        (item) => {
            if (
                excludeId !== null &&
                Number(item.id) ===
                    Number(
                        excludeId
                    )
            ) {
                return false;
            }

            return equalsIgnoreCase(
                item.categoryName,
                normalizedName
            );
        }
    );
};


/*
 * =========================================================
 * GET CHILD CATEGORIES
 * =========================================================
 */

export const getChildCategories = (
    categories,
    parentId
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }

    return categories
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
                (
                    a.sortOrder ||
                    0
                ) -
                (
                    b.sortOrder ||
                    0
                )
        );
};


/*
 * =========================================================
 * GET ROOT CATEGORIES
 * =========================================================
 */

export const getRootCategories = (
    categories
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }

    return categories
        .filter(
            (item) =>
                item.parentCategoryId ===
                null ||
                item.parentCategoryId ===
                undefined
        )
        .sort(
            (
                a,
                b
            ) =>
                (
                    a.sortOrder ||
                    0
                ) -
                (
                    b.sortOrder ||
                    0
                )
        );
};


/*
 * =========================================================
 * GET DESCENDANTS
 * =========================================================
 *
 * Used for circular hierarchy validation.
 */

export const getDescendantIds = (
    categories,
    categoryId
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }

    const descendants = [];

    const collectChildren =
        (
            parentId
        ) => {
            const children =
                categories.filter(
                    (item) =>
                        Number(
                            item.parentCategoryId
                        ) ===
                        Number(
                            parentId
                        )
                );

            children.forEach(
                (
                    child
                ) => {
                    descendants.push(
                        Number(
                            child.id
                        )
                    );

                    collectChildren(
                        child.id
                    );
                }
            );
        };

    collectChildren(
        categoryId
    );

    return descendants;
};


/*
 * =========================================================
 * CIRCULAR HIERARCHY VALIDATION
 * =========================================================
 */

export const wouldCreateCircularHierarchy =
    (
        categories,
        categoryId,
        parentCategoryId
    ) => {
        /*
         * No parent means root category.
         */

        if (
            parentCategoryId ===
                null ||
            parentCategoryId ===
                undefined
        ) {
            return false;
        }


        /*
         * Category cannot be its own parent.
         */

        if (
            Number(
                categoryId
            ) ===
            Number(
                parentCategoryId
            )
        ) {
            return true;
        }


        /*
         * Parent cannot be one of
         * the category's descendants.
         */

        const descendants =
            getDescendantIds(
                categories,
                categoryId
            );

        return descendants.includes(
            Number(
                parentCategoryId
            )
        );
    };


/*
 * =========================================================
 * VALIDATE PARENT CATEGORY
 * =========================================================
 */

export const validateParentCategory = (
    categories,
    categoryId,
    parentCategoryId
) => {
    if (
        parentCategoryId ===
            null ||
        parentCategoryId ===
            undefined ||
        parentCategoryId ===
            ""
    ) {
        return {
            valid: true,
            message: null,
        };
    }


    const parent =
        findCategoryById(
            categories,
            parentCategoryId
        );


    if (!parent) {
        return {
            valid: false,
            message:
                "Selected parent category does not exist.",
        };
    }


    /*
     * Inactive category cannot
     * become parent.
     */

    if (
        parent.status !==
        "Active"
    ) {
        return {
            valid: false,
            message:
                "Inactive category cannot be selected as parent.",
        };
    }


    if (
        categoryId !==
            null &&
        wouldCreateCircularHierarchy(
            categories,
            categoryId,
            parentCategoryId
        )
    ) {
        return {
            valid: false,
            message:
                "Selected parent would create a circular category hierarchy.",
        };
    }


    return {
        valid: true,
        message: null,
    };
};


/*
 * =========================================================
 * VALIDATE CATEGORY
 * =========================================================
 */

export const validateDrugCategory = (
    values,
    categories = [],
    excludeId = null
) => {
    const errors = {};


    const categoryCode =
        normalizeCategoryCode(
            values?.categoryCode
        );

    const categoryName =
        normalizeCategoryName(
            values?.categoryName
        );


    /*
     * -----------------------------------------
     * CODE
     * -----------------------------------------
     */

    if (!categoryCode) {
        errors.categoryCode =
            "Category code is required.";
    }
    else if (
        categoryCode.length >
        DRUG_CATEGORY_CODE_MAX_LENGTH
    ) {
        errors.categoryCode =
            `Category code cannot exceed ${DRUG_CATEGORY_CODE_MAX_LENGTH} characters.`;
    }
    else if (
        isDuplicateCategoryCode(
            categories,
            categoryCode,
            excludeId
        )
    ) {
        errors.categoryCode =
            `Category code "${categoryCode}" already exists.`;
    }


    /*
     * -----------------------------------------
     * NAME
     * -----------------------------------------
     */

    if (!categoryName) {
        errors.categoryName =
            "Category name is required.";
    }
    else if (
        categoryName.length >
        DRUG_CATEGORY_NAME_MAX_LENGTH
    ) {
        errors.categoryName =
            `Category name cannot exceed ${DRUG_CATEGORY_NAME_MAX_LENGTH} characters.`;
    }
    else if (
        isDuplicateCategoryName(
            categories,
            categoryName,
            excludeId
        )
    ) {
        errors.categoryName =
            `Category name "${categoryName}" already exists.`;
    }


    /*
     * -----------------------------------------
     * TYPE
     * -----------------------------------------
     */

    if (
        !values?.categoryType
    ) {
        errors.categoryType =
            "Category type is required.";
    }


    /*
     * -----------------------------------------
     * DESCRIPTION
     * -----------------------------------------
     */

    const description =
        normalizeString(
            values?.description
        );

    if (
        description.length >
        DRUG_CATEGORY_DESCRIPTION_MAX_LENGTH
    ) {
        errors.description =
            `Description cannot exceed ${DRUG_CATEGORY_DESCRIPTION_MAX_LENGTH} characters.`;
    }


    /*
     * -----------------------------------------
     * SORT ORDER
     * -----------------------------------------
     */

    const sortOrder =
        values?.sortOrder;

    if (
        sortOrder !==
            null &&
        sortOrder !==
            undefined &&
        sortOrder !==
            ""
    ) {
        if (
            Number.isNaN(
                Number(
                    sortOrder
                )
            )
        ) {
            errors.sortOrder =
                "Sort order must be a number.";
        }
        else if (
            Number(
                sortOrder
            ) < 0
        ) {
            errors.sortOrder =
                "Sort order cannot be negative.";
        }
    }


    /*
     * -----------------------------------------
     * PARENT
     * -----------------------------------------
     */

    const parentValidation =
        validateParentCategory(
            categories,
            excludeId,
            values?.parentCategoryId
        );

    if (
        !parentValidation.valid
    ) {
        errors.parentCategoryId =
            parentValidation.message;
    }


    return errors;
};


/*
 * =========================================================
 * PREPARE FORM VALUES
 * =========================================================
 *
 * API/mock object → Ant Design Form
 */

export const prepareDrugCategoryFormValues =
    (
        category
    ) => {
        if (!category) {
            return {
                categoryCode: "",
                categoryName: "",
                categoryType:
                    "THERAPEUTIC",
                parentCategoryId:
                    null,
                description: "",
                status:
                    "Active",
                sortOrder: 10,
            };
        }


        return {
            categoryCode:
                category.categoryCode ||
                "",

            categoryName:
                category.categoryName ||
                "",

            categoryType:
                category.categoryType ||
                "THERAPEUTIC",

            parentCategoryId:
                category.parentCategoryId ??
                null,

            description:
                category.description ||
                "",

            status:
                category.status ||
                "Active",

            sortOrder:
                category.sortOrder ??
                10,
        };
    };


/*
 * =========================================================
 * PREPARE API PAYLOAD
 * =========================================================
 *
 * Form → service/API
 */

export const prepareDrugCategoryPayload =
    (
        values
    ) => {
        return {
            categoryCode:
                normalizeCategoryCode(
                    values?.categoryCode
                ),

            categoryName:
                normalizeCategoryName(
                    values?.categoryName
                ),

            categoryType:
                values?.categoryType ||
                "THERAPEUTIC",

            parentCategoryId:
                values?.parentCategoryId ===
                    "" ||
                values?.parentCategoryId ===
                    undefined ||
                values?.parentCategoryId ===
                    null
                    ? null
                    : Number(
                        values.parentCategoryId
                    ),

            description:
                normalizeString(
                    values?.description
                ),

            status:
                values?.status ||
                "Active",

            sortOrder:
                values?.sortOrder ===
                    "" ||
                values?.sortOrder ===
                    undefined ||
                values?.sortOrder ===
                    null
                    ? 10
                    : Number(
                        values.sortOrder
                    ),
        };
    };


/*
 * =========================================================
 * FILTER CATEGORIES
 * =========================================================
 */

export const filterDrugCategories = (
    categories,
    filters = {}
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }


    const {
        search = "",
        categoryType,
        parentCategoryId,
        status,
        usage,
    } = filters;


    const normalizedSearch =
        normalizeString(
            search
        ).toLowerCase();


    return categories.filter(
        (item) => {

            /*
             * Search
             */

            if (
                normalizedSearch
            ) {
                const searchableText =
                    [
                        item.categoryCode,
                        item.categoryName,
                        item.description,
                        item.parentCategoryName,
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();


                if (
                    !searchableText.includes(
                        normalizedSearch
                    )
                ) {
                    return false;
                }
            }


            /*
             * Category Type
             */

            if (
                categoryType &&
                item.categoryType !==
                    categoryType
            ) {
                return false;
            }


            /*
             * Parent Category
             */

            if (
                parentCategoryId !==
                    undefined &&
                parentCategoryId !==
                    null &&
                parentCategoryId !==
                    ""
            ) {
                if (
                    Number(
                        item.parentCategoryId
                    ) !==
                    Number(
                        parentCategoryId
                    )
                ) {
                    return false;
                }
            }


            /*
             * Status
             */

            if (
                status &&
                item.status !==
                    status
            ) {
                return false;
            }


            /*
             * Usage
             */

            if (
                usage ===
                "USED"
            ) {
                if (
                    Number(
                        item.drugCount
                    ) <= 0
                ) {
                    return false;
                }
            }


            if (
                usage ===
                "UNUSED"
            ) {
                if (
                    Number(
                        item.drugCount
                    ) > 0
                ) {
                    return false;
                }
            }


            return true;
        }
    );
};


/*
 * =========================================================
 * SORT CATEGORIES
 * ========================================================= */

export const sortDrugCategories = (
    categories,
    sortBy = "sortOrder",
    sortOrder = "asc"
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }


    const result = [
        ...categories,
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
                return sortOrder ===
                    "desc"
                    ? secondValue -
                        firstValue
                    : firstValue -
                        secondValue;
            }


            return sortOrder ===
                "desc"
                ? String(
                    secondValue
                ).localeCompare(
                    String(
                        firstValue
                    )
                )
                : String(
                    firstValue
                ).localeCompare(
                    String(
                        secondValue
                    )
                );
        }
    );


    return result;
};


/*
 * =========================================================
 * PAGINATE
 * ========================================================= */

export const paginateDrugCategories = (
    categories,
    page = 1,
    pageSize = 10
) => {
    const safePage =
        Math.max(
            1,
            Number(page) ||
                1
        );

    const safePageSize =
        Math.max(
            1,
            Number(pageSize) ||
                10
        );


    const total =
        categories.length;


    const totalPages =
        Math.ceil(
            total /
            safePageSize
        );


    const startIndex =
        (
            safePage -
            1
        ) *
        safePageSize;


    const endIndex =
        startIndex +
        safePageSize;


    return {
        data:
            categories.slice(
                startIndex,
                endIndex
            ),

        total,

        page:
            safePage,

        pageSize:
            safePageSize,

        totalPages,
    };
};


/*
 * =========================================================
 * PREPARE LIST RESULT
 * ========================================================= */

export const prepareDrugCategoryListResult =
    (
        categories,
        query = {}
    ) => {
        const filtered =
            filterDrugCategories(
                categories,
                query
            );


        const sorted =
            sortDrugCategories(
                filtered,
                query.sortBy ||
                    "sortOrder",
                query.sortOrder ||
                    "asc"
            );


        return paginateDrugCategories(
            sorted,
            query.page ||
                1,
            query.pageSize ||
                10
        );
    };


/*
 * =========================================================
 * GET CATEGORY PATH
 * =========================================================
 *
 * Example:
 *
 * Antibiotic
 *    /
 * Penicillin
 *
 * Returns:
 *
 * Antibiotic > Penicillin
 */

export const getCategoryPath = (
    categories,
    categoryId
) => {
    const path = [];

    let current =
        findCategoryById(
            categories,
            categoryId
        );


    const visited =
        new Set();


    while (
        current &&
        !visited.has(
            Number(
                current.id
            )
        )
    ) {
        visited.add(
            Number(
                current.id
            )
        );


        path.unshift(
            current.categoryName
        );


        if (
            current.parentCategoryId ===
                null ||
            current.parentCategoryId ===
                undefined
        ) {
            break;
        }


        current =
            findCategoryById(
                categories,
                current.parentCategoryId
            );
    }


    return path;
};


/*
 * =========================================================
 * GET CATEGORY PATH LABEL
 * ========================================================= */

export const getCategoryPathLabel = (
    categories,
    categoryId
) => {
    return getCategoryPath(
        categories,
        categoryId
    ).join(
        " > "
    );
};


/*
 * =========================================================
 * BUILD CATEGORY TREE
 * ========================================================= */

export const buildDrugCategoryTree = (
    categories
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }


    const nodeMap =
        new Map();


    categories.forEach(
        (
            item
        ) => {
            nodeMap.set(
                Number(
                    item.id
                ),
                {
                    ...item,

                    children: [],
                }
            );
        }
    );


    const roots = [];


    nodeMap.forEach(
        (
            node
        ) => {
            if (
                node.parentCategoryId ===
                    null ||
                node.parentCategoryId ===
                    undefined
            ) {
                roots.push(
                    node
                );

                return;
            }


            const parent =
                nodeMap.get(
                    Number(
                        node.parentCategoryId
                    )
                );


            if (
                parent
            ) {
                parent.children.push(
                    node
                );
            }
            else {
                /*
                 * Orphan category:
                 * parent does not exist.
                 *
                 * Keep it as root so it is
                 * still visible.
                 */

                roots.push(
                    node
                );
            }
        }
    );


    const sortNodes =
        (
            nodes
        ) => {
            nodes.sort(
                (
                    a,
                    b
                ) =>
                    (
                        a.sortOrder ||
                        0
                    ) -
                    (
                        b.sortOrder ||
                        0
                    )
            );


            nodes.forEach(
                (
                    node
                ) => {
                    if (
                        node.children
                            ?.length
                    ) {
                        sortNodes(
                            node.children
                        );
                    }
                }
            );
        };


    sortNodes(
        roots
    );


    return roots;
};


/*
 * =========================================================
 * ACTIVE CATEGORY CHECK
 * ========================================================= */

export const isCategoryActive = (
    category
) => {
    return (
        category?.status ===
        "Active"
    );
};


/*
 * =========================================================
 * CATEGORY HAS DRUGS
 * ========================================================= */

export const categoryHasDrugs = (
    category
) => {
    return (
        Number(
            category?.drugCount
        ) > 0
    );
};


/*
 * =========================================================
 * CAN DEACTIVATE
 * =========================================================
 *
 * Category with drugs can still be
 * deactivated, but UI should show
 * warning/confirmation.
 */

export const canDeactivateCategory = (
    category
) => {
    if (!category) {
        return false;
    }

    return (
        category.status ===
        "Active"
    );
};


/*
 * =========================================================
 * CAN ACTIVATE
 * ========================================================= */

export const canActivateCategory = (
    category
) => {
    if (!category) {
        return false;
    }

    return (
        category.status ===
        "Inactive"
    );
};


/*
 * =========================================================
 * DISPLAY PARENT NAME
 * ========================================================= */

export const getParentCategoryName = (
    categories,
    parentCategoryId
) => {
    if (
        parentCategoryId ===
            null ||
        parentCategoryId ===
            undefined
    ) {
        return "-";
    }


    return (
        findCategoryById(
            categories,
            parentCategoryId
        )?.categoryName ||
        "-"
    );
};


/*
 * =========================================================
 * ENRICH CATEGORY
 * =========================================================
 *
 * Useful for mock list/table data.
 */

export const enrichDrugCategory = (
    category,
    categories
) => {
    if (!category) {
        return null;
    }


    return {
        ...category,

        parentCategoryName:
            getParentCategoryName(
                categories,
                category.parentCategoryId
            ),

        categoryPath:
            getCategoryPathLabel(
                categories,
                category.id
            ),

        hasDrugs:
            categoryHasDrugs(
                category
            ),

        isActive:
            isCategoryActive(
                category
            ),
    };
};


/*
 * =========================================================
 * ENRICH CATEGORY LIST
 * ========================================================= */

export const enrichDrugCategories = (
    categories
) => {
    if (
        !Array.isArray(
            categories
        )
    ) {
        return [];
    }


    return categories.map(
        (
            category
        ) =>
            enrichDrugCategory(
                category,
                categories
            )
    );
};