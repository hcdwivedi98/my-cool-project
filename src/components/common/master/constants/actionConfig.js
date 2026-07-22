import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    StopOutlined,
    CheckOutlined,
    CloseOutlined,
    PrinterOutlined,
    CopyOutlined,
    HistoryOutlined
} from "@ant-design/icons";

import { ACTIONS } from "./actionConstants";

export const ACTION_CONFIG = {

    [ACTIONS.VIEW]: {
        icon: EyeOutlined,
        tooltip: "View"
    },

    [ACTIONS.EDIT]: {
        icon: EditOutlined,
        tooltip: "Edit"
    },

    [ACTIONS.DELETE]: {
        icon: DeleteOutlined,
        tooltip: "Delete",
        danger: true
    },

    [ACTIONS.ACTIVATE]: {
        icon: CheckCircleOutlined,
        tooltip: "Activate"
    },

    [ACTIONS.DEACTIVATE]: {
        icon: StopOutlined,
        tooltip: "Deactivate"
    },

    [ACTIONS.APPROVE]: {
        icon: CheckOutlined,
        tooltip: "Approve"
    },

    [ACTIONS.REJECT]: {
        icon: CloseOutlined,
        tooltip: "Reject"
    },

    [ACTIONS.PRINT]: {
        icon: PrinterOutlined,
        tooltip: "Print"
    },

    [ACTIONS.CLONE]: {
        icon: CopyOutlined,
        tooltip: "Clone"
    },

    [ACTIONS.HISTORY]: {
        icon: HistoryOutlined,
        tooltip: "History"
    }

};