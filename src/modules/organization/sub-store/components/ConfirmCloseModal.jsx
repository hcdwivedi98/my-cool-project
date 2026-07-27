import { Modal } from "antd";

const ConfirmCloseModal = ({
    open,
    onOk,
    onCancel
}) => {

    return (
        <Modal
            open={open}
            title="Unsaved Changes"
            okText="Discard"
            cancelText="Continue Editing"
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose
            centered
        >
            <p>
                You have unsaved changes.
            </p>

            <p>
                Are you sure you want to close this window?
            </p>
        </Modal>
    );

};

export default ConfirmCloseModal;