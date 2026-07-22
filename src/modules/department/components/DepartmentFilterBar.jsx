import PropTypes from "prop-types";

import {
    AppButton,
    AppInput,
    AppLookupSelect,
} from "@/components/common";

import {
    Row,
    Col,
    Space,
} from "antd";
import {
    DEPARTMENT_TYPES,
    STATUS_OPTIONS,
    SEARCH_PLACEHOLDER,
} from "../constants/department.constants";

function DepartmentFilterBar({
    filters,
    centerOptions = [],
    onChange,
    onReset,
}) {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={8}>
                <AppInput
                    allowClear
                    placeholder={SEARCH_PLACEHOLDER}
                    value={filters.search}
                    onChange={(e) =>
                        onChange("search", e.target.value)
                    }
                />
            </Col>

            <Col xs={24} sm={12} md={5} lg={5}>
                <AppLookupSelect
                    allowClear
                    placeholder="Center"
                    options={centerOptions}
                    value={filters.centerId}
                    onChange={(value) =>
                        onChange("centerId", value)
                    }
                />
            </Col>

            <Col xs={24} sm={12} md={5} lg={5}>
                <AppLookupSelect
                    allowClear
                    placeholder="Department Type"
                    options={DEPARTMENT_TYPES}
                    value={filters.departmentType}
                    onChange={(value) =>
                        onChange("departmentType", value)
                    }
                />
            </Col>

            <Col xs={24} sm={12} md={4} lg={4}>
                <AppLookupSelect
                    allowClear
                    placeholder="Status"
                    options={STATUS_OPTIONS}
                    value={filters.isActive}
                    onChange={(value) =>
                        onChange("isActive", value)
                    }
                />
            </Col>

            <Col
                xs={24}
                sm={12}
                md={2}
                lg={2}
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <AppButton onClick={onReset}>
                    Reset
                </AppButton>
            </Col>
        </Row>
    );
}

DepartmentFilterBar.propTypes = {
    filters: PropTypes.object.isRequired,
    centerOptions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default DepartmentFilterBar;