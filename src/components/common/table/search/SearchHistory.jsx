import React from "react";

import {

    List,

    Typography,

    Button,

    Empty,

} from "antd";

const {

    Text,

} = Typography;

function SearchHistory({

    history = [],

    onSelect,

    onClear,

}) {

    if (

        history.length === 0

    ) {

        return <Empty description="No Search History" />;

    }

    return (

        <>

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    marginBottom: 12,

                }}

            >

                <Text strong>

                    Recent Searches

                </Text>

                <Button

                    type="link"

                    danger

                    onClick={onClear}

                >

                    Clear

                </Button>

            </div>

            <List

                size="small"

                dataSource={history}

                renderItem={(item) => (

                    <List.Item

                        style={{

                            cursor: "pointer",

                        }}

                        onClick={() =>

                            onSelect?.(

                                item

                            )

                        }

                    >

                        {item}

                    </List.Item>

                )}

            />

        </>

    );

}

export default React.memo(SearchHistory);