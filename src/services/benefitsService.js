import { supabase } from "../lib/supabaseClient";

function fromRow(row) {
  return {
    id: row.id,
    icon: row.icon,
    title: row.title,
    description: row.description,
  };
}

function toRow(benefit) {
  return {
    icon: benefit.icon,
    title: benefit.title,
    description: benefit.description,
  };
}

export async function listBenefits() {
  const { data, error } = await supabase.from("benefits").select("*").order("sort_order");
  if (error) throw error;
  return data.map(fromRow);
}

export async function createBenefit(benefit) {
  const { data, error } = await supabase
    .from("benefits")
    .insert(toRow(benefit))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateBenefit(id, benefit) {
  const { data, error } = await supabase
    .from("benefits")
    .update(toRow(benefit))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteBenefit(id) {
  const { error } = await supabase.from("benefits").delete().eq("id", id);
  if (error) throw error;
}
