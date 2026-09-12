import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/useAdminAuth";

function AdminProtected() {
  const { isAuthed, checking } = useAdminAuth();

  if (checking) {
    return <div className="min-h-screen bg-cream" />;
  }
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

export default AdminProtected;
