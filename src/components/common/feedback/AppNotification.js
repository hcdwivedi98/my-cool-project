import { notification } from "antd";

const AppNotification = {

    success(message, description) {
        notification.success({
            message,
            description
        });
    },

    error(message, description) {
        notification.error({
            message,
            description
        });
    },

    warning(message, description) {
        notification.warning({
            message,
            description
        });
    },

    info(message, description) {
        notification.info({
            message,
            description
        });
    }

};

export default AppNotification;