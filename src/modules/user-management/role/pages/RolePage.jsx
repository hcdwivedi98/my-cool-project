// src/modules/user-management/role/pages/RolePage.jsx

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
    Tag,
    Typography,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import getRoleColumns
    from "../columns/role.columns";

import RoleDrawer
    from "../components/RoleDrawer";

import roleService
    from "../services/role.service";

import {
    ROLE_FORM_MODES,
    ROLE_SCOPE_OPTIONS,
    ROLE_STATUS,
    ROLE_STATUS_OPTIONS,
    ROLE_TYPE_OPTIONS,
} from "../constants/role.constants";

import {
    createRoleQuery,
    createRoleQueryFromTable,
} from "../utils/role.query";

import {
    roleList,
    permissionList,
} from "../mock/role.mock";

import "../styles/role.css";


const {
    Title,
    Text,
} = Typography;


/* =========================================================
   ROLE PAGE
   ========================================================= */

const RolePage = () => {

    /* =====================================================
       QUERY
    ===================================================== */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createRoleQuery()
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
       SEARCH
    ===================================================== */

    const [
        searchInput,
        setSearchInput,
    ] = useState("");


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
        ROLE_FORM_MODES.CREATE
    );


    const [
        selectedRecord,
        setSelectedRecord,
    ] = useState(null);


    /* =====================================================
       STATISTICS
    ===================================================== */

    const [
        statistics,
        setStatistics,
    ] = useState({
        total:
            0,

        active:
            0,

        inactive:
            0,

        system:
            0,

        custom:
            0,

        assignedUsers:
            0,
    });


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
                        await roleService.getAll(
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
                        "Unable to load roles."
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
       LOAD STATISTICS
    ===================================================== */

    const loadStatistics =
        useCallback(
            async () => {

                try {

                    const response =
                        await roleService.getStatistics();


                    setStatistics(
                        response
                    );

                }
                catch (
                    caughtError
                ) {

                    console.error(
                        caughtError
                    );

                }

            },
            []
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
       INITIAL STATISTICS
    ===================================================== */

    useEffect(
        () => {

            loadStatistics();

        },
        [
            loadStatistics,
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
       ROLE TYPE
    ===================================================== */

    const handleRoleTypeChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    roleType:
                        value ||
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       SCOPE
    ===================================================== */

    const handleScopeChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    scope:
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
       RESET
    ===================================================== */

    const handleReset =
        () => {

            setSearchInput(
                ""
            );


            setQuery(
                createRoleQuery()
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

                loadStatistics(),
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
                createRoleQueryFromTable({
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
       CREATE
    ===================================================== */

    const handleCreate =
        () => {

            setSelectedRecord(
                null
            );

            setDrawerMode(
                ROLE_FORM_MODES.CREATE
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

                setActionLoading(
                    true
                );


                const fullRecord =
                    await roleService.getById(
                        record.id
                    );


                setSelectedRecord(
                    fullRecord
                );


                setDrawerMode(
                    ROLE_FORM_MODES.VIEW
                );


                setDrawerOpen(
                    true
                );

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to load role."
                );

            }
            finally {

                setActionLoading(
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

                setActionLoading(
                    true
                );


                const fullRecord =
                    await roleService.getById(
                        record.id
                    );


                setSelectedRecord(
                    fullRecord
                );


                setDrawerMode(
                    ROLE_FORM_MODES.EDIT
                );


                setDrawerOpen(
                    true
                );

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to load role."
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

            setError(
                null
            );


            try {

                let result;


                if (
                    context?.mode ===
                    ROLE_FORM_MODES.CREATE
                ) {

                    result =
                        await roleService.create(
                            payload
                        );

                }
                else if (
                    context?.mode ===
                    ROLE_FORM_MODES.EDIT
                ) {

                    result =
                        await roleService.update(
                            context.id,
                            payload
                        );

                }
                else {

                    throw new Error(
                        "Invalid role form mode."
                    );

                }


                await loadData(
                    query
                );


                await loadStatistics();


                /*
                 * Close after successful save.
                 */

                setDrawerOpen(
                    false
                );

                setSelectedRecord(
                    null
                );


                return result;

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to save role."
                );

                throw caughtError;

            }
            finally {

                setActionLoading(
                    false
                );

            }

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


                await roleService.activate(
                    record.id
                );


                await loadData(
                    query
                );


                await loadStatistics();

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to activate role."
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


                await roleService.deactivate(
                    record.id
                );


                await loadData(
                    query
                );


                await loadStatistics();

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to deactivate role."
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
                getRoleColumns({

                    onView:
                        handleView,

                    onEdit:
                        handleEdit,

                    onActivate:
                        handleActivate,

                    onDeactivate:
                        handleDeactivate,

                }),
            []
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="role-page"
        >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div
                className="role-page-header"
            >

                <div
                    className="role-page-header-content"
                >

                    <Title
                        level={3}
                        className="role-page-title"
                    >
                        Role Master
                    </Title>


                    <Text
                        type="secondary"
                        className="role-page-description"
                    >
                        Manage application roles and their
                        permissions across the pharmacy ERP.
                    </Text>

                </div>


                <div
                    className="role-page-header-action"
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
                        Add Role
                    </Button>

                </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div
                className="role-summary-grid"
            >

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Total Roles
                    </Text>


                    <div
                        className="role-summary-value"
                    >
                        {
                            statistics.total
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Active Roles
                    </Text>


                    <div
                        className="role-summary-value"
                    >
                        {
                            statistics.active
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        System Roles
                    </Text>


                    <div
                        className="role-summary-value"
                    >
                        {
                            statistics.system
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Assigned Users
                    </Text>


                    <div
                        className="role-summary-value"
                    >
                        {
                            statistics.assignedUsers
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

                        style={{
                            marginBottom:
                                16,
                        }}

                        onClose={() =>
                            setError(
                                null
                            )
                        }

                    />

                )
            }


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <Card
                className="role-filter-card"

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

                    {/* SEARCH */}

                    <Input
                        value={
                            searchInput
                        }

                        placeholder={
                            "Search role code, name..."
                        }

                        prefix={
                            <SearchOutlined />
                        }

                        allowClear

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

                        onClear={
                            handleSearchClear
                        }

                        style={{
                            width:
                                280,
                        }}
                    />


                    {/* ROLE TYPE */}

                    <Select
                        value={
                            query.roleType
                        }

                        placeholder={
                            "Role Type"
                        }

                        allowClear

                        options={
                            ROLE_TYPE_OPTIONS
                        }

                        onChange={
                            handleRoleTypeChange
                        }

                        style={{
                            width:
                                170,
                        }}
                    />


                    {/* SCOPE */}

                    <Select
                        value={
                            query.scope
                        }

                        placeholder={
                            "Scope"
                        }

                        allowClear

                        options={
                            ROLE_SCOPE_OPTIONS
                        }

                        onChange={
                            handleScopeChange
                        }

                        style={{
                            width:
                                160,
                        }}
                    />


                    {/* STATUS */}

                    <Select
                        value={
                            query.status
                        }

                        placeholder={
                            "Status"
                        }

                        allowClear

                        options={
                            ROLE_STATUS_OPTIONS
                        }

                        onChange={
                            handleStatusChange
                        }

                        style={{
                            width:
                                150,
                        }}
                    />


                    {/* SEARCH */}

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


                    {/* RESET */}

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


                    {/* REFRESH */}

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
                className="role-table-card"

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
                                    "No roles found"
                                }
                            />

                        ),
                    }}

                    scroll={{
                        x:
                            1350,
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
                                `${range[0]}-${range[1]} of ${count} roles`,

                    }}

                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <RoleDrawer

                open={
                    drawerOpen
                }

                mode={
                    drawerMode
                }

                record={
                    selectedRecord
                }

                roles={
                    roleList
                }

                permissions={
                    permissionList
                }

                loading={
                    actionLoading
                }

                error={
                    error
                }

                onClose={
                    handleDrawerClose
                }

                onSubmit={
                    handleSubmit
                }

            />

        </div>

    );

};


export default RolePage;