import PropTypes from "prop-types";

import {
    AppButton,
    AppPageHeader,
} from "@/components/common";

function DepartmentHeader({
    onAdd,
    onRefresh,
    onExport,
}) {
    return (
        <AppPageHeader
            title="Department Master"
            subTitle="Manage hospital departments"
            extra={[
                <AppButton
                    key="refresh"
                    onClick={onRefresh}
                >
                    Refresh
                </AppButton>,

                <AppButton
                    key="export"
                    onClick={onExport}
                >
                    Export
                </AppButton>,

                <AppButton
                    key="add"
                    type="primary"
                    onClick={onAdd}
                >
                    Add Department
                </AppButton>,
            ]}
        />
    );
}

DepartmentHeader.propTypes = {
    onAdd: PropTypes.func,
    onRefresh: PropTypes.func,
    onExport: PropTypes.func,
};

export default DepartmentHeader;