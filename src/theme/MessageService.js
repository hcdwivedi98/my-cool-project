// src/theme/MessageService.js

let messageInstance = null;

const MessageService = {

    register(instance) {

        messageInstance = instance;

    },

    success(content, duration = 2) {

        if (!messageInstance) return;

        messageInstance.success({

            content,

            duration,

        });

    },

    error(content, duration = 3) {

        if (!messageInstance) return;

        messageInstance.error({

            content,

            duration,

        });

    },

    warning(content, duration = 3) {

        if (!messageInstance) return;

        messageInstance.warning({

            content,

            duration,

        });

    },

    info(content, duration = 2) {

        if (!messageInstance) return;

        messageInstance.info({

            content,

            duration,

        });

    },

    loading(content) {

        if (!messageInstance) return;

        return messageInstance.loading({

            content,

        });

    },

};

export default MessageService;