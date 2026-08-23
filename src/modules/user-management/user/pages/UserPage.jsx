/* =========================================================
   USER MANAGEMENT PAGE
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
    Tag,
    Typography,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserOutlined,
} from "@ant-design/icons";

import getUserColumns
    from "../columns/user.columns";

import UserDrawer
    from "../components/UserDrawer";

import userService
    from "../services/user.service";

import {
    USER_FORM_MODES,
    USER_STATUS_OPTIONS,
    USER_TYPE_OPTIONS,
    USER_USAGE,
    USER_USAGE_OPTIONS,
} from "../constants/user.constants";

import {
    createUserQuery,
    createUserQueryFromTable,
} from "../utils/user.query";

import useUserLookup
    from "../hooks/useUserLookup";

import "../styles/userMaster.css";


const {
    Title,
    Text,
} = Typography;


/* =========================================================
   PAGE
   ========================================================= */

const UserPage = () => {

    /* =====================================================
       QUERY
    ===================================================== */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createUserQuery()
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

        total: 0,

        active: 0,

        loginEnabled: 0,

        locked: 0,

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
        USER_FORM_MODES.CREATE
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
       LOOKUPS
    ===================================================== */

    const {
        departmentOptions,
        designationOptions,
        roleOptions,
    } =
        useUserLookup();


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
                        await userService.getAll(
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
                        "Unable to load users."
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
                        await userService.getSummary();


                    setSummary(
                        response
                    );

                }
                catch (
                    caughtError
                ) {

                    setError(
                        caughtError?.message ||
                        "Unable to load user summary."
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
       SUMMARY LOAD
    ===================================================== */

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
       USER TYPE
    ===================================================== */

    const handleUserTypeChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    userType:
                        value ||
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       DEPARTMENT
    ===================================================== */

    const handleDepartmentChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    departmentId:
                        value ||
                        undefined,

                    designationId:
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       DESIGNATION
    ===================================================== */

    const handleDesignationChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    designationId:
                        value ||
                        undefined,

                    page:
                        1,

                })
            );

        };


    /* =====================================================
       ROLE
    ===================================================== */

    const handleRoleChange =
        (
            value
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    roleId:
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
                        USER_USAGE.ALL,

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
                createUserQuery()
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
                createUserQueryFromTable(
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
                USER_FORM_MODES.CREATE
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
                USER_FORM_MODES.VIEW
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
                USER_FORM_MODES.EDIT
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

            if (
                loading ||
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
                    USER_FORM_MODES.CREATE
                ) {

                    result =
                        await userService.create(
                            payload
                        );

                }
                else if (
                    context?.mode ===
                    USER_FORM_MODES.EDIT
                ) {

                    result =
                        await userService.update(
                            context.id,
                            payload
                        );

                }
                else {

                    throw new Error(
                        "Invalid user form mode."
                    );

                }


                await loadData(
                    query
                );


                await loadSummary();


                /*
                 * Update selected record
                 * after edit.
                 */

                if (
                    context?.mode ===
                    USER_FORM_MODES.EDIT
                ) {

                    setSelectedRecord(
                        result
                    );

                }


                return result;

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to save user."
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
       SUCCESS
    ===================================================== */

    const handleSuccess =
        async () => {

            await loadData(
                query
            );

            await loadSummary();

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


                await userService.activate(
                    record.id
                );


                await loadData(
                    query
                );

                await loadSummary();

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to activate user."
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


                await userService.deactivate(
                    record.id
                );


                await loadData(
                    query
                );

                await loadSummary();

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to deactivate user."
                );

            }
            finally {

                setActionLoading(
                    false
                );

            }

        };


    /* =====================================================
       UNLOCK
    ===================================================== */

    const handleUnlock =
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


                await userService.unlock(
                    record.id
                );


                await loadData(
                    query
                );

                await loadSummary();

            }
            catch (
                caughtError
            ) {

                setError(
                    caughtError?.message ||
                    "Unable to unlock user."
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
                getUserColumns(
                    {

                        onView:
                            handleView,

                        onEdit:
                            handleEdit,

                        onActivate:
                            handleActivate,

                        onDeactivate:
                            handleDeactivate,

                        onUnlock:
                            handleUnlock,

                    }
                ),
            []
        );


    /* =====================================================
       FILTERED DESIGNATIONS
    ===================================================== */

    const filteredDesignationOptions =
        query.departmentId
            ? designationOptions.filter(
                (
                    item
                ) =>
                    item.departmentId ===
                    query.departmentId
            )
            : designationOptions;


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="user-page"
        >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div
                className="user-page-header"
            >

                <div
                    className="user-page-header-content"
                >

                    <Title
                        level={3}
                        className="user-page-title"
                    >
                        User Management
                    </Title>


                    <Text
                        type="secondary"
                        className="user-page-description"
                    >
                        Manage hospital users, roles, account
                        status and application access.
                    </Text>

                </div>


                <div
                    className="user-page-header-action"
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
                        Add User
                    </Button>

                </div>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div
                className="user-summary-grid"
            >

                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Total Users
                    </Text>


                    <div
                        className="user-summary-value"
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
                        Active Users
                    </Text>


                    <div
                        className="user-summary-value"
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
                        Login Enabled
                    </Text>


                    <div
                        className="user-summary-value"
                    >
                        {
                            summary.loginEnabled
                        }
                    </div>

                </Card>


                <Card
                    size="small"
                >

                    <Text
                        type="secondary"
                    >
                        Locked Accounts
                    </Text>


                    <div
                        className="user-summary-value"
                    >
                        {
                            summary.locked
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
                className="user-filter-card"
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

                        placeholder="Search user, username, employee ID..."

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
                                ) => ({

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
                        STATUS
                    ========================================== */}

                    <Select
                        value={
                            query.status
                        }

                        placeholder="Status"

                        allowClear

                        options={
                            USER_STATUS_OPTIONS
                        }

                        style={{
                            width:
                                150,
                        }}

                        onChange={
                            handleStatusChange
                        }

                    />


                    {/* =========================================
                        USER TYPE
                    ========================================== */}

                    <Select
                        value={
                            query.userType
                        }

                        placeholder="User Type"

                        allowClear

                        showSearch

                        optionFilterProp="label"

                        options={
                            USER_TYPE_OPTIONS
                        }

                        style={{
                            width:
                                180,
                        }}

                        onChange={
                            handleUserTypeChange
                        }

                    />


                    {/* =========================================
                        DEPARTMENT
                    ========================================== */}

                    <Select
                        value={
                            query.departmentId
                        }

                        placeholder="Department"

                        allowClear

                        showSearch

                        optionFilterProp="label"

                        options={
                            departmentOptions
                        }

                        style={{
                            width:
                                180,
                        }}

                        onChange={
                            handleDepartmentChange
                        }

                    />


                    {/* =========================================
                        DESIGNATION
                    ========================================== */}

                    <Select
                        value={
                            query.designationId
                        }

                        placeholder="Designation"

                        allowClear

                        showSearch

                        optionFilterProp="label"

                        options={
                            filteredDesignationOptions
                        }

                        style={{
                            width:
                                180,
                        }}

                        onChange={
                            handleDesignationChange
                        }

                    />


                    {/* =========================================
                        ROLE
                    ========================================== */}

                    <Select
                        value={
                            query.roleId
                        }

                        placeholder="Role"

                        allowClear

                        showSearch

                        optionFilterProp="label"

                        options={
                            roleOptions
                        }

                        style={{
                            width:
                                180,
                        }}

                        onChange={
                            handleRoleChange
                        }

                    />


                    {/* =========================================
                        LOGIN
                    ========================================== */}

                    <Select
                        value={
                            query.usage ===
                                USER_USAGE.ALL
                                ? undefined
                                : query.usage
                        }

                        placeholder="Login Access"

                        allowClear

                        options={
                            USER_USAGE_OPTIONS
                        }

                        style={{
                            width:
                                170,
                        }}

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
                className="user-table-card"

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
                                image={
                                    <UserOutlined
                                        style={{
                                            fontSize:
                                                42,

                                            color:
                                                "#bfbfbf",
                                        }}
                                    />
                                }

                                description="No users found"
                            />

                        ),
                    }}

                    scroll={{
                        x:
                            1850,
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
                                count === 0
                                    ? "0 users"
                                    : `${range[0]}-${range[1]} of ${count} users`,
                    }}

                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <UserDrawer

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

                error={
                    error
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


export default UserPage;