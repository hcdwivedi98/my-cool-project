import PropTypes from "prop-types";
import { Flex } from "antd";

import { AppButton } from "@/components/common";

import footerDefaults from "./footerDefaults";
import { FORM_MODE } from "./footerButtons";

function AppFormFooter({

    mode = FORM_MODE.CREATE,

    loading = false,

    onCancel,

    onReset,

    showCancel = footerDefaults.showCancel,

    showReset = footerDefaults.showReset,

    showSave = footerDefaults.showSave,

    saveText,

    updateText,

    cancelText,

    resetText,

    justify,

    gap,

}) {

    return (

        <Flex

            justify={justify ?? footerDefaults.justify}

            gap={gap ?? footerDefaults.gap}

        >

            {

                showReset && (

                    <AppButton

                        onClick={onReset}

                    >

                        {resetText ?? footerDefaults.resetText}

                    </AppButton>

                )

            }

            {

                showCancel && (

                    <AppButton

                        onClick={onCancel}

                    >

                        {cancelText ?? footerDefaults.cancelText}

                    </AppButton>

                )

            }

            {

                showSave && mode !== FORM_MODE.VIEW && (

                    <AppButton

                        type="primary"

                        htmlType="submit"

                        loading={loading}

                    >

                        {

                            mode === FORM_MODE.CREATE

                                ? (saveText ?? footerDefaults.saveText)

                                : (updateText ?? footerDefaults.updateText)

                        }

                    </AppButton>

                )

            }

        </Flex>

    );

}

AppFormFooter.propTypes = {

    mode: PropTypes.oneOf([
        "create",
        "edit",
        "view"
    ]),

    loading: PropTypes.bool,

    onCancel: PropTypes.func,

    onReset: PropTypes.func,

    showCancel: PropTypes.bool,

    showReset: PropTypes.bool,

    showSave: PropTypes.bool

};

export default AppFormFooter;