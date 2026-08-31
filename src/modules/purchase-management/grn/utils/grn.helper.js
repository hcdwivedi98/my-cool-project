// src/modules/purchase-management/grn/utils/grn.helper.js


import {
    GRN_STATUS,
    GRN_STATUS_LABELS,

    GRN_TYPE,
    GRN_TYPE_LABELS,

    GRN_QUALITY_STATUS,
    GRN_QUALITY_STATUS_LABELS,

    GRN_INSPECTION_STATUS,
    GRN_INSPECTION_STATUS_LABELS,

    GRN_RECEIVING_MODE,
    GRN_RECEIVING_MODE_LABELS,

    GRN_STOCK_POSTING_STATUS,
    GRN_STOCK_POSTING_STATUS_LABELS,

    GRN_EDITABLE_STATUSES,
    GRN_SUBMITTABLE_STATUSES,
    GRN_APPROVAL_STATUSES,
    GRN_FINAL_STATUSES,
    GRN_READ_ONLY_STATUSES,

    GRN_QUANTITY_RULES,
    GRN_BATCH_RULES,

} from "../constants/grn.constants";


/* =========================================================
   SAFE ARRAY
   ========================================================= */

export const safeArray = (
    value
) => {

    return Array.isArray(
        value
    )
        ? value
        : [];

};


/* =========================================================
   SAFE NUMBER
   ========================================================= */

export const toNumber = (
    value,
    fallback = 0
) => {

    const number =
        Number(
            value
        );


    return Number.isFinite(
        number
    )
        ? number
        : fallback;

};


/* =========================================================
   ROUND MONEY
   ========================================================= */

export const roundMoney = (
    value,
    decimals = 2
) => {

    const number =
        toNumber(
            value
        );


    const multiplier =
        10 ** decimals;


    return (
        Math.round(
            (
                number +
                Number.EPSILON
            ) *
            multiplier
        ) /
        multiplier
    );

};


/* =========================================================
   NORMALIZE TEXT
   ========================================================= */

export const normalizeText = (
    value
) => {

    return String(
        value ?? ""
    )
        .trim();

};


/* =========================================================
   NORMALIZE DATE
   ========================================================= */

export const normalizeDate = (
    value
) => {

    if (
        !value
    ) {

        return null;

    }


    if (
        typeof value ===
        "object" &&
        typeof value.isValid ===
        "function"
    ) {

        return value;

    }


    return value;

};


/* =========================================================
   DATE TO JS DATE
   ========================================================= */

const toJSDate = (
    value
) => {

    if (
        !value
    ) {

        return null;

    }


    if (
        value instanceof Date
    ) {

        return Number.isNaN(
            value.getTime()
        )
            ? null
            : value;

    }


    if (
        typeof value ===
        "object" &&
        typeof value.toDate ===
        "function"
    ) {

        const date =
            value.toDate();


        return Number.isNaN(
            date.getTime()
        )
            ? null
            : date;

    }


    const date =
        new Date(
            value
        );


    return Number.isNaN(
        date.getTime()
    )
        ? null
        : date;

};


/* =========================================================
   DATE ONLY COMPARISON
   ========================================================= */

const dateOnlyTime = (
    value
) => {

    const date =
        toJSDate(
            value
        );


    if (
        !date
    ) {

        return null;

    }


    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime();

};


/* =========================================================
   GET PENDING QUANTITY
   ========================================================= */

export const getPendingQuantity = (
    item = {}
) => {

    const orderedQuantity =
        Math.max(
            0,
            toNumber(
                item?.orderedQuantity
            )
        );


    const previouslyReceivedQuantity =
        Math.max(
            0,
            toNumber(
                item?.previouslyReceivedQuantity
            )
        );


    const calculatedPending =
        Math.max(
            0,
            orderedQuantity -
            previouslyReceivedQuantity
        );


    const explicitPending =
        toNumber(
            item?.pendingQuantity,
            NaN
        );


    if (
        Number.isFinite(
            explicitPending
        ) &&
        explicitPending >= 0
    ) {

        return explicitPending;

    }


    return calculatedPending;

};


/* =========================================================
   GET OUTSTANDING QUANTITY
   ========================================================= */

export const getOutstandingQuantity = (
    item = {}
) => {

    const ordered =
        Math.max(
            0,
            toNumber(
                item?.orderedQuantity
            )
        );


    const received =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    return Math.max(
        0,
        ordered - received
    );

};


/* =========================================================
   CALCULATE ACCEPTED QUANTITY
   ========================================================= */

export const calculateAcceptedQuantity = (
    item = {}
) => {

    const received =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const rejected =
        Math.max(
            0,
            toNumber(
                item?.rejectedQuantity
            )
        );


    const damaged =
        Math.max(
            0,
            toNumber(
                item?.damagedQuantity
            )
        );


    if (
        item?.acceptedQuantity !==
        undefined &&
        item?.acceptedQuantity !==
        null
    ) {

        return Math.min(
            received,
            Math.max(
                0,
                toNumber(
                    item?.acceptedQuantity
                )
            )
        );

    }


    return Math.max(
        0,
        received -
        rejected -
        damaged
    );

};


/* =========================================================
   CALCULATE REJECTED QUANTITY
   ========================================================= */

