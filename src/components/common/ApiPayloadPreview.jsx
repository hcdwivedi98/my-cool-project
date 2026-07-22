import React from "react";

import {
    Card,
    Typography,
} from "antd";

const { Text } = Typography;

function ApiPayloadPreview({
    payload,
    title = "API Payload Preview",
}) {

    return (

        <Card
            title={title}

            style={{
                borderRadius: 12,
            }}
        >

            <Text
                type="secondary"
            >
                Development Only
            </Text>

            <pre
                style={{
                    maxHeight: 350,
                    overflow: "auto",
                    background: "#f5f5f5",
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 12,
                }}
            >

                {
                    JSON.stringify(
                        payload,
                        null,
                        2
                    )
                }

            </pre>

        </Card>
    );
}

export default ApiPayloadPreview;