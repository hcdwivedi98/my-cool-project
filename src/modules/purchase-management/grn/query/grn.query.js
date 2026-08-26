// src/modules/purchase-management/grn/query/grn.query.js


import {
    GRN_STATUS,
    GRN_TYPE,
    GRN_QUALITY_STATUS,
    GRN_INSPECTION_STATUS,
    GRN_RECEIVING_MODE,
    GRN_STOCK_POSTING_STATUS,
    GRN_DEFAULT_PAGE_SIZE,
} from "../constants/grn.constants";


/* =========================================================
   SAFE ARRAY
   ========================================================= */

const safeArray = (
    value
) => {

    return Array.isArray(
        value
    )
        ? value
        : [];

};


/* =========================================================
   NORMALIZE SEARCH
   ========================================================= */

const normalizeSearch = (
    value
) => {

    return String(
        value ?? ""
    )
        .trim()
        .toLowerCase();

};


/* =========================================================
   TO NUMBER
   ========================================================= */

const toNumber = (
    value
) => {

    const number =
        Number(
            value
        );

    return Number.isFinite(
        number
    )
        ? number
        : 0;

};


/* =========================================================
   DATE VALUE
   ========================================================= */

const dateTime =
    (
        value
    ) => {

        if (!value) {
            return null;
        }

        const date =
            new Date(
                value
            );

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return null;
        }

        return date.getTime();

    };


/* =========================================================
   DEFAULT QUERY
   ========================================================= */

export const DEFAULT_GRN_QUERY = {

    search:
        "",

    status:
        undefined,

    grnType:
        undefined,

    supplierId:
        undefined,

    storeId:
        undefined,

    purchaseOrderId:
        undefined,

    inspectionStatus:
        undefined,

    stockPostingStatus:
        undefined,

    receivingMode:
        undefined,

    qualityStatus:
        undefined,

    dateFrom:
        null,

    dateTo:
        null,

    page:
        1,

    pageSize:
        GRN_DEFAULT_PAGE_SIZE,

    sortField:
        "grnDate",

    sortOrder:
        "descend",

};


/* =========================================================
   NORMALIZE QUERY
   ========================================================= */

export const normalizeGRNQuery = (
    query = {}
) => {

    return {

        ...DEFAULT_GRN_QUERY,

        ...query,

        search:
            normalizeSearch(
                query?.search
            ),

        page:
            Math.max(
                1,
                toNumber(
                    query?.page ||
                    DEFAULT_GRN_QUERY.page
                )
            ),

        pageSize:
            Math.max(
                1,
                toNumber(
                    query?.pageSize ||
                    DEFAULT_GRN_QUERY.pageSize
                )
            ),

    };

};


/* =========================================================
   MATCH SEARCH
   ========================================================= */

const matchesSearch = (
    record,
    search
) => {

    if (!search) {
        return true;
    }


    const searchableValues = [

        record?.grnNumber,

        record?.purchaseOrderNumber,

        record?.supplierCode,

        record?.supplierName,

        record?.storeName,

        record?.invoiceNumber,

        record?.challanNumber,

        record?.vehicleNumber,

        record?.receiverName,

    ];


    return searchableValues.some(
        value =>
            normalizeSearch(
                value
            ).includes(
                search
            )
    );

};


/* =========================================================
   MATCH DATE RANGE
   ========================================================= */

const matchesDateRange = (
    record,
    query
) => {

    const recordDate =
        dateTime(
            record?.grnDate
        );


    if (
        !recordDate
    ) {
        return true;
    }


    const from =
        dateTime(
            query?.dateFrom
        );


    const to =
        dateTime(
            query?.dateTo
        );


    if (
        from &&
        recordDate <
        from
    ) {

        return false;

    }


    if (
        to
    ) {

        const endOfDay =
            new Date(
                to
            );


        endOfDay.setHours(
            23,
            59,
            59,
            999
        );


        if (
            recordDate >
            endOfDay.getTime()
        ) {

            return false;

        }

    }


    return true;

};


/* =========================================================
   MATCH SINGLE FILTER
   ========================================================= */

