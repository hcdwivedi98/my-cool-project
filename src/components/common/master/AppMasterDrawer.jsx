import React from "react";

import AppDrawer from "../drawer/AppDrawer";
import AppMasterFooter from "./AppMasterFooter";

function AppMasterDrawer({

    open,

    title,

    width = 900,

    onClose,

    onCancel,

    onSave,

    onSubmit,

    loading,

    children,

}) {

    return (

        <AppDrawer

            open={open}

            title={title}

            width={width}

            onClose={onClose}

            footer={

                <AppMasterFooter

                    onCancel={onCancel}

                    onSave={onSave}

                    onSubmit={onSubmit}

                    loading={loading}

                />

            }

        >

            {children}

        </AppDrawer>

    );

}

export default AppMasterDrawer;