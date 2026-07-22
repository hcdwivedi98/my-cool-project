import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";

function AppStepper({
    current = 0,
    items = [],
    direction = "horizontal",
}) {
    return (
        <Steps
            current={current}
            items={items}
            direction={direction}
        />
    );
}

AppStepper.propTypes = {
    current: PropTypes.number,
    items: PropTypes.array,
    direction: PropTypes.oneOf([
        "horizontal",
        "vertical",
    ]),
};

export default React.memo(AppStepper);