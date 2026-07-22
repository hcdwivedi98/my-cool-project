import React from "react";

import {

    Select,

} from "antd";

function PaginationSizeChanger({

    value,

    onChange,

}) {

    return (

        <Select

            style={{

                width: 100,

            }}

            value={value}

            onChange={onChange}

            options={[

                {

                    label: "10",

                    value: 10,

                },

                {

                    label: "20",

                    value: 20,

                },

                {

                    label: "50",

                    value: 50,

                },

                {

                    label: "100",

                    value: 100,

                },

                {

                    label: "200",

                    value: 200,

                },

            ]}

        />

    );

}

export default React.memo(

    PaginationSizeChanger

);