// src/theme/MessageProvider.jsx

import { useEffect } from "react";

import { App } from "antd";

import MessageService from "./MessageService";

function MessageProvider({

    children,

}) {

    const {

        message,

    } = App.useApp();

    useEffect(() => {

        MessageService.register(

            message

        );

    }, [message]);

    return children;

}

export default MessageProvider;