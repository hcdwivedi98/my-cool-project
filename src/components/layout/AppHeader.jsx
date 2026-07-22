import React from "react";

import {
    Layout,
    Input,
    Avatar,
    Badge,
    Button,
    Dropdown,
    Typography,
    Tag,
} from "antd";

import {

    SearchOutlined,
    ShopOutlined,
    BellOutlined,
    QuestionCircleOutlined,
    BulbOutlined,
    DownOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuOutlined,

} from "@ant-design/icons";

import "./AppHeader.css";

const { Header } = Layout;
const { Text } = Typography;

function AppHeader({ isMobile, onMenuClick }) {

    const menu = {

        items: [

            {
                key: "profile",
                icon: <UserOutlined />,
                label: "My Profile",
            },

            {
                key: "settings",
                icon: <SettingOutlined />,
                label: "Settings",
            },

            {
                type: "divider",
            },

            {
                key: "logout",
                danger: true,
                icon: <LogoutOutlined />,
                label: "Logout",
            },

        ],

    };

    return (

        <Header className="erp-header">

    <div className="erp-header-left">

        {isMobile && (
            <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={onMenuClick}
            />
        )}

        {!isMobile && (
            <Input
                className="erp-search"
                prefix={<SearchOutlined />}
                placeholder="Search patients, medicines..."
                allowClear
                suffix={<span className="erp-shortcut">Ctrl K</span>}
            />
        )}

        {!isMobile && (
            <Dropdown
                menu={{
                    items: [
                        { key: 1, label: "Main Pharmacy" },
                        { key: 2, label: "Emergency Store" },
                        { key: 3, label: "OT Pharmacy" },
                    ],
                }}
            >
                <Button className="erp-store">
                    <ShopOutlined />
                    Main Pharmacy
                    <DownOutlined />
                </Button>
            </Dropdown>
        )}

    </div>

    <div className="erp-header-right">

        {!isMobile && (
            <>
                <Button
                    type="text"
                    icon={<QuestionCircleOutlined />}
                />

                <Button
                    type="text"
                    icon={<BulbOutlined />}
                />
            </>
        )}

        <Badge count={5}>
            <Button
                type="text"
                icon={<BellOutlined />}
            />
        </Badge>

        <Dropdown menu={menu}>

            <div className="erp-user">

                <Avatar size={38}>
                    HK
                </Avatar>

                {!isMobile && (

                    <>
                        <div className="erp-user-info">

                            <Text strong>
                                Harish K
                            </Text>

                            <Text type="secondary">
                                Pharmacist · Morning
                            </Text>

                        </div>

                        <Tag color="green">
                            Online
                        </Tag>

                        <DownOutlined />

                    </>

                )}

            </div>

        </Dropdown>

    </div>

</Header>

    );

}

export default React.memo(AppHeader);