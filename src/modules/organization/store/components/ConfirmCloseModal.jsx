import { Modal } from "antd";
import { AppButton } from "@/components/common";
const ConfirmCloseModal = ({
    open,
    onSave,
    onDiscard,
    onCancel
}) => {

    return (

        <Modal
            open={open}
            title="Unsaved Changes"
            closable={false}
            maskClosable={false}
            footer={null}
            centered
        >

            <p>

                You have unsaved changes.

            </p>

            <p>

                Do you want to save before closing?

            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    marginTop: 24
                }}
            >

                <AppButton onClick={onCancel}>
                    Cancel
                </AppButton>

                <AppButton onClick={onDiscard}>
                    Discard
                </AppButton>

                <AppButton
                    type="primary"
                    onClick={onSave}
                >
                    Save
                </AppButton>

            </div>

        </Modal>

    );

};

export default ConfirmCloseModal;