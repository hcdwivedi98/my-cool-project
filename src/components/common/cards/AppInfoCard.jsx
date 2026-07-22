import React from "react";

import {
    Descriptions,
    Empty,
} from "antd";

import AppCard from "./AppCard";

function AppInfoCard({

    title,

    subTitle,

    items = [],

    extra,

    loading = false,

    column = 1,

    bordered = false,

    size = "small",

    emptyText = "No Information Available",

    className = "",

    style,

}) {

    return (

        <AppCard

            title={title}

            subTitle={subTitle}

            extra={extra}

            loading={loading}

            className={className}

            style={style}

        >

            {

                items.length > 0

                    ? (

                        <Descriptions

                            bordered={bordered}

                            size={size}

                            column={column}

                            items={items}

                        />

                    )

                    : (

                        <Empty

                            description={emptyText}

                        />

                    )

            }

        </AppCard>

    );

}

export default React.memo(AppInfoCard);