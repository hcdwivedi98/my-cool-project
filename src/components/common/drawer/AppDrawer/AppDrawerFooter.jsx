import React from "react";
import PropTypes from "prop-types";
import { Space } from "antd";

import AppButton from "../../buttons/AppButton";

function AppDrawerFooter({
    loading,
    onCancel,
    onSave,
    cancelText,
    saveText,
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Space>
                <AppButton onClick={onCancel}>
                    {cancelText}
                </AppButton>

                <AppButton
                    type="primary"
                    loading={loading}
                    onClick={onSave}
                >
                    {saveText}
                </AppButton>
            </Space>
        </div>
    );
}

AppDrawerFooter.propTypes = {
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    cancelText: PropTypes.string,
    saveText: PropTypes.string,
};

export default React.memo(AppDrawerFooter);