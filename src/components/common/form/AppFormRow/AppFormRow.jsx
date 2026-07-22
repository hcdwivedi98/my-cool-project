// src/components/common/form/AppFormRow/AppFormRow.jsx

import PropTypes from "prop-types";
import { Row } from "antd";

function AppFormRow({
    children,
    gutter = [16, 0],
    align = "top",
    justify = "start",
    wrap = true,
    style,
}) {
    return (
        <Row
            gutter={gutter}
            align={align}
            justify={justify}
            wrap={wrap}
            style={style}
        >
            {children}
        </Row>
    );
}

AppFormRow.propTypes = {
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
    ]),
    align: PropTypes.string,
    justify: PropTypes.string,
    wrap: PropTypes.bool,
    style: PropTypes.object,
};

export default AppFormRow;