import React from "react";
import { Switch } from "antd";

function AppSwitch(props) {
    return (
        <Switch
            checkedChildren="Yes"
            unCheckedChildren="No"
            {...props}
        />
    );
}

export default React.memo(AppSwitch);