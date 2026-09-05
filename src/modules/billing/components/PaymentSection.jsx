
// src/modules/billing/components/PaymentSection.jsx

import React, {
    useState,
} from "react";

import {
    Alert,
    Button,
    Card,
    Divider,
    Input,
    InputNumber,
    List,
    Select,
    Space,
    Tag,
    Typography,
} from "antd";

import {
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import {
    PAYMENT_METHOD,
} from "../constants/billing.constants";

import {
    formatCurrency,
} from "../utils/billing.helper";


const {
    Text,
} = Typography;


/* =========================================================
   PAYMENT LABELS
   ========================================================= */

const PAYMENT_METHOD_LABELS = {

    [PAYMENT_METHOD.CASH]:
        "Cash",

    [PAYMENT_METHOD.UPI]:
        "UPI",

    [PAYMENT_METHOD.CARD]:
        "Card",

    [PAYMENT_METHOD.CREDIT]:
        "Credit",

};


/* =========================================================
   COMPONENT
   ========================================================= */

const PaymentSection = ({

    activeMethod,

    payments = [],

    grandTotal = 0,

    paidAmount = 0,

    dueAmount = 0,

    changeAmount = 0,

    remainingAmount = 0,

    isFullyPaid = false,

    isOverpaid = false,

    onMethodChange,

    onAddPayment,

    onRemovePayment,

}) => {

    const [
        paymentAmount,
        setPaymentAmount,
    ] = useState("");


    const [
        paymentReference,
        setPaymentReference,
    ] = useState("");


    /* =====================================================
       ADD PAYMENT
    ===================================================== */

    const handleAddPayment = () => {

        const amount =
            Number(
                paymentAmount
            );


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return;

        }


        if (
            typeof onAddPayment ===
            "function"
        ) {

            const result =
                onAddPayment({

                    method:
                        activeMethod,

                    amount,

                    reference:
                        paymentReference,

                });


            if (
                result?.success !==
                false
            ) {

                setPaymentAmount("");

                setPaymentReference("");

            }

        }

    };


    /* =====================================================
       DEFAULT AMOUNT
    ===================================================== */

    const handleUseRemaining =
        () => {

            setPaymentAmount(
                remainingAmount
            );

        };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card
            title="Payment"
            className="billing-payment-card"
        >

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <Text strong>
                Payment Mode
            </Text>

            <Select

                value={
                    activeMethod
                }

                onChange={
                    onMethodChange
                }

                style={{
                    width:
                        "100%",

                    marginTop:
                        6,
                }}

                options={[

                    {
                        value:
                            PAYMENT_METHOD.CASH,

                        label:
                            "Cash",
                    },

                    {
                        value:
                            PAYMENT_METHOD.UPI,

                        label:
                            "UPI",
                    },

                    {
                        value:
                            PAYMENT_METHOD.CARD,

                        label:
                            "Card",
                    },

                    {
                        value:
                            PAYMENT_METHOD.CREDIT,

                        label:
                            "Credit",
                    },

                ]}

            />


            <Divider
                style={{
                    margin:
                        "14px 0",
                }}
            />


            {/* =================================================
                CREDIT
            ================================================= */}

            {
                activeMethod ===
                PAYMENT_METHOD.CREDIT && (

                    <Alert

                        type="warning"

                        showIcon

                        message="Credit billing"

                        description={
                            "Credit approval and credit-limit validation will be applied by the billing workflow."
                        }

                        style={{
                            marginBottom:
                                12,
                        }}

                    />

                )
            }


            {/* =================================================
                AMOUNT
            ================================================= */}

            <Text strong>
                Amount
            </Text>


            <InputNumber

                size="large"

                min={0}

                precision={2}

                value={
                    paymentAmount
                }

                style={{
                    width:
                        "100%",

                    marginTop:
                        6,
                }}

                placeholder={
                    "Enter payment amount"
                }

                onChange={
                    value =>
                        setPaymentAmount(
                            value
                        )
                }

            />


            {/* =================================================
                REMAINING
            ================================================= */}

            {
                remainingAmount > 0 && (

                    <Button

                        type="link"

                        size="small"

                        onClick={
                            handleUseRemaining
                        }

                        style={{
                            padding:
                                "4px 0",
                        }}

                    >
                        Use remaining{" "}
                        {
                            formatCurrency(
                                remainingAmount
                            )
                        }

                    </Button>

                )
            }


            {/* =================================================
                REFERENCE
            ================================================= */}

            {
                (
                    activeMethod ===
                    PAYMENT_METHOD.UPI ||
                    activeMethod ===
                    PAYMENT_METHOD.CARD
                ) && (

                    <Input

                        value={
                            paymentReference
                        }

                        onChange={
                            event =>
                                setPaymentReference(
                                    event.target.value
                                )
                        }

                        placeholder={
                            activeMethod ===
                            PAYMENT_METHOD.UPI
                                ? "UPI transaction reference"
                                : "Card transaction reference"
                        }

                        style={{
                            marginTop:
                                8,
                        }}

                    />

                )
            }


            {/* =================================================
                ADD BUTTON
            ================================================= */}

            <Button

                type="primary"

                icon={
                    <PlusOutlined />
                }

                block

                onClick={
                    handleAddPayment
                }

                disabled={
                    !paymentAmount ||
                    Number(
                        paymentAmount
                    ) <= 0
                }

                style={{
                    marginTop:
                        10,
                }}

            >
                Add Payment
            </Button>


            {/* =================================================
                PAYMENT LIST
            ================================================= */}

            {
                payments.length > 0 && (

                    <>

                        <Divider
                            style={{
                                margin:
                                    "16px 0 10px",
                            }}
                        />

                        <Text strong>
                            Payments
                        </Text>


                        <List

                            size="small"

                            dataSource={
                                payments
                            }

                            locale={{
                                emptyText:
                                    "No payments",
                            }}

                            renderItem={
                                payment => (

                                    <List.Item

                                        actions={[

                                            <Button

                                                key={
                                                    `remove-${payment.id}`
                                                }

                                                type="text"

                                                danger

                                                icon={
                                                    <DeleteOutlined />
                                                }

                                                onClick={() =>
                                                    onRemovePayment?.(
                                                        payment.id
                                                    )
                                                }

                                            />,

                                        ]}

                                    >

                                        <List.Item.Meta

                                            title={

                                                <Space>

                                                    <Text strong>
                                                        {
                                                            PAYMENT_METHOD_LABELS[
                                                                payment.method
                                                            ] ||
                                                            payment.method
                                                        }
                                                    </Text>

                                                    {
                                                        payment.method ===
                                                        PAYMENT_METHOD.UPI &&
                                                        payment.reference && (

                                                            <Tag>
                                                                {
                                                                    payment.reference
                                                                }
                                                            </Tag>

                                                        )
                                                    }

                                                </Space>

                                            }

                                            description={
                                                payment.remarks ||
                                                ""
                                            }

                                        />


                                        <Text strong>

                                            {
                                                formatCurrency(
                                                    payment.amount
                                                )
                                            }

                                        </Text>

                                    </List.Item>

                                )
                            }

                        />

                    </>

                )
            }


            {/* =================================================
                SUMMARY
            ================================================= */}

            <Divider
                style={{
                    margin:
                        "16px 0",
                }}
            />


            <div
                className="billing-summary-row"
            >

                <Text>
                    Bill Total
                </Text>

                <Text strong>
                    {
                        formatCurrency(
                            grandTotal
                        )
                    }
                </Text>

            </div>


            <div
                className="billing-summary-row"
            >

                <Text>
                    Paid
                </Text>

                <Text strong>
                    {
                        formatCurrency(
                            paidAmount
                        )
                    }
                </Text>

            </div>


            <div
                className="billing-summary-row"
            >

                <Text>
                    Due
                </Text>

                <Text

                    strong

                    type={
                        dueAmount > 0
                            ? "danger"
                            : "success"
                    }

                >
                    {
                        formatCurrency(
                            dueAmount
                        )
                    }
                </Text>

            </div>


            <div
                className="billing-summary-row"
            >

                <Text>
                    Change
                </Text>

                <Text
                    strong
                    type="success"
                >
                    {
                        formatCurrency(
                            changeAmount
                        )
                    }
                </Text>

            </div>


            {/* =================================================
                STATUS
            ================================================= */}

            {
                isFullyPaid && !isOverpaid && (

                    <Alert

                        type="success"

                        showIcon

                        message="Fully Paid"

                        style={{
                            marginTop:
                                12,
                        }}

                    />

                )
            }


            {
                dueAmount > 0 && (

                    <Alert

                        type="warning"

                        showIcon

                        message={
                            `Remaining ${formatCurrency(
                                dueAmount
                            )}`
                        }

                        style={{
                            marginTop:
                                12,
                        }}

                    />

                )
            }


            {
                isOverpaid && (

                    <Alert

                        type="info"

                        showIcon

                        message={
                            `Change ${formatCurrency(
                                changeAmount
                            )}`
                        }

                        style={{
                            marginTop:
                                12,
                        }}

                    />

                )
            }

        </Card>

    );

};


export default PaymentSection;

