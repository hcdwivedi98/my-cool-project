import React from "react";
import { Modal } from "antd";

const ConfirmCloseModal = ({
    open = false,
    loading = false,
    onOk,
    onCancel,
}) => {
    return (
        <Modal
            open={open}
            title="Discard Changes?"
            okText="Discard"
            cancelText="Continue Editing"
            okButtonProps={{
                danger: true,
                loading,
            }}
            mask={{
                closable: false,
            }}
            onOk={onOk}
            onCancel={onCancel}
            centered
            destroyOnHidden
        >
            <p>
                You have unsaved changes in this Bin.
            </p>

            <p>
                Are you sure you want to close without
                saving?
            </p>
        </Modal>
    );
};

export default ConfirmCloseModal;