// src/modules/purchase-management/purchase-order/components/ItemsSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Button,
    Col,
    Form,
    InputNumber,
    Row,
    Select,
    Space,
    Table,
    Tooltip,
} from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import usePurchaseOrderLookup
    from "../hooks/usePurchaseOrderLookup";

import {
    calculatePurchaseOrderItem,
} from "../utils/purchaseOrder.helper";


/* =========================================================
   ITEMS SECTION
   ========================================================= */

const ItemsSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       LOOKUP
       ===================================================== */

    const {
        drugOptions = [],
        getDrugById,
    } =
        usePurchaseOrderLookup() || {};


    const safeDrugOptions =
        Array.isArray(
            drugOptions
        )
            ? drugOptions
            : [];


    /* =====================================================
       FORM ITEMS WATCH
       ===================================================== */

    const items =
        Form.useWatch(
            "items",
            form
        ) || [];


    const safeItems =
        Array.isArray(
            items
        )
            ? items
            : [];


    /* =====================================================
       NORMALIZE ITEM
       ===================================================== */

    const normalizeItem = (
        item = {}
    ) => {

        const quantity =
            Number(
                item.orderedQuantity
            ) || 0;


        const rate =
            Number(
                item.unitRate
            ) || 0;


        const discountPercent =
            Number(
                item.discountPercent
            ) || 0;


        const taxPercent =
            Number(
                item.taxPercent
            ) || 0;


        const receivedQuantity =
            Number(
                item.receivedQuantity
            ) || 0;


        const calculated =
            calculatePurchaseOrderItem({

                ...item,

                orderedQuantity:
                    quantity,

                unitRate:
                    rate,

                discountPercent,

                taxPercent,

                receivedQuantity,

            });


        return {

            ...item,

            ...calculated,

        };

    };


    /* =====================================================
       CURRENT CALCULATED ITEMS
       ===================================================== */

    const calculatedItems =
        useMemo(
            () => {

                return safeItems.map(
                    (
                        item
                    ) =>
                        normalizeItem(
                            item
                        )
                );

            },
            [
                safeItems,
            ]
        );


    /* =====================================================
       SYNC CALCULATED ITEMS
       ===================================================== */

    useEffect(
        () => {

            if (
                isViewMode
            ) {

                return;

            }


            const currentItems =
                form.getFieldValue(
                    "items"
                ) || [];


            if (
                !Array.isArray(
                    currentItems
                )
            ) {

                return;

            }


            const normalizedItems =
                currentItems.map(
                    (
                        item
                    ) =>
                        normalizeItem(
                            item
                        )
                );


            const currentSerialized =
                JSON.stringify(
                    currentItems
                );


            const nextSerialized =
                JSON.stringify(
                    normalizedItems
                );


            if (
                currentSerialized !==
                nextSerialized
            ) {

                form.setFieldValue(
                    "items",
                    normalizedItems
                );

            }

        },
        [
            safeItems,
            form,
            isViewMode,
        ]
    );


    /* =====================================================
       ADD ITEM
       ===================================================== */

    const handleAddItem = () => {

        if (
            isViewMode
        ) {

            return;

        }


        const currentItems =
            form.getFieldValue(
                "items"
            ) || [];


        const nextItem = {

            id:
                `TEMP-${Date.now()}`,

            drugId:
                null,

            itemCode:
                "",

            itemName:
                "",

            uomId:
                null,

            uomCode:
                "",

            uomName:
                "",

            orderedQuantity:
                1,

            freeQuantity:
                0,

            receivedQuantity:
                0,

            outstandingQuantity:
                1,

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

            expectedDeliveryDate:
                null,

            remarks:
                "",

        };


        form.setFieldValue(
            "items",
            [
                ...(
                    Array.isArray(
                        currentItems
                    )
                        ? currentItems
                        : []
                ),
                nextItem,
            ]
        );

    };


    /* =====================================================
       REMOVE ITEM
       ===================================================== */

    const handleRemoveItem = (
        index
    ) => {

        if (
            isViewMode
        ) {

            return;

        }


        const currentItems =
            form.getFieldValue(
                "items"
            ) || [];


        const nextItems =
            Array.isArray(
                currentItems
            )
                ? currentItems.filter(
                    (
                        _,
                        itemIndex
                    ) =>
                        itemIndex !==
                        index
                )
                : [];


        form.setFieldValue(
            "items",
            nextItems
        );

    };


    /* =====================================================
       UPDATE ITEM
       ===================================================== */

    const updateItem = (
        index,
        changes
    ) => {

        if (
            isViewMode
        ) {

            return;

        }


        const currentItems =
            form.getFieldValue(
                "items"
            ) || [];


        if (
            !Array.isArray(
                currentItems
            )
        ) {

            return;

        }


        const nextItems =
            currentItems.map(
                (
                    item,
                    itemIndex
                ) => {

                    if (
                        itemIndex !==
                        index
                    ) {

                        return item;

                    }


                    return normalizeItem({

                        ...item,

                        ...changes,

                    });

                }
            );


        form.setFieldValue(
            "items",
            nextItems
        );

    };


    /* =====================================================
       DRUG CHANGE
       ===================================================== */

    const handleDrugChange = (
        index,
        drugId
    ) => {

        const drug =
            typeof getDrugById ===
            "function"

                ? getDrugById(
                    drugId
                )

                : null;


        if (
            !drug
        ) {

            updateItem(
                index,
                {
                    drugId,
                }
            );

            return;

        }


        updateItem(
            index,
            {

                drugId:

                    drug.id,

                itemCode:

                    drug.drugCode,

                itemName:

                    drug.drugName,

                uomId:

                    drug.uomId,

                uomCode:

                    drug.uomCode,

                uomName:

                    drug.uomName,

                unitRate:

                    Number(
                        drug.defaultRate
                    ) || 0,

                taxPercent:

                    Number(
                        drug.taxPercent
                    ) || 0,

            }
        );

    };


    /* =====================================================
       COLUMNS
       ===================================================== */

    const columns = [

        /* =================================================
           ITEM
        ================================================= */

        {
            title:
                "Drug / Item",

            key:
                "drugId",

            width:
                280,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <Select
                        value={
                            record.drugId ||
                            undefined
                        }

                        placeholder="Select drug"

                        options={
                            safeDrugOptions
                        }

                        disabled={
                            isViewMode
                        }

                        showSearch

                        optionFilterProp="label"

                        style={{
                            width:
                                "100%",
                        }}

                        onChange={
                            (
                                value
                            ) =>
                                handleDrugChange(
                                    index,
                                    value
                                )
                        }

                        allowClear
                    />

                ),
        },


        /* =================================================
           UOM
        ================================================= */

        {
            title:
                "UOM",

            key:
                "uom",

            width:
                100,

            render:
                (
                    _,
                    record
                ) => (

                    <span>
                        {
                            record.uomCode ||
                            record.uomName ||
                            "-"
                        }
                    </span>

                ),
        },


        /* =================================================
           QUANTITY
        ================================================= */

        {
            title:
                "Quantity",

            key:
                "orderedQuantity",

            width:
                130,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <InputNumber
                        min={
                            0.0001
                        }

                        precision={
                            2
                        }

                        value={
                            record.orderedQuantity
                        }

                        disabled={
                            isViewMode
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        onChange={
                            (
                                value
                            ) =>
                                updateItem(
                                    index,
                                    {
                                        orderedQuantity:
                                            value,
                                    }
                                )
                        }
                    />

                ),
        },


        /* =================================================
           FREE
        ================================================= */

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
                        min={
                            0
                        }

                        precision={
                            2
                        }

                        value={
                            record.freeQuantity
                        }

                        disabled={
                            isViewMode
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        onChange={
                            (
                                value
                            ) =>
                                updateItem(
                                    index,
                                    {
                                        freeQuantity:
                                            value || 0,
                                    }
                                )
                        }
                    />

                ),
        },


        /* =================================================
           RATE
        ================================================= */

        {
            title:
                "Rate",

            key:
                "unitRate",

            width:
                130,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <InputNumber
                        min={
                            0
                        }

                        precision={
                            2
                        }

                        value={
                            record.unitRate
                        }

                        disabled={
                            isViewMode
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        onChange={
                            (
                                value
                            ) =>
                                updateItem(
                                    index,
                                    {
                                        unitRate:
                                            value || 0,
                                    }
                                )
                        }
                    />

                ),
        },


        /* =================================================
           DISCOUNT
        ================================================= */

        {
            title:
                "Disc. %",

            key:
                "discountPercent",

            width:
                110,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <InputNumber
                        min={
                            0
                        }

                        max={
                            100
                        }

                        precision={
                            2
                        }

                        value={
                            record.discountPercent
                        }

                        disabled={
                            isViewMode
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        addonAfter="%"

                        onChange={
                            (
                                value
                            ) =>
                                updateItem(
                                    index,
                                    {
                                        discountPercent:
                                            value || 0,
                                    }
                                )
                        }
                    />

                ),
        },


        /* =================================================
           TAX
        ================================================= */

        {
            title:
                "Tax %",

            key:
                "taxPercent",

            width:
                110,

            render:
                (
                    _,
                    record,
                    index
                ) => (

                    <InputNumber
                        min={
                            0
                        }

                        max={
                            100
                        }

                        precision={
                            2
                        }

                        value={
                            record.taxPercent
                        }

                        disabled={
                            isViewMode
                        }

                        style={{
                            width:
                                "100%",
                        }}

                        addonAfter="%"

                        onChange={
                            (
                                value
                            ) =>
                                updateItem(
                                    index,
                                    {
                                        taxPercent:
                                            value || 0,
                                    }
                                )
                        }
                    />

                ),
        },


        /* =================================================
           TOTAL
        ================================================= */

        {
            title:
                "Line Total",

            key:
                "lineTotal",

            width:
                140,

            align:
                "right",

            render:
                (
                    _,
                    record
                ) => (

                    <Tooltip
                        title={
                            `Tax: ${record.taxAmount || 0}`
                        }
                    >
                        <strong>
                            ₹
                            {
                                Number(
                                    record.lineTotal
                                || 0
                                ).toFixed(
                                    2
                                )
                            }
                        </strong>
                    </Tooltip>

                ),
        },


        /* =================================================
           ACTION
        ================================================= */

        {
            title:
                "",

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
                    _record,
                    index
                ) => (

                    <Tooltip
                        title="Remove item"
                    >

                        <Button
                            type="text"

                            danger

                            icon={
                                <DeleteOutlined />
                            }

                            disabled={
                                isViewMode
                            }

                            onClick={() =>
                                handleRemoveItem(
                                    index
                                )
                            }
                        />

                    </Tooltip>

                ),
        },

    ];


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-items-section"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                className="purchase-order-section-header"
            >

                <div
                    className="purchase-order-section-title"
                >
                    Order Items
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Add medicines or pharmacy items to this
                    purchase order and define quantity, rate,
                    discount and tax.
                </div>

            </div>


            {/* =================================================
                ITEM TABLE
            ================================================= */}

            <div
                style={{
                    width:
                        "100%",

                    overflow:
                        "hidden",
                }}
            >

                <Table
                    rowKey={(
                        record,
                        index
                    ) =>
                        record.id ||
                        `PO-ITEM-${index}`
                    }

                    columns={
                        columns
                    }

                    dataSource={
                        calculatedItems
                    }

                    pagination={
                        false
                    }

                    size="small"

                    bordered

                    scroll={{
                        x:
                            1250,
                    }}

                    locale={{
                        emptyText:
                            "No items added to purchase order.",
                    }}
                />

            </div>


            {/* =================================================
                ADD ITEM
            ================================================= */}

            {
                !isViewMode && (

                    <div
                        style={{
                            marginTop:
                                16,
                        }}
                    >

                        <Button
                            type="dashed"

                            icon={
                                <PlusOutlined />
                            }

                            onClick={
                                handleAddItem
                            }

                            block
                        >
                            Add Item
                        </Button>

                    </div>

                )
            }


            {/* =================================================
                ITEM SUMMARY
            ================================================= */}

            <Row
                gutter={[
                    16,
                    12,
                ]}

                style={{
                    marginTop:
                        16,
                }}
            >

                <Col
                    xs={24}
                    sm={8}
                >

                    <div
                        className="purchase-order-item-summary-card"
                    >

                        <div>
                            Total Items
                        </div>

                        <strong>
                            {
                                calculatedItems.length
                            }
                        </strong>

                    </div>

                </Col>


                <Col
                    xs={24}
                    sm={8}
                >

                    <div
                        className="purchase-order-item-summary-card"
                    >

                        <div>
                            Ordered Quantity
                        </div>

                        <strong>
                            {
                                calculatedItems.reduce(
                                    (
                                        total,
                                        item
                                    ) =>
                                        total +
                                        (
                                            Number(
                                                item.orderedQuantity
                                            ) ||
                                            0
                                        ),
                                    0
                                )
                            }
                        </strong>

                    </div>

                </Col>


                <Col
                    xs={24}
                    sm={8}
                >

                    <div
                        className="purchase-order-item-summary-card"
                    >

                        <div>
                            Outstanding Quantity
                        </div>

                        <strong>
                            {
                                calculatedItems.reduce(
                                    (
                                        total,
                                        item
                                    ) =>
                                        total +
                                        (
                                            Number(
                                                item.outstandingQuantity
                                            ) ||
                                            0
                                        ),
                                    0
                                )
                            }
                        </strong>

                    </div>

                </Col>

            </Row>

        </section>

    );

};


export default ItemsSection;