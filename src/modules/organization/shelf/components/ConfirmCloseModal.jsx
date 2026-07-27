import React from "react";
import { Modal } from "antd";

const ConfirmCloseModal = ({
    open,
    onOk,
    onCancel,
}) => {
    return (
        <Modal
            open={open}
            centered
            destroyOnHidden
            maskClosable={false}
            keyboard={false}
            title="Discard Changes?"
            okText="Discard"
            cancelText="Continue Editing"
            okButtonProps={{
                danger: true,
            }}
            onOk={onOk}
            onCancel={onCancel}
        >
            <p style={{ marginBottom: 0 }}>
                You have unsaved changes.
                <br />
                If you close this drawer, all changes will be lost.
            </p>
        </Modal>
    );
};

export default ConfirmCloseModal;