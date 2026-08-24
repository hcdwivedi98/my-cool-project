// src/modules/purchase-management/purchase-order/pages/PurchaseOrderPage.jsx

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Card,
    Col,
    Empty,
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    message,
} from "antd";

import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    SendOutlined,
} from "@ant-design/icons";

import PurchaseOrderDrawer
    from "../components/PurchaseOrderDrawer";

import {
    getPurchaseOrders,
    getPurchaseOrderById,
    createPurchaseOrder,
    updatePurchaseOrder,
    savePurchaseOrderDraft,
    submitPurchaseOrder,
    deletePurchaseOrder,
} from "../services/purchaseOrder.service";

import {
    PO_STATUS,
    PO_STATUS_LABELS,
    PO_TYPE_LABELS,
} from "../constants/purchaseOrder.constants";

import {
    formatCurrency,
} from "../utils/purchaseOrder.helper";

import "../styles/purchaseOrder.css";


/* =========================================================
   PAGE
   ========================================================= */

const PurchaseOrderPage = () => {

    /* =====================================================
       MESSAGE
    ===================================================== */

    const [
        messageApi,
        contextHolder,
    ] =
        message.useMessage();


    /* =====================================================
       LIST STATE
    ===================================================== */

    const [
        data,
        setData,
    ] =
        useState(
            []
        );


    const [
        loading,
        setLoading,
    ] =
        useState(
            false
        );


    const [
        page,
        setPage,
    ] =
        useState(
            1
        );


    const [
        pageSize,
        setPageSize,
    ] =
        useState(
            10
        );


    const [
        total,
        setTotal,
    ] =
        useState(
            0
        );


    /* =====================================================
       FILTER STATE
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
        supplierId,
        setSupplierId,
    ] =
        useState(
        undefined
    );


    const [
        storeId,
        setStoreId,
    ] =
        useState(
            undefined
        );


    const [
        poType,
        setPoType,
    ] =
        useState(
            undefined
        );


    /* =====================================================
       DRAWER STATE
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
        drawerLoading,
        setDrawerLoading,
    ] =
        useState(
            false
        );


    /* =====================================================
       LOAD DATA
    ===================================================== */

    const loadData =
        useCallback(
            async () => {

                try {

                    setLoading(
                        true
                    );


                    const response =
                        await getPurchaseOrders({

                            page,

                            pageSize,

                            search,

                            status,

                            supplierId,

                            storeId,

                            poType,

                        });


                    setData(
                        Array.isArray(
                            response?.data
                        )
                            ? response.data
                            : []
                    );


                    setTotal(
                        Number(
                            response
                                ?.pagination
                                ?.total
                        ) || 0
                    );

                }
                catch (
                    error
                ) {

                    console.error(
                        error
                    );


                    messageApi.error(
                        error?.message ||
                        "Failed to load purchase orders."
                    );

                }
                finally {

                    setLoading(
                        false
                    );

                }

            },
            [
                page,
                pageSize,
                search,
                status,
                supplierId,
                storeId,
                poType,
                messageApi,
            ]
        );


    useEffect(
        () => {

            loadData();

        },
        [
            loadData,
        ]
    );


    /* =====================================================
       CREATE
    ===================================================== */

    const handleCreate =
        () => {

            setSelectedRecord(
                null
            );

            setDrawerMode(
                "CREATE"
            );

            setDrawerOpen(
                true
            );

        };


    /* =====================================================
       VIEW
    ===================================================== */

    const handleView =
        async (
            record
        ) => {

            try {

                setDrawerLoading(
                    true
                );


                const response =
                    await getPurchaseOrderById(
                        record.id
                    );


                setSelectedRecord(
                    response?.data ||
                    record
                );


                setDrawerMode(
                    "VIEW"
                );


                setDrawerOpen(
                    true
                );

            }
            catch (
                error
            ) {

                messageApi.error(
                    error?.message ||
                    "Failed to load purchase order."
                );

            }
            finally {

                setDrawerLoading(
                    false
                );

            }

        };


    /* =====================================================
       EDIT
    ===================================================== */

    const handleEdit =
        async (
            record
        ) => {

            try {

                setDrawerLoading(
                    true
                );


                const response =
                    await getPurchaseOrderById(
                        record.id
                    );


                setSelectedRecord(
                    response?.data ||
                    record
                );


                setDrawerMode(
                    "EDIT"
                );


                setDrawerOpen(
                    true
                );

            }
            catch (
                error
            ) {

                messageApi.error(
                    error?.message ||
                    "Failed to load purchase order."
                );

            }
            finally {

                setDrawerLoading(
                    false
                );

            }

        };


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleDrawerClose =
        () => {

            setDrawerOpen(
                false
            );

            setSelectedRecord(
                null
            );

        };


    /* =====================================================
       SAVE DRAFT
    ===================================================== */

    const handleSaveDraft =
        async (
            payload
        ) => {

            try {

                const response =
                    await savePurchaseOrderDraft(
                        payload
                    );


                if (
                    response?.success
                ) {

                    messageApi.success(
                        response.message ||
                        "Draft saved successfully."
                    );

                    handleDrawerClose();

                    await loadData();

                }

            }
            catch (
                error
            ) {

                throw error;

            }

        };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit =
        async (
            payload
        ) => {

            try {

                let response;


                if (
                    drawerMode ===
                    "EDIT" &&
                    selectedRecord?.id
                ) {

                    response =
                        await submitPurchaseOrder(
                            selectedRecord.id,
                            payload
                        );

                }
                else {

                    response =
                        await createPurchaseOrder(
                            payload
                        );

                }


                if (
                    response?.success
                ) {

                    messageApi.success(
                        response.message ||
                        "Purchase order submitted successfully."
                    );

                    handleDrawerClose();

                    await loadData();

                }

            }
            catch (
                error
            ) {

                throw error;

            }

        };


    /* =====================================================
       DELETE
    ===================================================== */

    const handleDelete =
        async (
            record
        ) => {

            try {

                setLoading(
                    true
                );


                const response =
                    await deletePurchaseOrder(
                        record.id
                    );


                if (
                    response?.success
                ) {

                    messageApi.success(
                        response.message ||
                        "Purchase order deleted successfully."
                    );

                    await loadData();

                }

            }
            catch (
                error
            ) {

                messageApi.error(
                    error?.message ||
                    "Failed to delete purchase order."
                );

            }
            finally {

                setLoading(
                    false
                );

            }

        };


    /* =====================================================
       FILTER RESET
    ===================================================== */

    const handleReset =
        () => {

            setSearch(
                ""
            );

            setStatus(
                undefined
            );

            setSupplierId(
                undefined
            );

            setStoreId(
                undefined
            );

            setPoType(
                undefined
            );

            setPage(
                1
            );

        };


    /* =====================================================
       STATUS LABEL
    ===================================================== */

    const getStatusLabel =
        (
            value
        ) => {

            return (
                PO_STATUS_LABELS?.[
                    value
                ] ||
                value ||
                "-"
            );

        };


    /* =====================================================
       STATUS COLOR
    ===================================================== */

    const getStatusColor =
        (
            value
        ) => {

            switch (
                value
            ) {

                case PO_STATUS.DRAFT:
                    return "default";

                case PO_STATUS.PENDING_APPROVAL:
                    return "processing";

                case PO_STATUS.APPROVED:
                    return "success";

                case PO_STATUS.REJECTED:
                    return "error";

                case PO_STATUS.CANCELLED:
                    return "red";

                case PO_STATUS.CLOSED:
                    return "blue";

                default:
                    return "default";

            }

        };


    /* =====================================================
       SUMMARY
    ===================================================== */

    const summary =
        useMemo(
            () => {

                const records =
                    Array.isArray(
                        data
                    )
                        ? data
                        : [];


                return {

                    total:
                        total,

                    draft:
                        records.filter(
                            item =>
                                item.status ===
                                PO_STATUS.DRAFT
                        ).length,

                    pending:
                        records.filter(
                            item =>
                                item.status ===
                                PO_STATUS.PENDING_APPROVAL
                        ).length,

                    approved:
                        records.filter(
                            item =>
                                item.status ===
                                PO_STATUS.APPROVED
                        ).length,

                };

            },
            [
                data,
                total,
            ]
        );


    /* =====================================================
       COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () => [

                /* =============================================
                   PO NUMBER
                ============================================= */

                {
                    title:
                        "PO Number",

                    dataIndex:
                        "poNumber",

                    key:
                        "poNumber",

                    width:
                        150,

                    fixed:
                        "left",

                    render:
                        (
                            value,
                            record
                        ) => (

                            <div>

                                <strong>
                                    {
                                        value ||
                                        "-"
                                    }
                                </strong>

                                {
                                    record.poDate && (

                                        <div
                                            style={{
                                                fontSize:
                                                    12,

                                                color:
                                                    "#8c8c8c",

                                                marginTop:
                                                    2,
                                            }}
                                        >
                                            {
                                                String(
                                                    record.poDate
                                                )
                                            }
                                        </div>

                                    )
                                }

                            </div>

                        ),
                },


                /* =============================================
                   SUPPLIER
                ============================================= */

                {
                    title:
                        "Supplier",

                    key:
                        "supplier",

                    width:
                        220,

                    render:
                        (
                            _,
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
                                        record.supplierName ||
                                        "-"
                                    }
                                </div>

                                <div
                                    style={{
                                        fontSize:
                                            12,

                                        color:
                                            "#8c8c8c",
                                    }}
                                >
                                    {
                                        record.supplierCode ||
                                        ""
                                    }
                                </div>

                            </div>

                        ),
                },


                /* =============================================
                   PO TYPE
                ============================================= */

                {
                    title:
                        "PO Type",

                    dataIndex:
                        "poType",

                    key:
                        "poType",

                    width:
                        150,

                    render:
                        (
                            value
                        ) =>
                            PO_TYPE_LABELS?.[
                                value
                            ] ||
                            value ||
                            "-",
                },


                /* =============================================
                   ITEMS
                ============================================= */

                {
                    title:
                        "Items",

                    key:
                        "items",

                    width:
                        90,

                    align:
                        "center",

                    render:
                        (
                            _,
                            record
                        ) => {

                            const items =
                                Array.isArray(
                                    record.items
                                )
                                    ? record.items
                                    : [];


                            return items.length;

                        },
                },


                /* =============================================
                   TOTAL
                ============================================= */

                {
                    title:
                        "Grand Total",

                    dataIndex:
                        "grandTotal",

                    key:
                        "grandTotal",

                    width:
                        150,

                    align:
                        "right",

                    render:
                        (
                            value
                        ) => (

                            <strong>
                                {
                                    formatCurrency(
                                        Number(
                                            value
                                        ) || 0,
                                        "INR"
                                    )
                                }
                            </strong>

                        ),
                },


                /* =============================================
                   STATUS
                ============================================= */

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
                        (
                            value
                        ) => (

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


                /* =============================================
                   CREATED BY
                ============================================= */

                {
                    title:
                        "Created By",

                    key:
                        "createdBy",

                    width:
                        150,

                    render:
                        (
                            _,
                            record
                        ) =>
                            record.createdByName ||
                            record.createdBy ||
                            "-",
                },


                /* =============================================
                   ACTION
                ============================================= */

                {
                    title:
                        "Action",

                    key:
                        "action",

                    width:
                        150,

                    fixed:
                        "right",

                    render:
                        (
                            _,
                            record
                        ) => (

                            <Space>

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


                                {
                                    (
                                        record.status ===
                                            PO_STATUS.DRAFT ||
                                        record.status ===
                                            PO_STATUS.REJECTED
                                    ) && (

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


                                {
                                    record.status ===
                                    PO_STATUS.DRAFT && (

                                        <Tooltip
                                            title="Delete"
                                        >

                                            <Button
                                                type="text"

                                                danger

                                                icon={
                                                    <DeleteOutlined />
                                                }

                                                onClick={() =>
                                                    handleDelete(
                                                        record
                                                    )
                                                }
                                            />

                                        </Tooltip>

                                    )
                                }

                            </Space>

                        ),
                },

            ],
            [
                handleView,
                handleEdit,
                handleDelete,
            ]
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <>

            {
                contextHolder
            }


            <div
                className="purchase-order-page"
            >

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div
                    className="purchase-order-page-header"
                >

                    <div>

                        <h1>
                            Purchase Orders
                        </h1>

                        <p>
                            Manage pharmacy purchase orders,
                            approvals and procurement commitments.
                        </p>

                    </div>


                    <Button
                        type="primary"

                        icon={
                            <PlusOutlined />
                        }

                        onClick={
                            handleCreate
                        }
                    >
                        Create Purchase Order
                    </Button>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <Row
                    gutter={[
                        16,
                        16,
                    ]}

                    style={{
                        marginBottom:
                            20,
                    }}
                >

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card>
                            <Statistic
                                title="Total Purchase Orders"
                                value={
                                    summary.total
                                }
                            />
                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card>
                            <Statistic
                                title="Draft"
                                value={
                                    summary.draft
                                }
                            />
                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card>
                            <Statistic
                                title="Pending Approval"
                                value={
                                    summary.pending
                                }
                            />
                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >

                        <Card>
                            <Statistic
                                title="Approved"
                                value={
                                    summary.approved
                                }
                            />
                        </Card>

                    </Col>

                </Row>


                {/* =================================================
                    FILTER CARD
                ================================================= */}

                <Card
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
                    >

                        {/* =========================================
                            SEARCH
                        ========================================= */}

                        <Col
                            xs={24}
                            md={12}
                            lg={8}
                        >

                            <Input
                                allowClear

                                prefix={
                                    <SearchOutlined />
                                }

                                placeholder="Search PO number, supplier..."

                                value={
                                    search
                                }

                                onChange={(
                                    event
                                ) => {

                                    setSearch(
                                        event.target.value
                                    );

                                    setPage(
                                        1
                                    );

                                }}
                            />

                        </Col>


                        {/* =========================================
                            STATUS
                        ========================================= */}

                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >

                            <Select
                                allowClear

                                style={{
                                    width:
                                        "100%",
                                }}

                                placeholder="Status"

                                value={
                                    status
                                }

                                options={[
                                    PO_STATUS.DRAFT,
                                    PO_STATUS.PENDING_APPROVAL,
                                    PO_STATUS.APPROVED,
                                    PO_STATUS.REJECTED,
                                    PO_STATUS.CANCELLED,
                                    PO_STATUS.CLOSED,
                                ].map(
                                    (
                                        value
                                    ) => ({

                                        value,

                                        label:
                                            getStatusLabel(
                                                value
                                            ),

                                    })
                                )}

                                onChange={(
                                    value
                                ) => {

                                    setStatus(
                                        value
                                    );

                                    setPage(
                                        1
                                    );

                                }}
                            />

                        </Col>


                        {/* =========================================
                            PO TYPE
                        ========================================= */}

                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >

                            <Select
                                allowClear

                                style={{
                                    width:
                                        "100%",
                                }}

                                placeholder="PO Type"

                                value={
                                    poType
                                }

                                options={
                                    Object.entries(
                                        PO_TYPE_LABELS ||
                                        {}
                                    ).map(
                                        (
                                            [
                                                value,
                                                label,
                                            ]
                                        ) => ({

                                            value,

                                            label,

                                        })
                                    )
                                }

                                onChange={(
                                    value
                                ) => {

                                    setPoType(
                                        value
                                    );

                                    setPage(
                                        1
                                    );

                                }}
                            />

                        </Col>


                        {/* =========================================
                            RESET
                        ========================================= */}

                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >

                            <Button
                                icon={
                                    <ReloadOutlined />
                                }

                                onClick={
                                    handleReset
                                }

                                block
                            >
                                Reset
                            </Button>

                        </Col>

                    </Row>

                </Card>


                {/* =================================================
                    TABLE
                ================================================= */}

                <Card>

                    <Table

                        rowKey={
                            record =>
                                record.id
                        }

                        loading={
                            loading
                        }

                        columns={
                            columns
                        }

                        dataSource={
                            data
                        }

                        bordered

                        size="middle"

                        scroll={{
                            x:
                                1200,
                        }}

                        locale={{
                            emptyText: (

                                <Empty
                                    description={
                                        "No purchase orders found."
                                    }
                                />

                            ),
                        }}

                        pagination={{

                            current:
                                page,

                            pageSize:
                                pageSize,

                            total:
                                total,

                            showSizeChanger:
                                true,

                            showTotal:
                                (
                                    totalCount,
                                    range
                                ) =>
                                    `${range[0]}-${range[1]} of ${totalCount}`,

                            onChange:
                                (
                                    nextPage,
                                    nextPageSize
                                ) => {

                                    setPage(
                                        nextPage
                                    );

                                    setPageSize(
                                        nextPageSize
                                    );

                                },

                        }}

                    />

                </Card>


                {/* =================================================
                    DRAWER
                ================================================= */}

                <PurchaseOrderDrawer

                    open={
                        drawerOpen
                    }

                    mode={
                        drawerMode
                    }

                    record={
                        selectedRecord
                    }

                    loading={
                        drawerLoading
                    }

                    auditTrail={
                        selectedRecord?.auditTrail
                    }

                    onClose={
                        handleDrawerClose
                    }

                    onSaveDraft={
                        handleSaveDraft
                    }

                    onSubmit={
                        handleSubmit
                    }

                    onSuccess={
                        loadData
                    }

                />

            </div>

        </>

    );

};


export default PurchaseOrderPage;