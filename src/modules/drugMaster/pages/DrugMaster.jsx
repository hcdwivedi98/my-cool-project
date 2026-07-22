import React, { useState } from "react";

import {
    AppPageHeader,
    AppToolbar,
} from "../../../components/common/layout";

import {
    AppButton,
} from "../../../components/common/buttons";

import {
    AppInput,
    AppSelect,
} from "../../../components/common/form";

import DrugGrid from "../components/DrugGrid";
import DrugDrawer from "../components/DrugDrawer";
import DrugStats from "../components/DrugStats";
import useDrugMaster from "../hooks/useDrugMaster";
import {
    SearchOutlined,
    PlusOutlined,
    ImportOutlined,
    ExportOutlined,
    ReloadOutlined,
} from "@ant-design/icons";


function DrugMaster() {

    const vm = useDrugMaster();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [selectedDrug, setSelectedDrug] = useState(null);


    //--------------------------------------------------

    function handleAdd() {

        setSelectedDrug(null);

        setDrawerOpen(true);

    }

    //--------------------------------------------------

    function handleEdit(record) {

        setSelectedDrug(record);

        setDrawerOpen(true);

    }

    //--------------------------------------------------

    function handleClose() {

        setDrawerOpen(false);

    }

    //--------------------------------------------------

    async function handleSave(values) {

        await vm.save(values);

        handleClose();

    }

    //--------------------------------------------------

    async function handleDelete(record) {

        await vm.remove(record.id);

    }

    //--------------------------------------------------

    return (
        <div
            className="erp-page"
            style={{
                width: "100%",
            }}
        >


            <AppPageHeader
                title="Drug Master"
                subtitle="Manage Medicines"

                extra={
                    <>
                        <AppButton
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Add Drug
                        </AppButton>

                        <AppButton icon={<ImportOutlined />}>
                            Import
                        </AppButton>

                        <AppButton icon={<ExportOutlined />}>
                            Export
                        </AppButton>

                        <AppButton
                            icon={<ReloadOutlined />}
                            onClick={vm.refresh}
                        >
                            Refresh
                        </AppButton>
                    </>
                }
            />
            <DrugStats
                stats={vm.stats}
            />
            <AppToolbar
                left={
                    <>
                        <AppInput
                            placeholder="Search Medicine..."
                            prefix={<SearchOutlined />}
                            allowClear
                            style={{ width: 360 }}
                            value={vm.filters.search}
                            onChange={(e) =>
                                vm.setFilters((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                        />

                        <AppSelect
                            placeholder="Category"
                            style={{ width: 180 }}
                            allowClear
                            options={vm.lookups.categories}
                        />

                        <AppSelect
                            placeholder="Manufacturer"
                            style={{ width: 220 }}
                            allowClear
                            options={vm.lookups.manufacturers}
                        />

                        <AppSelect
                            placeholder="Status"
                            style={{ width: 150 }}
                            allowClear
                            options={[
                                {
                                    label: "Active",
                                    value: true,
                                },
                                {
                                    label: "Inactive",
                                    value: false,
                                },
                            ]}
                        />

                        <AppButton onClick={vm.resetFilters}>
                            Reset
                        </AppButton>
                    </>
                }
            />

            <DrugGrid

                loading={vm.loading}

                dataSource={vm.drugs}

                pagination={{

                    current: vm.pagination.current,

                    pageSize: vm.pagination.pageSize,

                    total: vm.total,

                }}

                onChange={(pagination) =>

                    vm.setPagination({

                        current:

                            pagination.current,

                        pageSize:

                            pagination.pageSize,

                    })

                }

                onEdit={handleEdit}

                onDelete={handleDelete}

            />


            <DrugDrawer

                open={drawerOpen}

                drug={selectedDrug}

                lookups={vm.lookups}

                loading={vm.saving}

                onClose={handleClose}

                onSave={handleSave}

            />


        </div>
    );

}

export default DrugMaster;