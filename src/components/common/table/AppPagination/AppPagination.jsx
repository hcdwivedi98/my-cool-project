import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

function AppPagination({
    current,
    pageSize,
    total,
    onChange,
}) {
    return (
        <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(t) =>
                `Total ${t} Records`
            }
            onChange={onChange}
        />
    );
}

AppPagination.propTypes = {
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
};

export default React.memo(AppPagination);