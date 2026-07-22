class PaginationService {

    getDefault() {

        return {

            current: 1,

            pageSize: 10,

            total: 0,

            showSizeChanger: true,

            showQuickJumper: true,

            pageSizeOptions: [

                10,

                20,

                50,

                100,

                200,

                500,

            ],

            showTotal: (total, range) =>

                `${range[0]}-${range[1]} of ${total} records`

        };

    }

}

export default new PaginationService();