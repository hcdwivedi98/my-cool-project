// src/modules/pharmacy/supplier/pages/SupplierPage.jsx

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
    Divider,
    Empty,
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Switch,
    Table,
    Typography,
    message,
} from "antd";

import {
    DownloadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";

import SupplierDrawer from "../components/SupplierDrawer";

import useSupplierLookup from "../hooks/useSupplierLookup";

import {
    getSupplierColumns,
} from "../columns/supplier.columns";

import {
    getSuppliers,
    getSupplierStatistics,
    createSupplier,
    updateSupplier,
    deactivateSupplier,
} from "../services/supplier.service";

import {
    DEFAULT_SUPPLIER_QUERY,
} from "../utils/supplier.query";

const { Title, Text } =
    Typography;

const SupplierPage = () => {
    const lookup =
        useSupplierLookup();

    const [query, setQuery] =
        useState({
            ...DEFAULT_SUPPLIER_QUERY,
            activeOnly: true,
        });

    const [
        suppliers,
        setSuppliers,
    ] = useState([]);

    const [
        total,
        setTotal,
    ] = useState(0);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        statistics,
        setStatistics,
    ] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        manufacturers: 0,
        distributors: 0,
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
        selectedSupplier,
        setSelectedSupplier,
    ] = useState(null);

    // =========================================
    // LOAD SUPPLIERS
    // =========================================

    const loadSuppliers =
        useCallback(async () => {
            try {
                setLoading(true);

                const response =
                    await getSuppliers(
                        query
                    );

                setSuppliers(
                    response?.data || []
                );

                setTotal(
                    response?.total || 0
                );
            } catch (error) {
                console.error(
                    "Supplier load error:",
                    error
                );

                message.error(
                    "Unable to load suppliers."
                );
            } finally {
                setLoading(false);
            }
        }, [query]);

    // =========================================
    // LOAD STATISTICS
    // =========================================

    const loadStatistics =
        useCallback(async () => {
            try {
                const response =
                    await getSupplierStatistics();

                setStatistics(
                    response || {}
                );
            } catch (error) {
                console.error(
                    "Statistics error:",
                    error
                );
            }
        }, []);

    useEffect(() => {
        loadSuppliers();
    }, [loadSuppliers]);

    useEffect(() => {
        loadStatistics();
    }, [loadStatistics]);

    // =========================================
    // SEARCH
    // =========================================

    const handleSearch =
        useCallback((value) => {
            setQuery(
                (previous) => ({
                    ...previous,
                    search:
                        value?.trim() ||
                        "",
                    page: 1,
                })
            );
        }, []);

    // =========================================
    // FILTER
    // =========================================

    const handleFilterChange =
        useCallback(
            (field, value) => {
                setQuery(
                    (previous) => ({
                        ...previous,
                        [field]:
                            value ||
                            undefined,
                        page: 1,
                    })
                );
            },
            []
        );

    // =========================================
    // ACTIVE ONLY
    // =========================================

    const handleActiveOnly =
        useCallback((checked) => {
            setQuery(
                (previous) => ({
                    ...previous,

                    activeOnly:
                        checked,

                    status: checked
                        ? "Active"
                        : undefined,

                    page: 1,
                })
            );
        }, []);

    // =========================================
    // RESET
    // =========================================

    const handleReset =
        useCallback(() => {
            setQuery({
                ...DEFAULT_SUPPLIER_QUERY,
                activeOnly: true,
            });
        }, []);

    // =========================================
    // ADD
    // =========================================

    const handleAdd =
        useCallback(() => {
            setSelectedSupplier(
                null
            );

            setDrawerMode("ADD");
            setDrawerOpen(true);
        }, []);

    // =========================================
    // VIEW
    // =========================================

    const handleView =
        useCallback((record) => {
            setSelectedSupplier(
                record
            );

            setDrawerMode("VIEW");
            setDrawerOpen(true);
        }, []);

    // =========================================
    // EDIT
    // =========================================

    const handleEdit =
        useCallback((record) => {
            setSelectedSupplier(
                record
            );

            setDrawerMode("EDIT");
            setDrawerOpen(true);
        }, []);

    // =========================================
    // DEACTIVATE
    // =========================================

    const handleDelete =
        useCallback(
            async (record) => {
                try {
                    await deactivateSupplier(
                        record.id
                    );

                    message.success(
                        "Supplier deactivated successfully."
                    );

                    await Promise.all([
                        loadSuppliers(),
                        loadStatistics(),
                    ]);
                } catch (error) {
                    console.error(
                        error
                    );

                    message.error(
                        "Unable to deactivate supplier."
                    );
                }
            },
            [
                loadSuppliers,
                loadStatistics,
            ]
        );

    // =========================================
    // SAVE
    // =========================================

    const handleSave =
        useCallback(
            async (
                payload,
                context
            ) => {
                if (
                    context.mode ===
                    "EDIT"
                ) {
                    await updateSupplier(
                        context
                            .record
                            ?.id,
                        payload
                    );
                } else {
                    await createSupplier(
                        payload
                    );
                }

                await Promise.all([
                    loadSuppliers(),
                    loadStatistics(),
                ]);
            },
            [
                loadSuppliers,
                loadStatistics,
            ]
        );

    // =========================================
    // TABLE COLUMNS
    // =========================================

    const columns =
        useMemo(
            () =>
                getSupplierColumns({
                    onView:
                        handleView,
                    onEdit:
                        handleEdit,
                    onDelete:
                        handleDelete,
                }),
            [
                handleView,
                handleEdit,
                handleDelete,
            ]
        );

    // =========================================
    // TABLE CHANGE
    // =========================================

    const handleTableChange =
        useCallback(
            (
                pagination,
                filters,
                sorter
            ) => {
                const currentSorter =
                    Array.isArray(
                        sorter
                    )
                        ? sorter[0]
                        : sorter;

                setQuery(
                    (previous) => ({
                        ...previous,

                        page:
                            pagination?.current ||
                            1,

                        pageSize:
                            pagination?.pageSize ||
                            10,

                        sortBy:
                            currentSorter?.field ||
                            undefined,

                        sortOrder:
                            currentSorter?.order ===
                                "ascend"
                                ? "asc"
                                : currentSorter?.order ===
                                    "descend"
                                    ? "desc"
                                    : undefined,
                    })
                );
            },
            []
        );

    return (
        <div
            style={{
                minHeight:
                    "100%",
                background:
                    "#f5f7fa",
                padding:
                    "20px 24px 28px",
            }}
        >
            {/* =====================================
                HEADER
            ====================================== */}

            <div
                style={{
                    marginBottom: 18,
                }}
            >
                <Title
                    level={3}
                    style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Supplier Master
                </Title>

                <Text
                    type="secondary"
                    style={{
                        fontSize: 13,
                    }}
                >
                    Manage suppliers,
                    compliance and
                    commercial
                    information.
                </Text>
            </div>

            {/* =====================================
                ACTION BAR
            ====================================== */}

            <Card
                bordered
                styles={{
                    body: {
                        padding:
                            "12px 16px",
                    },
                }}
                style={{
                    borderRadius: 10,
                    marginBottom: 16,
                }}
            >
                <Row
                    justify="space-between"
                    align="middle"
                >
                    <Col>
                        <Space
                            size={8}
                            wrap
                        >
                            <Button
                                type="primary"
                                icon={
                                    <PlusOutlined />
                                }
                                onClick={
                                    handleAdd
                                }
                            >
                                Add Supplier
                            </Button>

                            <Button
                                icon={
                                    <UploadOutlined />
                                }
                            >
                                Import
                            </Button>

                            <Button
                                icon={
                                    <FileExcelOutlined />
                                }
                            >
                                Export Excel
                            </Button>

                            <Button
                                icon={
                                    <FilePdfOutlined />
                                }
                            >
                                Export PDF
                            </Button>
                        </Space>
                    </Col>

                    <Col>
                        <Button
                            icon={
                                <ReloadOutlined />
                            }
                            onClick={() => {
                                loadSuppliers();
                                loadStatistics();
                            }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* =====================================
                STATISTICS
            ====================================== */}

            <Row
                gutter={12}
                style={{
                    marginBottom: 16,
                }}
            >
                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Card
                        size="small"
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        <Statistic
                            title="Total Suppliers"
                            value={
                                statistics.total ||
                                0
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Card
                        size="small"
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        <Statistic
                            title="Active Suppliers"
                            value={
                                statistics.active ||
                                0
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Card
                        size="small"
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        <Statistic
                            title="Manufacturers"
                            value={
                                statistics.manufacturers ||
                                0
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >
                    <Card
                        size="small"
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        <Statistic
                            title="Distributors"
                            value={
                                statistics.distributors ||
                                0
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* =====================================
    FILTER BAR
====================================== */}

            <Card
                size="small"
                className="supplier-filter-card"
                style={{
                    borderRadius: 10,
                    marginBottom: 16,
                }}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                {/* Filter Header */}
                <div
                    className="supplier-filter-header"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        padding:
                            "11px 16px",
                        borderBottom:
                            "1px solid #f0f0f0",
                    }}
                >
                    <Space size={8}>
                        <SearchOutlined
                            style={{
                                fontSize: 15,
                                color: "#595959",
                            }}
                        />

                        <Text
                            strong
                            style={{
                                fontSize: 14,
                            }}
                        >
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

                {/* Filter Body */}
                <div
                    style={{
                        padding: "14px 16px",
                    }}
                >
                    {/* Search */}
                    <Input
                        size="middle"
                        allowClear
                        prefix={
                            <SearchOutlined
                                style={{
                                    color:
                                        "#8c8c8c",
                                }}
                            />
                        }
                        placeholder="Search supplier by code, name, mobile or GSTIN..."
                        value={
                            query.search
                        }
                        onChange={(
                            event
                        ) =>
                            handleSearch(
                                event.target
                                    .value
                            )
                        }
                        onPressEnter={() =>
                            loadSuppliers()
                        }
                        style={{
                            width: "100%",
                            marginBottom: 12,
                        }}
                    />

                    {/* Filter Controls */}
                    <Row
                        gutter={[
                            10,
                            10,
                        ]}
                        align="middle"
                    >
                        {/* Supplier Type */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <Select
                                allowClear
                                placeholder="Supplier Type"
                                value={
                                    query.supplierType
                                }
                                options={
                                    lookup.supplierTypes ||
                                    []
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleFilterChange(
                                        "supplierType",
                                        value
                                    )
                                }
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Col>

                        {/* State */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <Select
                                allowClear
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
                                    width: "100%",
                                }}
                            />
                        </Col>

                        {/* City */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <Select
                                allowClear
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
                                    width: "100%",
                                }}
                            />
                        </Col>

                        {/* Payment Terms */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <Select
                                allowClear
                                placeholder="Payment Terms"
                                value={
                                    query.paymentTerms
                                }
                                options={
                                    lookup.paymentTerms ||
                                    []
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleFilterChange(
                                        "paymentTerms",
                                        value
                                    )
                                }
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Col>

                        {/* Active Only */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <div
                                style={{
                                    height: 32,
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    padding:
                                        "0 8px",
                                    border:
                                        "1px solid #d9d9d9",
                                    borderRadius: 6,
                                    background:
                                        "#fff",
                                }}
                            >
                                <Space
                                    size={8}
                                    align="center"
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
                                            fontSize: 13,
                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >
                                        Active Only
                                    </Text>
                                </Space>
                            </div>
                        </Col>

                        {/* Search Button */}
                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={4}
                        >
                            <Button
                                type="primary"
                                block
                                icon={
                                    <SearchOutlined />
                                }
                                onClick={
                                    loadSuppliers
                                }
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Card>

            {/* =====================================
                TABLE
            ====================================== */}

            <Card
                size="small"
                style={{
                    borderRadius: 10,
                }}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <Table
                    rowKey="id"
                    loading={loading}
                    columns={columns}
                    dataSource={
                        suppliers
                    }
                    onChange={
                        handleTableChange
                    }
                    scroll={{
                        x: 1250,
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={
                                    Empty.PRESENTED_IMAGE_SIMPLE
                                }
                                description="No suppliers found"
                            >
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={
                                        <PlusOutlined />
                                    }
                                    onClick={
                                        handleAdd
                                    }
                                >
                                    Add Supplier
                                </Button>
                            </Empty>
                        ),
                    }}
                    pagination={{
                        current:
                            query.page,
                        pageSize:
                            query.pageSize,
                        total,
                        showSizeChanger:
                            true,
                        showTotal: (
                            total,
                            range
                        ) =>
                            `${range[0]}-${range[1]} of ${total}`,
                    }}
                />
            </Card>

            {/* =====================================
                DRAWER
            ====================================== */}

            <SupplierDrawer
                open={
                    drawerOpen
                }
                mode={
                    drawerMode
                }
                record={
                    selectedSupplier
                }
                onClose={() =>
                    setDrawerOpen(
                        false
                    )
                }
                onSave={
                    handleSave
                }
            />
        </div>
    );
};

export default SupplierPage;