export const calculateRejectedQuantity = (
    item = {}
) => {

    const received =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const accepted =
        Math.max(
            0,
            toNumber(
                item?.acceptedQuantity
            )
        );


    const damaged =
        Math.max(
            0,
            toNumber(
                item?.damagedQuantity
            )
        );


    if (
        item?.rejectedQuantity !==
        undefined &&
        item?.rejectedQuantity !==
        null
    ) {

        return Math.min(
            received,
            Math.max(
                0,
                toNumber(
                    item?.rejectedQuantity
                )
            )
        );

    }


    return Math.max(
        0,
        received -
        accepted -
        damaged
    );

};


/* =========================================================
   CALCULATE LINE DISCOUNT
   ========================================================= */

export const calculateLineDiscount = (
    item = {}
) => {

    const quantity =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const unitRate =
        Math.max(
            0,
            toNumber(
                item?.purchaseRate ??
                item?.unitRate
            )
        );


    const grossAmount =
        quantity *
        unitRate;


    const discountPercent =
        Math.max(
            0,
            toNumber(
                item?.discountPercent
            )
        );


    const explicitDiscount =
        toNumber(
            item?.discountAmount,
            NaN
        );


    if (
        Number.isFinite(
            explicitDiscount
        ) &&
        explicitDiscount >= 0
    ) {

        return roundMoney(
            Math.min(
                grossAmount,
                explicitDiscount
            )
        );

    }


    return roundMoney(
        grossAmount *
        discountPercent /
        100
    );

};


/* =========================================================
   CALCULATE TAXABLE AMOUNT
   ========================================================= */

export const calculateTaxableAmount = (
    item = {}
) => {

    const quantity =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const unitRate =
        Math.max(
            0,
            toNumber(
                item?.purchaseRate ??
                item?.unitRate
            )
        );


    const grossAmount =
        quantity *
        unitRate;


    const discount =
        calculateLineDiscount(
            item
        );


    return roundMoney(
        Math.max(
            0,
            grossAmount -
            discount
        )
    );

};


/* =========================================================
   CALCULATE TAX
   ========================================================= */

export const calculateTaxAmount = (
    item = {}
) => {

    const taxableAmount =
        calculateTaxableAmount(
            item
        );


    const taxPercent =
        Math.max(
            0,
            toNumber(
                item?.taxPercent
            )
        );


    return roundMoney(
        taxableAmount *
        taxPercent /
        100
    );

};


/* =========================================================
   CALCULATE LINE TOTAL
   ========================================================= */

export const calculateLineTotal = (
    item = {}
) => {

    const taxableAmount =
        calculateTaxableAmount(
            item
        );


    const taxAmount =
        calculateTaxAmount(
            item
        );


    return roundMoney(
        taxableAmount +
        taxAmount
    );

};


/* =========================================================
   NORMALIZE GRN ITEM
   ========================================================= */

export const normalizeGRNItem = (
    item = {}
) => {

    const receivedQuantity =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const rejectedQuantity =
        calculateRejectedQuantity(
            {
                ...item,
                receivedQuantity,
            }
        );


    const damagedQuantity =
        Math.min(
            rejectedQuantity,
            Math.max(
                0,
                toNumber(
                    item?.damagedQuantity
                )
            )
        );


    const acceptedQuantity =
        Math.min(
            receivedQuantity,
            Math.max(
                0,
                toNumber(
                    item?.acceptedQuantity ??
                    (
                        receivedQuantity -
                        rejectedQuantity
                    )
                )
            )
        );


    const taxableAmount =
        calculateTaxableAmount(
            {
                ...item,
                receivedQuantity,
            }
        );


    const taxAmount =
        calculateTaxAmount(
            {
                ...item,
                receivedQuantity,
            }
        );


    const lineTotal =
        calculateLineTotal(
            {
                ...item,
                receivedQuantity,
            }
        );


    return {

        ...item,

        receivedQuantity,

        acceptedQuantity,

        rejectedQuantity,

        damagedQuantity,

        outstandingQuantity:
            getOutstandingQuantity(
                {
                    ...item,
                    receivedQuantity,
                }
            ),

        taxableAmount,

        taxAmount,

        lineTotal,

    };

};


/* =========================================================
   NORMALIZE GRN ITEMS
   ========================================================= */

export const normalizeGRNItems = (
    items = []
) => {

    return safeArray(
        items
    )
        .map(
            normalizeGRNItem
        );

};


/* =========================================================
   CALCULATE GRN TOTALS
   ========================================================= */

