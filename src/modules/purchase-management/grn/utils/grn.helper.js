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
                    item?.acceptedQuantity,
                    receivedQuantity -
                    rejectedQuantity
                )
            )
        );


    const pendingQuantity =
        getPendingQuantity(
            item
        );


    const outstandingQuantity =
        Math.max(
            0,
            pendingQuantity -
            receivedQuantity
        );


    return {

        ...item,

        orderedQuantity:
            Math.max(
                0,
                toNumber(
                    item?.orderedQuantity
                )
            ),

        previouslyReceivedQuantity:
            Math.max(
                0,
                toNumber(
                    item?.previouslyReceivedQuantity
                )
            ),

        pendingQuantity,

        receivedQuantity,

        acceptedQuantity,

        rejectedQuantity,

        damagedQuantity,

        outstandingQuantity,

        purchaseRate:
            Math.max(
                0,
                toNumber(
                    item?.purchaseRate ??
                    item?.unitRate
                )
            ),

        discountPercent:
            Math.max(
                0,
                toNumber(
                    item?.discountPercent
                )
            ),

        discountAmount:
            calculateLineDiscount(
                {
                    ...item,
                    receivedQuantity,
                }
            ),

        taxableAmount:
            calculateTaxableAmount(
                {
                    ...item,
                    receivedQuantity,
                }
            ),

        taxPercent:
            Math.max(
                0,
                toNumber(
                    item?.taxPercent
                )
            ),

        taxAmount:
            calculateTaxAmount(
                {
                    ...item,
                    receivedQuantity,
                }
            ),

        lineTotal:
            calculateLineTotal(
                {
                    ...item,
                    receivedQuantity,
                }
            ),

    };

};


/* =========================================================
   NORMALIZE GRN ITEMS
   ========================================================= */

export const normalizeGRNItems = (
    items
) => {

    return safeArray(
        items
    ).map(
        normalizeGRNItem
    );

};


/* =========================================================
   CALCULATE GRN TOTALS
   ========================================================= */

