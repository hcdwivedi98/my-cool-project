import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

function AppTextArea({
    rows = 4,
    autoSize,
    ...props
}) {
    return (
        <TextArea
            rows={rows}
            autoSize={autoSize}
            {...props}
        />
    );
}

export default React.memo(AppTextArea);