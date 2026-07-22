import React from "react";
import { Empty } from "antd";

function AppEmpty({
    description = "No Data Found"
}) {
    return (
        <Empty
            description={description}
        />
    );
}

export default React.memo(AppEmpty);