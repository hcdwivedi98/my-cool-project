// src/modules/purchase-management/grn/components/PricingSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Card,
    Col,
    Divider,
    Form,
    InputNumber,
    Row,
    Select,
    Space,
    Typography,
} from "antd";

import {
    CalculatorOutlined,
} from "@ant-design/icons";

import {
    PO_CURRENCY,
} from "../../purchase-order/constants/purchaseOrder.constants";


const {
    Text,
} = Typography;


/* =========================================================
   NUMBER HELPER
   ========================================================= */

const toNumber = (
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
   CURRENCY OPTIONS
   ========================================================= */

const CURRENCY_OPTIONS = [

    {
        value:
            PO_CURRENCY?.INR ||
            "INR",

        label:
            "INR - Indian Rupee",
    },

    {
        value:
            PO_CURRENCY?.USD ||
            "USD",

        label:
            "USD - US Dollar",
    },

    {
        value:
            PO_CURRENCY?.EUR ||
            "EUR",

        label:
            "EUR - Euro",
    },

];


/* =========================================================
   COMPONENT
   ========================================================= */

const PricingSection = ({
    mode = "CREATE",

    disabled = false,

}) => {

    const form =
        Form.useFormInstance();


    /* =====================================================
       WATCH ITEMS
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
       WATCH OTHER VALUES
    ===================================================== */

    const otherCharges =
        toNumber(
            Form.useWatch(
                "otherCharges",
                form
            )
        );


    const roundOff =
        toNumber(
            Form.useWatch(
                "roundOff",
                form
            )
        );


    const discountAmount =
        toNumber(
            Form.useWatch(
                "discountAmount",
                form
            )
        );


    const taxAmount =
        toNumber(
            Form.useWatch(
                "taxAmount",
                form
            )
        );


    const currency =
        Form.useWatch(
            "currency",
            form
        ) ||
        "INR";


    /* =====================================================
       CALCULATE PRICING
    ===================================================== */

    const pricing =
        useMemo(
            () => {

                let subtotal = 0;

                let calculatedDiscount = 0;

                let calculatedTax = 0;


                safeItems.forEach(
                    item => {

                        const received =
                            toNumber(
                                item?.receivedQuantity
                            );


                        const rate =
                            toNumber(
                                item?.unitRate
                            );


                        const gross =
                            received *
                            rate;


                        const itemDiscount =
                            toNumber(
                                item?.discountAmount
                            );


                        const itemTax =
                            toNumber(
                                item?.taxAmount
                            );


                        subtotal +=
                            gross;


                        calculatedDiscount +=
                            itemDiscount;


                        calculatedTax +=
                            itemTax;

                    }
                );


                const finalDiscount =
                    discountAmount ||
                    calculatedDiscount;


                const finalTax =
                    taxAmount ||
                    calculatedTax;


                const taxableAmount =
                    Math.max(
                        0,
                        subtotal -
                        finalDiscount
                    );


                const beforeRoundOff =
                    taxableAmount +
                    finalTax +
                    otherCharges;


                const grandTotal =
                    beforeRoundOff +
                    roundOff;


                return {

                    subtotal,

                    discountAmount:
                        finalDiscount,

                    taxableAmount,

                    taxAmount:
                        finalTax,

                    otherCharges,

                    roundOff,

                    grandTotal,

                };

            },
            [
                safeItems,
                otherCharges,
                roundOff,
                discountAmount,
                taxAmount,
            ]
        );


    /* =====================================================
       SYNC FORM VALUES
    ===================================================== */

    useEffect(
        () => {

            form.setFieldsValue({

                subtotal:
                    pricing.subtotal,

                discountAmount:
                    pricing.discountAmount,

                taxableAmount:
                    pricing.taxableAmount,

                taxAmount:
                    pricing.taxAmount,

                grandTotal:
                    pricing.grandTotal,

            });

        },
        [
            form,
            pricing,
        ]
    );


    /* =====================================================
       FORMAT
    ===================================================== */

    const formatAmount = (
        value
    ) => {

        return toNumber(
            value
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits:
                    2,

                maximumFractionDigits:
                    2,
            }
        );

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <Card

            className="grn-section-card"

            title={

                <Space>

                    <CalculatorOutlined />

                    <span>
                        Pricing & Amount
                    </span>

                </Space>

            }

            style={{
                marginBottom:
                    20,
            }}

        >

            <Row
                gutter={[
                    16,
                    0,
                ]}
            >

                {/* =================================================
                    CURRENCY
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="currency"
                        label="Currency"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select currency.",
                            },
                        ]}
                    >

                        <Select
                            options={
                                CURRENCY_OPTIONS
                            }
                            disabled={
                                disabled
                            }
                            placeholder="Select currency"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    SUBTOTAL
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="subtotal"
                        label="Subtotal"
                    >

                        <InputNumber

                            style={{
                                width:
                                    "100%",
                            }}

                            precision={2}

                            controls={false}

                            disabled

                            formatter={value =>
                                `₹ ${formatAmount(
                                    value
                                )}`
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    DISCOUNT
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="discountAmount"
                        label="Discount"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            disabled={
                                disabled
                            }

                            onChange={
                                value => {

                                    form.setFieldValue(
                                        "discountAmount",
                                        toNumber(
                                            value
                                        )
                                    );

                                }
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    TAX
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="taxAmount"
                        label="Tax"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    TAXABLE AMOUNT
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="taxableAmount"
                        label="Taxable Amount"
                    >

                        <InputNumber

                            precision={2}

                            controls={false}

                            style={{
                                width:
                                    "100%",
                            }}

                            disabled

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    OTHER CHARGES
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="otherCharges"
                        label="Other Charges"
                    >

                        <InputNumber

                            min={0}

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ROUND OFF
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <Form.Item
                        name="roundOff"
                        label="Round Off"
                    >

                        <InputNumber

                            precision={2}

                            style={{
                                width:
                                    "100%",
                            }}

                            disabled={
                                disabled
                            }

                        />

                    </Form.Item>

                </Col>

            </Row>


            <Divider />


            {/* =====================================================
                TOTAL SUMMARY
            ===================================================== */}

            <Row
                justify="end"
            >

                <Col
                    xs={24}
                    sm={14}
                    md={10}
                    lg={8}
                >

                    <div
                        className="grn-pricing-summary"
                    >

                        <div
                            className="grn-pricing-summary-row"
                        >

                            <Text>
                                Subtotal
                            </Text>

                            <Text>
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.subtotal
                                    )
                                }
                            </Text>

                        </div>


                        <div
                            className="grn-pricing-summary-row"
                        >

                            <Text>
                                Discount
                            </Text>

                            <Text>
                                -{" "}
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.discountAmount
                                    )
                                }
                            </Text>

                        </div>


                        <div
                            className="grn-pricing-summary-row"
                        >

                            <Text>
                                Tax
                            </Text>

                            <Text>
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.taxAmount
                                    )
                                }
                            </Text>

                        </div>


                        <div
                            className="grn-pricing-summary-row"
                        >

                            <Text>
                                Other Charges
                            </Text>

                            <Text>
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.otherCharges
                                    )
                                }
                            </Text>

                        </div>


                        <div
                            className="grn-pricing-summary-row"
                        >

                            <Text>
                                Round Off
                            </Text>

                            <Text>
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.roundOff
                                    )
                                }
                            </Text>

                        </div>


                        <Divider
                            style={{
                                margin:
                                    "10px 0",
                            }}
                        />


                        <div
                            className="grn-pricing-summary-total"
                        >

                            <Text
                                strong
                            >
                                Grand Total
                            </Text>

                            <Text
                                strong
                            >
                                {currency}
                                {" "}
                                {
                                    formatAmount(
                                        pricing.grandTotal
                                    )
                                }
                            </Text>

                        </div>

                    </div>

                </Col>

            </Row>


            {/* =====================================================
                HIDDEN CALCULATED FIELDS
            ===================================================== */}

            <Form.Item
                name="taxableAmount"
                hidden
            >
                <InputNumber />
            </Form.Item>


            <Form.Item
                name="grandTotal"
                hidden
            >
                <InputNumber />
            </Form.Item>

        </Card>

    );

};


export default PricingSection;