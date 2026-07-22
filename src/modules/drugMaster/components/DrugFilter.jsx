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

function DrugFilter({

    filters,

    lookups,

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">

                <AppInput.Search

                    placeholder="Search Medicine..."

                    allowClear

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

                    placeholder="Category"

                    allowClear

                    showSearch

                    options={lookups.categories}

                    value={filters.categoryId}

                    onChange={(value) =>

                        handleChange(

                            "categoryId",

                            value

                        )

                    }

                />

                <AppSelect

                    placeholder="Manufacturer"

                    allowClear

                    showSearch

                    options={lookups.manufacturers}

                    value={filters.manufacturerId}

                    onChange={(value) =>

                        handleChange(

                            "manufacturerId",

                            value

                        )

                    }

                />

                <AppSelect

                    placeholder="Generic"

                    allowClear

                    showSearch

                    options={lookups.generics}

                    value={filters.genericId}

                    onChange={(value) =>

                        handleChange(

                            "genericId",

                            value

                        )

                    }

                />

                <AppSelect

                    placeholder="Dosage Form"

                    allowClear

                    showSearch

                    options={lookups.dosageForms}

                    value={filters.dosageFormId}

                    onChange={(value) =>

                        handleChange(

                            "dosageFormId",

                            value

                        )

                    }

                />

                <div className="flex items-center">

                    <AppSwitch

                        checked={filters.isActive}

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

            <div className="flex justify-end mt-4">

                <Space>

                    <AppButton

                        onClick={onReset}

                    >

                        Reset

                    </AppButton>

                    <AppButton

                        type="primary"

                        onClick={onSearch}

                    >

                        Search

                    </AppButton>

                </Space>

            </div>

        </AppFilterPanel>

    );

}

export default memo(DrugFilter);