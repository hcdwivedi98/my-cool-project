import React from "react";

import {
    Card,
    Divider,
    Typography,
} from "antd";

import {
    formatCurrency,
} from "../utils/billing.helper";


const {
    Text,
    Title,
} = Typography;


const BillingSummary = ({
    itemCount = 0,

    subtotal = 0,

    discountAmount = 0,

    taxAmount = 0,

    roundOff = 0,

    grandTotal = 0,
}) => {

    return (

        <Card
            title="Bill Summary"
            className="billing-summary-card"
        >

            <div className="billing-summary-row">

                <Text>
                    Items
                </Text>

                <Text strong>
                    {
                        itemCount
                    }
                </Text>

            </div>


            <div className="billing-summary-row">

                <Text>
                    Subtotal
                </Text>

                <Text>
                    {
                        formatCurrency(
                            subtotal
                        )
                    }
                </Text>

            </div>


            <div className="billing-summary-row">

                <Text>
                    Discount
                </Text>

                <Text>
                    -{" "}
                    {
                        formatCurrency(
                            discountAmount
                        )
                    }
                </Text>

            </div>


            <div className="billing-summary-row">

                <Text>
                    Tax
                </Text>

                <Text>
                    {
                        formatCurrency(
                            taxAmount
                        )
                    }
                </Text>

            </div>


            <div className="billing-summary-row">

                <Text>
                    Round Off
                </Text>

                <Text>
                    {
                        formatCurrency(
                            roundOff
                        )
                    }
                </Text>

            </div>


            <Divider
                style={{
                    margin:
                        "12px 0",
                }}
            />


            <div
                className="billing-grand-total"
            >

                <Text strong>
                    GRAND TOTAL
                </Text>

                <Title
                    level={3}
                    style={{
                        margin: 0,
                    }}
                >
                    {
                        formatCurrency(
                            grandTotal
                        )
                    }
                </Title>

            </div>

        </Card>

    );

};


export default BillingSummary;