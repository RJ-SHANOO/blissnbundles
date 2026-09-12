import { supabase } from "../lib/supabaseClient";

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    enabled: row.enabled,
    instructions: row.instructions,
  };
}

function toRow(paymentMethod) {
  return {
    name: paymentMethod.name,
    icon: paymentMethod.icon,
    enabled: paymentMethod.enabled,
    instructions: paymentMethod.instructions,
  };
}

export async function listPaymentMethods() {
  const { data, error } = await supabase.from("payment_methods").select("*").order("sort_order");
  if (error) throw error;
  return data.map(fromRow);
}

export async function createPaymentMethod(paymentMethod) {
  const { data, error } = await supabase
    .from("payment_methods")
    .insert(toRow(paymentMethod))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updatePaymentMethod(id, paymentMethod) {
  const { data, error } = await supabase
    .from("payment_methods")
    .update(toRow(paymentMethod))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deletePaymentMethod(id) {
  const { error } = await supabase.from("payment_methods").delete().eq("id", id);
  if (error) throw error;
}
