import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Dropdown, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";

function AppColumnSelector({
    columns = [],
    selectedKeys = [],
    onChange,
}) {
    const items = useMemo(() => {
        return columns
            .filter(col => col.key || col.dataIndex)
            .map(col => ({
                label: (
                    <Checkbox
                        checked={selectedKeys.includes(
                            col.key || col.dataIndex
                        )}
                        onChange={(e) => {
                            const key =
                                col.key || col.dataIndex;

                            if (e.target.checked) {
                                onChange([
                                    ...selectedKeys,
                                    key,
                                ]);
                            } else {
                                onChange(
                                    selectedKeys.filter(
                                        x => x !== key
                                    )
                                );
                            }
                        }}
                    >
                        {col.title}
                    </Checkbox>
                ),
                key:
                    col.key || col.dataIndex,
            }));
    }, [columns, selectedKeys]);

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
        >
            <Button
                icon={<SettingOutlined />}
            >
                Columns
            </Button>
        </Dropdown>
    );
}

AppColumnSelector.propTypes = {
    columns: PropTypes.array,
    selectedKeys: PropTypes.array,
    onChange: PropTypes.func,
};

export default React.memo(AppColumnSelector);