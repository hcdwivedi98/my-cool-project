import React from "react";

import {
    Space,
} from "antd";

import AppMasterHeader from "./AppMasterHeader";
import AppMasterFilter from "./AppMasterFilter";
import AppMasterToolbar from "./AppMasterToolbar";
import AppMasterGrid from "./AppMasterGrid";

function AppMasterLayout({

    title,

    subtitle,

    icon,

    addButtonText,

    onAdd,

    filters,

    toolbar,

    children,

    ...toolbarProps

}) {

    return (

        <Space

            direction="vertical"

            size={16}

            style={{

                width: "100%",

            }}

        >

            <AppMasterHeader

                title={title}

                subtitle={subtitle}

                icon={icon}

                onAdd={onAdd}

                addButtonText={addButtonText}

            />

            <AppMasterFilter>

                {filters}

            </AppMasterFilter>

            <AppMasterToolbar

                {...toolbarProps}

            >

                {toolbar}

            </AppMasterToolbar>

            <AppMasterGrid>

                {children}

            </AppMasterGrid>

        </Space>

    );

}

export default AppMasterLayout;