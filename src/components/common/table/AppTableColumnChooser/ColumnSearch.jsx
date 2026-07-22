import React, {
    useEffect,
    useState,
} from "react";

import {
    Input,
} from "antd";

import {
    SearchOutlined,
} from "@ant-design/icons";

function ColumnSearch({

    value = "",

    placeholder = "Search Columns...",

    debounce = 300,

    autoFocus = false,

    allowClear = true,

    disabled = false,

    onChange,

}) {

    const [

        keyword,

        setKeyword,

    ] = useState(value);

    useEffect(() => {

        setKeyword(value);

    }, [value]);

    useEffect(() => {

        const timer = setTimeout(() => {

            onChange?.(keyword);

        }, debounce);

        return () => clearTimeout(timer);

    }, [

        keyword,

        debounce,

        onChange,

    ]);

    return (

        <Input

            value={keyword}

            allowClear={allowClear}

            autoFocus={autoFocus}

            disabled={disabled}

            prefix={<SearchOutlined />}

            placeholder={placeholder}

            onChange={(e) =>

                setKeyword(

                    e.target.value

                )

            }

        />

    );

}

export default React.memo(ColumnSearch);