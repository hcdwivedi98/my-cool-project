import React from "react";

import {
    Row,
    Col,
    Checkbox,
} from "antd";

import {
    AppInput,
    AppSelect,
} from "../../../../components/common/form";

import {
    AppButton,
} from "../../../../components/common/buttons";

function SearchToolbar({

    keyword = "",

    setKeyword,

    filters = {},

    lookups = {},

    onChange,

    onReset,

}) {

    //-----------------------------------------------------

    function handleChange(field, value) {

        onChange?.({

            ...filters,

            [field]: value,

        });

    }
console.log("SearchToolbar Render");
console.log("keyword =", keyword);
console.log("setKeyword =", typeof setKeyword);
    //-----------------------------------------------------

    return (

        <Row
            gutter={[12, 12]}
            align="middle"
        >

            <Col flex="320px">

                <AppInput

                    variant="search"

                    placeholder="Search Medicine"

                    value={keyword}

                    onChange={(e) => {

                        console.log("INPUT EVENT:", e);

                        console.log("VALUE:", e?.target?.value);

                        setKeyword(e.target.value);

                    }}

                />

            </Col>

            <Col>

                <AppSelect

                    placeholder="Category"

                    style={{ width: 180 }}

                    allowClear

                    value={filters.categoryId}

                    options={lookups.categories}

                    onChange={(value) =>

                        handleChange(

                            "categoryId",

                            value

                        )

                    }

                />

            </Col>

            <Col>

                <AppSelect

                    placeholder="Manufacturer"

                    style={{ width: 220 }}

                    allowClear

                    value={filters.manufacturerId}

                    options={lookups.manufacturers}

                    onChange={(value) =>

                        handleChange(

                            "manufacturerId",

                            value

                        )

                    }

                />

            </Col>

            <Col>

                <AppSelect

                    placeholder="Store"

                    style={{ width: 180 }}

                    allowClear

                    value={filters.storeId}

                    options={lookups.stores}

                    onChange={(value) =>

                        handleChange(

                            "storeId",

                            value

                        )

                    }

                />

            </Col>

            <Col>

                <Checkbox

                    checked={filters.availableOnly}

                    onChange={(e) =>

                        handleChange(

                            "availableOnly",

                            e.target.checked

                        )

                    }

                >

                    Only Available

                </Checkbox>

            </Col>

            <Col>

                <AppButton

                    onClick={onReset}

                >

                    Reset

                </AppButton>

            </Col>

        </Row>

    );

}

export default React.memo(SearchToolbar);