import React, { useState } from "react";

import {
    Drawer,
    Tabs,
    Space,
    Form,
} from "antd";

import {
    AppButton,
} from "../../../components/common/buttons";

import BasicInformationTab from "./tabs/BasicInformationTab";
import ItemsTab from "./tabs/ItemsTab";
import ApprovalTab from "./tabs/ApprovalTab";
import AttachmentsTab from "./tabs/AttachmentsTab";

function PurchaseDrawer({

    open,

    loading,

    requisition,

    lookups,

    onClose,

    onSaveDraft,

    onSubmit,

}) {

    const [activeTab, setActiveTab] = useState("basic");
    const [form] = Form.useForm();
    const items = [

        {

            key: "basic",

            label: "Basic Information",

            children: (

                <BasicInformationTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "items",

            label: "Items",

            children: (

                <ItemsTab

                    items={[]}

                    onSearch={() => { }}

                    onAddItem={() => { }}

                    onDelete={() => { }}

                />

            ),

        },

        {

            key: "approval",

            label: "Approval",

            children: (

                <ApprovalTab

                    requisition={requisition}

                />

            ),

        },

        {

            key: "attachments",

            label: "Attachments",

            children: (

                <AttachmentsTab

                    requisition={requisition}

                />

            ),

        },

    ];
    

    return (

        <Drawer

            title={

                requisition?.id

                    ? "Edit Purchase Requisition"

                    : "New Purchase Requisition"

            }

            width={1100}

            destroyOnClose

            open={open}

            onClose={onClose}

            footer={

                <Space
                    style={{
                        width: "100%",
                        justifyContent: "flex-end",
                    }}
                >

                    <AppButton
                        onClick={onClose}
                    >
                        Cancel
                    </AppButton>

                    <AppButton
                        onClick={onSaveDraft}
                    >
                        Save Draft
                    </AppButton>

                    <AppButton
                        type="primary"
                        loading={loading}
                        onClick={onSubmit}
                    >
                        Submit
                    </AppButton>

                </Space>

            }

        >

            <Tabs

                activeKey={activeTab}

                onChange={setActiveTab}

                items={items}

            />

        </Drawer>

    );

}

export default React.memo(PurchaseDrawer);