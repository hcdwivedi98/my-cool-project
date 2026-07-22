import React from "react";

import {
    Dropdown,
} from "antd";

import {
    DownloadOutlined,
    FileExcelOutlined,
    FilePdfOutlined,
    PrinterOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

import { AppButton } from "../../buttons";

function AppTableExport({

    onExcel,

    onCsv,

    onPdf,

    onPrint,

}) {

    const items = [

        {

            key: "excel",

            icon: <FileExcelOutlined />,

            label: "Export Excel",

            onClick: onExcel,

        },

        {

            key: "csv",

            icon: <FileTextOutlined />,

            label: "Export CSV",

            onClick: onCsv,

        },

        {

            key: "pdf",

            icon: <FilePdfOutlined />,

            label: "Export PDF",

            onClick: onPdf,

        },

        {

            type: "divider",

        },

        {

            key: "print",

            icon: <PrinterOutlined />,

            label: "Print",

            onClick: onPrint,

        },

    ];

    return (

        <Dropdown

            trigger={["click"]}

            menu={{

                items,

                onClick: ({ key }) => {

                    const item = items.find(

                        x => x.key === key

                    );

                    item?.onClick?.();

                },

            }}

        >

            <span>

                <AppButton

                    icon={<DownloadOutlined />}

                >

                    Export

                </AppButton>

            </span>

        </Dropdown>

    );

}

export default React.memo(AppTableExport);