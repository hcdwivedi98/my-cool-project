import PropTypes from "prop-types";

import {
    AppMasterActions
} from "@/components/common";

function CenterActions({
    record,
    onView,
    onEdit,
    onDelete,
    onStatusChange
}) {

    const actions = [
        "VIEW",
        "EDIT",
        record?.isActive ? "DEACTIVATE" : "ACTIVATE",
        "DELETE"
    ];

    const handlers = {

        VIEW: () => onView?.(record),

        EDIT: () => onEdit?.(record),

        DELETE: () => onDelete?.(record),

        ACTIVATE: () => onStatusChange?.(record, true),

        DEACTIVATE: () => onStatusChange?.(record, false)

    };

    return (

        <AppMasterActions

            actions={[
                "VIEW",
                "EDIT",
                record.isActive ? "DEACTIVATE" : "ACTIVATE",
                "DELETE"
            ]}

            handlers={{

                VIEW: () => onView(record),

                EDIT: () => onEdit(record),

                DELETE: () => onDelete(record),

                ACTIVATE: () => onStatusChange(record, true),

                DEACTIVATE: () => onStatusChange(record, false)

            }}

        />

    );

}

CenterActions.propTypes = {

    record: PropTypes.object.isRequired,

    onView: PropTypes.func,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func,

    onStatusChange: PropTypes.func

};

export default CenterActions;