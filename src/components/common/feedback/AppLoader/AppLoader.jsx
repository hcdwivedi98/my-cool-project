import React from "react";
import { Spin, Flex } from "antd";

function AppLoader({
    spinning = true,
    tip = "Loading..."
}) {
    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: 250,
                width: "100%"
            }}
        >
            <Spin
                spinning={spinning}
                size="large"
                tip={tip}
            />
        </Flex>
    );
}

export default React.memo(AppLoader);