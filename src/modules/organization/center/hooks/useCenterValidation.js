import dayjs from "dayjs";

export const validateGST = (gst) => {
    if (!gst) return true;

    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(gst);
};

export const validatePAN = (pan) => {
    if (!pan) return true;

    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
};

export const validatePhone = (mobile) => {
    if (!mobile) return true;

    return /^[6-9][0-9]{9}$/.test(mobile);
};

export const validatePinCode = (pin) => {
    if (!pin) return true;

    return /^[1-9][0-9]{5}$/.test(pin);
};

export const validateIssueExpiry = (
    issueDate,
    expiryDate
) => {
    if (!issueDate || !expiryDate) return true;

    return dayjs(expiryDate).isAfter(dayjs(issueDate));
};