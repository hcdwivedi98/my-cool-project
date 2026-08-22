// src/modules/pharmacy/manufacturer/pages/ManufacturerPage.jsx

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
    Switch,
    Table,
    Tag,
    Tooltip,
    Typography,
    message,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    StopOutlined,
    MedicineBoxOutlined,
} from "@ant-design/icons";

import useManufacturerLookup from "../hooks/useManufacturerLookup";

import {
    DEFAULT_MANUFACTURER_QUERY,
} from "../utils/manufacturer.query";

import {
    getManufacturerColumns,
} from "../columns/manufacturer.columns";

import {
    getManufacturers,
    getManufacturerById,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    getManufacturerStatistics,
} from "../services/manufacturer.service";

import ManufacturerDrawer from "../components/ManufacturerDrawer";

const {
    Title,
    Text,
} = Typography;

const ManufacturerPage =
    () => {
        /*
         * =====================================
         * Lookup
         * =====================================
         */

        const lookup =
            useManufacturerLookup();

        /*
         * =====================================
         * Query
         * =====================================
         */

        const [
            query,
            setQuery,
        ] = useState({
            ...DEFAULT_MANUFACTURER_QUERY,
        });

        /*
         * =====================================
         * Data
         * =====================================
         */

        const [
            data,
            setData,
        ] = useState([]);

        const [
            total,
            setTotal,
        ] = useState(0);

        /*
         * =====================================
         * Statistics
         * =====================================
         */

        const [
            statistics,
            setStatistics,
        ] = useState({
            total: 0,
            active: 0,
            inactive: 0,
            pharmaceutical: 0,
            biological: 0,
            totalProducts: 0,
        });

        /*
         * =====================================
         * Loading
         * =====================================
         */

        const [
            loading,
            setLoading,
        ] = useState(false);

        const [
            drawerLoading,
            setDrawerLoading,
        ] = useState(false);

        /*
         * =====================================
         * Drawer
         * =====================================
         */

        const [
            drawerOpen,
            setDrawerOpen,
        ] = useState(false);

        const [
            drawerMode,
            setDrawerMode,
        ] = useState(
            "ADD"
        );

        const [
            selectedRecord,
            setSelectedRecord,
        ] = useState(null);

        /*
         * =====================================
         * Load Statistics
         * =====================================
         */

        const loadStatistics =
            useCallback(
                async () => {
                    try {
                        const result =
                            await getManufacturerStatistics();

                        setStatistics(
                            result
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
         * =====================================
         * Load Manufacturers
         * =====================================
         */

        const loadManufacturers =
            useCallback(
                async () => {
                    try {
                        setLoading(
                            true
                        );

                        const result =
                            await getManufacturers(
                                query
                            );

                        setData(
                            result.data
                        );

                        setTotal(
                            result.total
                        );
                    } catch (error) {
                        console.error(
                            error
                        );

                        message.error(
                            "Unable to load manufacturers."
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
         * =====================================
         * Initial Load
         * =====================================
         */

        useEffect(() => {
            loadManufacturers();
        }, [
            loadManufacturers,
        ]);

        useEffect(() => {
            loadStatistics();
        }, [
            loadStatistics,
        ]);

        /*
         * =====================================
         * Search
         * =====================================
         */

        const handleSearch =
            (
                value
            ) => {
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
            };

        /*
         * =====================================
         * Filter Change
         * =====================================
         */

        const handleFilterChange =
            (
                field,
                value
            ) => {
                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        [field]:
                            value,

                        page: 1,
                    })
                );
            };

        /*
         * =====================================
         * Active Only
         * =====================================
         */

        const handleActiveOnly =
            (
                checked
            ) => {
                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        activeOnly:
                            checked,

                        page: 1,
                    })
                );
            };

        /*
         * =====================================
         * Reset Filters
         * =====================================
         */

        const handleReset =
            () => {
                setQuery({
                    ...DEFAULT_MANUFACTURER_QUERY,
                });
            };

        /*
         * =====================================
         * Table Change
         * =====================================
         */

        const handleTableChange =
            (
                pagination,
                _filters,
                sorter
            ) => {
                const sortField =
                    Array.isArray(
                        sorter
                    )
                        ? sorter[0]
                              ?.field
                        : sorter?.field;

                const sortOrder =
                    Array.isArray(
                        sorter
                    )
                        ? sorter[0]
                              ?.order
                        : sorter?.order;

                setQuery(
                    (
                        previous
                    ) => ({
                        ...previous,

                        page:
                            pagination.current,

                        pageSize:
                            pagination.pageSize,

                        sortBy:
                            sortField ||
                            undefined,

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
            };

        /*
         * =====================================
         * Open Add
         * =====================================
         */

        const handleAdd =
            () => {
                setSelectedRecord(
                    null
                );

                setDrawerMode(
                    "ADD"
                );

                setDrawerOpen(
                    true
                );
            };

        /*
         * =====================================
         * Open View
         * =====================================
         */

        const handleView =
            async (
                record
            ) => {
                try {
                    setDrawerLoading(
                        true
                    );

                    const result =
                        await getManufacturerById(
                            record.id
                        );

                    setSelectedRecord(
                        result
                    );

                    setDrawerMode(
                        "VIEW"
                    );

                    setDrawerOpen(
                        true
                    );
                } catch (error) {
                    message.error(
                        "Unable to open manufacturer."
                    );
                } finally {
                    setDrawerLoading(
                        false
                    );
                }
            };

        /*
         * =====================================
         * Open Edit
         * =====================================
         */

        const handleEdit =
            async (
                record
            ) => {
                try {
                    setDrawerLoading(
                        true
                    );

                    const result =
                        await getManufacturerById(
                            record.id
                        );

                    setSelectedRecord(
                        result
                    );

                    setDrawerMode(
                        "EDIT"
                    );

                    setDrawerOpen(
                        true
                    );
                } catch (error) {
                    message.error(
                        "Unable to open manufacturer."
                    );
                } finally {
                    setDrawerLoading(
                        false
                    );
                }
            };

        /*
         * =====================================
         * Delete / Deactivate
         * =====================================
         */

        const handleDelete =
            async (
                record
            ) => {
                try {
                    setLoading(
                        true
                    );

                    await deleteManufacturer(
                        record.id
                    );

                    message.success(
                        "Manufacturer deactivated successfully."
                    );

                    await Promise.all(
                        [
                            loadManufacturers(),
                            loadStatistics(),
                        ]
                    );
                } catch (error) {
                    console.error(
                        error
                    );

                    message.error(
                        error?.message ||
                            "Unable to deactivate manufacturer."
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            };

        /*
         * =====================================
         * Drawer Submit
         * =====================================
         */

        const handleDrawerSubmit =
            async (
                payload,
                context
            ) => {
                try {
                    setDrawerLoading(
                        true
                    );

                    if (
                        context.mode ===
                        "ADD"
                    ) {
                        await createManufacturer(
                            payload
                        );

                        message.success(
                            "Manufacturer created successfully."
                        );
                    }

                    if (
                        context.mode ===
                        "EDIT"
                    ) {
                        await updateManufacturer(
                            context
                                .record
                                ?.id,
                            payload
                        );

                        message.success(
                            "Manufacturer updated successfully."
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
                            loadManufacturers(),
                            loadStatistics(),
                        ]
                    );
                } catch (error) {
                    console.error(
                        error
                    );

                    message.error(
                        error?.message ||
                            "Unable to save manufacturer."
                    );

                    throw error;
                } finally {
                    setDrawerLoading(
                        false
                    );
                }
            };

        /*
         * =====================================
         * Close Drawer
         * =====================================
         */

        const handleDrawerClose =
            () => {
                setDrawerOpen(
                    false
                );

                setSelectedRecord(
                    null
                );
            };

        /*
         * =====================================
         * Columns
         * =====================================
         */

        const columns =
            useMemo(
                () =>
                    getManufacturerColumns(
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

        return (
            <div
                style={{
                    padding:
                        "20px",
                }}
            >
                {/* =================================
                    PAGE HEADER
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
                    }}
                >
                    <div>
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                            }}
                        >
                            Manufacturer Master
                        </Title>

                        <Text type="secondary">
                            Manage pharmaceutical
                            manufacturers and
                            regulatory information
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
                        Add Manufacturer
                    </Button>
                </div>

                {/* =================================
                    STATISTICS
                ================================= */}

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                    style={{
                        marginBottom:
                            16,
                    }}
                >
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >
                        <Card size="small">
                            <Statistic
                                title="Total Manufacturers"
                                value={
                                    statistics.total
                                }
                                prefix={
                                    <TeamOutlined />
                                }
                            />
                        </Card>
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >
                        <Card size="small">
                            <Statistic
                                title="Active"
                                value={
                                    statistics.active
                                }
                                valueStyle={{
                                    color:
                                        "#52c41a",
                                }}
                                prefix={
                                    <CheckCircleOutlined />
                                }
                            />
                        </Card>
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >
                        <Card size="small">
                            <Statistic
                                title="Inactive"
                                value={
                                    statistics.inactive
                                }
                                valueStyle={{
                                    color:
                                        "#8c8c8c",
                                }}
                                prefix={
                                    <StopOutlined />
                                }
                            />
                        </Card>
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                    >
                        <Card size="small">
                            <Statistic
                                title="Mapped Products"
                                value={
                                    statistics.totalProducts
                                }
                                prefix={
                                    <MedicineBoxOutlined />
                                }
                            />
                        </Card>
                    </Col>
                </Row>

                {/* =================================
                    FILTER CARD
                ================================= */}

                <Card
                    size="small"
                    style={{
                        borderRadius: 10,
                        marginBottom:
                            16,
                    }}
                    styles={{
                        body: {
                            padding: 0,
                        },
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                            alignItems:
                                "center",
                            padding:
                                "11px 16px",
                            borderBottom:
                                "1px solid #f0f0f0",
                        }}
                    >
                        <Space size={8}>
                            <SearchOutlined />

                            <Text strong>
                                Filters
                            </Text>
                        </Space>

                        <Button
                            type="text"
                            size="small"
                            icon={
                                <ReloadOutlined />
                            }
                            onClick={
                                handleReset
                            }
                        >
                            Reset
                        </Button>
                    </div>

                    <div
                        style={{
                            padding:
                                "14px 16px",
                        }}
                    >
                        {/* Search */}
                        <Input
                            allowClear
                            size="middle"
                            prefix={
                                <SearchOutlined
                                    style={{
                                        color:
                                            "#8c8c8c",
                                    }}
                                />
                            }
                            placeholder="Search by code, manufacturer name, mobile, GSTIN, PAN..."
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
                            onPressEnter={
                                loadManufacturers
                            }
                            style={{
                                width:
                                    "100%",
                                marginBottom:
                                    12,
                            }}
                        />

                        <Row
                            gutter={[
                                10,
                                10,
                            ]}
                            align="middle"
                        >
                            {/* Manufacturer Type */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Manufacturer Type"
                                    value={
                                        query.manufacturerType
                                    }
                                    options={
                                        lookup.manufacturerTypes ||
                                        []
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleFilterChange(
                                            "manufacturerType",
                                            value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                />
                            </Col>

                            {/* Category */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Category"
                                    value={
                                        query.manufacturerCategory
                                    }
                                    options={
                                        lookup.manufacturerCategories ||
                                        []
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleFilterChange(
                                            "manufacturerCategory",
                                            value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                />
                            </Col>

                            {/* Country */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Country"
                                    value={
                                        query.country
                                    }
                                    options={
                                        lookup.countries ||
                                        []
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleFilterChange(
                                            "country",
                                            value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                />
                            </Col>

                            {/* State */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="State"
                                    value={
                                        query.state
                                    }
                                    options={
                                        lookup.states ||
                                        []
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleFilterChange(
                                            "state",
                                            value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                />
                            </Col>

                            {/* City */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="City"
                                    value={
                                        query.city
                                    }
                                    options={
                                        lookup.cities ||
                                        []
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        handleFilterChange(
                                            "city",
                                            value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                />
                            </Col>

                            {/* Active Only */}
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                lg={4}
                            >
                                <div
                                    style={{
                                        height: 32,
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        padding:
                                            "0 8px",
                                        border:
                                            "1px solid #d9d9d9",
                                        borderRadius:
                                            6,
                                    }}
                                >
                                    <Space
                                        size={8}
                                    >
                                        <Switch
                                            size="small"
                                            checked={
                                                query.activeOnly
                                            }
                                            onChange={
                                                handleActiveOnly
                                            }
                                        />

                                        <Text
                                            style={{
                                                fontSize:
                                                    13,
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            Active Only
                                        </Text>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>

                {/* =================================
                    TABLE
                ================================= */}

                <Card
                    size="small"
                    styles={{
                        body: {
                            padding:
                                0,
                        },
                    }}
                >
                    {data.length ===
                        0 &&
                    !loading ? (
                        <Empty
                            description="No manufacturers found"
                            style={{
                                padding:
                                    "60px 0",
                            }}
                        />
                    ) : (
                        <Table
                            rowKey="id"
                            columns={
                                columns
                            }
                            dataSource={
                                data
                            }
                            loading={
                                loading
                            }
                            scroll={{
                                x: 1500,
                            }}
                            size="middle"
                            onChange={
                                handleTableChange
                            }
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

                                showTotal:
                                    (
                                        totalValue,
                                        range
                                    ) =>
                                        `${range[0]}-${range[1]} of ${totalValue} manufacturers`,
                            }}
                        />
                    )}
                </Card>

                {/* =================================
                    DRAWER
                ================================= */}

                <ManufacturerDrawer
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

export default ManufacturerPage;