export const calculateGRNTotals = (
    items = [],
    values = {}
) => {

    const normalizedItems =
        normalizeGRNItems(
            items
        );


    let totalItems =
        0;


    let totalOrderedQuantity =
        0;


    let totalPendingQuantity =
        0;


    let totalReceivedQuantity =
        0;


    let totalAcceptedQuantity =
        0;


    let totalRejectedQuantity =
        0;


    let totalDamagedQuantity =
        0;


    let subtotal =
        0;


    let discountAmount =
        0;


    let taxAmount =
        0;


    normalizedItems.forEach(
        (
            item
        ) => {

            totalItems +=
                1;


            totalOrderedQuantity +=
                Math.max(
                    0,
                    toNumber(
                        item?.orderedQuantity
                    )
                );


            totalPendingQuantity +=
                getPendingQuantity(
                    item
                );


            totalReceivedQuantity +=
                Math.max(
                    0,
                    toNumber(
                        item?.receivedQuantity
                    )
                );


            totalAcceptedQuantity +=
                Math.max(
                    0,
                    toNumber(
                        item?.acceptedQuantity
                    )
                );


            totalRejectedQuantity +=
                Math.max(
                    0,
                    toNumber(
                        item?.rejectedQuantity
                    )
                );


            totalDamagedQuantity +=
                Math.max(
                    0,
                    toNumber(
                        item?.damagedQuantity
                    )
                );


            const quantity =
                Math.max(
                    0,
                    toNumber(
                        item?.receivedQuantity
                    )
                );


            const unitRate =
                Math.max(
                    0,
                    toNumber(
                        item?.purchaseRate ??
                        item?.unitRate
                    )
                );


            const grossAmount =
                quantity *
                unitRate;


            subtotal +=
                grossAmount;


            discountAmount +=
                calculateLineDiscount(
                    item
                );


            taxAmount +=
                calculateTaxAmount(
                    item
                );

        }
    );


    subtotal =
        roundMoney(
            subtotal
        );


    discountAmount =
        roundMoney(
            discountAmount
        );


    taxAmount =
        roundMoney(
            taxAmount
        );


    const otherCharges =
        roundMoney(
            values?.otherCharges
        );


    const roundOff =
        roundMoney(
            values?.roundOff
        );


    const grandTotal =
        roundMoney(
            subtotal -
            discountAmount +
            taxAmount +
            otherCharges +
            roundOff
        );


    return {

        totalItems,

        totalOrderedQuantity,

        totalPendingQuantity,

        totalReceivedQuantity,

        totalAcceptedQuantity,

        totalRejectedQuantity,

        totalDamagedQuantity,

        subtotal,

        discountAmount,

        taxAmount,

        otherCharges,

        roundOff,

        grandTotal,

    };

};
/* =========================================================
   VALIDATE RECEIVED QUANTITY
   ========================================================= */

export const validateReceivedQuantity = (
    item = {}
) => {

    const errors = [];

    const received =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );

    const pending =
        Math.max(
            0,
            getPendingQuantity(
                item
            )
        );


    /*
     * Excess receipt is not allowed.
     */

    if (
        GRN_QUANTITY_RULES.ALLOW_EXCESS_RECEIPT ===
        false &&
        received >
        pending
    ) {

        errors.push(
            `Received quantity cannot exceed pending quantity (${pending}).`
        );

    }


    /*
     * Explicit business rule:
     * received quantity cannot exceed pending quantity.
     */

    if (
        GRN_QUANTITY_RULES.RECEIVED_CANNOT_EXCEED_PENDING ===
        true &&
        received >
        pending
    ) {

        const message =
            `Received quantity cannot exceed pending quantity (${pending}).`;


        if (
            !errors.includes(
                message
            )
        ) {

            errors.push(
                message
            );

        }

    }


    /*
     * Minimum received quantity.
     */

    if (
        GRN_QUANTITY_RULES.MIN_RECEIVED_QUANTITY !==
        undefined &&
        received <
        Number(
            GRN_QUANTITY_RULES.MIN_RECEIVED_QUANTITY
        )
    ) {

        errors.push(
            `Received quantity must be at least ${GRN_QUANTITY_RULES.MIN_RECEIVED_QUANTITY}.`
        );

    }


    return errors;

};


/* =========================================================
   VALIDATE ACCEPTED / REJECTED
   ========================================================= */

export const validateAcceptedRejectedQuantity = (
    item = {}
) => {

    const errors = [];


    const received =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    const accepted =
        Math.max(
            0,
            toNumber(
                item?.acceptedQuantity
            )
        );


    const rejected =
        Math.max(
            0,
            toNumber(
                item?.rejectedQuantity
            )
        );


    const damaged =
        Math.max(
            0,
            toNumber(
                item?.damagedQuantity
            )
        );


    if (
        accepted +
        rejected >
        received
    ) {

        errors.push(
            "Accepted quantity plus rejected quantity cannot exceed received quantity."
        );

    }


    if (
        accepted +
        rejected +
        damaged >
        received
    ) {

        errors.push(
            "Accepted, rejected and damaged quantities cannot exceed received quantity."
        );

    }


    return errors;

};


/* =========================================================
   VALIDATE BATCH
   ========================================================= */

export const validateGRNBatch = (
    item = {}
) => {

    const errors = [];


    const batchNumber =
        normalizeText(
            item?.batchNumber
        );


    const manufacturingDate =
        item?.manufacturingDate;


    const expiryDate =
        item?.expiryDate;


    /* -----------------------------------------------------
       BATCH NUMBER
    ----------------------------------------------------- */

    if (
        GRN_BATCH_RULES.BATCH_NUMBER_REQUIRED ===
        true &&
        !batchNumber
    ) {

        errors.push(
            "Batch number is required."
        );

    }


    /* -----------------------------------------------------
       MANUFACTURING DATE
    ----------------------------------------------------- */

    if (
        GRN_BATCH_RULES.MANUFACTURING_DATE_REQUIRED ===
        true &&
        !manufacturingDate
    ) {

        errors.push(
            "Manufacturing date is required."
        );

    }


    /* -----------------------------------------------------
       EXPIRY DATE
    ----------------------------------------------------- */

    if (
        GRN_BATCH_RULES.EXPIRY_DATE_REQUIRED ===
        true &&
        !expiryDate
    ) {

        errors.push(
            "Expiry date is required."
        );

    }


    return errors;

};

/* =========================================================
   VALIDATE EXPIRY
   ========================================================= */

