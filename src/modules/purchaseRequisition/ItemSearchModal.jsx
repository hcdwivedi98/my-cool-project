import React, { useState } from "react";

import {
    Modal,
    Input,
    Table,
    Space,
    Button,
    Tag,
    Row,
    Col,
} from "antd";

import {
    SearchOutlined,
    PlusOutlined,
} from "@ant-design/icons";

function ItemSearchModal({
    open,
    onClose,
    onSelect,
}) {

    const [searchText, setSearchText] = useState("");

    const data = [

        {
            key: 1,
            itemCode: "MED001",
            itemName:
                "Paracetamol 500mg",

            generic:
                "Paracetamol",

            currentStock: 1200,

            minStock: 500,

            maxStock: 5000,

            suggestedQty: 1000,

            rate: 1.25,
        },

        {
            key: 2,
            itemCode: "MED002",
            itemName:
                "Amoxicillin 250mg",

            generic:
                "Amoxicillin",

            currentStock: 200,

            minStock: 300,

            maxStock: 2000,

            suggestedQty: 500,

            rate: 5.50,
        },
    ];

    const columns = [

        {
            title: "Code",
            dataIndex: "itemCode",
        },

        {
            title: "Item",
            dataIndex: "itemName",
        },

        {
            title: "Generic",
            dataIndex: "generic",
        },

        {
            title: "Stock",
            dataIndex: "currentStock",

            render: value => (

                <Tag
                    color={
                        value < 300
                            ? "red"
                            : "green"
                    }
                >
                    {value}
                </Tag>
            )
        },

        {
            title: "Min Stock",
            dataIndex: "minStock",
        },

        {
            title: "Suggested Qty",
            dataIndex: "suggestedQty",
        },

        {
            title: "Rate",

            dataIndex: "rate",

            render: value =>
                `₹ ${value}`,
        },

        {
            title: "Action",

            render: (_, record) => (

                <Button

                    type="primary"

                    size="small"

                    icon={<PlusOutlined />}

                    onClick={() =>
                        onSelect(record)
                    }

                >
                    Select
                </Button>
            )
        },
    ];

    return (

        <Modal

            title="Search Medicines"

            open={open}

            onCancel={onClose}

            footer={null}

            width={1200}
        >

            <Row
                gutter={16}
                style={{
                    marginBottom: 16,
                }}
            >

                <Col span={12}>

                    <Input

                        prefix={
                            <SearchOutlined />
                        }

                        placeholder="Search Item / Generic / Code"

                        value={searchText}

                        onChange={e =>
                            setSearchText(
                                e.target.value
                            )
                        }
                    />

                </Col>

            </Row>

            <Table

                rowKey="key"

                columns={columns}

                dataSource={data.filter(
                    x =>
                        x.itemName
                            .toLowerCase()
                            .includes(
                                searchText.toLowerCase()
                            ) ||

                        x.generic
                            .toLowerCase()
                            .includes(
                                searchText.toLowerCase()
                            ) ||

                        x.itemCode
                            .toLowerCase()
                            .includes(
                                searchText.toLowerCase()
                            )
                )}

                pagination={{
                    pageSize: 8,
                }}
            />

        </Modal>
    );
}

export default ItemSearchModal;