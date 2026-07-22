// src/theme/NotificationProvider.jsx

import { useEffect } from "react";

import { App } from "antd";

import NotificationService from "./NotificationService";

function NotificationProvider({

    children,

}) {

    const {

        notification,

    } = App.useApp();

    useEffect(() => {

        NotificationService.register(

            notification

        );

    }, [notification]);

    return children;

}

export default NotificationProvider;