// src/modules/purchase-management/grn/pages/GRNPage.jsx

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Alert,
    Button,
    Card,
    Col,
    DatePicker,
    Input,
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Tooltip,
} from "antd";

import {
    DatabaseOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";


import GRNDrawer
    from "../components/GRNDrawer";


import GRNActionModal
    from "../components/GRNActionModal";


import GRNStockPostingModal
    from "../components/GRNStockPostingModal";


import grnService
    from "../services/grn.service";


import {
    GRN_STATUS,
} from "../constants/grn.constants";


import {
    getGRNActions,
} from "../utils/grn.workflow";


/* =========================================================
   STATUS OPTIONS
========================================================= */

const STATUS_OPTIONS = [

    {
        value:
            GRN_STATUS?.DRAFT ||
            "DRAFT",

        label:
            "Draft",
    },

    {
        value:
            GRN_STATUS?.PENDING_APPROVAL ||
            "PENDING_APPROVAL",

        label:
            "Pending Approval",
    },

    {
        value:
            GRN_STATUS?.APPROVED ||
            "APPROVED",

        label:
            "Approved",
    },

    {
        value:
            GRN_STATUS?.REJECTED ||
            "REJECTED",

        label:
            "Rejected",
    },

    {
        value:
            GRN_STATUS?.POSTED ||
            "POSTED",

        label:
            "Posted",
    },

    {
        value:
            GRN_STATUS?.CANCELLED ||
            "CANCELLED",

        label:
            "Cancelled",
    },

];


/* =========================================================
   STATUS COLOR
========================================================= */

const getStatusColor = (
    status
) => {

    const value =
        String(
            status ||
            ""
        )
            .toUpperCase();


    switch (
    value
    ) {

        case "APPROVED":
        case "POSTED":
        case "COMPLETED":

            return "success";


        case "PENDING_APPROVAL":
        case "SUBMITTED":

            return "processing";


        case "REJECTED":
        case "CANCELLED":

            return "error";


        case "DRAFT":
        default:

            return "default";

    }

};


/* =========================================================
   STATUS LABEL
========================================================= */

const getStatusLabel = (
    status
) => {

    const normalizedStatus =
        String(
            status ||
            ""
        )
            .toUpperCase();


    const option =
        STATUS_OPTIONS.find(
            item =>
                String(
                    item.value
                )
                    .toUpperCase() ===
                normalizedStatus
        );


    return (
        option?.label ||
        status ||
        "Draft"
    );

};


/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (
    value
) => {

    if (
        !value
    ) {

        return "-";

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

        return String(
            value
        );

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",
        }
    );

};


/* =========================================================
   PAGE
========================================================= */

