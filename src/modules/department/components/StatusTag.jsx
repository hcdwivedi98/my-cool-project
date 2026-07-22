import PropTypes from "prop-types";

import { Tag } from "antd";

function StatusTag({ active }) {
    return (
        <Tag color={active ? "success" : "default"}>
            {active ? "Active" : "Inactive"}
        </Tag>
    );
}

StatusTag.propTypes = {
    active: PropTypes.bool,
};

export default StatusTag;