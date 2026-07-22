/**
 * Department Validation Utilities
 * --------------------------------
 * Enterprise reusable validation helpers
 */

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const EXTENSION_REGEX = /^[0-9]{1,10}$/;
const CODE_REGEX = /^[A-Za-z0-9_-]{2,20}$/;

/**
 * Department Code
 */
export function validateDepartmentCode(code) {
    if (!code)
        return "Department Code is required";

    if (!CODE_REGEX.test(code))
        return "Department Code must contain only letters, numbers, '-' or '_'";

    return null;
}

/**
 * Department Name
 */
export function validateDepartmentName(name) {
    if (!name)
        return "Department Name is required";

    if (name.trim().length < 3)
        return "Department Name must contain at least 3 characters";

    if (name.trim().length > 100)
        return "Department Name cannot exceed 100 characters";

    return null;
}

/**
 * Phone Number
 */
export function validatePhone(phone) {
    if (!phone) return null;

    if (!PHONE_REGEX.test(phone))
        return "Invalid Phone Number";

    return null;
}

/**
 * Mobile Number
 */
export function validateMobile(mobile) {
    if (!mobile)
        return "Mobile Number is required";

    if (!PHONE_REGEX.test(mobile))
        return "Invalid Mobile Number";

    return null;
}

/**
 * Email
 */
export function validateEmail(email) {
    if (!email) return null;

    if (!EMAIL_REGEX.test(email))
        return "Invalid Email Address";

    return null;
}

/**
 * Extension Number
 */
export function validateExtension(extension) {
    if (!extension) return null;

    if (!EXTENSION_REGEX.test(extension))
        return "Invalid Extension Number";

    return null;
}

/**
 * Location Validation
 */
export function validateLocation(values) {
    const errors = {};

    if (!values.building)
        errors.building = "Building is required";

    if (!values.floor)
        errors.floor = "Floor is required";

    return errors;
}

/**
 * Complete Department Validation
 */
export function validateDepartment(values) {
    const errors = {};

    const codeError = validateDepartmentCode(values.code);
    if (codeError) errors.code = codeError;

    const nameError = validateDepartmentName(values.name);
    if (nameError) errors.name = nameError;

    const mobileError = validateMobile(values.mobileNumber);
    if (mobileError)
        errors.mobileNumber = mobileError;

    const phoneError = validatePhone(values.phoneNumber);
    if (phoneError)
        errors.phoneNumber = phoneError;

    const emailError = validateEmail(values.email);
    if (emailError)
        errors.email = emailError;

    const alternateEmailError = validateEmail(
        values.alternateEmail
    );
    if (alternateEmailError)
        errors.alternateEmail =
            alternateEmailError;

    const extensionError = validateExtension(
        values.extensionNumber
    );
    if (extensionError)
        errors.extensionNumber =
            extensionError;

    Object.assign(
        errors,
        validateLocation(values)
    );

    return errors;
}

/**
 * Check Validation Result
 */
export function isDepartmentValid(values) {
    return (
        Object.keys(
            validateDepartment(values)
        ).length === 0
    );
}