import React, { useState } from "react";
import { Layout, Drawer, Grid } from "antd";
import { Outlet } from "react-router-dom";

import AppSidebar from "../../../components/layout/AppSidebar";
import AppHeader from "../../../components/layout/AppHeader";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

function MainLayout() {
    const screens = useBreakpoint();

    const isMobile = !screens.lg;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Layout className="erp-layout">
            {!isMobile && (
                <Sider
                    width={260}
                    theme="light"
                    className="erp-sidebar"
                >
                    <AppSidebar />
                </Sider>
            )}

            <Layout>

                <AppHeader
                    isMobile={isMobile}
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

               <Content className="erp-content">
    <div
        style={{
            maxWidth: "100%",
            width: "100%",
        }}
    >
        <Outlet />
    </div>
</Content>

            </Layout>

            {isMobile && (

                <Drawer
                    className="erp-mobile-drawer"
                    placement="left"
                    open={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(false)
                    }
                    closable={false}
                    width={260}

                >
                    <AppSidebar />
                </Drawer>

            )}
        </Layout>
    );
}

export default MainLayout;