import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Card,
    Col,
    Row,
    Statistic,
    message,
} from "antd";

import {
    PlusOutlined,
} from "@ant-design/icons";

import {
    AppButton,
    AppInput,
    AppSelect,
    AppTable,
} from "@/components/common";

import DrugDrawer from "../components/DrugDrawer";

import useDrugLookup from "../hooks/useDrugLookup";

import {
    getDrugColumns,
} from "../columns/drug.columns";

import {
    DEFAULT_DRUG_QUERY,
} from "../utils/drug.query";

import {
    createDrug,
    deleteDrug,
    getDrugStatistics,
    getDrugs,
    updateDrug,
} from "../services/drug.service";

const DrugPage = () => {
    const lookups =
        useDrugLookup();

    const [
        query,
        setQuery,
    ] = useState({
        ...DEFAULT_DRUG_QUERY,
    });

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
        controlled: 0,
        highAlert: 0,
    });

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        drawerOpen,
        setDrawerOpen,
    ] = useState(false);

    const [
        drawerMode,
        setDrawerMode,
    ] = useState("ADD");

    const [
        selectedDrug,
        setSelectedDrug,
    ] = useState(null);

    /*
     * -----------------------------
     * Load Drugs
     * -----------------------------
     */

    const loadDrugs =
        useCallback(
            async () => {
                try {
                    setLoading(true);

                    const response =
                        await getDrugs(
                            query
                        );

                    setData(
                        response.data
                    );

                    setTotal(
                        response.total
                    );
                } catch (error) {
                    console.error(
                        error
                    );

                    message.error(
                        "Unable to load drugs."
                    );
                } finally {
                    setLoading(false);
                }
            },
            [query]
        );

    /*
     * -----------------------------
     * Load Statistics
     * -----------------------------
     */

    const loadStatistics =
        useCallback(
            async () => {
                try {
                    const response =
                        await getDrugStatistics();

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

    useEffect(() => {
        loadDrugs();
    }, [loadDrugs]);

    useEffect(() => {
        loadStatistics();
    }, [loadStatistics]);

    /*
     * -----------------------------
     * Search
     * -----------------------------
     */

    const handleSearch = (
        value
    ) => {
        setQuery(
            (prev) => ({
                ...prev,

                search:
                    value,

                page: 1,
            })
        );
    };

    /*
     * -----------------------------
     * Filter
     * -----------------------------
     */

    const handleFilterChange =
        (
            field,
            value
        ) => {
            setQuery(
                (prev) => ({
                    ...prev,

                    [field]:
                        value,

                    page: 1,
                })
            );
        };

    /*
     * -----------------------------
     * Reset
     * -----------------------------
     */

    const handleReset =
        () => {
            setQuery({
                ...DEFAULT_DRUG_QUERY,
            });
        };

    /*
     * -----------------------------
     * Add
     * -----------------------------
     */

    const handleAdd =
        () => {
            setSelectedDrug(
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
     * -----------------------------
     * View
     * -----------------------------
     */

    const handleView =
        (record) => {
            setSelectedDrug(
                record
            );

            setDrawerMode(
                "VIEW"
            );

            setDrawerOpen(
                true
            );
        };

    /*
     * -----------------------------
     * Edit
     * -----------------------------
     */

    const handleEdit =
        (record) => {
            setSelectedDrug(
                record
            );

            setDrawerMode(
                "EDIT"
            );

            setDrawerOpen(
                true
            );
        };

    /*
     * -----------------------------
     * Delete
     * -----------------------------
     */

    const handleDelete =
        async (record) => {
            try {
                await deleteDrug(
                    record.id
                );

                message.success(
                    "Drug deactivated successfully."
                );

                await Promise.all([
                    loadDrugs(),
                    loadStatistics(),
                ]);
            } catch (error) {
                console.error(
                    error
                );

                message.error(
                    "Unable to deactivate drug."
                );
            }
        };

    /*
     * -----------------------------
     * Save
     * -----------------------------
     */

    const handleSave =
        async (
            payload,
            mode,
            record
        ) => {
            if (
                mode === "EDIT"
            ) {
                await updateDrug(
                    record.id,
                    payload
                );
            } else {
                await createDrug(
                    payload
                );
            }

            await Promise.all([
                loadDrugs(),
                loadStatistics(),
            ]);
        };

    /*
     * -----------------------------
     * Columns
     * -----------------------------
     */

    const columns =
        useMemo(
            () =>
                getDrugColumns({
                    onView:
                        handleView,
                    onEdit:
                        handleEdit,
                    onDelete:
                        handleDelete,
                }),
            []
        );

    return (
        <div>
            {/* Header */}
            <Row
                justify="space-between"
                align="middle"
                style={{
                    marginBottom: 16,
                }}
            >
                <Col>
                    <h2
                        style={{
                            margin: 0,
                        }}
                    >
                        Drug Master
                    </h2>

                    <div
                        style={{
                            color: "#666",
                            marginTop: 4,
                        }}
                    >
                        Manage pharmacy drugs,
                        classifications,
                        suppliers and
                        regulatory information.
                    </div>
                </Col>

                <Col>
                    <AppButton
                        type="primary"
                        icon={
                            <PlusOutlined />
                        }
                        onClick={
                            handleAdd
                        }
                    >
                        Add Drug
                    </AppButton>
                </Col>
            </Row>

            {/* Statistics */}
            <Row
                gutter={[
                    16,
                    16,
                ]}
                style={{
                    marginBottom: 16,
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
                            title="Total Drugs"
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
                            title="Controlled"
                            value={
                                statistics.controlled
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
            </Row>

            {/* Filters */}
            <Card
                style={{
                    marginBottom: 16,
                }}
            >
                <Row
                    gutter={[
                        12,
                        12,
                    ]}
                >
                    <Col
                        xs={24}
                        md={8}
                        lg={6}
                    >
                        <AppInput
                            placeholder="Search drug code, name, generic..."
                            allowClear
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
                        />
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                    >
                        <AppSelect
                            placeholder="Drug Type"
                            allowClear
                            options={
                                lookups.drugTypes
                            }
                            value={
                                query.drugType
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "drugType",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                    >
                        <AppSelect
                            placeholder="Category"
                            allowClear
                            options={
                                lookups.categories
                            }
                            value={
                                query.category
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "category",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                    >
                        <AppSelect
                            placeholder="Dosage Form"
                            allowClear
                            options={
                                lookups.dosageForms
                            }
                            value={
                                query.dosageForm
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "dosageForm",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={4}
                    >
                        <AppSelect
                            placeholder="Status"
                            allowClear
                            options={[
                                {
                                    label: "Active",
                                    value: "Active",
                                },
                                {
                                    label: "Inactive",
                                    value: "Inactive",
                                },
                            ]}
                            value={
                                query.status
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "status",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={4}
                    >
                        <AppButton
                            block
                            onClick={
                                handleReset
                            }
                        >
                            Reset
                        </AppButton>
                    </Col>
                </Row>
            </Card>

            {/* Table */}
            <Card>
                <AppTable
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    scroll={{
                        x: 2500,
                    }}
                    pagination={{
                        current:
                            query.page,
                        pageSize:
                            query.pageSize,
                        total,
                        showSizeChanger:
                            true,
                        showTotal:
                            (
                                total
                            ) =>
                                `Total ${total} drugs`,
                        onChange: (
                            page,
                            pageSize
                        ) => {
                            setQuery(
                                (
                                    prev
                                ) => ({
                                    ...prev,
                                    page,
                                    pageSize,
                                })
                            );
                        },
                    }}
                />
            </Card>

            {/* Drawer */}
            <DrugDrawer
                open={
                    drawerOpen
                }
                mode={
                    drawerMode
                }
                record={
                    selectedDrug
                }
                lookups={
                    lookups
                }
                loading={
                    loading
                }
                onSave={
                    handleSave
                }
                onClose={() => {
                    setDrawerOpen(
                        false
                    );

                    setSelectedDrug(
                        null
                    );
                }}
            />
        </div>
    );
};

export default DrugPage;