const matchesValue = (
    recordValue,
    filterValue
) => {

    if (
        filterValue ===
        undefined ||
        filterValue ===
        null ||
        filterValue ===
        ""
    ) {

        return true;

    }


    if (
        Array.isArray(
            filterValue
        )
    ) {

        if (
            filterValue.length ===
            0
        ) {

            return true;

        }


        return filterValue.some(
            value =>
                String(
                    value
                ) ===
                String(
                    recordValue
                )
        );

    }


    return (
        String(
            recordValue
        ) ===
        String(
            filterValue
        )
    );

};


/* =========================================================
   MATCH QUALITY STATUS
   ========================================================= */

const matchesQualityStatus = (
    record,
    qualityStatus
) => {

    if (
        !qualityStatus
    ) {

        return true;

    }


    const items =
        safeArray(
            record?.items
        );


    if (
        items.length ===
        0
    ) {

        return false;

    }


    return items.some(
        item =>
            String(
                item?.qualityStatus
            ) ===
            String(
                qualityStatus
            )
    );

};


/* =========================================================
   FILTER GRN LIST
   ========================================================= */

export const filterGRNs = (
    records,
    query = {}
) => {

    const safeRecords =
        safeArray(
            records
        );


    const normalizedQuery =
        normalizeGRNQuery(
            query
        );


    return safeRecords.filter(
        record => {

            if (
                !matchesSearch(
                    record,
                    normalizedQuery.search
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.status,
                    normalizedQuery.status
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.grnType,
                    normalizedQuery.grnType
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.supplierId,
                    normalizedQuery.supplierId
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.storeId,
                    normalizedQuery.storeId
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.purchaseOrderId,
                    normalizedQuery.purchaseOrderId
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.inspectionStatus,
                    normalizedQuery.inspectionStatus
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.stockPostingStatus,
                    normalizedQuery.stockPostingStatus
                )
            ) {

                return false;

            }


            if (
                !matchesValue(
                    record?.receivingMode,
                    normalizedQuery.receivingMode
                )
            ) {

                return false;

            }


            if (
                !matchesQualityStatus(
                    record,
                    normalizedQuery.qualityStatus
                )
            ) {

                return false;

            }


            if (
                !matchesDateRange(
                    record,
                    normalizedQuery
                )
            ) {

                return false;

            }


            return true;

        }
    );

};


/* =========================================================
   SORT GRNS
   ========================================================= */

export const sortGRNs = (
    records,
    sortField = "grnDate",
    sortOrder = "descend"
) => {

    const safeRecords =
        safeArray(
            records
        );


    const sorted =
        [
            ...safeRecords,
        ];


    sorted.sort(
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
                undefined ||
                firstValue ===
                null
            ) {

                return 1;

            }


            if (
                secondValue ===
                undefined ||
                secondValue ===
                null
            ) {

                return -1;

            }


            let comparison;


            if (
                sortField ===
                "grnDate"
            ) {

                comparison =
                    (
                        dateTime(
                            firstValue
                        ) || 0
                    ) -
                    (
                        dateTime(
                            secondValue
                        ) || 0
                    );

            }
            else if (
                typeof firstValue ===
                    "number" ||
                typeof secondValue ===
                    "number"
            ) {

                comparison =
                    toNumber(
                        firstValue
                    ) -
                    toNumber(
                        secondValue
                    );

            }
            else {

                comparison =
                    String(
                        firstValue
                    ).localeCompare(
                        String(
                            secondValue
                        )
                    );

            }


            return sortOrder ===
                "ascend"
                ? comparison
                : -comparison;

        }
    );


    return sorted;

};


/* =========================================================
   PAGINATE
   ========================================================= */

export const paginateGRNs = (
    records,
    page = 1,
    pageSize = GRN_DEFAULT_PAGE_SIZE
) => {

    const safeRecords =
        safeArray(
            records
        );


    const safePage =
        Math.max(
            1,
            toNumber(
                page
            )
        );


    const safePageSize =
        Math.max(
            1,
            toNumber(
                pageSize
            )
        );


    const total =
        safeRecords.length;


    const start =
        (
            safePage -
            1
        ) *
        safePageSize;


    const end =
        start +
        safePageSize;


    return {

        data:
            safeRecords.slice(
                start,
                end
            ),

        total,

        page:
            safePage,

        pageSize:
            safePageSize,

        totalPages:
            Math.ceil(
                total /
                safePageSize
            ),

    };

};


/* =========================================================
   BUILD GRN QUERY RESULT
   ========================================================= */

