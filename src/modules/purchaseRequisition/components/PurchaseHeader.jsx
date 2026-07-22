import React from "react";

import {
    PlusOutlined,
    ImportOutlined,
    ExportOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import {
    AppPageHeader,
} from "../../../components/common/layout";

import {
    AppButton,
} from "../../../components/common/buttons";

function PurchaseHeader({

    onAdd,

    onImport,

    onExport,

    onRefresh,

}) {

    return (

        <AppPageHeader

            title="Purchase Requisition"

            subtitle="Create and manage medicine purchase requisitions"

            breadcrumb={[

                {
                    title: "Purchase",
                },

                {
                    title: "Purchase Requisition",
                },

            ]}

            extra={

                <>

                    <AppButton
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={onAdd}
                    >
                        Add Requisition
                    </AppButton>

                    <AppButton
                        icon={<ImportOutlined />}
                        onClick={onImport}
                    >
                        Import
                    </AppButton>

                    <AppButton
                        icon={<ExportOutlined />}
                        onClick={onExport}
                    >
                        Export
                    </AppButton>

                    <AppButton
                        icon={<ReloadOutlined />}
                        onClick={onRefresh}
                    >
                        Refresh
                    </AppButton>

                </>

            }

        />

    );

}

export default React.memo(PurchaseHeader);