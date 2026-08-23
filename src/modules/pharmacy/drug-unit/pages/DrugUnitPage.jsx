/* =========================================================
   DRUG UNIT PAGE
   ========================================================= */

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
    Empty,
    Input,
    Select,
    Space,
    Table,
    Typography,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";


import getDrugUnitColumns
    from "../columns/drugUnit.columns";


import DrugUnitDrawer
    from "../components/DrugUnitDrawer";


import drugUnitService
    from "../services/drugUnit.service";


import {
    DRUG_UNIT_FORM_MODES,
    DRUG_UNIT_STATUS_OPTIONS,
    DRUG_UNIT_TYPE_OPTIONS,
    DRUG_UNIT_USAGE,
} from "../constants/drugUnit.constants";


import {
    createDrugUnitQuery,
    createDrugUnitQueryFromTable,
} from "../utils/drugUnit.query";

import "../styles/drugUnit.css";

const {
    Title,
    Text,
} = Typography;


/* =========================================================
   COMPONENT
   ========================================================= */

const DrugUnitPage = () => {

    /* =====================================================
       QUERY
       ===================================================== */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createDrugUnitQuery()
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
       STATS
       ===================================================== */

    const [
        stats,
        setStats,
    ] = useState({

        total: 0,

        active: 0,

        inactive: 0,

        mappedDrugs: 0,

    });


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
        DRUG_UNIT_FORM_MODES.CREATE
    );


    const [
        selectedRecord,
        setSelectedRecord,
    ] = useState(null);


    /* =====================================================
       SEARCH
       ===================================================== */

    const [
        searchInput,
        setSearchInput,
    ] = useState("");


    /* =====================================================
       LOAD DATA
       ===================================================== */

    const loadData =
        useCallback(
            async (
                currentQuery
                    = query
            ) => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        null
                    );


                    const response =
                        await drugUnitService.getAll(
                            currentQuery
                        );


                    setData(
                        response.items || []
                    );


                    setTotal(
                        response.total || 0
                    );

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to load drug units."
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
       LOAD STATS
       ===================================================== */

    const loadStats =
        useCallback(
            async () => {

                try {

                    const response =
                        await drugUnitService.getStats();


                    setStats(
                        response
                    );

                }
                catch (
                    caughtError
                ) {

                    /*
                     * Statistics should not
                     * block the table.
                     */

                    console.error(
                        caughtError
                    );

                }

            },
            []
        );


    /* =====================================================
       INITIAL LOAD
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


    useEffect(
        () => {

            loadStats();

        },
        [
            loadStats,
        ]
    );


    /* =====================================================
       SEARCH
       ===================================================== */

    const handleSearch =
        () => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    search:
                        searchInput
                            .trim(),

                    page:
                        1,

                })
            );
        };


    /* =====================================================
       SEARCH ENTER
       ===================================================== */

    const handleSearchKeyDown =
        (
            event
        ) => {

            if (
                event.key ===
                "Enter"
            ) {

                handleSearch();

            }

        };


    /* =====================================================
       SEARCH CLEAR
       ===================================================== */

    const handleSearchClear =
        () => {

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

        };


    /* =====================================================
       UNIT TYPE
       ===================================================== */

    const handleUnitTypeChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    unitType:
                        value ||
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       STATUS
       ===================================================== */

    const handleStatusChange =
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

        };


    /* =====================================================
       USAGE
       ===================================================== */

    const handleUsageChange =
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
                        DRUG_UNIT_USAGE.ALL,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       RESET
       ===================================================== */

    const handleReset =
        () => {

            const defaultQuery =
                createDrugUnitQuery();


            setSearchInput(
                ""
            );


            setQuery(
                defaultQuery
            );

        };


    /* =====================================================
       TABLE CHANGE
       ===================================================== */

    const handleTableChange =
        (
            pagination,
            filters,
            sorter
        ) => {

            const nextQuery =
                createDrugUnitQueryFromTable(
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

        };


    /* =====================================================
       CREATE
       ===================================================== */

    const handleCreate =
        () => {

            setSelectedRecord(
                null
            );


            setDrawerMode(
                DRUG_UNIT_FORM_MODES.CREATE
            );


            setDrawerOpen(
                true
            );

        };


    /* =====================================================
       VIEW
       ===================================================== */

    const handleView =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );


            setDrawerMode(
                DRUG_UNIT_FORM_MODES.VIEW
            );


            setDrawerOpen(
                true
            );

        };


    /* =====================================================
       EDIT
       ===================================================== */

    const handleEdit =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );


            setDrawerMode(
                DRUG_UNIT_FORM_MODES.EDIT
            );


            setDrawerOpen(
                true
            );

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
       SUBMIT
       ===================================================== */

    const handleSubmit =
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
                    DRUG_UNIT_FORM_MODES.CREATE
                ) {

                    result =
                        await drugUnitService.create(
                            payload
                        );

                }
                else if (
                    context?.mode ===
                    DRUG_UNIT_FORM_MODES.EDIT
                ) {

                    result =
                        await drugUnitService.update(
                            context.id,
                            payload
                        );

                }
                else {

                    throw new Error(
                        "Invalid drug unit form mode."
                    );

                }


                /*
                 * Refresh table and stats.
                 */

                await Promise.all([
                    loadData(
                        query
                    ),

                    loadStats(),
                ]);


                /*
                 * Return result to drawer/form.
                 */

                return result;

            }
            catch (
                caughtError
            ) {

                /*
                 * Let the form display
                 * the actual service error.
                 */

                throw caughtError;

            }
            finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       SUCCESS
       ===================================================== */

    const handleSuccess =
        async () => {

            await Promise.all([
                loadData(
                    query
                ),

                loadStats(),
            ]);

        };


    /* =====================================================
       ACTIVATE
       ===================================================== */

    const handleActivate =
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


                await drugUnitService.activate(
                    record.id
                );


                await Promise.all([
                    loadData(
                        query
                    ),

                    loadStats(),
                ]);

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to activate drug unit."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       DEACTIVATE
       ===================================================== */

    const handleDeactivate =
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


                await drugUnitService.deactivate(
                    record.id
                );


                await Promise.all([
                    loadData(
                        query
                    ),

                    loadStats(),
                ]);

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to deactivate drug unit."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       COLUMNS
       ===================================================== */

    const columns =
        useMemo(
            () =>
                getDrugUnitColumns(
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
       RENDER
       ===================================================== */

    return (

        <div
            className="drug-unit-page"
        >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div
                className="drug-unit-page-header"
            >

                <div
                    className="drug-unit-page-header-content"
                >

                    <Title
                        level={3}
                        className="drug-unit-page-title"
                    >
                        Drug Unit Master
                    </Title>


                    <Text
                        type="secondary"
                        className="drug-unit-page-description"
                    >
                        Manage standard units used for
                        drug quantities, strengths, and
                        pharmacy inventory.
                    </Text>

                </div>


                <div
                    className="drug-unit-page-header-action"
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
                    >
                        Add Drug Unit
                    </Button>

                </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div
                className="drug-unit-summary-grid"
            >

                {/* =========================================
                    TOTAL
                ========================================== */}

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Total Units
                    </Text>


                    <div
                        className="drug-unit-summary-value"
                    >
                        {
                            stats.total
                        }
                    </div>

                </Card>


                {/* =========================================
                    ACTIVE
                ========================================== */}

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Active Units
                    </Text>


                    <div
                        className="drug-unit-summary-value"
                    >
                        {
                            stats.active
                        }
                    </div>

                </Card>


                {/* =========================================
                    INACTIVE
                ========================================== */}

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Inactive Units
                    </Text>


                    <div
                        className="drug-unit-summary-value"
                    >
                        {
                            stats.inactive
                        }
                    </div>

                </Card>


                {/* =========================================
                    MAPPED DRUGS
                ========================================== */}

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Mapped Drugs
                    </Text>


                    <div
                        className="drug-unit-summary-value"
                    >
                        {
                            stats.mappedDrugs
                        }
                    </div>

                </Card>

            </div>


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
                            marginBottom:
                                16,
                        }}
                    />

                )
            }


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <Card
                className="drug-unit-filter-card"
                size="small"
            >

                <Space
                    wrap
                    size={[
                        12,
                        12,
                    ]}
                    style={{
                        width:
                            "100%",
                    }}
                >

                    {/* =========================================
                        SEARCH
                    ========================================== */}

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
                        placeholder={
                            "Search unit code, name, symbol..."
                        }
                        prefix={
                            <SearchOutlined />
                        }
                        allowClear
                        onClear={
                            handleSearchClear
                        }
                        style={{
                            width:
                                280,
                        }}
                    />


                    {/* =========================================
                        UNIT TYPE
                    ========================================== */}

                    <Select
                        value={
                            query.unitType
                        }
                        placeholder="Unit Type"
                        allowClear
                        style={{
                            width:
                                170,
                        }}
                        options={
                            DRUG_UNIT_TYPE_OPTIONS
                        }
                        onChange={
                            handleUnitTypeChange
                        }
                    />


                    {/* =========================================
                        STATUS
                    ========================================== */}

                    <Select
                        value={
                            query.status
                        }
                        placeholder="Status"
                        allowClear
                        style={{
                            width:
                                150,
                        }}
                        options={
                            DRUG_UNIT_STATUS_OPTIONS
                        }
                        onChange={
                            handleStatusChange
                        }
                    />


                    {/* =========================================
                        USAGE
                    ========================================== */}

                    <Select
                        value={
                            query.usage ===
                                DRUG_UNIT_USAGE.ALL
                                ? undefined
                                : query.usage
                        }
                        placeholder="Usage"
                        allowClear
                        style={{
                            width:
                                150,
                        }}
                        options={[
                            {
                                label:
                                    "Used",

                                value:
                                    DRUG_UNIT_USAGE.USED,
                            },

                            {
                                label:
                                    "Unused",

                                value:
                                    DRUG_UNIT_USAGE.UNUSED,
                            },
                        ]}
                        onChange={
                            handleUsageChange
                        }
                    />


                    {/* =========================================
                        SEARCH
                    ========================================== */}

                    <Button
                        type="primary"
                        icon={
                            <SearchOutlined />
                        }
                        onClick={
                            handleSearch
                        }
                    >
                        Search
                    </Button>


                    {/* =========================================
                        RESET
                    ========================================== */}

                    <Button
                        icon={
                            <ReloadOutlined />
                        }
                        onClick={
                            handleReset
                        }
                    >
                        Reset
                    </Button>

                </Space>

            </Card>


            {/* =================================================
                TABLE
            ================================================= */}

            <Card
                className="drug-unit-table-card"
                style={{
                    marginTop:
                        16,
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
                                description={
                                    "No drug units found"
                                }
                            />

                        ),
                    }}

                    scroll={{
                        x:
                            1250,
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
                                `${range[0]}-${range[1]} of ${count} units`,

                    }}

                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <DrugUnitDrawer

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


export default DrugUnitPage;