export const calculateGRNTotals = (
    items,
    extraCharges = {}
) => {

    const normalizedItems =
        normalizeGRNItems(
            items
        );


    const subtotal =
        roundMoney(
            normalizedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.taxableAmount
                    ),
                0
            )
        );


    const discountAmount =
        roundMoney(
            normalizedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.discountAmount
                    ),
                0
            )
        );


    const taxAmount =
        roundMoney(
            normalizedItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.taxAmount
                    ),
                0
            )
        );


    const otherCharges =
        roundMoney(
            toNumber(
                extraCharges?.otherCharges
            )
        );


    const roundOff =
        roundMoney(
            toNumber(
                extraCharges?.roundOff
            )
        );


    const grandTotal =
        roundMoney(
            subtotal +
            taxAmount +
            otherCharges +
            roundOff
        );


    const totalItems =
        normalizedItems.length;


    const totalOrderedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.orderedQuantity
                ),
            0
        );


    const totalPreviouslyReceivedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.previouslyReceivedQuantity
                ),
            0
        );


    const totalPendingQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.pendingQuantity
                ),
            0
        );


    const totalReceivedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.receivedQuantity
                ),
            0
        );


    const totalAcceptedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.acceptedQuantity
                ),
            0
        );


    const totalRejectedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.rejectedQuantity
                ),
            0
        );


    const totalDamagedQuantity =
        normalizedItems.reduce(
            (
                total,
                item
            ) =>
                total +
                toNumber(
                    item?.damagedQuantity
                ),
            0
        );


    return {

        items:
            normalizedItems,

        totalItems,

        totalOrderedQuantity,

        totalPreviouslyReceivedQuantity,

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
        toNumber(
            item?.receivedQuantity
        );


    const pending =
        getPendingQuantity(
            item
        );


    if (
        GRN_QUANTITY_RULES.ALLOW_NEGATIVE ===
        false &&
        received < 0
    ) {

        errors.push(
            "Received quantity cannot be negative."
        );

    }


    if (
        GRN_QUANTITY_RULES.ALLOW_OVER_RECEIPT ===
        false &&
        received >
        pending
    ) {

        errors.push(
            `Received quantity cannot exceed pending quantity (${pending}).`
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


    if (
        GRN_BATCH_RULES.REQUIRE_BATCH_NUMBER &&
        !batchNumber
    ) {

        errors.push(
            "Batch number is required."
        );

    }


    if (
        GRN_BATCH_RULES.REQUIRE_MANUFACTURING_DATE &&
        !manufacturingDate
    ) {

        errors.push(
            "Manufacturing date is required."
        );

    }


    if (
        GRN_BATCH_RULES.REQUIRE_EXPIRY_DATE &&
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


    if (
        !expiryTime
    ) {

        if (
            GRN_BATCH_RULES.REQUIRE_EXPIRY_DATE
        ) {

            errors.push(
                "Expiry date is required."
            );

        }


        return errors;

    }


    if (
        grnTime &&
        expiryTime <=
        grnTime &&
        !GRN_BATCH_RULES.ALLOW_EXPIRED_BATCH
    ) {

        errors.push(
            "Expiry date must be after the GRN date."
        );

    }


    const manufacturingTime =
        dateOnlyTime(
            item?.manufacturingDate
        );


    if (
        manufacturingTime &&
        expiryTime <=
        manufacturingTime
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
            GRN_BATCH_RULES.REQUIRE_MANUFACTURING_DATE
        ) {

            errors.push(
                "Manufacturing date is required."
            );

        }


        return errors;

    }


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
   VALIDATE SINGLE ITEM
   ========================================================= */

export const validateGRNItem = (
    item = {},
    options = {}
) => {

    const errors = [];


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


    const received =
        toNumber(
            item?.receivedQuantity
        );


    if (
        received > 0
    ) {

        errors.push(
            ...validateGRNBatch(
                item
            )
        );


        errors.push(
            ...validateGRNExpiry(
                item,
                options?.grnDate
            )
        );


        errors.push(
            ...validateManufacturingDate(
                item,
                options?.grnDate
            )
        );

    }


    return errors;

};


/* =========================================================
   VALIDATE ALL ITEMS
   ========================================================= */

export const validateGRNItems = (
    items,
    options = {}
) => {

    const errors = [];


    safeArray(
        items
    ).forEach(
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
                message => {

                    errors.push({

                        field:
                            [
                                "items",
                                index,
                            ],

                        index,

                        message,

                    });

                }
            );

        }
    );


    return errors;

};


/* =========================================================
   VALIDATE HEADER
   ========================================================= */

export const validateGRNHeader = (
    values = {}
) => {

    const errors = [];


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
   VALIDATE GRN
   ========================================================= */

export const validateGRN = (
    values = {}
) => {

    const errors = [];


    errors.push(
        ...validateGRNHeader(
            values
        )
    );


    const items =
        safeArray(
            values?.items
        );


    if (
        items.length ===
        0
    ) {

        errors.push({

            field:
                [
                    "items",
                ],

            message:
                "At least one GRN item is required.",

        });

    }


    errors.push(
        ...validateGRNItems(
            items,
            {
                grnDate:
                    values?.grnDate,
            }
        )
    );


    const totalReceived =
        items.reduce(
            (
                total,
                item
            ) =>
                total +
                Math.max(
                    0,
                    toNumber(
                        item?.receivedQuantity
                    )
                ),
            0
        );


    if (
        totalReceived <=
        0
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
   VALIDATE GRN - MESSAGE ONLY
   ========================================================= */

export const getGRNValidationMessages = (
    values = {}
) => {

    return validateGRN(
        values
    ).map(
        error =>
            typeof error ===
            "string"
                ? error
                : error?.message
    ).filter(
        Boolean
    );

};


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
            {
                otherCharges:
                    values?.otherCharges,

                roundOff:
                    values?.roundOff,
            }
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

        status:
            values?.status ??
            GRN_STATUS.DRAFT,

        grnType:
            values?.grnType ??
            GRN_TYPE.AGAINST_PO,

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

        receivingLocationId:
            values?.receivingLocationId ??
            null,

        receivingLocationName:
            normalizeText(
                values?.receivingLocationName
            ),

        invoiceNumber:
            normalizeText(
                values?.invoiceNumber
            ),

        invoiceDate:
            normalizeDate(
                values?.invoiceDate
            ),

        challanNumber:
            normalizeText(
                values?.challanNumber
            ),

        challanDate:
            normalizeDate(
                values?.challanDate
            ),

        vehicleNumber:
            normalizeText(
                values?.vehicleNumber
            ),

        transporterName:
            normalizeText(
                values?.transporterName
            ),

        receivedBy:
            values?.receivedBy ??
            null,

        receiverName:
            normalizeText(
                values?.receiverName
            ),

        inspectionRequired:
            values?.inspectionRequired !==
            false,

        inspectionStatus:
            values?.inspectionStatus ??
            GRN_INSPECTION_STATUS.PENDING,

        stockPostingStatus:
            values?.stockPostingStatus ??
            GRN_STOCK_POSTING_STATUS.NOT_POSTED,

        receivingMode:
            values?.receivingMode ??
            GRN_RECEIVING_MODE.FULL,

        totalItems:
            totals.totalItems,

        totalOrderedQuantity:
            totals.totalOrderedQuantity,

        totalPreviouslyReceivedQuantity:
            totals.totalPreviouslyReceivedQuantity,

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

        remarks:
            normalizeText(
                values?.remarks
            ),

        internalRemarks:
            normalizeText(
                values?.internalRemarks
            ),

        items:
            items.map(
                prepareGRNItemPayload
            ),

    };

};


/* =========================================================
   GET RECEIVING MODE
   ========================================================= */

export const getReceivingModeFromItems = (
    items
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


    const hasPartial =
        safeItems.some(
            item => {

                const pending =
                    getPendingQuantity(
                        item
                    );

                const received =
                    Math.max(
                        0,
                        toNumber(
                            item?.receivedQuantity
                        )
                    );


                return (
                    received >
                    0 &&
                    received <
                    pending
                );

            }
        );


    return hasPartial
        ? GRN_RECEIVING_MODE.PARTIAL
        : GRN_RECEIVING_MODE.FULL;

};


/* =========================================================
   GET GRN SUMMARY
   ========================================================= */

export const getGRNSummary = (
    values = {}
) => {

    const totals =
        calculateGRNTotals(
            values?.items,
            {
                otherCharges:
                    values?.otherCharges,

                roundOff:
                    values?.roundOff,
            }
        );


    return {

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

        taxAmount:
            totals.taxAmount,

        grandTotal:
            totals.grandTotal,

    };

};

/* =========================================================
   GRN ITEM STATUS COLOR
   ========================================================= */

export const getGRNItemStatusColor = (
    status
) => {

    const value =
        String(
            status ||
            ""
        )
            .trim()
            .toUpperCase();


    switch (
        value
    ) {

        case "ACCEPTED":
            return "success";


        case "PARTIALLY_ACCEPTED":
            return "warning";


        case "REJECTED":
            return "error";


        case "PARTIALLY_REJECTED":
            return "warning";


        case "RECEIVING":
            return "processing";


        case "COMPLETED":
            return "success";


        case "CANCELLED":
            return "error";


        case "PENDING":
        default:
            return "default";

    }

};

/* =========================================================
   GRN ITEM STATUS LABEL
   ========================================================= */

export const getGRNItemStatusLabel = (
    status
) => {

    const value =
        String(
            status ||
            ""
        )
            .trim()
            .toUpperCase();


    const labels = {

        PENDING:
            "Pending",

        RECEIVING:
            "Receiving",

        ACCEPTED:
            "Accepted",

        PARTIALLY_ACCEPTED:
            "Partially Accepted",

        REJECTED:
            "Rejected",

        PARTIALLY_REJECTED:
            "Partially Rejected",

        COMPLETED:
            "Completed",

        CANCELLED:
            "Cancelled",

    };


    return (
        labels[value] ||
        status ||
        "Pending"
    );

};