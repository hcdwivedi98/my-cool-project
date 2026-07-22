import PropTypes from "prop-types";

import { AppStatusTag } from "@/components/common";

function StatusTag({ value }) {

    return (

        <AppStatusTag value={value} />

    );

}

StatusTag.propTypes = {

    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ])

};

export default StatusTag;