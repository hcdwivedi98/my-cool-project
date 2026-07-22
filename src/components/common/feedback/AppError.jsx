import React, { memo } from "react";

import {

    Result,
    Button,

} from "antd";

function AppError({

    title = "Something Went Wrong",

    subTitle,

    status = "error",

    onRetry,

}) {

    return (

        <Result

            status={status}

            title={title}

            subTitle={subTitle}

            extra={

                onRetry && (

                    <Button

                        type="primary"

                        onClick={onRetry}

                    >

                        Retry

                    </Button>

                )

            }

        />

    );

}

export default memo(AppError);