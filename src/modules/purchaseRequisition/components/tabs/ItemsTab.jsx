import React, { useState } from "react";

import {
    Card,
    Row,
    Col,
    Table,
    Space,
    Typography,
} from "antd";
import { InputNumber } from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { AppButton } from "../../../../components/common/buttons";
import { AppInput } from "../../../../components/common/form";

import ItemSearchModal from "../ItemSearch/ItemSearchModal";
import medicineMock from "../../data/medicine.mock";
import usePurchaseItems from "../../hooks/usePurchaseItems";

const { Text } = Typography;

function ItemsTab({ lookups }) {

    const [searchOpen, setSearchOpen] = useState(false);

    const {

        items,

        addItem,

        removeItem,

        updateQty,

        summary,

    } = usePurchaseItems();

    //-----------------------------------------------------

    const columns = [

        {
            title: "Code",
            dataIndex: "itemCode",
            width: 120,
        },

        {
            title: "Medicine",
            dataIndex: "itemName",
            width: 260,
        },

        {
            title: "Batch",
            dataIndex: "batchNo",
            width: 120,
        },

        {
            title: "Available",
            dataIndex: "stock",
            width: 120,
            align: "right",
        },



        {
            title: "Qty",
            width: 110,
            align: "center",

            render: (_, record) => (

                <InputNumber

                    min={1}

                    max={record.stock}

                    value={record.qty}

                    style={{

                        width: "100%",

                    }}

                    onChange={(value) =>

                        updateQty(

                            record.id,

                            value

                        )

                    }

                />

            ),

        },

        {
            title: "UOM",
            dataIndex: "uom",
            width: 100,
        },

        {
            title: "",
            width: 70,

            render: (_, record) => (

                <AppButton

                    danger

                    type="text"

                    icon={<DeleteOutlined />}

                    onClick={() =>

                        removeItem(record.id)

                    }

                />

            ),

        },

    ];

    //-----------------------------------------------------

    return (

        <>

            <Card bordered={false}>

                <Row
                    justify="space-between"
                    align="middle"
                    gutter={16}
                    style={{ marginBottom: 16 }}
                >

                    <Col flex="auto">

                        <AppInput

                            variant="search"

                            placeholder="Search Selected Medicine..."

                        />

                    </Col>

                    <Col>

                        <AppButton

                            type="primary"

                            icon={<PlusOutlined />}

                            onClick={() =>

                                setSearchOpen(true)

                            }

                        >

                            Add Item

                        </AppButton>

                    </Col>

                </Row>

                <Table

                    rowKey="id"

                    columns={columns}

                    dataSource={items}

                    pagination={false}

                    scroll={{ x: 1200 }}

                />

                <Space

                    style={{

                        width: "100%",

                        justifyContent: "space-between",

                        marginTop: 20,

                    }}

                >

                    <Text strong>

                        Total Items : {summary.totalItems}

                    </Text>

                    <Text strong>
                        Total Qty : {summary.totalQty}
                    </Text>

                </Space>

            </Card>

            <ItemSearchModal

                open={searchOpen}

                dataSource={medicineMock}

                lookups={lookups}

                onClose={() =>

                    setSearchOpen(false)

                }

                onSelect={(medicine) => {

                    addItem(medicine);

                    setSearchOpen(false);

                }}

            />

        </>

    );

}

export default React.memo(ItemsTab);