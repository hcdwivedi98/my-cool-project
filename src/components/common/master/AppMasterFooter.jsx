import React from "react";

import {
    Space,
} from "antd";

import {
    AppButton,
} from "../buttons";

function AppMasterFooter({

    onCancel,

    onSave,

    onSubmit,

    cancelText = "Cancel",

    saveText = "Save",

    submitText = "Submit",

    loading = false,

    children,

}) {

    return (

        <div

            style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                width: "100%",

            }}

        >

            <div>

                {children}

            </div>

            <Space>

                {

                    onCancel && (

                        <AppButton

                            onClick={onCancel}

                        >

                            {cancelText}

                        </AppButton>

                    )

                }

                {

                    onSave && (

                        <AppButton

                            loading={loading}

                            onClick={onSave}

                        >

                            {saveText}

                        </AppButton>

                    )

                }

                {

                    onSubmit && (

                        <AppButton

                            type="primary"

                            loading={loading}

                            onClick={onSubmit}

                        >

                            {submitText}

                        </AppButton>

                    )

                }

            </Space>

        </div>

    );

}

export default AppMasterFooter;