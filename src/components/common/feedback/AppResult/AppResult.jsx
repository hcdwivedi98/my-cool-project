import React from "react";
import { Result, Button } from "antd";

function AppResult({
    status = "404",
    title,
    subTitle,
    buttonText,
    onClick
}) {
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={
                buttonText && (
                    <Button
                        type="primary"
                        onClick={onClick}
                    >
                        {buttonText}
                    </Button>
                )
            }
        />
    );
}

export default React.memo(AppResult);