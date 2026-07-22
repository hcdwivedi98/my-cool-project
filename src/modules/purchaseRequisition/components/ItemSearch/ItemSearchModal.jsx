import React from "react";

import {
    Modal,
    Divider,
} from "antd";

import SearchToolbar from "./SearchToolbar";
import MedicineGrid from "./MedicineGrid";
import useMedicineSearch from "../../hooks/useMedicineSearch";

function ItemSearchModal({

    open,

    loading = false,

    dataSource = [],

    lookups = {},

    onSelect,

    onClose,

}){
    const {

        keyword,

        setKeyword,

        filters,

        setFilters,

        medicines: filteredMedicines,

        resetFilters,

    } = useMedicineSearch(dataSource);
console.log("Received Medicines :", dataSource);

    return (

        <Modal

            open={open}

            title="Search Medicine"

            width={1300}

            centered

            destroyOnClose

            maskClosable={false}

            footer={null}

            onCancel={onClose}

        >

            <SearchToolbar

                keyword={keyword}

                setKeyword={setKeyword}

                filters={filters}

                lookups={lookups}

                onChange={setFilters}

                onReset={resetFilters}

            />

            <Divider
                style={{
                    margin: "16px 0",
                }}
            />

            <MedicineGrid

                loading={loading}

                dataSource={filteredMedicines}

                onSelect={onSelect}

            />

        </Modal>

    );

}

export default React.memo(ItemSearchModal);