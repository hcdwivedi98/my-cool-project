import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

function AppFormGrid({
    children,
    gutter = [16, 16],
}) {
    return (
        <Row gutter={gutter}>
            {children}
        </Row>
    );
}

function Item({
    children,
    span = 8,
    xs = 24,
    sm = 12,
    md,
    lg,
    xl,
}) {
    return (
        <Col
            xs={xs}
            sm={sm}
            md={md || span}
            lg={lg || span}
            xl={xl || span}
        >
            {children}
        </Col>
    );
}

AppFormGrid.Item = Item;

AppFormGrid.propTypes = {
    children: PropTypes.node,
    gutter: PropTypes.array,
};

Item.propTypes = {
    children: PropTypes.node,
    span: PropTypes.number,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
};

export default React.memo(AppFormGrid);