// src/modules/purchase-management/grn/components/ItemsSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

import {
    GRN_ITEM_STATUS,
    GRN_ITEM_STATUS_LABELS,
} from "../constants/grn.constants";

import {
    getGRNItemStatusColor,
} from "../utils/grn.helper";


const {
    Text,
} = Typography;


/* =========================================================
   HELPERS
   ========================================================= */

const numberValue = (
    value
) => {

    const number =
        Number(value);

    return Number.isFinite(
        number
    )
        ? number
        : 0;

};


const calculateLineValues = (
    item = {}
) => {

    const receivedQuantity =
        numberValue(
            item.receivedQuantity
        );

    const freeQuantity =
        numberValue(
            item.freeQuantity
        );

    const acceptedQuantity =
        numberValue(
            item.acceptedQuantity
        );

    const rejectedQuantity =
        numberValue(
            item.rejectedQuantity
        );

    const unitRate =
        numberValue(
            item.unitRate
        );

    const discountPercent =
        numberValue(
            item.discountPercent
        );

    const taxPercent =
        numberValue(
            item.taxPercent
        );


    const grossAmount =
        receivedQuantity *
        unitRate;


    const discountAmount =
        (
            grossAmount *
            discountPercent
        ) /
        100;


    const taxableAmount =
        Math.max(
            0,
            grossAmount -
            discountAmount
        );


    const taxAmount =
        (
            taxableAmount *
            taxPercent
        ) /
        100;


    const lineTotal =
        taxableAmount +
        taxAmount;


    return {

        receivedQuantity,

        freeQuantity,

        acceptedQuantity,

        rejectedQuantity,

        grossAmount,

        discountAmount,

        taxableAmount,

        taxAmount,

        lineTotal,

    };

};


/* =========================================================
   COMPONENT
   ========================================================= */

