import AddressInformation from "../address/AddressInformation";

function AddressInformationSection({ readOnly }) {
    return (
        <AddressInformation
            readOnly={readOnly}
        />
    );
}

export default AddressInformationSection;