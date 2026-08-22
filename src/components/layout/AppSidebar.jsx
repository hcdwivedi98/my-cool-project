import React from "react";

import {
    Menu,
    Avatar,
    Typography,
    Divider,
} from "antd";

import {
    DashboardOutlined,
    MedicineBoxOutlined,
    ShoppingCartOutlined,
    DatabaseOutlined,
    ApartmentOutlined,
    ShopOutlined,
    BankOutlined,
    ClusterOutlined,
    HomeOutlined,
} from "@ant-design/icons";

import { useLocation, useNavigate } from "react-router-dom";

import { currentUser } from "../../data/currentUser";
import { ROLES } from "../../core/constants/roles";

const { Title, Text } = Typography;

function AppSidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    let menuItems = [];

    if (currentUser.role === ROLES.ADMIN) {

        menuItems = [

            {
                key: "/dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
            },

            {
                key: "purchase",
                icon: <ShoppingCartOutlined />,
                label: "Purchase Management",

                children: [

                    {
                        key: "/purchase-requisition",
                        label: "Purchase Requisition",
                    },

                    {
                        key: "/purchase-order",
                        label: "Purchase Order",
                    },

                    {
                        key: "/grn",
                        label: "Goods Receipt Note",
                    },

                ],
            },

            {
                key: "inventory",
                icon: <MedicineBoxOutlined />,
                label: "Inventory",

                children: [

                    {
                        key: "/inventory",
                        label: "Current Stock",
                    },

                    {
                        key: "/stock-transfer",
                        label: "Stock Transfer",
                    },

                    {
                        key: "/expiry-management",
                        label: "Expiry Management",
                    },

                ],
            },

            {
                key: "supplier",
                icon: <ShopOutlined />,
                label: "Supplier",

                children: [

                    {
                        key: "/suppliers",
                        label: "Supplier Master",
                    },

                    {
                        key: "/supplier-item-mapping",
                        label: "Supplier Item Mapping",
                    },

                ],
            },

            {
                key: "masters",
                icon: <ApartmentOutlined />,
                label: "Masters",

                children: [

                    {
                        key: "organization",
                        icon: <ApartmentOutlined />,
                        label: "Organization",

                        children: [

                            {
                                key: "/companies",
                                icon: <BankOutlined />,
                                label: "Company Master",
                            },

                            {
                                key: "/centers",
                                icon: <ApartmentOutlined />,
                                label: "Center Master",
                            },

                            {
                                key: "/departments",
                                icon: <ClusterOutlined />,
                                label: "Department Master",
                            },

                            {
                                key: "/stores",
                                icon: <ShopOutlined />,
                                label: "Store Master",
                            },

                            {
                                key: "/sub-stores",
                                icon: <HomeOutlined />,
                                label: "Sub Store Master",
                            },
                            {
                                key: "/rack-master",
                                icon: <HomeOutlined />,
                                label: "Rack Master",
                            },
                            {
                                key: "/shelf-master",
                                icon: <HomeOutlined />,
                                label: "Shelf Master",
                            },
                            {
                                key: "/bins",
                                icon: <HomeOutlined />,
                                label: "Bin Master",
                            },

                        ],

                    },

                    {
                        key: "/manufacturers",
                        label: "Manufacturer Master",
                    },

                    {
                        key: "/users",
                        label: "Users",
                    },

                    {
                        key: "/roles",
                        label: "Roles",
                    },

                    {
                        key: "/permissions",
                        label: "Permissions",
                    },

                ],
            },
            {
                key: "pharmacy-master",
                icon: <ApartmentOutlined />,
                label: "pharmacy Master",
                children: [

                    {
                        key: "/DrugPage",
                        icon: <BankOutlined />,
                        label: "Drug Master",
                    },
                    {
                        key: "/suppliers",
                        icon: <BankOutlined />,
                        label: "Supplier Master",
                    },
                    {
                        key: "/manufacturers",
                        icon: <BankOutlined />,
                        label: "Manufacturer Master",
                    },
                    {
                        key: "/generic",
                        icon: <BankOutlined />,
                        label: "Generic Master",
                    },
                    {
                        key: "/uom",
                        icon: <BankOutlined />,
                        label: "UOM Master",
                    },
                    {
                        key: "/drug-category",
                        icon: <BankOutlined />,
                        label: "Drug Category Master",
                    },

                ],
            },


            {
                key: "/settings",
                icon: <DatabaseOutlined />,
                label: "Settings",
            },

        ];
    }

    if (currentUser.role === ROLES.PHARMACIST) {

        menuItems = [

            {
                key: "/dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
            },

            {
                key: "/pos",
                icon: <ShoppingCartOutlined />,
                label: "POS Billing",
            },

            {
                key: "/inventory",
                icon: <MedicineBoxOutlined />,
                label: "Inventory",
            },

        ];
    }

    return (

        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
            }}
        >

            <div
                style={{
                    padding: 20,
                }}
            >

                <Title
                    level={4}
                    style={{
                        color: "#1677ff",
                        margin: 0,
                    }}
                >
                    Pharmacy Core
                </Title>

                <Text type="secondary">
                    Enterprise ERP v2.4
                </Text>

            </div>

            <Divider style={{ margin: 0 }} />

            <div
                style={{
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >

                <Avatar
                    size={48}
                    style={{
                        background: "#1677ff",
                    }}
                >
                    H
                </Avatar>

                <div>

                    <Text strong>
                        Harish
                    </Text>

                    <br />

                    <Text
                        type="secondary"
                        style={{
                            fontSize: 12,
                        }}
                    >
                        {currentUser.role}
                    </Text>

                </div>

            </div>

            <Divider style={{ margin: 0 }} />

            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                }}
            >

                <Menu

                    mode="inline"

                    selectedKeys={[location.pathname]}

                    items={menuItems}

                    onClick={({ key }) => navigate(key)}

                    style={{
                        borderRight: 0,
                    }}

                />

            </div>

            <Divider style={{ margin: 0 }} />

            <div
                style={{
                    padding: 16,
                    textAlign: "center",
                    fontSize: 12,
                    color: "#999",
                }}
            >
                © 2026 Pharmacy ERP
            </div>

        </div>

    );
}

export default AppSidebar;