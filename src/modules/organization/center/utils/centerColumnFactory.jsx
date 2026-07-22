import CenterActions from "../components/CenterActions";
import StatusTag from "../components/StatusTag";

import { centerColumns } from "../constants/centerColumns";

export function buildCenterColumns(handlers = {}) {

    return centerColumns.map(column => {

        switch (column.key) {

            case "status":

                return {

                    ...column,

                    render: (_, record) => (

                        <StatusTag
                            value={record.status}
                        />

                    )

                };

            case "actions":

                return {

                    ...column,

                    render: (_, record) => (

                        <CenterActions

                            record={record}

                            {...handlers}

                        />

                    )

                };

            default:

                return column;

        }

    });

}