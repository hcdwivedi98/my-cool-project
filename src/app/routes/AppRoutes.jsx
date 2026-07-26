import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../../core/auth/Login";

import Dashboard from "../../pages/dashboard/Dashboard";
import Stores from "../../pages/stores/Stores";
import Settings from "../../pages/settings/Settings";

import MainLayout from "../layouts/MainLayout/MainLayout";

// Feature Modules
import DrugMaster from "../../modules/drugMaster";
import SupplierMaster from "../../modules/supplierMaster";
import SupplierItemMapping from "../../modules/supplierItemMapping";
import PurchaseRequisition from "../../modules/purchaseRequisition";
// Organization Modules
import CenterMasterPage from "../../modules/organization/center/pages/CenterMasterPage";
import DepartmentMasterPage from "../../modules/department/pages/DepartmentPage";
import StorePage from "../../modules/organization/store/pages/StorePage";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes >

                {/* Login */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Application */}

                <Route element={<MainLayout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                   

                    <Route
                        path="/centers"
                        element={<CenterMasterPage />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    <Route
                        path="/drug-master"
                        element={<DrugMaster />}
                    />

                    <Route
                        path="/suppliers"
                        element={<SupplierMaster />}
                    />

                    <Route
                        path="/supplier-item-mapping"
                        element={<SupplierItemMapping />}
                    />

                    <Route
                        path="/purchase-requisition"
                        element={<PurchaseRequisition />}
                    />

                    <Route
                        path="/departments"
                        element={<DepartmentMasterPage />}
                    />

                    <Route
                        path="/stores"
                        element={<StorePage />}
                    />
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;