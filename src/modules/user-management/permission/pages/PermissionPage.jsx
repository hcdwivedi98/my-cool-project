// src/modules/user-management/permission/pages/PermissionPage.jsx

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
    message,
    Popconfirm,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import PermissionDrawer from "../components/PermissionDrawer";

import {
    permissionColumns,
} from "../columns/permission.columns";

import {
    permissionList,
} from "../mock/permission.mock";

import {
    PERMISSION_STATUS_OPTIONS,
    PERMISSION_TYPE_OPTIONS,
} from "../constants/permission.constants";

import {
    getPermissionModuleLabel,
    getPermissionResourceLabel,
    getPermissionStatusColor,
    getPermissionStatusLabel,
    getPermissionTypeColor,
    getPermissionTypeLabel,
    getUniquePermissionModules,
    getUniquePermissionResources,
} from "../utils/permission.helper";

import {
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
} from "../services/permission.service";

import "../styles/permission.css";
const {
    Title,
    Text,
} = Typography;


/* =========================================================
   PAGE
   ========================================================= */

const PermissionPage = () => {

    const [
        messageApi,
        contextHolder,
    ] =
        message.useMessage();


    /* =====================================================
       QUERY
    ===================================================== */

    const [
        query,
        setQuery,
    ] =
        useState({

            search:
                "",

            moduleCode:
                null,

            resourceCode:
                null,

            status:
                null,

            permissionType:
                null,

            page:
                1,

            pageSize:
                10,

            sortBy:
                "sortOrder",

            sortOrder:
                "asc",

        });


    /* =====================================================
       DATA
    ===================================================== */

    const [
        tableData,
        setTableData,
    ] =
        useState([]);


    const [
        total,
        setTotal,
    ] =
        useState(0);


    /* =====================================================
       LOADING
    ===================================================== */

    const [
        loading,
        setLoading,
    ] =
        useState(false);


    /* =====================================================
       ERROR
    ===================================================== */

    const [
        error,
        setError,
    ] =
        useState(null);


    /* =====================================================
       DRAWER
    ===================================================== */

    const [
        drawerOpen,
        setDrawerOpen,
    ] =
        useState(false);


    const [
        drawerMode,
        setDrawerMode,
    ] =
        useState("CREATE");


    const [
        selectedPermission,
        setSelectedPermission,
    ] =
        useState(null);


    const [
        drawerLoading,
        setDrawerLoading,
    ] =
        useState(false);


    const [
        drawerError,
        setDrawerError,
    ] =
        useState(null);


    /* =====================================================
       MODULE OPTIONS
    ===================================================== */

    const moduleOptions =
        useMemo(
            () => {

                const modules =
                    getUniquePermissionModules(
                        permissionList
                    );


                return modules.map(
                    (
                        moduleCode
                    ) => ({

                        label:
                            getPermissionModuleLabel(
                                moduleCode
                            ),

                        value:
                            moduleCode,

                    })
                );

            },
            []
        );


    /* =====================================================
       RESOURCE OPTIONS
    ===================================================== */

    const resourceOptions =
        useMemo(
            () => {

                const resources =
                    getUniquePermissionResources(
                        permissionList,
                        query.moduleCode
                    );


                return resources.map(
                    (
                        resourceCode
                    ) => ({

                        label:
                            getPermissionResourceLabel(
                                resourceCode
                            ),

                        value:
                            resourceCode,

                    })
                );

            },
            [
                query.moduleCode,
            ]
        );


    /* =====================================================
       LOAD DATA
    ===================================================== */

    const loadPermissions =
        useCallback(
            async () => {

                setLoading(
                    true
                );

                setError(
                    null
                );


                try {

                    const result =
                        await getPermissions(
                            query
                        );


                    setTableData(
                        result.data
                    );


                    setTotal(
                        result.total
                    );

                }
                catch (
                    requestError
                ) {

                    const errorMessage =
                        requestError?.message ||
                        "Unable to load permissions.";


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
                query,
                messageApi,
            ]
        );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    useEffect(
        () => {

            loadPermissions();

        },
        [
            loadPermissions,
        ]
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    const handleSearch = (
        value
    ) => {

        setQuery(
            (
                current
            ) => ({

                ...current,

                search:
                    value,

                page:
                    1,

            })
        );

    };


    /* =====================================================
       MODULE
    ===================================================== */

    const handleModuleChange = (
        value
    ) => {

        setQuery(
            (
                current
            ) => ({

                ...current,

                moduleCode:
                    value ||
                    null,

                resourceCode:
                    null,

                page:
                    1,

            })
        );

    };


    /* =====================================================
       RESOURCE
    ===================================================== */

    const handleResourceChange = (
        value
    ) => {

        setQuery(
            (
                current
            ) => ({

                ...current,

                resourceCode:
                    value ||
                    null,

                page:
                    1,

            })
        );

    };


    /* =====================================================
       STATUS
    ===================================================== */

    const handleStatusChange = (
        value
    ) => {

        setQuery(
            (
                current
            ) => ({

                ...current,

                status:
                    value ||
                    null,

                page:
                    1,

            })
        );

    };


    /* =====================================================
       TYPE
    ===================================================== */

    const handleTypeChange = (
        value
    ) => {

        setQuery(
            (
                current
            ) => ({

                ...current,

                permissionType:
                    value ||
                    null,

                page:
                    1,

            })
        );

    };


    /* =====================================================
       RESET
    ===================================================== */

    const handleReset = () => {

        setQuery({

            search:
                "",

            moduleCode:
                null,

            resourceCode:
                null,

            status:
                null,

            permissionType:
                null,

            page:
                1,

            pageSize:
                10,

            sortBy:
                "sortOrder",

            sortOrder:
                "asc",

        });

    };


    /* =====================================================
       CREATE
    ===================================================== */

    const handleCreate = () => {

        setSelectedPermission(
            null
        );

        setDrawerMode(
            "CREATE"
        );

        setDrawerError(
            null
        );

        setDrawerOpen(
            true
        );

    };


    /* =====================================================
       VIEW
    ===================================================== */

    const handleView = (
        record
    ) => {

        setSelectedPermission(
            record
        );

        setDrawerMode(
            "VIEW"
        );

        setDrawerError(
            null
        );

        setDrawerOpen(
            true
        );

    };


    /* =====================================================
       EDIT
    ===================================================== */

    const handleEdit = (
        record
    ) => {

        setSelectedPermission(
            record
        );

        setDrawerMode(
            "EDIT"
        );

        setDrawerError(
            null
        );

        setDrawerOpen(
            true
        );

    };


    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    const handleDrawerClose = () => {

        if (
            drawerLoading
        ) {

            return;

        }


        setDrawerOpen(
            false
        );

        setSelectedPermission(
            null
        );

        setDrawerError(
            null
        );

    };


    /* =====================================================
       SAVE
    ===================================================== */

    const handleDrawerSubmit =
        async (
            values
        ) => {

            setDrawerLoading(
                true
            );

            setDrawerError(
                null
            );


            try {

                if (
                    drawerMode ===
                    "EDIT"
                ) {

                    await updatePermission(
                        selectedPermission.id,
                        values
                    );


                    messageApi.success(
                        "Permission updated successfully."
                    );

                }
                else {

                    await createPermission(
                        values
                    );


                    messageApi.success(
                        "Permission created successfully."
                    );

                }


                setDrawerOpen(
                    false
                );

                setSelectedPermission(
                    null
                );


                await loadPermissions();

            }
            catch (
                requestError
            ) {

                const errorMessage =
                    requestError?.message ||
                    "Unable to save permission.";


                setDrawerError(
                    errorMessage
                );


                messageApi.error(
                    errorMessage
                );

            }
            finally {

                setDrawerLoading(
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

        try {

            await deletePermission(
                record.id
            );


            messageApi.success(
                "Permission deleted successfully."
            );


            /*
             * If the current page becomes empty
             * after deletion, move to previous page.
             */

            if (
                tableData.length ===
                    1 &&
                query.page >
                    1
            ) {

                setQuery(
                    (
                        current
                    ) => ({

                        ...current,

                        page:
                            current.page -
                            1,

                    })
                );

            }
            else {

                await loadPermissions();

            }

        }
        catch (
            requestError
        ) {

            messageApi.error(
                requestError?.message ||
                "Unable to delete permission."
            );

        }

    };


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () =>
                permissionColumns({

                    onView:
                        handleView,

                    onEdit:
                        handleEdit,

                    onDelete:
                        handleDelete,

                }),
            []
        );


    /* =====================================================
       SUMMARY
    ===================================================== */

    const summary =
        useMemo(
            () => {

                const all =
                    permissionList;


                return {

                    total:
                        all.length,

                    active:
                        all.filter(
                            (
                                item
                            ) =>
                                item.status ===
                                "ACTIVE"
                        ).length,

                    system:
                        all.filter(
                            (
                                item
                            ) =>
                                item.isSystemPermission ===
                                true
                        ).length,

                    custom:
                        all.filter(
                            (
                                item
                            ) =>
                                item.permissionType ===
                                "CUSTOM"
                        ).length,

                };

            },
            []
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
                className="permission-page"
            >

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div
                    className="permission-page-header"
                >

                    <div
                        className="permission-page-header-content"
                    >

                        <Title
                            level={2}
                            className="permission-page-title"
                        >
                            Permission Management
                        </Title>


                        <Text
                            type="secondary"
                            className="permission-page-description"
                        >
                            Manage application permissions,
                            actions and access scopes.
                        </Text>

                    </div>


                    <div
                        className="permission-page-header-action"
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
                            Add Permission
                        </Button>

                    </div>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                    className="permission-summary-grid"
                >

                    <Col
                        xs={24}
                        sm={12}
                        xl={6}
                    >

                        <Card>

                            <Statistic
                                title="Total Permissions"
                                value={
                                    summary.total
                                }
                            />

                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        xl={6}
                    >

                        <Card>

                            <Statistic
                                title="Active"
                                value={
                                    summary.active
                                }
                            />

                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        xl={6}
                    >

                        <Card>

                            <Statistic
                                title="System"
                                value={
                                    summary.system
                                }
                            />

                        </Card>

                    </Col>


                    <Col
                        xs={24}
                        sm={12}
                        xl={6}
                    >

                        <Card>

                            <Statistic
                                title="Custom"
                                value={
                                    summary.custom
                                }
                            />

                        </Card>

                    </Col>

                </Row>


                {/* =================================================
                    FILTER
                ================================================= */}

                <Card
                    className="permission-filter-card"
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
                        ========================================= */}

                        <Input.Search
                            allowClear
                            placeholder={
                                "Search permission..."
                            }
                            value={
                                query.search
                            }
                            onChange={(
                                event
                            ) =>
                                handleSearch(
                                    event.target.value
                                )
                            }
                            style={{
                                width:
                                    280,
                            }}
                        />


                        {/* =========================================
                            MODULE
                        ========================================= */}

                        <Select
                            allowClear
                            placeholder="Module"
                            value={
                                query.moduleCode
                            }
                            options={
                                moduleOptions
                            }
                            onChange={
                                handleModuleChange
                            }
                            showSearch
                            optionFilterProp="label"
                            style={{
                                width:
                                    180,
                            }}
                        />


                        {/* =========================================
                            RESOURCE
                        ========================================= */}

                        <Select
                            allowClear
                            placeholder="Resource"
                            value={
                                query.resourceCode
                            }
                            options={
                                resourceOptions
                            }
                            onChange={
                                handleResourceChange
                            }
                            showSearch
                            optionFilterProp="label"
                            style={{
                                width:
                                    180,
                            }}
                        />


                        {/* =========================================
                            STATUS
                        ========================================= */}

                        <Select
                            allowClear
                            placeholder="Status"
                            value={
                                query.status
                            }
                            options={
                                PERMISSION_STATUS_OPTIONS.map(
                                    (
                                        option
                                    ) => ({

                                        ...option,

                                        label:
                                            getPermissionStatusLabel(
                                                option.value
                                            ),

                                        tagColor:
                                            getPermissionStatusColor(
                                                option.value
                                            ),

                                    })
                                )
                            }
                            onChange={
                                handleStatusChange
                            }
                            style={{
                                width:
                                    150,
                            }}
                        />


                        {/* =========================================
                            TYPE
                        ========================================= */}

                        <Select
                            allowClear
                            placeholder="Type"
                            value={
                                query.permissionType
                            }
                            options={
                                PERMISSION_TYPE_OPTIONS.map(
                                    (
                                        option
                                    ) => ({

                                        ...option,

                                        label:
                                            getPermissionTypeLabel(
                                                option.value
                                            ),

                                        tagColor:
                                            getPermissionTypeColor(
                                                option.value
                                            ),

                                    })
                                )
                            }
                            onChange={
                                handleTypeChange
                            }
                            style={{
                                width:
                                    150,
                            }}
                        />


                        {/* =========================================
                            RESET
                        ========================================= */}

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
                    className="permission-table-card"
                >

                    {
                        error
                            ? (

                                <Empty
                                    description={
                                        error
                                    }
                                />

                            )
                            : (

                                <Table

                                    rowKey="id"

                                    columns={
                                        columns
                                    }

                                    dataSource={
                                        tableData
                                    }

                                    loading={
                                        loading
                                    }

                                    pagination={{
                                        current:
                                            query.page,

                                        pageSize:
                                            query.pageSize,

                                        total:
                                            total,

                                        showSizeChanger:
                                            true,

                                        showTotal:
                                            (
                                                totalCount,
                                                range
                                            ) =>
                                                `${range[0]}-${range[1]} of ${totalCount} permissions`,

                                        onChange:
                                            (
                                                page,
                                                pageSize
                                            ) => {

                                                setQuery(
                                                    (
                                                        current
                                                    ) => ({

                                                        ...current,

                                                        page,

                                                        pageSize,

                                                    })
                                                );

                                            },

                                    }}

                                    scroll={{
                                        x:
                                            1500,
                                    }}

                                    bordered

                                    size="middle"

                                />

                            )
                    }

                </Card>


                {/* =================================================
                    DRAWER
                ================================================= */}

                <PermissionDrawer

                    open={
                        drawerOpen
                    }

                    mode={
                        drawerMode
                    }

                    permission={
                        selectedPermission
                    }

                    loading={
                        drawerLoading
                    }

                    error={
                        drawerError
                    }

                    onSubmit={
                        handleDrawerSubmit
                    }

                    onClose={
                        handleDrawerClose
                    }

                />

            </div>

        </>

    );

};


export default PermissionPage;