import { supabase } from "../lib/supabaseClient";

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price === null ? null : Number(row.compare_at_price),
    currency: row.currency,
    image: row.image,
    hoverImage: row.hover_image,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    isBestSeller: row.is_best_seller,
    isCustomizable: row.is_customizable,
    tags: row.tags || [],
  };
}

function toRow(product) {
  return {
    name: product.name,
    category: product.category,
    price: product.price,
    compare_at_price: product.compareAtPrice,
    currency: product.currency || "PKR",
    image: product.image,
    hover_image: product.hoverImage,
    rating: product.rating,
    review_count: product.reviewCount,
    is_best_seller: product.isBestSeller,
    is_customizable: product.isCustomizable,
    tags: product.tags || [],
  };
}

export async function listProducts() {
  const { data, error } = await supabase.from("products").select("*").order("created_at");
  if (error) throw error;
  return data.map(fromRow);
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert(toRow(product))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(toRow(product))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
