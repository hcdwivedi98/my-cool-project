import PropTypes from "prop-types";

import { AppButton } from "@/components/common";

function CenterDrawerFooter({
    loading = false,
    onCancel,
    onSave,
    mode = "create",
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
            }}
        >
            <AppButton onClick={onCancel}>
                Cancel
            </AppButton>

            {mode !== "view" && (
                <AppButton
                    type="primary"
                    loading={loading}
                    onClick={onSave}
                >
                    {mode === "edit"
                        ? "Update"
                        : "Save"}
                </AppButton>
            )}
        </div>
    );
}

CenterDrawerFooter.propTypes = {
    loading: PropTypes.bool,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
};

export default CenterDrawerFooter;