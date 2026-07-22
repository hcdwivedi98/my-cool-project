// src/theme/ThemeProvider.jsx

import React from "react";

import {
    ConfigProvider,
    App,
} from "antd";

import enUS from "antd/locale/en_US";

import theme from "./theme";

import {
    ThemeProviderContext,
} from "./ThemeContext";

import {
    LocaleProviderContext,
    useLocale,
} from "./LocaleContext";
import NotificationProvider from "./NotificationProvider";
import MessageProvider from "./MessageProvider";
import ModalProvider from "./ModalProvider";

function AntdProvider({
    children,
}) {

    const { locale } = useLocale();

    return (

        <ConfigProvider

            theme={theme}

            locale={locale || enUS}

            componentSize="middle"

            wave={{ disabled: false }}

        >

            <App>

    <NotificationProvider>

        <MessageProvider>

            <ModalProvider>

                {children}

            </ModalProvider>

        </MessageProvider>

    </NotificationProvider>

</App>

        </ConfigProvider>

    );

}

function ThemeProvider({
    children,
}) {

    return (

        <ThemeProviderContext>

            <LocaleProviderContext>

                <AntdProvider>

                    {children}

                </AntdProvider>

            </LocaleProviderContext>

        </ThemeProviderContext>

    );

}

export default ThemeProvider;