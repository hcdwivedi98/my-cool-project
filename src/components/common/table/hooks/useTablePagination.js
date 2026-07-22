import { useMemo } from "react";

export default function useTablePagination({

    pagination,

    serverSide = true,

}) {

    return useMemo(() => ({

        ...pagination,

        showSizeChanger: true,

        showQuickJumper: true,

        responsive: true,

        pageSizeOptions: [

            10,

            20,

            50,

            100,

            200,

        ],

    }), [

        pagination,

        serverSide,

    ]);

}