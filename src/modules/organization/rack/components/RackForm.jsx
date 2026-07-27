import { Tabs } from "antd";

import BasicSection from "./sections/BasicSection";
import LocationSection from "./sections/LocationSection";
import CapacitySection from "./sections/CapacitySection";
import InventoryRuleSection from "./sections/InventoryRuleSection";
import ApprovalSection from "./sections/ApprovalSection";
import DocumentsSection from "./sections/DocumentsSection";
import AuditSection from "./sections/AuditSection";

import useRackLookup from "../hooks/useRackLookup";
import { RACK_TABS } from "../constants/rack.constants";

const RackForm = ({
    form,
    mode,
    record,
    activeTab,
    setActiveTab,
    onDirtyChange
}) => {

    const lookup = useRackLookup();

    const readOnly = mode === "VIEW";

    const items = [

        {
            key: "basic",
            label: "Basic",
            children: (
                <BasicSection
                    form={form}
                    lookup={lookup}
                    readOnly={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            )
        },

        {
            key: "location",
            label: "Location",
            children: (
                <LocationSection
                    form={form}
                    lookup={lookup}
                    readOnly={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            )
        },

        {
            key: "capacity",
            label: "Capacity",
            children: (
                <CapacitySection
                    form={form}
                    readOnly={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            )
        },
                {
            key: "inventory",
            label: "Inventory Rules",
            children: (
                <InventoryRuleSection
                    form={form}
                    readOnly={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            )
        },

        {
            key: "approval",
            label: "Approval",
            children: (
                <ApprovalSection
                    form={form}
                    lookup={lookup}
                    readOnly={readOnly}
                    onDirtyChange={onDirtyChange}
                />
            )
        },

        {
            key: "documents",
            label: "Documents",
            children: (
                <DocumentsSection
                    form={form}
                    record={record}
                    readOnly={readOnly}
                />
            )
        },

        {
            key: "audit",
            label: "Audit",
            children: (
                <AuditSection
                    record={record}
                />
            )
        }

    ];

    return (

        <Tabs
            activeKey={activeTab}
            items={items}
            destroyInactiveTabPane={false}
            onChange={setActiveTab}
        />

    );

};

export default RackForm;