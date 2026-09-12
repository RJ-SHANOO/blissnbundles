import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { deleteOrder, listOrders, updateOrderStatus } from "../../services/ordersService";
import AdminTable from "../../components/admin/AdminTable";
import Button from "../../components/ui/Button";

const STATUSES = ["placed", "processing", "shipped", "delivered"];

function formatPrice(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setOrders(await listOrders());
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (order, status) => {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
    try {
      await updateOrderStatus(order.id, status);
    } catch (err) {
      setOrders(previous);
      window.alert(err.message || "Failed to update order status.");
    }
  };

  const handleDelete = async (order) => {
    if (!window.confirm(`Delete order ${order.orderNumber}? This can't be undone.`)) return;
    try {
      await deleteOrder(order.id);
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
    } catch (err) {
      window.alert(err.message || "Failed to delete order.");
    }
  };

  const columns = [
    { key: "orderNumber", label: "Order #" },
    { key: "customerName", label: "Customer" },
    { key: "city", label: "City" },
    {
      key: "total",
      label: "Total",
      render: (row) => formatPrice(row.total),
    },
    { key: "paymentMethod", label: "Payment" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row, e.target.value)}
          className="rounded-full border border-ink/10 bg-base px-3 py-1.5 text-xs font-semibold capitalize text-ink focus:border-brand focus:outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Orders
          </h1>
          <p className="mt-1 text-sm text-muted">
            View incoming orders and update delivery status.
          </p>
        </div>
        <Button onClick={load} variant="outline" className="flex items-center gap-2">
          <RefreshCw size={15} /> Refresh
        </Button>
      </div>

      <div className="mt-6">
        {error ? (
          <div className="rounded-2xl bg-surface p-10 text-center text-sm text-brand shadow-soft">
            {error}
          </div>
        ) : loading ? (
          <div className="rounded-2xl bg-surface p-10 text-center text-sm text-muted shadow-soft">
            Loading orders...
          </div>
        ) : (
          <AdminTable
            columns={columns}
            rows={orders}
            onDelete={handleDelete}
            emptyLabel="No orders yet."
          />
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
