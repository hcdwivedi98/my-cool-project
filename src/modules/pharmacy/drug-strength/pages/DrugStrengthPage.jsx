// src/modules/pharmacy/drug-strength/pages/DrugStrengthPage.jsx

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
    Popconfirm,
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

import getDrugStrengthColumns
    from "../columns/drugStrength.columns";

import DrugStrengthDrawer
    from "../components/DrugStrengthDrawer";

import drugStrengthService
    from "../services/drugStrength.service";

import {
    DRUG_STRENGTH_FORM_MODES,
    DRUG_STRENGTH_STATUS,
    DRUG_STRENGTH_TYPES,
    DRUG_STRENGTH_USAGE,
} from "../constants/drugStrength.constants";

import {
    createDrugStrengthQuery,
    createDrugStrengthQueryFromTable,
} from "../utils/drugStrength.query";

import {
    drugStrengthList,
} from "../mock/drugStrength.mock";

import "../styles/drugStrength.css";

const {
    Title,
    Text,
} = Typography;


/* =========================================================
   PAGE
   ========================================================= */

const DrugStrengthPage = () => {

    /* =====================================================
       QUERY
    ===================================================== */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createDrugStrengthQuery()
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
       SUMMARY
    ===================================================== */

    const [
        summary,
        setSummary,
    ] = useState({
        total:
            0,

        active:
            0,

        inactive:
            0,

        mappedDrugCount:
            0,

        used:
            0,

        unused:
            0,
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
        DRUG_STRENGTH_FORM_MODES.CREATE
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
       UNIT OPTIONS
    ===================================================== */

    const unitOptions =
        useMemo(
            () => {

                const map =
                    new Map();


                drugStrengthList.forEach(
                    (
                        item
                    ) => {

                        if (
                            item.strengthUnitId &&
                            !map.has(
                                item.strengthUnitId
                            )
                        ) {

                            map.set(
                                item.strengthUnitId,
                                {
                                    label:
                                        item.strengthUnitName ||
                                        item.strengthUnitCode,

                                    value:
                                        item.strengthUnitId,
                                }
                            );

                        }

                    }
                );


                return Array.from(
                    map.values()
                );

            },
            []
        );


    /* =====================================================
       LOAD DATA
    ===================================================== */

    const loadData =
        useCallback(
            async (
                currentQuery
            ) => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        null
                    );


                    const response =
                        await drugStrengthService.getAll(
                            currentQuery
                        );


                    setData(
                        response.items ||
                        []
                    );


                    setTotal(
                        response.total ||
                        0
                    );

                }
                catch (
                caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to load drug strengths."
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
            []
        );


    /* =====================================================
       LOAD SUMMARY
    ===================================================== */

    const loadSummary =
        useCallback(
            async () => {

                try {

                    const response =
                        await drugStrengthService.getSummary();


                    setSummary(
                        response
                    );

                }
                catch (
                caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to load drug strength summary."
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

            loadSummary();

        },
        [
            loadSummary,
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
                ) => createDrugStrengthQuery({

                    ...previous,

                    search:
                        searchInput.trim(),

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
       STRENGTH TYPE
    ===================================================== */

    const handleStrengthTypeChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => createDrugStrengthQuery({

                    ...previous,

                    strengthType:
                        value ||
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       UNIT
    ===================================================== */

    const handleUnitChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => createDrugStrengthQuery({

                    ...previous,

                    strengthUnitId:
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
                ) => createDrugStrengthQuery({

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
                ) => createDrugStrengthQuery({

                    ...previous,

                    usage:
                        value ||
                        DRUG_STRENGTH_USAGE.ALL,

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

            setSearchInput(
                ""
            );


            setQuery(
                createDrugStrengthQuery()
            );

        };


    /* =====================================================
       REFRESH
    ===================================================== */

    const handleRefresh =
        async () => {

            await Promise.all([
                loadData(
                    query
                ),

                loadSummary(),
            ]);

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
                createDrugStrengthQueryFromTable({

                    pagination,

                    filters,

                    sorter,

                    currentQuery:
                        query,

                });


            setQuery(
                nextQuery
            );

        };


    /* =====================================================
       OPEN CREATE
    ===================================================== */

    const handleCreate =
        () => {

            setSelectedRecord(
                null
            );


            setDrawerMode(
                DRUG_STRENGTH_FORM_MODES.CREATE
            );


            setDrawerOpen(
                true
            );

        };


    /* =====================================================
       OPEN VIEW
    ===================================================== */

    const handleView =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );


            setDrawerMode(
                DRUG_STRENGTH_FORM_MODES.VIEW
            );


            setDrawerOpen(
                true
            );

        };


    /* =====================================================
       OPEN EDIT
    ===================================================== */

    const handleEdit =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );


            setDrawerMode(
                DRUG_STRENGTH_FORM_MODES.EDIT
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
                    DRUG_STRENGTH_FORM_MODES.CREATE
                ) {

                    result =
                        await drugStrengthService.create(
                            payload
                        );

                }
                else if (
                    context?.mode ===
                    DRUG_STRENGTH_FORM_MODES.EDIT
                ) {

                    result =
                        await drugStrengthService.update(
                            context.id,
                            payload
                        );

                }
                else {

                    throw new Error(
                        "Invalid drug strength form mode."
                    );

                }


                await loadData(
                    query
                );


                await loadSummary();


                return result;

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

                loadSummary(),
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


                await drugStrengthService.activate(
                    record.id
                );


                await Promise.all([
                    loadData(
                        query
                    ),

                    loadSummary(),
                ]);

            }
            catch (
            caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to activate drug strength."
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


                await drugStrengthService.deactivate(
                    record.id
                );


                await Promise.all([
                    loadData(
                        query
                    ),

                    loadSummary(),
                ]);

            }
            catch (
            caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to deactivate drug strength."
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

    const handleDelete =
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


                await drugStrengthService.delete(
                    record.id
                );


                /*
                 * If last record of current page
                 * was deleted, move to previous page.
                 */

                const currentPageItemCount =
                    data.length;


                if (
                    currentPageItemCount ===
                    1 &&
                    query.page >
                    1
                ) {

                    setQuery(
                        (
                            previous
                        ) => createDrugStrengthQuery({

                            ...previous,

                            page:
                                previous.page -
                                1,

                        })
                    );

                }
                else {

                    await loadData(
                        query
                    );

                }


                await loadSummary();

            }
            catch (
            caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to delete drug strength."
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
                getDrugStrengthColumns({

                    onView:
                        handleView,

                    onEdit:
                        handleEdit,

                    onActivate:
                        handleActivate,

                    onDeactivate:
                        handleDeactivate,

                    onDelete:
                        handleDelete,

                }),
            []
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div
            className="drug-strength-page"
        >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            {/* =================================================
    PAGE HEADER
================================================= */}

            <div className="drug-strength-page-header">

                <div className="drug-strength-page-header-content">

                    <Title
                        level={3}
                        className="drug-strength-page-title"
                    >
                        Drug Strength Master
                    </Title>

                    <Text
                        type="secondary"
                        className="drug-strength-page-description"
                    >
                        Manage standardized drug strengths used
                        throughout the hospital pharmacy.
                    </Text>

                </div>

                <Button
                    className="drug-strength-add-button"
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                >
                    Add Drug Strength
                </Button>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div
                className="drug-strength-summary-grid"
            >

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Total Strengths
                    </Text>


                    <div
                        className="drug-strength-summary-value"
                    >
                        {
                            summary.total
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Active Strengths
                    </Text>


                    <div
                        className="drug-strength-summary-value"
                    >
                        {
                            summary.active
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Inactive Strengths
                    </Text>


                    <div
                        className="drug-strength-summary-value"
                    >
                        {
                            summary.inactive
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Mapped Drugs
                    </Text>


                    <div
                        className="drug-strength-summary-value"
                    >
                        {
                            summary.mappedDrugCount
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
                className="drug-strength-filter-card"
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

                        placeholder="Search code, strength, unit..."

                        prefix={
                            <SearchOutlined />
                        }

                        allowClear

                        style={{
                            width:
                                280,
                        }}

                        onClear={() => {

                            setSearchInput(
                                ""
                            );


                            setQuery(
                                (
                                    previous
                                ) => createDrugStrengthQuery({

                                    ...previous,

                                    search:
                                        "",

                                    page:
                                        1,

                                })
                            );

                        }}
                    />


                    {/* =========================================
                        STRENGTH TYPE
                    ========================================== */}

                    <Select
                        value={
                            query.strengthType
                        }

                        placeholder="Strength Type"

                        allowClear

                        style={{
                            width:
                                180,
                        }}

                        options={[
                            {
                                label:
                                    "Mass",

                                value:
                                    DRUG_STRENGTH_TYPES.MASS,
                            },

                            {
                                label:
                                    "Volume",

                                value:
                                    DRUG_STRENGTH_TYPES.VOLUME,
                            },

                            {
                                label:
                                    "Concentration",

                                value:
                                    DRUG_STRENGTH_TYPES.CONCENTRATION,
                            },

                            {
                                label:
                                    "Activity",

                                value:
                                    DRUG_STRENGTH_TYPES.ACTIVITY,
                            },

                            {
                                label:
                                    "Percentage",

                                value:
                                    DRUG_STRENGTH_TYPES.PERCENTAGE,
                            },

                            {
                                label:
                                    "Other",

                                value:
                                    DRUG_STRENGTH_TYPES.OTHER,
                            },
                        ]}

                        onChange={
                            handleStrengthTypeChange
                        }
                    />


                    {/* =========================================
                        UNIT
                    ========================================== */}

                    <Select
                        value={
                            query.strengthUnitId
                        }

                        placeholder="Unit"

                        allowClear

                        showSearch

                        optionFilterProp="label"

                        style={{
                            width:
                                150,
                        }}

                        options={
                            unitOptions
                        }

                        onChange={
                            handleUnitChange
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
                                140,
                        }}

                        options={[
                            {
                                label:
                                    "Active",

                                value:
                                    DRUG_STRENGTH_STATUS.ACTIVE,
                            },

                            {
                                label:
                                    "Inactive",

                                value:
                                    DRUG_STRENGTH_STATUS.INACTIVE,
                            },
                        ]}

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
                                DRUG_STRENGTH_USAGE.ALL
                                ? undefined
                                : query.usage
                        }

                        placeholder="Usage"

                        allowClear

                        style={{
                            width:
                                140,
                        }}

                        options={[
                            {
                                label:
                                    "Used",

                                value:
                                    DRUG_STRENGTH_USAGE.USED,
                            },

                            {
                                label:
                                    "Unused",

                                value:
                                    DRUG_STRENGTH_USAGE.UNUSED,
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


                    {/* =========================================
                        REFRESH
                    ========================================== */}

                    <Button
                        onClick={
                            handleRefresh
                        }

                        loading={
                            loading
                        }
                    >
                        Refresh
                    </Button>

                </Space>

            </Card>


            {/* =================================================
                TABLE
            ================================================= */}

            <Card
                className="drug-strength-table-card"

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
                                description="No drug strengths found"
                            />

                        ),
                    }}

                    scroll={{
                        x:
                            1500,
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
                                `${range[0]}-${range[1]} of ${count} strengths`,
                    }}
                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <DrugStrengthDrawer

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

                strengthList={
                    drugStrengthList
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


export default DrugStrengthPage;