import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Card,
    Col,
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    message,
    Modal,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import {
    AppButton,
} from "@/components/common";

import useBinLookup from "../hooks/useBinLookup";

import {
    binList,
} from "../mock/bin.mock";

import {
    getBins,
    createBin,
    updateBin,
    deleteBin,
} from "../services/bin.service";

import {
    getBinColumns,
} from "../columns/bin.columns";

import BinDrawer from "../components/BinDrawer";

import {
    BIN_STATUS,
    BIN_TYPES,
    STORAGE_CONDITIONS,
} from "../constants/bin.constants";

const BinPage = () => {
    const lookups = useBinLookup();

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(false);

    const [query, setQuery] = useState({
        page: 1,
        pageSize: 10,

        search: "",

        centerId: undefined,
        departmentId: undefined,
        storeId: undefined,
        subStoreId: undefined,
        rackId: undefined,
        shelfId: undefined,

        binType: undefined,
        storageCondition: undefined,
        status: undefined,

        sortBy: "binCode",
        sortOrder: "asc",
    });

    const [total, setTotal] =
        useState(0);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [drawerMode, setDrawerMode] =
        useState("add");

    const [selectedRecord, setSelectedRecord] =
        useState(null);

    const loadBins = useCallback(
        async () => {
            try {
                setLoading(true);

                const response =
                    await getBins(query);

                setData(
                    response.items || []
                );

                setTotal(
                    response.total || 0
                );
            } catch (error) {
                console.error(
                    "Failed to load bins:",
                    error
                );

                message.error(
                    "Unable to load Bin records."
                );
            } finally {
                setLoading(false);
            }
        },
        [query]
    );

    useEffect(() => {
        loadBins();
    }, [loadBins]);

    const statistics = useMemo(() => {
        return {
            total: binList.length,

            active: binList.filter(
                (item) =>
                    item.status ===
                    BIN_STATUS.ACTIVE
            ).length,

            inactive: binList.filter(
                (item) =>
                    item.status ===
                    BIN_STATUS.INACTIVE
            ).length,

            full: binList.filter(
                (item) =>
                    item.occupancyPercentage >=
                    100
            ).length,
        };
    }, [data]);

    const handleAdd = () => {
        setSelectedRecord(null);
        setDrawerMode("add");
        setDrawerOpen(true);
    };

    const handleView = (record) => {
        setSelectedRecord(record);
        setDrawerMode("view");
        setDrawerOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setDrawerMode("edit");
        setDrawerOpen(true);
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Delete Bin",
            content: (
                <>
                    Are you sure you want to delete{" "}
                    <strong>
                        {record.binCode}
                    </strong>
                    ?
                </>
            ),
            okText: "Delete",
            okButtonProps: {
                danger: true,
            },
            cancelText: "Cancel",

            onOk: async () => {
                try {
                    setLoading(true);

                    await deleteBin(
                        record.id
                    );

                    message.success(
                        "Bin deleted successfully."
                    );

                    await loadBins();
                } catch (error) {
                    console.error(error);

                    message.error(
                        "Unable to delete Bin."
                    );
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const handleSave = async (
        payload,
        record
    ) => {
        if (drawerMode === "add") {
            await createBin(payload);
        } else if (
            drawerMode === "edit" &&
            record?.id
        ) {
            await updateBin(
                record.id,
                payload
            );
        }

        await loadBins();
    };

    const handleQueryChange = (
        key,
        value
    ) => {
        setQuery((previous) => ({
            ...previous,
            [key]: value,
            page: 1,
        }));
    };

    const handleReset = () => {
        setQuery({
            page: 1,
            pageSize: 10,

            search: "",

            centerId: undefined,
            departmentId: undefined,
            storeId: undefined,
            subStoreId: undefined,
            rackId: undefined,
            shelfId: undefined,

            binType: undefined,
            storageCondition: undefined,
            status: undefined,

            sortBy: "binCode",
            sortOrder: "asc",
        });
    };

    const columns = useMemo(
        () =>
            getBinColumns({
                onView: handleView,
                onEdit: handleEdit,
                onDelete: handleDelete,
            }),
        []
    );

    return (
        <div>
            <Space
                orientation="horizontal"
                style={{
                    width: "100%",
                    justifyContent:
                        "space-between",
                    marginBottom: 16,
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                        }}
                    >
                        Bin Master
                    </h2>

                    <div>
                        Manage pharmacy
                        storage bins.
                    </div>
                </div>

                <AppButton
                    type="primary"
                    icon={
                        <PlusOutlined />
                    }
                    onClick={handleAdd}
                >
                    Add Bin
                </AppButton>
            </Space>

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
                    md={6}
                >
                    <Card>
                        <Statistic
                            title="Total Bins"
                            value={
                                statistics.total
                            }
                        />
                    </Card>
                </Col>

                <Col
                    xs={24}
                    sm={12}
                    md={6}
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
                    md={6}
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
                    md={6}
                >
                    <Card>
                        <Statistic
                            title="Full"
                            value={
                                statistics.full
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
                        <Input
                            placeholder="Search Bin Code / Name"
                            allowClear
                            value={
                                query.search
                            }
                            onChange={(event) =>
                                handleQueryChange(
                                    "search",
                                    event.target
                                        .value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Center"
                            allowClear
                            options={
                                lookups.centers
                            }
                            value={
                                query.centerId
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "centerId",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Rack"
                            allowClear
                            options={
                                lookups.racks
                            }
                            value={
                                query.rackId
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "rackId",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Shelf"
                            allowClear
                            options={
                                lookups.shelves
                            }
                            value={
                                query.shelfId
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "shelfId",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Bin Type"
                            allowClear
                            options={
                                BIN_TYPES
                            }
                            value={
                                query.binType
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "binType",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Status"
                            allowClear
                            options={[
                                {
                                    label:
                                        BIN_STATUS.ACTIVE,
                                    value:
                                        BIN_STATUS.ACTIVE,
                                },
                                {
                                    label:
                                        BIN_STATUS.INACTIVE,
                                    value:
                                        BIN_STATUS.INACTIVE,
                                },
                            ]}
                            value={
                                query.status
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "status",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            placeholder="Storage"
                            allowClear
                            options={
                                STORAGE_CONDITIONS
                            }
                            value={
                                query.storageCondition
                            }
                            onChange={(value) =>
                                handleQueryChange(
                                    "storageCondition",
                                    value
                                )
                            }
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={8}
                        lg={4}
                    >
                        <AppButton
                            icon={
                                <ReloadOutlined />
                            }
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
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
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
                        showTotal: (
                            totalRecords,
                            range
                        ) =>
                            `${range[0]}-${range[1]} of ${totalRecords} bins`,
                        onChange: (
                            page,
                            pageSize
                        ) => {
                            setQuery(
                                (previous) => ({
                                    ...previous,
                                    page,
                                    pageSize,
                                })
                            );
                        },
                    }}
                />
            </Card>

            {/* Drawer */}
            <BinDrawer
                open={drawerOpen}
                mode={drawerMode}
                record={selectedRecord}
                lookups={lookups}
                loading={loading}
                onSave={
                    handleSave
                }
                onClose={() =>
                    setDrawerOpen(false)
                }
            />
        </div>
    );
};

export default BinPage;