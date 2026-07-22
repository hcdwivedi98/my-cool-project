import PropTypes from "prop-types";

import LogoUpload from "../documents/LogoUpload";
import LicenseInformation from "../documents/LicenseInformation";
import ComplianceDocuments from "../documents/ComplianceDocuments";

function DocumentSection({
    form,
    readOnly = false,
    logo,
    onLogoChange,
}) {
    return (
        <>
            <LogoUpload
                value={logo}
                onChange={onLogoChange}
                readOnly={readOnly}
            />

            <LicenseInformation
                form={form}
                readOnly={readOnly}
            />

            <ComplianceDocuments
                form={form}
                readOnly={readOnly}
            />
        </>
    );
}
DocumentSection.propTypes = {
    form: PropTypes.object,
    readOnly: PropTypes.bool,
    logo: PropTypes.any,
    onLogoChange: PropTypes.func,
};

export default DocumentSection;