const GRNPage = () => {

    const [
        messageApi,
        contextHolder,
    ] =
        message.useMessage();


    /* =====================================================
       DATA
    ===================================================== */

    const [
        data,
        setData,
    ] =
        useState(
            []
        );


    const [
        total,
        setTotal,
    ] =
        useState(
            0
        );


    /* =====================================================
       LOADING
    ===================================================== */

    const [
        loading,
        setLoading,
    ] =
        useState(
            false
        );


    const [
        actionLoading,
        setActionLoading,
    ] =
        useState(
            false
        );


    /* =====================================================
       FILTERS
    ===================================================== */

    const [
        search,
        setSearch,
    ] =
        useState(
            ""
        );


    const [
        status,
        setStatus,
    ] =
        useState(
            undefined
        );


    const [
        dateRange,
        setDateRange,
    ] =
        useState(
            []
        );


    /* =====================================================
       PAGINATION
    ===================================================== */

    const [
        pagination,
        setPagination,
    ] =
        useState({

            current:
                1,

            pageSize:
                10,

        });


    /* =====================================================
       DRAWER
    ===================================================== */

    const [
        drawerOpen,
        setDrawerOpen,
    ] =
        useState(
            false
        );


    const [
        drawerMode,
        setDrawerMode,
    ] =
        useState(
            "CREATE"
        );


    const [
        selectedRecord,
        setSelectedRecord,
    ] =
        useState(
            null
        );


    const [
        auditTrail,
        setAuditTrail,
    ] =
        useState(
            []
        );


    /* =====================================================
       GRN ACTION MODAL
    ===================================================== */

    const [
        actionModalOpen,
        setActionModalOpen,
    ] =
        useState(
            false
        );


    const [
        actionType,
        setActionType,
    ] =
        useState(
            null
        );


    const [
        actionRecord,
        setActionRecord,
    ] =
        useState(
            null
        );


    /* =====================================================
       GRN STOCK POSTING MODAL
    ===================================================== */

    const [
        stockPostingModalOpen,
        setStockPostingModalOpen,
    ] =
        useState(
            false
        );


    const [
        stockPostingRecord,
        setStockPostingRecord,
    ] =
        useState(
            null
        );


    const [
        stockPostingAction,
        setStockPostingAction,
    ] =
        useState(
            "POST"
        );

    /* =====================================================
       LOOKUPS
    ===================================================== */

    const [
        purchaseOrderOptions,
        setPurchaseOrderOptions,
    ] =
        useState(
            []
        );


    const [
        purchaseOrderItems,
        setPurchaseOrderItems,
    ] =
        useState(
            []
        );


    const [
        supplierOptions,
        setSupplierOptions,
    ] =
        useState(
            []
        );


    const [
        storeOptions,
        setStoreOptions,
    ] =
        useState(
            []
        );


    /* =====================================================
       ERROR
    ===================================================== */

    const [
        error,
        setError,
    ] =
        useState(
            ""
        );


    /* =====================================================
       LOAD GRN LIST
    ===================================================== */

    const loadData = useCallback(
        async (
            options = {}
        ) => {

            const page =
                options.page ??
                pagination.current;


            const pageSize =
                options.pageSize ??
                pagination.pageSize;


            setLoading(
                true
            );


            setError(
                ""
            );


            try {

                const response =
                    await grnService.getList({

                        page,

                        pageSize,

                        search:
                            search.trim(),

                        status,

                    });


                const rows =
                    Array.isArray(
                        response?.data
                    )
                        ? response.data
                        : [];


                setData(
                    rows
                );


                setTotal(
                    Number(
                        response?.total ??
                        rows.length
                    )
                );

            }
            catch (
            requestError
            ) {

                console.error(
                    "GRN list error:",
                    requestError
                );


                const errorMessage =
                    requestError?.message ||
                    "Unable to load GRN records.";


                setError(
                    errorMessage
                );


                messageApi.error(
                    errorMessage
                );

            }
            finally {

                setLoading(
                    false
                );

            }

        },
        [
            pagination.current,
            pagination.pageSize,
            search,
            status,
            messageApi,
        ]
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    useEffect(
        () => {

            loadData();

        },
        [
            loadData,
        ]
    );


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    const handleResetFilters = useCallback(
        () => {

            setSearch(
                ""
            );


            setStatus(
                undefined
            );


            setDateRange(
                []
            );


            setPagination(
                current =>
                ({
                    ...current,

                    current:
                        1,

                })
            );

        },
        []
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    const handleSearch = useCallback(
        () => {

            setPagination(
                current =>
                ({
                    ...current,

                    current:
                        1,

                })
            );

        },
        []
    );


    /* =====================================================
       TABLE CHANGE
    ===================================================== */

    const handleTableChange = useCallback(
        (
            tablePagination
        ) => {

            setPagination({

                current:
                    tablePagination.current,

                pageSize:
                    tablePagination.pageSize,

            });

        },
        []
    );


    /* =====================================================
       OPEN CREATE
    ===================================================== */

    const handleCreate = useCallback(
        () => {

            setSelectedRecord(
                null
            );


            setAuditTrail(
                []
            );


            setDrawerMode(
                "CREATE"
            );


            setDrawerOpen(
                true
            );

        },
        []
    );


    /* =====================================================
       OPEN VIEW
    ===================================================== */

    const handleView = useCallback(
        async (
            record
        ) => {

            setActionLoading(
                true
            );


            try {

                let fullRecord =
                    record;


                if (
                    record?.id
                ) {

                    try {

                        const response =
                            await grnService.getById(
                                record.id
                            );


                        if (
                            response
                        ) {

                            fullRecord =
                                response;

                        }

                    }
                    catch (
                    detailError
                    ) {

                        console.warn(
                            "Unable to load GRN detail. Using table record.",
                            detailError
                        );

                    }

                }


                setSelectedRecord(
                    fullRecord
                );


                setAuditTrail(
                    Array.isArray(
                        fullRecord?.auditTrail
                    )
                        ? fullRecord.auditTrail
                        : []
                );


                setDrawerMode(
                    "VIEW"
                );


                setDrawerOpen(
                    true
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        []
    );


    /* =====================================================
       OPEN EDIT
    ===================================================== */

    const handleEdit = useCallback(
        async (
            record
        ) => {

            setActionLoading(
                true
            );


            try {

                let fullRecord =
                    record;


                if (
                    record?.id
                ) {

                    try {

                        const response =
                            await grnService.getById(
                                record.id
                            );


                        if (
                            response
                        ) {

                            fullRecord =
                                response;

                        }

                    }
                    catch (
                    detailError
                    ) {

                        console.warn(
                            "Unable to load GRN detail. Using table record.",
                            detailError
                        );

                    }

                }


                setSelectedRecord(
                    fullRecord
                );


                setAuditTrail(
                    Array.isArray(
                        fullRecord?.auditTrail
                    )
                        ? fullRecord.auditTrail
                        : []
                );


                setDrawerMode(
                    "EDIT"
                );


                setDrawerOpen(
                    true
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        []
    );


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleDrawerClose = useCallback(
        () => {

            if (
                actionLoading
            ) {

                return;

            }


            setDrawerOpen(
                false
            );


            setSelectedRecord(
                null
            );


            setAuditTrail(
                []
            );

        },
        [
            actionLoading,
        ]
    );


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    const handleSaveDraft = useCallback(
        async (
            payload
        ) => {

            setActionLoading(
                true
            );


            try {

                await grnService.saveDraft(
                    payload
                );


                messageApi.success(
                    "GRN draft saved successfully."
                );


                setDrawerOpen(
                    false
                );


                setSelectedRecord(
                    null
                );


                setAuditTrail(
                    []
                );


                setPagination(
                    current =>
                    ({
                        ...current,

                        current:
                            1,

                    })
                );


                await loadData({
                    page:
                        1,
                });

            }
            catch (
            saveError
            ) {

                console.error(
                    "GRN save error:",
                    saveError
                );


                messageApi.error(
                    saveError?.message ||
                    "Unable to save GRN."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        [
            loadData,
            messageApi,
        ]
    );


    /* =====================================================
       SUBMIT FROM DRAWER
    ===================================================== */

    const handleSubmit = useCallback(
        async (
            payload
        ) => {

            setActionLoading(
                true
            );


            try {

                await grnService.submit(
                    payload
                );


                messageApi.success(
                    "GRN submitted successfully."
                );


                setDrawerOpen(
                    false
                );


                setSelectedRecord(
                    null
                );


                setAuditTrail(
                    []
                );


                setPagination(
                    current =>
                    ({
                        ...current,

                        current:
                            1,

                    })
                );


                await loadData({
                    page:
                        1,
                });

            }
            catch (
            submitError
            ) {

                console.error(
                    "GRN submit error:",
                    submitError
                );


                messageApi.error(
                    submitError?.message ||
                    "Unable to submit GRN."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        [
            loadData,
            messageApi,
        ]
    );


    /* =====================================================
       OPEN WORKFLOW ACTION MODAL
    ===================================================== */

    const handleOpenAction = useCallback(
        (
            action,
            record
        ) => {

            if (
                !record
            ) {

                return;

            }


            const allowedActions =
                getGRNActions(
                    record
                );


            if (
                !Array.isArray(
                    allowedActions
                ) ||
                !allowedActions.includes(
                    action
                )
            ) {

                messageApi.warning(
                    "This action is not available for the current GRN status."
                );

                return;

            }


            setActionType(
                action
            );


            setActionRecord(
                record
            );


            setActionModalOpen(
                true
            );

        },
        [
            messageApi,
        ]
    );


    /* =====================================================
       CLOSE WORKFLOW ACTION MODAL
    ===================================================== */

    const handleCloseActionModal = useCallback(
        () => {

            if (
                actionLoading
            ) {

                return;

            }


            setActionModalOpen(
                false
            );


            setActionType(
                null
            );


            setActionRecord(
                null
            );

        },
        [
            actionLoading,
        ]
    );


    /* =====================================================
       EXECUTE GRN WORKFLOW ACTION
    ===================================================== */

    const handleGRNAction = useCallback(
        async ({
            action,
            grn,
            remarks = "",
        }) => {

            if (
                !grn?.id
            ) {

                messageApi.error(
                    "GRN id is missing."
                );

                return;

            }


            setActionLoading(
                true
            );


            try {

                const payload = {

                    id:
                        grn.id,

                    grnId:
                        grn.id,

                    remarks:
                        remarks ||
                        "",

                    action:
                        action,

                };


                switch (
                action
                ) {

                    /* -------------------------------------
                       SUBMIT
                    ------------------------------------- */

                    case "SUBMIT":

                        if (
                            typeof grnService.submit !==
                            "function"
                        ) {

                            throw new Error(
                                "GRN submit service is not available."
                            );

                        }


                        await grnService.submit(
                            payload
                        );

                        break;


                    /* -------------------------------------
                       APPROVE
                    ------------------------------------- */

                    case "APPROVE":

                        if (
                            typeof grnService.approve !==
                            "function"
                        ) {

                            throw new Error(
                                "GRN approve service is not available."
                            );

                        }


                        await grnService.approve(
                            grn.id,
                            payload
                        );

                        break;


                    /* -------------------------------------
                       REJECT
                    ------------------------------------- */

                    case "REJECT":

                        if (
                            typeof grnService.reject !==
                            "function"
                        ) {

                            throw new Error(
                                "GRN reject service is not available."
                            );

                        }


                        await grnService.reject(
                            grn.id,
                            payload
                        );

                        break;


                    /* -------------------------------------
                       DEFAULT
                    ------------------------------------- */

                    default:

                        throw new Error(
                            `Unsupported GRN action: ${action}`
                        );

                }


                const successMessages = {

                    SUBMIT:
                        "GRN submitted successfully.",

                    APPROVE:
                        "GRN approved successfully.",

                    REJECT:
                        "GRN rejected successfully.",

                };


                messageApi.success(
                    successMessages[action] ||
                    "GRN action completed successfully."
                );


                setActionModalOpen(
                    false
                );


                setActionType(
                    null
                );


                setActionRecord(
                    null
                );


                await loadData();

            }
            catch (
            workflowError
            ) {

                console.error(
                    "GRN workflow action error:",
                    workflowError
                );


                messageApi.error(
                    workflowError?.message ||
                    "Unable to process GRN action."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        [
            loadData,
            messageApi,
        ]
    );


    /* =====================================================
   OPEN STOCK POSTING
===================================================== */

    const handleOpenStockPosting = useCallback(
        (
            record
        ) => {

            if (
                !record
            ) {

                return;

            }


            const status =
                String(
                    record?.status ||
                    ""
                )
                    .toUpperCase();


            const stockStatus =
                String(
                    record?.stockPostingStatus ||
                    record?.stockPosting?.status ||
                    record?.stockPostingStatusCode ||
                    "NOT_POSTED"
                )
                    .toUpperCase();


            if (
                status !==
                "APPROVED"
            ) {

                messageApi.warning(
                    "Stock can only be posted for an approved GRN."
                );

                return;

            }


            if (
                stockStatus ===
                "POSTED"
            ) {

                messageApi.info(
                    "Stock has already been posted for this GRN."
                );

                return;

            }


            setStockPostingRecord(
                record
            );


            setStockPostingAction(
                stockStatus ===
                    "FAILED"
                    ? "RETRY"
                    : "POST"
            );


            setStockPostingModalOpen(
                true
            );

        },
        [
            messageApi,
        ]
    );

    /* =====================================================
   CLOSE STOCK POSTING MODAL
===================================================== */

    const handleCloseStockPosting = useCallback(
        () => {

            if (
                actionLoading
            ) {

                return;

            }


            setStockPostingModalOpen(
                false
            );


            setStockPostingRecord(
                null
            );


            setStockPostingAction(
                "POST"
            );

        },
        [
            actionLoading,
        ]
    );

    /* =====================================================
       POST / RETRY STOCK
    ===================================================== */

    const handlePostToInventory = useCallback(
        async (
            values = {}
        ) => {

            const record =
                stockPostingRecord;


            if (
                !record?.id
            ) {

                messageApi.error(
                    "GRN id is missing."
                );

                return;

            }


            const action =
                stockPostingAction;


            setActionLoading(
                true
            );


            try {

                const payload = {

                    ...values,

                    id:
                        record.id,

                    grnId:
                        record.id,

                    action:
                        action ===
                            "RETRY"
                            ? "RETRY_POST_STOCK"
                            : "POST_STOCK",

                };


                let response;


                /* =========================================
                   RETRY
                ========================================= */

                if (
                    action ===
                    "RETRY"
                ) {

                    if (
                        typeof grnService.retryStockPosting !==
                        "function"
                    ) {

                        throw new Error(
                            "GRN retry stock posting service is not available."
                        );

                    }


                    response =
                        await grnService.retryStockPosting(
                            record.id,
                            payload
                        );

                }


                /* =========================================
                   FIRST POST
                ========================================= */

                else {

                    if (
                        typeof grnService.postStock !==
                        "function"
                    ) {

                        throw new Error(
                            "GRN stock posting service is not available."
                        );

                    }


                    response =
                        await grnService.postStock(
                            record.id,
                            payload
                        );

                }


                console.log(
                    "GRN stock posting response:",
                    response
                );


                let verifiedStatus = null;

                if (
                    typeof grnService.getStockPostingStatus ===
                    "function"
                ) {

                    try {

                        verifiedStatus =
                            await grnService.getStockPostingStatus(
                                record.id
                            );

                    }
                    catch (
                    statusError
                    ) {

                        console.warn(
                            "Unable to verify GRN stock posting status.",
                            statusError
                        );

                    }

                }

                const finalStockStatus =
                    String(
                        verifiedStatus?.stockPostingStatus ||
                        verifiedStatus?.status ||
                        response?.stockPostingStatus ||
                        response?.status ||
                        ""
                    )
                        .toUpperCase();


                if (
                    finalStockStatus ===
                    "FAILED"
                ) {

                    throw new Error(
                        verifiedStatus?.message ||
                        response?.message ||
                        "Stock posting failed."
                    );

                }


                messageApi.success(
                    action ===
                        "RETRY"
                        ? "GRN stock posting retried successfully."
                        : "GRN stock posted successfully."
                );


                /* =========================================
                   CLOSE MODAL
                ========================================= */

                setStockPostingModalOpen(
                    false
                );


                setStockPostingRecord(
                    null
                );


                setStockPostingAction(
                    "POST"
                );


                /* =========================================
                   REFRESH LIST
                ========================================= */

                await loadData();

            }
            catch (
            stockError
            ) {

                console.error(
                    "GRN stock posting error:",
                    stockError
                );


                messageApi.error(
                    stockError?.message ||
                    "Unable to post GRN stock."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        [
            stockPostingRecord,
            stockPostingAction,
            messageApi,
            loadData,
        ]
    );

    /* =====================================================
       DELETE
    ===================================================== */

    const handleDelete = useCallback(
        async (
            record
        ) => {

            if (
                !record?.id
            ) {

                messageApi.error(
                    "GRN id is missing."
                );

                return;

            }


            setActionLoading(
                true
            );


            try {

                await grnService.remove(
                    record.id
                );


                messageApi.success(
                    "GRN deleted successfully."
                );


                await loadData();

            }
            catch (
            deleteError
            ) {

                console.error(
                    "GRN delete error:",
                    deleteError
                );


                messageApi.error(
                    deleteError?.message ||
                    "Unable to delete GRN."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        },
        [
            loadData,
            messageApi,
        ]
    );


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () => [

                /* -----------------------------------------
                   GRN NUMBER
                ----------------------------------------- */

                {
                    title:
                        "GRN No.",

                    dataIndex:
                        "grnNumber",

                    key:
                        "grnNumber",

                    width:
                        150,

                    fixed:
                        "left",

                    render:
                        value => (

                            <span
                                style={{
                                    fontWeight:
                                        600,
                                }}
                            >
                                {
                                    value ||
                                    "-"
                                }
                            </span>

                        ),

                },


                /* -----------------------------------------
                   GRN DATE
                ----------------------------------------- */

                {
                    title:
                        "GRN Date",

                    dataIndex:
                        "grnDate",

                    key:
                        "grnDate",

                    width:
                        120,

                    render:
                        formatDate,

                },


                /* -----------------------------------------
                   PURCHASE ORDER
                ----------------------------------------- */

                {
                    title:
                        "Purchase Order",

                    dataIndex:
                        "purchaseOrderNumber",

                    key:
                        "purchaseOrderNumber",

                    width:
                        150,

                    render:
                        value =>
                            value ||
                            "-",

                },


                /* -----------------------------------------
                   SUPPLIER
                ----------------------------------------- */

                {
                    title:
                        "Supplier",

                    dataIndex:
                        "supplierName",

                    key:
                        "supplierName",

                    width:
                        220,

                    render:
                        (
                            value,
                            record
                        ) => (

                            <div>

                                <div
                                    style={{
                                        fontWeight:
                                            500,
                                    }}
                                >
                                    {
                                        value ||
                                        "-"
                                    }
                                </div>


                                {
                                    record?.supplierCode && (

                                        <div
                                            style={{
                                                fontSize:
                                                    12,

                                                color:
                                                    "#8c8c8c",
                                            }}
                                        >
                                            {
                                                record.supplierCode
                                            }
                                        </div>

                                    )
                                }

                            </div>

                        ),

                },


                /* -----------------------------------------
                   INVOICE
                ----------------------------------------- */

                {
                    title:
                        "Invoice No.",

                    dataIndex:
                        "invoiceNumber",

                    key:
                        "invoiceNumber",

                    width:
                        150,

                    render:
                        value =>
                            value ||
                            "-",

                },


                /* -----------------------------------------
                   STORE
                ----------------------------------------- */

                {
                    title:
                        "Store",

                    dataIndex:
                        "storeName",

                    key:
                        "storeName",

                    width:
                        180,

                    render:
                        value =>
                            value ||
                            "-",

                },


                /* -----------------------------------------
                   ITEMS
                ----------------------------------------- */

                {
                    title:
                        "Items",

                    dataIndex:
                        "totalItems",

                    key:
                        "totalItems",

                    width:
                        80,

                    align:
                        "center",

                    render:
                        (
                            value,
                            record
                        ) =>
                            value ??
                            record?.items?.length ??
                            0,

                },


                /* -----------------------------------------
                   QUANTITY
                ----------------------------------------- */

                {
                    title:
                        "Quantity",

                    dataIndex:
                        "totalReceivedQuantity",

                    key:
                        "totalReceivedQuantity",

                    width:
                        110,

                    align:
                        "right",

                    render:
                        (
                            value,
                            record
                        ) =>
                            value ??
                            record?.receivedQuantity ??
                            0,

                },


                /* -----------------------------------------
                   AMOUNT
                ----------------------------------------- */

                {
                    title:
                        "Amount",

                    dataIndex:
                        "grandTotal",

                    key:
                        "grandTotal",

                    width:
                        130,

                    align:
                        "right",

                    render:
                        (
                            value,
                            record
                        ) => {

                            const amount =
                                Number(
                                    value ??
                                    record?.grandTotal ??
                                    0
                                );


                            return amount.toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits:
                                        2,

                                    maximumFractionDigits:
                                        2,
                                }
                            );

                        },

                },


                /* -----------------------------------------
                   STATUS
                ----------------------------------------- */

                {
                    title:
                        "Status",

                    dataIndex:
                        "status",

                    key:
                        "status",

                    width:
                        150,

                    render:
                        value => (

                            <Tag
                                color={
                                    getStatusColor(
                                        value
                                    )
                                }
                            >
                                {
                                    getStatusLabel(
                                        value
                                    )
                                }
                            </Tag>

                        ),

                },

                /* -----------------------------------------
   STOCK POSTING STATUS
----------------------------------------- */

                {
                    title:
                        "Stock Posting",

                    key:
                        "stockPostingStatus",

                    width:
                        150,

                    align:
                        "center",

                    render:
                        (
                            _,
                            record
                        ) => {

                            const stockPostingStatus =
                                String(
                                    record?.stockPostingStatus ||
                                    record?.stockPosting?.status ||
                                    record?.stockPostingStatusCode ||
                                    "NOT_POSTED"
                                )
                                    .toUpperCase();


                            switch (
                            stockPostingStatus
                            ) {

                                case "POSTED":

                                    return (

                                        <Tag
                                            color="success"
                                        >
                                            Posted
                                        </Tag>

                                    );


                                case "PENDING":

                                    return (

                                        <Tag
                                            color="processing"
                                        >
                                            Posting...
                                        </Tag>

                                    );


                                case "FAILED":

                                    return (

                                        <Tag
                                            color="error"
                                        >
                                            Failed
                                        </Tag>

                                    );


                                case "NOT_POSTED":

                                default:

                                    return (

                                        <Tag>
                                            Not Posted
                                        </Tag>

                                    );

                            }

                        },

                },


                /* -----------------------------------------
                   ACTIONS
                ----------------------------------------- */

                {
                    title:
                        "Actions",

                    key:
                        "actions",

                    width:
                        340,

                    fixed:
                        "right",

                    render:
                        (
                            _,
                            record
                        ) => {

                            const workflowActions =
                                getGRNActions(
                                    record
                                );


                            const statusValue =
                                String(
                                    record?.status ||
                                    ""
                                )
                                    .toUpperCase();


                            const isFinal =
                                [
                                    "POSTED",
                                    "CANCELLED",
                                    "COMPLETED",
                                ].includes(
                                    statusValue
                                );

                            const stockPostingStatus =
                                String(
                                    record?.stockPostingStatus ||
                                    record?.stockPosting?.status ||
                                    record?.stockPostingStatusCode ||
                                    "NOT_POSTED"
                                )
                                    .toUpperCase();


                            const canPostStock =
                                statusValue ===
                                "APPROVED" &&
                                [
                                    "NOT_POSTED",
                                    "FAILED",
                                ].includes(
                                    stockPostingStatus
                                );


                            const isStockPostingFailed =
                                stockPostingStatus ===
                                "FAILED";

                            return (

                                <Space
                                    size="small"
                                    wrap
                                >

                                    {/* =================
                                        VIEW
                                    ================= */}

                                    <Tooltip
                                        title="View"
                                    >

                                        <Button

                                            type="text"

                                            icon={
                                                <EyeOutlined />
                                            }

                                            onClick={() =>
                                                handleView(
                                                    record
                                                )
                                            }

                                        />

                                    </Tooltip>


                                    {/* =================
                                        EDIT
                                    ================= */}

                                    {
                                        workflowActions.includes(
                                            "EDIT"
                                        ) &&
                                        !isFinal && (

                                            <Tooltip
                                                title="Edit"
                                            >

                                                <Button

                                                    type="text"

                                                    icon={
                                                        <EditOutlined />
                                                    }

                                                    onClick={() =>
                                                        handleEdit(
                                                            record
                                                        )
                                                    }

                                                />

                                            </Tooltip>

                                        )
                                    }


                                    {/* =================
                                        SUBMIT
                                    ================= */}

                                    {
                                        workflowActions.includes(
                                            "SUBMIT"
                                        ) && (

                                            <Tooltip
                                                title="Submit for Approval"
                                            >

                                                <Button

                                                    type="text"

                                                    onClick={() =>
                                                        handleOpenAction(
                                                            "SUBMIT",
                                                            record
                                                        )
                                                    }

                                                >
                                                    Submit
                                                </Button>

                                            </Tooltip>

                                        )
                                    }


                                    {/* =================
                                        APPROVE
                                    ================= */}

                                    {
                                        workflowActions.includes(
                                            "APPROVE"
                                        ) && (

                                            <Tooltip
                                                title="Approve"
                                            >

                                                <Button

                                                    type="text"

                                                    onClick={() =>
                                                        handleOpenAction(
                                                            "APPROVE",
                                                            record
                                                        )
                                                    }

                                                >
                                                    Approve
                                                </Button>

                                            </Tooltip>

                                        )
                                    }


                                    {/* =================
                                        REJECT
                                    ================= */}

                                    {
                                        workflowActions.includes(
                                            "REJECT"
                                        ) && (

                                            <Tooltip
                                                title="Reject"
                                            >

                                                <Button

                                                    danger

                                                    type="text"

                                                    onClick={() =>
                                                        handleOpenAction(
                                                            "REJECT",
                                                            record
                                                        )
                                                    }

                                                >
                                                    Reject
                                                </Button>

                                            </Tooltip>

                                        )
                                    }


                                    {/* =================
                                        POST TO INVENTORY
                                    ================= */}

                                    {
                                        canPostStock && (

                                            <Tooltip
                                                title={
                                                    isStockPostingFailed
                                                        ? "Retry stock posting"
                                                        : "Post received stock to inventory"
                                                }
                                            >

                                                <Button

                                                    type="text"

                                                    icon={
                                                        <DatabaseOutlined />
                                                    }

                                                    onClick={() =>
                                                        handleOpenStockPosting(
                                                            record
                                                        )
                                                    }

                                                >
                                                    {
                                                        isStockPostingFailed
                                                            ? "Retry"
                                                            : "Post Stock"
                                                    }

                                                </Button>

                                            </Tooltip>

                                        )
                                    }

                                    {
                                        canPostStock && (

                                            <Tooltip
                                                title={
                                                    isStockPostingFailed
                                                        ? "Retry stock posting"
                                                        : "Post received stock to inventory"
                                                }
                                            >

                                                <Button

                                                    type="text"

                                                    onClick={() =>
                                                        handleOpenStockPosting(
                                                            record
                                                        )
                                                    }

                                                >
                                                    {
                                                        isStockPostingFailed
                                                            ? "Retry"
                                                            : "Post Stock"
                                                    }

                                                </Button>

                                            </Tooltip>

                                        )
                                    }


                                    {/* =================
                                        DELETE
                                    ================= */}

                                    {
                                        [
                                            "DRAFT",
                                            "REJECTED",
                                        ].includes(
                                            statusValue
                                        ) && (

                                            <Popconfirm

                                                title="Delete GRN"

                                                description={
                                                    "Are you sure you want to delete this GRN?"
                                                }

                                                okText="Delete"

                                                cancelText="Cancel"

                                                okButtonProps={{
                                                    danger:
                                                        true,
                                                }}

                                                onConfirm={() =>
                                                    handleDelete(
                                                        record
                                                    )
                                                }

                                            >

                                                <Tooltip
                                                    title="Delete"
                                                >

                                                    <Button

                                                        danger

                                                        type="text"

                                                        icon={
                                                            <DeleteOutlined />
                                                        }

                                                    />

                                                </Tooltip>

                                            </Popconfirm>

                                        )
                                    }

                                </Space>

                            );

                        },

                },

            ],
            [
                handleView,
                handleEdit,
                handleDelete,
                handleOpenAction,
                handleOpenStockPosting,
            ]
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="grn-page"
        >

            {contextHolder}


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <Card
                bordered={
                    false
                }

                style={{
                    marginBottom:
                        16,
                }}

            >

                <Row
                    align="middle"
                    justify="space-between"
                    gutter={[
                        16,
                        16,
                    ]}
                >

                    <Col>

                        <div
                            style={{
                                fontSize:
                                    24,

                                fontWeight:
                                    600,
                            }}
                        >
                            Goods Receipt Notes
                        </div>


                        <div
                            style={{
                                color:
                                    "#8c8c8c",

                                marginTop:
                                    4,
                            }}
                        >
                            Receive, inspect and record
                            pharmaceutical goods.
                        </div>

                    </Col>


                    <Col>

                        <Button

                            type="primary"

                            icon={
                                <PlusOutlined />
                            }

                            onClick={
                                handleCreate
                            }

                        >
                            Create GRN
                        </Button>

                    </Col>

                </Row>

            </Card>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                error && (

                    <Alert

                        type="error"

                        showIcon

                        closable

                        message={
                            error
                        }

                        style={{
                            marginBottom:
                                16,
                        }}

                    />

                )
            }


            {/* =================================================
                FILTERS
            ================================================= */}

            <Card
                bordered={
                    false
                }

                style={{
                    marginBottom:
                        16,
                }}

            >

                <Row
                    gutter={[
                        12,
                        12,
                    ]}
                    align="middle"
                >

                    {/* -----------------------------------------
                        SEARCH
                    ----------------------------------------- */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={7}
                    >

                        <Input.Search

                            allowClear

                            placeholder={
                                "Search GRN, PO, supplier, invoice..."
                            }

                            value={
                                search
                            }

                            onChange={
                                event =>
                                    setSearch(
                                        event.target.value
                                    )
                            }

                            onSearch={
                                handleSearch
                            }

                        />

                    </Col>


                    {/* -----------------------------------------
                        STATUS
                    ----------------------------------------- */}

                    <Col
                        xs={24}
                        sm={12}
                        md={5}
                        lg={4}
                    >

                        <Select

                            allowClear

                            placeholder="Status"

                            style={{
                                width:
                                    "100%",
                            }}

                            value={
                                status
                            }

                            options={
                                STATUS_OPTIONS
                            }

                            onChange={
                                value => {

                                    setStatus(
                                        value
                                    );


                                    setPagination(
                                        current =>
                                        ({
                                            ...current,

                                            current:
                                                1,

                                        })
                                    );

                                }
                            }

                        />

                    </Col>


                    {/* -----------------------------------------
                        DATE RANGE
                    ----------------------------------------- */}

                    <Col
                        xs={24}
                        sm={12}
                        md={7}
                        lg={6}
                    >

                        <DatePicker.RangePicker

                            style={{
                                width:
                                    "100%",
                            }}

                            value={
                                dateRange
                            }

                            onChange={
                                values =>
                                    setDateRange(
                                        values ||
                                        []
                                    )
                            }

                        />

                    </Col>


                    {/* -----------------------------------------
                        BUTTONS
                    ----------------------------------------- */}

                    <Col>

                        <Space>

                            <Button
                                onClick={
                                    handleSearch
                                }
                            >
                                Search
                            </Button>


                            <Button

                                icon={
                                    <ReloadOutlined />
                                }

                                onClick={() =>
                                    loadData()
                                }

                                loading={
                                    loading
                                }

                            >
                                Refresh
                            </Button>


                            <Button
                                onClick={
                                    handleResetFilters
                                }
                            >
                                Reset
                            </Button>

                        </Space>

                    </Col>

                </Row>

            </Card>


            {/* =================================================
                TABLE
            ================================================= */}

            <Card
                bordered={
                    false
                }
            >

                <Table

                    rowKey={
                        record =>
                            record?.id ||
                            record?.grnNumber
                    }

                    columns={
                        columns
                    }

                    dataSource={
                        data
                    }

                    loading={
                        loading ||
                        actionLoading
                    }

                    scroll={{
                        x:
                            1800,
                    }}

                    pagination={{

                        current:
                            pagination.current,

                        pageSize:
                            pagination.pageSize,

                        total,

                        showSizeChanger:
                            true,

                        showQuickJumper:
                            true,

                        showTotal:
                            value =>
                                `Total ${value} GRNs`,

                    }}

                    onChange={
                        handleTableChange
                    }

                />

            </Card>


            {/* =================================================
                GRN DRAWER
            ================================================= */}

            <GRNDrawer

                open={
                    drawerOpen
                }

                mode={
                    drawerMode
                }

                initialValues={
                    selectedRecord ||
                    {}
                }

                record={
                    selectedRecord
                }

                auditTrail={
                    auditTrail
                }

                loading={
                    actionLoading
                }


                /* ---------------------------------------------
                   LOOKUPS
                --------------------------------------------- */

                purchaseOrderOptions={
                    purchaseOrderOptions
                }

                purchaseOrderItems={
                    purchaseOrderItems
                }

                supplierOptions={
                    supplierOptions
                }

                storeOptions={
                    storeOptions
                }


                /* ---------------------------------------------
                   ACTIONS
                --------------------------------------------- */

                onClose={
                    handleDrawerClose
                }

                onCancel={
                    handleDrawerClose
                }

                onSubmit={
                    handleSubmit
                }

                onSaveDraft={
                    handleSaveDraft
                }

            />


            {/* =================================================
                GRN WORKFLOW ACTION MODAL
            ================================================= */}

            <GRNActionModal

                open={
                    actionModalOpen
                }

                action={
                    actionType
                }

                grn={
                    actionRecord
                }

                loading={
                    actionLoading
                }

                onConfirm={
                    handleGRNAction
                }

                onCancel={
                    handleCloseActionModal
                }

            />


            {/* =================================================
    GRN STOCK POSTING MODAL
================================================= */}

            <GRNStockPostingModal

                open={
                    stockPostingModalOpen
                }

                grn={
                    stockPostingRecord
                }

                action={
                    stockPostingAction
                }

                loading={
                    actionLoading
                }

                onConfirm={
                    handlePostToInventory
                }

                onCancel={
                    handleCloseStockPosting
                }

            />

        </div>

    );

};


export default GRNPage;