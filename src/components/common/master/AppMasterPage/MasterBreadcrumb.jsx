import PropTypes from "prop-types";
import { Breadcrumb } from "antd";

function MasterBreadcrumb({ items = [] }) {

    if (!items.length) {
        return null;
    }

    return (
        <Breadcrumb
            items={items}
        />
    );
}

MasterBreadcrumb.propTypes = {

    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node.isRequired,
            href: PropTypes.string
        })
    )

};

export default MasterBreadcrumb;