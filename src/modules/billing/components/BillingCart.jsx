import React, {
    useMemo,
} from "react";

import {
    Button,
    Empty,
    InputNumber,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

import {
    formatCurrency,
    toNumber,
} from "../utils/billing.helper";


const {
    Text,
} = Typography;


/* =========================================================
   COMPONENT
   ========================================================= */

const BillingCart = ({
    items = [],

    onQuantityChange,

    onDiscountChange,

    onRemoveItem,

}) => {


    /* =====================================================
       SAFE ITEMS
       ===================================================== */

    const safeItems =
        Array.isArray(
            items
        )
            ? items
            : [];


    /* =====================================================
       TABLE COLUMNS
       ===================================================== */

    const columns =
        useMemo(
            () => [

                /* =========================================
                   INDEX
                ========================================= */

                {
                    title:
                        "#",

                    key:
                        "index",

                    width:
                        45,

                    align:
                        "center",

                    render:
                        (
                            _,
                            __,
                            index
                        ) =>
                            index + 1,
                },


                /* =========================================
                   MEDICINE
                ========================================= */

                {
                    title:
                        "Medicine",

                    key:
                        "medicine",

                    width:
                        220,

                    render:
                        (
                            _,
                            record
                        ) => (

                            <div>

                                <Text strong>
                                    {
                                        record?.itemName ||
                                        record?.medicineName ||
                                        "-"
                                    }
                                </Text>

                                <br />

                                <Text type="secondary">
                                    {
                                        record?.itemCode ||
                                        record?.code ||
                                        "-"
                                    }
                                </Text>

                            </div>

                        ),
                },


                /* =========================================
                   BATCH
                ========================================= */

                {
                    title:
                        "Batch",

                    dataIndex:
                        "batchNumber",

                    key:
                        "batchNumber",

                    width:
                        120,

                    render:
                        value =>
                            value ||
                            "-",
                },


                /* =========================================
                   EXPIRY
                ========================================= */

                {
                    title:
                        "Expiry",

                    dataIndex:
                        "expiryDate",

                    key:
                        "expiryDate",

                    width:
                        100,

                    render:
                        value => {

                            if (
                                !value
                            ) {

                                return "-";

                            }


                            if (
                                typeof value ===
                                "string"
                            ) {

                                return value.slice(
                                    0,
                                    10
                                );

                            }


                            if (
                                value?.format
                            ) {

                                return value.format(
                                    "MM/YYYY"
                                );

                            }


                            return "-";

                        },
                },


                /* =========================================
                   AVAILABLE STOCK
                ========================================= */

                {
                    title:
                        "Stock",

                    key:
                        "availableQuantity",

                    width:
                        90,

                    align:
                        "right",

                    render:
                        (
                            _,
                            record
                        ) => {

                            const stock =
                                toNumber(
                                    record?.availableQuantity
                                );


                            return (

                                <Text
                                    type={
                                        stock <= 0
                                            ? "danger"
                                            : undefined
                                    }
                                >
                                    {
                                        stock
                                    }
                                </Text>

                            );

                        },
                },


                /* =========================================
                   QUANTITY
                ========================================= */

                {
                    title:
                        "Qty",

                    key:
                        "quantity",

                    width:
                        110,

                    render:
                        (
                            _,
                            record
                        ) => {

                            const stock =
                                toNumber(
                                    record?.availableQuantity
                                );


                            return (

                                <InputNumber

                                    min={0}

                                    max={
                                        stock > 0
                                            ? stock
                                            : undefined
                                    }

                                    precision={2}

                                    value={
                                        toNumber(
                                            record?.quantity
                                        )
                                    }

                                    style={{
                                        width:
                                            "100%",
                                    }}

                                    onChange={
                                        value => {

                                            if (
                                                typeof onQuantityChange !==
                                                "function"
                                            ) {

                                                return;

                                            }


                                            onQuantityChange(
                                                record.id,
                                                value
                                            );

                                        }
                                    }

                                />

                            );

                        },
                },


                /* =========================================
                   RATE
                ========================================= */

                {
                    title:
                        "Rate",

                    dataIndex:
                        "unitRate",

                    key:
                        "unitRate",

                    width:
                        100,

                    align:
                        "right",

                    render:
                        value =>
                            formatCurrency(
                                value
                            ),
                },


                /* =========================================
                   DISCOUNT
                ========================================= */

                {
                    title:
                        "Discount",

                    key:
                        "discount",

                    width:
                        125,

                    render:
                        (
                            _,
                            record
                        ) => (

                            <InputNumber

                                min={0}

                                max={100}

                                precision={2}

                                value={
                                    toNumber(
                                        record?.discountValue
                                    )
                                }

                                addonAfter="%"

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value => {

                                        if (
                                            typeof onDiscountChange !==
                                            "function"
                                        ) {

                                            return;

                                        }


                                        onDiscountChange(
                                            record.id,
                                            value
                                        );

                                    }
                                }

                            />

                        ),
                },


                /* =========================================
                   TAX
                ========================================= */

                {
                    title:
                        "Tax",

                    dataIndex:
                        "taxAmount",

                    key:
                        "taxAmount",

                    width:
                        100,

                    align:
                        "right",

                    render:
                        value =>
                            formatCurrency(
                                value
                            ),
                },


                /* =========================================
                   TOTAL
                ========================================= */

                {
                    title:
                        "Amount",

                    dataIndex:
                        "lineTotal",

                    key:
                        "lineTotal",

                    width:
                        120,

                    align:
                        "right",

                    render:
                        value => (

                            <Text strong>
                                {
                                    formatCurrency(
                                        value
                                    )
                                }
                            </Text>

                        ),
                },


                /* =========================================
                   ACTION
                ========================================= */

                {
                    title:
                        "Action",

                    key:
                        "action",

                    width:
                        60,

                    fixed:
                        "right",

                    align:
                        "center",

                    render:
                        (
                            _,
                            record
                        ) => (

                            <Button

                                type="text"

                                danger

                                icon={
                                    <DeleteOutlined />
                                }

                                onClick={() => {

                                    if (
                                        typeof onRemoveItem ===
                                        "function"
                                    ) {

                                        onRemoveItem(
                                            record.id
                                        );

                                    }

                                }}

                            />

                        ),
                },

            ],
            [
                onQuantityChange,
                onDiscountChange,
                onRemoveItem,
            ]
        );


    /* =====================================================
       TOTAL QUANTITY
       ===================================================== */

    const totalQuantity =
        useMemo(
            () =>
                safeItems.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        toNumber(
                            item?.quantity
                        ),
                    0
                ),
            [
                safeItems,
            ]
        );


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div
            className="billing-cart"
        >

            {/* =============================================
                CART HEADER
            ============================================= */}

            <div
                className="billing-cart-header"
            >

                <div>

                    <ShoppingCartOutlined />

                    <Text strong>
                        {" "}
                        Bill Items
                    </Text>

                    <Tag>
                        {
                            safeItems.length
                        }
                        {" "}
                        Items
                    </Tag>

                </div>


                <Text type="secondary">

                    Qty:
                    {" "}
                    {
                        totalQuantity
                    }

                </Text>

            </div>


            {/* =============================================
                TABLE
            ============================================= */}

            <Table

                rowKey={
                    record =>
                        record?.id
                }

                columns={
                    columns
                }

                dataSource={
                    safeItems
                }

                pagination={
                    false
                }

                size="small"

                scroll={{
                    x:
                        1150,
                }}

                locale={{
                    emptyText: (

                        <Empty

                            image={
                                Empty.PRESENTED_IMAGE_SIMPLE
                            }

                            description={
                                "Scan barcode or search medicine above."
                            }

                        />

                    ),
                }}

            />

        </div>

    );

};


export default BillingCart;