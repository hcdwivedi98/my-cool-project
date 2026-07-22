import React, { useState } from "react";
import { Space } from "antd";
import {
    PlusOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";

import PurchaseHeader from "../components/PurchaseHeader";
import PurchaseStats from "../components/PurchaseStats";
import PurchaseFilterBar from "../components/PurchaseFilterBar";
import PurchaseGrid from "../components/PurchaseGrid";
import PurchaseDrawer from "../components/PurchaseDrawer";

function PurchaseRequisition() {

    const [openDrawer, setOpenDrawer] = useState(false);

    const [loading] = useState(false);

    const [data] = useState([

        {
            key: 1,
            prNo: "PR-2026-0001",
            prDate: "01-Jul-2026",
            center: "Lucknow",
            store: "Main Pharmacy",
            priority: "Urgent",
            itemCount: 12,
            amount: 25000,
            status: "Draft",
            createdBy: "Harish",
        },

        {
            key: 2,
            prNo: "PR-2026-0002",
            prDate: "02-Jul-2026",
            center: "Lucknow",
            store: "Emergency Pharmacy",
            priority: "Routine",
            itemCount: 5,
            amount: 5400,
            status: "Pending Approval",
            createdBy: "Admin",
        },

        {
            key: 3,
            prNo: "PR-2026-0003",
            prDate: "03-Jul-2026",
            center: "Kanpur",
            store: "OT Pharmacy",
            priority: "Emergency",
            itemCount: 8,
            amount: 12000,
            status: "Approved",
            createdBy: "Harish",
        },

        {
            key: 4,
            prNo: "PR-2026-0004",
            prDate: "04-Jul-2026",
            center: "Lucknow",
            store: "Ward Pharmacy",
            priority: "Routine",
            itemCount: 4,
            amount: 3500,
            status: "Rejected",
            createdBy: "Admin",
        },

    ]);


    const [filters, setFilters] = useState({

        search: "",

        centerId: null,

        storeId: null,

        status: null,

        priority: null,

        requiredDate: null,

    });
    const lookups = {

    centers: [

        {
            label: "Lucknow Main Hospital",
            value: 1,
        },

        {
            label: "Kanpur Hospital",
            value: 2,
        },

    ],

    stores: [

        {
            label: "Main Pharmacy",
            value: 1,
        },

        {
            label: "Emergency Pharmacy",
            value: 2,
        },

        {
            label: "OT Pharmacy",
            value: 3,
        },

        {
            label: "Ward Pharmacy",
            value: 4,
        },

    ],

    subStores: [

        {
            label: "Ground Floor",
            value: 1,
        },

        {
            label: "First Floor",
            value: 2,
        },

        {
            label: "ICU Store",
            value: 3,
        },

    ],

    departments: [

        {
            label: "General Medicine",
            value: 1,
        },

        {
            label: "Emergency",
            value: 2,
        },

        {
            label: "ICU",
            value: 3,
        },

        {
            label: "Operation Theatre",
            value: 4,
        },

        {
            label: "Pediatrics",
            value: 5,
        },

    ],

    suppliers: [

        {
            label: "Sun Pharma",
            value: 1,
        },

        {
            label: "Cipla Ltd.",
            value: 2,
        },

        {
            label: "Dr. Reddy's",
            value: 3,
        },

        {
            label: "Abbott Healthcare",
            value: 4,
        },

        {
            label: "Zydus Lifesciences",
            value: 5,
        },

    ],

};
    return (

        <>

            <Space

                direction="vertical"

                size={16}

                style={{
                    width: "100%",
                }}

            >

                <PurchaseHeader

                    onAdd={() => setOpenDrawer(true)}

                    onImport={() => { }}

                    onExport={() => { }}

                    onRefresh={() => { }}

                />
                <PurchaseStats
                    data={data}
                />

                <PurchaseFilterBar

                    filters={filters}

                    setFilters={setFilters}

                    lookups={lookups}

                    onReset={() =>

                        setFilters({

                            search: "",

                            centerId: null,

                            storeId: null,

                            status: null,

                            priority: null,

                            requiredDate: null,

                        })

                    }

                />

                <PurchaseGrid

                    dataSource={data}

                    loading={loading}

                    pagination={{

                        current: 1,

                        pageSize: 10,

                        total: data.length,

                    }}

                    onView={(record) => console.log(record)}

                    onEdit={(record) => console.log(record)}

                    onClone={(record) => console.log(record)}

                    onSubmit={(record) => console.log(record)}

                />

            </Space>

            <PurchaseDrawer

    open={openDrawer}

    loading={loading}

    requisition={null}

    lookups={lookups}

    onClose={() => setOpenDrawer(false)}

    onSaveDraft={() => console.log("Draft")}

    onSubmit={() => console.log("Submit")}

/>
        </>

    );

}

export default PurchaseRequisition;