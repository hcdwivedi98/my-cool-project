import { useState } from "react";

import { AppDrawer } from "@/components/common";
import ConfirmCloseModal from "./ConfirmCloseModal";
import StoreForm from "./StoreForm";

const StoreDrawer = ({
    open,
    mode,
    record,
    onClose,
    onSave
}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [dirty, setDirty] = useState(false);

    const handleClose = () => {

        if (dirty) {

            setConfirmOpen(true);

            return;

        }

        onClose();

    };

    const handleDiscard = () => {

        setDirty(false);

        setConfirmOpen(false);

        onClose();

    };

    const handleCancel = () => {

        setConfirmOpen(false);

    };

    const handleSave = async (payload) => {

        await onSave?.(payload);

        setDirty(false);

        onClose();

    };

    return (

        <>

            <AppDrawer
                title={
                    mode === "ADD"
                        ? "Add Store"
                        : mode === "EDIT"
                            ? "Edit Store"
                            : "View Store"
                }
                open={open}
                width={1000}
                destroyOnClose
                onClose={handleClose}
            >

                <StoreForm
                    mode={mode}
                    record={record}
                    onSave={handleSave}
                    onCancel={handleClose}
                    onDirtyChange={setDirty}
                />

            </AppDrawer>

            <ConfirmCloseModal
                open={confirmOpen}
                onSave={() => {
                    setConfirmOpen(false);
                }}
                onDiscard={handleDiscard}
                onCancel={handleCancel}
            />

        </>

    );

};

export default StoreDrawer;