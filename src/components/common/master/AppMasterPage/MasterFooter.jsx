import PropTypes from "prop-types";
import { Card, Flex } from "antd";

function MasterFooter({
    left,
    right,
    children,
    style
}) {

    return (
        <Card
            size="small"
            style={style}
            styles={{
                body: {
                    padding: "8px 12px"
                }
            }}
        >
            {children ? (

                children

            ) : (

                <Flex
                    justify="space-between"
                    align="center"
                    wrap
                    gap={12}
                >

                    <Flex
                        align="center"
                        gap={8}
                    >
                        {left}
                    </Flex>

                    <Flex
                        align="center"
                        gap={8}
                    >
                        {right}
                    </Flex>

                </Flex>

            )}
        </Card>
    );

}

MasterFooter.propTypes = {

    left: PropTypes.node,

    right: PropTypes.node,

    children: PropTypes.node,

    style: PropTypes.object

};

export default MasterFooter;