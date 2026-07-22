const tableDefaults = {

    rowKey: "id",

    bordered: true,

    size: "small",

    sticky: true,

    scroll: {

        x: "max-content",

        y: "calc(100vh - 330px)"

    },

    pagination: {

        pageSize: 20,

        showSizeChanger: true,

        showQuickJumper: true,

        showTotal: total => `Total ${total} Records`

    }

};

export default tableDefaults;