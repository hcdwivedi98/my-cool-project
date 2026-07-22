import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

function PaginationInfo({

    total,

    current,

    pageSize,

}) {

    const from =

        total === 0

            ? 0

            : (current - 1) * pageSize + 1;

    const to =

        Math.min(

            current * pageSize,

            total

        );

    return (

        <Text type="secondary">

            {from}-{to} of {total} records

        </Text>

    );

}

export default React.memo(

    PaginationInfo

);