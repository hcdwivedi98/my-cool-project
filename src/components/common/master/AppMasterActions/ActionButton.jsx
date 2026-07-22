import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";

function ActionButton({

    icon: Icon,

    tooltip,

    danger = false,

    onClick

}) {

    return (

        <Tooltip title={tooltip}>

            <Button

                type="text"

                danger={danger}

                icon={<Icon />}

                onClick={onClick}

            />

        </Tooltip>

    );

}

ActionButton.propTypes = {

    icon: PropTypes.elementType.isRequired,

    tooltip: PropTypes.string,

    danger: PropTypes.bool,

    onClick: PropTypes.func

};

export default ActionButton;