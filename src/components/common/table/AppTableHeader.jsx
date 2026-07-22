import React, { memo } from "react";

import {
    Typography,
    Space,
} from "antd";

const {
    Title,
    Text,
} = Typography;

function AppTableHeader({

    title,

    subTitle,

    extra,

}) {

    if (!title && !subTitle && !extra) {

        return null;

    }

    return (

        <div className="erp-table-header">

            <div className="erp-table-header__content">

                {title && (

                    <Title
                        level={5}
                        style={{
                            margin: 0,
                        }}
                    >
                        {title}
                    </Title>

                )}

                {subTitle && (

                    <Text type="secondary">

                        {subTitle}

                    </Text>

                )}

            </div>

            {extra && (

                <Space>

                    {extra}

                </Space>

            )}

        </div>

    );

}

export default memo(AppTableHeader);