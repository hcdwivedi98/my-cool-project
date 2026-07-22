import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function AppBreadcrumb({

    items = [],

    separator = "/",

    style,

}) {

    const breadcrumbItems = items.map(item => ({

        title: item.path

            ? (

                <Link to={item.path}>

                    {item.title}

                </Link>

            )

            : item.title,

    }));

    return (

        <Breadcrumb

            separator={separator}

            items={breadcrumbItems}

            style={{

                marginBottom: 12,

                ...style,

            }}

        />

    );

}

export default React.memo(AppBreadcrumb);