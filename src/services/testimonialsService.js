import { supabase } from "../lib/supabaseClient";

function fromRow(row) {
  return {
    id: row.id,
    customerName: row.customer_name,
    location: row.location,
    occasion: row.occasion,
    rating: row.rating,
    text: row.text,
    avatar: row.avatar,
  };
}

function toRow(testimonial) {
  return {
    customer_name: testimonial.customerName,
    location: testimonial.location,
    occasion: testimonial.occasion,
    rating: testimonial.rating,
    text: testimonial.text,
    avatar: testimonial.avatar,
  };
}

export async function listTestimonials() {
  const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
  if (error) throw error;
  return data.map(fromRow);
}

export async function createTestimonial(testimonial) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(toRow(testimonial))
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function updateTestimonial(id, testimonial) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(toRow(testimonial))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return fromRow(data);
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
