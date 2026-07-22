import React from "react";
import PropTypes from "prop-types";
import { Flex, Typography } from "antd";

const { Text } = Typography;

function AppCardHeader({
    title,
    subTitle,
    extra,
}) {
    return (
        <Flex
            justify="space-between"
            align="center"
            style={{
                marginBottom: 16,
            }}
        >
            <div>
                <Text strong>
                    {title}
                </Text>

                {subTitle && (
                    <>
                        <br />
                        <Text type="secondary">
                            {subTitle}
                        </Text>
                    </>
                )}
            </div>

            {extra}
        </Flex>
    );
}

AppCardHeader.propTypes = {
    title: PropTypes.node,
    subTitle: PropTypes.node,
    extra: PropTypes.node,
};

export default React.memo(AppCardHeader);