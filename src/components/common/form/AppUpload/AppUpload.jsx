import React from "react";
import PropTypes from "prop-types";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function AppUpload({
    buttonText = "Upload",
    ...props
}) {
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>
                {buttonText}
            </Button>
        </Upload>
    );
}

AppUpload.propTypes = {
    buttonText: PropTypes.string,
};

export default React.memo(AppUpload);