export const validateGRNExpiry = (
    item = {},
    grnDate = null
) => {

    const errors = [];


    const expiryTime =
        dateOnlyTime(
            item?.expiryDate
        );


    const grnTime =
        dateOnlyTime(
            grnDate
        );


    /*
     * No expiry date.
     */

    if (
        !expiryTime
    ) {

        if (
            GRN_BATCH_RULES.EXPIRY_DATE_REQUIRED ===
            true
        ) {

            errors.push(
                "Expiry date is required."
            );

        }


        return errors;

    }


    /*
     * Expired batch.
     */

    if (
        grnTime &&
        expiryTime <=
        grnTime &&
        GRN_BATCH_RULES.ALLOW_EXPIRED_BATCH ===
        false
    ) {

        errors.push(
            "Batch is expired and cannot be received."
        );

    }


    /*
     * Manufacturing date → expiry date.
     */

    const manufacturingTime =
        dateOnlyTime(
            item?.manufacturingDate
        );


    if (
        manufacturingTime &&
        expiryTime <=
        manufacturingTime &&
        GRN_BATCH_RULES.EXPIRY_MUST_BE_AFTER_MANUFACTURING ===
        true
    ) {

        errors.push(
            "Expiry date must be after manufacturing date."
        );

    }


    return errors;

};

/* =========================================================
   VALIDATE MFG DATE
   ========================================================= */

export const validateManufacturingDate = (
    item = {},
    grnDate = null
) => {

    const errors = [];


    const manufacturingTime =
        dateOnlyTime(
            item?.manufacturingDate
        );


    const grnTime =
        dateOnlyTime(
            grnDate
        );


    if (
        !manufacturingTime
    ) {

        if (
            GRN_BATCH_RULES.MANUFACTURING_DATE_REQUIRED ===
            true
        ) {

            errors.push(
                "Manufacturing date is required."
            );

        }


        return errors;

    }


    /*
     * Manufacturing date cannot be after GRN date.
     */

    if (
        grnTime &&
        manufacturingTime >
        grnTime
    ) {

        errors.push(
            "Manufacturing date cannot be after GRN date."
        );

    }


    return errors;

};

/* =========================================================
   VALIDATE SINGLE GRN ITEM
   ========================================================= */

export const validateGRNItem = (
    item = {},
    options = {}
) => {

    const errors = [];


    /* -----------------------------------------------------
       BASIC ITEM VALIDATION
    ----------------------------------------------------- */

    const itemName =
        normalizeText(
            item?.itemName ||
            item?.drugName
        );


    if (
        !itemName
    ) {

        errors.push(
            "Item name is required."
        );

    }


    /* -----------------------------------------------------
       QUANTITY VALIDATION
    ----------------------------------------------------- */

    errors.push(
        ...validateReceivedQuantity(
            item
        )
    );


    errors.push(
        ...validateAcceptedRejectedQuantity(
            item
        )
    );


    /* -----------------------------------------------------
       RECEIVED QUANTITY
    ----------------------------------------------------- */

    const receivedQuantity =
        Math.max(
            0,
            toNumber(
                item?.receivedQuantity
            )
        );


    /*
     * Batch/date validation is required only
     * when quantity is actually being received.
     */

    if (
        receivedQuantity > 0
    ) {

        /* -----------------------------------------------
           BATCH
        ----------------------------------------------- */

        errors.push(
            ...validateGRNBatch(
                item
            )
        );


        /* -----------------------------------------------
           EXPIRY
        ----------------------------------------------- */

        errors.push(
            ...validateGRNExpiry(
                item,
                options?.grnDate
            )
        );


        /* -----------------------------------------------
           MANUFACTURING DATE
        ----------------------------------------------- */

        errors.push(
            ...validateManufacturingDate(
                item,
                options?.grnDate
            )
        );

    }


    /* -----------------------------------------------------
       PURCHASE RATE
    ----------------------------------------------------- */

    const purchaseRate =
        toNumber(
            item?.purchaseRate ??
            item?.unitRate
        );


    if (
        purchaseRate < 0
    ) {

        errors.push(
            "Purchase rate cannot be negative."
        );

    }


    /* -----------------------------------------------------
       TAX
    ----------------------------------------------------- */

    const taxPercent =
        toNumber(
            item?.taxPercent
        );


    if (
        taxPercent < 0
    ) {

        errors.push(
            "Tax percentage cannot be negative."
        );

    }


    /* -----------------------------------------------------
       DISCOUNT
    ----------------------------------------------------- */

    const discountPercent =
        toNumber(
            item?.discountPercent
        );


    if (
        discountPercent < 0
    ) {

        errors.push(
            "Discount percentage cannot be negative."
        );

    }


    if (
        discountPercent > 100
    ) {

        errors.push(
            "Discount percentage cannot exceed 100%."
        );

    }


    return errors;

};


/* =========================================================
   VALIDATE ALL GRN ITEMS
   ========================================================= */

