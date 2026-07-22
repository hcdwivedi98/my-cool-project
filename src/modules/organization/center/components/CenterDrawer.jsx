import PropTypes from "prop-types";

import { AppDrawer } from "@/components/common";

import CenterForm from "./CenterForm";

function CenterDrawer({
    open,
    mode = "create",
    record = null,
    loading = false,
    saving = false,
    onClose,
    onSave,
}) {
    const drawerTitle = {
        create: "Add Center",
        edit: "Edit Center",
        view: "View Center",
    };

    return (
        <AppDrawer
            open={open}
            title={drawerTitle[mode]}
            onClose={onClose}
            width={820}
            loading={saving}
            destroyOnClose
            maskClosable={false}
            keyboard={false}
            footer={false}
        >
            <CenterForm
                mode={mode}
                initialValues={record}
                loading={loading}
                saving={saving}
                onCancel={onClose}
                onSubmit={onSave}
            />
        </AppDrawer>
    );
}

CenterDrawer.propTypes = {
    open: PropTypes.bool,
    mode: PropTypes.oneOf([
        "create",
        "edit",
        "view",
    ]),
    record: PropTypes.object,
    loading: PropTypes.bool,
    saving: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};

export default CenterDrawer;