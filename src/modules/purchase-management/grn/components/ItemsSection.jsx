// src/modules/purchase-management/grn/components/ItemsSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Alert,
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



/* =========================================================
   GET ITEM VALIDATION ERROR
   ========================================================= */

const getItemValidationError = (
    errors,
    index,
    fieldName
) => {

    if (
        !Array.isArray(errors)
    ) {

        return "";

    }


    const itemErrors =
        errors.filter(
            error => {

                if (
                    !error ||
                    typeof error !==
                    "object"
                ) {

                    return false;

                }


                const field =
                    Array.isArray(
                        error?.field
                    )
                        ? error.field
                        : [];


                /* -----------------------------------------
                   ITEM INDEX MUST MATCH
                ----------------------------------------- */

                if (
                    field[0] !== "items" ||
                    Number(field[1]) !== index
                ) {

                    return false;

                }


                /* -----------------------------------------
                   EXACT FIELD MATCH
                ----------------------------------------- */

                if (
                    fieldName &&
                    field.length >= 3
                ) {

                    return (
                        field[2] ===
                        fieldName
                    );

                }


                /* -----------------------------------------
                   ITEM LEVEL ERROR
                   ["items", index]
                ----------------------------------------- */

                if (
                    fieldName &&
                    field.length === 2
                ) {

                    const message =
                        String(
                            error?.message ||
                            ""
                        ).toLowerCase();


                    const normalizedFieldName =
                        String(
                            fieldName
                        )
                            .replace(
                                /([A-Z])/g,
                                " $1"
                            )
                            .toLowerCase()
                            .trim();


                    return message.includes(
                        normalizedFieldName
                    );

                }


                return true;

            }
        );


    const firstError =
        itemErrors[0];


    if (
        typeof firstError ===
        "string"
    ) {

        return firstError;

    }


    return String(
        firstError?.message ||
        ""
    );

};

/* =========================================================
   GET ALL ITEM VALIDATION ERRORS
   ========================================================= */

const getAllItemValidationErrors = (
    errors,
    index,
    record
) => {

    if (
        !Array.isArray(errors)
    ) {

        return [];

    }


    const matchedErrors =
        errors.filter(
            error => {

                if (
                    !error ||
                    typeof error !==
                    "object"
                ) {

                    return false;

                }


                /* -----------------------------------------
                   INDEX MATCH
                ----------------------------------------- */

                if (
                    Number.isInteger(
                        error?.index
                    ) &&
                    error.index ===
                    index
                ) {

                    return true;

                }


                /* -----------------------------------------
                   ITEM ID MATCH
                ----------------------------------------- */

                if (
                    error?.itemId &&
                    record?.id &&
                    String(
                        error.itemId
                    ) ===
                    String(
                        record.id
                    )
                ) {

                    return true;

                }


                /* -----------------------------------------
                   FIELD PATH MATCH
                   ["items", index]
                ----------------------------------------- */

                const field =
                    Array.isArray(
                        error?.field
                    )
                        ? error.field
                        : [];


                return (
                    field[0] === "items" &&
                    Number(
                        field[1]
                    ) === index
                );

            }
        );


    /* ---------------------------------------------
       REMOVE DUPLICATE MESSAGES
    --------------------------------------------- */

    const uniqueErrors = [];

    const seenMessages =
        new Set();


    matchedErrors.forEach(
        error => {

            const message =
                String(
                    error?.message ||
                    ""
                ).trim();


            if (
                !message
            ) {

                return;

            }


            const normalizedMessage =
                message.toLowerCase();


            if (
                seenMessages.has(
                    normalizedMessage
                )
            ) {

                return;

            }


            seenMessages.add(
                normalizedMessage
            );


            uniqueErrors.push({

                ...error,

                message,

            });

        }
    );


    return uniqueErrors;

};

