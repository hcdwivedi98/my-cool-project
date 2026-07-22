import PropTypes from "prop-types";
import { Card } from "antd";

function MasterContent({
    children,
    bordered = false,
    bodyStyle,
    style
}) {

    return (
        <Card
            bordered={bordered}
            style={style}
            styles={{
                body: {
                    padding: 0,
                    ...bodyStyle
                }
            }}
        >
            {children}
        </Card>
    );

}

MasterContent.propTypes = {

    children: PropTypes.node,

    bordered: PropTypes.bool,

    bodyStyle: PropTypes.object,

    style: PropTypes.object

};

export default MasterContent;