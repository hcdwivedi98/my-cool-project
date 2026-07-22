import PropTypes from "prop-types";
import { Flex } from "antd";

import {
    AppInput,
    AppLookupSelect,
    AppButton
} from "@/components/common";

import {
    CENTER_STATUS,
    CENTER_TYPES
} from "../constants/centerLookup";

function CenterFilterBar({

    filters,

    onChange,

    onReset

}) {

    const handleChange = (field, value) => {

        onChange?.({

            ...filters,

            [field]: value

        });

    };
    return (

        <Flex
            gap={12}
            wrap
            align="center"
        >

            <AppInput.Search

                allowClear

                placeholder="Search Center"

                value={filters?.search}

                style={{ width: 260 }}

                onChange={(e) =>

                    handleChange("search", e.target.value)

                }

            />

            <AppLookupSelect

                allowClear

                style={{ width: 180 }}

                placeholder="Status"

                options={CENTER_STATUS}

                value={filters?.status}

                onChange={(value) =>

                    handleChange("status", value)

                }

            />

            <AppLookupSelect

                allowClear

                style={{ width: 220 }}

                placeholder="Center Type"

                options={CENTER_TYPES}

                value={filters?.centerType}

                onChange={(value) =>

                    handleChange("centerType", value)

                }

            />

            <AppButton

                onClick={onReset}

            >

                Reset

            </AppButton>

        </Flex>

    );

}

CenterFilterBar.propTypes = {

    filters: PropTypes.object,

    onChange: PropTypes.func,

    onReset: PropTypes.func

};

export default CenterFilterBar;