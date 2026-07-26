import { Col, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
    AppSection,
    AppFormItem,
    AppButton
} from "@/components/common";

const DocumentSection = ({ isView }) => {

    return (

        <AppSection title="Documents">

            <Row gutter={[16, 16]}>

                <Col span={24}>

                    <AppFormItem
                        name="documents"
                        label="Upload Documents"
                    >
                        <Upload
                            multiple
                            disabled={isView}
                            beforeUpload={() => false}
                        >
                            <AppButton
                                icon={<UploadOutlined />}
                                disabled={isView}
                            >
                                Upload Documents
                            </AppButton>
                        </Upload>

                    </AppFormItem>

                </Col>

            </Row>

        </AppSection>

    );

};

export default DocumentSection;