export const validateGRNItems = (
    items = [],
    options = {}
) => {

    const errors = [];


    const safeItems =
        safeArray(
            items
        );


    /* -----------------------------------------------------
       ITEMS REQUIRED
    ----------------------------------------------------- */

    if (
        safeItems.length === 0
    ) {

        errors.push({

            field:
                [
                    "items",
                ],

            index:
                -1,

            message:
                "At least one GRN item is required.",

        });


        return errors;

    }


    /* -----------------------------------------------------
       VALIDATE EACH ITEM
    ----------------------------------------------------- */

    safeItems.forEach(
        (
            item,
            index
        ) => {

            const itemErrors =
                validateGRNItem(
                    item,
                    options
                );


            itemErrors.forEach(
                (
                    validationError
                ) => {

                    const errorMessage =
                        typeof validationError ===
                            "string"
                            ? validationError
                            : validationError?.message;


                    if (
                        !errorMessage
                    ) {

                        return;

                    }


                    errors.push({

                        field:
                            [
                                "items",
                                index,
                            ],

                        index,

                        itemId:
                            item?.id ??
                            null,

                        itemName:
                            item?.itemName ||
                            item?.drugName ||
                            "",

                        message:
                            errorMessage,

                    });

                }
            );

        }
    );


    /* -----------------------------------------------------
       DUPLICATE ITEM CHECK
    ----------------------------------------------------- */

    const itemKeys =
        new Map();


    safeItems.forEach(
        (
            item,
            index
        ) => {

            const key =
                normalizeText(
                    item?.drugId ??
                    item?.itemCode ??
                    item?.itemName ??
                    item?.drugName
                )
                    .toUpperCase();


            if (
                !key
            ) {

                return;

            }


            if (
                itemKeys.has(
                    key
                )
            ) {

                errors.push({

                    field:
                        [
                            "items",
                            index,
                        ],

                    index,

                    itemId:
                        item?.id ??
                        null,

                    itemName:
                        item?.itemName ||
                        item?.drugName ||
                        "",

                    message:
                        "Duplicate GRN item detected.",

                });

            }
            else {

                itemKeys.set(
                    key,
                    index
                );

            }

        }
    );


    return errors;

};


/* =========================================================
   VALIDATE GRN HEADER
   ========================================================= */

export const validateGRNHeader = (
    values = {}
) => {

    const errors = [];


    /* -----------------------------------------------------
       GRN NUMBER
    ----------------------------------------------------- */

    if (
        !normalizeText(
            values?.grnNumber
        )
    ) {

        errors.push({

            field:
                [
                    "grnNumber",
                ],

            message:
                "GRN number is required.",

        });

    }


    /* -----------------------------------------------------
       GRN DATE
    ----------------------------------------------------- */

    if (
        !values?.grnDate
    ) {

        errors.push({

            field:
                [
                    "grnDate",
                ],

            message:
                "GRN date is required.",

        });

    }


    /* -----------------------------------------------------
       PURCHASE ORDER
    ----------------------------------------------------- */

    if (
        !values?.purchaseOrderId
    ) {

        errors.push({

            field:
                [
                    "purchaseOrderId",
                ],

            message:
                "Purchase Order is required.",

        });

    }


    /* -----------------------------------------------------
       SUPPLIER
    ----------------------------------------------------- */

    if (
        !values?.supplierId
    ) {

        errors.push({

            field:
                [
                    "supplierId",
                ],

            message:
                "Supplier is required.",

        });

    }


    /* -----------------------------------------------------
       STORE
    ----------------------------------------------------- */

    if (
        !values?.storeId
    ) {

        errors.push({

            field:
                [
                    "storeId",
                ],

            message:
                "Receiving store is required.",

        });

    }


    return errors;

};


/* =========================================================
   VALIDATE COMPLETE GRN
   ========================================================= */

export const validateGRN = (
    values = {}
) => {

    const errors = [];


    /* -----------------------------------------------------
       HEADER VALIDATION
    ----------------------------------------------------- */

    errors.push(
        ...validateGRNHeader(
            values
        )
    );


    /* -----------------------------------------------------
       ITEMS
    ----------------------------------------------------- */

    const items =
        safeArray(
            values?.items
        );


    /*
     * validateGRNItems already handles:
     * - empty items
     * - item validation
     * - duplicate item validation
     *
     * Do not add another empty-items error here.
     */

    errors.push(
        ...validateGRNItems(
            items,
            {
                grnDate:
                    values?.grnDate,
            }
        )
    );


    /* -----------------------------------------------------
       TOTAL RECEIVED QUANTITY
    ----------------------------------------------------- */

    const totalReceived =
        items.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    Math.max(
                        0,
                        toNumber(
                            item?.receivedQuantity
                        )
                    )
                );

            },
            0
        );


    if (
        items.length > 0 &&
        totalReceived <= 0
    ) {

        errors.push({

            field:
                [
                    "items",
                ],

            message:
                "At least one item must have received quantity greater than zero.",

        });

    }


    return errors;

};


/* =========================================================
   GET GRN VALIDATION MESSAGES
   ========================================================= */

export const getGRNValidationMessages = (
    values = {}
) => {

    return validateGRN(
        values
    )
        .map(
            error => {

                if (
                    typeof error ===
                    "string"
                ) {

                    return error;

                }


                return error?.message;

            }
        )
        .filter(
            Boolean
        );

};

/* =========================================================
   VALIDATE GRN - MESSAGE ONLY
   ========================================================= */



/* =========================================================
   IS EDITABLE
   ========================================================= */

export const isGRNEditable = (
    status
) => {

    return GRN_EDITABLE_STATUSES.includes(
        status
    );

};


/* =========================================================
   IS SUBMITTABLE
   ========================================================= */

export const isGRNSubmittable = (
    status
) => {

    return GRN_SUBMITTABLE_STATUSES.includes(
        status
    );

};


/* =========================================================
   IS APPROVAL PENDING
   ========================================================= */

export const isGRNApprovalPending = (
    status
) => {

    return GRN_APPROVAL_STATUSES.includes(
        status
    );

};


/* =========================================================
   IS FINAL
   ========================================================= */

export const isGRNFinal = (
    status
) => {

    return GRN_FINAL_STATUSES.includes(
        status
    );

};


/* =========================================================
   IS READ ONLY
   ========================================================= */

export const isGRNReadOnly = (
    status
) => {

    return GRN_READ_ONLY_STATUSES.includes(
        status
    );

};

/* =========================================================
   IS STOCK POSTING COMPLETED
   ========================================================= */

export const isGRNStockPosted = (
    stockPostingStatus
) => {

    return (
        stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.POSTED
    );

};


