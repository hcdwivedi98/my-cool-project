// src/modules/pharmacy/drug-route/pages/DrugRoutePage.jsx

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
    Empty,
    Input,
    Row,
    Select,
    Table,
    Typography,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import getDrugRouteColumns
    from "../columns/drugRoute.columns";

import DrugRouteDrawer
    from "../components/DrugRouteDrawer";

import drugRouteService
    from "../services/drugRoute.service";

import {
    DRUG_ROUTE_FORM_MODES,
    DRUG_ROUTE_TYPES,
} from "../constants/drugRoute.constants";

import {
    createDrugRouteQuery,
    createDrugRouteQueryFromTable,
} from "../utils/drugRoute.query";

import {
    drugRouteList,
} from "../mock/drugRoute.mock";

import "../styles/drugRoute.css";


const {
    Title,
    Text,
} = Typography;


/* =========================================================
   PAGE
   ========================================================= */

const DrugRoutePage = () => {

    /* =====================================================
       QUERY
    ===================================================== */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createDrugRouteQuery()
    );


    /* =====================================================
       DATA
    ===================================================== */

    const [
        data,
        setData,
    ] = useState([]);


    const [
        total,
        setTotal,
    ] = useState(0);


    /* =====================================================
       LOADING
    ===================================================== */

    const [
        loading,
        setLoading,
    ] = useState(false);


    const [
        actionLoading,
        setActionLoading,
    ] = useState(false);


    /* =====================================================
       ERROR
    ===================================================== */

    const [
        error,
        setError,
    ] = useState(null);


    /* =====================================================
       DRAWER
    ===================================================== */

    const [
        drawerOpen,
        setDrawerOpen,
    ] = useState(false);


    const [
        drawerMode,
        setDrawerMode,
    ] = useState(
        DRUG_ROUTE_FORM_MODES.CREATE
    );


    const [
        selectedRecord,
        setSelectedRecord,
    ] = useState(null);


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    const [
        searchInput,
        setSearchInput,
    ] = useState("");


    /* =====================================================
       LOAD DATA
    ===================================================== */

    const loadData = useCallback(
        async (
            currentQuery = query
        ) => {

            try {

                setLoading(
                    true
                );

                setError(
                    null
                );


                const response =
                    await drugRouteService.getAll(
                        currentQuery
                    );


                setData(
                    response.items
                );


                setTotal(
                    response.total
                );

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to load drug routes."
                );

                setData(
                    []
                );

                setTotal(
                    0
                );

            }
            finally {

                setLoading(
                    false
                );
            }

        },
        [
            query,
        ]
    );


    /* =====================================================
       INITIAL / QUERY LOAD
    ===================================================== */

    useEffect(
        () => {

            loadData(
                query
            );

        },
        [
            query,
            loadData,
        ]
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    const handleSearch = useCallback(
        () => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    search:
                        searchInput.trim(),

                    page:
                        1,
                })
            );

        },
        [
            searchInput,
        ]
    );


    /* =====================================================
       SEARCH ENTER
    ===================================================== */

    const handleSearchKeyDown =
        useCallback(
            (
                event
            ) => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    handleSearch();
                }

            },
            [
                handleSearch,
            ]
        );


    /* =====================================================
       ROUTE TYPE
    ===================================================== */

    const handleRouteTypeChange =
        useCallback(
            (
                value
            ) => {

                setQuery(
                    (
                        previous
                    ) => ({

                        ...previous,

                        routeType:
                            value ||
                            undefined,

                        page:
                            1,
                    })
                );

            },
            []
        );


    /* =====================================================
       STATUS
    ===================================================== */

    const handleStatusChange =
        useCallback(
            (
                value
            ) => {

                setQuery(
                    (
                        previous
                    ) => ({

                        ...previous,

                        status:
                            value ||
                            undefined,

                        page:
                            1,
                    })
                );

            },
            []
        );


    /* =====================================================
       USAGE
    ===================================================== */

    const handleUsageChange =
        useCallback(
            (
                value
            ) => {

                setQuery(
                    (
                        previous
                    ) => ({

                        ...previous,

                        usage:
                            value ||
                            "ALL",

                        page:
                            1,
                    })
                );

            },
            []
        );


    /* =====================================================
       RESET
    ===================================================== */

    const handleReset =
        useCallback(
            () => {

                setSearchInput(
                    ""
                );

                setQuery(
                    createDrugRouteQuery()
                );

            },
            []
        );


    /* =====================================================
       TABLE CHANGE
    ===================================================== */

    const handleTableChange =
        useCallback(
            (
                pagination,
                filters,
                sorter
            ) => {

                const nextQuery =
                    createDrugRouteQueryFromTable(
                        {
                            pagination,

                            filters,

                            sorter,

                            currentQuery:
                                query,
                        }
                    );


                setQuery(
                    nextQuery
                );

            },
            [
                query,
            ]
        );


    /* =====================================================
       OPEN CREATE
    ===================================================== */

    const handleCreate =
        useCallback(
            () => {

                setSelectedRecord(
                    null
                );

                setDrawerMode(
                    DRUG_ROUTE_FORM_MODES.CREATE
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

    const handleView =
        useCallback(
            (
                record
            ) => {

                setSelectedRecord(
                    record
                );

                setDrawerMode(
                    DRUG_ROUTE_FORM_MODES.VIEW
                );

                setDrawerOpen(
                    true
                );

            },
            []
        );


    /* =====================================================
       OPEN EDIT
    ===================================================== */

    const handleEdit =
        useCallback(
            (
                record
            ) => {

                setSelectedRecord(
                    record
                );

                setDrawerMode(
                    DRUG_ROUTE_FORM_MODES.EDIT
                );

                setDrawerOpen(
                    true
                );

            },
            []
        );


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleDrawerClose =
        useCallback(
            () => {

                setDrawerOpen(
                    false
                );

                setSelectedRecord(
                    null
                );

            },
            []
        );


    /* =====================================================
       CREATE / UPDATE
    ===================================================== */

    const handleSubmit =
        useCallback(
            async (
                payload,
                context
            ) => {

                setActionLoading(
                    true
                );

                try {

                    let result;


                    if (
                        context?.mode ===
                        DRUG_ROUTE_FORM_MODES.CREATE
                    ) {

                        result =
                            await drugRouteService.create(
                                payload
                            );

                    }
                    else if (
                        context?.mode ===
                        DRUG_ROUTE_FORM_MODES.EDIT
                    ) {

                        result =
                            await drugRouteService.update(
                                context.id,
                                payload
                            );

                    }
                    else {

                        throw new Error(
                            "Invalid drug route form mode."
                        );
                    }


                    await loadData(
                        query
                    );


                    return result;

                }
                finally {

                    setActionLoading(
                        false
                    );
                }

            },
            [
                loadData,
                query,
            ]
        );


    /* =====================================================
       SUCCESS
    ===================================================== */

    const handleSuccess =
        useCallback(
            async () => {

                await loadData(
                    query
                );

            },
            [
                loadData,
                query,
            ]
        );


    /* =====================================================
       ACTIVATE
    ===================================================== */

    const handleActivate =
        useCallback(
            async (
                record
            ) => {

                try {

                    setActionLoading(
                        true
                    );

                    setError(
                        null
                    );


                    await drugRouteService.activate(
                        record.id
                    );


                    await loadData(
                        query
                    );

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to activate drug route."
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
                query,
            ]
        );


    /* =====================================================
       DEACTIVATE
    ===================================================== */

    const handleDeactivate =
        useCallback(
            async (
                record
            ) => {

                try {

                    setActionLoading(
                        true
                    );

                    setError(
                        null
                    );


                    await drugRouteService.deactivate(
                        record.id
                    );


                    await loadData(
                        query
                    );

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to deactivate drug route."
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
                query,
            ]
        );


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () =>
                getDrugRouteColumns(
                    {
                        onView:
                            handleView,

                        onEdit:
                            handleEdit,

                        onActivate:
                            handleActivate,

                        onDeactivate:
                            handleDeactivate,
                    }
                ),
            [
                handleView,
                handleEdit,
                handleActivate,
                handleDeactivate,
            ]
        );


    /* =====================================================
       ACTIVE COUNT
    ===================================================== */

    const activeCount =
        useMemo(
            () =>
                drugRouteList.filter(
                    (
                        item
                    ) =>
                        item.status ===
                        "Active"
                ).length,
            []
        );


    /* =====================================================
       MAPPED DRUG COUNT
    ===================================================== */

    const mappedDrugCount =
        useMemo(
            () =>
                drugRouteList.reduce(
                    (
                        totalCount,
                        item
                    ) =>
                        totalCount +
                        (
                            Number(
                                item.drugCount
                            ) || 0
                        ),
                    0
                ),
            []
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="drug-route-page"
        >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <Row
                align="middle"
                justify="space-between"
                gutter={[
                    16,
                    16,
                ]}
                style={{
                    width: "100%",
                    marginBottom: 20,
                }}
            >

                {/* =============================================
                    TITLE
                ============================================== */}

                <Col
                    flex="1 1 auto"
                >

                    <Title
                        level={3}
                        style={{
                            margin: 0,
                            fontSize: 28,
                            lineHeight: "36px",
                            fontWeight: 600,
                            color: "#141414",
                        }}
                    >
                        Drug Route Master
                    </Title>


                    <Text
                        type="secondary"
                        style={{
                            display: "block",
                            marginTop: 4,
                            fontSize: 14,
                            lineHeight: "22px",
                        }}
                    >
                        Manage drug administration routes used
                        throughout the hospital pharmacy.
                    </Text>

                </Col>


                {/* =============================================
                    ADD BUTTON
                ============================================== */}

                <Col
                    flex="0 0 auto"
                >

                    <Button
                        type="primary"
                        size="large"
                        icon={
                            <PlusOutlined />
                        }
                        onClick={
                            handleCreate
                        }
                        style={{
                            height: 48,
                            minWidth: 180,
                            paddingLeft: 22,
                            paddingRight: 22,
                            borderRadius: 8,
                            fontWeight: 600,
                        }}
                    >
                        Add Drug Route
                    </Button>

                </Col>

            </Row>


            {/* =================================================
                KPI CARDS
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
                style={{
                    width: "100%",
                    marginBottom: 16,
                }}
            >

                {/* =============================================
                    TOTAL ROUTES
                ============================================== */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                >

                    <Card
                        size="small"
                        style={{
                            width: "100%",
                            minHeight: 100,
                            borderRadius: 12,
                        }}
                    >

                        <Text
                            type="secondary"
                        >
                            Total Routes
                        </Text>


                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 26,
                                lineHeight: "34px",
                                fontWeight: 600,
                                color: "#141414",
                            }}
                        >
                            {
                                total
                            }
                        </div>

                    </Card>

                </Col>


                {/* =============================================
                    ACTIVE ROUTES
                ============================================== */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                >

                    <Card
                        size="small"
                        style={{
                            width: "100%",
                            minHeight: 100,
                            borderRadius: 12,
                        }}
                    >

                        <Text
                            type="secondary"
                        >
                            Active Routes
                        </Text>


                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 26,
                                lineHeight: "34px",
                                fontWeight: 600,
                                color: "#141414",
                            }}
                        >
                            {
                                activeCount
                            }
                        </div>

                    </Card>

                </Col>


                {/* =============================================
                    MAPPED DRUGS
                ============================================== */}

                <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                >

                    <Card
                        size="small"
                        style={{
                            width: "100%",
                            minHeight: 100,
                            borderRadius: 12,
                        }}
                    >

                        <Text
                            type="secondary"
                        >
                            Mapped Drugs
                        </Text>


                        <div
                            style={{
                                marginTop: 8,
                                fontSize: 26,
                                lineHeight: "34px",
                                fontWeight: 600,
                                color: "#141414",
                            }}
                        >
                            {
                                mappedDrugCount
                            }
                        </div>

                    </Card>

                </Col>

            </Row>


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
                        onClose={() =>
                            setError(
                                null
                            )
                        }
                        style={{
                            marginBottom: 16,
                        }}
                    />

                )
            }


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <Card
                size="small"
                style={{
                    width: "100%",
                    marginBottom: 16,
                    borderRadius: 12,
                }}
            >

                <Row
                    gutter={[
                        12,
                        12,
                    ]}
                    align="middle"
                >

                    {/* =========================================
                        SEARCH
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                    >

                        <Input
                            value={
                                searchInput
                            }

                            onChange={(
                                event
                            ) =>
                                setSearchInput(
                                    event.target.value
                                )
                            }

                            onKeyDown={
                                handleSearchKeyDown
                            }

                            placeholder="Search route code, name..."

                            prefix={
                                <SearchOutlined />
                            }

                            allowClear

                            onClear={() => {

                                setSearchInput(
                                    ""
                                );

                                setQuery(
                                    (
                                        previous
                                    ) => ({

                                        ...previous,

                                        search:
                                            "",

                                        page:
                                            1,
                                    })
                                );

                            }}

                            style={{
                                width: "100%",
                                height: 44,
                                borderRadius: 8,
                            }}
                        />

                    </Col>


                    {/* =========================================
                        ROUTE TYPE
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={5}
                        lg={4}
                    >

                        <Select
                            value={
                                query.routeType
                            }

                            placeholder="Route Type"

                            allowClear

                            options={
                                DRUG_ROUTE_TYPES
                            }

                            onChange={
                                handleRouteTypeChange
                            }

                            style={{
                                width: "100%",
                            }}
                        />

                    </Col>


                    {/* =========================================
                        STATUS
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={4}
                        lg={3}
                    >

                        <Select
                            value={
                                query.status
                            }

                            placeholder="Status"

                            allowClear

                            options={[
                                {
                                    label:
                                        "Active",

                                    value:
                                        "Active",
                                },

                                {
                                    label:
                                        "Inactive",

                                    value:
                                        "Inactive",
                                },
                            ]}

                            onChange={
                                handleStatusChange
                            }

                            style={{
                                width: "100%",
                            }}
                        />

                    </Col>


                    {/* =========================================
                        USAGE
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={4}
                        lg={3}
                    >

                        <Select
                            value={
                                query.usage ===
                                "ALL"
                                    ? undefined
                                    : query.usage
                            }

                            placeholder="Usage"

                            allowClear

                            options={[
                                {
                                    label:
                                        "Used",

                                    value:
                                        "USED",
                                },

                                {
                                    label:
                                        "Unused",

                                    value:
                                        "UNUSED",
                                },
                            ]}

                            onChange={
                                handleUsageChange
                            }

                            style={{
                                width: "100%",
                            }}
                        />

                    </Col>


                    {/* =========================================
                        SEARCH BUTTON
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={4}
                        lg={4}
                    >

                        <Button
                            type="primary"
                            icon={
                                <SearchOutlined />
                            }
                            onClick={
                                handleSearch
                            }
                            style={{
                                width: "100%",
                                height: 40,
                                borderRadius: 8,
                            }}
                        >
                            Search
                        </Button>

                    </Col>


                    {/* =========================================
                        RESET
                    ========================================== */}

                    <Col
                        xs={24}
                        sm={12}
                        md={3}
                        lg={3}
                    >

                        <Button
                            icon={
                                <ReloadOutlined />
                            }
                            onClick={
                                handleReset
                            }
                            style={{
                                width: "100%",
                                height: 40,
                                borderRadius: 8,
                            }}
                        >
                            Reset
                        </Button>

                    </Col>

                </Row>

            </Card>


            {/* =================================================
                TABLE
            ================================================= */}

            <Card
                style={{
                    width: "100%",
                    borderRadius: 12,
                }}
            >

                <Table
                    rowKey="id"

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

                    onChange={
                        handleTableChange
                    }

                    locale={{
                        emptyText: (
                            <Empty
                                description="No drug routes found"
                            />
                        ),
                    }}

                    scroll={{
                        x: 1350,
                    }}

                    pagination={{
                        current:
                            query.page,

                        pageSize:
                            query.pageSize,

                        total:
                            total,

                        showSizeChanger:
                            true,

                        showQuickJumper:
                            true,

                        showTotal:
                            (
                                count,
                                range
                            ) =>
                                `${range[0]}-${range[1]} of ${count} routes`,
                    }}
                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <DrugRouteDrawer
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
                    loading ||
                    actionLoading
                }

                routeList={
                    drugRouteList
                }

                onClose={
                    handleDrawerClose
                }

                onSubmit={
                    handleSubmit
                }

                onSuccess={
                    handleSuccess
                }
            />

        </div>
    );
};


export default DrugRoutePage;