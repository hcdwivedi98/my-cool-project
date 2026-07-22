import React from "react";

import {
    Dropdown,
    Menu,
} from "antd";

import {
    ColumnHeightOutlined,
} from "@ant-design/icons";

import {
    AppIconButton,
} from "../buttons";

import {
    useDensity,
} from "../../../theme/DensityContext";

function AppTableDensity() {

    const {

        density,

        setDensity,

    } = useDensity();

    const items = [

        {

            key: "compact",

            label: "Compact",

        },

        {

            key: "comfortable",

            label: "Comfortable",

        },

        {

            key: "spacious",

            label: "Spacious",

        },

    ];

    return (

        <Dropdown

            trigger={["click"]}

            menu={{

                selectable: true,

                selectedKeys: [density],

                items,

                onClick: ({ key }) =>

                    setDensity(key),

            }}

        >

            <span>

                <AppIconButton

                    icon={<ColumnHeightOutlined />}

                    tooltip={`Density : ${density}`}

                />

            </span>

        </Dropdown>

    );

}

export default React.memo(AppTableDensity);