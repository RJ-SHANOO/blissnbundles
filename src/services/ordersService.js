import { supabase } from "../lib/supabaseClient";

// Anon customers can only INSERT into orders (no SELECT policy — the row
// holds their name/address/phone). Postgres applies SELECT-policy checks to
// RETURNING too, so this deliberately skips .select() after insert — the
// order number is already known client-side, generated before this call.
export async function createOrder(order) {
  const { error } = await supabase.from("orders").insert({
    order_number: order.orderNumber,
    customer_name: order.customerName,
    phone: order.phone,
    address: order.address,
    city: order.city,
    notes: order.notes || null,
    payment_method: order.paymentMethod,
    items: order.items,
    subtotal: order.subtotal,
    delivery_fee: order.deliveryFee,
    total: order.total,
  });
  if (error) throw error;
}

// Goes through the track_order() Postgres function (security definer) so
// the anon key can look up one order's status without RLS exposing every
// customer's name/address/phone.
export async function trackOrder(orderNumber) {
  const { data, error } = await supabase.rpc("track_order", {
    p_order_number: orderNumber,
  });
  if (error) throw error;
  return data?.[0] ?? null;
}

// Admin-only (RLS requires an authenticated session for these).
export async function listOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map((row) => ({
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    city: row.city,
    notes: row.notes,
    paymentMethod: row.payment_method,
    items: row.items,
    subtotal: Number(row.subtotal),
    deliveryFee: Number(row.delivery_fee),
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function updateOrderStatus(id, status) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}
