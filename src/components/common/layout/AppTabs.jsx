import React from "react";
import { Tabs } from "antd";
import "./AppTabs.css";

function AppTabs({
    items = [],
    activeKey,
    onChange,

    centered = false,
    destroyInactiveTabPane = false,
    animated = true,
    tabPosition = "top",

    type = "line",
    size = "middle",
    tabBarGutter = 8,
    tabBarExtraContent,

    ...rest
}) {
    return (
        <Tabs
            className="app-tabs"
            items={items}
            activeKey={activeKey}
            onChange={onChange}
            centered={centered}
            destroyInactiveTabPane={destroyInactiveTabPane}
            animated={animated}
            tabPosition={tabPosition}
            type={type}
            size={size}
            tabBarGutter={8}
            tabBarExtraContent={tabBarExtraContent}
            {...rest}
        />
    );
}

export default React.memo(AppTabs);