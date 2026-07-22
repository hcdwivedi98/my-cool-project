import React, { memo } from "react";
import { Pagination } from "antd";

function AppTableFooter({

    pagination,

    onPaginationChange,

}) {

    if (!pagination) {

        return null;

    }

    const {

        current = 1,

        pageSize = 20,

        total = 0,

        pageSizeOptions = [10, 20, 50, 100],

        showSizeChanger = true,

        showQuickJumper = true,

        showLessItems = false,

    } = pagination;

    return (

        <div className="erp-table-footer">

            <Pagination

                current={current}

                pageSize={pageSize}

                total={total}

                pageSizeOptions={pageSizeOptions}

                showSizeChanger={showSizeChanger}

                showQuickJumper={showQuickJumper}

                showLessItems={showLessItems}

                showTotal={(total, range) =>

                    `${range[0]}-${range[1]} of ${total} records`

                }

                onChange={(page, size) =>

                    onPaginationChange?.({

                        current: page,

                        pageSize: size,

                    })

                }

            />

        </div>

    );

}

export default memo(AppTableFooter);