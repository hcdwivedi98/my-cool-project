import { Space } from "antd";
import {
    PlusOutlined,
    ReloadOutlined,
    DownloadOutlined
} from "@ant-design/icons";

import { AppButton } from "@/components/common";

const StoreToolbar = ({ onAdd }) => {

    return (

        <Space>

            <AppButton
                icon={<ReloadOutlined />}
            >
                Refresh
            </AppButton>

            <AppButton
                icon={<DownloadOutlined />}
            >
                Export
            </AppButton>

            <AppButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAdd}
            >
                Add Store
            </AppButton>

        </Space>

    );
};

export default StoreToolbar;