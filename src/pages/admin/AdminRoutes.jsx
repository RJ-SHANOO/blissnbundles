import { Route, Routes } from "react-router-dom";
import { AdminAuthProvider } from "../../context/AdminAuthContext";
import AdminProtected from "./AdminProtected";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminPaymentMethods from "./AdminPaymentMethods";
import AdminBenefits from "./AdminBenefits";
import AdminTestimonials from "./AdminTestimonials";

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminProtected />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="payment-methods" element={<AdminPaymentMethods />} />
            <Route path="benefits" element={<AdminBenefits />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

export default AdminRoutes;
