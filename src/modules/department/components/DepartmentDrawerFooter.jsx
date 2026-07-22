import { AppButton,  } from "@/components/common";
import {
    Space,
} from "antd";
const DepartmentDrawerFooter = ({
    loading = false,
    onCancel,
    onSave,
}) => {
    return (
        <Space>
            <AppButton onClick={onCancel}>
                Cancel
            </AppButton>

            <AppButton
                type="primary"
                loading={loading}
                onClick={onSave}
            >
                Save
            </AppButton>
        </Space>
    );
};

export default DepartmentDrawerFooter;