/* =========================================================
   IS STOCK POSTING FAILED
   ========================================================= */

export const isGRNStockPostingFailed = (
    stockPostingStatus
) => {

    return (
        stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.FAILED
    );

};


/* =========================================================
   IS STOCK POSTING PENDING
   ========================================================= */

export const isGRNStockPostingPending = (
    stockPostingStatus
) => {

    return (
        stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.PENDING
    );

};


/* =========================================================
   CAN POST STOCK
   ========================================================= */

export const canPostGRNStock = (
    grn = {}
) => {

    const status =
        grn?.status;


    const stockPostingStatus =
        grn?.stockPostingStatus;


    if (
        isGRNStockPosted(
            stockPostingStatus
        )
    ) {

        return false;

    }


    if (
        isGRNStockPostingPending(
            stockPostingStatus
        )
    ) {

        return false;

    }


    if (
        status !==
        GRN_STATUS.APPROVED
    ) {

        return false;

    }


    return (
        stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.NOT_POSTED ||
        stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.FAILED ||
        !stockPostingStatus
    );

};


/* =========================================================
   CAN RETRY STOCK POSTING
   ========================================================= */

export const canRetryGRNStockPosting = (
    grn = {}
) => {

    return (
        grn?.stockPostingStatus ===
        GRN_STOCK_POSTING_STATUS.FAILED
    );

};
/* =========================================================
   IS DRAFT
   ========================================================= */

export const isGRNDraft = (
    status
) => {

    return status ===
        GRN_STATUS.DRAFT;

};


/* =========================================================
   IS REJECTED
   ========================================================= */

export const isGRNRejected = (
    status
) => {

    return status ===
        GRN_STATUS.REJECTED;

};


/* =========================================================
   IS APPROVED
   ========================================================= */

export const isGRNApproved = (
    status
) => {

    return (
        status ===
        GRN_STATUS.APPROVED ||

        status ===
        GRN_STATUS.STOCK_POSTED ||

        status ===
        GRN_STATUS.COMPLETED
    );

};


/* =========================================================
   IS CANCELLED
   ========================================================= */

export const isGRNCancelled = (
    status
) => {

    return status ===
        GRN_STATUS.CANCELLED;

};

/* =========================================================
   GET STATUS LABEL
   ========================================================= */

