import { useMemo, useState } from "react";

import {
    Form,
    Row,
    Col
} from "antd";

import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined
} from "@ant-design/icons";

import {
    AppButton,
    AppCard,
    AppInput,
    AppSelect,
    AppTable
} from "@/components/common";

import RackDrawer from "../components/RackDrawer";

import rackMock from "../mock/rack.mock";
import useRackLookup from "../hooks/useRackLookup";
import { getRackColumns } from "../columns/rack.columns";

const RackPage = () => {

    const [form] = Form.useForm();

    const lookup = useRackLookup();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerMode, setDrawerMode] = useState("ADD");

    const [selectedRecord, setSelectedRecord] = useState(null);

    const [tableData] = useState(rackMock);

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

    const handleReset = () => {

        form.resetFields();

        setSearchText("");

    };

    const columns = useMemo(() =>
        getRackColumns({
            onView: handleView,
            onEdit: handleEdit
        }),
        []
    );

    const filteredData = useMemo(() => {

        const keyword = searchText.toLowerCase();

        return tableData.filter(item =>
            item.rackCode?.toLowerCase().includes(keyword) ||
            item.rackName?.toLowerCase().includes(keyword) ||
            item.subStoreName?.toLowerCase().includes(keyword)
        );

    }, [tableData, searchText]);

        return (

        <>

            <AppCard>

                <Form
                    form={form}
                    layout="vertical"
                >

                    <Row gutter={16}>

                        <Col xs={24} md={6}>

                            <Form.Item
                                name="centerId"
                                label="Center"
                            >

                                <AppSelect
                                    options={lookup.centers}
                                    placeholder="Select Center"
                                    allowClear
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} md={6}>

                            <Form.Item
                                name="departmentId"
                                label="Department"
                            >

                                <AppSelect
                                    options={lookup.departments}
                                    placeholder="Select Department"
                                    allowClear
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} md={6}>

                            <Form.Item
                                name="storeId"
                                label="Store"
                            >

                                <AppSelect
                                    options={lookup.stores}
                                    placeholder="Select Store"
                                    allowClear
                                />

                            </Form.Item>

                        </Col>

                        <Col xs={24} md={6}>

                            <Form.Item
                                name="subStoreId"
                                label="Sub Store"
                            >

                                <AppSelect
                                    options={lookup.subStores}
                                    placeholder="Select Sub Store"
                                    allowClear
                                />

                            </Form.Item>

                        </Col>

                    </Row>

                    <Row gutter={16} align="bottom">

                        <Col xs={24} md={8}>

                            <Form.Item label="Search">

                                <AppInput
                                    prefix={<SearchOutlined />}
                                    placeholder="Search Rack..."
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
                            style={{ textAlign: "right" }}
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
                                style={{ marginLeft: 8 }}
                                onClick={handleAdd}
                            >
                                Add Rack
                            </AppButton>

                        </Col>

                    </Row>

                </Form>

            </AppCard>

            <AppCard style={{ marginTop: 16 }}>

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
                        x: 1400
                    }}
                />

            </AppCard>

            <RackDrawer
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

export default RackPage;