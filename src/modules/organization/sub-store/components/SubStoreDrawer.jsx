import { useMemo, useState } from "react";
import { Form } from "antd";

import {
    AppDrawer,
    AppButton
} from "@/components/common";

import ConfirmCloseModal from "./ConfirmCloseModal";
import SubStoreForm from "./SubStoreForm";



const SubStoreDrawer = ({
    open,
    mode,
    record,
    onClose,
    onSave
}) => {

    const [form] = Form.useForm();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [dirty, setDirty] = useState(false);

    const [activeTab, setActiveTab] = useState("basic");

    const TAB_ORDER = useMemo(
        () => [
            "basic",
            "contact",
            "location",
            "inventory",
            "financial",
            "approval",
            "documents",
            ...(record ? ["audit"] : [])
        ],
        [record]
    );

    const currentIndex = TAB_ORDER.indexOf(activeTab);

    const isFirstTab = currentIndex === 0;

    const isLastTab = currentIndex === TAB_ORDER.length - 1;

    const handleClose = () => {

        if (dirty) {

            setConfirmOpen(true);

            return;

        }

        onClose?.();

    };

    const handleDiscard = () => {

        setDirty(false);

        setConfirmOpen(false);

        onClose?.();

    };

    const handleCancel = () => {

        setConfirmOpen(false);

    };

    const goPrevious = () => {

        if (!isFirstTab) {

            setActiveTab(TAB_ORDER[currentIndex - 1]);

        }

    };

    const goNext = () => {

        if (!isLastTab) {

            setActiveTab(TAB_ORDER[currentIndex + 1]);

        }

    };

    const handleNext = async () => {

        try {

            switch (activeTab) {

                case "basic":

                    await form.validateFields([
                        "centerId",
                        "departmentId",
                        "storeId",
                        "subStoreCode",
                        "subStoreName"
                    ]);

                    break;

                case "contact":

                    await form.validateFields([
                        "contactPerson",
                        "mobileNo",
                        "email"
                    ]);

                    break;

                case "location":

                    await form.validateFields([
                        "buildingId",
                        "floorId",
                        "roomId"
                    ]);

                    break;

                case "inventory":

                    await form.validateFields([
                        "allowNegativeStock",
                        "batchMandatory"
                    ]);

                    break;

                default:
                    break;

            }

            goNext();

        }
        catch {

            // Validation Failed

        }

    };

    const handleSave = async () => {

        try {

            const values = await form.validateFields();

            const payload = prepareSubStorePayload(values);

            await onSave?.(payload);

            setDirty(false);

            onClose?.();

        }
        catch {

            // Validation Failed

        }

    };

        return (

        <>

            <AppDrawer
                title={
                    mode === "ADD"
                        ? "Add Sub Store"
                        : mode === "EDIT"
                            ? "Edit Sub Store"
                            : "View Sub Store"
                }
                open={open}
                width={1000}
                destroyOnClose
                onClose={handleClose}
                bodyStyle={{
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
                footer={

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >

                        <AppButton
                            disabled={isFirstTab}
                            onClick={goPrevious}
                        >
                            Previous
                        </AppButton>

                        <div
                            style={{
                                display: "flex",
                                gap: 8
                            }}
                        >

                            <AppButton
                                onClick={handleClose}
                            >
                                {
                                    mode === "VIEW"
                                        ? "Close"
                                        : "Cancel"
                                }
                            </AppButton>

                            {

                                mode !== "VIEW" && (

                                    !isLastTab ? (

                                        <AppButton
                                            type="primary"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </AppButton>

                                    ) : (

                                        <AppButton
                                            type="primary"
                                            onClick={handleSave}
                                        >
                                            Save Sub Store
                                        </AppButton>

                                    )

                                )

                            }

                        </div>

                    </div>

                }
            >

                <div
                    style={{
                        flex: 1,
                        overflow: "auto",
                        padding: 24
                    }}
                >

                    <SubStoreForm
                        form={form}
                        mode={mode}
                        record={record}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onDirtyChange={setDirty}
                    />

                </div>

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

export default SubStoreDrawer;