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
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";


import GRNDrawer
    from "../components/GRNDrawer";


import grnService
    from "../services/grn.service";


import {
    GRN_STATUS,
} from "../constants/grn.constants";


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

    const option =
        STATUS_OPTIONS.find(
            item =>
                item.value ===
                status
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


                setError(
                    requestError?.message ||
                    "Unable to load GRN records."
                );


                messageApi.error(
                    requestError?.message ||
                    "Unable to load GRN records."
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

    const handleResetFilters = () => {

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

    };


    /* =====================================================
       SEARCH
    ===================================================== */

    const handleSearch = () => {

        setPagination(
            current =>
                ({
                    ...current,

                    current:
                        1,

                })
        );

    };


    /* =====================================================
       TABLE CHANGE
    ===================================================== */

    const handleTableChange = (
        tablePagination
    ) => {

        setPagination({

            current:
                tablePagination.current,

            pageSize:
                tablePagination.pageSize,

        });

    };


    /* =====================================================
       OPEN CREATE
    ===================================================== */

    const handleCreate = () => {

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

    };


    /* =====================================================
       OPEN VIEW
    ===================================================== */

    const handleView = async (
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

    };


    /* =====================================================
       OPEN EDIT
    ===================================================== */

    const handleEdit = async (
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

    };


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleDrawerClose = () => {

        setDrawerOpen(
            false
        );


        setSelectedRecord(
            null
        );


        setAuditTrail(
            []
        );

    };


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    const handleSaveDraft = async (
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


            handleDrawerClose();


            await loadData({
                page:
                    1,
            });


            setPagination(
                current =>
                    ({
                        ...current,

                        current:
                            1,

                    })
            );

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

    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (
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


            handleDrawerClose();


            await loadData({
                page:
                    1,
            });


            setPagination(
                current =>
                    ({
                        ...current,

                        current:
                            1,

                    })
            );

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

    };


    /* =====================================================
       DELETE
    ===================================================== */

    const handleDelete = async (
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

    };


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () => [

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


                {
                    title:
                        "Actions",

                    key:
                        "actions",

                    width:
                        130,

                    fixed:
                        "right",

                    render:
                        (
                            _,
                            record
                        ) => (

                            <Space
                                size="small"
                            >

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


                                <Tooltip
                                    title="Edit"
                                >

                                    <Button

                                        type="text"

                                        icon={
                                            <EditOutlined />
                                        }

                                        disabled={
                                            [
                                                "POSTED",
                                                "CANCELLED",
                                                "COMPLETED",
                                            ].includes(
                                                String(
                                                    record?.status ||
                                                    ""
                                                )
                                                    .toUpperCase()
                                            )
                                        }

                                        onClick={() =>
                                            handleEdit(
                                                record
                                            )
                                        }

                                    />

                                </Tooltip>


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

                                            disabled={
                                                ![
                                                    "DRAFT",
                                                    "REJECTED",
                                                ].includes(
                                                    String(
                                                        record?.status ||
                                                        ""
                                                    )
                                                        .toUpperCase()
                                                )
                                            }

                                        />

                                    </Tooltip>

                                </Popconfirm>

                            </Space>

                        ),

                },

            ],
            []
        );


    /* =====================================================
       CREATE TITLE
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

                                onClick={
                                    () =>
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
                            1500,
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
                DRAWER
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

        </div>

    );

};


export default GRNPage;