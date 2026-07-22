// src/theme/theme.js

import tokens from "./tokens";

const theme = {

    token: {

        // Brand Color

        colorPrimary: tokens.colors.primary,

        colorSuccess: tokens.colors.success,

        colorWarning: tokens.colors.warning,

        colorError: tokens.colors.error,

        colorInfo: tokens.colors.info,

        // Background

        colorBgBase: tokens.colors.background,

        colorBgContainer: tokens.colors.surface,

        // Text

        colorText: tokens.colors.textPrimary,

        colorTextSecondary: tokens.colors.textSecondary,

        // Border

        colorBorder: tokens.colors.border,

        // Typography

        fontSize: tokens.fontSize.md,

        fontFamily:
            `"Inter",
            "Segoe UI",
            Roboto,
            sans-serif`,

        // Radius

        borderRadius: tokens.borderRadius.lg,

        // Control Height

        controlHeight: tokens.height.input,

        // Motion

        motionDurationFast: "0.2s",

        motionDurationMid: "0.3s",

        motionDurationSlow: "0.4s",

    },

    components: {

        Layout: {

            headerBg: "#ffffff",

            siderBg: "#ffffff",

            bodyBg: tokens.colors.background,

        },

        Card: {

            borderRadiusLG:
                tokens.borderRadius.xl,

            boxShadow:
                tokens.shadow.card,

            paddingLG:
                tokens.spacing.xl,

        },

        Button: {

            borderRadius:
                tokens.borderRadius.md,

            controlHeight:
                tokens.height.button,

            fontWeight: 600,

        },

        Input: {

            borderRadius:
                tokens.borderRadius.md,

            controlHeight:
                tokens.height.input,

        },

        Select: {

            borderRadius:
                tokens.borderRadius.md,

            controlHeight:
                tokens.height.input,

        },

        DatePicker: {

            borderRadius:
                tokens.borderRadius.md,

            controlHeight:
                tokens.height.input,

        },

        Table: {

            borderColor:
                tokens.colors.border,

            headerBg: "#fafafa",

            headerColor:
                tokens.colors.textPrimary,

            rowHoverBg: "#F5F9FF",

            cellPaddingBlock: 12,

            cellPaddingInline: 16,

        },

        Drawer: {

            footerPaddingBlock: 16,

            footerPaddingInline: 24,

        },

        Menu: {

            itemBorderRadius:
                tokens.borderRadius.md,

            itemHeight: 42,

            itemSelectedBg: "#E6F4FF",

            itemSelectedColor:
                tokens.colors.primary,

        },

        Statistic: {

            contentFontSize:
                tokens.fontSize.statistic,

        },

        Tag: {

            borderRadius:
                tokens.borderRadius.sm,

        },

    },

};

export default theme;