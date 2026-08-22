// src/modules/pharmacy/drug-category/DrugCategoryPage.jsx

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
    Card,
    Empty,
    Input,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    message,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import DrugCategoryDrawer
    from "./components/DrugCategoryDrawer";

import {
    DRUG_CATEGORY_FORM_MODES,
} from "./components/DrugCategoryForm";

import getDrugCategoryColumns
    from "./columns/drugCategory.columns";

import useDrugCategoryLookup
    from "./hooks/useDrugCategoryLookup";

import drugCategoryService
    from "./services/drugCategory.service";

import {
    createDrugCategoryQuery,
    resolveDrugCategoryTableChange,
    updateDrugCategoryFilter,
    updateDrugCategorySearch,
} from "./utils/drugCategory.query";


const {
    Title,
    Text,
} = Typography;


/*
 * =========================================================
 * PAGE
 * =========================================================
 */

const DrugCategoryPage = () => {

    /*
     * =====================================================
     * MESSAGE
     * =====================================================
     */

    const [
        messageApi,
        contextHolder,
    ] = message.useMessage();


    /*
     * =====================================================
     * LOOKUPS
     * =====================================================
     */

    const {
        categoryTypes,
        statuses,
    } =
        useDrugCategoryLookup();


    /*
     * =====================================================
     * QUERY
     * =====================================================
     */

    const [
        query,
        setQuery,
    ] = useState(
        () =>
            createDrugCategoryQuery()
    );


    /*
     * =====================================================
     * DATA
     * =====================================================
     */

    const [
        data,
        setData,
    ] = useState([]);


    const [
        total,
        setTotal,
    ] = useState(0);


    const [
        loading,
        setLoading,
    ] = useState(false);


    /*
     * =====================================================
     * DRAWER
     * =====================================================
     */

    const [
        drawerState,
        setDrawerState,
    ] = useState({
        open: false,

        mode:
            DRUG_CATEGORY_FORM_MODES.CREATE,

        record: null,
    });


    /*
     * =====================================================
     * FETCH LIST
     * =====================================================
     */

    const loadCategories =
        useCallback(
            async (
                currentQuery = query
            ) => {

                setLoading(true);


                try {

                    const response =
                        await drugCategoryService.getList(
                            currentQuery
                        );


                    setData(
                        response.items ||
                        response.data ||
                        []
                    );


                    setTotal(
                        response.total ||
                        0
                    );

                }
                catch (
                    error
                ) {

                    messageApi.error(
                        error?.message ||
                        "Unable to load drug categories."
                    );

                }
                finally {

                    setLoading(false);

                }
            },
            [
                messageApi,
                query,
            ]
        );


    /*
     * =====================================================
     * INITIAL LOAD
     * =====================================================
     */

    useEffect(() => {

        loadCategories(
            query
        );

    }, []);


    /*
     * =====================================================
     * SEARCH
     * =====================================================
     */

    const handleSearch = (
        value
    ) => {

        const nextQuery =
            updateDrugCategorySearch(
                query,
                value
            );


        setQuery(
            nextQuery
        );


        loadCategories(
            nextQuery
        );
    };


    /*
     * =====================================================
     * FILTER
     * =====================================================
     */

    const handleFilterChange = (
        field,
        value
    ) => {

        const nextQuery =
            updateDrugCategoryFilter(
                query,
                field,
                value
            );


        setQuery(
            nextQuery
        );


        loadCategories(
            nextQuery
        );
    };


    /*
     * =====================================================
     * TABLE CHANGE
     * =====================================================
     */

    const handleTableChange = (
        pagination,
        filters,
        sorter
    ) => {

        const nextQuery =
            resolveDrugCategoryTableChange(
                query,
                pagination,
                filters,
                sorter
            );


        setQuery(
            nextQuery
        );


        loadCategories(
            nextQuery
        );
    };


    /*
     * =====================================================
     * RESET FILTERS
     * =====================================================
     */

    const handleReset = () => {

        const nextQuery =
            createDrugCategoryQuery();


        setQuery(
            nextQuery
        );


        loadCategories(
            nextQuery
        );
    };


    /*
     * =====================================================
     * CREATE
     * =====================================================
     */

    const handleCreate = () => {

        setDrawerState({
            open: true,

            mode:
                DRUG_CATEGORY_FORM_MODES.CREATE,

            record: null,
        });
    };


    /*
     * =====================================================
     * VIEW
     * =====================================================
     */

    const handleView = (
        record
    ) => {

        setDrawerState({
            open: true,

            mode:
                DRUG_CATEGORY_FORM_MODES.VIEW,

            record,
        });
    };


    /*
     * =====================================================
     * EDIT
     * =====================================================
     */

    const handleEdit = (
        record
    ) => {

        setDrawerState({
            open: true,

            mode:
                DRUG_CATEGORY_FORM_MODES.EDIT,

            record,
        });
    };


    /*
     * =====================================================
     * ACTIVATE
     * =====================================================
     */

    const handleActivate = async (
        record
    ) => {

        try {

            await drugCategoryService.activate(
                record.id
            );


            messageApi.success(
                "Drug category activated successfully."
            );


            await loadCategories(
                query
            );

        }
        catch (
            error
        ) {

            messageApi.error(
                error?.message ||
                "Unable to activate category."
            );
        }
    };


    /*
     * =====================================================
     * DEACTIVATE
     * =====================================================
     */

    const handleDeactivate = async (
        record
    ) => {

        try {

            await drugCategoryService.deactivate(
                record.id
            );


            messageApi.success(
                "Drug category deactivated successfully."
            );


            await loadCategories(
                query
            );

        }
        catch (
            error
        ) {

            messageApi.error(
                error?.message ||
                "Unable to deactivate category."
            );
        }
    };


    /*
     * =====================================================
     * COLUMN CONFIGURATION
     * =====================================================
     */

    const columns =
        useMemo(
            () =>
                getDrugCategoryColumns({
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
     * =====================================================
     * FORM SUBMIT
     * =====================================================
     */

    const handleSubmit = async (
        payload,
        context
    ) => {

        try {

            if (
                context?.mode ===
                DRUG_CATEGORY_FORM_MODES.EDIT
            ) {

                await drugCategoryService.update(
                    context.record.id,
                    payload
                );


                messageApi.success(
                    "Drug category updated successfully."
                );

            }
            else {

                await drugCategoryService.create(
                    payload
                );


                messageApi.success(
                    "Drug category created successfully."
                );
            }


            /*
             * Close drawer
             */

            setDrawerState({
                open: false,

                mode:
                    DRUG_CATEGORY_FORM_MODES.CREATE,

                record: null,
            });


            /*
             * Reload current list
             */

            await loadCategories(
                query
            );

        }
        catch (
            error
        ) {

            /*
             * Throw back to Drawer/Form.
             *
             * DrugCategoryForm catches this and
             * displays the error without closing.
             */

            throw error;
        }
    };


    /*
     * =====================================================
     * CLOSE DRAWER
     * =====================================================
     */

    const handleDrawerClose = () => {

        setDrawerState({
            open: false,

            mode:
                DRUG_CATEGORY_FORM_MODES.CREATE,

            record: null,
        });
    };


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <>
            {contextHolder}


            {/* =================================================
                PAGE
            ================================================= */}

            <div className="drug-category-page">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="drug-category-page-header">

                    <div>

                        <Title
                            level={4}
                            style={{
                                margin: 0,
                            }}
                        >
                            Drug Category Master
                        </Title>

                        <Text
                            type="secondary"
                        >
                            Manage therapeutic,
                            pharmacological and
                            clinical drug categories.
                        </Text>

                    </div>


                    <Button
                        type="primary"
                        icon={
                            <PlusOutlined />
                        }
                        onClick={
                            handleCreate
                        }
                    >
                        Add Drug Category
                    </Button>

                </div>


                {/* =================================================
                    FILTER CARD
                ================================================= */}

                <Card
                    className="drug-category-filter-card"
                    bordered={false}
                >

                    <Space
                        wrap
                        size={[
                            12,
                            12,
                        ]}
                        style={{
                            width: "100%",
                        }}
                    >

                        {/* SEARCH */}

                        <Input
                            allowClear
                            prefix={
                                <SearchOutlined />
                            }
                            placeholder="Search category code or name..."
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
                                width: 280,
                            }}
                        />


                        {/* CATEGORY TYPE */}

                        <Select
                            allowClear
                            placeholder="Category Type"
                            value={
                                query.categoryType
                            }
                            options={
                                categoryTypes
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "categoryType",
                                    value
                                )
                            }
                            style={{
                                width: 180,
                            }}
                        />


                        {/* STATUS */}

                        <Select
                            allowClear
                            placeholder="Status"
                            value={
                                query.status
                            }
                            options={
                                statuses
                            }
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "status",
                                    value
                                )
                            }
                            style={{
                                width: 150,
                            }}
                        />


                        {/* USAGE */}

                        <Select
                            value={
                                query.usage ||
                                "ALL"
                            }
                            options={[
                                {
                                    value:
                                        "ALL",
                                    label:
                                        "All Usage",
                                },
                                {
                                    value:
                                        "USED",
                                    label:
                                        "Used",
                                },
                                {
                                    value:
                                        "UNUSED",
                                    label:
                                        "Unused",
                                },
                            ]}
                            onChange={(
                                value
                            ) =>
                                handleFilterChange(
                                    "usage",
                                    value
                                )
                            }
                            style={{
                                width: 150,
                            }}
                        />


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

                    </Space>

                </Card>


                {/* =================================================
                    TABLE
                ================================================= */}

                <Card
                    className="drug-category-table-card"
                    bordered={false}
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

                        locale={{
                            emptyText: (
                                <Empty
                                    description="No drug categories found"
                                />
                            ),
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

                            pageSizeOptions: [
                                10,
                                20,
                                50,
                                100,
                            ],

                            showTotal: (
                                value,
                                range
                            ) =>
                                `${range[0]}-${range[1]} of ${value} categories`,
                        }}

                        onChange={
                            handleTableChange
                        }

                        scroll={{
                            x: 1500,
                        }}
                    />

                </Card>


                {/* =================================================
                    DRAWER
                ================================================= */}

                <DrugCategoryDrawer
                    open={
                        drawerState.open
                    }

                    mode={
                        drawerState.mode
                    }

                    record={
                        drawerState.record
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

            </div>
        </>
    );
};


export default DrugCategoryPage;