export const getGRNStatusLabel = (
    status
) => {

    return (
        GRN_STATUS_LABELS?.[
        status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   GET TYPE LABEL
   ========================================================= */

export const getGRNTypeLabel = (
    type
) => {

    return (
        GRN_TYPE_LABELS?.[
        type
        ] ||
        type ||
        "-"
    );

};


/* =========================================================
   GET QUALITY STATUS LABEL
   ========================================================= */

export const getGRNQualityStatusLabel = (
    status
) => {

    return (
        GRN_QUALITY_STATUS_LABELS?.[
        status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   GET INSPECTION STATUS LABEL
   ========================================================= */

export const getGRNInspectionStatusLabel = (
    status
) => {

    return (
        GRN_INSPECTION_STATUS_LABELS?.[
        status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   GET RECEIVING MODE LABEL
   ========================================================= */

export const getGRNReceivingModeLabel = (
    mode
) => {

    return (
        GRN_RECEIVING_MODE_LABELS?.[
        mode
        ] ||
        mode ||
        "-"
    );

};


/* =========================================================
   GET STOCK POSTING LABEL
   ========================================================= */

export const getGRNStockPostingStatusLabel = (
    status
) => {

    return (
        GRN_STOCK_POSTING_STATUS_LABELS?.[
        status
        ] ||
        status ||
        "-"
    );

};


/* =========================================================
   STATUS COLOR
   ========================================================= */

export const getGRNStatusColor = (
    status
) => {

    switch (
    status
    ) {

        case GRN_STATUS.DRAFT:

            return "default";


        case GRN_STATUS.SUBMITTED:

            return "blue";


        case GRN_STATUS.PENDING_APPROVAL:

            return "orange";


        case GRN_STATUS.APPROVED:

            return "green";


        case GRN_STATUS.REJECTED:

            return "red";


        case GRN_STATUS.CANCELLED:

            return "default";


        case GRN_STATUS.STOCK_POSTED:

            return "cyan";


        case GRN_STATUS.COMPLETED:

            return "green";


        default:

            return "default";

    }

};


/* =========================================================
   QUALITY STATUS COLOR
   ========================================================= */

export const getGRNQualityStatusColor = (
    status
) => {

    switch (
    status
    ) {

        case GRN_QUALITY_STATUS.PENDING:

            return "orange";


        case GRN_QUALITY_STATUS.ACCEPTED:

            return "green";


        case GRN_QUALITY_STATUS.PARTIALLY_ACCEPTED:

            return "blue";


        case GRN_QUALITY_STATUS.REJECTED:

            return "red";


        case GRN_QUALITY_STATUS.DAMAGED:

            return "red";


        case GRN_QUALITY_STATUS.ON_HOLD:

            return "orange";


        default:

            return "default";

    }

};


/* =========================================================
   INSPECTION STATUS COLOR
   ========================================================= */

export const getGRNInspectionStatusColor = (
    status
) => {

    switch (
    status
    ) {

        case GRN_INSPECTION_STATUS.NOT_REQUIRED:

            return "default";


        case GRN_INSPECTION_STATUS.PENDING:

            return "orange";


        case GRN_INSPECTION_STATUS.IN_PROGRESS:

            return "blue";


        case GRN_INSPECTION_STATUS.PASSED:

            return "green";


        case GRN_INSPECTION_STATUS.FAILED:

            return "red";


        case GRN_INSPECTION_STATUS.PARTIALLY_PASSED:

            return "orange";


        default:

            return "default";

    }

};


/* =========================================================
   RECEIVING MODE LABEL + COLOR
   ========================================================= */

export const getGRNReceivingModeColor = (
    mode
) => {

    switch (
    mode
    ) {

        case GRN_RECEIVING_MODE.FULL:

            return "green";


        case GRN_RECEIVING_MODE.PARTIAL:

            return "blue";


        default:

            return "default";

    }

};


/* =========================================================
   STOCK POSTING COLOR
   ========================================================= */

export const getGRNStockPostingStatusColor = (
    status
) => {

    switch (
    status
    ) {

        case GRN_STOCK_POSTING_STATUS.NOT_POSTED:

            return "default";


        case GRN_STOCK_POSTING_STATUS.PENDING:

            return "orange";


        case GRN_STOCK_POSTING_STATUS.POSTED:

            return "green";


        case GRN_STOCK_POSTING_STATUS.FAILED:

            return "red";


        default:

            return "default";

    }

};


/* =========================================================
   PREPARE ITEM PAYLOAD
   ========================================================= */

export const prepareGRNItemPayload = (
    item = {}
) => {

    const normalized =
        normalizeGRNItem(
            item
        );


    return {

        id:
            normalized?.id ??
            null,

        purchaseOrderItemId:
            normalized?.purchaseOrderItemId ??
            null,

        drugId:
            normalized?.drugId ??
            null,

        itemCode:
            normalizeText(
                normalized?.itemCode
            ),

        itemName:
            normalizeText(
                normalized?.itemName
            ),

        uomId:
            normalized?.uomId ??
            null,

        orderedQuantity:
            toNumber(
                normalized?.orderedQuantity
            ),

        previouslyReceivedQuantity:
            toNumber(
                normalized?.previouslyReceivedQuantity
            ),

        pendingQuantity:
            toNumber(
                normalized?.pendingQuantity
            ),

        receivedQuantity:
            toNumber(
                normalized?.receivedQuantity
            ),

        acceptedQuantity:
            toNumber(
                normalized?.acceptedQuantity
            ),

        rejectedQuantity:
            toNumber(
                normalized?.rejectedQuantity
            ),

        damagedQuantity:
            toNumber(
                normalized?.damagedQuantity
            ),

        batchNumber:
            normalizeText(
                normalized?.batchNumber
            ),

        manufacturingDate:
            normalizeDate(
                normalized?.manufacturingDate
            ),

        expiryDate:
            normalizeDate(
                normalized?.expiryDate
            ),

        mrp:
            toNumber(
                normalized?.mrp
            ),

        purchaseRate:
            toNumber(
                normalized?.purchaseRate
            ),

        discountPercent:
            toNumber(
                normalized?.discountPercent
            ),

        discountAmount:
            toNumber(
                normalized?.discountAmount
            ),

        taxableAmount:
            toNumber(
                normalized?.taxableAmount
            ),

        taxPercent:
            toNumber(
                normalized?.taxPercent
            ),

        taxAmount:
            toNumber(
                normalized?.taxAmount
            ),

        lineTotal:
            toNumber(
                normalized?.lineTotal
            ),

        qualityStatus:
            normalized?.qualityStatus ??
            GRN_QUALITY_STATUS.PENDING,

        rejectionReason:
            normalizeText(
                normalized?.rejectionReason
            ),

        damageReason:
            normalizeText(
                normalized?.damageReason
            ),

        remarks:
            normalizeText(
                normalized?.remarks
            ),

    };

};
/* =========================================================
   PREPARE GRN PAYLOAD
   ========================================================= */

export const prepareGRNPayload = (
    values = {}
) => {

    const items =
        normalizeGRNItems(
            values?.items
        );


    const totals =
        calculateGRNTotals(
            items,
            values
        );


    return {

        id:
            values?.id ??
            null,

        grnNumber:
            normalizeText(
                values?.grnNumber
            ),

        grnDate:
            normalizeDate(
                values?.grnDate
            ),

        grnType:
            values?.grnType ??
            GRN_TYPE.STANDARD,

        status:
            values?.status ??
            GRN_STATUS.DRAFT,

        purchaseOrderId:
            values?.purchaseOrderId ??
            null,

        purchaseOrderNumber:
            normalizeText(
                values?.purchaseOrderNumber
            ),

        supplierId:
            values?.supplierId ??
            null,

        supplierCode:
            normalizeText(
                values?.supplierCode
            ),

        supplierName:
            normalizeText(
                values?.supplierName
            ),

        storeId:
            values?.storeId ??
            null,

        storeName:
            normalizeText(
                values?.storeName
            ),

        invoiceNumber:
            normalizeText(
                values?.invoiceNumber
            ),

        invoiceDate:
            normalizeDate(
                values?.invoiceDate
            ),

        receivingMode:
            values?.receivingMode ??
            getReceivingModeFromItems(
                items
            ),

        qualityStatus:
            values?.qualityStatus ??
            GRN_QUALITY_STATUS.PENDING,

        inspectionStatus:
            values?.inspectionStatus ??
            GRN_INSPECTION_STATUS.NOT_STARTED,

        stockPostingStatus:
            values?.stockPostingStatus ??
            GRN_STOCK_POSTING_STATUS.NOT_POSTED,

        remarks:
            normalizeText(
                values?.remarks
            ),

        supplierRemarks:
            normalizeText(
                values?.supplierRemarks
            ),

        internalRemarks:
            normalizeText(
                values?.internalRemarks
            ),

        items:
            items.map(
                prepareGRNItemPayload
            ),

        totalItems:
            totals.totalItems,

        totalOrderedQuantity:
            totals.totalOrderedQuantity,

        totalPendingQuantity:
            totals.totalPendingQuantity,

        totalReceivedQuantity:
            totals.totalReceivedQuantity,

        totalAcceptedQuantity:
            totals.totalAcceptedQuantity,

        totalRejectedQuantity:
            totals.totalRejectedQuantity,

        totalDamagedQuantity:
            totals.totalDamagedQuantity,

        subtotal:
            totals.subtotal,

        discountAmount:
            totals.discountAmount,

        taxAmount:
            totals.taxAmount,

        otherCharges:
            totals.otherCharges,

        roundOff:
            totals.roundOff,

        grandTotal:
            totals.grandTotal,

    };

};


/* =========================================================
   GET RECEIVING MODE FROM ITEMS
   ========================================================= */

export const getReceivingModeFromItems = (
    items = []
) => {

    const safeItems =
        safeArray(
            items
        );


    if (
        safeItems.length ===
        0
    ) {

        return GRN_RECEIVING_MODE.FULL;

    }


    let hasPartial =
        false;


    let hasShort =
        false;


    let hasExcess =
        false;


    safeItems.forEach(
        (
            item
        ) => {

            const ordered =
                Math.max(
                    0,
                    toNumber(
                        item?.orderedQuantity
                    )
                );


            const received =
                Math.max(
                    0,
                    toNumber(
                        item?.receivedQuantity
                    )
                );


            if (
                received >
                ordered
            ) {

                hasExcess =
                    true;

                return;

            }


            if (
                received <
                ordered
            ) {

                hasPartial =
                    true;

            }


            if (
                received ===
                0 &&
                ordered >
                0
            ) {

                hasShort =
                    true;

            }

        }
    );


    if (
        hasExcess
    ) {

        return GRN_RECEIVING_MODE.EXCESS;

    }


    if (
        hasShort
    ) {

        return GRN_RECEIVING_MODE.SHORT;

    }


    if (
        hasPartial
    ) {

        return GRN_RECEIVING_MODE.PARTIAL;

    }


    return GRN_RECEIVING_MODE.FULL;

};


/* =========================================================
   GET GRN SUMMARY
   ========================================================= */

export const getGRNSummary = (
    values = {}
) => {

    const items =
        safeArray(
            values?.items
        );


    const totals =
        calculateGRNTotals(
            items,
            values
        );


    return {

        status:
            values?.status ??
            GRN_STATUS.DRAFT,

        statusLabel:
            getGRNStatusLabel(
                values?.status ??
                GRN_STATUS.DRAFT
            ),

        type:
            values?.grnType ??
            GRN_TYPE.STANDARD,

        typeLabel:
            getGRNTypeLabel(
                values?.grnType ??
                GRN_TYPE.STANDARD
            ),

        qualityStatus:
            values?.qualityStatus ??
            GRN_QUALITY_STATUS.PENDING,

        qualityStatusLabel:
            getGRNQualityStatusLabel(
                values?.qualityStatus ??
                GRN_QUALITY_STATUS.PENDING
            ),

        inspectionStatus:
            values?.inspectionStatus ??
            GRN_INSPECTION_STATUS.NOT_STARTED,

        inspectionStatusLabel:
            getGRNInspectionStatusLabel(
                values?.inspectionStatus ??
                GRN_INSPECTION_STATUS.NOT_STARTED
            ),

        receivingMode:
            values?.receivingMode ??
            getReceivingModeFromItems(
                items
            ),

        receivingModeLabel:
            getGRNReceivingModeLabel(
                values?.receivingMode ??
                getReceivingModeFromItems(
                    items
                )
            ),

        stockPostingStatus:
            values?.stockPostingStatus ??
            GRN_STOCK_POSTING_STATUS.NOT_POSTED,

        stockPostingStatusLabel:
            getGRNStockPostingStatusLabel(
                values?.stockPostingStatus ??
                GRN_STOCK_POSTING_STATUS.NOT_POSTED
            ),

        ...totals,

    };

};


/* =========================================================
   GET GRN ITEM STATUS COLOR
   ========================================================= */

export const getGRNItemStatusColor = (
    status
) => {

    switch (
    status
    ) {

        case "ACCEPTED":

            return "green";


        case "PARTIALLY_ACCEPTED":

            return "blue";


        case "REJECTED":

            return "red";


        case "DAMAGED":

            return "red";


        case "EXPIRED":

            return "red";


        case "QUARANTINED":

            return "orange";


        case "POSTED":

            return "cyan";


        case "CANCELLED":

            return "default";


        case "PENDING":

        default:

            return "default";

    }

};


/* =========================================================
   GET GRN ITEM STATUS LABEL
   ========================================================= */

export const getGRNItemStatusLabel = (
    status
) => {

    const labels = {

        PENDING:
            "Pending",

        ACCEPTED:
            "Accepted",

        PARTIALLY_ACCEPTED:
            "Partially Accepted",

        REJECTED:
            "Rejected",

        DAMAGED:
            "Damaged",

        EXPIRED:
            "Expired",

        QUARANTINED:
            "Quarantined",

        POSTED:
            "Posted",

        CANCELLED:
            "Cancelled",

    };


    return (
        labels?.[
        status
        ] ||
        status ||
        "-"
    );

};
