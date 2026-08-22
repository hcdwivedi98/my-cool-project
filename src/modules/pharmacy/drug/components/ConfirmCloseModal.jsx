import React from "react";
import { Modal } from "antd";

const ConfirmCloseModal = ({
    open = false,
    onOk,
    onCancel,
}) => {
    return (
        <Modal
            open={open}
            title="Discard Changes?"
            okText="Discard"
            cancelText="Continue Editing"
            onOk={onOk}
            onCancel={onCancel}
            mask={{
                closable: false,
            }}
            centered
        >
            <p>
                You have unsaved changes.
            </p>

            <p>
                Are you sure you want to close
                without saving?
            </p>
        </Modal>
    );
};

export default React.memo(
    ConfirmCloseModal
);