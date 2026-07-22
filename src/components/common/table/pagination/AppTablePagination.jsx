import React from "react";

import {

    Row,

    Col,

    Pagination,

} from "antd";

import PaginationInfo from "./PaginationInfo";

function AppTablePagination({

    total,

    current,

    pageSize,

    onChange,

}) {

    return (

        <Row

            justify="space-between"

            align="middle"

        >

            <Col>

                <PaginationInfo

                    total={total}

                    current={current}

                    pageSize={pageSize}

                />

            </Col>

            <Col>

                <Pagination

                    current={current}

                    total={total}

                    pageSize={pageSize}

                    showQuickJumper

                    showSizeChanger

                    pageSizeOptions={[

                        10,

                        20,

                        50,

                        100,

                        200,

                    ]}

                    onChange={onChange}

                />

            </Col>

        </Row>

    );

}

export default React.memo(

    AppTablePagination

);