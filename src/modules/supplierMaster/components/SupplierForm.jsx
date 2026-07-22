import React, { memo } from "react";

import { Tabs } from "antd";

import BasicInformationTab from "./tabs/BasicInformationTab";
import AddressTab from "./tabs/AddressTab";
import BusinessTab from "./tabs/BusinessTab";
import FinancialTab from "./tabs/FinancialTab";
import ComplianceTab from "./tabs/ComplianceTab";
import MappingTab from "./tabs/MappingTab";

function SupplierForm({

    form,

    lookups,

}) {

    const items = [

        {

            key: "basic",

            label: "Basic Information",

            children: (

                <BasicInformationTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "address",

            label: "Address",

            children: (

                <AddressTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "business",

            label: "Business",

            children: (

                <BusinessTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "financial",

            label: "Financial",

            children: (

                <FinancialTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "compliance",

            label: "Compliance",

            children: (

                <ComplianceTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

        {

            key: "mapping",

            label: "Center Mapping",

            children: (

                <MappingTab

                    form={form}

                    lookups={lookups}

                />

            ),

        },

    ];

    return (

        <Tabs

            destroyInactiveTabPane={false}

            animated

            items={items}

        />

    );

}

export default memo(SupplierForm);