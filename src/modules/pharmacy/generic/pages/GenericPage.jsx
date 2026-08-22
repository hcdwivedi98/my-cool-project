// src/modules/pharmacy/generic/pages/GenericPage.jsx

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
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    Tooltip,
    Typography,
    message,
} from "antd";

import {
    ClearOutlined,
    FilterOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import GenericDrawer from "../components/GenericDrawer";

import {
    getGenericColumns,
} from "../columns/generic.columns";

import useGenericLookup from "../hooks/useGenericLookup";

import {
    DEFAULT_GENERIC_QUERY,
} from "../utils/generic.query";

import {
    getGenerics,
    getGenericById,
    createGeneric,
    updateGeneric,
    deactivateGeneric,
    activateGeneric,
    getGenericStatistics,
} from "../services/generic.service";

const {
    Title,
    Text,
} = Typography;

const GenericPage = () => {
    /*
     * =========================================
     * Lookup
     * =========================================
     */

    const lookup =
        useGenericLookup();

    /*
     * =========================================
     * State
     * =========================================
     */

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        data,
        setData,
    ] = useState([]);

    const [
        total,
        setTotal,
    ] = useState(0);

    const [
        statistics,
        setStatistics,
    ] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        prescription: 0,
        highAlert: 0,
        mappedDrugs: 0,
    });

    const [
        query,
        setQuery,
    ] = useState({
        ...DEFAULT_GENERIC_QUERY,
    });

    const [
        drawerOpen,
        setDrawerOpen,
    ] = useState(false);

    const [
        drawerMode,
        setDrawerMode,
    ] = useState("ADD");

    const [
        selectedRecord,
        setSelectedRecord,
    ] = useState(null);

    /*
     * =========================================
     * Load List
     * =========================================
     */

    const loadGenerics =
        useCallback(
            async () => {
                try {
                    setLoading(
                        true
                    );

                    const response =
                        await getGenerics(
                            query
                        );

                    setData(
                        response.items ||
                            []
                    );

                    setTotal(
                        response.total ||
                            0
                    );
                } catch (error) {
                    console.error(
                        error
                    );

                    message.error(
                        error?.message ||
                            "Unable to load generics."
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            },
            [query]
        );

    /*
     * =========================================
     * Load Statistics
     * =========================================
     */

    const loadStatistics =
        useCallback(
            async () => {
                try {
                    const response =
                        await getGenericStatistics();

                    setStatistics(
                        response
                    );
                } catch (error) {
                    console.error(
                        error
                    );
                }
            },
            []
        );

    /*
     * =========================================
     * Initial Load / Query Change
     * =========================================
     */

    useEffect(() => {
        loadGenerics();
    }, [
        loadGenerics,
    ]);

    /*
     * =========================================
     * Statistics Load
     * =========================================
     */

    useEffect(() => {
        loadStatistics();
    }, [
        loadStatistics,
    ]);

    /*
     * =========================================
     * Search
     * =========================================
     */

    const handleSearch =
        useCallback(
            (value) => {
                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        search:
                            value,

                        page: 1,
                    })
                );
            },
            []
        );

    /*
     * =========================================
     * Filter
     * =========================================
     */

    const updateFilter =
        useCallback(
            (
                key,
                value
            ) => {
                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        [key]:
                            value,

                        page: 1,
                    })
                );
            },
            []
        );

    /*
     * =========================================
     * Clear Filters
     * =========================================
     */

    const clearFilters =
        useCallback(() => {
            setQuery({
                ...DEFAULT_GENERIC_QUERY,

                /*
                 * Search/filter clear
                 * ke baad all records
                 * dikhane ke liye.
                 */

                activeOnly:
                    false,
            });
        }, []);

    /*
     * =========================================
     * Add
     * =========================================
     */

    const handleAdd =
        useCallback(() => {
            setSelectedRecord(
                null
            );

            setDrawerMode(
                "ADD"
            );

            setDrawerOpen(
                true
            );
        }, []);

    /*
     * =========================================
     * View
     * =========================================
     */

    const handleView =
        useCallback(
            async (
                record
            ) => {
                try {
                    setLoading(
                        true
                    );

                    const fullRecord =
                        await getGenericById(
                            record.id
                        );

                    setSelectedRecord(
                        fullRecord
                    );

                    setDrawerMode(
                        "VIEW"
                    );

                    setDrawerOpen(
                        true
                    );
                } catch (error) {
                    message.error(
                        error?.message ||
                            "Unable to open generic."
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            },
            []
        );

    /*
     * =========================================
     * Edit
     * =========================================
     */

    const handleEdit =
        useCallback(
            async (
                record
            ) => {
                try {
                    setLoading(
                        true
                    );

                    const fullRecord =
                        await getGenericById(
                            record.id
                        );

                    setSelectedRecord(
                        fullRecord
                    );

                    setDrawerMode(
                        "EDIT"
                    );

                    setDrawerOpen(
                        true
                    );
                } catch (error) {
                    message.error(
                        error?.message ||
                            "Unable to edit generic."
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            },
            []
        );

    /*
     * =========================================
     * Delete / Deactivate
     * =========================================
     */

    const handleDelete =
        useCallback(
            async (
                record
            ) => {
                try {
                    setSaving(
                        true
                    );

                    await deactivateGeneric(
                        record.id
                    );

                    message.success(
                        "Generic deactivated successfully."
                    );

                    await Promise.all(
                        [
                            loadGenerics(),
                            loadStatistics(),
                        ]
                    );
                } catch (error) {
                    message.error(
                        error?.message ||
                            "Unable to deactivate generic."
                    );
                } finally {
                    setSaving(
                        false
                    );
                }
            },
            [
                loadGenerics,
                loadStatistics,
            ]
        );

    /*
     * =========================================
     * Activate
     * =========================================
     */

    const handleActivate =
        useCallback(
            async (
                record
            ) => {
                try {
                    setSaving(
                        true
                    );

                    await activateGeneric(
                        record.id
                    );

                    message.success(
                        "Generic activated successfully."
                    );

                    await Promise.all(
                        [
                            loadGenerics(),
                            loadStatistics(),
                        ]
                    );
                } catch (error) {
                    message.error(
                        error?.message ||
                            "Unable to activate generic."
                    );
                } finally {
                    setSaving(
                        false
                    );
                }
            },
            [
                loadGenerics,
                loadStatistics,
            ]
        );

    /*
     * =========================================
     * Drawer Submit
     * =========================================
     */

    const handleDrawerSubmit =
        useCallback(
            async (
                payload,
                context
            ) => {
                try {
                    setSaving(
                        true
                    );

                    if (
                        context?.mode ===
                        "EDIT"
                    ) {
                        await updateGeneric(
                            context
                                ?.record
                                ?.id,
                            payload
                        );

                        message.success(
                            "Generic updated successfully."
                        );
                    } else {
                        await createGeneric(
                            payload
                        );

                        message.success(
                            "Generic created successfully."
                        );
                    }

                    setDrawerOpen(
                        false
                    );

                    setSelectedRecord(
                        null
                    );

                    await Promise.all(
                        [
                            loadGenerics(),
                            loadStatistics(),
                        ]
                    );
                } catch (error) {
                    message.error(
                        error?.message ||
                            "Unable to save generic."
                    );

                    /*
                     * Error throw karenge so Drawer/Form
                     * dirty state accidentally reset na kare.
                     */

                    throw error;
                } finally {
                    setSaving(
                        false
                    );
                }
            },
            [
                loadGenerics,
                loadStatistics,
            ]
        );

    /*
     * =========================================
     * Drawer Close
     * =========================================
     */

    const handleDrawerClose =
        useCallback(() => {
            setDrawerOpen(
                false
            );

            setSelectedRecord(
                null
            );
        }, []);

    /*
     * =========================================
     * Table Columns
     * =========================================
     */

    const columns =
        useMemo(
            () =>
                getGenericColumns(
                    {
                        onView:
                            handleView,

                        onEdit:
                            handleEdit,

                        onDelete:
                            handleDelete,
                    }
                ),
            [
                handleView,
                handleEdit,
                handleDelete,
            ]
        );

    /*
     * =========================================
     * Table Change
     * =========================================
     */

    const handleTableChange =
        useCallback(
            (
                pagination,
                _filters,
                sorter
            ) => {
                const sortField =
                    Array.isArray(
                        sorter
                    )
                        ? sorter?.[0]
                              ?.field
                        : sorter?.field;

                const sortOrder =
                    Array.isArray(
                        sorter
                    )
                        ? sorter?.[0]
                              ?.order
                        : sorter?.order;

                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        page:
                            pagination
                                ?.current ||
                            1,

                        pageSize:
                            pagination
                                ?.pageSize ||
                            10,

                        sortBy:
                            sortField,

                        sortOrder:
                            sortOrder ===
                            "ascend"
                                ? "asc"
                                : sortOrder ===
                                  "descend"
                                ? "desc"
                                : undefined,
                    })
                );
            },
            []
        );

    /*
     * =========================================
     * Refresh
     * =========================================
     */

    const handleRefresh =
        useCallback(
            async () => {
                await Promise.all(
                    [
                        loadGenerics(),
                        loadStatistics(),
                    ]
                );
            },
            [
                loadGenerics,
                loadStatistics,
            ]
        );

    /*
     * =========================================
     * Active / Inactive Filter
     * =========================================
     */

    const statusFilterValue =
        query.status ||
        undefined;

    /*
     * =========================================
     * Render
     * =========================================
     */

    return (
        <div
            style={{
                padding: 20,
            }}
        >
            {/* =================================
                HEADER
            ================================= */}

            <div
                style={{
                    display:
                        "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        20,
                    gap: 16,
                    flexWrap:
                        "wrap",
                }}
            >
                <div>
                    <Title
                        level={3}
                        style={{
                            margin: 0,
                        }}
                    >
                        Generic Master
                    </Title>

                    <Text type="secondary">
                        Manage standardized
                        generic medicine
                        information.
                    </Text>
                </div>

                <Button
                    type="primary"
                    icon={
                        <PlusOutlined />
                    }
                    onClick={
                        handleAdd
                    }
                >
                    Add Generic
                </Button>
            </div>

            {/* =================================
                STATISTICS
            ================================= */}

            <Row
                gutter={[
                    12,
                    12,
                ]}
                style={{
                    marginBottom:
                        16,
                }}
            >
                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="Total"
                            value={
                                statistics.total
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="Active"
                            value={
                                statistics.active
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="Inactive"
                            value={
                                statistics.inactive
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="Prescription"
                            value={
                                statistics.prescription
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="High Alert"
                            value={
                                statistics.highAlert
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={8}
                    lg={4}
                >
                    <Card>
                        <Statistic
                            title="Mapped Drugs"
                            value={
                                statistics.mappedDrugs
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* =================================
                SEARCH + FILTERS
            ================================= */}

            <Card
                size="small"
                style={{
                    marginBottom:
                        16,
                }}
            >
                <Space
                    direction="vertical"
                    size={12}
                    style={{
                        width:
                            "100%",
                    }}
                >
                    <Space
                        wrap
                        style={{
                            width:
                                "100%",
                        }}
                    >
                        <Input.Search
                            allowClear
                            placeholder="Search generic code, name..."
                            value={
                                query.search
                            }
                            onChange={(
                                event
                            ) =>
                                handleSearch(
                                    event
                                        .target
                                        .value
                                )
                            }
                            style={{
                                width: 300,
                            }}
                        />

                        <Select
                            allowClear
                            placeholder="Generic Type"
                            value={
                                query.genericType
                            }
                            options={
                                lookup.genericTypes
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "genericType",
                                    value
                                )
                            }
                            style={{
                                width: 180,
                            }}
                        />

                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            placeholder="Therapeutic Class"
                            value={
                                query.therapeuticClass
                            }
                            options={
                                lookup.therapeuticClasses
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "therapeuticClass",
                                    value
                                )
                            }
                            style={{
                                width: 200,
                            }}
                        />

                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            placeholder="Pharmacological Class"
                            value={
                                query.pharmacologicalClass
                            }
                            options={
                                lookup.pharmacologicalClasses
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "pharmacologicalClass",
                                    value
                                )
                            }
                            style={{
                                width: 220,
                            }}
                        />

                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            placeholder="Dosage Form"
                            value={
                                query.dosageForm
                            }
                            options={
                                lookup.dosageForms
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "dosageForm",
                                    value
                                )
                            }
                            style={{
                                width: 170,
                            }}
                        />

                        <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            placeholder="Route"
                            value={
                                query.route
                            }
                            options={
                                lookup.routes
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "route",
                                    value
                                )
                            }
                            style={{
                                width: 160,
                            }}
                        />

                        <Select
                            allowClear
                            placeholder="Status"
                            value={
                                statusFilterValue
                            }
                            options={
                                lookup.statuses
                            }
                            onChange={(
                                value
                            ) =>
                                updateFilter(
                                    "status",
                                    value
                                )
                            }
                            style={{
                                width: 150,
                            }}
                        />

                        <Button
                            icon={
                                <ClearOutlined />
                            }
                            onClick={
                                clearFilters
                            }
                        >
                            Clear
                        </Button>

                        <Tooltip title="Refresh">
                            <Button
                                icon={
                                    <ReloadOutlined />
                                }
                                onClick={
                                    handleRefresh
                                }
                            />
                        </Tooltip>
                    </Space>

                    <Space
                        size={8}
                    >
                        <FilterOutlined />

                        <Text type="secondary">
                            {total} generic
                            {total !==
                            1
                                ? "s"
                                : ""}{" "}
                            found
                        </Text>

                        {query.status && (
                            <Tag>
                                {
                                    query.status
                                }
                            </Tag>
                        )}
                    </Space>
                </Space>
            </Card>

            {/* =================================
                TABLE
            ================================= */}

            <Card
                bodyStyle={{
                    padding: 0,
                }}
            >
                <Table
                    rowKey="id"
                    loading={
                        loading ||
                        saving
                    }
                    columns={
                        columns
                    }
                    dataSource={
                        data
                    }
                    scroll={{
                        x: 1800,
                    }}
                    pagination={{
                        current:
                            query.page,
                        pageSize:
                            query.pageSize,
                        total,
                        showSizeChanger:
                            true,
                        showQuickJumper:
                            true,
                        pageSizeOptions:
                            [
                                10,
                                20,
                                50,
                                100,
                            ],
                        showTotal: (
                            value,
                            range
                        ) =>
                            `${range[0]}-${range[1]} of ${value}`,
                    }}
                    onChange={
                        handleTableChange
                    }
                />
            </Card>

            {/* =================================
                DRAWER
            ================================= */}

            <GenericDrawer
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
                    saving
                }
                onClose={
                    handleDrawerClose
                }
                onSubmit={
                    handleDrawerSubmit
                }
            />
        </div>
    );
};

export default GenericPage;