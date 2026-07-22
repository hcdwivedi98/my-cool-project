import PropTypes from "prop-types";
import { Card, Flex } from "antd";

function MasterToolbar({
    left,
    right,
    children,
    style
}) {

    return (
        <Card
            size="small"
            styles={{
                body: {
                    padding: 12
                }
            }}
            style={style}
        >
            {children ? (

                children

            ) : (

                <Flex
                    justify="space-between"
                    align="center"
                    gap={12}
                    wrap
                >
                    <Flex
                        align="center"
                        gap={8}
                        wrap
                    >
                        {left}
                    </Flex>

                    <Flex
                        align="center"
                        gap={8}
                        wrap
                    >
                        {right}
                    </Flex>
                </Flex>

            )}
        </Card>
    );

}

MasterToolbar.propTypes = {

    left: PropTypes.node,

    right: PropTypes.node,

    children: PropTypes.node,

    style: PropTypes.object

};

export default MasterToolbar;