import { Select } from "antd";
import { useMemo, useState } from "react";

import asyncDefaults from "./asyncDefaults";
import useAsyncOptions from "../../../../shared/lookups/useAsyncOptions";
import { normalizeAsyncOptions } from "./asyncUtils";

function AppAsyncSelect({

    service,

    placeholder,

    ...rest

}) {

    const [

        keyword,

        setKeyword

    ] = useState("");

    const {

        loading,

        options

    } = useAsyncOptions(

        service,

        keyword

    );

    const normalized = useMemo(

        () => normalizeAsyncOptions(options),

        [options]

    );

    return (

        <Select

            {...asyncDefaults}

            {...rest}

            loading={loading}

            options={normalized}

            placeholder={

                placeholder ??

                "Search..."

            }

            onSearch={setKeyword}

        />

    );

}

export default AppAsyncSelect;