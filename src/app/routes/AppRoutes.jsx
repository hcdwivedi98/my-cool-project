import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../../core/auth/Login";

import Dashboard from "../../pages/dashboard/Dashboard";
import Users from "../../pages/users/Users";
import Roles from "../../pages/roles/Roles";
import Permissions from "../../pages/permissions/Permissions";
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
                        path="/stores"
                        element={<Stores />}
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

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;