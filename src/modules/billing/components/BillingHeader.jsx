import React from "react";

import {
    Button,
    Space,
    Tag,
    Typography,
} from "antd";

import {
    ReloadOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";


const {
    Text,
    Title,
} = Typography;


const BillingHeader = ({
    store = {},
    user = {},
    onNewBill,
}) => {

    return (

        <div
            className="billing-header"
        >

            <div
                className="billing-header-left"
            >

                <ShoppingCartOutlined />

                <div>

                    <Title
                        level={4}
                        style={{
                            margin: 0,
                        }}
                    >
                        Pharmacy Billing
                    </Title>

                    <Text type="secondary">
                        Point of Sale
                    </Text>

                </div>

            </div>


            <div
                className="billing-header-right"
            >

                <Space>

                    <Tag>
                        {
                            store?.name ||
                            "Main Store"
                        }
                    </Tag>

                    <Tag>
                        {
                            user?.name ||
                            "Cashier"
                        }
                    </Tag>

                    <Button
                        icon={
                            <ReloadOutlined />
                        }
                        onClick={
                            onNewBill
                        }
                    >
                        New Bill
                    </Button>

                </Space>

            </div>

        </div>

    );

};


export default BillingHeader;