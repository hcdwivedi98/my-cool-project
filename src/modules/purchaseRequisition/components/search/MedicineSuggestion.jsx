import React from "react";

import {
    List,
    Tag,
    Typography,
    Empty,
} from "antd";

import {
    MedicineBoxOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function MedicineSuggestion({

    medicines = [],

    loading = false,

    selectedIndex = 0,

    onSelect,

}) {

    //--------------------------------------------------

    if (!loading && medicines.length === 0) {

        return (

            <div
                style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 8,
                    marginTop: 8,
                    background: "#fff",
                }}
            >

                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No Medicine Found"
                />

            </div>

        );

    }

    //--------------------------------------------------

    return (

        <div

            style={{

                marginTop: 8,

                border: "1px solid #f0f0f0",

                borderRadius: 8,

                background: "#fff",

                maxHeight: 380,

                overflowY: "auto",

            }}

        >

            <List

                dataSource={medicines}

                renderItem={(item, index) => (

                    <List.Item

                        onClick={() =>

                            onSelect?.(item)

                        }

                        style={{

                            cursor: "pointer",

                            padding: "10px 16px",

                            background:

                                selectedIndex === index

                                    ? "#e6f4ff"

                                    : "#fff",

                            transition: ".2s",

                        }}

                    >

                        <div

                            style={{

                                display: "flex",

                                justifyContent: "space-between",

                                alignItems: "center",

                                width: "100%",

                            }}

                        >

                            {/* Left */}

                            <div>

                                <Text strong>

                                    {item.itemCode}

                                </Text>

                                <br />

                                <Text>

                                    {item.itemName}

                                </Text>

                                <br />

                                <Text type="secondary">

                                    {item.genericName}

                                </Text>

                            </div>

                            {/* Right */}

                            <div

                                style={{

                                    display: "flex",

                                    gap: 8,

                                    alignItems: "center",

                                }}

                            >

                                <Tag color="blue">

                                    {item.uom || "TAB"}

                                </Tag>

                                <Tag

                                    color={

                                        item.stock > 100

                                            ? "green"

                                            : item.stock > 20

                                                ? "gold"

                                                : item.stock > 0

                                                    ? "volcano"

                                                    : "red"

                                    }

                                >
                                    Stock : {item.stock}

                                </Tag>

                            </div>

                        </div>

                    </List.Item>
                )}
            />
        </div>
    );
}
export default React.memo(MedicineSuggestion);