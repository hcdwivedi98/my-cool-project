import { useMemo, useState } from "react";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined
} from "@ant-design/icons";

import {
    Row,
    Col,
    Form
} from "antd";

import {
    AppButton,
    AppCard,
    AppInput,
    AppSelect,
    AppTable
} from "@/components/common";

import SubStoreDrawer from "../components/SubStoreDrawer";

import { getSubStoreColumns } from "../columns/subStore.columns";
import { subStoreMock } from "../mock/subStore.mock";
import  useSubStoreLookup  from "../hooks/useSubStoreLookup";

const SubStorePage = () => {

    const [form] = Form.useForm();

    const lookup = useSubStoreLookup();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerMode, setDrawerMode] = useState("ADD");

    const [selectedRecord, setSelectedRecord] = useState(null);

    const [tableData] = useState(subStoreMock);

    const [searchText, setSearchText] = useState("");

    const handleAdd = () => {

        setSelectedRecord(null);

        setDrawerMode("ADD");

        setDrawerOpen(true);

    };

    const handleView = (record) => {

        setSelectedRecord(record);

        setDrawerMode("VIEW");

        setDrawerOpen(true);

    };

    const handleEdit = (record) => {

        setSelectedRecord(record);

        setDrawerMode("EDIT");

        setDrawerOpen(true);

    };

    const columns = useMemo(() =>

        getSubStoreColumns({

            onView: handleView,

            onEdit: handleEdit

        }),

        []

    );

    const filteredData = useMemo(() => {

        return tableData.filter(item => {

            const keyword = searchText.toLowerCase();

            return (

                item.name?.toLowerCase().includes(keyword) ||

                item.code?.toLowerCase().includes(keyword) ||

                item.storeName?.toLowerCase().includes(keyword)

            );

        });

    }, [tableData, searchText]);

    const handleReset = () => {

        form.resetFields();

        setSearchText("");

    };

    return (

        <>

            <AppCard>

                <Form
                    form={form}
                    layout="vertical"
                >

                    <Row gutter={16}>

                        <Col xs={24} sm={12} md={6}>

                            <Form.Item
                                label="Center"
                                name="centerId"
                            >

                                <AppSelect
                                    allowClear
                                    placeholder="Select Center"
                                    options={lookup.centers}
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={12} md={6}>

                            <Form.Item
                                label="Department"
                                name="departmentId"
                            >

                                <AppSelect
                                    allowClear
                                    placeholder="Select Department"
                                    options={lookup.departments}
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={12} md={6}>

                            <Form.Item
                                label="Store"
                                name="storeId"
                            >

                                <AppSelect
                                    allowClear
                                    placeholder="Select Store"
                                    options={lookup.stores}
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={12} md={6}>

                            <Form.Item
                                label="Status"
                                name="status"
                            >

                                <AppSelect
                                    allowClear
                                    placeholder="Select Status"
                                    options={[
                                        {
                                            label: "Active",
                                            value: true
                                        },
                                        {
                                            label: "Inactive",
                                            value: false
                                        }
                                    ]}
                                />

                            </Form.Item>

                        </Col>

                    </Row>

                    <Row
                        gutter={16}
                        align="bottom"
                    >

                        <Col xs={24} md={8}>

                            <Form.Item
                                label="Search"
                            >

                                <AppInput
                                    placeholder="Code / Name / Store"
                                    prefix={<SearchOutlined />}
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />

                            </Form.Item>

                        </Col>

                        <Col
                            xs={24}
                            md={16}
                            style={{
                                textAlign: "right"
                            }}
                        >

                            <AppButton
                                icon={<ReloadOutlined />}
                                onClick={handleReset}
                            >
                                Reset
                            </AppButton>

                            <AppButton
                                type="primary"
                                icon={<PlusOutlined />}
                                style={{
                                    marginLeft: 8
                                }}
                                onClick={handleAdd}
                            >
                                Add Sub Store
                            </AppButton>

                        </Col>

                    </Row>

                </Form>

            </AppCard>

            <AppCard
                style={{
                    marginTop: 16
                }}
            >

                <AppTable
                    rowKey="id"
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) =>
                            `Total ${total} Records`
                    }}
                    scroll={{
                        x: 1200
                    }}
                />

            </AppCard>

            <SubStoreDrawer
                open={drawerOpen}
                mode={drawerMode}
                record={selectedRecord}
                onClose={() => {

                    setDrawerOpen(false);

                    setSelectedRecord(null);

                }}
            />

        </>

    );

};

export default SubStorePage;   