export const queryGRNs = (
    records,
    query = {}
) => {

    const normalizedQuery =
        normalizeGRNQuery(
            query
        );


    const filtered =
        filterGRNs(
            records,
            normalizedQuery
        );


    const sorted =
        sortGRNs(
            filtered,
            normalizedQuery.sortField,
            normalizedQuery.sortOrder
        );


    const paginated =
        paginateGRNs(
            sorted,
            normalizedQuery.page,
            normalizedQuery.pageSize
        );


    return {

        ...paginated,

        filteredTotal:
            filtered.length,

        totalBeforeFilter:
            safeArray(
                records
            ).length,

        query:
            normalizedQuery,

    };

};


/* =========================================================
   GET ACTIVE FILTER COUNT
   ========================================================= */

export const getGRNActiveFilterCount = (
    query = {}
) => {

    const normalizedQuery =
        normalizeGRNQuery(
            query
        );


    const filterKeys = [

        "status",

        "grnType",

        "supplierId",

        "storeId",

        "purchaseOrderId",

        "inspectionStatus",

        "stockPostingStatus",

        "receivingMode",

        "qualityStatus",

        "dateFrom",

        "dateTo",

    ];


    return filterKeys.filter(
        key => {

            const value =
                normalizedQuery?.[
                    key
                ];


            if (
                value ===
                undefined ||
                value ===
                null ||
                value ===
                ""
            ) {

                return false;

            }


            if (
                Array.isArray(
                    value
                )
            ) {

                return value.length >
                    0;

            }


            return true;

        }
    ).length;

};


/* =========================================================
   HAS ACTIVE FILTERS
   ========================================================= */

export const hasGRNActiveFilters = (
    query = {}
) => {

    return (
        getGRNActiveFilterCount(
            query
        ) > 0
    );

};


/* =========================================================
   RESET QUERY
   ========================================================= */

export const resetGRNQuery = () => {

    return {

        ...DEFAULT_GRN_QUERY,

    };

};


/* =========================================================
   BUILD TABLE QUERY
   ========================================================= */

export const buildGRNTableQuery = ({
    pagination = {},
    filters = {},
    sorter = {},
    search = "",
} = {}) => {

    return normalizeGRNQuery({

        ...filters,

        search,

        page:
            pagination?.current ||
            1,

        pageSize:
            pagination?.pageSize ||
            GRN_DEFAULT_PAGE_SIZE,

        sortField:
            sorter?.field ||
            "grnDate",

        sortOrder:
            sorter?.order ||
            "descend",

    });

};


/* =========================================================
   GET SUMMARY
   ========================================================= */

export const getGRNQuerySummary = (
    records
) => {

    const safeRecords =
        safeArray(
            records
        );


    return {

        total:
            safeRecords.length,

        draft:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.DRAFT
            ).length,

        submitted:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.SUBMITTED
            ).length,

        pendingApproval:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.PENDING_APPROVAL
            ).length,

        approved:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.APPROVED
            ).length,

        rejected:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.REJECTED
            ).length,

        cancelled:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.CANCELLED
            ).length,

        stockPosted:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.STOCK_POSTED
            ).length,

        completed:
            safeRecords.filter(
                item =>
                    item?.status ===
                    GRN_STATUS.COMPLETED
            ).length,

        totalReceivedQuantity:
            safeRecords.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.totalReceivedQuantity
                    ),
                0
            ),

        totalAcceptedQuantity:
            safeRecords.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.totalAcceptedQuantity
                    ),
                0
            ),

        totalRejectedQuantity:
            safeRecords.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.totalRejectedQuantity
                    ),
                0
            ),

        totalValue:
            safeRecords.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    toNumber(
                        item?.grandTotal
                    ),
                0
            ),

    };

};


/* =========================================================
   EXPORT CONSTANT FILTER VALUES
   ========================================================= */

export const GRN_QUERY_FILTERS = {

    STATUS:
        "status",

    TYPE:
        "grnType",

    SUPPLIER:
        "supplierId",

    STORE:
        "storeId",

    PURCHASE_ORDER:
        "purchaseOrderId",

    INSPECTION:
        "inspectionStatus",

    STOCK_POSTING:
        "stockPostingStatus",

    RECEIVING_MODE:
        "receivingMode",

    QUALITY:
        "qualityStatus",

    DATE_FROM:
        "dateFrom",

    DATE_TO:
        "dateTo",

};


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

export default queryGRNs;