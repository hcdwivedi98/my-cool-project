// src/theme/NotificationService.js

let notificationInstance = null;

const NotificationService = {

    register(instance) {

        notificationInstance = instance;

    },

    success({

        message,

        description,

        placement = "topRight",

    }) {

        if (!notificationInstance) return;

        notificationInstance.success({

            message,

            description,

            placement,

        });

    },

    error({

        message,

        description,

        placement = "topRight",

    }) {

        if (!notificationInstance) return;

        notificationInstance.error({

            message,

            description,

            placement,

        });

    },

    warning({

        message,

        description,

        placement = "topRight",

    }) {

        if (!notificationInstance) return;

        notificationInstance.warning({

            message,

            description,

            placement,

        });

    },

    info({

        message,

        description,

        placement = "topRight",

    }) {

        if (!notificationInstance) return;

        notificationInstance.info({

            message,

            description,

            placement,

        });

    },

};

export default NotificationService;