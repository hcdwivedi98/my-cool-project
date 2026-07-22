// src/components/common/form/AppFormSection/AppFormSection.jsx

import PropTypes from "prop-types";
import { Divider } from "antd";

function AppFormSection({
    title,
    children,
    extra,
    style,
}) {
    return (
        <section
            style={{
                marginBottom: 24,
                ...style,
            }}
        >
            {title && (
                <Divider
                    orientation="left"
                    style={{
                        marginTop: 0,
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Divider>
            )}

            {extra}

            {children}
        </section>
    );
}

AppFormSection.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    extra: PropTypes.node,
    style: PropTypes.object,
};

export default AppFormSection;