import React from "react";
import { Card, Input, Button, Checkbox, } from "antd"; import { MailOutlined, LockOutlined, SafetyCertificateOutlined, MedicineBoxOutlined, BarChartOutlined, DatabaseOutlined, } from "@ant-design/icons";
import { GlassCard } from "@/components/common";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({
        maxWidth: 767,
    });

    const isTablet = useMediaQuery({
        minWidth: 768,
        maxWidth: 1199,
    });
    const features = [
        {
            icon: <DatabaseOutlined />,
            title: "Inventory",
        },
        {
            icon: <MedicineBoxOutlined />,
            title: "RX Core",
        },
        {
            icon: <BarChartOutlined />,
            title: "Insights",
        },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                fontFamily: "Inter, sans-serif",
            }}
        >
            {/* LEFT PANEL */}

            {!isMobile && (
                <div
                    style={{
                        flex: 1,
                        background:
                            "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 45%,#eef6ff 100%)",
                        position: "relative",
                        overflow: "hidden",
                        borderRight: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "60px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "600px",
                            height: "600px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(22,119,255,0.12) 0%, rgba(22,119,255,0) 70%)",
                            bottom: "-250px",
                            right: "-150px",
                        }}
                    />

                    <div
                        style={{
                            textAlign: "center",
                            maxWidth: "850px",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                width: 90,
                                height: 90,
                                margin: "0 auto 40px",
                                background: "#dbeafe",
                                borderRadius: 16,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <SafetyCertificateOutlined
                                style={{
                                    fontSize: 42,
                                    color: "#1677ff",
                                }}
                            />
                        </div>

                        <h1
                            style={{
                                fontSize: isTablet ? 48 : 64,
                                lineHeight: isTablet ? "56px" : "72px",
                                fontWeight: 700,
                                letterSpacing: "-2px",
                                color: "#0f172a",
                                marginBottom: 24,
                            }}
                        >
                            Precision in every prescription.
                        </h1>

                        <p
                            style={{
                                fontSize: 20,
                                lineHeight: "34px",
                                color: "#6b7280",
                                maxWidth: 700,
                                margin: "0 auto 70px",
                            }}
                        >
                            Welcome to the next generation of pharmacy
                            management. Streamlined workflows,
                            integrated clinical data, and patient-first
                            care technology.
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 24,
                                flexWrap: "wrap",
                            }}
                        >
                            {features.map((item, index) => (
                                <GlassCard
                                    key={index}
                                    width={180}
                                >
                                    <div
                                        style={{
                                            fontSize: 28,
                                            color: "#1677ff",
                                        }}
                                    >
                                        {item.icon}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 12,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* RIGHT PANEL */}

            <div
                style={{
                    width: isMobile ? "100%" : "35%",
                    minWidth: isMobile ? "100%" : 520,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 40,
                    background:
                        "linear-gradient(180deg,#fafafa 0%,#f8fafc 100%)",
                }}
            >
                <GlassCard width={isMobile ? "100%" : 480}>
                    <div style={{ marginBottom: 30 }}>
                        <div
                            style={{
                                width: 52,
                                height: 52,
                                background: "#1677ff",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 22,
                                marginBottom: 20,
                            }}
                        >
                            +
                        </div>

                        <h2
                            style={{
                                fontSize: 36,
                                fontWeight: 700,
                                marginBottom: 8,
                            }}
                        >
                            HPMS Clinical
                        </h2>

                        <p style={{ color: "#6b7280" }}>
                            Sign in to your professional workstation
                        </p>
                    </div>

                    <label>Email Address</label>

                    <Input
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="name@hospital.org"
                        style={{ marginTop: 8, marginBottom: 20 }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 8,
                        }}
                    >
                        <label>Password</label>

                        <a href="#">Forgot Password?</a>
                    </div>

                    <Input.Password
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder="Enter password"
                    />

                    <div
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    >
                        <Checkbox>
                            Remember this device
                        </Checkbox>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => {
                            navigate("/dashboard");
                        }}
                    >
                        Sign In
                    </Button>
                </GlassCard>
            </div>
        </div >

    );
};

export default Login;
