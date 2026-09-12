-- B&B (Bliss & Bundles) — Supabase schema
-- Run this once in the Supabase dashboard: Project > SQL Editor > New query > paste > Run.
-- Safe to re-run: uses "if not exists" / "or replace" everywhere.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image text,
  tagline text,
  product_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null references categories(slug) on update cascade,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  currency text not null default 'PKR',
  image text,
  hover_image text,
  rating numeric(2, 1) not null default 4.5,
  review_count int not null default 0,
  is_best_seller boolean not null default false,
  is_customizable boolean not null default true,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on products(category);

create table if not exists benefits (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'Sparkles',
  title text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  location text,
  occasion text,
  rating int not null default 5 check (rating between 1 and 5),
  text text not null,
  avatar text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists payment_methods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null default 'Banknote',
  enabled boolean not null default true,
  instructions text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  notes text,
  payment_method text,
  items jsonb not null default '[]',
  subtotal numeric(10, 2) not null default 0,
  delivery_fee numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'placed'
    check (status in ('placed', 'processing', 'shipped', 'delivered')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
-- Storefront (anon key) can read catalog data but only write orders.
-- Only an authenticated Supabase user (the admin, created once in
-- Authentication > Users) can create/edit/delete catalog data or manage
-- orders. There's a single admin account, so "authenticated" == admin.

alter table categories enable row level security;
alter table products enable row level security;
alter table benefits enable row level security;
alter table testimonials enable row level security;
alter table payment_methods enable row level security;
alter table orders enable row level security;

-- Public read access for storefront catalog tables
drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read benefits" on benefits;
create policy "public read benefits" on benefits for select using (true);

drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (true);

drop policy if exists "public read payment_methods" on payment_methods;
create policy "public read payment_methods" on payment_methods for select using (true);

-- Admin-only write access for catalog tables
drop policy if exists "admin write categories" on categories;
create policy "admin write categories" on categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin write products" on products;
create policy "admin write products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin write benefits" on benefits;
create policy "admin write benefits" on benefits for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin write testimonials" on testimonials;
create policy "admin write testimonials" on testimonials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin write payment_methods" on payment_methods;
create policy "admin write payment_methods" on payment_methods for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Orders: anyone can place an order (insert), nobody can read the raw
-- table directly with the anon key (customer PII lives here) — reading a
-- single order's status goes through the track_order() function below.
-- The admin (authenticated) can see and manage everything.
drop policy if exists "anyone can place an order" on orders;
create policy "anyone can place an order" on orders for insert with check (true);

drop policy if exists "admin manage orders" on orders;
create policy "admin manage orders" on orders for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Track Order: a narrow, security-definer function so the storefront can
-- look up one order's status by its order number without RLS exposing
-- every customer's name/address/phone to the anon key.
-- ---------------------------------------------------------------------

create or replace function track_order(p_order_number text)
returns table (order_number text, city text, status text)
language sql
security definer
set search_path = public
as $$
  select order_number, city, status
  from orders
  where order_number = p_order_number;
$$;

grant execute on function track_order(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Seed data — the current mock catalog, so the live site isn't empty.
-- Safe to run once; re-running duplicates rows (there's no natural
-- unique key besides category slug), so only run this section the
-- first time.
-- ---------------------------------------------------------------------

insert into categories (name, slug, image, tagline, product_count) values
  ('Customized Mugs', 'mugs', '/assets/categories/mugs.svg', 'Photo mugs & quote mugs made just for them.', 24),
  ('Customized Tumblers', 'tumblers', '/assets/categories/tumblers.svg', 'Insulated tumblers wrapped in your story.', 18),
  ('Customized Wallets', 'wallets', '/assets/categories/wallets.svg', 'Engraved leather wallets, personal and premium.', 12),
  ('Customized Bottles', 'bottles', '/assets/categories/bottles.svg', 'Everyday bottles, made distinctly theirs.', 15)
on conflict (slug) do nothing;

insert into products (name, category, price, compare_at_price, image, hover_image, rating, review_count, is_best_seller, is_customizable, tags) values
  ('Personalized Photo Mug', 'mugs', 1299, 1599, '/assets/products/mug-01.svg', '/assets/products/mug-01-alt.svg', 4.8, 214, true, true, array['photo','text','best-seller']),
  ('Custom Quote Mug', 'mugs', 1099, null, '/assets/products/mug-02.svg', '/assets/products/mug-02-alt.svg', 4.6, 98, false, true, array['text']),
  ('Personalized Photo Tumbler', 'tumblers', 1899, 2299, '/assets/products/tumbler-01.svg', '/assets/products/tumbler-01-alt.svg', 4.9, 341, true, true, array['photo','text','best-seller']),
  ('Frosted Name Tumbler', 'tumblers', 1699, null, '/assets/products/tumbler-02.svg', '/assets/products/tumbler-02-alt.svg', 4.7, 122, false, true, array['text','new']),
  ('Engraved Leather Wallet', 'wallets', 2999, 3499, '/assets/products/wallet-01.svg', '/assets/products/wallet-01-alt.svg', 4.9, 176, true, true, array['engraving','best-seller']),
  ('Personalized Card Wallet', 'wallets', 2199, null, '/assets/products/wallet-02.svg', '/assets/products/wallet-02-alt.svg', 4.5, 64, false, true, array['engraving']),
  ('Custom Steel Bottle', 'bottles', 2499, 2899, '/assets/products/bottle-01.svg', '/assets/products/bottle-01-alt.svg', 4.7, 153, false, true, array['engraving','text']),
  ('Photo Print Bottle', 'bottles', 1999, null, '/assets/products/bottle-02.svg', '/assets/products/bottle-02-alt.svg', 4.6, 47, false, true, array['photo','new']);

insert into benefits (icon, title, description, sort_order) values
  ('Sparkles', 'Premium Print Quality', 'Fade-resistant, studio-grade prints on every product.', 1),
  ('Palette', '100% Personalized', 'Every order made uniquely for you, from scratch.', 2),
  ('ShieldCheck', 'Secure & Easy Ordering', 'Simple checkout with protected payments, every time.', 3),
  ('Truck', 'Delivery Across Pakistan', 'Nationwide shipping with Cash on Delivery available.', 4);

insert into testimonials (customer_name, location, occasion, rating, text, avatar, sort_order) values
  ('Ayesha K.', 'Lahore', 'Anniversary Gift', 5, 'The photo tumbler I ordered for my husband''s anniversary looked even better than I imagined. The print quality is genuinely premium, not the flat, faded kind you see elsewhere.', '/assets/avatars/ayesha.svg', 1),
  ('Hassan R.', 'Karachi', 'Corporate Gifting', 5, 'We ordered 40 engraved wallets for our team''s year-end gifts. Every piece was consistent, beautifully packaged, and delivered on time across three cities.', '/assets/avatars/hassan.svg', 2),
  ('Mahnoor S.', 'Islamabad', 'Birthday Surprise', 5, 'I uploaded a childhood photo for my sister''s mug and it came out crisp and vivid. She cried opening it — exactly the reaction I was hoping for.', '/assets/avatars/mahnoor.svg', 3),
  ('Bilal T.', 'Faisalabad', 'Wedding Favor', 4, 'Ordered custom bottles as wedding favors for close family. Easy ordering, COD worked smoothly, and the finish felt genuinely premium for the price.', '/assets/avatars/bilal.svg', 4);

insert into payment_methods (name, icon, enabled, instructions, sort_order) values
  ('Cash on Delivery', 'Banknote', true, 'Pay in cash when your order arrives at your door.', 1),
  ('JazzCash', 'Smartphone', true, 'Send payment to 0300-1234567 and share the transaction ID.', 2),
  ('EasyPaisa', 'Smartphone', true, 'Send payment to 0300-1234567 and share the transaction ID.', 3),
  ('Bank Transfer', 'Landmark', false, 'Transfer to Meezan Bank, Account #: 0123456789.', 4),
  ('Credit / Debit Card', 'CreditCard', false, 'Pay securely online with your Visa or Mastercard.', 5);