const ItemsSection = ({
    mode = "CREATE",

    disabled = false,

    purchaseOrderItems = [],

    onItemsChange,

}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       FORM ITEMS
    ===================================================== */

    const formItems =
        Form.useWatch(
            "items",
            form
        ) || [];


    const items =
        Array.isArray(
            formItems
        )
            ? formItems
            : [];


    /* =====================================================
       PO ITEMS
    ===================================================== */

    const availablePOItems =
        Array.isArray(
            purchaseOrderItems
        )
            ? purchaseOrderItems
            : [];


    /* =====================================================
       INITIALIZE ITEMS FROM PO
    ===================================================== */

    useEffect(
        () => {

            if (
                availablePOItems.length === 0
            ) {

                return;

            }


            if (
                items.length > 0
            ) {

                return;

            }


            const mappedItems =
                availablePOItems.map(
                    (
                        item,
                        index
                    ) => ({

                        id:
                            item.id ||
                            `GRN-ITEM-${index + 1}`,

                        purchaseOrderItemId:
                            item.purchaseOrderItemId ||
                            item.id ||
                            null,

                        drugId:
                            item.drugId ||
                            null,

                        itemCode:
                            item.itemCode ||
                            "",

                        itemName:
                            item.itemName ||
                            item.drugName ||
                            "",

                        drugName:
                            item.drugName ||
                            item.itemName ||
                            "",

                        uomId:
                            item.uomId ||
                            null,

                        uomCode:
                            item.uomCode ||
                            "",

                        orderedQuantity:
                            numberValue(
                                item.orderedQuantity
                            ),

                        previouslyReceivedQuantity:
                            numberValue(
                                item.previouslyReceivedQuantity
                            ),

                        pendingQuantity:
                            Math.max(
                                0,
                                numberValue(
                                    item.pendingQuantity ??
                                    item.orderedQuantity
                                ) -
                                numberValue(
                                    item.previouslyReceivedQuantity
                                )
                            ),

                        receivedQuantity:
                            0,

                        freeQuantity:
                            0,

                        acceptedQuantity:
                            0,

                        rejectedQuantity:
                            0,

                        unitRate:
                            numberValue(
                                item.unitRate
                            ),

                        discountPercent:
                            numberValue(
                                item.discountPercent
                            ),

                        discountAmount:
                            0,

                        taxableAmount:
                            0,

                        taxPercent:
                            numberValue(
                                item.taxPercent
                            ),

                        taxAmount:
                            0,

                        lineTotal:
                            0,

                        batchNumber:
                            "",

                        expiryDate:
                            null,

                        manufacturingDate:
                            null,

                        qualityStatus:
                            undefined,

                        remarks:
                            "",

                    })
                );


            form.setFieldValue(
                "items",
                mappedItems
            );


            if (
                typeof onItemsChange ===
                "function"
            ) {

                onItemsChange(
                    mappedItems
                );

            }

        },
        [
            availablePOItems,
            items.length,
            form,
            onItemsChange,
        ]
    );


    /* =====================================================
       ADD ITEM
    ===================================================== */

    const handleAddItem = () => {

        const currentItems =
            Array.isArray(
                form.getFieldValue(
                    "items"
                )
            )
                ? form.getFieldValue(
                    "items"
                )
                : [];


        const newItem = {

            id:
                `GRN-TEMP-${Date.now()}`,

            purchaseOrderItemId:
                null,

            drugId:
                null,

            itemCode:
                "",

            itemName:
                "",

            drugName:
                "",

            uomId:
                null,

            uomCode:
                "",

            orderedQuantity:
                0,

            previouslyReceivedQuantity:
                0,

            pendingQuantity:
                0,

            receivedQuantity:
                0,

            freeQuantity:
                0,

            acceptedQuantity:
                0,

            rejectedQuantity:
                0,

            unitRate:
                0,

            discountPercent:
                0,

            discountAmount:
                0,

            taxableAmount:
                0,

            taxPercent:
                0,

            taxAmount:
                0,

            lineTotal:
                0,

            batchNumber:
                "",

            expiryDate:
                null,

            manufacturingDate:
                null,

            qualityStatus:
                undefined,

            remarks:
                "",

        };


        const updatedItems = [

            ...currentItems,

            newItem,

        ];


        form.setFieldValue(
            "items",
            updatedItems
        );


        if (
            typeof onItemsChange ===
            "function"
        ) {

            onItemsChange(
                updatedItems
            );

        }

    };


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    const handleRemoveItem = (
        index
    ) => {

        const currentItems =
            Array.isArray(
                form.getFieldValue(
                    "items"
                )
            )
                ? [
                    ...form.getFieldValue(
                        "items"
                    ),
                ]
                : [];


        currentItems.splice(
            index,
            1
        );


        form.setFieldValue(
            "items",
            currentItems
        );


        if (
            typeof onItemsChange ===
            "function"
        ) {

            onItemsChange(
                currentItems
            );

        }

    };


    /* =====================================================
       UPDATE ITEM
    ===================================================== */

    const updateItem = (
        index,
        patch
    ) => {

        const currentItems =
            Array.isArray(
                form.getFieldValue(
                    "items"
                )
            )
                ? [
                    ...form.getFieldValue(
                        "items"
                    ),
                ]
                : [];


        const current =
            currentItems[
                index
            ] || {};


        const updated = {

            ...current,

            ...patch,

        };


        const calculated =
            calculateLineValues(
                updated
            );


        currentItems[
            index
        ] = {

            ...updated,

            discountAmount:
                calculated.discountAmount,

            taxableAmount:
                calculated.taxableAmount,

            taxAmount:
                calculated.taxAmount,

            lineTotal:
                calculated.lineTotal,

        };


        form.setFieldValue(
            "items",
            currentItems
        );


        if (
            typeof onItemsChange ===
            "function"
        ) {

            onItemsChange(
                currentItems
            );

        }

    };


    /* =====================================================
       TABLE COLUMNS
    ===================================================== */

    const columns =
        useMemo(
            () => [

                {
                    title:
                        "#",

                    key:
                        "index",

                    width:
                        50,

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


                {
                    title:
                        "Item",

                    key:
                        "item",

                    width:
                        220,

                    fixed:
                        "left",

                    render:
                        (
                            _,
                            record
                        ) => (

                            <div>

                                <Text
                                    strong
                                >
                                    {
                                        record?.itemName ||
                                        record?.drugName ||
                                        "-"
                                    }
                                </Text>

                                <br />

                                <Text
                                    type="secondary"
                                >
                                    {
                                        record?.itemCode ||
                                        "-"
                                    }
                                </Text>

                            </div>

                        ),

                },


                {
                    title:
                        "Ordered",

                    dataIndex:
                        "orderedQuantity",

                    key:
                        "orderedQuantity",

                    width:
                        95,

                    align:
                        "right",

                    render:
                        value =>
                            numberValue(
                                value
                            ),

                },


                {
                    title:
                        "Pending",

                    dataIndex:
                        "pendingQuantity",

                    key:
                        "pendingQuantity",

                    width:
                        95,

                    align:
                        "right",

                    render:
                        value => (

                            <Text
                                type={
                                    numberValue(
                                        value
                                    ) > 0
                                        ? undefined
                                        : "secondary"
                                }
                            >
                                {
                                    numberValue(
                                        value
                                    )
                                }
                            </Text>

                        ),

                },


                {
                    title:
                        "Received",

                    key:
                        "receivedQuantity",

                    width:
                        135,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <InputNumber

                                min={0}

                                max={
                                    numberValue(
                                        record?.pendingQuantity
                                    )
                                }

                                value={
                                    numberValue(
                                        record?.receivedQuantity
                                    )
                                }

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value => {

                                        const received =
                                            numberValue(
                                                value
                                            );

                                        const rejected =
                                            numberValue(
                                                record?.rejectedQuantity
                                            );

                                        const accepted =
                                            Math.max(
                                                0,
                                                received -
                                                rejected
                                            );


                                        updateItem(
                                            index,
                                            {
                                                receivedQuantity:
                                                    received,

                                                acceptedQuantity:
                                                    accepted,
                                            }
                                        );

                                    }
                                }

                            />

                        ),

                },


                {
                    title:
                        "Free",

                    key:
                        "freeQuantity",

                    width:
                        100,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <InputNumber

                                min={0}

                                value={
                                    numberValue(
                                        record?.freeQuantity
                                    )
                                }

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value =>
                                        updateItem(
                                            index,
                                            {
                                                freeQuantity:
                                                    numberValue(
                                                        value
                                                    ),
                                            }
                                        )
                                }

                            />

                        ),

                },


                {
                    title:
                        "Accepted",

                    key:
                        "acceptedQuantity",

                    width:
                        110,

                    render:
                        (
                            _,
                            record
                        ) => (

                            <Tag
                                color="green"
                            >
                                {
                                    numberValue(
                                        record?.acceptedQuantity
                                    )
                                }
                            </Tag>

                        ),

                },


                {
                    title:
                        "Rejected",

                    key:
                        "rejectedQuantity",

                    width:
                        120,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <InputNumber

                                min={0}

                                max={
                                    numberValue(
                                        record?.receivedQuantity
                                    )
                                }

                                value={
                                    numberValue(
                                        record?.rejectedQuantity
                                    )
                                }

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value => {

                                        const rejected =
                                            numberValue(
                                                value
                                            );

                                        const received =
                                            numberValue(
                                                record?.receivedQuantity
                                            );

                                        const accepted =
                                            Math.max(
                                                0,
                                                received -
                                                rejected
                                            );


                                        updateItem(
                                            index,
                                            {
                                                rejectedQuantity:
                                                    rejected,

                                                acceptedQuantity:
                                                    accepted,
                                            }
                                        );

                                    }
                                }

                            />

                        ),

                },


                {
                    title:
                        "Batch No.",

                    key:
                        "batchNumber",

                    width:
                        145,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <Input

                                value={
                                    record?.batchNumber ||
                                    ""
                                }

                                placeholder="Batch no."

                                disabled={
                                    disabled
                                }

                                onChange={
                                    event =>
                                        updateItem(
                                            index,
                                            {
                                                batchNumber:
                                                    event
                                                        .target
                                                        .value,
                                            }
                                        )
                                }

                            />

                        ),

                },


                {
                    title:
                        "Expiry",

                    key:
                        "expiryDate",

                    width:
                        140,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <DatePicker

                                value={
                                    record?.expiryDate ||
                                    null
                                }

                                format="MM/YYYY"

                                picker="month"

                                placeholder="Expiry"

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value =>
                                        updateItem(
                                            index,
                                            {
                                                expiryDate:
                                                    value,
                                            }
                                        )
                                }

                            />

                        ),

                },


                {
                    title:
                        "Rate",

                    key:
                        "unitRate",

                    width:
                        120,

                    align:
                        "right",

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <InputNumber

                                min={0}

                                precision={2}

                                value={
                                    numberValue(
                                        record?.unitRate
                                    )
                                }

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value =>
                                        updateItem(
                                            index,
                                            {
                                                unitRate:
                                                    numberValue(
                                                        value
                                                    ),
                                            }
                                        )
                                }

                            />

                        ),

                },


                {
                    title:
                        "Tax %",

                    key:
                        "taxPercent",

                    width:
                        100,

                    render:
                        (
                            _,
                            record,
                            index
                        ) => (

                            <InputNumber

                                min={0}

                                max={100}

                                precision={2}

                                value={
                                    numberValue(
                                        record?.taxPercent
                                    )
                                }

                                disabled={
                                    disabled
                                }

                                style={{
                                    width:
                                        "100%",
                                }}

                                onChange={
                                    value =>
                                        updateItem(
                                            index,
                                            {
                                                taxPercent:
                                                    numberValue(
                                                        value
                                                    ),
                                            }
                                        )
                                }

                            />

                        ),

                },


                {
                    title:
                        "Line Total",

                    key:
                        "lineTotal",

                    width:
                        135,

                    align:
                        "right",

                    render:
                        (
                            _,
                            record
                        ) => (

                            <Text
                                strong
                            >
                                ₹
                                {
                                    numberValue(
                                        record?.lineTotal
                                    ).toLocaleString(
                                        "en-IN",
                                        {
                                            minimumFractionDigits:
                                                2,
                                            maximumFractionDigits:
                                                2,
                                        }
                                    )
                                }
                            </Text>

                        ),

                },


                {
                    title:
                        "Action",

                    key:
                        "action",

                    width:
                        70,

                    fixed:
                        "right",

                    render:
                        (
                            _,
                            __,
                            index
                        ) => (

                            <Button

                                danger

                                type="text"

                                icon={
                                    <DeleteOutlined />
                                }

                                disabled={
                                    disabled
                                }

                                onClick={() =>
                                    handleRemoveItem(
                                        index
                                    )
                                }

                            />

                        ),

                },

            ],
            [
                disabled,
                items,
            ]
        );


    /* =====================================================
       SUMMARY
    ===================================================== */

    const summary =
        useMemo(
            () => {

                return items.reduce(
                    (
                        result,
                        item
                    ) => {

                        const calculated =
                            calculateLineValues(
                                item
                            );


                        result.totalItems +=
                            1;


                        result.receivedQuantity +=
                            calculated.receivedQuantity;


                        result.acceptedQuantity +=
                            calculated.acceptedQuantity;


                        result.rejectedQuantity +=
                            calculated.rejectedQuantity;


                        result.totalAmount +=
                            calculated.lineTotal;


                        return result;

                    },
                    {
                        totalItems:
                            0,

                        receivedQuantity:
                            0,

                        acceptedQuantity:
                            0,

                        rejectedQuantity:
                            0,

                        totalAmount:
                            0,
                    }
                );

            },
            [
                items,
            ]
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <ShoppingCartOutlined />

                    <span>
                        Received Items
                    </span>

                    <Tag>
                        {
                            summary.totalItems
                        } Items
                    </Tag>

                </Space>

            }

            extra={

                !disabled && (

                    <Button
                        type="primary"
                        icon={
                            <PlusOutlined />
                        }
                        onClick={
                            handleAddItem
                        }
                    >
                        Add Item
                    </Button>

                )

            }

            style={{
                marginBottom:
                    20,
            }}

        >

            <Table

                rowKey={record =>
                    record?.id ||
                    record?.purchaseOrderItemId
                }

                columns={
                    columns
                }

                dataSource={
                    items
                }

                pagination={
                    false
                }

                scroll={{
                    x:
                        1900,
                }}

                locale={{
                    emptyText:
                        "No items added to this GRN.",
                }}

            />


            <Divider />


            <Row
                gutter={[
                    16,
                    12,
                ]}
            >

                <Col
                    xs={12}
                    sm={6}
                    lg={4}
                >

                    <Card
                        size="small"
                    >

                        <Text
                            type="secondary"
                        >
                            Items
                        </Text>

                        <br />

                        <Text
                            strong
                        >
                            {
                                summary.totalItems
                            }
                        </Text>

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                    lg={5}
                >

                    <Card
                        size="small"
                    >

                        <Text
                            type="secondary"
                        >
                            Received Qty
                        </Text>

                        <br />

                        <Text
                            strong
                        >
                            {
                                summary.receivedQuantity
                            }
                        </Text>

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                    lg={5}
                >

                    <Card
                        size="small"
                    >

                        <Text
                            type="secondary"
                        >
                            Accepted Qty
                        </Text>

                        <br />

                        <Text
                            strong
                            type="success"
                        >
                            {
                                summary.acceptedQuantity
                            }
                        </Text>

                    </Card>

                </Col>


                <Col
                    xs={12}
                    sm={6}
                    lg={5}
                >

                    <Card
                        size="small"
                    >

                        <Text
                            type="secondary"
                        >
                            Rejected Qty
                        </Text>

                        <br />

                        <Text
                            strong
                            type={
                                summary.rejectedQuantity >
                                0
                                    ? "danger"
                                    : undefined
                            }
                        >
                            {
                                summary.rejectedQuantity
                            }
                        </Text>

                    </Card>

                </Col>


                <Col
                    xs={24}
                    sm={12}
                    lg={5}
                >

                    <Card
                        size="small"
                    >

                        <Text
                            type="secondary"
                        >
                            Items Value
                        </Text>

                        <br />

                        <Text
                            strong
                        >
                            ₹
                            {
                                summary.totalAmount.toLocaleString(
                                    "en-IN",
                                    {
                                        minimumFractionDigits:
                                            2,
                                        maximumFractionDigits:
                                            2,
                                    }
                                )
                            }
                        </Text>

                    </Card>

                </Col>

            </Row>

        </Card>

    );

};


export default ItemsSection;