import React from "react";

import {
    AutoComplete,
    Spin,
    Typography,
} from "antd";

import {
    BarcodeOutlined,
    SearchOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


const MedicineSearch = ({
    value = "",

    options = [],

    loading = false,

    batchLoading = false,

    inputRef,

    onSearch,

    onSelect,
}) => {

    return (

        <div
            className="billing-medicine-search"
        >

            <div
                className="billing-search-label"
            >

                <SearchOutlined />

                <Text strong>
                    Medicine Search
                </Text>

                <Text type="secondary">
                    F2
                </Text>

            </div>


            <AutoComplete

                value={
                    value
                }

                options={
                    options
                }

                onSearch={
                    onSearch
                }

                onSelect={
                    onSelect
                }

                style={{
                    width:
                        "100%",
                }}

                notFoundContent={
                    loading ||
                    batchLoading
                        ? (
                            <Spin
                                size="small"
                            />
                        )
                        : null
                }

            >

                <div
                    className="billing-barcode-input"
                >

                    <BarcodeOutlined />

                    <input
                        ref={
                            inputRef
                        }

                        placeholder="Scan barcode or search medicine name / code..."

                        autoComplete="off"

                    />

                </div>

            </AutoComplete>

        </div>

    );

};


export default MedicineSearch;