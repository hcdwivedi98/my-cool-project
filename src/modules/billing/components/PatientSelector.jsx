// src/modules/billing/components/PatientSelector.jsx

import React, {
    useState,
} from "react";

import {
    AutoComplete,
    Button,
    Col,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Spin,
    Tag,
    Typography,
} from "antd";

import {
    PlusOutlined,
    UserOutlined,
    WarningOutlined,
} from "@ant-design/icons";


const {
    Text,
} = Typography;


/* =========================================================
   PATIENT SOURCE
   ========================================================= */

export const PATIENT_SOURCE = {
    HIS: "HIS",
    MANUAL: "MANUAL",
    WALK_IN: "WALK_IN",
};


/* =========================================================
   COMPONENT
   ========================================================= */

const PatientSelector = ({

    patientSearch = "",

    patientOptions = [],

    patientLoading = false,

    patientName = "",

    patientUHID = "",

    doctorName = "",

    billType = "RETAIL",

    patientSource = PATIENT_SOURCE.WALK_IN,

    hisEnabled = true,

    hisAvailable = true,

    allowManualPatient = true,

    allowWalkIn = true,

    manualPatient = {},

    onPatientSearch,

    onPatientSelect,

    onBillTypeChange,

    onManualPatientSave,

    onWalkIn,

}) => {

    /* =====================================================
       STATE
    ===================================================== */

    const [
        manualModalOpen,
        setManualModalOpen,
    ] = useState(false);


    const [
        manualName,
        setManualName,
    ] = useState(
        manualPatient?.patientName || ""
    );


    const [
        manualMobile,
        setManualMobile,
    ] = useState(
        manualPatient?.mobile || ""
    );


    const [
        manualAge,
        setManualAge,
    ] = useState(
        manualPatient?.age || ""
    );


    const [
        manualGender,
        setManualGender,
    ] = useState(
        manualPatient?.gender || undefined
    );

    const [
        manualUHID,
        setManualUHID,
    ] = useState(
        manualPatient?.uhid ||
        manualPatient?.patientUHID ||
        ""
    );


    const [
        manualIPDNo,
        setManualIPDNo,
    ] = useState(
        manualPatient?.ipdNo ||
        ""
    );


    const [
        manualOPDNo,
        setManualOPDNo,
    ] = useState(
        manualPatient?.opdNo ||
        ""
    );


    const [
        manualRefDoctor,
        setManualRefDoctor,
    ] = useState(
        manualPatient?.refDoctorName ||
        manualPatient?.refDr ||
        ""
    );

    /* =====================================================
       SOURCE
    ===================================================== */

    const sourceLabel =
        patientSource === PATIENT_SOURCE.HIS
            ? "HIS"
            : patientSource === PATIENT_SOURCE.MANUAL
                ? "Manual"
                : "Walk-in";


    const sourceColor =
        patientSource === PATIENT_SOURCE.HIS
            ? "blue"
            : patientSource === PATIENT_SOURCE.MANUAL
                ? "orange"
                : undefined;


    /* =====================================================
       HIS STATUS
    ===================================================== */

    const hisStatusLabel =
        !hisEnabled
            ? "HIS Disabled"
            : !hisAvailable
                ? "HIS Offline"
                : "HIS Connected";


    const hisStatusColor =
        !hisEnabled
            ? "default"
            : !hisAvailable
                ? "warning"
                : "success";


    /* =====================================================
       OPEN MANUAL PATIENT
    ===================================================== */

    const handleOpenManualPatient = () => {

        setManualName(
            manualPatient?.patientName || ""
        );

        setManualMobile(
            manualPatient?.mobile || ""
        );

        setManualAge(
            manualPatient?.age || ""
        );

        setManualGender(
            manualPatient?.gender || undefined
        );

        setManualUHID(
            manualPatient?.uhid ||
            manualPatient?.patientUHID ||
            ""
        );


        setManualIPDNo(
            manualPatient?.ipdNo ||
            ""
        );


        setManualOPDNo(
            manualPatient?.opdNo ||
            ""
        );


        setManualRefDoctor(
            manualPatient?.refDoctorName ||
            manualPatient?.refDr ||
            ""
        );


        setManualModalOpen(true);

    };


    /* =====================================================
       SAVE MANUAL PATIENT
    ===================================================== */

    const handleSaveManualPatient = () => {

        const name =
            String(
                manualName || ""
            ).trim();


        if (!name) {
            return;
        }


        const patient = {

            patientId:
                null,

            patientSource:
                PATIENT_SOURCE.MANUAL,

            uhid:
                String(
                    manualUHID ||
                    ""
                ).trim(),

            ipdNo:
                String(
                    manualIPDNo ||
                    ""
                ).trim(),

            opdNo:
                String(
                    manualOPDNo ||
                    ""
                ).trim(),

            patientName:
                name,

            mobile:
                String(
                    manualMobile ||
                    ""
                ).trim(),

            age:
                manualAge ||
                null,

            gender:
                manualGender ||
                "",

            refDoctorName:
                String(
                    manualRefDoctor ||
                    ""
                ).trim(),

            doctorName:
                "",

            isHISPatient:
                false,

        };


        if (
            typeof onManualPatientSave ===
            "function"
        ) {

            onManualPatientSave(
                patient
            );

        }


        setManualModalOpen(false);

    };


    /* =====================================================
       WALK-IN
    ===================================================== */

    const handleWalkIn = () => {

        const patient = {

            patientId:
                null,

            patientSource:
                PATIENT_SOURCE.WALK_IN,

            uhid:
                "",

            patientName:
                "Walk-in Customer",

            mobile:
                "",

            age:
                null,

            gender:
                "",

            doctorName:
                "",

            isHISPatient:
                false,

        };


        if (
            typeof onWalkIn ===
            "function"
        ) {

            onWalkIn(
                patient
            );

        }

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <>

            {/* =================================================
                PATIENT SELECTOR
            ================================================= */}

            <div
                className="billing-patient-selector"
            >

                <Row
                    gutter={[
                        16,
                        8,
                    ]}
                    align="middle"
                >

                    {/* =========================================
                        PATIENT SEARCH
                    ========================================= */}

                    <Col
                        xs={24}
                        lg={9}
                    >

                        <Space
                            size={8}
                            wrap
                        >

                            <Text strong>

                                <UserOutlined />

                                {" Patient"}

                            </Text>


                            <Tag
                                color={sourceColor}
                            >
                                {
                                    sourceLabel
                                }
                            </Tag>


                            <Tag
                                color={hisStatusColor}
                            >
                                {
                                    hisStatusLabel
                                }
                            </Tag>

                        </Space>


                        {
                            hisEnabled &&
                                hisAvailable
                                ? (

                                    <AutoComplete

                                        value={
                                            patientSearch
                                        }

                                        options={
                                            patientOptions
                                        }

                                        onSearch={
                                            onPatientSearch
                                        }

                                        onSelect={
                                            onPatientSelect
                                        }

                                        style={{
                                            width:
                                                "100%",

                                            marginTop:
                                                6,
                                        }}

                                        notFoundContent={

                                            patientLoading
                                                ? (
                                                    <Spin
                                                        size="small"
                                                    />
                                                )
                                                : null

                                        }

                                    >

                                        <Input

                                            placeholder={
                                                "Search patient / UHID / mobile"
                                            }

                                            allowClear

                                        />

                                    </AutoComplete>

                                )
                                : (

                                    <Input

                                        disabled

                                        value={
                                            "HIS patient search unavailable"
                                        }

                                        prefix={
                                            <WarningOutlined />
                                        }

                                        style={{
                                            width:
                                                "100%",

                                            marginTop:
                                                6,
                                        }}

                                    />

                                )
                        }

                    </Col>


                    {/* =========================================
                        PATIENT NAME
                    ========================================= */}

                    <Col
                        xs={24}
                        sm={8}
                        lg={4}
                    >

                        <Text
                            type="secondary"
                        >
                            Patient
                        </Text>

                        <br />

                        <Text strong>

                            {
                                patientName ||
                                "Walk-in Customer"
                            }

                        </Text>

                    </Col>


                    {/* =========================================
                        UHID
                    ========================================= */}

                    <Col
                        xs={12}
                        sm={8}
                        lg={3}
                    >

                        <Text
                            type="secondary"
                        >
                            UHID
                        </Text>

                        <br />

                        <Text>

                            {
                                patientUHID ||
                                "-"
                            }

                        </Text>

                    </Col>


                    {/* =========================================
                        DOCTOR
                    ========================================= */}

                    <Col
                        xs={12}
                        sm={8}
                        lg={3}
                    >

                        <Text
                            type="secondary"
                        >
                            Doctor
                        </Text>

                        <br />

                        <Text>

                            {
                                doctorName ||
                                "-"
                            }

                        </Text>

                    </Col>


                    {/* =========================================
                        BILL TYPE
                    ========================================= */}

                    <Col
                        xs={24}
                        sm={12}
                        lg={3}
                    >

                        <Text
                            type="secondary"
                        >
                            Bill Type
                        </Text>

                        <Select

                            value={
                                billType ||
                                "RETAIL"
                            }

                            onChange={
                                onBillTypeChange
                            }

                            style={{
                                width:
                                    "100%",
                            }}

                            options={[

                                {
                                    value:
                                        "RETAIL",

                                    label:
                                        "Retail",
                                },

                                {
                                    value:
                                        "OPD",

                                    label:
                                        "OPD",
                                },

                                {
                                    value:
                                        "IPD",

                                    label:
                                        "IPD",
                                },

                                {
                                    value:
                                        "EMERGENCY",

                                    label:
                                        "Emergency",
                                },

                            ]}

                        />

                    </Col>


                    {/* =========================================
                        ACTIONS
                    ========================================= */}

                    <Col
                        xs={24}
                        lg={5}
                    >

                        <Space
                            wrap
                        >

                            {
                                allowManualPatient && (

                                    <Button

                                        icon={
                                            <PlusOutlined />
                                        }

                                        onClick={
                                            handleOpenManualPatient
                                        }

                                    >
                                        Manual Patient

                                    </Button>

                                )
                            }


                            {
                                allowWalkIn && (

                                    <Button
                                        onClick={
                                            handleWalkIn
                                        }
                                    >
                                        Walk-in
                                    </Button>

                                )
                            }

                        </Space>

                    </Col>

                </Row>

            </div>


            {/* =================================================
                MANUAL PATIENT MODAL
            ================================================= */}

            <Modal

                title="Manual Patient"

                open={
                    manualModalOpen
                }

                onCancel={() =>
                    setManualModalOpen(false)
                }

                onOk={
                    handleSaveManualPatient
                }

                okText="Use Patient"

                cancelText="Cancel"

                destroyOnClose

            >

                <Space

                    direction="vertical"

                    size={14}

                    style={{
                        width:
                            "100%",
                    }}

                >

                    {/* =====================================
                        PATIENT NAME
                    ===================================== */}

                    <div>

                        <Text strong>
                            Patient Name *
                        </Text>

                        <Input

                            value={
                                manualName
                            }

                            onChange={
                                event =>
                                    setManualName(
                                        event.target.value
                                    )
                            }

                            placeholder={
                                "Enter patient name"
                            }

                            style={{
                                marginTop:
                                    6,
                            }}

                        />

                    </div>


                    {/* =====================================
                        MOBILE
                    ===================================== */}

                    <div>

                        <Text strong>
                            Mobile
                        </Text>

                        <Input

                            value={
                                manualMobile
                            }

                            onChange={
                                event =>
                                    setManualMobile(
                                        event.target.value
                                    )
                            }

                            placeholder={
                                "Enter mobile number"
                            }

                            maxLength={
                                15
                            }

                            style={{
                                marginTop:
                                    6,
                            }}

                        />

                    </div>

                    {/* =====================================
    HOSPITAL REFERENCES
===================================== */}

                    <Row
                        gutter={12}
                    >

                        <Col
                            xs={24}
                            sm={8}
                        >

                            <Text strong>
                                UHID No.
                            </Text>

                            <Input

                                value={
                                    manualUHID
                                }

                                onChange={
                                    event =>
                                        setManualUHID(
                                            event.target.value
                                        )
                                }

                                placeholder="Enter UHID"

                                style={{
                                    marginTop:
                                        6,
                                }}

                            />

                        </Col>


                        <Col
                            xs={24}
                            sm={8}
                        >

                            <Text strong>
                                IPD No.
                            </Text>

                            <Input

                                value={
                                    manualIPDNo
                                }

                                onChange={
                                    event =>
                                        setManualIPDNo(
                                            event.target.value
                                        )
                                }

                                placeholder="Enter IPD No."

                                style={{
                                    marginTop:
                                        6,
                                }}

                            />

                        </Col>


                        <Col
                            xs={24}
                            sm={8}
                        >

                            <Text strong>
                                OPD No.
                            </Text>

                            <Input

                                value={
                                    manualOPDNo
                                }

                                onChange={
                                    event =>
                                        setManualOPDNo(
                                            event.target.value
                                        )
                                }

                                placeholder="Enter OPD No."

                                style={{
                                    marginTop:
                                        6,
                                }}

                            />

                        </Col>

                    </Row>
                    {/* =====================================
    REFERRING DOCTOR
===================================== */}

                    <div>

                        <Text strong>
                            Ref. Dr.
                        </Text>

                        <Input

                            value={
                                manualRefDoctor
                            }

                            onChange={
                                event =>
                                    setManualRefDoctor(
                                        event.target.value
                                    )
                            }

                            placeholder="Enter referring doctor name"

                            style={{
                                marginTop:
                                    6,
                            }}

                        />

                    </div>


                    {/* =====================================
                        AGE + GENDER
                    ===================================== */}

                    <Row
                        gutter={12}
                    >

                        <Col
                            span={12}
                        >

                            <Text strong>
                                Age
                            </Text>

                            <Input

                                type="number"

                                value={
                                    manualAge
                                }

                                onChange={
                                    event =>
                                        setManualAge(
                                            event.target.value
                                        )
                                }

                                placeholder="Age"

                                style={{
                                    marginTop:
                                        6,
                                }}

                            />

                        </Col>


                        <Col
                            span={12}
                        >

                            <Text strong>
                                Gender
                            </Text>

                            <Select

                                allowClear

                                value={
                                    manualGender
                                }

                                onChange={
                                    setManualGender
                                }

                                placeholder="Gender"

                                style={{
                                    width:
                                        "100%",

                                    marginTop:
                                        6,
                                }}

                                options={[

                                    {
                                        value:
                                            "MALE",

                                        label:
                                            "Male",
                                    },

                                    {
                                        value:
                                            "FEMALE",

                                        label:
                                            "Female",
                                    },

                                    {
                                        value:
                                            "OTHER",

                                        label:
                                            "Other",
                                    },

                                ]}

                            />

                        </Col>

                    </Row>

                </Space>

            </Modal>

        </>

    );

};


export default PatientSelector;