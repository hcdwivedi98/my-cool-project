// src/components/common/form/AppFormRow/FormColumn.jsx

import PropTypes from "prop-types";
import { Col } from "antd";

function FormColumn({
    children,
    xs = 24,
    sm = 24,
    md = 12,
    lg = 8,
    xl = 6,
    xxl = 6,
    span,
    style,
}) {
    return (
        <Col
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            xxl={xxl}
            span={span}
            style={style}
        >
            {children}
        </Col>
    );
}

FormColumn.propTypes = {
    children: PropTypes.node,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
    span: PropTypes.number,
    style: PropTypes.object,
};

export default FormColumn;