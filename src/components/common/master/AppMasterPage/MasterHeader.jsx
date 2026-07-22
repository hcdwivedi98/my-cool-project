import PropTypes from "prop-types";
import { Flex, Typography } from "antd";

import MasterBreadcrumb from "./MasterBreadcrumb";

const { Title, Text } = Typography;

function MasterHeader({
    title,
    subtitle,
    breadcrumbs = [],
    extra
}) {

    return (

        <Flex
            justify="space-between"
            align="flex-start"
            wrap
            gap={16}
        >

            <Flex
                vertical
                gap={4}
            >

                <MasterBreadcrumb
                    items={breadcrumbs}
                />

                <Title
                    level={4}
                    style={{
                        margin: 0
                    }}
                >
                    {title}
                </Title>

                {subtitle && (

                    <Text type="secondary">

                        {subtitle}

                    </Text>

                )}

            </Flex>

            {extra && (

                <Flex
                    align="center"
                    gap={8}
                >

                    {extra}

                </Flex>

            )}

        </Flex>

    );

}

MasterHeader.propTypes = {

    title: PropTypes.string.isRequired,

    subtitle: PropTypes.string,

    breadcrumbs: PropTypes.array,

    extra: PropTypes.node

};

export default MasterHeader;