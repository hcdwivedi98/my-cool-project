import React from "react";
import PropTypes from "prop-types";
import { Card, Space, Breadcrumb } from "antd";

function AppMasterPage({
    title,
    subtitle,
    breadcrumbs,
    headerExtra,
    toolbar,
    filters,
    footer,
    children,
    style,
}) {
    return (
        <div style={style}>
            <Space
                direction="vertical"
                size={16}
                style={{ width: "100%" }}
            >
                {title}

                {subtitle}

                {breadcrumbs?.length > 0 && (
                    <Breadcrumb items={breadcrumbs} />
                )}

                {headerExtra}

                {toolbar}

                {filters}

                <Card
                    bordered={false}
                    styles={{
                        body: {
                            padding: 0,
                        },
                    }}
                >
                    {children}
                </Card>

                {footer}
            </Space>
        </div>
    );
}

AppMasterPage.propTypes = {
    title: PropTypes.node,
    subtitle: PropTypes.node,
    breadcrumbs: PropTypes.node,
    headerExtra: PropTypes.node,
    toolbar: PropTypes.node,
    filters: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node,
    style: PropTypes.object,
};

export default React.memo(AppMasterPage);