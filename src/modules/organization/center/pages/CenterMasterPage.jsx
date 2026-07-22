import { useState } from "react";

import { AppMasterPage } from "@/components/common";

import CenterHeader from "../components/CenterHeader";
import CenterFilterBar from "../components/CenterFilterBar";
import CenterTable from "../components/CenterTable";
import CenterDrawer from "../components/CenterDrawer";

import centerMock from "../data/center.mock";

function CenterMasterPage() {

    const [loading] = useState(false);

    const [centers] = useState(centerMock);

    const [selectedRecord, setSelectedRecord] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [drawerMode, setDrawerMode] = useState("create");

    const [pagination] = useState({

        current: 1,

        pageSize: 20,

        total: centerMock.length

    });

    const handleAdd = () => {

        console.log("✅ Add Center Clicked");

        setDrawerMode("create");

        setSelectedRecord(null);

        setDrawerOpen(true);

    };

    const handleView = (record) => {

        setDrawerMode("view");

        setSelectedRecord(record);

        setDrawerOpen(true);

    };

    const handleEdit = (record) => {

        setDrawerMode("edit");

        setSelectedRecord(record);

        setDrawerOpen(true);

    };
    const handleSave = (values) => {

        console.log(values);

        setDrawerOpen(false);

    };

    const handleDelete = (record) => {

        console.log("Delete", record);

    };

    const handleStatusChange = (record, status) => {

        console.log(record, status);

    };

    const handleRefresh = () => {

        console.log("Refresh");

    };

    const handleCloseDrawer = () => {

        setDrawerOpen(false);

        setSelectedRecord(null);

    };

    return (

        <AppMasterPage

            title="Center Master"

            subtitle="Manage Hospital Centers"

            breadcrumbs={[

                {
                    title: "Organization"
                },

                {
                    title: "Center Master"
                }

            ]}

            headerExtra={

                <CenterHeader

                    onAdd={handleAdd}

                    onRefresh={handleRefresh}

                />

            }

            toolbar={

                <CenterFilterBar />

            }

            footer={

                <>Total Records : {pagination.total}</>

            }

        >

            <CenterTable

                data={centers}

                loading={loading}

                pagination={pagination}

                onView={handleView}

                onEdit={handleEdit}

                onDelete={handleDelete}

                onStatusChange={handleStatusChange}

            />

            <CenterDrawer

                open={drawerOpen}

                mode={drawerMode}

                record={selectedRecord}

                loading={false}

                saving={false}

                onClose={handleCloseDrawer}

                onSave={handleSave}

            />

        </AppMasterPage>

    );

}

export default CenterMasterPage;