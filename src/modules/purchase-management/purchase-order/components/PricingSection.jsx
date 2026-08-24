// src/modules/purchase-management/purchase-order/components/PricingSection.jsx

import React, {
    useEffect,
    useMemo,
} from "react";

import {
    Col,
    Form,
    InputNumber,
    Row,
} from "antd";

import {
    calculatePurchaseOrderTotals,
    formatCurrency,
} from "../utils/purchaseOrder.helper";


/* =========================================================
   PRICING SECTION
   ========================================================= */

const PricingSection = ({
    mode = "CREATE",
    disabled = false,
}) => {

    const form =
        Form.useFormInstance();


    const isViewMode =
        mode === "VIEW" ||
        disabled;


    /* =====================================================
       WATCH VALUES
       ===================================================== */

    const items =
        Form.useWatch(
            "items",
            form
        ) || [];


    const otherCharges =
        Form.useWatch(
            "otherCharges",
            form
        );


    const roundOff =
        Form.useWatch(
            "roundOff",
            form
        );


    /* =====================================================
       SAFE VALUES
       ===================================================== */

    const safeItems =
        Array.isArray(
            items
        )
            ? items
            : [];


    const safeOtherCharges =
        Number(
            otherCharges
        ) || 0;


    const safeRoundOff =
        Number(
            roundOff
        ) || 0;


    /* =====================================================
       CALCULATE TOTALS
       ===================================================== */

    const totals =
        useMemo(
            () => {

                return calculatePurchaseOrderTotals(
                    safeItems,
                    safeOtherCharges,
                    safeRoundOff
                );

            },
            [
                safeItems,
                safeOtherCharges,
                safeRoundOff,
            ]
        );


    /* =====================================================
       SYNC TOTALS INTO FORM
       ===================================================== */

    useEffect(
        () => {

            const currentSubtotal =
                Number(
                    form.getFieldValue(
                        "subtotal"
                    )
                ) || 0;


            const currentDiscount =
                Number(
                    form.getFieldValue(
                        "discountAmount"
                    )
                ) || 0;


            const currentTax =
                Number(
                    form.getFieldValue(
                        "taxAmount"
                    )
                ) || 0;


            const currentGrandTotal =
                Number(
                    form.getFieldValue(
                        "grandTotal"
                    )
                ) || 0;


            const hasChanged =
                currentSubtotal !==
                    totals.subtotal ||

                currentDiscount !==
                    totals.discountAmount ||

                currentTax !==
                    totals.taxAmount ||

                currentGrandTotal !==
                    totals.grandTotal;


            if (
                hasChanged
            ) {

                form.setFieldsValue({

                    subtotal:
                        totals.subtotal,

                    discountAmount:
                        totals.discountAmount,

                    taxAmount:
                        totals.taxAmount,

                    grandTotal:
                        totals.grandTotal,

                    totalItems:
                        totals.totalItems,

                    totalQuantity:
                        totals.totalQuantity,

                    receivedQuantity:
                        totals.receivedQuantity,

                    outstandingQuantity:
                        totals.outstandingQuantity,

                });

            }

        },
        [
            totals,
            form,
        ]
    );


    /* =====================================================
       RENDER MONEY
       ===================================================== */

    const renderMoney = (
        value
    ) => {

        return formatCurrency(
            value,
            "INR"
        );

    };


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <section
            className="purchase-order-form-section purchase-order-pricing-section"
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
                    Pricing Summary
                </div>

                <div
                    className="purchase-order-section-description"
                >
                    Review the calculated order value, taxes,
                    discounts and final payable amount.
                </div>

            </div>


            {/* =================================================
                PRICING GRID
            ================================================= */}

            <Row
                gutter={[
                    16,
                    16,
                ]}
            >

                {/* =================================================
                    SUBTOTAL
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <div
                        className="purchase-order-pricing-card"
                    >

                        <div
                            className="purchase-order-pricing-label"
                        >
                            Subtotal
                        </div>

                        <div
                            className="purchase-order-pricing-value"
                        >
                            {
                                renderMoney(
                                    totals.subtotal
                                )
                            }
                        </div>

                    </div>

                </Col>


                {/* =================================================
                    DISCOUNT
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <div
                        className="purchase-order-pricing-card"
                    >

                        <div
                            className="purchase-order-pricing-label"
                        >
                            Discount
                        </div>

                        <div
                            className="purchase-order-pricing-value"
                        >
                            {
                                renderMoney(
                                    totals.discountAmount
                                )
                            }
                        </div>

                    </div>

                </Col>


                {/* =================================================
                    TAX
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <div
                        className="purchase-order-pricing-card"
                    >

                        <div
                            className="purchase-order-pricing-label"
                        >
                            Tax
                        </div>

                        <div
                            className="purchase-order-pricing-value"
                        >
                            {
                                renderMoney(
                                    totals.taxAmount
                                )
                            }
                        </div>

                    </div>

                </Col>


                {/* =================================================
                    GRAND TOTAL
                ================================================= */}

                <Col
                    xs={24}
                    sm={12}
                    lg={6}
                >

                    <div
                        className="purchase-order-pricing-card purchase-order-grand-total-card"
                    >

                        <div
                            className="purchase-order-pricing-label"
                        >
                            Grand Total
                        </div>

                        <div
                            className="purchase-order-grand-total-value"
                        >
                            {
                                renderMoney(
                                    totals.grandTotal
                                )
                            }
                        </div>

                    </div>

                </Col>

            </Row>


            {/* =================================================
                ADDITIONAL CHARGES
            ================================================= */}

            <Row
                gutter={[
                    16,
                    0,
                ]}

                style={{
                    marginTop:
                        20,
                }}
            >

                {/* =================================================
                    OTHER CHARGES
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="otherCharges"
                        label="Other Charges"
                    >

                        <InputNumber
                            min={
                                0
                            }

                            precision={
                                2
                            }

                            style={{
                                width:
                                    "100%",
                            }}

                            prefix="₹"

                            disabled={
                                isViewMode
                            }

                            placeholder="0.00"
                        />

                    </Form.Item>

                </Col>


                {/* =================================================
                    ROUND OFF
                ================================================= */}

                <Col
                    xs={24}
                    md={12}
                    lg={8}
                >

                    <Form.Item
                        name="roundOff"
                        label="Round Off"
                    >

                        <InputNumber
                            precision={
                                2
                            }

                            style={{
                                width:
                                    "100%",
                            }}

                            prefix="₹"

                            disabled={
                                isViewMode
                            }

                            placeholder="0.00"
                        />

                    </Form.Item>

                </Col>

            </Row>


            {/* =================================================
                FINAL TOTAL
            ================================================= */}

            <div
                className="purchase-order-final-total"
            >

                <div>

                    <div
                        className="purchase-order-final-total-label"
                    >
                        Net Payable Amount
                    </div>

                    <div
                        className="purchase-order-final-total-description"
                    >
                        Includes discount, applicable tax,
                        other charges and round-off.
                    </div>

                </div>


                <div
                    className="purchase-order-final-total-value"
                >
                    {
                        renderMoney(
                            totals.grandTotal
                        )
                    }
                </div>

            </div>


            {/* =================================================
                QUANTITY SUMMARY
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
                        className="purchase-order-quantity-summary"
                    >

                        <span>
                            Total Items
                        </span>

                        <strong>
                            {
                                totals.totalItems
                            }
                        </strong>

                    </div>

                </Col>


                <Col
                    xs={24}
                    sm={8}
                >

                    <div
                        className="purchase-order-quantity-summary"
                    >

                        <span>
                            Ordered Qty
                        </span>

                        <strong>
                            {
                                totals.totalQuantity
                            }
                        </strong>

                    </div>

                </Col>


                <Col
                    xs={24}
                    sm={8}
                >

                    <div
                        className="purchase-order-quantity-summary"
                    >

                        <span>
                            Outstanding Qty
                        </span>

                        <strong>
                            {
                                totals.outstandingQuantity
                            }
                        </strong>

                    </div>

                </Col>

            </Row>

        </section>

    );

};


export default PricingSection;