import React, {
    useEffect,
    useRef,
} from "react";

import {
    AutoComplete,
    Input,
    Tooltip,
} from "antd";

import {
    SearchOutlined,
    BarcodeOutlined,
} from "@ant-design/icons";

import useTableSearch from "./useTableSearch";

function AppTableSearch({

    value,

    onChange,

    onSearch,

    dataSource = [],

    searchKeys = [],

    placeholder = "Search...",

    debounce = 400,

    autoSearch = true,

    allowClear = true,

    autoFocus = false,

    disabled = false,

    loading = false,

    width = 320,

    rememberHistory = true,

    maxHistory = 10,

    showSuggestions = true,

    barcodeSupport = false,

    keyboardNavigation = true,

    onBarcode,

}) {

    const inputRef = useRef(null);

    const {

        searchValue,

        suggestions,

        handleChange,

        handleSearch,

        handleKeyDown,

        loadHistory,

    } = useTableSearch({

        value,

        onChange,

        onSearch,

        dataSource,

        searchKeys,

        debounce,

        autoSearch,

        rememberHistory,

        maxHistory,

    });

    useEffect(() => {

        if (rememberHistory) {

            loadHistory();

        }

    }, []);

    useEffect(() => {

        const listener = (e) => {

            if (

                keyboardNavigation &&

                e.ctrlKey &&

                e.key.toLowerCase() === "k"

            ) {

                e.preventDefault();

                inputRef.current?.focus();

            }

        };

        window.addEventListener(

            "keydown",

            listener

        );

        return () =>

            window.removeEventListener(

                "keydown",

                listener

            );

    }, [keyboardNavigation]);

    return (

        <AutoComplete

            style={{

                width,

            }}

            options={

                showSuggestions

                    ? suggestions

                    : []

            }

            value={searchValue}

            onSelect={handleSearch}

        >

            <Input

                ref={inputRef}

                value={searchValue}

                allowClear={allowClear}

                autoFocus={autoFocus}

                disabled={disabled}

                placeholder={placeholder}

                prefix={

                    <SearchOutlined />

                }

                suffix={

                    barcodeSupport && (

                        <Tooltip

                            title="Barcode Scanner Supported"

                        >

                            <BarcodeOutlined />

                        </Tooltip>

                    )

                }

                onChange={handleChange}

                onPressEnter={() =>

                    handleSearch(searchValue)

                }

                onKeyDown={handleKeyDown}

            />

        </AutoComplete>

    );

}

export default React.memo(AppTableSearch);