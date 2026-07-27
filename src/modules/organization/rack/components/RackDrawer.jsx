import { useEffect, useState } from "react";

import { Form, message } from "antd";

import {
    AppButton,
    AppDrawer
} from "@/components/common";

import RackForm from "./RackForm";
import ConfirmCloseModal from "./ConfirmCloseModal";

import {
    DRAWER_MODE,
    RACK_FORM_TABS
} from "../constants/rack.constants";

import { prepareRackPayload } from "../utils/rack.helper";

const TAB_ORDER = [

    "basic",
    "location",
    "capacity",
    "inventory",
    "approval",
    "documents",
    "audit"

];

const RackDrawer = ({
    open,
    mode,
    record,
    onClose,
    onSave
}) => {

    const [form] = Form.useForm();

    const [activeTab, setActiveTab] = useState("basic");

    const [dirty, setDirty] = useState(false);

    const [confirmClose, setConfirmClose] = useState(false);

    useEffect(() => {

        if (!open) return;

        if (record) {

            form.setFieldsValue(record);

        } else {

            form.resetFields();

        }

        setActiveTab("basic");

        setDirty(false);

    }, [open, record, form]);

    const validateCurrentTab = async () => {

        const fields = Object.keys(RACK_FORM_TABS)

            .filter(key => RACK_FORM_TABS[key] === activeTab);

        if (!fields.length) {

            return true;

        }

        await form.validateFields(fields);

        return true;

    };

    const handleNext = async () => {

        try {

            await validateCurrentTab();

            const index = TAB_ORDER.indexOf(activeTab);

            if (index < TAB_ORDER.length - 1) {

                setActiveTab(TAB_ORDER[index + 1]);

            }

        } catch {

            message.error("Please complete required fields.");

        }

    };

    const handlePrevious = () => {

        const index = TAB_ORDER.indexOf(activeTab);

        if (index > 0) {

            setActiveTab(TAB_ORDER[index - 1]);

        }

    };
        const handleSave = async () => {

        try {

            await form.validateFields();

            const values = form.getFieldsValue(true);

            const payload = prepareRackPayload(values);

            if (onSave) {

                onSave(payload);

            }

            setDirty(false);

            onClose?.();

        } catch {

            message.error("Please correct validation errors.");

        }

    };

    const handleDrawerClose = () => {

        if (dirty && mode !== DRAWER_MODE.VIEW) {

            setConfirmClose(true);

            return;

        }

        onClose?.();

    };

    return (

        <>

            <AppDrawer
                open={open}
                width={1100}
                destroyOnClose
                title={
                    mode === DRAWER_MODE.ADD
                        ? "Add Rack"
                        : mode === DRAWER_MODE.EDIT
                            ? "Edit Rack"
                            : "View Rack"
                }
                onClose={handleDrawerClose}
                footer={

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >

                        <AppButton
                            disabled={activeTab === TAB_ORDER[0]}
                            onClick={handlePrevious}
                        >
                            Previous
                        </AppButton>

                        <div>

                            <AppButton
                                onClick={handleDrawerClose}
                            >
                                Cancel
                            </AppButton>

                            {

                                activeTab !== TAB_ORDER[TAB_ORDER.length - 1]
                                && mode !== DRAWER_MODE.VIEW && (

                                    <AppButton
                                        type="primary"
                                        style={{ marginLeft: 8 }}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </AppButton>

                                )

                            }

                            {

                                mode !== DRAWER_MODE.VIEW && (

                                    <AppButton
                                        type="primary"
                                        style={{ marginLeft: 8 }}
                                        onClick={handleSave}
                                    >
                                        Save Rack
                                    </AppButton>

                                )

                            }

                        </div>

                    </div>

                }
            >

                <RackForm
                    form={form}
                    mode={mode}
                    record={record}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onDirtyChange={setDirty}
                />

            </AppDrawer>

            <ConfirmCloseModal
                open={confirmClose}
                onCancel={() => setConfirmClose(false)}
                onOk={() => {

                    setConfirmClose(false);

                    setDirty(false);

                    onClose?.();

                }}
            />

        </>

    );

};

export default RackDrawer;