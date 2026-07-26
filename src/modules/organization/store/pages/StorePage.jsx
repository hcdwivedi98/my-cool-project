import StoreToolbar from "../components/StoreToolbar";
import StoreFilterPanel from "../components/StoreFilterPanel";
import StoreTable from "../components/StoreTable";
import StoreDrawer from "../components/StoreDrawer";
import useStoreMaster from "../hooks/useStoreMaster";

import {
    AppPage,
    AppPageHeader,
    AppPageContent,
} from "@/components/common";

const StorePage = () => {

    const store = useStoreMaster();

    console.log("Store Hook :", store);

    return (
        <AppPage>

            <AppPageHeader
                title="Store Master"
                extra={
                    <StoreToolbar
                        onAdd={store.openAddDrawer}
                    />
                }
            />

            <AppPageContent>


                <StoreFilterPanel />

                <StoreTable
                    data={store.stores}
                    onView={store.openViewDrawer}
                    onEdit={store.openEditDrawer}
                />

                {/* StoreDrawer - Sprint 2 */}

            </AppPageContent>
            <StoreDrawer
                open={store.drawerOpen}
                mode={store.drawerMode}
                record={store.selectedStore}
                onClose={store.closeDrawer}
                onSave={store.saveStore}
            />

        </AppPage>
    );
};

export default StorePage;