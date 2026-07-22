import { message } from "antd";

const AppMessage = {

    success(text) {
        message.success(text);
    },

    error(text) {
        message.error(text);
    },

    warning(text) {
        message.warning(text);
    },

    info(text) {
        message.info(text);
    }

};

export default AppMessage;