import React from "react";

import {
    Divider,
    Space,
    Typography,
} from "antd";

const {

    Title,

    Text,

} = Typography;

function FormSection({

    title,

    subTitle,

    extra,

    children,

    divider = true,

    style,

}) {

    return (

        <div

            style={{

                marginBottom: 24,

                ...style,

            }}

        >

            {

                title && (

                    <Space

                        style={{

                            width: "100%",

                            justifyContent:

                                "space-between",

                            marginBottom: 16,

                        }}

                    >

                        <div>

                            <Title

                                level={5}

                                style={{

                                    margin: 0,

                                }}

                            >

                                {title}

                            </Title>

                            {

                                subTitle && (

                                    <Text

                                        type="secondary"

                                    >

                                        {subTitle}

                                    </Text>

                                )

                            }

                        </div>

                        {extra}

                    </Space>

                )

            }

            {children}

            {

                divider && (

                    <Divider

                        style={{

                            marginTop: 24,

                        }}

                    />

                )

            }

        </div>

    );

}

export default React.memo(FormSection);