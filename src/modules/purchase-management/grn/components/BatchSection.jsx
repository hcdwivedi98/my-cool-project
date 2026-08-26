// src/modules/purchase-management/grn/components/BatchSection.jsx

import React, {
    useMemo,
} from "react";

import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";

import {
    BarcodeOutlined,
    DeleteOutlined,
    MedicineBoxOutlined,
    PlusOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


/* =========================================================
   LOCAL OPTIONS
   ========================================================= */

const STORAGE_CONDITION_OPTIONS = [

    {
        value: "ROOM_TEMPERATURE",
        label: "Room Temperature",
    },

    {
        value: "REFRIGERATED",
        label: "Refrigerated",
    },

    {
        value: "COLD_CHAIN",
        label: "Cold Chain",
    },

    {
        value: "FROZEN",
        label: "Frozen",
    },

    {
        value: "CONTROLLED",
        label: "Controlled Storage",
    },

    {
        value: "OTHER",
        label: "Other",
    },

];


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


/* =========================================================
   COMPONENT
   ========================================================= */

const BatchSection = ({
    mode = "CREATE",

    disabled = false,

}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       WATCH BATCHES
    ===================================================== */

    const watchedBatches =
        Form.useWatch(
            "batches",
            form
        ) || [];


    const batches =
        Array.isArray(
            watchedBatches
        )
            ? watchedBatches
            : [];


    /* =====================================================
       ITEM OPTIONS
    ===================================================== */

    const itemOptions =
        useMemo(
            () => {

                const items =
                    form.getFieldValue(
                        "items"
                    ) || [];


                if (
                    !Array.isArray(
                        items
                    )
                ) {

                    return [];

                }


                return items.map(
                    (
                        item,
                        index
                    ) => ({

                        value:
                            item.id ||
                            item.purchaseOrderItemId ||
                            `ITEM-${index}`,

                        label:
                            item.itemName ||
                            item.drugName ||
                            item.itemCode ||
                            `Item ${index + 1}`,

                    })
                );

            },
            [
                form,
                batches,
            ]
        );


    /* =====================================================
       ADD BATCH
    ===================================================== */

    const handleAddBatch = () => {

        const current =
            form.getFieldValue(
                "batches"
            );


        const safeCurrent =
            Array.isArray(
                current
            )
                ? current
                : [];


        const newBatch = {

            id:
                `BATCH-${Date.now()}`,

            itemId:
                undefined,

            itemCode:
                "",

            itemName:
                "",

            batchNumber:
                "",

            manufacturingDate:
                null,

            expiryDate:
                null,

            quantity:
                0,

            acceptedQuantity:
                0,

            rejectedQuantity:
                0,

            barcode:
                "",

            storageCondition:
                undefined,

            rackLocation:
                "",

            remarks:
                "",

        };


        const updated = [

            ...safeCurrent,

            newBatch,

        ];


        form.setFieldValue(
            "batches",
            updated
        );

    };


    /* =====================================================
       DELETE BATCH
    ===================================================== */

    const handleDeleteBatch = (
        index
    ) => {

        const current =
            form.getFieldValue(
                "batches"
            );


        const safeCurrent =
            Array.isArray(
                current
            )
                ? [
                    ...current,
                ]
                : [];


        safeCurrent.splice(
            index,
            1
        );


        form.setFieldValue(
            "batches",
            safeCurrent
        );

    };


    /* =====================================================
       UPDATE BATCH
    ===================================================== */

    const updateBatch = (
        index,
        patch
    ) => {

        const current =
            form.getFieldValue(
                "batches"
            );


        const safeCurrent =
            Array.isArray(
                current
            )
                ? [
                    ...current,
                ]
                : [];


        safeCurrent[
            index
        ] = {

            ...(
                safeCurrent[
                    index
                ] || {}
            ),

            ...patch,

        };


        form.setFieldValue(
            "batches",
            safeCurrent
        );

    };


    /* =====================================================
       COLUMNS
    ===================================================== */

    const columns = [

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
                210,

            fixed:
                "left",

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <Select

                        showSearch

                        allowClear

                        value={
                            record?.itemId
                        }

                        placeholder="Select item"

                        options={
                            itemOptions
                        }

                        optionFilterProp="label"

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            (
                                value,
                                option
                            ) =>
                                updateBatch(
                                    index,
                                    {
                                        itemId:
                                            value,

                                        itemName:
                                            option?.label ||
                                            "",
                                    }
                                )
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
                155,

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

                        prefix={
                            <MedicineBoxOutlined />
                        }

                        placeholder="Batch no."

                        disabled={
                            disabled
                        }

                        onChange={
                            event =>
                                updateBatch(
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
                "Mfg. Date",

            key:
                "manufacturingDate",

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
                            record?.manufacturingDate ||
                            null
                        }

                        format="MM/YYYY"

                        picker="month"

                        placeholder="Mfg. date"

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
                                    index,
                                    {
                                        manufacturingDate:
                                            value,
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

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
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
                "Quantity",

            key:
                "quantity",

            width:
                110,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <InputNumber

                        min={0}

                        precision={0}

                        value={
                            numberValue(
                                record?.quantity
                            )
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
                                    index,
                                    {
                                        quantity:
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
                    record,
                    index
                ) => (

                    <InputNumber

                        min={0}

                        max={
                            numberValue(
                                record?.quantity
                            )
                        }

                        precision={0}

                        value={
                            numberValue(
                                record?.acceptedQuantity
                            )
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
                                    index,
                                    {
                                        acceptedQuantity:
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
                "Rejected",

            key:
                "rejectedQuantity",

            width:
                110,

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
                                record?.quantity
                            )
                        }

                        precision={0}

                        value={
                            numberValue(
                                record?.rejectedQuantity
                            )
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
                                    index,
                                    {
                                        rejectedQuantity:
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
                "Barcode",

            key:
                "barcode",

            width:
                160,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <Input

                        value={
                            record?.barcode ||
                            ""
                        }

                        prefix={
                            <BarcodeOutlined />
                        }

                        placeholder="Barcode"

                        disabled={
                            disabled
                        }

                        onChange={
                            event =>
                                updateBatch(
                                    index,
                                    {
                                        barcode:
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
                "Storage",

            key:
                "storageCondition",

            width:
                170,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <Select

                        allowClear

                        value={
                            record?.storageCondition
                        }

                        placeholder="Storage"

                        options={
                            STORAGE_CONDITION_OPTIONS
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        disabled={
                            disabled
                        }

                        onChange={
                            value =>
                                updateBatch(
                                    index,
                                    {
                                        storageCondition:
                                            value,
                                    }
                                )
                        }

                    />

                ),

        },


        {
            title:
                "Rack",

            key:
                "rackLocation",

            width:
                130,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <Input

                        value={
                            record?.rackLocation ||
                            ""
                        }

                        placeholder="Rack"

                        disabled={
                            disabled
                        }

                        onChange={
                            event =>
                                updateBatch(
                                    index,
                                    {
                                        rackLocation:
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
                "Action",

            key:
                "action",

            width:
                65,

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
                            handleDeleteBatch(
                                index
                            )
                        }

                    />

                ),

        },

    ];


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <MedicineBoxOutlined />

                    <span>
                        Batch & Inventory Details
                    </span>

                    <Tag>
                        {
                            batches.length
                        } Batches
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
                            handleAddBatch
                        }

                    >
                        Add Batch
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
                    record?.id
                }

                columns={
                    columns
                }

                dataSource={
                    batches
                }

                pagination={
                    false
                }

                scroll={{
                    x:
                        1550,
                }}

                locale={{
                    emptyText:
                        "No batch details added.",
                }}

            />


            <Form.Item
                name="batchRemarks"
                label="Batch Remarks"
                style={{
                    marginTop:
                        16,
                    marginBottom:
                        0,
                }}
            >

                <Input.TextArea

                    rows={3}

                    maxLength={1000}

                    showCount

                    placeholder="Enter batch / inventory remarks"

                    disabled={
                        disabled
                    }

                />

            </Form.Item>

        </Card>

    );

};


export default BatchSection;