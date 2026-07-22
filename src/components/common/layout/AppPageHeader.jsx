import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import "./AppPageHeader.css";

const { Title, Text } = Typography;

function AppPageHeader({
    title,
    subtitle,
    extra,
    style,
}) {
    return (
        <div
            className="erp-page-header"
            style={style}
        >
            <div className="erp-page-header-left">
                <Title level={2} style={{ marginBottom: 0 }}>
                    {title}
                </Title>

                {subtitle && (
                    <Text type="secondary">
                        {subtitle}
                    </Text>
                )}
            </div>

            <div className="erp-page-header-right">
                {extra}
            </div>
        </div>
    );
}

AppPageHeader.propTypes = {
    title: PropTypes.node,
    subtitle: PropTypes.node,
    extra: PropTypes.node,
    style: PropTypes.object,
};

export default React.memo(AppPageHeader);