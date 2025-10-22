import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute adminOnly={true}>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-grow bg-gray-50">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
