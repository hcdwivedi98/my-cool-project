import ContactInformation from "../contact/ContactInformation";

function ContactInformationSection({ readOnly }) {
    return (
        <ContactInformation
            readOnly={readOnly}
        />
    );
}

export default ContactInformationSection;