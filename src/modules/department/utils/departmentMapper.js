import { DEPARTMENT_TYPES } from "../constants/department.constants";

/**
 * Convert API Response -> Form Values
 */
export function mapApiToForm(data = {}) {
    return {
        id: data.id ?? null,

        code: data.code ?? "",
        name: data.name ?? "",

        centerId: data.centerId ?? null,

        departmentType:
            data.departmentType ?? null,

        parentDepartmentId:
            data.parentDepartmentId ?? null,

        contactPerson:
            data.contactPerson ?? "",

        designation:
            data.designation ?? "",

        phoneNumber:
            data.phoneNumber ?? "",

        mobileNumber:
            data.mobileNumber ?? "",

        extensionNumber:
            data.extensionNumber ?? "",

        email:
            data.email ?? "",

        alternateEmail:
            data.alternateEmail ?? "",

        emergencyContactName:
            data.emergencyContactName ?? "",

        emergencyContactNumber:
            data.emergencyContactNumber ?? "",

        building:
            data.building ?? null,

        floor:
            data.floor ?? null,

        wing:
            data.wing ?? "",

        block:
            data.block ?? "",

        roomNumber:
            data.roomNumber ?? "",

        locationCode:
            data.locationCode ?? "",

        locationDescription:
            data.locationDescription ?? "",

        remarks:
            data.remarks ?? "",

        isActive:
            data.isActive ?? true,
    };
}

/**
 * Convert Form Values -> API Payload
 */
export function mapFormToApi(values = {}) {
    return {
        id: values.id,

        code: values.code?.trim(),

        name: values.name?.trim(),

        centerId: values.centerId,

        departmentType:
            values.departmentType,

        parentDepartmentId:
            values.parentDepartmentId,

        contactPerson:
            values.contactPerson?.trim(),

        designation:
            values.designation?.trim(),

        phoneNumber:
            values.phoneNumber?.trim(),

        mobileNumber:
            values.mobileNumber?.trim(),

        extensionNumber:
            values.extensionNumber?.trim(),

        email:
            values.email?.trim(),

        alternateEmail:
            values.alternateEmail?.trim(),

        emergencyContactName:
            values.emergencyContactName?.trim(),

        emergencyContactNumber:
            values.emergencyContactNumber?.trim(),

        building:
            values.building,

        floor:
            values.floor,

        wing:
            values.wing?.trim(),

        block:
            values.block?.trim(),

        roomNumber:
            values.roomNumber?.trim(),

        locationCode:
            values.locationCode?.trim(),

        locationDescription:
            values.locationDescription?.trim(),

        remarks:
            values.remarks?.trim(),

        isActive:
            values.isActive,
    };
}

/**
 * Table Mapping
 */
export function mapTableData(
    departments = []
) {
    return departments.map(
        (department, index) => ({
            key:
                department.id ??
                index,

            id:
                department.id,

            code:
                department.code,

            name:
                department.name,

            centerName:
                department.centerName,

            departmentType:
                getDepartmentTypeLabel(
                    department.departmentType
                ),

            phoneNumber:
                department.phoneNumber,

            email:
                department.email,

            isActive:
                department.isActive,

            raw:
                department,
        })
    );
}

/**
 * Status Text
 */
export function getDepartmentStatus(
    active
) {
    return active
        ? "Active"
        : "Inactive";
}

/**
 * Department Type Label
 */
export function getDepartmentTypeLabel(
    value
) {
    return (
        DEPARTMENT_TYPES.find(
            (item) =>
                item.value === value
        )?.label ?? value
    );
}