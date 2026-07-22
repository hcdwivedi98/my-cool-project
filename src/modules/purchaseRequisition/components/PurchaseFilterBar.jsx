import React from "react";

import {
    SearchOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import {
    AppToolbar,
} from "../../../components/common/layout";

import {
    AppButton,
} from "../../../components/common/buttons";

import {
    AppInput,
    AppSelect,
    AppDatePicker,
} from "../../../components/common/form";

function PurchaseFilterBar({

    filters,

    setFilters,

    lookups = {},

    onReset,

}) {

    return (

        <AppToolbar

            left={

                <>

                    <AppInput

                        variant="search"

                        placeholder="Search PR No / Remarks..."

                        prefix={<SearchOutlined />}

                        allowClear

                        style={{ width: 340 }}

                        value={filters.search}

                        onChange={(e) =>

                            setFilters(prev => ({

                                ...prev,

                                search: e.target.value,

                            }))

                        }

                    />

                    <AppSelect

                        placeholder="Center"

                        style={{ width: 180 }}

                        allowClear

                        options={lookups.centers}

                        value={filters.centerId}

                        onChange={(value) =>

                            setFilters(prev => ({

                                ...prev,

                                centerId: value,

                            }))

                        }

                    />

                    <AppSelect

                        placeholder="Store"

                        style={{ width: 200 }}

                        allowClear

                        options={lookups.stores}

                        value={filters.storeId}

                        onChange={(value) =>

                            setFilters(prev => ({

                                ...prev,

                                storeId: value,

                            }))

                        }

                    />

                    <AppSelect

                        placeholder="Status"

                        style={{ width: 180 }}

                        allowClear

                        options={[

                            {

                                label: "Draft",

                                value: "Draft",

                            },

                            {

                                label: "Pending Approval",

                                value: "Pending Approval",

                            },

                            {

                                label: "Approved",

                                value: "Approved",

                            },

                            {

                                label: "Rejected",

                                value: "Rejected",

                            },

                        ]}

                        value={filters.status}

                        onChange={(value) =>

                            setFilters(prev => ({

                                ...prev,

                                status: value,

                            }))

                        }

                    />

                    <AppSelect

                        placeholder="Priority"

                        style={{ width: 170 }}

                        allowClear

                        options={[

                            {

                                label: "Routine",

                                value: "Routine",

                            },

                            {

                                label: "Urgent",

                                value: "Urgent",

                            },

                            {

                                label: "Emergency",

                                value: "Emergency",

                            },

                        ]}

                        value={filters.priority}

                        onChange={(value) =>

                            setFilters(prev => ({

                                ...prev,

                                priority: value,

                            }))

                        }

                    />

                    <AppDatePicker

                        placeholder="Required Date"

                        style={{ width: 170 }}

                        value={filters.requiredDate}

                        onChange={(date) =>

                            setFilters(prev => ({

                                ...prev,

                                requiredDate: date,

                            }))

                        }

                    />

                    <AppButton

                        icon={<ReloadOutlined />}

                        onClick={onReset}

                    >

                        Reset

                    </AppButton>

                </>

            }

        />

    );

}

export default React.memo(PurchaseFilterBar);