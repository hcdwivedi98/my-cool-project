import React from "react";

import {

    Drawer,

    Divider,

} from "antd";

import ColumnSearch from "./ColumnSearch";
import ColumnActions from "./ColumnActions";
import ColumnList from "./ColumnList";
import useColumnChooser from "./useColumnChooser";

function AppTableColumnChooser({

    open,

    onClose,

    moduleName,

    columns,

}) {

    const {

        search,

        setSearch,

        visibleColumns,

        toggleColumn,

        apply,

        reset,

        selectAll,

        clearAll,

    } = useColumnChooser({

        moduleName,

        columns,

    });

    return (

        <Drawer

            open={open}

            width={360}

            title="Column Chooser"

            onClose={onClose}

        >

            <ColumnSearch

                value={search}

                onChange={setSearch}

            />

            <Divider />

            <ColumnActions

                totalColumns={

                    columns.length

                }

                selectedColumns={

                    visibleColumns.length

                }

                onSelectAll={

                    selectAll

                }

                onClearAll={

                    clearAll

                }

                onReset={reset}

            />

            <Divider />

            <ColumnList

                columns={columns}

                keyword={search}

                visibleColumns={

                    visibleColumns

                }

                onToggle={toggleColumn}

            />

            <Divider />

            <div

                style={{

                    display: "flex",

                    justifyContent: "flex-end",

                    gap: 12,

                }}

            >

                <AppButton
                    onClick={onClose}
                >
                    Cancel
                </AppButton>

                <AppButton
                    type="primary"
                    onClick={() => {
                        apply();
                        onClose();
                    }}
                >
                    Apply
                </AppButton>

                <button

                    className="ant-btn ant-btn-primary"

                    onClick={() => {

                        apply();

                        onClose();

                    }}

                >

                    Apply

                </button>

            </div>

        </Drawer>

    );

}

export default React.memo(AppTableColumnChooser);