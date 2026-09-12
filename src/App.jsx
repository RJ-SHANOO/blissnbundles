import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { DataProvider } from "./context/DataContext";
import DataGate from "./components/DataGate";
import StorefrontLayout from "./StorefrontLayout";

// Lazy-loaded so the full lucide-react icon set the admin panel needs for
// its icon pickers never ships in the customer-facing bundle.
const AdminRoutes = lazy(() => import("./pages/admin/AdminRoutes"));

function App() {
  return (
    <DataProvider>
      <DataGate>
        <StoreProvider>
          <Routes>
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<div className="min-h-screen bg-cream" />}>
                  <AdminRoutes />
                </Suspense>
              }
            />
            <Route path="/*" element={<StorefrontLayout />} />
          </Routes>
        </StoreProvider>
      </DataGate>
    </DataProvider>
  );
}

export default App;
