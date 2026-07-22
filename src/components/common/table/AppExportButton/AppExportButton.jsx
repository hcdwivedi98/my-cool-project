import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";
import {
    DownloadOutlined,
} from "@ant-design/icons";

function AppExportButton({
    onExcel,
    onCSV,
    onPDF,
}) {
    const items = [
        {
            key: "excel",
            label: "Export Excel",
            onClick: onExcel,
        },
        {
            key: "csv",
            label: "Export CSV",
            onClick: onCSV,
        },
        {
            key: "pdf",
            label: "Export PDF",
            onClick: onPDF,
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
        >
            <Button
                icon={<DownloadOutlined />}
            >
                Export
            </Button>
        </Dropdown>
    );
}

AppExportButton.propTypes = {
    onExcel: PropTypes.func,
    onCSV: PropTypes.func,
    onPDF: PropTypes.func,
};

export default React.memo(AppExportButton);