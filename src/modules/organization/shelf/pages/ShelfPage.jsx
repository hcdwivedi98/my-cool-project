import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Row,
    Col,
    Card,
    Space,
    Input,
    Select,
    Tag,
    message,
    Popconfirm,
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    EditOutlined,
    EyeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import {
    AppButton,
    AppTable,
} from "@/components/common";

import ShelfDrawer from "../components/ShelfDrawer";
import getShelfColumns from "../columns/shelf.columns";
import useShelfLookup from "../hooks/useShelfLookup";
import {
    shelfList,
    shelfStatistics,
} from "../mock/shelf.mock";

const ShelfPage = () => {

    const lookups = useShelfLookup();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [drawerMode, setDrawerMode] =
        useState("add");

    const [selectedRecord, setSelectedRecord] =
        useState(null);

    const [searchText, setSearchText] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");
    useEffect(() => {

        loadData();

    }, []);

    const loadData = () => {

        setLoading(true);

        setTimeout(() => {

            setData(shelfList);

            setLoading(false);

        }, 300);

    };
    const filteredData = useMemo(() => {

        let rows = [...data];

        if (statusFilter !== "ALL") {

            rows = rows.filter(
                x => x.status === statusFilter
            );

        }

        if (searchText) {

            rows = rows.filter(item =>

                item.shelfCode
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase())

                ||

                item.shelfName
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase())

            );

        }

        return rows;

    }, [
        data,
        searchText,
        statusFilter,
    ]);

    const openAdd = () => {

        setDrawerMode("add");

        setSelectedRecord(null);

        setDrawerOpen(true);

    };

    const openEdit = (record) => {

        setDrawerMode("edit");

        setSelectedRecord(record);

        setDrawerOpen(true);

    };

    const openView = (record) => {

        setDrawerMode("view");

        setSelectedRecord(record);

        setDrawerOpen(true);

    };

    const closeDrawer = () => {

        setDrawerOpen(false);

    };

    const saveShelf = async (payload) => {

        console.log(payload);

        message.success(
            drawerMode === "add"
                ? "Shelf Added"
                : "Shelf Updated"
        );

        closeDrawer();

        loadData();

    };

    const deleteShelf = (record) => {

        message.success(
            `${record.shelfName} Deleted`
        );

    };

    const columns = useMemo(() => {

        return getShelfColumns({

            onView: openView,

            onEdit: openEdit,

            onDelete: deleteShelf,

        });

    }, [openView, openEdit, deleteShelf]);

    const toolbar = (

        <Space
            style={{
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 16,
            }}
        >

            <Space>

                <Input.Search

                    allowClear

                    placeholder="Search Shelf"

                    value={searchText}

                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }

                    style={{
                        width: 250,
                    }}

                />

                <Select

                    value={statusFilter}

                    style={{
                        width: 140,
                    }}

                    onChange={setStatusFilter}

                    options={[
                        {
                            label: "All",
                            value: "ALL",
                        },
                        {
                            label: "Active",
                            value: "ACTIVE",
                        },
                        {
                            label: "Inactive",
                            value: "INACTIVE",
                        },
                    ]}

                />

            </Space>

            <Space>

                <AppButton

                    icon={<ReloadOutlined />}

                    onClick={loadData}

                >

                    Refresh

                </AppButton>

                <AppButton

                    type="primary"

                    icon={<PlusOutlined />}

                    onClick={openAdd}

                >

                    Add Shelf

                </AppButton>

            </Space>

        </Space>

    );

    const statistics = (

        <Row gutter={16}>

            {shelfStatistics.map(item => (

                <Col
                    key={item.title}
                    xs={24}
                    sm={12}
                    md={6}
                >

                    <Card>

                        <h3>{item.title}</h3>

                        <h2>{item.value}</h2>

                        <Tag color={item.color}>
                            {item.label}
                        </Tag>

                    </Card>

                </Col>

            ))}

        </Row>

    );

        return (
        <>
            <Space
                direction="vertical"
                size={16}
                style={{ width: "100%" }}
            >
                {statistics}

                {toolbar}

                <AppTable
                    loading={loading}
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) =>
                            `Total ${total} Records`,
                    }}
                />
            </Space>

            <ShelfDrawer
                open={drawerOpen}
                mode={drawerMode}
                record={selectedRecord}
                lookups={lookups}
                loading={loading}
                documents={
                    selectedRecord?.documents || []
                }
                onSave={saveShelf}
                onClose={closeDrawer}
            />
        </>
    );
};

export default ShelfPage;