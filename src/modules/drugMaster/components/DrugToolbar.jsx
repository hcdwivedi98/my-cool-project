import React, { memo } from "react";

import { Space } from "antd";

import {
    AppButton,
} from "../../../components/common/buttons";

import {
    AppTableToolbar,
} from "../../../components/common/table";

function DrugToolbar({

    loading = false,

    selectedRowKeys = [],

    onAdd,

    onImport,

    onExportExcel,

    onExportPdf,

    onRefresh,

    onBulkDelete,

    onBulkActivate,

    onBulkDeactivate,

}) {

    const hasSelection = selectedRowKeys.length > 0;

    return (

        <AppTableToolbar

            left={

                <Space>

                    <AppButton

                        type="primary"

                        onClick={onAdd}

                    >

                        Add Drug

                    </AppButton>

                    <AppButton

                        onClick={onImport}

                    >

                        Import

                    </AppButton>

                    <AppButton

                        onClick={onExportExcel}

                    >

                        Export Excel

                    </AppButton>

                    <AppButton

                        onClick={onExportPdf}

                    >

                        Export PDF

                    </AppButton>

                    <AppButton

                        loading={loading}

                        onClick={onRefresh}

                    >

                        Refresh

                    </AppButton>

                </Space>

            }

            right={

                hasSelection && (

                    <Space>

                        <AppButton

                            onClick={onBulkActivate}

                        >

                            Activate

                        </AppButton>

                        <AppButton

                            onClick={onBulkDeactivate}

                        >

                            Deactivate

                        </AppButton>

                        <AppButton

                            danger

                            onClick={onBulkDelete}

                        >

                            Delete

                        </AppButton>

                    </Space>

                )

            }

        />

    );

}

export default memo(DrugToolbar);