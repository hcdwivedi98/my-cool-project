import React from "react";

import {

    Modal,

} from "antd";

function ConfirmDialog({

    open,

    title = "Confirmation",

    content,

    okText = "Yes",

    cancelText = "No",

    okType = "primary",

    loading = false,

    onOk,

    onCancel,

}) {

    return (

        <Modal

            open={open}

            title={title}

            onOk={onOk}

            onCancel={onCancel}

            okText={okText}

            cancelText={cancelText}

            okButtonProps={{

                loading,

                type: okType,

            }}

            destroyOnHidden

            centered

        >

            {content}

        </Modal>

    );

}

export default ConfirmDialog;