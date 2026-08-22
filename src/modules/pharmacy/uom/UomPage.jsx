// src/modules/pharmacy/uom/UomPage.jsx

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
    Col,
    Input,
    Row,
    Select,
    Space,
    Statistic,
    Table,
    Tag,
    message,
    Popconfirm,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    AppstoreOutlined,
    CheckCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";

import UomDrawer from "./components/UomDrawer";

import getUomColumns from "./columns/uom.columns";

import {
    UOM_TYPES,
} from "./constants/uom.constants";

import {
    getUoms,
    createUom,
    updateUom,
    activateUom,
    deactivateUom,
} from "./services/uom.service";


const UomPage = () => {
    /*
     * ============================================
     * MESSAGE
     * ============================================
     */

    const [
        messageApi,
        contextHolder,
    ] = message.useMessage();


    /*
     * ============================================
     * DATA
     * ============================================
     */

    const [
        data,
        setData,
    ] = useState([]);


    /*
     * ============================================
     * LOADING
     * ============================================
     */

    const [
        loading,
        setLoading,
    ] = useState(false);


    /*
     * ============================================
     * DRAWER
     * ============================================
     */

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
     * ============================================
     * QUERY
     * ============================================
     */

    const [
        query,
        setQuery,
    ] = useState({
        search: "",

        uomType:
            undefined,

        status:
            "Active",

        decimalAllowed:
            undefined,

        page: 1,

        pageSize: 10,

        sortBy:
            "uomName",

        sortOrder:
            "asc",
    });


    /*
     * ============================================
     * PAGINATION
     * ============================================
     */

    const [
        total,
        setTotal,
    ] = useState(0);


    /*
     * ============================================
     * ERROR
     * ============================================
     */

    const [
        error,
        setError,
    ] = useState(null);


    /*
     * ============================================
     * LOAD DATA
     * ============================================
     */

    const loadData =
        useCallback(
            async () => {
                try {
                    setLoading(
                        true
                    );

                    setError(
                        null
                    );


                    const response =
                        await getUoms(
                            query
                        );


                    setData(
                        response.data
                    );

                    setTotal(
                        response.total
                    );
                }
                catch (
                    serviceError
                ) {
                    console.error(
                        serviceError
                    );

                    setError(
                        serviceError.message ||
                        "Unable to load UOM data."
                    );

                    messageApi.error(
                        serviceError.message ||
                        "Unable to load UOM data."
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


    /*
     * ============================================
     * LOAD ON QUERY CHANGE
     * ============================================
     */

    useEffect(() => {
        loadData();
    }, [
        loadData,
    ]);


    /*
     * ============================================
     * STATISTICS
     * ============================================
     *
     * We derive statistics from all UOMs
     * separately so pagination does not affect
     * the numbers.
     */

    const [
        statistics,
        setStatistics,
    ] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        packaging: 0,
    });


    const loadStatistics =
        useCallback(
            async () => {
                try {
                    const response =
                        await getUoms({
                            search: "",
                            uomType:
                                undefined,
                            status:
                                undefined,
                            decimalAllowed:
                                undefined,
                            page: 1,
                            pageSize:
                                100000,
                            sortBy:
                                "uomName",
                            sortOrder:
                                "asc",
                        });


                    const all =
                        response.data ||
                        [];


                    setStatistics({
                        total:
                            response.total ||
                            0,

                        active:
                            all.filter(
                                (item) =>
                                    item.status ===
                                    "Active"
                            ).length,

                        inactive:
                            all.filter(
                                (item) =>
                                    item.status ===
                                    "Inactive"
                            ).length,

                        packaging:
                            all.filter(
                                (item) =>
                                    item.uomType ===
                                    "PACKAGING"
                            ).length,
                    });
                }
                catch (
                    statisticsError
                ) {
                    console.error(
                        statisticsError
                    );
                }
            },
            []
        );


    useEffect(() => {
        loadStatistics();
    }, [
        loadStatistics,
        data,
    ]);


    /*
     * ============================================
     * OPEN ADD
     * ============================================
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
     * ============================================
     * OPEN VIEW
     * ============================================
     */

    const handleView =
        (record) => {
            setSelectedRecord(
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
     * ============================================
     * OPEN EDIT
     * ============================================
     */

    const handleEdit =
        (record) => {
            setSelectedRecord(
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
     * ============================================
     * CLOSE DRAWER
     * ============================================
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
     * ============================================
     * SAVE / UPDATE
     * ============================================
     */

    const handleSubmit =
        async (
            payload,
            meta
        ) => {
            try {
                setLoading(
                    true
                );


                if (
                    meta.mode ===
                    "EDIT"
                ) {
                    await updateUom(
                        meta.id,
                        payload
                    );

                    messageApi.success(
                        "UOM updated successfully."
                    );
                }
                else {
                    await createUom(
                        payload
                    );

                    messageApi.success(
                        "UOM created successfully."
                    );
                }


                /*
                 * Refresh table
                 */

                await loadData();

                await loadStatistics();


                /*
                 * Close drawer
                 */

                handleDrawerClose();
            }
            catch (
                serviceError
            ) {
                console.error(
                    serviceError
                );

                messageApi.error(
                    serviceError.message ||
                    "Unable to save UOM."
                );

                throw serviceError;
            }
            finally {
                setLoading(
                    false
                );
            }
        };


    /*
     * ============================================
     * ACTIVATE
     * ============================================
     */

    const handleActivate =
        async (
            record
        ) => {
            try {
                setLoading(
                    true
                );


                await activateUom(
                    record.id
                );


                messageApi.success(
                    `${record.uomName} activated successfully.`
                );


                await loadData();

                await loadStatistics();
            }
            catch (
                serviceError
            ) {
                console.error(
                    serviceError
                );

                messageApi.error(
                    serviceError.message ||
                    "Unable to activate UOM."
                );
            }
            finally {
                setLoading(
                    false
                );
            }
        };


    /*
     * ============================================
     * DEACTIVATE
     * ============================================
     */

    const handleDeactivate =
        async (
            record
        ) => {
            try {
                setLoading(
                    true
                );


                await deactivateUom(
                    record.id
                );


                messageApi.success(
                    `${record.uomName} deactivated successfully.`
                );


                await loadData();

                await loadStatistics();
            }
            catch (
                serviceError
            ) {
                console.error(
                    serviceError
                );

                messageApi.error(
                    serviceError.message ||
                    "Unable to deactivate UOM."
                );
            }
            finally {
                setLoading(
                    false
                );
            }
        };


    /*
     * ============================================
     * SEARCH
     * ============================================
     */

    const handleSearch =
        (value) => {
            setQuery(
                (previous) => ({
                    ...previous,

                    search:
                        value,

                    page: 1,
                })
            );
        };


    /*
     * ============================================
     * TYPE FILTER
     * ============================================
     */

    const handleTypeChange =
        (value) => {
            setQuery(
                (previous) => ({
                    ...previous,

                    uomType:
                        value,

                    page: 1,
                })
            );
        };


    /*
     * ============================================
     * STATUS FILTER
     * ============================================
     */

    const handleStatusChange =
        (value) => {
            setQuery(
                (previous) => ({
                    ...previous,

                    status:
                        value,

                    page: 1,
                })
            );
        };


    /*
     * ============================================
     * RESET FILTER
     * ============================================
     */

    const handleReset =
        () => {
            setQuery({
                search: "",

                uomType:
                    undefined,

                status:
                    "Active",

                decimalAllowed:
                    undefined,

                page: 1,

                pageSize: 10,

                sortBy:
                    "uomName",

                sortOrder:
                    "asc",
            });
        };


    /*
     * ============================================
     * TABLE CHANGE
     * ============================================
     */

    const handleTableChange =
        (
            pagination,
            filters,
            sorter
        ) => {
            const uomType =
                Array.isArray(
                    filters?.uomType
                )
                    ? filters.uomType[0]
                    : filters?.uomType;


            const status =
                Array.isArray(
                    filters?.status
                )
                    ? filters.status[0]
                    : filters?.status;


            const decimalAllowed =
                Array.isArray(
                    filters?.decimalAllowed
                )
                    ? filters.decimalAllowed[0]
                    : filters?.decimalAllowed;


            let sortOrder =
                sorter?.order ||
                "asc";


            if (
                sortOrder ===
                "ascend"
            ) {
                sortOrder =
                    "asc";
            }

            if (
                sortOrder ===
                "descend"
            ) {
                sortOrder =
                    "desc";
            }


            setQuery(
                (previous) => ({
                    ...previous,

                    uomType,

                    status,

                    decimalAllowed,

                    page:
                        pagination.current,

                    pageSize:
                        pagination.pageSize,

                    sortBy:
                        sorter?.field ||
                        "uomName",

                    sortOrder,
                })
            );
        };


    /*
     * ============================================
     * TABLE COLUMNS
     * ============================================
     */

    const columns =
        useMemo(
            () =>
                getUomColumns({
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


    /*
     * ============================================
     * HEADER TITLE
     * ============================================
     */

    return (
        <>
            {contextHolder}


            <div
                style={{
                    padding:
                        24,
                }}
            >
                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

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
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize:
                                    24,
                                fontWeight:
                                    700,
                            }}
                        >
                            UOM Master
                        </div>

                        <div
                            style={{
                                marginTop:
                                    4,
                                color:
                                    "#8c8c8c",
                            }}
                        >
                            Manage pharmacy
                            Units of
                            Measure
                        </div>
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
                        Add UOM
                    </Button>
                </div>


                {/* ================================= */}
                {/* STATISTICS */}
                {/* ================================= */}

                <Row
                    gutter={[
                        16,
                        16,
                    ]}
                    style={{
                        marginBottom:
                            20,
                    }}
                >
                    <Col
                        xs={24}
                        sm={12}
                        md={6}
                    >
                        <Card>
                            <Statistic
                                title="Total UOMs"
                                value={
                                    statistics.total
                                }
                                prefix={
                                    <AppstoreOutlined />
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
                                prefix={
                                    <CheckCircleOutlined />
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
                                prefix={
                                    <StopOutlined />
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
                                title="Packaging"
                                value={
                                    statistics.packaging
                                }
                                prefix={
                                    <AppstoreOutlined />
                                }
                            />
                        </Card>
                    </Col>
                </Row>


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (
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
                    />
                )}


                {/* ================================= */}
                {/* FILTER CARD */}
                {/* ================================= */}

                <Card
                    style={{
                        marginBottom:
                            16,
                    }}
                >
                    <Row
                        gutter={[
                            12,
                            12,
                        ]}
                        align="bottom"
                    >
                        {/* SEARCH */}

                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={7}
                        >
                            <div
                                style={{
                                    marginBottom:
                                        6,
                                    fontSize:
                                        12,
                                    fontWeight:
                                        500,
                                }}
                            >
                                Search
                            </div>

                            <Input
                                allowClear
                                prefix={
                                    <SearchOutlined />
                                }
                                placeholder="Search UOM code, name..."
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


                        {/* TYPE */}

                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={5}
                        >
                            <div
                                style={{
                                    marginBottom:
                                        6,
                                    fontSize:
                                        12,
                                    fontWeight:
                                        500,
                                }}
                            >
                                UOM Type
                            </div>

                            <Select
                                allowClear
                                style={{
                                    width:
                                        "100%",
                                }}
                                placeholder="All types"
                                value={
                                    query.uomType
                                }
                                options={
                                    UOM_TYPES
                                }
                                onChange={
                                    handleTypeChange
                                }
                            />
                        </Col>


                        {/* STATUS */}

                        <Col
                            xs={24}
                            sm={12}
                            md={6}
                            lg={5}
                        >
                            <div
                                style={{
                                    marginBottom:
                                        6,
                                    fontSize:
                                        12,
                                    fontWeight:
                                        500,
                                }}
                            >
                                Status
                            </div>

                            <Select
                                style={{
                                    width:
                                        "100%",
                                }}
                                value={
                                    query.status
                                }
                                options={[
                                    {
                                        value:
                                            "Active",
                                        label:
                                            "Active",
                                    },
                                    {
                                        value:
                                            "Inactive",
                                        label:
                                            "Inactive",
                                    },
                                    {
                                        value:
                                            undefined,
                                        label:
                                            "All",
                                    },
                                ]}
                                onChange={
                                    handleStatusChange
                                }
                            />
                        </Col>


                        {/* RESET */}

                        <Col
                            xs={24}
                            sm={12}
                            md={4}
                            lg={3}
                        >
                            <Button
                                icon={
                                    <ReloadOutlined />
                                }
                                onClick={
                                    handleReset
                                }
                                block
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Card>


                {/* ================================= */}
                {/* TABLE */}
                {/* ================================= */}

                <Card
                    styles={{
                        body: {
                            padding: 0,
                        },
                    }}
                >
                    <Table
                        rowKey="id"

                        loading={
                            loading
                        }

                        columns={
                            columns
                        }

                        dataSource={
                            data
                        }

                        onChange={
                            handleTableChange
                        }

                        scroll={{
                            x: 1100,
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

                            showTotal: (
                                totalItems,
                                range
                            ) =>
                                `${range[0]}-${range[1]} of ${totalItems} UOMs`,
                        }}
                    />
                </Card>
            </div>


            {/* ================================= */}
            {/* DRAWER */}
            {/* ================================= */}

            <UomDrawer
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
                    loading
                }

                onClose={
                    handleDrawerClose
                }

                onSubmit={
                    handleSubmit
                }
            />
        </>
    );
};


export default UomPage;