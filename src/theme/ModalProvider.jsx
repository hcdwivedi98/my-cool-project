// src/theme/ModalProvider.jsx

import { useEffect } from "react";

import { App } from "antd";

import ModalService from "./ModalService";

function ModalProvider({

    children,

}) {

    const {

        modal,

    } = App.useApp();

    useEffect(() => {

        ModalService.register(

            modal

        );

    }, [modal]);

    return children;

}

export default ModalProvider;