import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    AutoComplete,
    Typography,
    Tag,
} from "antd";

import {
    SearchOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function MedicineSearchBox({

    medicines = [],

    loading = false,

    placeholder,

    autoFocus = true,

    onSelect,

    onEnter,

}) {

    const inputRef = useRef(null);

    const [searchText, setSearchText] = useState("");

    const [options, setOptions] = useState([]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    //--------------------------------------------------
    // Auto Focus
    //--------------------------------------------------

    useEffect(() => {

        if (autoFocus) {

            setTimeout(() => {

                inputRef.current?.focus();

            }, 100);

        }

    }, [autoFocus]);

    //--------------------------------------------------
    // Debounce Search
    //--------------------------------------------------

    useEffect(() => {

        const timer = setTimeout(() => {

            const keyword = searchText
                .trim()
                .toLowerCase();

            if (!keyword) {

                setOptions([]);

                return;

            }

            const result = medicines

                .filter(item =>

                    item.itemCode
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    item.itemName
                        ?.toLowerCase()
                        .includes(keyword)

                    ||

                    item.genericName
                        ?.toLowerCase()
                        .includes(keyword)

                )

                .slice(0, 20)

                .map(item => ({

                    value: item.id.toString(),

                    label: (

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >

                            <div>

                                <Text strong>

                                    {item.itemCode}

                                </Text>

                                <br />

                                <Text>

                                    {item.itemName}

                                </Text>

                                <br />

                                <Text
                                    type="secondary"
                                >

                                    {item.genericName}

                                </Text>

                            </div>

                            <Tag
                                color={
                                    item.stock > 20
                                        ? "green"
                                        : item.stock > 0
                                            ? "orange"
                                            : "red"
                                }
                            >

                                {item.stock}

                            </Tag>

                        </div>

                    ),

                    item,

                }));

            setOptions(result);

            // Always highlight first item after every search
            setSelectedIndex(0);

        }, 300);

        return () => clearTimeout(timer);

    }, [

        searchText,

        medicines,

    ]);

    //--------------------------------------------------
    // Select
    //--------------------------------------------------

    function handleSelect(value, option) {

        onSelect?.(option.item);

        setSearchText("");

        setOptions([]);

        setTimeout(() => {

            inputRef.current?.focus();

        }, 50);

    }

    //--------------------------------------------------

    //--------------------------------------------------
// Keyboard Navigation
//--------------------------------------------------

function handleKeyDown(e) {

    if (options.length === 0) return;

    switch (e.key) {

        case "ArrowDown":

            e.preventDefault();

            setSelectedIndex(prev =>

                prev >= options.length - 1

                    ? 0

                    : prev + 1

            );

            break;

        case "ArrowUp":

            e.preventDefault();

            setSelectedIndex(prev =>

                prev <= 0

                    ? options.length - 1

                    : prev - 1

            );

            break;

        case "Enter":

            e.preventDefault();

            const selected = options[selectedIndex];

            if (!selected) return;

            handleSelect(

                selected.value,

                selected

            );

            break;

        case "Escape":

            setOptions([]);

            break;

        default:

            break;

    }

}
    return (

        <AutoComplete

            ref={inputRef}

            style={{

                width: "100%",

            }}

            value={searchText}

            options={options}

            //onSearch={setSearchText}

            onSelect={handleSelect}

            filterOption={false}

        >

            <input

    ref={inputRef}

    value={searchText}

    onChange={(e) =>

        setSearchText(

            e.target.value

        )

    }

    onKeyDown={handleKeyDown}

    style={{

        width: "100%",

        height: 38,

        borderRadius: 8,

        border: "1px solid #d9d9d9",

        padding: "0 12px",

        outline: "none",

    }}

    placeholder={placeholder}

/>

        </AutoComplete>

    );

}

export default React.memo(MedicineSearchBox);