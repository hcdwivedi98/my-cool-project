import React from "react";
import { Drawer } from "antd";

function AppDrawer(props) {
    return (
        <Drawer
            placement="right"
            {...props}
        />
    );
}

export default React.memo(AppDrawer);