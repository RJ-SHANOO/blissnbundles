import { supabase } from "../lib/supabaseClient";

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image,
    tagline: row.tagline,
    productCount: row.product_count,
  };
}

function toRow(category) {
  return {
    name: category.name,
    slug: category.slug,
    image: category.image,
    tagline: category.tagline,
    product_count: category.productCount,
  };
}

export async function listCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("created_at");
  if (error) throw error;
  return data.map(fromRow);
}

export async function createCategory(category) {
  const { data, error } = await supabase
    .from("categories")
    .insert(toRow(category))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateCategory(id, category) {
  const { data, error } = await supabase
    .from("categories")
    .update(toRow(category))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
