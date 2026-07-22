import React, { memo } from "react";

import { Space } from "antd";

import {
    AppFilterPanel,
} from "../../../components/common/layout";

import {
    AppInput,
    AppSelect,
    AppSwitch,
} from "../../../components/common/form";

import {
    AppButton,
} from "../../../components/common/buttons";

function SupplierFilter({

    filters = {},

    lookups = {},

    loading = false,

    onChange,

    onSearch,

    onReset,

}) {

    //--------------------------------------------------

    const handleChange = (field, value) => {

        onChange?.({

            ...filters,

            [field]: value,

        });

    };

    //--------------------------------------------------

    return (

        <AppFilterPanel>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

                <AppInput.Search

                    allowClear

                    placeholder="Search Supplier"

                    value={filters.search}

                    onChange={(e) =>

                        handleChange(

                            "search",

                            e.target.value

                        )

                    }

                    onSearch={onSearch}

                />

                <AppSelect

                    allowClear

                    showSearch

                    placeholder="Supplier Type"

                    options={

                        lookups.supplierTypes || []

                    }

                    value={filters.supplierType}

                    onChange={(value) =>

                        handleChange(

                            "supplierType",

                            value

                        )

                    }

                />

                <AppSelect

                    allowClear

                    showSearch

                    placeholder="State"

                    options={

                        lookups.states || []

                    }

                    value={filters.stateId}

                    onChange={(value) =>

                        handleChange(

                            "stateId",

                            value

                        )

                    }

                />

                <AppSelect

                    allowClear

                    showSearch

                    placeholder="City"

                    options={

                        lookups.cities || []

                    }

                    value={filters.cityId}

                    onChange={(value) =>

                        handleChange(

                            "cityId",

                            value

                        )

                    }

                />

                <AppSelect

                    allowClear

                    showSearch

                    placeholder="Payment Type"

                    options={

                        lookups.paymentTypes || []

                    }

                    value={filters.paymentType}

                    onChange={(value) =>

                        handleChange(

                            "paymentType",

                            value

                        )

                    }

                />

                <div className="flex items-center">

                    <AppSwitch

                        checked={

                            filters.isActive

                        }

                        onChange={(checked) =>

                            handleChange(

                                "isActive",

                                checked

                            )

                        }

                    />

                    <span className="ml-2">

                        Active Only

                    </span>

                </div>

            </div>

            <div className="mt-4 flex justify-end">

                <Space>

                    <AppButton

                        onClick={onReset}

                    >

                        Reset

                    </AppButton>

                    <AppButton

                        type="primary"

                        loading={loading}

                        onClick={onSearch}

                    >

                        Search

                    </AppButton>

                </Space>

            </div>

        </AppFilterPanel>

    );

}

export default memo(SupplierFilter);