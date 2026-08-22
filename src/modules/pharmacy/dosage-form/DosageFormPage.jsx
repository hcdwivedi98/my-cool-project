// src/modules/pharmacy/dosage-form/DosageFormPage.jsx

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
    Modal,
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

import DosageFormDrawer
    from "./components/DosageFormDrawer";

import getDosageFormColumns
    from "./columns/dosageForm.columns";

import dosageFormService
    from "./services/dosageForm.service";

import {
    DOSAGE_FORM_FORM_MODES,
    DOSAGE_FORM_STATUS_OPTIONS,
    DOSAGE_FORM_TYPES,
    ROUTE_OF_ADMINISTRATION_OPTIONS,
    DOSAGE_FORM_USAGE_OPTIONS,
} from "./constants/dosageForm.constants";

import {
    createDosageFormQuery,
} from "./utils/dosageForm.query";

import "./styles/dosageForm.css";


const {
    Title,
    Text,
} = Typography;


/*
 * =========================================================
 * PAGE
 * =========================================================
 */

const DosageFormPage = () => {

    /*
     * =====================================================
     * MESSAGE
     * =====================================================
     */

    const [
        messageApi,
        messageContextHolder,
    ] =
        message.useMessage();


    /*
     * =====================================================
     * LIST
     * =====================================================
     */

    const [
        data,
        setData,
    ] = useState([]);


    /*
     * =====================================================
     * TOTAL
     * =====================================================
     */

    const [
        total,
        setTotal,
    ] = useState(0);


    /*
     * =====================================================
     * LOADING
     * =====================================================
     */

    const [
        loading,
        setLoading,
    ] = useState(false);


    /*
     * =====================================================
     * ACTION LOADING
     * =====================================================
     */

    const [
        actionLoading,
        setActionLoading,
    ] = useState(false);


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
            createDosageFormQuery()
    );


    /*
     * =====================================================
     * SEARCH INPUT
     * =====================================================
     */

    const [
        searchInput,
        setSearchInput,
    ] = useState("");


    /*
     * =====================================================
     * DRAWER
     * =====================================================
     */

    const [
        drawerOpen,
        setDrawerOpen,
    ] = useState(false);


    const [
        drawerMode,
        setDrawerMode,
    ] = useState(
        DOSAGE_FORM_FORM_MODES.CREATE
    );


    const [
        selectedRecord,
        setSelectedRecord,
    ] = useState(null);


    /*
     * =====================================================
     * CONFIRM MODAL
     * =====================================================
     */

    const [
        confirmAction,
        setConfirmAction,
    ] = useState(null);


    /*
     * =====================================================
     * LOAD LIST
     * =====================================================
     */

    const loadData =
        useCallback(
            async (
                currentQuery =
                    query
            ) => {

                try {

                    setLoading(
                        true
                    );


                    const response =
                        await dosageFormService.getList(
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
                    error
                ) {

                    messageApi.error(
                        error?.message ||
                        "Unable to load dosage forms."
                    );

                }
                finally {

                    setLoading(
                        false
                    );
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

    useEffect(
        () => {

            loadData(
                query
            );

        },
        [
            query,
        ]
    );


    /*
     * =====================================================
     * SEARCH
     * =====================================================
     */

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


    /*
     * =====================================================
     * SEARCH ENTER
     * =====================================================
     */

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


    /*
     * =====================================================
     * FILTER
     * =====================================================
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
                        value ||
                        undefined,

                    page:
                        1,
                })
            );
        };


    /*
     * =====================================================
     * RESET
     * =====================================================
     */

    const handleReset =
        () => {

            setSearchInput(
                ""
            );

            setQuery(
                createDosageFormQuery()
            );
        };


    /*
     * =====================================================
     * PAGINATION
     * =====================================================
 */

    const handlePaginationChange =
        (
            page,
            pageSize
        ) => {

            setQuery(
                (
                    previous
                ) => ({

                    ...previous,

                    page,

                    pageSize,
                })
            );
        };


    /*
     * =====================================================
     * TABLE CHANGE
     * =====================================================
     */

    const handleTableChange =
        (
            pagination,
            filters,
            sorter
        ) => {

            const nextQuery = {

                ...query,

                page:
                    pagination.current,

                pageSize:
                    pagination.pageSize,
            };


            /*
             * -------------------------------------------
             * FORM TYPE
             * -------------------------------------------
             */

            if (
                filters?.formType
            ) {

                nextQuery.formType =
                    Array.isArray(
                        filters.formType
                    )
                        ? filters.formType[0]
                        : filters.formType;
            }
            else {

                nextQuery.formType =
                    undefined;
            }


            /*
             * -------------------------------------------
             * ROUTE
             * -------------------------------------------
             */

            if (
                filters?.routeOfAdministrationId
            ) {

                nextQuery.routeOfAdministrationId =
                    Array.isArray(
                        filters.routeOfAdministrationId
                    )
                        ? filters.routeOfAdministrationId[0]
                        : filters.routeOfAdministrationId;
            }
            else {

                nextQuery.routeOfAdministrationId =
                    undefined;
            }


            /*
             * -------------------------------------------
             * STATUS
             * -------------------------------------------
             */

            if (
                filters?.status
            ) {

                nextQuery.status =
                    Array.isArray(
                        filters.status
                    )
                        ? filters.status[0]
                        : filters.status;
            }
            else {

                nextQuery.status =
                    undefined;
            }


            /*
             * -------------------------------------------
             * SORT
             * -------------------------------------------
             */

            const sorterField =
                sorter?.field ||
                sorter?.columnKey;


            if (
                sorterField
            ) {

                nextQuery.sortBy =
                    sorterField;


                nextQuery.sortOrder =
                    sorter.order ===
                    "descend"
                        ? "desc"
                        : "asc";
            }


            setQuery(
                nextQuery
            );
        };


    /*
     * =====================================================
     * CREATE
     * =====================================================
     */

    const handleAdd =
        () => {

            setSelectedRecord(
                null
            );

            setDrawerMode(
                DOSAGE_FORM_FORM_MODES.CREATE
            );

            setDrawerOpen(
                true
            );
        };


    /*
     * =====================================================
     * VIEW
     * =====================================================
     */

    const handleView =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );

            setDrawerMode(
                DOSAGE_FORM_FORM_MODES.VIEW
            );

            setDrawerOpen(
                true
            );
        };


    /*
     * =====================================================
     * EDIT
     * =====================================================
     */

    const handleEdit =
        (
            record
        ) => {

            setSelectedRecord(
                record
            );

            setDrawerMode(
                DOSAGE_FORM_FORM_MODES.EDIT
            );

            setDrawerOpen(
                true
            );
        };


    /*
     * =====================================================
     * ACTIVATE
     * =====================================================
     */

    const handleActivate =
        (
            record
        ) => {

            setConfirmAction({
                type:
                    "activate",

                record,
            });
        };


    /*
     * =====================================================
     * DEACTIVATE
     * =====================================================
 */

    const handleDeactivate =
        (
            record
        ) => {

            setConfirmAction({
                type:
                    "deactivate",

                record,
            });
        };


    /*
     * =====================================================
     * CONFIRM ACTIVATE / DEACTIVATE
     * =====================================================
     */

    const handleConfirmAction =
        async () => {

            if (
                !confirmAction?.record
            ) {
                return;
            }


            try {

                setActionLoading(
                    true
                );


                if (
                    confirmAction.type ===
                    "activate"
                ) {

                    await dosageFormService.activate(
                        confirmAction.record.id
                    );


                    messageApi.success(
                        "Dosage form activated successfully."
                    );

                }
                else {

                    const result =
                        await dosageFormService.deactivate(
                            confirmAction.record.id
                        );


                    messageApi.success(
                        "Dosage form deactivated successfully."
                    );


                    /*
                     * Existing mappings are preserved.
                     */

                    if (
                        result?.deactivationWarning
                    ) {

                        messageApi.info(
                            result.deactivationWarning
                        );
                    }
                }


                setConfirmAction(
                    null
                );


                await loadData(
                    query
                );

            }
            catch (
                error
            ) {

                messageApi.error(
                    error?.message ||
                    "Unable to update dosage form status."
                );

            }
            finally {

                setActionLoading(
                    false
                );
            }
        };


    /*
     * =====================================================
     * CANCEL CONFIRM ACTION
     * =====================================================
     */

    const handleCancelAction =
        () => {

            if (
                actionLoading
            ) {
                return;
            }


            setConfirmAction(
                null
            );
        };


    /*
     * =====================================================
     * SUBMIT CREATE / UPDATE
     * =====================================================
     */

    const handleDrawerSubmit =
        async (
            payload,
            context
        ) => {

            try {

                setActionLoading(
                    true
                );


                if (
                    context?.mode ===
                    DOSAGE_FORM_FORM_MODES.EDIT
                ) {

                    await dosageFormService.update(
                        context.record.id,
                        payload
                    );


                    messageApi.success(
                        "Dosage form updated successfully."
                    );

                }
                else {

                    await dosageFormService.create(
                        payload
                    );


                    messageApi.success(
                        "Dosage form created successfully."
                    );
                }


                setDrawerOpen(
                    false
                );


                setSelectedRecord(
                    null
                );


                setQuery(
                    (
                        previous
                    ) => ({

                        ...previous,

                        page:
                            context?.mode ===
                            DOSAGE_FORM_FORM_MODES.CREATE
                                ? 1
                                : previous.page,
                    })
                );

            }
            catch (
                error
            ) {

                messageApi.error(
                    error?.message ||
                    "Unable to save dosage form."
                );


                /*
                 * Throw the error back to the form.
                 * Drawer remains open.
                 */

                throw error;

            }
            finally {

                setActionLoading(
                    false
                );
            }
        };


    /*
     * =====================================================
     * DRAWER CLOSE
     * =====================================================
     */

    const handleDrawerClose =
        () => {

            if (
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


    /*
     * =====================================================
     * COLUMNS
     * =====================================================
     */

    const columns =
        useMemo(
            () =>
                getDosageFormColumns({

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
     * CONFIRMATION DETAILS
     * =====================================================
     */

    const confirmationDetails =
        useMemo(
            () => {

                if (
                    !confirmAction
                ) {
                    return null;
                }


                const record =
                    confirmAction.record;


                const isDeactivate =
                    confirmAction.type ===
                    "deactivate";


                return {

                    title:
                        isDeactivate
                            ? "Deactivate Dosage Form?"
                            : "Activate Dosage Form?",

                    actionText:
                        isDeactivate
                            ? "Deactivate"
                            : "Activate",

                    message:
                        isDeactivate
                            ? `Are you sure you want to deactivate "${record?.formName}"?`
                            : `Are you sure you want to activate "${record?.formName}"?`,

                    danger:
                        isDeactivate,
                };

            },
            [
                confirmAction,
            ]
        );


    /*
     * =====================================================
     * RENDER
     * =====================================================
     */

    return (
        <div className="dosage-form-page">

            {
                messageContextHolder
            }


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="dosage-form-page-header">

                <div>

                    <Title
                        level={3}
                        style={{
                            margin:
                                0,
                        }}
                    >
                        Dosage Form Master
                    </Title>

                    <Text
                        type="secondary"
                    >
                        Manage standardized pharmaceutical
                        dosage forms used across the pharmacy.
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
                    Add Dosage Form
                </Button>

            </div>


            {/* =================================================
                FILTER CARD
            ================================================= */}

            <Card
                className="dosage-form-filter-card"
                style={{
                    marginTop:
                        20,
                }}
            >

                <div className="dosage-form-filter-row">

                    {/* =========================================
                        SEARCH
                    ========================================== */}

                    <Input
                        allowClear

                        prefix={
                            <SearchOutlined />
                        }

                        placeholder="Search code, name, description or route"

                        value={
                            searchInput
                        }

                        onChange={
                            (
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
                            () =>
                                setSearchInput(
                                    ""
                                )
                        }

                        style={{
                            minWidth:
                                280,

                            maxWidth:
                                360,
                        }}
                    />


                    {/* =========================================
                        FORM TYPE
                    ========================================== */}

                    <select
                        className="dosage-form-native-filter"

                        value={
                            query.formType ||
                            ""
                        }

                        onChange={
                            (
                                event
                            ) =>
                                handleFilterChange(
                                    "formType",
                                    event.target.value
                                )
                        }
                    >

                        <option value="">
                            All Form Types
                        </option>

                        {DOSAGE_FORM_TYPES.map(
                            (
                                option
                            ) => (

                                <option
                                    key={
                                        option.value
                                    }

                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {/* =========================================
                        ROUTE
                    ========================================== */}

                    <select
                        className="dosage-form-native-filter"

                        value={
                            query.routeOfAdministrationId ||
                            ""
                        }

                        onChange={
                            (
                                event
                            ) =>
                                handleFilterChange(
                                    "routeOfAdministrationId",
                                    event.target.value
                                )
                        }
                    >

                        <option value="">
                            All Routes
                        </option>

                        {ROUTE_OF_ADMINISTRATION_OPTIONS.map(
                            (
                                option
                            ) => (

                                <option
                                    key={
                                        option.value
                                    }

                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {/* =========================================
                        STATUS
                    ========================================== */}

                    <select
                        className="dosage-form-native-filter"

                        value={
                            query.status ||
                            ""
                        }

                        onChange={
                            (
                                event
                            ) =>
                                handleFilterChange(
                                    "status",
                                    event.target.value
                                )
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        {DOSAGE_FORM_STATUS_OPTIONS.map(
                            (
                                option
                            ) => (

                                <option
                                    key={
                                        option.value
                                    }

                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {/* =========================================
                        USAGE
                    ========================================== */}

                    <select
                        className="dosage-form-native-filter"

                        value={
                            query.usage ||
                            "ALL"
                        }

                        onChange={
                            (
                                event
                            ) =>
                                handleFilterChange(
                                    "usage",
                                    event.target.value
                                )
                        }
                    >

                        {DOSAGE_FORM_USAGE_OPTIONS.map(
                            (
                                option
                            ) => (

                                <option
                                    key={
                                        option.value
                                    }

                                    value={
                                        option.value
                                    }
                                >
                                    {
                                        option.label
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {/* =========================================
                        ACTIONS
                    ========================================== */}

                    <Space>

                        <Button
                            type="primary"
                            onClick={
                                handleSearch
                            }
                        >
                            Search
                        </Button>


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

                </div>

            </Card>


            {/* =================================================
                TABLE CARD
            ================================================= */}

            <Card
                className="dosage-form-table-card"
                style={{
                    marginTop:
                        16,
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

                    scroll={{
                        x:
                            1200,
                    }}

                    locale={{
                        emptyText: (
                            <Empty
                                description="No dosage forms found"
                            />
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

                        showQuickJumper:
                            true,

                        showTotal:
                            (
                                count,
                                range
                            ) =>
                                `${range[0]}-${range[1]} of ${count} dosage forms`,
                    }}

                    onChange={
                        handleTableChange
                    }
                />

            </Card>


            {/* =================================================
                DRAWER
            ================================================= */}

            <DosageFormDrawer

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
                    actionLoading
                }

                onClose={
                    handleDrawerClose
                }

                onSubmit={
                    handleDrawerSubmit
                }

            />


            {/* =================================================
                ACTIVATE / DEACTIVATE MODAL
            ================================================= */}

            <Modal
                open={
                    Boolean(
                        confirmAction
                    )
                }

                title={
                    confirmationDetails?.title
                }

                centered

                onCancel={
                    handleCancelAction
                }

                onOk={
                    handleConfirmAction
                }

                confirmLoading={
                    actionLoading
                }

                okText={
                    confirmationDetails?.actionText
                }

                okButtonProps={{
                    danger:
                        confirmationDetails?.danger,
                }}

                cancelText="Cancel"
            >

                <div
                    style={{
                        marginBottom:
                            8,
                    }}
                >

                    <strong>
                        {
                            confirmAction
                                ?.record
                                ?.formName
                        }
                    </strong>

                </div>


                <Text
                    type="secondary"
                >
                    {
                        confirmationDetails?.message
                    }
                </Text>


                {confirmAction?.type ===
                    "deactivate" &&
                    Number(
                        confirmAction
                            ?.record
                            ?.drugCount
                    ) > 0 && (

                    <div
                        style={{
                            marginTop:
                                16,
                        }}
                    >

                        <Tag
                            color="warning"
                        >
                            {
                                confirmAction
                                    ?.record
                                    ?.drugCount
                            }{" "}
                            existing drug mapping
                            {
                                Number(
                                    confirmAction
                                        ?.record
                                        ?.drugCount
                                ) === 1
                                    ? ""
                                    : "s"
                            }{" "}
                            will be preserved.
                        </Tag>

                    </div>

                )}

            </Modal>

        </div>
    );
};


export default DosageFormPage;