/* =========================================================
   LINE CALCULATION
   ========================================================= */

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

    validationErrors = [],

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
       NORMALIZE VALIDATION ERRORS
    ===================================================== */

    const normalizedValidationErrors =
        useMemo(
            () => {

                if (
                    !Array.isArray(
                        validationErrors
                    )
                ) {

                    return [];

                }


                return validationErrors
                    .map(
                        (
                            error
                        ) => {

                            if (
                                typeof error ===
                                "string"
                            ) {

                                return {

                                    index:
                                        -1,

                                    message:
                                        error,

                                };

                            }


                            return {

                                index:
                                    Number.isInteger(
                                        error?.index
                                    )
                                        ? error.index
                                        : -1,

                                message:
                                    error?.message ||
                                    "",

                                field:
                                    error?.field,

                                itemId:
                                    error?.itemId,

                            };

                        }
                    )
                    .filter(
                        error =>
                            Boolean(
                                error.message
                            )
                    );

            },
            [
                validationErrors,
            ]
        );


    /* =====================================================
       GET ITEM ERRORS
    ===================================================== */

    const getItemValidationErrors = (
        index,
        record
    ) => {

        return normalizedValidationErrors.filter(
            (
                error
            ) => {

                if (
                    error.index ===
                    index
                ) {

                    return true;

                }


                if (
                    error.itemId &&
                    record?.id &&
                    String(
                        error.itemId
                    ) ===
                    String(
                        record.id
                    )
                ) {

                    return true;

                }


                return false;

            }
        );

    };



    /* =====================================================
   FIELD-SPECIFIC ITEM ERROR
   ===================================================== */

    /* =====================================================
   FIELD-SPECIFIC ITEM ERROR
   ===================================================== */

    const hasItemFieldError = (
        index,
        fieldName
    ) => {

        return Boolean(
            getItemValidationError(
                validationErrors,
                index,
                fieldName
            )
        );

    };

    /* =====================================================
       INITIALIZE ITEMS FROM PO
    ===================================================== */

    useEffect(
        () => {

            if (
                availablePOItems.length ===
                0
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

                /* -----------------------------------------
                   INDEX
                ----------------------------------------- */

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
                        ) => {

                            const errors =
                                getItemValidationErrors(
                                    index,
                                    items[index]
                                );


                            return (

                                <Space
                                    direction="vertical"
                                    size={2}
                                >

                                    <Text>
                                        {
                                            index + 1
                                        }
                                    </Text>


                                    {
                                        errors.length >
                                        0 && (

                                            <Tag
                                                color="error"
                                            >
                                                Error
                                            </Tag>

                                        )
                                    }

                                </Space>

                            );

                        },

                },


                /* -----------------------------------------
                   ITEM
                ----------------------------------------- */

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
                            record,
                            index
                        ) => {

                            const itemErrors =
                                getAllItemValidationErrors(
                                    validationErrors,
                                    index,
                                    record
                                );


                            return (

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


                                    {/* =====================================
                        ITEM VALIDATION SUMMARY
                    ===================================== */}

                                    {
                                        itemErrors.length >
                                        0 && (

                                            <div
                                                style={{
                                                    marginTop:
                                                        6,

                                                    padding:
                                                        "6px 8px",

                                                    borderRadius:
                                                        4,

                                                    background:
                                                        "#fff2f0",

                                                    border:
                                                        "1px solid #ffccc7",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        fontSize:
                                                            12,

                                                        fontWeight:
                                                            600,

                                                        color:
                                                            "#cf1322",

                                                        marginBottom:
                                                            4,
                                                    }}
                                                >
                                                    Validation Errors
                                                </div>


                                                {
                                                    itemErrors.map(
                                                        (
                                                            error,
                                                            errorIndex
                                                        ) => (

                                                            <div

                                                                key={
                                                                    `item-validation-${index}-${errorIndex}`
                                                                }

                                                                style={{
                                                                    display:
                                                                        "flex",

                                                                    alignItems:
                                                                        "flex-start",

                                                                    gap:
                                                                        5,

                                                                    fontSize:
                                                                        12,

                                                                    lineHeight:
                                                                        "18px",

                                                                    color:
                                                                        "#cf1322",
                                                                }}

                                                            >

                                                                <span>
                                                                    •
                                                                </span>


                                                                <span>
                                                                    {
                                                                        error.message
                                                                    }
                                                                </span>

                                                            </div>

                                                        )
                                                    )
                                                }

                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },


                /* -----------------------------------------
                   ORDERED
                ----------------------------------------- */

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


                /* -----------------------------------------
                   PENDING
                ----------------------------------------- */

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


                /* -----------------------------------------
                   RECEIVED
                ----------------------------------------- */

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
                        ) => {

                            const receivedQuantityError =
                                getItemValidationError(
                                    validationErrors,
                                    index,
                                    "receivedQuantity"
                                );


                            /*
                             * validateGRNItems() currently creates
                             * item-level errors with:
                             *
                             * ["items", index]
                             *
                             * Therefore, if no exact field-level
                             * match exists, also check the row error.
                             */

                            const rowValidationError =
                                receivedQuantityError;


                            return (

                                <div
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                >

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

                                        status={
                                            rowValidationError
                                                ? "error"
                                                : undefined
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


                                    {
                                        rowValidationError && (

                                            <div
                                                style={{
                                                    color:
                                                        "#ff4d4f",

                                                    fontSize:
                                                        12,

                                                    lineHeight:
                                                        "18px",

                                                    marginTop:
                                                        4,
                                                }}
                                            >
                                                {
                                                    rowValidationError
                                                }
                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },


                /* -----------------------------------------
                   FREE
                ----------------------------------------- */

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


                /* -----------------------------------------
                   ACCEPTED
                ----------------------------------------- */

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
                        ) => {

                            const acceptedQuantityError =
                                getItemValidationError(
                                    validationErrors,
                                    index,
                                    "acceptedQuantity"
                                );


                            const rowValidationError =
                                acceptedQuantityError;

                            return (

                                <div
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                >

                                    <Tag
                                        color={
                                            rowValidationError
                                                ? "error"
                                                : "green"
                                        }
                                    >
                                        {
                                            numberValue(
                                                record?.acceptedQuantity
                                            )
                                        }
                                    </Tag>


                                    {
                                        acceptedQuantityError && (

                                            <div
                                                style={{
                                                    color:
                                                        "#ff4d4f",

                                                    fontSize:
                                                        12,

                                                    lineHeight:
                                                        "18px",

                                                    marginTop:
                                                        4,
                                                }}
                                            >
                                                {
                                                    acceptedQuantityError
                                                }
                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },


                /* -----------------------------------------
                   REJECTED
                ----------------------------------------- */

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
                        ) => {

                            const rejectedQuantityError =
                                getItemValidationError(
                                    validationErrors,
                                    index,
                                    "rejectedQuantity"
                                );


                            const rowValidationError =
                                rejectedQuantityError;


                            return (

                                <div
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                >

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

                                        status={
                                            rowValidationError
                                                ? "error"
                                                : undefined
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


                                    {
                                        rowValidationError && (

                                            <div
                                                style={{
                                                    color:
                                                        "#ff4d4f",

                                                    fontSize:
                                                        12,

                                                    lineHeight:
                                                        "18px",

                                                    marginTop:
                                                        4,
                                                }}
                                            >
                                                {
                                                    rowValidationError
                                                }
                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },




                /* -----------------------------------------
                   BATCH
                ----------------------------------------- */

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
                        ) => {

                            const batchNumberError =
                                getItemValidationError(
                                    validationErrors,
                                    index,
                                    "batchNumber"
                                );


                            return (

                                <div
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                >

                                    <Input

                                        value={
                                            record?.batchNumber ||
                                            ""
                                        }

                                        placeholder="Batch no."

                                        disabled={
                                            disabled
                                        }

                                        status={
                                            batchNumberError
                                                ? "error"
                                                : undefined
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


                                    {
                                        batchNumberError && (

                                            <div
                                                style={{
                                                    color:
                                                        "#ff4d4f",

                                                    fontSize:
                                                        12,

                                                    lineHeight:
                                                        "18px",

                                                    marginTop:
                                                        4,
                                                }}
                                            >
                                                {
                                                    batchNumberError
                                                }
                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },


                /* -----------------------------------------
                   EXPIRY
                ----------------------------------------- */

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
                        ) => {

                            const expiryDateError =
                                getItemValidationError(
                                    validationErrors,
                                    index,
                                    "expiryDate"
                                );


                            return (

                                <div
                                    style={{
                                        width:
                                            "100%",
                                    }}
                                >

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

                                        status={
                                            expiryDateError
                                                ? "error"
                                                : undefined
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


                                    {
                                        expiryDateError && (

                                            <div
                                                style={{
                                                    color:
                                                        "#ff4d4f",

                                                    fontSize:
                                                        12,

                                                    lineHeight:
                                                        "18px",

                                                    marginTop:
                                                        4,
                                                }}
                                            >
                                                {
                                                    expiryDateError
                                                }
                                            </div>

                                        )
                                    }

                                </div>

                            );

                        },

                },

                /* -----------------------------------------
                   RATE
                ----------------------------------------- */

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


                /* -----------------------------------------
                   TAX
                ----------------------------------------- */

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


                /* -----------------------------------------
                   LINE TOTAL
                ----------------------------------------- */

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


                /* -----------------------------------------
                   ACTION
                ----------------------------------------- */

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
                normalizedValidationErrors,
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

            {/* =================================================
                VALIDATION SUMMARY
            ================================================= */}

            {
                normalizedValidationErrors.length >
                0 && (

                    <Alert

                        type="error"

                        showIcon

                        message={
                            `Item validation errors (${normalizedValidationErrors.length})`
                        }

                        description={

                            <div>

                                {
                                    normalizedValidationErrors.map(
                                        (
                                            error,
                                            index
                                        ) => {

                                            const itemIndex =
                                                Number.isInteger(
                                                    error?.index
                                                ) &&
                                                    error.index >=
                                                    0
                                                    ? error.index
                                                    : null;


                                            return (

                                                <div
                                                    key={
                                                        `items-validation-${index}`
                                                    }

                                                    style={{
                                                        marginBottom:
                                                            5,
                                                    }}
                                                >

                                                    {
                                                        itemIndex !==
                                                        null && (

                                                            <strong>
                                                                {
                                                                    `Item ${itemIndex + 1}: `
                                                                }
                                                            </strong>

                                                        )
                                                    }


                                                    {
                                                        error.message
                                                    }

                                                </div>

                                            );

                                        }
                                    )
                                }

                            </div>

                        }

                        style={{
                            marginBottom:
                                16,
                        }}

                    />

                )
            }


            {/* =================================================
                ITEMS TABLE
            ================================================= */}

            <Table

                rowKey={
                    record =>
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

                rowClassName={(
                    record,
                    index
                ) => {

                    const errors =
                        getItemValidationErrors(
                            index,
                            record
                        );


                    return errors.length >
                        0
                        ? "grn-item-row-error"
                        : "";

                }}

                locale={{
                    emptyText:
                        "No items added to this GRN.",
                }}

            />


            <Divider />


            {/* =================================================
                SUMMARY
            ================================================= */}

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