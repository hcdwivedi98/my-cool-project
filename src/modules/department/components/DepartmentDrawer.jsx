import PropTypes from "prop-types";

import { AppDrawer } from "@/components/common";

import DepartmentForm from "./DepartmentForm";
import DepartmentDrawerFooter from "./DepartmentDrawerFooter";

const drawerTitle = {
    create: "Add Department",
    edit: "Edit Department",
    view: "View Department",
};

function DepartmentDrawer({
    open,
    mode = "create",
    loading = false,
    saving = false,
    initialValues,
    onClose,
    onSubmit,
}) {
    return (
        <AppDrawer
            open={open}
            width={1000}
            title={drawerTitle[mode]}
            onClose={onClose}
            footer={
                <DepartmentDrawerFooter
                    mode={mode}
                    loading={saving}
                    onCancel={onClose}
                    onSave={() =>
                        document
                            .getElementById("department-form")
                            ?.requestSubmit()
                    }
                />
            }
        >
            <DepartmentForm
                id="department-form"
                mode={mode}
                loading={loading}
                initialValues={initialValues}
                onSubmit={onSubmit}
            />
        </AppDrawer>
    );
}

DepartmentDrawer.propTypes = {
    initialValues: PropTypes.object,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf([
        "create",
        "edit",
        "view",
    ]),
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    saving: PropTypes.bool,
};

export default DepartmentDrawer;