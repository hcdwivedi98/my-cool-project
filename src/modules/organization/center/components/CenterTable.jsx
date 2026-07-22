import PropTypes from "prop-types";

import { AppMasterTable } from "@/components/common";

import { buildCenterColumns } from "../utils/centerColumnFactory";

function CenterTable({

    data = [],

    loading = false,

    pagination,

    onView,

    onEdit,

    onDelete,

    onStatusChange

}) {

    const columns = buildCenterColumns({

        onView,

        onEdit,

        onDelete,

        onStatusChange

    });

    return (

        <AppMasterTable

            rowKey="id"

            columns={columns}

            dataSource={data}

            loading={loading}

            pagination={pagination}

        />

    );

}

CenterTable.propTypes = {

    data: PropTypes.array,

    loading: PropTypes.bool,

    pagination: PropTypes.object,

    onView: PropTypes.func,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func,

    onStatusChange: PropTypes.func

};

export default CenterTable;