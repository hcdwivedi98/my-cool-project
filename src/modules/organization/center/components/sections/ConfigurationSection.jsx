import ConfigurationInformation from "../configuration/ConfigurationInformation";

function ConfigurationSection({ readOnly }) {
    return (
        <ConfigurationInformation
            readOnly={readOnly}
        />
    );
}

export default ConfigurationSection;