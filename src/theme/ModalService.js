// src/theme/ModalService.js

let modalInstance = null;

const ModalService = {

    register(instance) {

        modalInstance = instance;

    },

    confirm({

        title,

        content,

        onOk,

        onCancel,

    }) {

        if (!modalInstance) return;

        modalInstance.confirm({

            title,

            content,

            centered: true,

            okText: "Yes",

            cancelText: "No",

            onOk,

            onCancel,

        });

    },

    success({

        title,

        content,

    }) {

        if (!modalInstance) return;

        modalInstance.success({

            title,

            content,

            centered: true,

        });

    },

    error({

        title,

        content,

    }) {

        if (!modalInstance) return;

        modalInstance.error({

            title,

            content,

            centered: true,

        });

    },

    warning({

        title,

        content,

    }) {

        if (!modalInstance) return;

        modalInstance.warning({

            title,

            content,

            centered: true,

        });

    },

};

export default ModalService;